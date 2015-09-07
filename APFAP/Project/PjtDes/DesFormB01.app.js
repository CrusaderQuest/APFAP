/// <reference path="../../Resource/Script/ext-all-debug.js" />
/// <reference path="../../Resource/Script/component.js" />
/// <reference path="../../Resource/Script/noncomponent.js" />
/// <reference path="DesFormB01.view.js" />

//App 단 정의 영역 시작

//eSelectionChange(a,b,c);


grd.eSelectionChange = function (record, rowindex, paramId) {
    var prm = DBParams.create('sp_DesFormB01', 'GET_COLUMN');
    prm.addParam('TABLE_KEY',record.data.TABLE_KEY);
    var tblnm = DBconnect.runProcedure(prm);
    tbldetail_save.clearData();
    tbldetail_save = tblnm[0];
    grd_Detail.reconfigure(tbldetail_save);

    
    var prm3 = DBParams.create('sp_DesFormB01', 'GET_EXAMPLE');
    prm3.addParam('TABLE_KEY', record.data.TABLE_KEY);
    var column_ex = DBconnect.runProcedure(prm3);
    example_save.clearData();
    example_save = column_ex[0];
    grd_Example.reconfigure(example_save);

    ///////////////////////////////자 설명해 여기가 클릭하면 바뀌는거임 여기 위에 
    
    //if (rowindex == 2) {
    //    console.log('2번row index 클릭!');
    //    grd_Detail.reconfigure(gridData_second);
    //    grd_Example.reconfigure(gridData_example2);
    //    btn_insert.eClick = function () {
    //        gridData_second.add("''");
    //    }
    //    console.log(grd.getRow(2));
    //    txt_test.setValue(grd.getRow(2).data.tableName);
    //}
    //if (rowindex == 1) {
    //    console.log('1번row index 클릭!');
    //    grd_Detail.reconfigure(gridData);
    //    grd_Example.reconfigure(gridData_example);

    //    btn_insert.eClick = function () {
    //        gridData.add("''");
    //    }
    //}
}
grd_Detail.eButtonAddClick = function () {
    tbldetail_save.add({ COLUMN_NM: '', DATA_TYPE: '', PRIMARY_CHECK: 'F', NULL_CHECK: 'F' });
}
//btn_delete.eClick = function () {
//    gridData.remove(grd_Detail.getSelection());
//    gridData_second.remove(grd_Detail.getSelection());
//}

function getTable() {
    var prm = DBParams.create('sp_DesFormB01', 'GET_TABLE_NM');
    var tblnm = DBconnect.runProcedure(prm);
    tblnm_save = tblnm[0];
    grd.reconfigure(tblnm_save);
}
function getColumn() {
    var prm2 = DBParams.create('sp_DesFormB01', 'GET_COLUMN');
    prm2.addParam('TABLE_KEY', tblnm_save.data.items[0].data.TABLE_KEY);
    var column_detail = DBconnect.runProcedure(prm2);
    tbldetail_save = column_detail[0];
    grd_Detail.reconfigure(tbldetail_save);
    //for (var i = 0; i < tbldetail_save.data.length; i++) {
    //    grd_Example.addColumn('text', tbldetail_save.data.items[i].data.COLUMN_NM, tbldetail_save.data.items[i].data.COLUMN_NM, 200);
    //    var TEMP = tbldetail_save.data.items[i].data.COLUMN_NM;
    //} 요부분이 세로로 나오게 하는부분임 

}
function getExample() {//
    var prm3 = DBParams.create('sp_DesFormB01', 'GET_EXAMPLE');
    prm3.addParam('TABLE_KEY', tblnm_save.data.items[0].data.TABLE_KEY);
    var column_ex = DBconnect.runProcedure(prm3);
    example_save = column_ex[0];
    grd_Example.reconfigure(example_save);
    //prm3.addParam('COLUMN_NO', tbldetail_save.data.items[0].data.COLUMN_NO); 
}