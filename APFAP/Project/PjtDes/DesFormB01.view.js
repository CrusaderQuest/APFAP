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


//var gridData_second = Ext.create('Ext.data.ArrayStore', {
//    model: 'tableDetail',
//    data: [
//        ['유진성', 'varchar(12)', true, false, '거스컬럼'],
//        ['핵바보', 'varchar(12)', true, false, '진성컬럼'],
//        ['발냄새', 'varchar(MAX)', false, true, '준희컬럼'],
//        ['꿀꿀이', 'varchar(12)', false, true, '기니컬럼']
//    ]
//});
var tbl_grd = ApTable.create(1);
tbl_grd.setTarget();
var grd_Detail = ApGrid.create('gus', true);
grd_Detail.addColumn('text', 'column Name', 'COLUMN_NM', 200);
grd_Detail.addColumn('text', 'data Type', 'DATA_TYPE', 200);
grd_Detail.addColumn('check', 'primary Key', 'PRIMARY_CHECK', 200);
grd_Detail.addColumn('check', 'null check', 'NULL_CHECK ', 200);

//grd_Detail.reconfigure(gridData);

tbl_grd.add(grd_Detail);
pnl_DBdetail_up.full(tbl_grd);
tbl_grd.setWidth('fit');

var grd_Example = ApGrid.create();


//grd_Example.reconfigure(gridData_example);
var tblnm_save;
var tbldetail_save;
var example_save;
///////////////////////////////////////////////////////////////////////////////////

var pnl_search = ApPanel.create('search');

var tbl_main = ApTable.create(1);
tbl_main.addCls('tableStyle_main');
tbl_main.updateLayout();
tbl_main.setTarget();
var btn_SAVE = ApButton.create('변경상태 저장');
btn_SAVE.setWidth(120);
var pnl_main = ApPanel.create('main');

ApEvent.onlaod = function () {
    pnl_main.divideH(pnl_DBname, pnl_DBdetail);
    tab.addTab('enroll').divideV(tbl_main, pnl_main, tbl_main);
    tbl_main.setHeight(34);
    tab.addTab('search');
    pnl_DBdetail_OUT.full(pnl_DBdetail_up);
    pnl_DBdetail_up.setHeight(380);
    pnl_DBdetail_up.setWidth('fit');
    pnl_DBdetail.divideV(pnl_DBdetail_OUT, grd_Example, pnl_DBdetail_OUT);
    pnl_DBdetail_OUT.setHeight(400);
   
    pnl_DBname.full(grd);
    pnl_DBname.setWidth(250);
    getTable();
    getColumn();
    getExample();
    viewPanel.full(tab);
   
}