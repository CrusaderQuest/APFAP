﻿/// <reference path="../../Resource/Scripts/ext-all-debug.js" />
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

var pnl_H = ApPanel.create();
var pnl_D = ApPanel.create();

//grd_H add colum
var grd_H = ApGrid.create(false, true);
grd_H.addColumn('hide', '', 'NOTICE_KEY');
grd_H.addColumn('text', '분류', 'NOTICE_TYPE', 150);
grd_H.addColumn('combo', '등록자', ['NOTICE_USER', NOTICE_USER[0]], 100);

//input Field
var tbl_HH = ApTable.create(1);
tbl_HH.setTarget();
var txt_NOTICE_TYPE_HH = ApText.create('분류', 'NOTICE_TYPE');
txt_NOTICE_TYPE_HH.setWidth(200);
txt_NOTICE_TYPE_HH.setReadOnly(true);
var txt_NOTICE_TITLE_HH = ApText.create('공지사항', 'NOTICE_TITLE');
txt_NOTICE_TITLE_HH.setWidth(800);
var txa_NOTICE_CONTENT_HH = ApTextArea.create('세부사항', 'NOTICE_CONTENT');
txa_NOTICE_CONTENT_HH.setWidth(800);
txa_NOTICE_CONTENT_HH.setHeight(200);
var dt_NOTICE_S_DT_HH = ApDate.create('등록일자', 'NOTICE_S_DT');
var dt_NOTICE_E_DT_HH = ApDate.create('만료일자', 'NOTICE_E_DT');
var cbo_NOTICE_USER_HH = ApCombo.create('등록자', 'NOTICE_USER');
cbo_NOTICE_USER_HH.bindStore(NOTICE_USER[0]);
var btn_ADDNOICE_HH = ApButton.create('추가');
btn_ADDNOICE_HH.setMargin('0 0 0 44')   //사이 간격
var btn_SAVENOICE_HH = ApButton.create('등록');
tbl_HH.cellShare(5);

//grd_D add colum
var grd_D = ApGrid.create(true, 'D');
grd_D.addColumn('hide', '', 'NOTICE_H_KEY');
grd_D.addColumn('hide', '', 'NOTICE_D_KEY');
grd_D.addColumn('text', '공지사항', 'NOTICE_TITLE', 200);
grd_D.addColumn('text', '세부내용', 'NOTICE_CONTENT', 300);
grd_D.addColumn('date', '등록일자', 'NOTICE_S_DT', 100);
grd_D.addColumn('date', '만료일자', 'NOTiCE_E_DT', 100);
grd_D.addColumn('combo', '등록자', ['NOTICE_USER', NOTICE_USER[0]], 80);

//ApEvent
ApEvent.onlaod = function () {

    //set Panel & size
    viewPanel.full(pnl_main);
    pnl_main.full(pnl_H);
    pnl_H.divideH(grd_H, pnl_D, grd_H);
    pnl_D.divideV(tbl_HH, grd_D, tbl_HH);
    tbl_HH.setHeight(300);
    grd_H.setWidth(300);
    SYS_INIT();
}