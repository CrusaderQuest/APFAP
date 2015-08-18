/// <reference path="../../Resource/Scripts/ext-all-debug.js" />
/// <reference path="../../Resource/Scripts/component.js" />
/// <reference path="../../Resource/Scripts/noncomponent.js" />
/// <reference path="DefFormA01.app.js" />

//View 단 정의 영역 시작
var pnl_contents = ApPanel.create("TITLE");

//title
var tbl_title = ApTable.create(3);
tbl_title.setTarget();
var txt_title = ApTextArea.create("제목");
txt_title.setWidth(500);
txt_title.setHeight(50);
txt_title.setMargin(30);
var btn_change = ApButton.create("수정");
var btn_change2 = ApButton.create("저장");
btn_change2.setVisible(false);
btn_change.setWidth(80);
btn_change2.setWidth(80);
//sub title
var txta_subtitle = ApTextArea.create('부제');
txta_subtitle.setWidth(600);
txta_subtitle.setHeight(100);
txta_subtitle.setMargin(30);



ApEvent.onlaod = function () {
    pnl_contents.full(tbl_title);
    viewPanel.full(pnl_contents);
    txt_title.setDisabled(true);
    txta_subtitle.setDisabled(true);
    //GRD_LOAD();
}
