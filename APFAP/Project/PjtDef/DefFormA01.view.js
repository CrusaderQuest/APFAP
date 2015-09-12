/// <reference path="../../Resource/Scripts/ext-all-debug.js" />
/// <reference path="../../Resource/Scripts/component.js" />
/// <reference path="../../Resource/Scripts/noncomponent.js" />
/// <reference path="DefFormA01.app.js" />

//View 단 정의 영역 시작
var pnl_contents = ApPanel.create("TITLE");
//data
var dbData;

// tbl_main
var tbl_main = ApTable.create(2);
tbl_main.addCls('tableStyle_main');
tbl_main.updateLayout();
tbl_main.setTarget();
var btn_save = ApButton.create("변경상태 저장");
var lb_main = ApLabel.create("프로젝트 타이틀 ----- 프로젝트의 제목을 정의 해주세요");

//title
var tbl_title = ApTable.create(1);
tbl_title.setTarget();
var txt_title = ApTextArea.create("제목");
//sub title
var txta_subtitle = ApTextArea.create('부제');



ApEvent.onlaod = function () {

    pnl_contents.divideV(tbl_main,tbl_title);
    viewPanel.full(pnl_contents);

    //tbl main 
    tbl_main.setHeight(35);

    //title, subtitle
    txt_title.setWidth(500);
    txt_title.setHeight(50);
    txt_title.setMargin(30);
    txta_subtitle.setWidth(600);
    txta_subtitle.setHeight(100);
    txta_subtitle.setMargin(30);
    GRD_LOAD();
}
