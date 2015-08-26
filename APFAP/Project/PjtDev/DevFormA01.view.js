/// <reference path="../../Resource/Scripts/ext-all-debug.js" />
/// <reference path="../../Resource/Scripts/component.js" />
/// <reference path="../../Resource/Scripts/noncomponent.js" />
//

//View 단 정의 영역 시작
//-------------------폼 전역변수 시작---------------
var currentBtn = 0;
var isUpdated = 0;
//var currentCat;
var comboStoreUser;
var grdStore;
var filterStore;

var comboStoreValue = Ext.create('Ext.data.ArrayStore', {
    fields: ['HIDEDATA', 'SHOWDATA'],
    data: [
        ['true', 'T'],
        ['false', 'F']
    ]
});

var grd = ApGrid.create(true,true);

//-------------------폼 전역변수 끝-----------------

//-------------------컴포넌트 시작--------------------
var pnl_top = ApPanel.create();         //저장, 타이틀, 설명, 완성도그래프, 상태 콤보박스. (공통 영역)
var pnl_content = ApPanel.create();     //(컨텐츠 개별 영역)

var tbl_top = ApTable.create(3);
tbl_top.setTarget();

var btn_save = ApButton.create("저장");
var pnl_title = ApLabel.create("개발 진척도");
var pnl_summary = ApLabel.create("개발 진행 상황에 대한 내역을 관리할 수 있습니다.");
//그래프
//상태 콤보박스.
var pnl_tab = ApPanel.create();         //탭 패널.
var pnl_tabView = ApPanel.create();     //각 탭의 컨텐츠.

//메인 탭의 컴포넌트
var pnl_mainTabView = ApLabel.create("메인 뷰");
//그래프 전체, 담당자, 각 탭 (각 컴포넌트 main 붙여서 명명.)

var pnl_subTabView = ApPanel.create();  //메인 외 각 탭의 뷰.

var pnl_hGraphGrd = ApPanel.create();   //그래프,그리드 영역 분리.

var pnl_tabGraph = ApPanel.create();    //각 탭의 그래프.
var pnl_tabSearch = ApPanel.create();   //각 탭의 조회조건 패널.
var pnl_tabGrd = ApPanel.create();      //각 탭의 그리드.

var tab = ApTable.create(5);
tab.setTarget();
var btn_main = ApButton.create("메인");
var btn_server = ApButton.create("서버");
var btn_db = ApButton.create("DB");
var btn_ui = ApButton.create("UI");
var btn_etc = ApButton.create("기타");
//-------------------컴포넌트 끝---------------------

ApEvent.onlaod = function () {
    //공통 영역
    viewPanel.divideV(pnl_top, pnl_content);
    pnl_top.setHeight(50);

    btn_save.setWidth(120);
    pnl_title.setWidth(400);
    pnl_top.full(tbl_top);

    pnl_content.divideV(pnl_tab, pnl_tabView);
    pnl_tab.setHeight(50);
    pnl_tab.full(tab);

    //메인 뷰
    pnl_tabView.full(pnl_mainTabView);

    //서브 뷰
    pnl_subTabView.divideV(pnl_tabGraph, pnl_hGraphGrd);
    pnl_tabGraph.setHeight(100);

    pnl_hGraphGrd.divideV(pnl_tabSearch, pnl_tabGrd);
    pnl_tabSearch.setHeight(200);

    //초기 설정
    for (var i = 0; i < 5; i++) {
        initBtnColor(i);
    }
    selBtnColor(0);

    //dbLoad();
    //dbUserLoad();
    getEmptyTable();

    grd.addColumn('text', '개발 단위', 'D_DEV_NM', 200);
    grd.addColumn('date', '시작 날짜', 'START_DT', 120);
    grd.addColumn('combo', '개발 상태', ['DEV_VALUE', comboStoreValue], 120);
    grd.addColumn('combo', '테스트 상태', ['TEST_VALUE', comboStoreValue], 120);
    grd.addColumn('date', '데드라인', 'DEADLINE', 120);
    grd.addColumn('combo', '담당자', ['USER_NM', comboStoreUser], 120);
    grd.addColumn('date', '완료 날짜', 'END_DT', 120);

}
