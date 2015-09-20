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
var pnl_temp4 = ApPanel.create();

var grd_SELECT = ApGrid.create();
grd_SELECT.addColumn('text', '제목', 'TITLE', 250);
grd_SELECT.addColumn('text', '설명', 'SUBTITLE', 500);
grd_SELECT.setLockColumns('TITLE, SUBTITLE');

var grd_JOIN = ApGrid.create();
var grd_GOING = ApGrid.create();
var grd_CLOSED = ApGrid.create();

ApEvent.onlaod = function () {
    SYS_INIT();
    viewPanel.divideH(pnl_L, pnl_R);
    pnl_L.divideV(pnl_SELECT, pnl_temp1);
    pnl_SELECT.setHeight(200);
    pnl_SELECT.full(grd_SELECT);
    pnl_temp1.divideV(pnl_MAKE, pnl_JOIN);
    pnl_JOIN.full(grd_JOIN);
    pnl_MAKE.setHeight(200);
    pnl_R.divideV(pnl_GOING, pnl_CLOSED);
    pnl_GOING.full(grd_GOING);
    pnl_CLOSED.full(grd_CLOSED);
}