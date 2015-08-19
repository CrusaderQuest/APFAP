/// <reference path="../../Resource/Script/ext-all-debug.js" />
/// <reference path="../../Resource/Script/component.js" />
/// <reference path="../../Resource/Script/noncomponent.js" />
/// <reference path="ComFormC01.view.js" />

//최상단 공통 버튼 클릭 (클릭시 동기화 진행)
btn_SAVE.eClick = function(){
    ASYNC_DB_H();
}

//그리드 초기값 바인드
function SYS_INIT() {
    var pr = DBParams.create('sp_ComFormC01', 'SEARCH_H');
    var ds = DBconnect.runProcedure(pr);
    grd_H.reconfigure(ds[0]);
}
// DB와 동기화 하기전 빈값이 있는지 에러체크
function ASYNC_ERR_H(selectedRecords) {
    for (var i = 0; i < selectedRecords.length; i++) {
        //특정 셀의 값을 확인
        if (selectedRecords[i].get('NOTICE_TYPE') == undefined) {
            var index = grd_H.getRowIndex(selectedRecords[i]);
            //에러메세지 띄움
            ApMsg.warning(index + 1 + '번째 행의 분류를 넣어주세요.', function () {
                //메세지의 확인버튼을 누를경우 그리드 포커스 이동
                grd_H.setFocus(index);
            })
            return true;
        }
    }
}
function ASYNC_DB_H() {
    //체크된 레코드 가져오기
    var selectedRecords = grd_H.getSelectedRecords();

    // DB와 동기화 하기전 빈값이 있는지 에러체크
    if (ASYNC_ERR_H(selectedRecords)) return;

    //추가된행과 업데이트된 행 분기하여 디비에 저장
    var pr = '';
    var ds = '';
    for (var i = 0; i < selectedRecords.length; i++) {
        if (selectedRecords[i].get('NOTICE_KEY') == undefined) {
            pr = DBParams.create('sp_ComFormC01', 'SEARCH_H');
            pr.addParam('NOTICE_TYPE', selectedRecords[i].get('NOTICE_TYPE'));
            pr.addParam('NOTICE_USER', selectedRecords[i].get('NOTICE_USER'));
            ds = DBconnect.runProcedure(pr);
        }
    }


    //삭제된 행
}

//App 단 정의 영역 시작
grd_H.eButtonAddClick = function () {
    grd_H.addRow();
    grd_H.getRow(grd_H.getTotalCount() - 1).set('NOTICE_USER', 'JuneJobs');
}