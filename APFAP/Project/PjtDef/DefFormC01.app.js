/// <reference path="../../Resource/Scripts/ext-all-debug.js" />
/// <reference path="../../Resource/Scripts/component.js" />
/// <reference path="../../Resource/Scripts/noncomponent.js" />
/// <reference path="DefFormC01.view.js" />

//View 단 정의 영역 시작
function GRD_LOAD() {
    //데이터생성
    var pr = DBParams.create('sp_DefFormC01', 'GET_TABLE');
    //데이터셋
    var ds = DBconnect.runProcedure(pr);
    gridData = ds[0];
    grd_a.reconfigure(gridData);
}
grd_a.eButtonAddClick = function () {
    grd_a.reconfigure(gridData);
    gridData.add({ UP_KEY: null, CATEGORY: '기타', DOC_NM: null, SUMMARY: null, S_DT: null, E_USER: null, E_DT: null, E_FORM: null });
    grd_a.setFocus(grd_a.getTotalCount() - 1);
}
up_doc.eUpload = function (fileKey) {
    up_key = fileKey;
}
grd_a.eButtonDeleteClick = function () {
    if (grd_a.selModel.getSelection() == 0) {
        //Ext.Msg.alert("경고 창", "클릭 해주세요.");
    } else {
        for (var i = 0; i < grd_a.getSelection().length; i++) {
            var tempNo = grd_a.getSelection()[i].data.UP_KEY;
            deleteArray.push(tempNo);
        }
        gridData.remove(grd_a.selModel.getSelection());
    }
}
btn_save.eClick = function () {
    for (var i = 0; i < gridData.data.length; i++) {
        //튜블 수 loop
        var pr;
        if (gridData.data.items[i].data.E_FORM == null) {//insert
            pr = DBParams.create('sp_DefFormB01', 'INSERT_TABLE');
            pr.addParam('E_USER', gridData.data.items[i].data.E_USER);
            pr.addParam('S_DT', gridData.data.items[i].data.S_DT);
        } else {//update
            pr = DBParams.create('sp_DefFormB01', 'UPDATE_TABLE');
        }
        pr.addParam('UP_KEY', gridData.data.items[i].data.UP_KEY);
        pr.addParam('CATEGORY', gridData.data.items[i].data.CATEGORY);
        pr.addParam('DOC_NM', gridData.data.items[i].data.DOC_NM);
        pr.addParam('SUMMARY', gridData.data.items[i].data.SUMMARY);
        pr.addParam('E_USER', gridData.data.items[i].data.E_USER);
        pr.addParam('E_DT', gridData.data.items[i].data.E_DT);
        var ds = DBconnect.runProcedure(pr);
    }
    deleteDB();
    //
    grd_a.reconfigure(gridData);
}
function deleteDB() {
    var pr = DBParams.create('sp_DefFormB01', 'DELETE_TABLE');
    for (var i = 0; i < deleteArray.length; i++) {
        //각 탭 delete list 튜블 수 loop
        pr.addParam('FUNC_NUM', deleteArray.pop());
        var ds = DBconnect.runProcedure(pr);
    }
}
//grid 변환
grd_a.eSelectionChange = function (record, rowIndex, paramId) {
    console.log(paramId, record.data, rowIndex);
    up_doc.eClear();

    cbo_category.setValue(record.data.CATEGORY);
    txt_nm.setValue(record.data.DOC_NM);
    txta_summary.setValue(record.data.SUMMARY);
    cbo_NOTICE_USER_HH.setValue(record.data.E_USER);
    up_doc.setFileKey(record.data.UP_KEY);
    
}
//grid update
btn_update.eClick = function () {
    
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
    }
    grd_a.selection.set('E_DT', dt_update.getYMD());

    grd_a.reconfigure(gridData);
}

btn_search.eClick = function () {
    if (dt_SDATE.getYMD() > dt_EDATE.getYMD()) {}
    else {
        var prS = DBParams.create('sp_DefFormC01', 'GET_TABLE');
        var dsS = DBconnect.runProcedure(prS);

        var grid_size = grd_a.getTotalCount();
        searchData = dsS[0];
        grd_a.reconfigure(searchData);

        for (i = 0; i < grid_size; i++) {
            if (searchData.data.items[i].data.E_DT < dt_SDATE.getYMD() ||
                searchData.data.items[i].data.E_DT > dt_EDATE.getYMD())
            {
                searchData.removeAt(i);
                grid_size--;
                i--;
            }
        }
    }
    grd_a.reconfigure(searchData);
}