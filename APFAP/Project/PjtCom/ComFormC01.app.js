/// <reference path="../../Resource/Script/ext-all-debug.js" />
/// <reference path="../../Resource/Script/component.js" />
/// <reference path="../../Resource/Script/noncomponent.js" />
/// <reference path="ComFormC01.view.js" />

//최상단 공통 버튼 클릭 (클릭시 동기화 진행)
btn_SAVE.eClick = function(){
    ASYNC_DB_H();
}

//App 단 정의 영역 시작
grd_H.eButtonAddClick = function () {
    grd_H.addRow();
    grd_H.getRow(grd_H.getTotalCount() - 1).set('NOTICE_USER', 'JuneJobs');
    grd_H.setFocus(grd_H.getTotalCount() - 1);
}

grd_H.eButtonDeleteClick = function () {
    //체크된 레코드 가져오기
    var selectedRecords = grd_H.getSelectedRecords();
    var index = grd_H.getRowIndex(grd_H.getSelectedRecords()[0]);
    grd_H.deleteRow(selectedRecords);
    grd_H.setFocus(index - 1);
}

grd_H.eSelectionChange = function(record, rowIndex, paramId){
    //테이블초기화
    txt_NOTICE_TITLE_HH.setValue('');
    txa_NOTICE_CONTENT_HH.setValue('');
    dt_NOTICE_S_DT_HH.setValue('');
    dt_NOTICE_E_DT_HH.setValue('');
    cbo_NOTICE_USER_HH.setValue('');

    //디테일테이블의 분류란에 데이터 바인드
    txt_NOTICE_TYPE_HH.setValue(record.data.NOTICE_TYPE);
    //디테일조회
    SEARCH_D();
}

grd_D.eSelectionChange = function (record, rowIndex, paramId) {
    //if (paramId == 'NOTICE_CONTENT') {
    //    grd_D.setLockColumns('NOTICE_TITLE');
    //}
    //if (paramId == 'NOTICE_S_DT') {
    //    grd_D.setUnLockColumns('NOTICE_TITLE');
    //}
    //디테일테이블 값 데이터 바인드
    txt_NOTICE_TITLE_HH.setValue(record.data.NOTICE_TITLE);
    txa_NOTICE_CONTENT_HH.setValue(record.data.NOTICE_CONTENT);
    dt_NOTICE_S_DT_HH.setValue(record.data.NOTICE_S_DT);
    dt_NOTICE_E_DT_HH.setValue(record.data.NOTiCE_E_DT);
    cbo_NOTICE_USER_HH.setValue(record.data.NOTICE_USER);
    //디테일조회
    //SEARCH_D();
}

btn_ADDNOICE_HH.eClick = function () {
    txt_NOTICE_TITLE_HH.setValue('');
    txa_NOTICE_CONTENT_HH.setValue('');
    dt_NOTICE_S_DT_HH.setToday();
    dt_NOTICE_E_DT_HH.setToday();
    cbo_NOTICE_USER_HH.setIndex(0);
    grd_D.setFocusOut();
    txt_NOTICE_TITLE_HH.focus();
}
//등록버튼 클릭
btn_SAVENOICE_HH.eClick = function () {
    //빈값 체크
    if (txt_NOTICE_TITLE_HH.getValue() == '') {
        ApMsg.warning('공지사항을 입력하세요.', function () {
            //메세지의 확인버튼을 누를경우 포커스 이동
            txt_NOTICE_TITLE_HH.focus();
        })
        return;
    }
    if (txa_NOTICE_CONTENT_HH.getValue() == '') {
        ApMsg.warning('공지의 세부사항을 입력하세요.', function () {
            //메세지의 확인버튼을 누를경우 포커스 이동
            txa_NOTICE_CONTENT_HH.focus();
        })
        return;
    }
    if (grd_D.selection == null) {
        //추가
        grd_D.addRow();
        grd_D.getRow(grd_D.getTotalCount() - 1).set('NOTICE_H_KEY', grd_H.selection.data.NOTICE_H_KEY);
        grd_D.getRow(grd_D.getTotalCount() - 1).set('NOTICE_TITLE', txt_NOTICE_TITLE_HH.getValue());
        grd_D.getRow(grd_D.getTotalCount() - 1).set('NOTICE_CONTENT', txa_NOTICE_CONTENT_HH.getValue());
        grd_D.getRow(grd_D.getTotalCount() - 1).set('NOTICE_S_DT', dt_NOTICE_S_DT_HH.getYMD());
        grd_D.getRow(grd_D.getTotalCount() - 1).set('NOTiCE_E_DT', dt_NOTICE_S_DT_HH.getYMD());
        grd_D.getRow(grd_D.getTotalCount() - 1).set('NOTICE_USER', cbo_NOTICE_USER_HH.getValue());
        grd_D.setFocus(grd_D.getTotalCount() - 1);
        grd_D.selection.set('AP_STATE', true);
    } else {
        //저장
        grd_D.selection.set('NOTICE_TITLE', txt_NOTICE_TITLE_HH.getValue());
        grd_D.selection.set('NOTICE_CONTENT', txa_NOTICE_CONTENT_HH.getValue());
        grd_D.selection.set('NOTICE_S_DT', dt_NOTICE_S_DT_HH.getYMD());
        grd_D.selection.set('NOTiCE_E_DT', dt_NOTICE_E_DT_HH.getYMD());
        grd_D.selection.set('NOTICE_USER', cbo_NOTICE_USER_HH.getValue());
        grd_D.selection.set('AP_STATE', true);
        grd_D.setFocus(grd_D.getRowIndex(grd_D.selection));
    }

}
//헤더그리드 조회
function SEARCH_H() {
    var pr = DBParams.create('sp_ComFormC01', 'SEARCH_H');
    var ds = DBconnect.runProcedure(pr);
    grd_H.reconfig(ds[0]);
    if (grd_H.getTotalCount() > 0) {
        grd_H.setFocus(0);
    }
}

//디테일그리드 조회
function SEARCH_D() {
    var pr = DBParams.create('sp_ComFormC01', 'SEARCH_D');
    pr.addParam('NOTICE_H_KEY', grd_H.getSelectedRecords()[0].data.NOTICE_H_KEY);
    var ds = DBconnect.runProcedure(pr);
    grd_D.reconfig(ds[0]);
    if (grd_D.getTotalCount() > 0) {
        grd_D.setFocus(0);
    }
}

//초기값 바인드
function SYS_INIT() {
    SEARCH_H();
}
// DB와 동기화 하기전 빈값이 있는지 에러체크
function ASYNC_ERR_H(selectedRecords) {
    for (var i = 0; i < selectedRecords.length; i++) {
        //특정 셀의 값을 확인
        if (selectedRecords[i].get('NOTICE_TYPE') == undefined || selectedRecords[i].get('NOTICE_TYPE') == '') {
            var index = grd_H.getRowIndex(selectedRecords[i]);
            //에러메세지 띄움
            ApMsg.warning(index + 1 + '번째 행의 분류를 넣어주세요.', function () {
                //메세지의 확인버튼을 누를경우 그리드 포커스 이동
                grd_H.setFocus(index);
            })
            return true;
        }
    }
}
function ASYNC_DB_H() {
    //체크된 레코드 가져오기
    var selectedRecords = grd_H.getSelectedRecords();

    // DB와 동기화 하기전 빈값이 있는지 에러체크
    if (ASYNC_ERR_H(selectedRecords)) return;

    //추가된행과 업데이트된 행 분기하여 디비에 저장
    var pr = '';
    var ds = '';
    for (var i = 0; i < selectedRecords.length; i++) {
        if (selectedRecords[i].get('NOTICE_H_KEY') == undefined || selectedRecords[i].get('NOTICE_H_KEY') == 0) {
            pr = DBParams.create('sp_ComFormC01', 'INSERT_H');
            pr.addParam('NOTICE_TYPE', selectedRecords[i].get('NOTICE_TYPE'));
            pr.addParam('NOTICE_USER', selectedRecords[i].get('NOTICE_USER'));
            ds = DBconnect.runProcedure(pr);
        } else {
            pr = DBParams.create('sp_ComFormC01', 'UPDATE_H');
            pr.addParam('NOTICE_H_KEY', selectedRecords[i].get('NOTICE_H_KEY'));
            pr.addParam('NOTICE_TYPE', selectedRecords[i].get('NOTICE_TYPE'));
            pr.addParam('NOTICE_USER', selectedRecords[i].get('NOTICE_USER'));
            ds = DBconnect.runProcedure(pr);
        }
    }
    //삭제된 행
    var deletedRecords = grd_H.getDeletedRecords();
    for (var i = 0; i < deletedRecords.length; i++) {
        if (deletedRecords[i].get('NOTICE_H_KEY') != undefined || deletedRecords[i].get('NOTICE_H_KEY') != 0) {
            pr = DBParams.create('sp_ComFormC01', 'DELETE_H');
            pr.addParam('NOTICE_H_KEY', deletedRecords[i].get('NOTICE_H_KEY'));
            ds = DBconnect.runProcedure(pr);
        }
    }
    ASYNC_DB_D();
    SEARCH_H();
}
function ASYNC_DB_D() {
    //체크된 레코드 가져오기
    var selectedRecords = grd_D.getSelectedRecords();

    //추가된행과 업데이트된 행 분기하여 디비에 저장
    var pr = '';
    var ds = '';
    for (var i = 0; i < selectedRecords.length; i++) {
        if (selectedRecords[i].get('NOTICE_D_KEY') == undefined || selectedRecords[i].get('NOTICE_D_KEY') == 0) {
            pr = DBParams.create('sp_ComFormC01', 'INSERT_D');
            pr.addParam('NOTICE_H_KEY', selectedRecords[i].get('NOTICE_H_KEY'));
            pr.addParam('NOTICE_TITLE', selectedRecords[i].get('NOTICE_TITLE'));
            pr.addParam('NOTICE_CONTENT', selectedRecords[i].get('NOTICE_CONTENT'));
            pr.addParam('NOTICE_S_DT', ApFn.setYMD(selectedRecords[i].get('NOTICE_S_DT')));
            pr.addParam('NOTiCE_E_DT', ApFn.setYMD(selectedRecords[i].get('NOTiCE_E_DT')));
            pr.addParam('NOTICE_USER', selectedRecords[i].get('NOTICE_USER'));
            ds = DBconnect.runProcedure(pr);
        } else {
            pr = DBParams.create('sp_ComFormC01', 'UPDATE_D');
            pr.addParam('NOTICE_H_KEY', selectedRecords[i].get('NOTICE_H_KEY'));
            pr.addParam('NOTICE_D_KEY', selectedRecords[i].get('NOTICE_D_KEY'));
            pr.addParam('NOTICE_TITLE', selectedRecords[i].get('NOTICE_TITLE'));
            pr.addParam('NOTICE_CONTENT', selectedRecords[i].get('NOTICE_CONTENT'));
            pr.addParam('NOTICE_S_DT', ApFn.setYMD(selectedRecords[i].get('NOTICE_S_DT')));
            pr.addParam('NOTiCE_E_DT', ApFn.setYMD(selectedRecords[i].get('NOTiCE_E_DT')));
            pr.addParam('NOTICE_USER', selectedRecords[i].get('NOTICE_USER'));
            ds = DBconnect.runProcedure(pr);
        }
    }
    //삭제된 행
    var deletedRecords = grd_D.getDeletedRecords();
    for (var i = 0; i < deletedRecords.length; i++) {
        if (deletedRecords[i].get('NOTICE_H_KEY') != undefined || deletedRecords[i].get('NOTICE_H_KEY') != 0) {
            pr = DBParams.create('sp_ComFormC01', 'DELETE_H');
            pr.addParam('NOTICE_H_KEY', deletedRecords[i].get('NOTICE_H_KEY'));
            pr.addParam('NOTICE_D_KEY', deletedRecords[i].get('NOTICE_D_KEY'));
            ds = DBconnect.runProcedure(pr);
        }
    }
}
