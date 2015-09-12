/// <reference path="../../Resource/Scripts/ext-all-debug.js" />
/// <reference path="../../Resource/Scripts/component.js" />
/// <reference path="../../Resource/Scripts/noncomponent.js" />
/// <reference path="AnlFormA01.view.js" />

//App 단 정의 영역 시작
function GRD_LOAD() {
    //데이터생성
    var pr = DBParams.create('sp_ANLFORMA01', 'GET_TABLE');
    //데이터셋
    var ds = DBconnect.runProcedure(pr);
    gridData = ds[0];
    grd_a.reconfigure(gridData);
}

grd_a.eButtonAddClick = function () {
    gridData.add({ UI_NM: '', SUMMARY: '', FILE_CATEGORY: 'ETC', REQ_SIMILARITY: '2' });
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
        if (gridData.data.items[i].data.FUNC_NUM == 0) {//insert
            pr = DBParams.create('sp_ANLFORMA01', 'INSERT_TABLE');
            pr.addParam('E_USER', gridData.data.items[i].data.E_USER);
            pr.addParam('S_DT', gridData.data.items[i].data.S_DT);
        } else {//update
            pr = DBParams.create('sp_ANLFORMA01', 'UPDATE_TABLE');
            pr.addParam('UP_KEY', gridData.data.items[i].data.UP_KEY);
        }
        pr.addParam('UI_NM', gridData.data.items[i].data.DOC_NM);
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
    var pr = DBParams.create('sp_DefFormB01', 'DELETE_TABLE');
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

}

//grid update
btn_update.eClick = function () {
    grd_a.selection.set('REQ_SIMILARITY', cbo_req.getValue());
    grd_a.selection.set('FILE_CATEGORY', cbo_fcagtegory.getValue());
    grd_a.selection.set('SUMMARY', txta_summary.getValue());
    grd_a.selection.set('UI_NM', txt_nm.getValue());


    if (grd_a.selection.data.S_DT == '') {
        grd_a.selection.data.S_DT = dt_update.getValue();
    }
    grd_a.reconfigure(gridData);
}

//search
//btn_search.eClick = function () {
//    dt_EDATE
//}