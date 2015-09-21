/// <reference path="../../Resource/Scripts/ext-all-debug.js" />
/// <reference path="../../Resource/Scripts/component.js" />
/// <reference path="../../Resource/Scripts/noncomponent.js" />
//

//View 단 정의 영역 시작
//data Base 설계 부분 

var isUpdated = 0;
var currentTable = 0;

var pnl_DBname = ApPanel.create('table Name');

var grd = ApGrid.create(true,true);
grd.addColumn('text', 'table Name', 'TABLE_NM', 195);
var pnl_DBdetail_up = ApPanel.create('Up of up on grid');
var pnl_DBdetail = ApPanel.create('table Detail');

var pnl_DBdetail_OUT = ApPanel.create('Up');
var tbl_grd = ApTable.create(1);
tbl_grd.setTarget();
var grd_Detail = ApGrid.create(true, true);
grd_Detail.addColumn('text', 'column Name', 'COLUMN_NM', 200);
grd_Detail.addColumn('text', 'data Type', 'DATA_TYPE', 200);
grd_Detail.addColumn('check', 'primary Key', 'PRIMARY_CHECK', 200);
grd_Detail.addColumn('check', 'null check', 'NULL_CHECK ', 200);


tbl_grd.add(grd_Detail);
pnl_DBdetail_up.full(tbl_grd);
tbl_grd.setWidth('fit');
tbl_grd.setHeight(500);

var grd_Example = ApGrid.create();
grd_Example.addColumn('text', 'column Name', 'COLUMN_NM', 150);
grd_Example.addColumn('text', 'for example1', 'EXAMPLE_ONE', 150);
grd_Example.addColumn('text', 'for example2', 'EXAMPLE_TWO', 150);
grd_Example.addColumn('text', 'for example3', 'EXAMPLE_THREE', 150);
grd_Example.addColumn('text', 'for example4', 'EXAMPLE_FOUR', 150);

var tblnm_save;
var tbldetail_save;
var example_save;
///////////////////////////////////////////////////////////////////////////////////

var pnl_search = ApPanel.create('search');

;
var pnl_main = ApPanel.create('main');
//////////////////////////////////////////////////////////////////////////////////


ApEvent.onlaod = function () {

    pnl_main.divideH(pnl_DBname, pnl_DBdetail);
   


    pnl_DBdetail_OUT.full(pnl_DBdetail_up);
    pnl_DBdetail_up.setWidth('fit');
    pnl_DBdetail.divideV(pnl_DBdetail_OUT, grd_Example, pnl_DBdetail_OUT);
    pnl_DBdetail_OUT.setHeight(300);
   
    pnl_DBname.full(grd);
    pnl_DBname.setWidth(250);
    getTable(0);
    getColumn(currentTable);
    getExample(currentTable);
    viewPanel.full(pnl_main);
   
    grd_Example.setLockColumns('COLUMN_NM');
}