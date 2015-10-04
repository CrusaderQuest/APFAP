/// <reference path="../../Resource/Scripts/ext-all-debug.js" />
/// <reference path="../../Resource/Scripts/component.js" />
/// <reference path="../../Resource/Scripts/noncomponent.js" />
/// <reference path="DefFormA01.app.js" />

//View 단 정의 영역 시작
var tbl_MAKE = ApTable.create(1);
tbl_MAKE.setTarget();
//제목
var txt_TITLE = ApText.create('제목');
txt_TITLE.setWidth(460);
var dt_END = ApDate.create('기한', '', 60);
dt_END.setWidth(185);
dt_END.setToday();
tbl_MAKE.cellShare(2);
var txa_SUBTITLE = ApTextArea.create('설명');
txa_SUBTITLE.setWidth(650);
//프로젝트 타입

var cbo_TYPE_1 = ApCombo.create('성향', '');
//프로젝트 형태
var cbo_TYPE_2 = ApCombo.create('형태', '');
//팀명
var txt_TEAMNAME = ApText.create('팀명');
txt_TEAMNAME.setWidth(280);
tbl_MAKE.cellShare(3);
//이미지
var upl_TEAMIMG = ApUpload.create('대표 이미지');
var img_TEAMIMG = ApImg.create();
img_TEAMIMG.setSize(100, 100);


var dbData;

//ApEvent
ApEvent.onlaod = function () {

    //set Panel
    viewPanel.full(tbl_MAKE);

    GRD_LOAD();
}
