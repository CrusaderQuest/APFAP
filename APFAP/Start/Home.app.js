/// <reference path="../Resource/Scripts/ext-all-debug.js" />
/// <reference path="../Resource/Scripts/component.js" />
/// <reference path="../Resource/Scripts/noncomponent.js" />
/// <reference path="Home.view.js" />

//App 단 정의 영역 시작
/*
 * 메인화면 비즈니스로직 
 * @date  2015-08-15
 * @autor JuneJobs
*/

//**전역변수영역
grd_NOTICE.eCellDbClick = function (record, rowindex, paramId) {
    ApMsg.warning(record.data.NOTICE_CONTENT);
}

//**일반함수영역
function SYS_INIT() {
    var pr = DBParams.create('SP_COMMAIN', 'SEARCH_NOTICE');
    var ds = DBconnect.runProcedure(pr);
    grd_NOTICE.bindStore(ds[0]);
}