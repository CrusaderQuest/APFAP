/// <reference path="../../Resource/Script/ext-all-debug.js" />
/// <reference path="../../Resource/Script/component.js" />
/// <reference path="../../Resource/Script/noncomponent.js" />
/// <reference path="DesFormA01.view.js" />

//App 단 정의 영역 시작

function getTable() {
    var prm = DBParams.create('sp_DesFormA01', 'GET_TABLE');
    var dbc = DBconnect.runProcedure(prm);
    dbc_save = dbc[0];
    grd.reconfigure(dbc_save);
}
function get_Init_Table() {
    var pr = DBParams.create('sp_DesFormA01', 'GET_TABLE');
    var ds = DBconnect.runProcedure(pr);
    if (ds[0].data.length == 0)
    {
        pr = DBParams.create('sp_DesFormA01', 'INSERT_TABLE');
        ds = DBconnect.runProcedure(pr);
    }
}

btn_SAVE.eClick = function () {
    var prm = DBParams.create('sp_DesFormA01', 'UPDATE_TABLE');
    dbc_save.data.items[0].data.UP_KEY = upload.getFileKey();
    if (dbc_save.data.items[0].data.UP_KEY) {
        dbc_save.data.items[0].data.CHECK_UPLOAD = 'T';
    }
    else {
        dbc_save.data.items[0].data.CHECK_UPLOAD = 'F';
    }
    prm.addParam('E_DT', ApFn.setYMD(dbc_save.data.items[0].data.E_DT));
    prm.addParam('CHECK_UPLOAD', dbc_save.data.items[0].data.CHECK_UPLOAD);
    prm.addParam('SUMMARY', dbc_save.data.items[0].data.SUMMARY);
    prm.addParam('UP_KEY', dbc_save.data.items[0].data.UP_KEY);
    var dbc = DBconnect.runProcedure(prm);
    getTable();
}