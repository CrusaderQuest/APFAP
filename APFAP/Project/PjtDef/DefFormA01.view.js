/// <reference path="../../Resource/Scripts/ext-all-debug.js" />
/// <reference path="../../Resource/Scripts/component.js" />
/// <reference path="../../Resource/Scripts/noncomponent.js" />
//

//View 단 정의 영역 시작
var pnl_contents = ApPanel.create("TITLE");
viewPanel.full(pnl_contents);

var tbl_title = ApTable.create();
tbl_title.setTarget();
var txt_title = ApText.create('제목: ');
txt_title.setWidth(180);
txt_title.setHeight(100);
txt_title.setMargin(50);

var tbl_subtitle = ApTable.create();
tbl_subtitle.setTarget();
var txt_title = ApText.create('부제: ');
tbl_subtitle.setMargin(50);

pnl_contents.divideV(tbl_title, tbl_subtitle);
pnl_contents.setMargin(50);
Ext.require([
    '*'
]);

Ext.onReady(function () {
    
});