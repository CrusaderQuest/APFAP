﻿/// <reference path="../../Resource/Scripts/ext-all-debug.js" />
/// <reference path="../../Resource/Scripts/component.js" />
/// <reference path="../../Resource/Scripts/noncomponent.js" />
//

//View 단 정의 영역 시작
//-------------------폼 전역변수 시작---------------
var currentBtn = 0;     //현재 탭
var isUpdated = 0;      //업데이트 되었는지
var isSearched = 0;     //조회 되었는지
var comboStoreUser;     //그리드용 User 콤보박스
var comboSearchUser;    //조회용 User 콤보박스
var grdStore;           //그리드 스토어
var filterStore;        //필터 그리드 스토어

var sStartDateLast = '';
var eStartDateLast = '';
var sDeadLineLast = '';
var eDeadLineLast = '';
var sEndDateLast = '';
var eEndDateLast = '';

var tabChart;
var mainTabChart;
var mainUserChart;

var comboSearchValue = Ext.create('Ext.data.ArrayStore', {
    fields: ['HIDEVALUE', 'SHOWVALUE'],
    data: [
        ['-1', '전체'],
        [1, 'T'],
        [0, 'F']
    ]
});
var tabChartStore = Ext.create('Ext.data.JsonStore', {
    fields: ['name', 'data'],
    data: [
    { 'name': '진척률', 'data': 0 }
    ]
});
var mainTabChartStore = Ext.create('Ext.data.JsonStore', {
    fields: ['name', 'data'],
    data: [
    { 'name': '기타', 'data': 0 },
    { 'name': 'UI', 'data': 0 },
    { 'name': 'DB', 'data': 0 },
    { 'name': '서버', 'data': 0 },
    { 'name': '전체', 'data': 0 }
    ]
});
var mainUserChartStore = Ext.create('Ext.data.JsonStore', {
    fields: ['name', 'data']
});
var grd = ApGrid.create(true, true);

//-------------------폼 전역변수 끝-----------------

//-------------------컴포넌트 시작--------------------
var pnl_content = ApPanel.create();     //(컨텐츠 개별 영역)

//그래프
//상태 콤보박스.
var pnl_tab = ApPanel.create();         //탭 패널.
var pnl_tabView = ApPanel.create();     //각 탭의 컨텐츠.

//메인 탭의 컴포넌트
var pnl_mainTabView = ApPanel.create(); //메인 뷰
var pnl_mainTabChart = ApPanel.create();
var pnl_mainUserChart = ApPanel.create();

var lbl_mainTabChart = ApLabel.create('카테고리별 그래프');
var lbl_mainUserChart = ApLabel.create('개발자별 그래프');
//그래프 전체, 담당자, 각 탭 (각 컴포넌트 main 붙여서 명명.)

//서브 탭의 컴포넌트
var pnl_subTabView = ApPanel.create();

var pnl_graphGrd = ApPanel.create();    //그래프와 그리드 영역 분리.

var pnl_tabGraph = ApPanel.create();    //각 탭의 그래프.
var pnl_tabSearch = ApPanel.create();   //각 탭의 조회조건 패널.

var tbl_tabSearch1 = ApTable.create(7);
tbl_tabSearch1.setTarget();
tbl_tabSearch1.setStyleSearch();
var dt_sStartDate = ApDate.create('시작일자'); var lbl_a = ApLabel.create('~'); var dt_eStartDate = ApDate.create('');
var lbl_b = ApLabel.create('개발상태'); var cmb_devState = ApCombo.create();
var lbl_c = ApLabel.create('테스트상태'); var cmb_testState = ApCombo.create();

var tbl_tabSearch2 = ApTable.create(9);
tbl_tabSearch2.setTarget();
tbl_tabSearch2.setStyleSearch();
var dt_sDeadLine = ApDate.create('데드라인'); var lbl_d = ApLabel.create('~'); var dt_eDeadLine = ApDate.create('');
var dt_sEndDate = ApDate.create('완료일자'); var lbl_e = ApLabel.create('~'); var dt_eEndDate = ApDate.create('');
var lbl_f = ApLabel.create('담당자'); var cmb_user = ApCombo.create();
var btn_search = ApButton.create('조회');

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
    viewPanel.full(pnl_content);

    pnl_content.divideV(pnl_tab, pnl_tabView);
    pnl_tab.setHeight(30);
    pnl_tab.full(tab);

    //메인 뷰
    pnl_mainTabView.divideV(pnl_mainTabChart, pnl_mainUserChart);
    pnl_mainTabChart.add(lbl_mainTabChart);
    pnl_mainUserChart.add(lbl_mainUserChart);
    pnl_tabView.full(pnl_mainTabView);

    //서브 뷰
    pnl_subTabView.divideV(pnl_tabGraph, pnl_graphGrd);
    pnl_tabGraph.setHeight(150);
    pnl_graphGrd.divideV(pnl_tabSearch, pnl_tabGrd);
    pnl_tabSearch.setHeight(60);
    pnl_tabSearch.divideV(tbl_tabSearch1, tbl_tabSearch2);

    //초기 설정
    for (var i = 0; i < 5; i++) {
        initBtnColor(i);
    }
    selBtnColor(0);

    //dbLoad();
    dbUserLoad();
    getEmptyTable();

    //----------------------그래프-----------------------

    tabChart = initChart(tabChartStore);
    mainTabChart = initChart(mainTabChartStore);
    mainUserChart = initChart(mainUserChartStore);

    pnl_mainTabChart.add(mainTabChart);
    pnl_mainUserChart.add(mainUserChart);
    pnl_tabGraph.full(tabChart);

    drawMainChart();

    //---------------------그래프 끝---------------------

    grd.addColumn('text', '개발 단위', 'D_DEV_NM', 200);
    grd.addColumn('date', '시작 날짜', 'START_DT', 120);
    grd.addColumn('check', '개발 상태', 'DEV_VALUE', 120);
    grd.addColumn('check', '테스트 상태', 'TEST_VALUE', 120);
    grd.addColumn('date', '데드라인', 'DEADLINE', 120);
    grd.addColumn('combo', '담당자', ['USER_KEY', comboStoreUser], 120);
    grd.addColumn('date', '완료 날짜', 'END_DT', 120);

    pnl_tabGrd.full(grd);

    dt_eStartDate.setWidth(100);
    dt_eDeadLine.setWidth(100);
    dt_eEndDate.setWidth(100);
    lbl_b.setWidth(78);
    lbl_c.setWidth(73);
    cmb_devState.setWidth(70);
    cmb_testState.setWidth(70);
    lbl_f.setWidth(80);
    cmb_user.setWidth(100);
    cmb_devState.setStore(comboSearchValue);
    cmb_testState.setStore(comboSearchValue);
    cmb_user.setStore(comboSearchUser);

    grd.setLockColumns('END_DT');
}
