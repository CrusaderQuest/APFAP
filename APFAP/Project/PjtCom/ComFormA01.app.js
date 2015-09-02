/// <reference path="../../Resource/Script/ext-all-debug.js" />
/// <reference path="../../Resource/Script/component.js" />
/// <reference path="../../Resource/Script/noncomponent.js" />
/// <reference path="ComFormA01.view.js" />

//App 단 정의 영역 시작
//고객 보수 내역
//-----------------최상단 공통 컴포넌트-----------------
btn_save.eClick = function () {
    dbSave();
    dbLoad();
    if (isSearched) {
        dbSearch();
    }
}
//------------------------DB------------------------------
function dbLoad() {
    var pr = DBParams.create('sp_ComFormA01', 'GET_TABLE');
    var ds = DBconnect.runProcedure(pr);
    grdStore = ds[0];
    grd.reconfigure(grdStore);
}
function getEmptyTable() {
    var pr = DBParams.create('sp_ComFormA01', 'GET_EMPTY_TABLE');
    var ds = DBconnect.runProcedure(pr);
    filterStore = ds[0];
}
function dbUserLoad() {
    var pr1 = DBParams.create('sp_ComFormA01', 'GET_PROJECT_USER');
    var ds1 = DBconnect.runProcedure(pr1);
    comboStoreUser = ds1[0];

    //조회조건의 콤보박스
    var pr2 = DBParams.create('sp_ComFormA01', 'GET_USER_SEARCH');
    var ds2 = DBconnect.runProcedure(pr2);
    comboSearchUser = ds2[0];
}
function dbStateLoad() {
    var pr1 = DBParams.create('sp_ComFormA01', 'GET_STATE');
    var ds1 = DBconnect.runProcedure(pr1);
    comboStoreState = ds1[0];

    //조회조건의 콤보박스
    var pr2 = DBParams.create('sp_ComFormA01', 'GET_STATE_SEARCH');
    var ds2 = DBconnect.runProcedure(pr2);
    comboSearchState = ds2[0];
}
function dbSave() {
    //체크된 레코드
    var selectedRecords = grd.getSelectedRecords();

    //체크된 레코드에 에러값이 있는지
    if (isErrTuple(selectedRecords)) return;

    //추가된행과 업데이트된 행 분기하여 디비에 저장
    var pr = '';
    var ds = '';
    for (var i = 0; i < selectedRecords.length; i++) {
        if (selectedRecords[i].get('REQ_NO') == undefined || selectedRecords[i].get('REQ_NO') == 0) {
            pr = DBParams.create('sp_ComFormA01', 'INSERT_TABLE');
        } else {
            pr = DBParams.create('sp_ComFormA01', 'UPDATE_TABLE');
        }
        pr.addParam('REQ_DT', ApFn.setYMD(selectedRecords[i].get('REQ_DT')));
        pr.addParam('STATE_CD', selectedRecords[i].get('STATE_NM'));
        pr.addParam('SUMMARY', selectedRecords[i].get('SUMMARY'));
        pr.addParam('DESCRIPTION', selectedRecords[i].get('DESCRIPTION'));
        pr.addParam('USER_KEY1', selectedRecords[i].get('USER_NM1'));
        pr.addParam('USER_KEY2', selectedRecords[i].get('USER_NM2'));
        pr.addParam('END_DT', ApFn.setYMD(selectedRecords[i].get('END_DT')));

        ds = DBconnect.runProcedure(pr);
    }

    //삭제된 행
    var deletedRecords = grd.getDeletedRecords();
    for (var i = 0; i < deletedRecords.length; i++) {
        if (deletedRecords[i].get('REQ_NO') != undefined || deletedRecords[i].get('REQ_NO') != 0) {
            pr = DBParams.create('sp_ComFormA01', 'DELETE_TABLE');
            pr.addParam('REQ_NO', deletedRecords[i].get('REQ_NO'));
            ds = DBconnect.runProcedure(pr);
        }
    }

    //저장되었습니다.
}
//------------------------DB private--------------------------
function isErrTuple(selectedRecords) {
    for (var i = 0; i < selectedRecords.length; i++) {
        //특정 셀의 값을 확인
        if (selectedRecords[i].get('REQ_DT') == undefined || selectedRecords[i].get('REQ_DT') == ''
            || selectedRecords[i].get('STATE_NM') == undefined || selectedRecords[i].get('STATE_NM') == ''
            || selectedRecords[i].get('SUMMARY') == undefined || selectedRecords[i].get('DEV_VALUE') == ''
            || selectedRecords[i].get('CONTENT') == undefined || selectedRecords[i].get('TEST_VALUE') == ''
            || selectedRecords[i].get('USER_NM1') == undefined || selectedRecords[i].get('USER_NM1') == '') {
            var index = grd.getRowIndex(selectedRecords[i]);
            //에러메세지 띄움
            ApMsg.warning(index + 1 + '번째 행의 데이터를 넣어주세요.', function () {
                //메세지의 확인버튼을 누를경우 그리드 포커스 이동
                grd.setFocus(index);
            })
            return true;
        }
    }
    return false;
}
function convertSTATE_CD(input) {
    for (var i = 0; i < comboStoreState.data.length; i++) {
        if (comboStoreState.data.items[i].data.SHOWVALUE == input)
            return comboStoreState.data.items[i].data.HIDEVALUE;
    }
}
function convertUSER_KEY(input) {
    for (var i = 0; i < comboStoreUser.data.length; i++) {
        if (comboStoreUser.data.items[i].data.SHOWVALUE == input)
            return comboStoreUser.data.items[i].data.HIDEVALUE;
    }
}
//------------------------조회 조건----------------------------
function dbSearch() {
    //현재 탭의 스토어 가져옴
    filterStore.clearData();
    for (var i = 0; i < grdStore.data.length; i++) {
        filterStore.add(grdStore.getAt(i));
    }

    for (var i = 0; i < filterStore.data.length; i++) {
        // 조회 조건을 충족하지 못하는 레코드 제거
        if (dt_sDate.getYMD() != undefined && dt_sDate.getYMD() != ''
            && dt_eDate.getYMD() != undefined && dt_eDate.getYMD() != '') {
            if (dt_sDate.getYMD() > filterStore.getAt(i).data.REQ_DT || dt_eDate.getYMD() < filterStore.getAt(i).data.REQ_DT) {
                filterStore.removeAt(i);
                i = i - 1;
                continue;
            }
        }
        if (cmb_reqState.getValue() != undefined && cmb_reqState.getValue() != '') {
            if (cmb_reqState.getValue() != convertSTATE_CD(filterStore.getAt(i).data.STATE_NM)) {
                filterStore.removeAt(i);
                i = i - 1;
                continue;
            }
        }
        if (cmb_reqUser1.getValue() != undefined && cmb_reqUser1.getValue() != '') {
            if (cmb_reqUser1.getValue() != convertUSER_KEY(filterStore.getAt(i).data.USER_NM1)) {
                filterStore.removeAt(i);
                i = i - 1;
                continue;
            }
        }
        if (cmb_reqUser2.getValue() != undefined && cmb_reqUser2.getValue() != '') {
            if (cmb_reqUser2.getValue() != convertUSER_KEY(filterStore.getAt(i).data.USER_NM2)) {
                filterStore.removeAt(i);
                i = i - 1;
                continue;
            }
        }
    }
    grd.reconfigure(filterStore);
    isSearched = 1;
}
btn_search.eClick = function () {
    dbSearch();
}
//----------------------그리드 버튼 이벤트----------------------
//추가
grd.eButtonAddClick = function () {
    grd.addRow();
    //grd_H.getRow(grd_H.getTotalCount() - 1).set('NOTICE_USER', 'JuneJobs');
    //grd_H.setFocus(grd_H.getTotalCount() - 1);
}
//삭제
grd.eButtonDeleteClick = function () {
    var selectedRecords = grd.getSelectedRecords();
    var index = grd.getRowIndex(grd.getSelectedRecords()[0]);
    grd.deleteRow(selectedRecords);
    grd.setFocus(index - 1);
}