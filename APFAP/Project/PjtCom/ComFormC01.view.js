/// <reference path="../../Resource/Scripts/ext-all-debug.js" />
/// <reference path="../../Resource/Scripts/component.js" />
/// <reference path="../../Resource/Scripts/noncomponent.js" />
//

//View 단 정의 영역 시작
/*
 * 공지사항관리 
 * @date  2015-08-18
 * @autor JuneJobs
*/

//**전역변수영역
var pr = DBParams.create('sp_ComFormC01', 'SEARCH_USER');
var NOTICE_USER = DBconnect.runProcedure(pr);

//**일반함수영역
//-------------------컴포넌트 시작--------------------
var pnl_main = ApPanel.create();
var tbl_main = ApTable.create(1);
tbl_main.addCls('tableStyle_main');
tbl_main.updateLayout();
tbl_main.setTarget();

var btn_SAVE = ApButton.create('변경상태 저장');
btn_SAVE.setWidth(120);
var tbl_H = ApTable.create(1);
tbl_H.setTarget();
tbl_H.setStyleSearch()
var dt_SDATE = ApDate.create('조회일자');
var lbl_a = ApLabel.create('~');
var dt_EDATE = ApDate.create('');
dt_EDATE.setWidth(110);
var btn_SEARCH = ApButton.create('조회');
tbl_H.cellShare(4);
var pnl_H = ApPanel.create();
var pnl_D = ApPanel.create();

var grd_H = ApGrid.create(true, true);
grd_H.addColumn('hide', '', 'NOTICE_KEY');
grd_H.addColumn('text', '분류', 'NOTICE_TYPE', 150);

grd_H.addColumn('combo', '등록자', ['NOTICE_USER', NOTICE_USER[0]], 100);

ApEvent.onlaod = function () {
    viewPanel.divideV(tbl_main, pnl_main, tbl_main);
    tbl_main.setHeight(34);
    pnl_main.divideV(tbl_H, pnl_H, tbl_H);
    tbl_H.setHeight(30);
    pnl_H.divideH(grd_H, pnl_D, grd_H);
    grd_H.setWidth(300);
    SYS_INIT();
}