/// <reference path="../../Resource/Scripts/ext-all-debug.js" />
/// <reference path="../../Resource/Scripts/component.js" />
/// <reference path="../../Resource/Scripts/noncomponent.js" />
//

//View 단 정의 영역 시작

//여기는 화면정의에 대한 부분임(이미지 삽입해서 보여주는거)

//트리선언
var tre_H = ApTree.create('스크린정보', '', true, false);

var tbl_H = ApTable.create(1);
tbl_H.setTarget();
var btn_show_H = ApButton.create('Full');
var btn_add_H = ApButton.create('+');
var btn_child_H = ApButton.create('하위+');
var btn_remove_H = ApButton.create('-');
var btn_up_H = ApButton.create('↑');
var btn_down_H = ApButton.create('↓');

var pnl_D = ApPanel.create();
var pnl_DD = ApPanel.create();

var tbl_D = ApTable.create(1);
tbl_D.setTarget();
var txt_SCREEN_NM_D = ApText.create('화면이름');
var txt_SCREEN_D = ApText.create('등록일자');
var txt_USER_NM_D = ApText.create('등록자');
tbl_D.cellShare(3);

var txa_SUMMARY_D = ApTextArea.create('화면설명');
txa_SUMMARY_D.setWidth(550);
var upl_UPLOAD_D = ApUpload.create('화면업로드');
var img_UPLOAD_D = ApImg.create();
img_UPLOAD_D.setWidth(600);
img_UPLOAD_D.setHeight(320);
ApEvent.onlaod = function () {
    SYS_INIT();
    var paneltest = ApPanel.create();
    viewPanel.divideH(paneltest, pnl_D);
    paneltest.setWidth(400);
    paneltest.add(tre_H);
    pnl_D.divideH(tbl_H, tbl_D);
    tbl_H.setWidth(100);
}