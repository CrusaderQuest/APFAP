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
        { name: 'DESCRIPTION' },
        { name: 'IMPORTANT' },
        { name: 'LEVEL' },
        { name: 'BLANK' }
    ]
});
var comboStoreI = Ext.create('Ext.data.ArrayStore', {
    fields: ['SHOWDATA','HIDEDATA'],
    data: [
        ['H', 'HIGH'],
        ['M', 'MIDDLE'],
        ['L', 'LOW']
    ]
});
var comboStoreL = Ext.create('Ext.data.ArrayStore', {
    fields: ['HIDEDATA', 'SHOWDATA'],
    data: [
        ['★', 1],
        ['★★', 2],
        ['★★★', 3],
        ['★★★★', 5],
        ['★★★★★', 5]
    ]
});

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

pnl_input.divideV(tbl_input,tbl_input2);
tbl_input.bodyStyle = 'padding: 10px 10px';
tbl_input2.bodyStyle = 'padding: 10px 10px';

//pnl_grid
var gridData = Ext.create('Ext.data.ArrayStore', {
    model: 'reqData',
    data: [
        ['aaa1', '신규기능추가', '신규 UI개발', '기존 ui와 차별화된 것을 만들어라', '상세', 'H', '★★★☆'],
        ['aaa2', '신규기능추가', '신규기능 추가하는 요구사항이다'],
        ['aaa3', '구 기능 수정', '예전 ui를 차별화 되게 바꾸라'],
        ['aaa4', '구 기능 수정', '구기능을 수정하는 요구사항이다.']
    ]
});
var tbl_grid = ApTable.create();
tbl_grid.setTarget();
var btn_del = ApButton.create("그리드 삭제");
var grd_a = ApGrid.create(true);
grd_a.addColumn('text', '업무영역', 'CATEGORY', 200);
grd_a.addColumn('text', '요구사항', 'REQNM', 200);
grd_a.addColumn('text', '개요', 'SUMMARY', 300);
grd_a.addColumn('text', '상세', 'DESCRIPTION', 300);
grd_a.addColumn('text', '중요도', 'IMPORTANT', 100);
grd_a.addColumn('text', '난이도', 'LEVEL', 100);
grd_a.addColumn('text', '비고', 'BLANK', 300);
grd_a.reconfigure(gridData);


pnl_grid.divideV(grd_a, tbl_grid);



viewPanel.full(pnl_contents);
//grd.reconfigure(gridData);



Ext.onReady(function () {

});
