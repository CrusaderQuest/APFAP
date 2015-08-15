/// <reference path="../../Resource/Script/ext-all-debug.js" />
/// <reference path="../../Resource/Script/component.js" />
/// <reference path="../../Resource/Script/noncomponent.js" />
/// <reference path="DevFormA01.view.js" />

//App 단 정의 영역 시작

//DB 통신
function dbLoad() {
    var pr = DBParams.create('sp_DevFormA01', 'GET_TABLE');
    var ds = DBconnect.runProcedure(pr);
    for (var i = 0; i < 4; i++) {
        dTableArray.add(ds[i]);
        deleteArray.add(Ext.create('Ext.data.ArrayStore', {
            model: 'delete_Array'
        }));
    }
}
function getDB(i) {
    var pr = DBParams.create('sp_DevFormA01', 'GET_TABLE');
    var ds = DBconnect.runProcedure(pr);
    return ds[i];
}
function dbSave() {
    dbInsertUpdate();
    dbDelete();
}
function dbUserLoad() {
    var pr = DBParams.create('sp_DevFormA01', 'GET_PROJECT_USER');
    var ds = DBconnect.runProcedure(pr);
    comboStoreUser = ds[0];
    //combo 모듈 수정되면 추가.
}
//DB 통신 private
function dbInsertUpdate() {

}
function dbDelete() {

}

//4개 탭
btn_server.eClick = function () {
    if (currentBtn != 0) {
        grd.reconfigure(dTableArray.data.items[0].data);
        currentBtn = 0;
    }
}
btn_db.eClick = function () {
    if (currentBtn != 1) {
        grd.reconfigure(dTableArray.data.items[1].data);
        currentBtn = 1;
    }
}
btn_ui.eClick = function () {
    if (currentBtn != 2) {
        grd.reconfigure(dTableArray.data.items[2].data);
        currentBtn = 2;
    }
}
btn_etc.eClick = function () {
    if (currentBtn != 3) {
        grd.reconfigure(dTableArray.data.items[3].data);
        currentBtn = 3;
    }
}

//4개 버튼
btn_insert.eClick = function () {
    dTableArray.data.items[currentBtn].data.add("''");
}
btn_delete.eClick = function () {
    //deletelist추가
    for (var i = 0; i < grd.getSelection().length; i++) {
        var tempNo = grd.getSelection()[i].data.D_DEV_NO;
        deleteArray.data.items[currentBtn].data.add(tempNo);
    }
    dTableArray.data.items[currentBtn].data.remove(grd.getSelection());
}
btn_save.eClick = function () {
    //DB 통신 insert, update, delete.
}
btn_reload.eClick = function () {
    //deletelist 초기화.
    deleteArray.data.items[currentBtn].data.clearData();
    //store 초기화, 리로딩.
    dTableArray.data.items[currentBtn].data.clearData();
    dTableArray.data.items[currentBtn].data = getDB(currentBtn);
    grd.reconfigure(dTableArray.data.items[currentBtn].data);
}

/*
function TREE_LOAD() {
    //데이터생성
    var pr = DBParams.create('SP_COMMAIN', 'SEARCH_TREE');
    //데이터셋
    var ds = DBconnect.runProcedure(pr);
    grd_form.reconfigure(ds[0]);
}

btn_aa.eClick = function () {
    if (chk_aa.getValue()) {
        chk_aa.setValue(false);
    } else {
        chk_aa.setValue(true);
    }
}
btn_bb.eClick = function () {
    tab.setActiveTab(1);
}
grd.eSelectionChange = function (record, rowIndex, paramId) {
    console.log(paramId, record.data, rowIndex);
    text_cc.setValue(record.data.USERID);
}
grd.eUpdate = function (record, rowIndex, paramId) {
    console.log(paramId, record.data, rowIndex);
}
*/