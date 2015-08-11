/// <reference path="../../Resource/Scripts/ext-all-debug.js" />
/// <reference path="../../Resource/Scripts/component.js" />
/// <reference path="../../Resource/Scripts/noncomponent.js" />
//

//View 단 정의 영역 시작
var pnl_contents = ApPanel.create("REQ_DOC");
var pnl_input = ApPanel.create("Input");
var pnl_grid = ApPanel.create("Grid");

pnl_contents.divideV(pnl_input, pnl_grid);

//data-type
Ext.define('reqData', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'USERID' },
        { name: 'CATEGORY' },
        { name: 'REQNM' },
        { name: 'SUMMARY' },
        { name: 'CONTENT' },
        { name: 'IMPORTANT' },
        { name: 'LEVEL',type:'number' }
    ]
});
//pnl_input
var tbl_input_1 = ApTable.create();
tbl_input_1.setTarget();
var txt_category = ApText.create("업무 영역 ");
var txt_reqNm = ApText.create("요구 사항 ");
var txt_summary = ApText.create("개요 ");
//btn
var btn_ok = ApButton.create("저장");
btn_ok.eClick();
var btn_clrear = ApButton.create("삭제");
btn_clrear.eClick();

var tbl_input_2 = ApTable.create();
tbl_input_2.setTarget();
var txt_desc = ApText.create("상세 내용 ");
var txt_imp = ApText.create("중요도 ");
var cbo_level = ApCombo.create("난이도");
var txt_blank = ApText.create("비고 ");
//setDisabled
txt_category.setDisabled(true);
txt_reqNm.setDisabled(true);
txt_blank.setDisabled(true);

pnl_input.divideV(tbl_input_1, tbl_input_2);
pnl_input.setSize(0, 200);

//pnl_grid
var gridData = Ext.create('Ext.data.ArrayStore', {
    model: 'reqData',
    data: [
        ['aaa1', '신규기능추가', '기존 ui와 차별화된 것을 만들어라'],
        ['aaa2', '신규기능추가', '신규기능 추가하는 요구사항이다'],
        ['aaa3', '구 기능 수정', '예전 ui를 차별화 되게 바꾸라'],
        ['aaa4', '구 기능 수정', '구기능을 수정하는 요구사항이다.']
    ]
});
var tbl_grid = ApTable.create();
tbl_grid.setTarget();
var btn_add = ApButton.create("추가");
var grd_a = ApGrid.create();

grd_a.addColumn('text', '업무영역', 'CATEGORY', 200);
grd_a.addColumn('text', '요구사항', 'REQNM', 200);
grd_a.addColumn('text', '개요', 'SUMMARY', 300);
grd_a.addColumn('text', '상세 내용', 'DESCRIPTION', 300);
grd_a.addColumn('text', '중요도', 'IMPORTANT', 100);
grd_a.addColumn('num', '난이도', 'LEVEL', 100);
grd_a.reconfigure(gridData);

pnl_grid.divideV(grd_a, tbl_grid);



viewPanel.full(pnl_contents);
//grd.reconfigure(gridData);



Ext.onReady(function () {

});
