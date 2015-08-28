/// <reference path="../../Resource/Scripts/ext-all-debug.js" />
/// <reference path="../../Resource/Scripts/component.js" />
/// <reference path="../../Resource/Scripts/noncomponent.js" />
//

//View 단 정의 영역 시작
//data Base 설계 부분 
var tab = ApTab.create();

var pnl_DBname = ApPanel.create('table Name');
var grd = ApGrid.create();
grd.addColumn('text', 'table Name', 'TABLE_NM', 195);
//Ext.define('tableName', {
//    extend: 'Ext.data.Model',
//    fields: [
//        { name: 'TABLE_NM' },
//    ]
//});

//var gridData_table_name = Ext.create('Ext.data.ArrayStore', {
//    model: 'tableName',
//    data: [
//        ['gusTable'], ['jinsungTable'], ['junheeTable'], ['giniTable']
//    ]
//});


//grd.reconfigure(gridData_table_name);


///////////////////////////////////////////////////////////
//var pnl_DBdetail_down = ApPanel.create('Down');
//var tbl_button = ApTable.create(3);
//tbl_button.setTarget();
//var btn_insert = ApButton.create('insert');
//var btn_delete = ApButton.create('delete');
//var btn_save = ApButton.create('save');
//tbl_button.setPosition(540, 0, null);
//pnl_DBdetail_down.full(tbl_button);


var pnl_DBdetail_up = ApPanel.create('Up of up on grid');
var pnl_DBdetail = ApPanel.create('table Detail');

var pnl_DBdetail_OUT = ApPanel.create('Up');


Ext.define('tableDetail', {
    extend: 'Ext.data.Model',

    fields: [
        { name: 'columnName' },
        { name: 'dataType' },
        { name: 'primaryKey', type: 'boolean' },
        { name: 'nullCheck', type: 'boolean' },
        { name: 'summary' }
    ]
});

var gridData = Ext.create('Ext.data.ArrayStore', {
    model: 'tableDetail',
    data: [
        ['gusColumn', 'varchar(12)', true, false, '거스컬럼'],
        ['jinsungColumn', 'varchar(12)', true, false, '진성컬럼'],
        ['junheeColumn', 'varchar(MAX)', false, true, '준희컬럼'],
        ['giniColumn', 'varchar(12)', false, true, '기니컬럼']
    ]
});
var gridData_second = Ext.create('Ext.data.ArrayStore', {
    model: 'tableDetail',
    data: [
        ['유진성', 'varchar(12)', true, false, '거스컬럼'],
        ['핵바보', 'varchar(12)', true, false, '진성컬럼'],
        ['발냄새', 'varchar(MAX)', false, true, '준희컬럼'],
        ['꿀꿀이', 'varchar(12)', false, true, '기니컬럼']
    ]
});
var tbl_grd = ApTable.create(1);
tbl_grd.setTarget();
var grd_Detail = ApGrid.create('gus', true);
grd_Detail.addColumn('text', 'column Name', 'COLUMN_NM', 200);
grd_Detail.addColumn('text', 'data Type', 'DATA_TYPE', 200);
grd_Detail.addColumn('check', 'primary Key', 'PRIMARY_CHECK', 200);
grd_Detail.addColumn('check', 'null check', 'NULL_CHECK ', 200);

grd_Detail.reconfigure(gridData);

tbl_grd.add(grd_Detail);
pnl_DBdetail_up.full(tbl_grd);
tbl_grd.setWidth('fit');
/////////////////////////////////////////////////////

Ext.define('tableExample', {
    extend: 'Ext.data.Model',

    fields: [
        { name: 'example_1' },
        { name: 'example_2' },
        { name: 'example_3' },
        { name: 'example_4' },
    ]
});

var gridData_example = Ext.create('Ext.data.ArrayStore', {
    model: 'tableExample',
    data: [
        ['K000000000000', 'K000000000000', 'K000000000000', 'K000000000000'],
        ['K000000000000', 'K000000000000', 'K000000000000', 'K000000000000'],
        ['K000000000000', 'K000000000000', 'K000000000000', 'K000000000000'],
        ['K000000000000', 'K000000000000', 'K000000000000', 'K000000000000']
    ]
});
var gridData_example2 = Ext.create('Ext.data.ArrayStore', {
    model: 'tableExample',
    data: [
        ['이거이제', 'K000000000000', 'K000000000000', 'K000000000000'],
        ['같이바끼지롱', 'K000000000000', 'K000000000000', 'K000000000000'],
        ['K000000000000', 'K000000000000', 'K000000000000', 'K000000000000'],
        ['K000000000000', 'K000000000000', 'K000000000000', 'K000000000000']
    ]
});

var grd_Example = ApGrid.create();
grd_Example.addColumn('text', 'gusColumn', 'example_1', 100);
grd_Example.addColumn('text', 'jinsungColumn', 'example_2', 100);
grd_Example.addColumn('text', 'junheeColumn', 'example_3', 100);
grd_Example.addColumn('text', 'giniColumn', 'example_4', 100);

grd_Example.reconfigure(gridData_example);
var tblnm_save;
var tbldetail_save;

///////////////////////////////////////////////////////////////////////////////////

var pnl_search = ApPanel.create('search');

ApEvent.onlaod = function () {
    tab.addTab('enroll').divideH(pnl_DBname, pnl_DBdetail);
    tab.addTab('search');
    pnl_DBdetail_OUT.full(pnl_DBdetail_up);
    pnl_DBdetail_up.setHeight(380);
    pnl_DBdetail_up.setWidth('fit');
    pnl_DBdetail.divideV(pnl_DBdetail_OUT, grd_Example, pnl_DBdetail_OUT);
    pnl_DBdetail_OUT.setHeight(400);
    //viewPanel.divideH(pnl_DBname, pnl_DBdetail);
    pnl_DBname.full(grd);
    pnl_DBname.setWidth(250);
    getTable();
    
    viewPanel.full(tab);
    /*for (var i = 0; i < tblnm_save.data.length; i++) {
        grd.reconfigure(tblnm_save.data.items[i].data);
    }
    */
}