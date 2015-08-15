/// <reference path="../../Resource/Script/ext-all-debug.js" />
/// <reference path="../../Resource/Script/component.js" />
/// <reference path="../../Resource/Script/noncomponent.js" />
/// <reference path="ComFormA01.view.js" />

//App 단 정의 영역 시작
//고객 보수 내역

function dbLoad() {
    var pr = DBParams.create('sp_ComFormA01', 'GET_TABLE');
    var ds = DBconnect.runProcedure(pr);
    grdData = ds[0];
    grd.reconfigure(grdData);
}
function dbUserLoad() {
    var pr = DBParams.create('sp_ComFormA01', 'GET_PROJECT_USER');
    var ds = DBconnect.runProcedure(pr);
    comboStoreUser = ds[0];
}
function dbCategoryLoad() {

}
function dbStateLoad() {
    var pr = DBParams.create('sp_ComFormA01', 'GET_STATE');
    var ds = DBconnect.runProcedure(pr);
    comboStoreState = ds[0];
}

btn_save.eClick = function () {

}
btn_insert.eClick = function () {

}
btn_delete.eClick = function () {

}