/// <reference path="../Resource/Scripts/ext-all-debug.js" />
/// <reference path="../Resource/Scripts/component.js" />
/// <reference path="../Resource/Scripts/noncomponent.js" />

//프로젝트 등록
var pnl_L = ApPanel.create();
//프로젝트 선택
var pnl_R = ApPanel.create();

var pnl_SELECT = ApPanel.create('프로젝트 열람하기');
pnl_SELECT.header = true;
var pnl_MAKE = ApPanel.create('프로젝트 만들기');
pnl_MAKE.header = true;
var pnl_JOIN = ApPanel.create('프로젝트 참여하기');
pnl_JOIN.header = true;
var pnl_GOING = ApPanel.create('진행중인 프로젝트');
pnl_GOING.header = true;
var pnl_CLOSED = ApPanel.create('완료된 프로젝트');
pnl_CLOSED.header = true;

var pnl_temp1 = ApPanel.create();
var pnl_temp2 = ApPanel.create();
var pnl_temp3 = ApPanel.create();

var grd_SELECT = ApGrid.create();
grd_SELECT.addColumn('text', '성향', 'P_CATEGORY', 50);
grd_SELECT.addColumn('text', '형태', 'P_TYPE', 100);
grd_SELECT.addColumn('text', '제목', 'TITLE', 150);
grd_SELECT.addColumn('text', '설명', 'SUBTITLE', 440);
grd_SELECT.addColumn('hide', '', 'PROJECT_KEY');
grd_SELECT.setLockColumns('TITLE', 'SUBTITLE', 'P_CATEGORY', 'P_TYPE');

var grd_JOIN = ApGrid.create();
grd_JOIN.addColumn('text', '성향', 'P_CATEGORY', 50);
grd_JOIN.addColumn('text', '형태', 'P_TYPE', 100);
grd_JOIN.addColumn('text', '제목', 'TITLE', 150);
grd_JOIN.addColumn('text', '설명', 'SUBTITLE', 440);
grd_JOIN.addColumn('hide', '', 'PROJECT_KEY');
grd_JOIN.setLockColumns('TITLE', 'SUBTITLE', 'P_CATEGORY', 'P_TYPE');

var grd_GOING = ApGrid.create();
grd_GOING.addColumn('text', '성향', 'P_CATEGORY', 50);
grd_GOING.addColumn('text', '형태', 'P_TYPE', 100);
grd_GOING.addColumn('text', '제목', 'TITLE', 150);
grd_GOING.addColumn('text', '설명', 'SUBTITLE', 440);
grd_GOING.addColumn('hide', '', 'PROJECT_KEY');
grd_GOING.addColumn('hide', '', 'MASTER_TF');
grd_GOING.setLockColumns('TITLE', 'SUBTITLE', 'P_CATEGORY', 'P_TYPE');

var grd_CLOSED = ApGrid.create();
grd_CLOSED.addColumn('text', '성향', 'P_CATEGORY', 50);
grd_CLOSED.addColumn('text', '형태', 'P_TYPE', 100);
grd_CLOSED.addColumn('text', '제목', 'TITLE', 150);
grd_CLOSED.addColumn('text', '설명', 'SUBTITLE', 440);
grd_CLOSED.addColumn('hide', '', 'PROJECT_KEY');
grd_CLOSED.addColumn('hide', '', 'MASTER_TF');
grd_CLOSED.setLockColumns('TITLE', 'SUBTITLE', 'P_CATEGORY', 'P_TYPE');

var tbl_MAKE = ApTable.create(1);
tbl_MAKE.setTarget();
//제목
var txt_TITLE = ApText.create('제목');
txt_TITLE.setWidth(600);
var txa_SUBTITLE = ApTextArea.create('설명');
txa_SUBTITLE.setWidth(600);
//프로젝트 타입

var cbo_TYPE_1 = ApCombo.create('성향', '');
//프로젝트 형태
var cbo_TYPE_2 = ApCombo.create('형태', '');
//팀명
var txt_TEAMNAME = ApText.create('팀명');
txt_TEAMNAME.setWidth(230);
tbl_MAKE.cellShare(3);
//이미지
var upl_TEAMIMG = ApUpload.create('대표 이미지');
var img_TEAMIMG = ApImg.create();
img_TEAMIMG.setSize(100, 100);
var btn_CREATE = ApButton.create('만들기');
ApEvent.onlaod = function () {
    SYS_INIT();
    viewPanel.divideH(pnl_L, pnl_R);
    pnl_L.divideV(pnl_SELECT, pnl_temp1);
    pnl_SELECT.setHeight(200);
    pnl_SELECT.full(grd_SELECT);
    pnl_temp1.divideV(pnl_JOIN, pnl_MAKE);
    pnl_JOIN.full(grd_JOIN);
    pnl_JOIN.setHeight(200);
    pnl_MAKE.full(tbl_MAKE);
    pnl_R.divideV(pnl_GOING, pnl_temp2);
    pnl_GOING.full(grd_GOING);
    pnl_GOING.setHeight(200);
    pnl_temp2.divideV(pnl_CLOSED, pnl_temp3);
    pnl_CLOSED.setHeight(200);
    pnl_CLOSED.full(grd_CLOSED);
}