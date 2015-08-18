/// <reference path="../../Resource/Scripts/ext-all-debug.js" />
/// <reference path="../../Resource/Scripts/component.js" />
/// <reference path="../../Resource/Scripts/noncomponent.js" />
//

//View 단 정의 영역 시작
var pnl_contents = ApPanel.create("TITLE");

//title
var tbl_title = ApTable.create();
tbl_title.setTarget();
var txt_title = ApText.create('제목: ');
txt_title.setWidth(500);
txt_title.setHeight(50);
txt_title.setMargin(30);

var btn_change = ApButton.create("수정");
btn_change.setWidth(50);
//sub title
var tbl_subtitle = ApTable.create();
tbl_subtitle.setTarget();
var txt_subtitle = ApText.create('부제: ');
txt_subtitle.setWidth(500);
txt_subtitle.setHeight(50);
txt_subtitle.setMargin(30);



ApEvent.onlaod = function () {
    pnl_contents.divideV(tbl_title, tbl_subtitle);
    viewPanel.full(pnl_contents);
    GRD_LOAD();
}
