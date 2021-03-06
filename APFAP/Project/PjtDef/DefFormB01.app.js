﻿/// <reference path="../../Resource/Scripts/ext-all-debug.js" />
/// <reference path="../../Resource/Scripts/component.js" />
/// <reference path="../../Resource/Scripts/noncomponent.js" />
/// <reference path="DefFormB01.view.js" />

//App 단 정의 영역 시작
function GRD_LOAD() {
    //데이터생성
    var pr = DBParams.create('sp_DefFormB01', 'GET_TABLE');
    //데이터셋
    var ds = DBconnect.runProcedure(pr);
    gridData = ds[0];
    grd_a.reconfigure(gridData);
    grd_a.findPlugin('cellediting').disable(); //그리드 칼럼 수정 불가
}

//그리드 칼럼 추가 
grd_a.eButtonAddClick = function () {
    grd_a.reconfigure(gridData);
    gridData.add({
        FUNC_NUM: 0, FUNC_IMP: '선택사항', CATEGORY: '기타', FUNC_NM: null, SUMMARY: null,
        S_DT: null, E_DT: null, E_USER: GetSession().S_USER_NO
    }); //초기값 세팅 
    grd_a.setFocus(grd_a.getTotalCount() - 1);  //마지막으로 추가된 칼럼에 포커스
}

//그리드 삭제 버튼 
grd_a.eButtonDeleteClick = function () {
    if (grd_a.selModel.getSelection() == 0) {
        Ext.Msg.alert("경고 창", "삭제할 행이 없습니다.");
    } else {
        for (var i = 0; i < grd_a.getSelection().length; i++) {
            var tempNo = grd_a.getSelection()[i].data.FUNC_NUM;
            deleteArray.push(tempNo);
        }   //delete 한 행의 FUNC_NUM를 deleteArray에 저장 후 sync시 db에서 삭제
        gridData.remove(grd_a.selModel.getSelection());
        grd_a.setFocus(Dindex - 1);
    }

}

//Sync 버튼 데이터 베이스에 저장
btn_SAVE.eClick = function () {
    for (var i = 0; i < gridData.data.length; i++) {
        //튜블 수 loop
        var pr;
        if (gridData.data.items[i].data.FUNC_NUM == 0) {//insert
            pr = DBParams.create('sp_DefFormB01', 'INSERT_TABLE');
            pr.addParam('S_DT', gridData.data.items[i].data.S_DT);
        } else {//update
            pr = DBParams.create('sp_DefFormB01', 'UPDATE_TABLE');
            pr.addParam('FUNC_NUM', gridData.data.items[i].data.FUNC_NUM);
        }
        pr.addParam('FUNC_IMP', gridData.data.items[i].data.FUNC_IMP);
        pr.addParam('CATEGORY', gridData.data.items[i].data.CATEGORY);
        pr.addParam('FUNC_NM', gridData.data.items[i].data.FUNC_NM);
        pr.addParam('SUMMARY', gridData.data.items[i].data.SUMMARY);
        pr.addParam('E_DT', gridData.data.items[i].data.E_DT);
        var ds = DBconnect.runProcedure(pr);
    }
    deleteDB(); //삭제 행이 있으면 삭제
    //
    GRD_LOAD();
}

//그리드 삭제 내용 db에서 삭제 deleteAraay
function deleteDB() {
    var pr = DBParams.create('sp_DefFormB01', 'DELETE_TABLE');
    for (var i = 0; i < deleteArray.length; i++) {
        //각 탭 delete list 튜블 수 loop
        pr.addParam('FUNC_NUM', deleteArray.pop());
        var ds = DBconnect.runProcedure(pr);
    }
}

//grid 내용 필드로
grd_a.eSelectionChange = function (record, rowIndex, paramId) {
    console.log(paramId, record.data, rowIndex);
    cbo_imp.setValue(record.data.FUNC_IMP);
    cbo_category.setValue(record.data.CATEGORY);
    txt_nm.setValue(record.data.FUNC_NM);
    txta_summary.setValue(record.data.SUMMARY);
    cbo_NOTICE_USER_HH.setValue(record.data.E_USER);

}

//등록 버튼시 필드 내용을 그리드로
btn_update.eClick = function () {
    grd_a.selection.set('FUNC_IMP', cbo_imp.getValue());
    grd_a.selection.set('CATEGORY', cbo_category.getValue());
    grd_a.selection.set('FUNC_NM', txt_nm.getValue());
    grd_a.selection.set('SUMMARY', txta_summary.getValue());
    grd_a.selection.set('E_USER', cbo_NOTICE_USER_HH.getValue());

    if (grd_a.selection.data.S_DT == null) {
        grd_a.selection.data.S_DT = dt_update.getYMD();
    }   //S_DT는 없을때 한번만 입력 되게 E_DT는 매번 갱신
    grd_a.selection.data.E_DT = dt_update.getYMD();
    grd_a.reconfigure(gridData);

    //필드 내용 clear
    cbo_imp.setValue(null);
    cbo_category.setValue(null);
    txt_nm.setValue(null);
    txta_summary.setValue(null);
    cbo_NOTICE_USER_HH.setValue(null);
}

//조회 버튼 날짜로 색인
btn_search.eClick = function () {
    if (dt_SDATE.getYMD() > dt_EDATE.getYMD()) { }
    else {
        var prS = DBParams.create('sp_DefFormB01', 'DT_SEARCH');
        prS.addParam('S_SEARCH', dt_SDATE.getYMD());
        prS.addParam('E_SEARCH', dt_EDATE.getYMD());
        var dsS = DBconnect.runProcedure(prS);
        grd_a.reconfigure(dsS[0]);

    }
}