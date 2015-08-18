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


//**일반함수영역
//-------------------컴포넌트 시작--------------------
var tbl_H = ApTable.create(2);
tbl_H.setTarget();
viewPanel.setStyle('background', '#FFD101');
tbl_H.addCls('tableStyle_search');
tbl_H.updateLayout();
var dt_SDATE = ApDate.create('조회');
var btn_SEARCH = ApButton.create('조회');
var panel = ApPanel.create();
ApEvent.onlaod = function () {
    viewPanel.divideV(tbl_H, panel);

}