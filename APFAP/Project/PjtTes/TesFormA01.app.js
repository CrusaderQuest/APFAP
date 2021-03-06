﻿/// <reference path="../../Resource/Script/ext-all-debug.js" />
/// <reference path="../../Resource/Script/component.js" />
/// <reference path="../../Resource/Script/noncomponent.js" />
/// <reference path="TesFormA01.view.js" />

//App 단 정의 영역 시작
//단위, 통합 테스트
//-----------------최상단 공통 컴포넌트-----------------
btn_SAVE.eClick = function () {
    dbSave();
    dbLoad();
    if (isSearched) {
        dbSearch();
    }
}
//------------------------DB------------------------------
function dbLoad() {
    var pr = DBParams.create('sp_TesFormA01', 'GET_TABLE');
    var ds = DBconnect.runProcedure(pr);
    grdStore = ds[0];
    grd.reconfigure(grdStore);
}
function getEmptyTable() {
    var pr = DBParams.create('sp_TesFormA01', 'GET_EMPTY_TABLE');
    var ds = DBconnect.runProcedure(pr);
    filterStore = ds[0];
}
function dbUserLoad() {
    var pr1 = DBParams.create('sp_TesFormA01', 'GET_PROJECT_USER');
    var ds1 = DBconnect.runProcedure(pr1);
    comboStoreUser = ds1[0];

    //조회조건의 콤보박스
    var pr2 = DBParams.create('sp_TesFormA01', 'GET_USER_SEARCH');
    var ds2 = DBconnect.runProcedure(pr2);
    comboSearchUser = ds2[0];
}
function dbStateLoad() {
    var pr1 = DBParams.create('sp_TesFormA01', 'GET_STATE');
    var ds1 = DBconnect.runProcedure(pr1);
    comboStoreState = ds1[0];

    //조회조건의 콤보박스
    var pr2 = DBParams.create('sp_TesFormA01', 'GET_STATE_SEARCH');
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
        if (selectedRecords[i].get('TES_NO') == undefined || selectedRecords[i].get('TES_NO') == 0) {
            pr = DBParams.create('sp_TesFormA01', 'INSERT_TABLE');
        } else {
            pr = DBParams.create('sp_TesFormA01', 'UPDATE_TABLE');
            pr.addParam('TES_NO', selectedRecords[i].get('TES_NO'));
        }
        pr.addParam('TES_DT', ApFn.setYMD(selectedRecords[i].get('TES_DT')));
        pr.addParam('STATE_CD', selectedRecords[i].get('STATE_CD'));
        pr.addParam('SUMMARY', selectedRecords[i].get('SUMMARY'));
        pr.addParam('DESCRIPTION', selectedRecords[i].get('CONTENT'));
        pr.addParam('USER_KEY', selectedRecords[i].get('USER_KEY'));
        if (selectedRecords[i].get('END_DT') != undefined)
            pr.addParam('END_DT', ApFn.setYMD(selectedRecords[i].get('END_DT')));

        ds = DBconnect.runProcedure(pr);
    }

    //삭제된 행
    var deletedRecords = grd.getDeletedRecords();
    for (var i = 0; i < deletedRecords.length; i++) {
        if (deletedRecords[i].get('TES_NO') != undefined || deletedRecords[i].get('TES_NO') != 0) {
            pr = DBParams.create('sp_TesFormA01', 'DELETE_TABLE');
            pr.addParam('TES_NO', deletedRecords[i].get('TES_NO'));
            ds = DBconnect.runProcedure(pr);
        }
    }

    //저장되었습니다.
}
//------------------------DB private--------------------------
function isErrTuple(selectedRecords) {
    for (var i = 0; i < selectedRecords.length; i++) {
        //특정 셀의 값을 확인
        if (selectedRecords[i].get('TES_DT') == undefined || selectedRecords[i].get('TES_DT') == ''
            || selectedRecords[i].get('STATE_CD') == undefined || selectedRecords[i].get('STATE_CD') == ''
            || selectedRecords[i].get('SUMMARY') == undefined || selectedRecords[i].get('SUMMARY') == ''
            || selectedRecords[i].get('CONTENT') == undefined || selectedRecords[i].get('CONTENT') == ''
            || selectedRecords[i].get('USER_KEY') == undefined || selectedRecords[i].get('USER_KEY') == '') {
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
            if (dt_sDate.getYMD() > filterStore.getAt(i).data.TES_DT || dt_eDate.getYMD() < filterStore.getAt(i).data.TES_DT) {
                filterStore.removeAt(i);
                i = i - 1;
                continue;
            }
        }
        if (cmb_tesState.getValue() != undefined && cmb_tesState.getValue() != '') {
            if (cmb_tesState.getValue() != filterStore.getAt(i).data.STATE_CD) {
                filterStore.removeAt(i);
                i = i - 1;
                continue;
            }
        }
        if (cmb_tesUser.getValue() != undefined && cmb_tesUser.getValue() != '') {
            if (cmb_tesUser.getValue() != filterStore.getAt(i).data.USER_KEY) {
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

//-----------------------제약 조건----------------------------------
dt_sDate.eChange = function (record) {
    if (dt_eDate.getYMD() != '' && dt_eDate.getYMD() != undefined) {
        if (dt_eDate.getYMD() < dt_sDate.getYMD()) {
            ApMsg.warning('날짜 오류', function () {
                dt_sDate.setValue(sDateLast);
            });
            return;
        }
    }
    sDateLast = dt_sDate.getYMD();
}
dt_eDate.eChange = function (record) {
    if (dt_sDate.getYMD() != '' && dt_sDate.getYMD() != undefined) {
        if (dt_eDate.getYMD() < dt_sDate.getYMD()) {
            ApMsg.warning('날짜 오류', function () {
                dt_eDate.setValue(eDateLast);
            });
            return;
        }
    }
    eDateLast = dt_eDate.getYMD();
}
grd.eUpdate = function (record, rowIndex, paramId) {
    var a;
    if (paramId == 'STATE_CD' && record.data.STATE_CD == 3) {
        var pr = DBParams.create('sp_ComFormA01', 'GET_DATE');
        var ds = DBconnect.runProcedure(pr);
        record.data.END_DT = ds[0].data.items[0].data.DATE;
        if (isSearched) {
            grd.reconfigure(filterStore);
        } else {
            grd.reconfigure(grdStore);
        }
    }
}
