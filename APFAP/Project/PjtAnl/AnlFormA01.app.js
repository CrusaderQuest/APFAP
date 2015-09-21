/// <reference path="../../Resource/Scripts/ext-all-debug.js" />
/// <reference path="../../Resource/Scripts/component.js" />
/// <reference path="../../Resource/Scripts/noncomponent.js" />
/// <reference path="AnlFormA01.view.js" />

//App 단 정의 영역 시작
function GRD_LOAD() {
    //데이터생성
    var pr = DBParams.create('sp_AnlFormA01', 'GET_TABLE');
    //데이터셋
    var ds = DBconnect.runProcedure(pr);
    gridData = ds[0];
    grd_a.reconfigure(gridData);
}

grd_a.eButtonAddClick = function () {
    grd_a.reconfigure(gridData);
    gridData.add({
        UP_KEY: null, UI_NM: null, SUMMARY: null, FILE_CATEGORY: 'ETC',
        REQ_SIMILARITY: '2', S_DT: null, E_USER: null, E_DT: null, E_FORM: null
    });
    grd_a.setFocus(grd_a.getTotalCount() - 1);
}
up_doc.eUpload = function (fileKey) {
    up_key = up_doc.getFileKey();
}
up_doc.eClear = function () {
    var i = grd_a.getRowIndex(grd_a.selection);
    if (gridData.data.items[i].data.E_FORM) {
        var tempNo = grd_a.getSelection()[0].data.UP_KEY;
        deleteArray.push(tempNo);

        gridData.remove(grd_a.getSelection());
        grd_a.addRow();
        grid_update();
    }

}
grd_a.eButtonDeleteClick = function () {
    if (grd_a.selModel.getSelection() == 0) {
        //Ext.Msg.alert("경고 창", "클릭 해주세요.");
    } else {
        for (var i = 0; i < grd_a.getSelection().length; i++) {
            var tempNo = grd_a.getSelection()[i].data.UP_KEY;
            deleteArray.push(tempNo);
        }
        gridData.remove(grd_a.getSelection());
    }
}
btn_SAVE.eClick = function () {
    for (var i = 0; i < gridData.data.length; i++) {
        //튜블 수 loop
        var pr;
        if (gridData.data.items[i].data.E_FORM == "" || gridData.data.items[i].data.E_FORM == null) {//insert
            pr = DBParams.create('sp_AnlFormA01', 'INSERT_TABLE');
            pr.addParam('S_DT', gridData.data.items[i].data.S_DT);
        } else {//update
            pr = DBParams.create('sp_AnlFormA01', 'UPDATE_TABLE');
        }
        pr.addParam('UP_KEY', gridData.data.items[i].data.UP_KEY);
        pr.addParam('UI_NM', gridData.data.items[i].data.UI_NM);
        pr.addParam('SUMMARY', gridData.data.items[i].data.SUMMARY);
        pr.addParam('FILE_CATEGORY', gridData.data.items[i].data.FILE_CATEGORY);
        pr.addParam('REQ_SIMILARITY', gridData.data.items[i].data.REQ_SIMILARITY);
        pr.addParam('E_DT', gridData.data.items[i].data.E_DT);
        var ds = DBconnect.runProcedure(pr);
    }
    deleteDB();
    //
    grd_a.reconfigure(gridData);
}
function deleteDB() {
    var pr = DBParams.create('sp_AnlFormA01', 'DELETE_TABLE');
    for (var i = 0; i < deleteArray.length; i++) {
        //각 탭 delete list 튜블 수 loop
        pr.addParam('UP_KEY', deleteArray.pop());
        var ds = DBconnect.runProcedure(pr);
    }
}
//grid 변환
grd_a.eSelectionChange = function (record, rowIndex, paramId) {
    console.log(paramId, record.data, rowIndex);

    cbo_req.setValue(record.data.REQ_SIMILARITY);
    cbo_fcagtegory.setValue(record.data.FILE_CATEGORY);
    txt_nm.setValue(record.data.UI_NM);
    txta_summary.setValue(record.data.SUMMARY);
    cbo_NOTICE_USER_HH.setValue(record.data.E_USER);
    up_doc.setFileKey(record.data.UP_KEY);

}

grid_update = function () {

    if (up_key != 1) {
        grd_a.selection.set('UP_KEY', up_key);
        up_key = 1;
    }
    grd_a.selection.set('REQ_SIMILARITY', cbo_req.getValue());
    grd_a.selection.set('FILE_CATEGORY', cbo_fcagtegory.getValue());
    grd_a.selection.set('SUMMARY', txta_summary.getValue());
    grd_a.selection.set('UI_NM', txt_nm.getValue());
    grd_a.selection.set('E_USER', cbo_NOTICE_USER_HH.getValue());
    if (grd_a.selection.data.S_DT == null) {
        grd_a.selection.set('S_DT', dt_update.getYMD());
    }
    grd_a.selection.set('E_DT', dt_update.getYMD());

    grd_a.reconfigure(gridData);
}//grid update
btn_update.eClick = function () {
    grid_update();

    cbo_req.setValue(null);
    cbo_fcagtegory.setValue(null);
    txt_nm.setValue(null);
    txta_summary.setValue(null);
    cbo_NOTICE_USER_HH.setValue(null);
    up_doc.setFileKey(null);

}
btn_search.eClick = function () {
    if (dt_SDATE.getYMD() > dt_EDATE.getYMD()) { }
    else {
        var prS = DBParams.create('sp_AnlFormA01', 'DT_SEARCH');
        prS.addParam('S_SEARCH', dt_SDATE.getYMD());
        prS.addParam('E_SEARCH', dt_EDATE.getYMD());
        var dsS = DBconnect.runProcedure(prS);
        grd_a.reconfigure(dsS[0]);


    }
}