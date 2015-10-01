/// <reference path="../../Resource/Scripts/ext-all-debug.js" />
/// <reference path="../../Resource/Scripts/component.js" />
/// <reference path="../../Resource/Scripts/noncomponent.js" />
/// <reference path="DefFormC01.view.js" />

//App 단 정의 영역 시작
function GRD_LOAD() {
    //데이터생성
    var pr = DBParams.create('sp_DefFormC01', 'GET_TABLE');
    //데이터셋
    var ds = DBconnect.runProcedure(pr);
    gridData = ds[0];
    grd_a.reconfigure(gridData);
    grd_a.findPlugin('cellediting').disable();  //그리드 칼럼 수정 불가
}

//그리드 칼럼 추가 
grd_a.eButtonAddClick = function () {
    grd_a.reconfigure(gridData);
    gridData.add({
        UP_KEY: null, CATEGORY: '기타', DOC_NM: null, SUMMARY: null,
        S_DT: null, E_USER: null, E_DT: null, E_FORM: null
    }); //초기값 세팅 
    grd_a.setFocus(grd_a.getTotalCount() - 1);  //마지막으로 추가된 칼럼에 포커스
}

//이미지 업로드시 up_key에 임시 저장 
up_doc.eUpload = function (fileKey) {
    up_key = up_doc.getFileKey();
}

//이미지 업로드 내용 삭제
up_doc.eClear = function () {
    //db에서 delete 후 수정
    var i = grd_a.getRowIndex(grd_a.selection);
    if (gridData.data.items[i].data.E_FORM) {
        var tempNo = grd_a.getSelection()[0].data.UP_KEY;
        deleteArray.push(tempNo);
        //새로 받는 UP_KEY 설정을 위해 삭제 후 새로 업데이트
        gridData.remove(grd_a.getSelection());
        grd_a.addRow();
        grid_update();
    }
}

//그리드 삭제 버튼 
grd_a.eButtonDeleteClick = function () {
    if (grd_a.selModel.getSelection() == 0) {
        Ext.Msg.alert("경고 창", "삭제할 행이 없습니다.");
    } else {
        for (var i = 0; i < grd_a.getSelection().length; i++) {
            var tempNo = grd_a.getSelection()[i].data.UP_KEY;
            deleteArray.push(tempNo);
        }   //delete 한 행의 UP_KEY를 deleteArray에 저장 후 sync시 db에서 삭제
        gridData.remove(grd_a.selModel.getSelection());
    }
}

//Sync 버튼 데이터 베이스에 저장
btn_SAVE.eClick = function () {
    for (var i = 0; i < gridData.data.length; i++) {
        //튜블 수 loop
        var pr;
        if (gridData.data.items[i].data.E_FORM == ""||gridData.data.items[i].data.E_FORM == null) {//insert
            pr = DBParams.create('sp_DefFormC01', 'INSERT_TABLE');
            pr.addParam('S_DT', gridData.data.items[i].data.S_DT);
        } else {//update
            pr = DBParams.create('sp_DefFormC01', 'UPDATE_TABLE');
        }
        pr.addParam('UP_KEY', gridData.data.items[i].data.UP_KEY);
        pr.addParam('CATEGORY', gridData.data.items[i].data.CATEGORY);
        pr.addParam('DOC_NM', gridData.data.items[i].data.DOC_NM);
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
        pr.addParam('UP_KEY', deleteArray.pop());
        var ds = DBconnect.runProcedure(pr);
    }
}

//grid 내용 필드로
grd_a.eSelectionChange = function (record, rowIndex, paramId) {
    console.log(paramId, record.data, rowIndex);

    cbo_category.setValue(record.data.CATEGORY);
    txt_nm.setValue(record.data.DOC_NM);
    txta_summary.setValue(record.data.SUMMARY);
    cbo_NOTICE_USER_HH.setValue(record.data.E_USER);
    up_doc.setFileKey(record.data.UP_KEY);

}

//등록 버튼시 필드 내용을 그리드로
grid_update = function () {

    if (up_key != 1) {
        grd_a.selection.set('UP_KEY', up_key);
        up_key = 1;
    }
    grd_a.selection.set('CATEGORY', cbo_category.getValue());
    grd_a.selection.set('DOC_NM', txt_nm.getValue());
    grd_a.selection.set('SUMMARY', txta_summary.getValue());
    grd_a.selection.set('E_USER', cbo_NOTICE_USER_HH.getValue());
    if (grd_a.selection.data.S_DT == null) {
        grd_a.selection.set('S_DT', dt_update.getYMD());
    }    //S_DT는 없을때 한번만 입력 되게 E_DT는 매번 갱신
    grd_a.selection.set('E_DT', dt_update.getYMD());

    grd_a.reconfigure(gridData);
}

//grid update(등록 버튼)
btn_update.eClick = function () {
    if (cbo_category.getValue() == "" || txt_nm.getValue() == "" || txta_summary.getValue() == ""
         || up_doc.getFileKey() == "") {
        Ext.Msg.alert("경고 창", "모든 필드에 값을 넣어주세요.");
    }//빈 항목 없도록
    else {
        grid_update();  //필드 내용 그리드로 하는 함수 호출

        //필드 내용 clear
        cbo_category.setValue(null);
        txt_nm.setValue(null);
        txta_summary.setValue(null);
        cbo_NOTICE_USER_HH.setValue(null);
        up_doc.setFileKey(null);
    }
}

//조회 버튼 날짜로 색인
btn_search.eClick = function () {
    if (dt_SDATE.getYMD() > dt_EDATE.getYMD()) { }
    else {
        var prS = DBParams.create('sp_DefFormC01', 'DT_SEARCH');
        prS.addParam('S_SEARCH', dt_SDATE.getYMD());
        prS.addParam('E_SEARCH', dt_EDATE.getYMD());
        var dsS = DBconnect.runProcedure(prS);
        grd_a.reconfigure(dsS[0]);

    }
}
