/// <reference path="../../Resource/Scripts/ext-all-debug.js" />
/// <reference path="../../Resource/Scripts/component.js" />
/// <reference path="../../Resource/Scripts/noncomponent.js" />
/// <reference path="AnlFormB01.app.js" />

//View 단 정의 영역 시작
var pnl_contents = ApPanel.create("REQ_DOC");
var pnl_input = ApPanel.create("Input");
var pnl_grid = ApPanel.create("Grid");

//data-type

var gridData;

//var comboStoreI = Ext.create('Ext.data.ArrayStore', {
//    fields: ['SHOWDATA','HIDEDATA'],
//    data: [
//        ['H', 'HIGH'],
//        ['M', 'MIDDLE'],
//        ['L', 'LOW']
//    ]
//});
//var comboStoreL = Ext.create('Ext.data.ArrayStore', {
//    fields: ['SHOWDATA','HIDEDATA'],
//    data: [
//        ['★', 1],
//        ['★★', 2],
//        ['★★★', 3],
//        ['★★★★', 5],
//        ['★★★★★', 5]
//    ]
//});

//pnl_input
var tbl_input = ApTable.create();
tbl_input.setTarget();

var txt_category = ApText.create("업무 영역 ");
var txt_reqNm = ApText.create("요구 사항 ");
var txt_summary = ApText.create("개요");

//btn
var btn_ok = ApButton.create("추가");
btn_ok.eClick();
var btn_clrear = ApButton.create("삭제");
btn_clrear.eClick();

//pnl_input2
var tbl_input2 = ApTable.create();
tbl_input2.setTarget();

var txt_desc = ApText.create("상세");
var cbo_imp = ApCombo.create("중요도");
var cbo_lev = ApCombo.create("난이도");
var txt_blank = ApText.create("비고 ");

cbo_lev.addItem('★', 1);
cbo_lev.addItem('★★', 2);
cbo_lev.addItem('★★★', 3);
cbo_lev.addItem('★★★★', 4);
cbo_lev.addItem('★★★★★', 5);
cbo_imp.addItem('H', 'HIGH');
cbo_imp.addItem('M', 'MIDDLE');
cbo_imp.addItem('L', 'LOW');

//pnl_grid

var tbl_grid = ApTable.create();
tbl_grid.setTarget();
var btn_del = ApButton.create("그리드 삭제");
var btn_save = ApButton.create("데이터베이스에 저장");
var grd_a = ApGrid.create(true);
grd_a.addColumn('text', '업무영역', 'CATEGORY', 200);
grd_a.addColumn('text', '요구사항', 'REQ_NM', 200);
grd_a.addColumn('text', '개요', 'SUMMARY', 300);
grd_a.addColumn('text', '상세', 'DESCRIPTION', 300);
grd_a.addColumn('text', '중요도', 'IMPORTANT', 100);
grd_a.addColumn('text', '난이도', 'LEV', 100);
grd_a.addColumn('text', '비고', 'BLANK', 300);


viewPanel.full(pnl_contents);
//grd_a.reconfigure(gridData);

ApEvent.onlaod = function () {

    pnl_contents.divideV(pnl_input, pnl_grid);
    pnl_input.divideV(tbl_input, tbl_input2);
    tbl_input.bodyStyle = 'padding: 10px 10px';
    tbl_input2.bodyStyle = 'padding: 10px 10px';
    pnl_grid.divideV(grd_a, tbl_grid);

    GRD_LOAD();
}
