/// <reference path="../../Resource/Scripts/ext-all-debug.js" />
/// <reference path="../../Resource/Scripts/component.js" />
/// <reference path="../../Resource/Scripts/noncomponent.js" />
//

//View 단 정의 영역 시작
var pnl_contents = ApPanel.create("FUNC");

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
pnl_contents.full(grd_a);

viewPanel.full(pnl_contents);


Ext.onReady(function () {

});
