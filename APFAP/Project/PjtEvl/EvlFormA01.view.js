/// <reference path="../../Resource/Scripts/ext-all-debug.js" />
/// <reference path="../../Resource/Scripts/component.js" />
/// <reference path="../../Resource/Scripts/noncomponent.js" />
//

//View 단 정의 영역 시작

//-------------전역변수-------------
var comboStoreCat;
var comboSearchCat;
var comboStoreUser;
var comboSearchUser;
var topGrdStore;
var botGrdStore;
var filterStore;
var isSearched;

var partChart;
var versionChart;
var partStore = Ext.create('Ext.data.JsonStore', {
    fields: ['name', 'data']
});
var versionStore = Ext.create('Ext.data.JsonStore', {
    fields: ['name', 'data']
});
//-------------컴포넌트-------------
var pnl_content = ApPanel.create("contents field");

var pnl_graph = ApPanel.create('그래프 패널');

var pnl_partGraph = ApPanel.create();
var pnl_versionGraph = ApPanel.create();

var pnl_grd = ApPanel.create('그리드 패널');

var pnl_topGrd = ApPanel.create('상단 그리드 패널');
//조회
var tbl_topGrd = ApTable.create(5);
tbl_topGrd.setTarget();
tbl_topGrd.setStyleSearch();
var lbl_a = ApLabel.create('카테고리'); var cmb_category = ApCombo.create();
var lbl_b = ApLabel.create('담당자'); var cmb_user = ApCombo.create();
var btn_search = ApButton.create('조회');

var pnl_topGrdCon = ApPanel.create('그리드');

var pnl_botGrd = ApPanel.create('하단 그리드 패널');

var topGrd = ApGrid.create(true, true);
var botGrd = ApGrid.create(true);

ApEvent.onlaod = function () {
    viewPanel.full(pnl_content);
    
    pnl_content.divideV(pnl_graph, pnl_grd);

    pnl_graph.divideH(pnl_partGraph, pnl_versionGraph);

    pnl_grd.divideV(pnl_topGrd, pnl_botGrd);

    pnl_topGrd.divideV(tbl_topGrd, pnl_topGrdCon);
    tbl_topGrd.setHeight(30);

    pnl_topGrdCon.full(topGrd);
    pnl_botGrd.full(botGrd);

    getTable();
    getEmptyTable();
    dbUserLoad();
    dbCatLoad();
    cmb_category.setStore(comboSearchCat);
    cmb_user.setStore(comboSearchUser);

    topGrd.addColumn('combo', '카테고리', ['CATEGORY_CD',comboStoreCat], 120);
    topGrd.addColumn('text', '차이 기간', 'PERIOD', 200);
    topGrd.addColumn('text', '상세 내용', 'CONTENT', 500);
    topGrd.addColumn('combo', '관련 담당자', ['USER_KEY',comboStoreUser], 120);

    //grd.addColumn('text', '개발 단위', 'D_DEV_NM', 200);

    botGrd.addColumn('text', '요약', 'SUMMARY', 200);
    botGrd.addColumn('text', '상세 내용', 'CONTENT', 500);
    botGrd.addColumn('date', '끝난 날짜', 'END_DT', 120);

    topGrd.reconfigure(topGrdStore);
    botGrd.reconfigure(botGrdStore);

    partChart = initChart(partStore);
    versionChart = initChart(versionStore);
    pnl_partGraph.full(partChart);
    pnl_versionGraph.full(versionChart);

    drawChart();
}