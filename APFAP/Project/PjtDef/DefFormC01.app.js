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
    gridData.add({ UP_KEY: '', CATEGORY: '기타', DOC_NM: '', SUMMARY: '', S_DT: '', E_USER: '', E_DT: '' });
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
        if (gridData.data.items[i].data.FUNC_NUM == 0) {//insert
            pr = DBParams.create('sp_DefFormB01', 'INSERT_TABLE');
            pr.addParam('E_USER', gridData.data.items[i].data.E_USER);
            pr.addParam('S_DT', gridData.data.items[i].data.S_DT);
        } else {//update
            pr = DBParams.create('sp_DefFormB01', 'UPDATE_TABLE');
            pr.addParam('UP_KEY', gridData.data.items[i].data.UP_KEY);
        }
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

    cbo_category.setValue(record.data.CATEGORY);
    txt_nm.setValue(record.data.DOC_NM);
    txta_summary.setValue(record.data.SUMMARY);
    cbo_NOTICE_USER_HH.setValue(record.data.E_USER);
    index = record;

}

//grid update
btn_update.eClick = function () {
    if (gridData.data.items[index].data.UP_KEY == '') {
        gridData.data.items[index].data.UP_KEY = up_key;
    }
    grd_a.selection.set('CATEGORY', cbo_category.getValue());
    grd_a.selection.set('DOC_NM', txt_nm.getValue());

    grd_a.selection.set('SUMMARY', txta_summary.getValue());
    grd_a.selection.set('E_USER', cbo_NOTICE_USER_HH.getValue());


    //gridData.data.items[index].data.FUNC_IMP = cbo_imp.getValue();
    //gridData.data.items[index].data.CATEGORY = cbo_category.getValue();
    //gridData.data.items[index].data.FUNC_NM = txt_nm.getValue();
    //gridData.data.items[index].data.SUMMARY = txta_summary.getValue();
    ////gridData.data.items[index].data.E_USER = cbo_NOTICE_USER_HH.getValue();
    //grd_a.getRow(index).set('E_USER', cbo_NOTICE_USER_HH.getValue());
    if (grd_a.selection.data.S_DT == '') {
        grd_a.selection.data.S_DT = dt_update.getValue();
    }
    grd_a.reconfigure(gridData);
}

//search
//btn_search.eClick = function () {
//    dt_EDATE
//}