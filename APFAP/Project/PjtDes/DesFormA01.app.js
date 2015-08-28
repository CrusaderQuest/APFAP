/// <reference path="../../Resource/Script/ext-all-debug.js" />
/// <reference path="../../Resource/Script/component.js" />
/// <reference path="../../Resource/Script/noncomponent.js" />
/// <reference path="DesFormA01.view.js" />

//App 단 정의 영역 시작

//btn_insert.eClick = function () {
//    Ext.Msg.alert("창 이름", "경고 내용");
//}

//btn_delete.eClick = function () {
//    Ext.Msg.alert("창 이름", "경고 내용");
//}
function getTable() {
    var prm = DBParams.create('sp_DesFormA01', 'GET_TABLE');
    var dbc = DBconnect.runProcedure(prm);
    dbc_save = dbc[0];
    //var pn = DBParams.create('sp_DesFormB01', 'GET_TABLE_FOR_TREE');
    //var dtree = DBconnect.runProcedure(pn);
    //tree_save = dtree[0];
    grd.reconfigure(dbc_save);
    //var prm2 = DBParams.create('sp_DesFormB01', 'GET_DEFAULT_COLUMN');
    //var column_detail = DBconnect.runProcedure(prm2);
    //tbldetail_save = column_detail[0];
    //grd_Detail.reconfigure(tbldetail_save);
}