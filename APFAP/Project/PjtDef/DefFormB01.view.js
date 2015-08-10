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
        { name: 'BLANK' }
    ]
});

//pnl_input
var tbl_input = ApTable.create();
tbl_input.setTarget();
var txt_category = ApText.create("업무 영역 ");
var txt_reqNm = ApText.create("요구 사항 ");
var txt_blank = ApText.create("비고 ");
//btn
var btn_ok = ApButton.create("추가");
btn_ok.eClick();
var btn_clrear = ApButton.create("삭제");
btn_clrear.eClick();
//var btn = Ext.create('Ext.button.Button', {
//    text: 'sd',
//    listeners: [{
//        click: function () {
//            Ext.Msg.alert("sdsd");
//        }
//    }]
//});

pnl_input.full(tbl_input);

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

var grd_a = ApGrid.create();

grd_a.addColumn('text', '업무영역', 'CATEGORY', 200);
grd_a.addColumn('text', '요구사항', 'REQNM', 500);
grd_a.addColumn('text', '비고', 'BLANK', 300);
grd_a.reconfigure(gridData);
gridData.add(reqData, ['aaa5', '추가추가추가1', '구기능을 수정하는 요구사항이다.']);

pnl_grid.full(grd_a);



viewPanel.full(pnl_contents);
//grd.reconfigure(gridData);



Ext.onReady(function () {
    
});
