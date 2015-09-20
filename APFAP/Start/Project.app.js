/// <reference path="../Resource/Scripts/ext-all-debug.js" />
/// <reference path="../Resource/Scripts/component.js" />
/// <reference path="../Resource/Scripts/noncomponent.js" />
/// <reference path="Project.view.js" />

//App 단 정의 영역 시작
/*
 * 메인화면 비즈니스로직 
 * @date  2015-08-15
 * @autor JuneJobs
*/

//**전역변수영역


//**일반함수영역
function SYS_INIT() {
    //프로젝트 선택 로드
    var pr = DBParams.create('sp_ComFormC01', 'SEARCH_USER');
    var NOTICE_USER = DBconnect.runProcedure(pr);

    //프로젝트 참가하기 로드
    //진행중인 프로젝트 로드
    //완료된 프로젝트 로드
}
