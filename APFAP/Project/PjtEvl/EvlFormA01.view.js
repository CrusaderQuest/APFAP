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
//-------------컴포넌트-------------
var pnl_top = ApPanel.create("top field");
var pnl_content = ApPanel.create("contents field");

var tbl_top = ApTable.create(3);
tbl_top.setTarget();
var btn_save = ApButton.create("저장");
var pnl_title = ApLabel.create("프로젝트 리뷰");
var pnl_summary = ApLabel.create("프로젝트를 리뷰할 수 있습니다.");

var pnl_graph = ApPanel.create('그래프 패널');
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
var botGrd = ApGrid.create(true, true);

ApEvent.onlaod = function () {
    viewPanel.divideV(pnl_top, pnl_content);
    pnl_top.setHeight(50);

    btn_save.setWidth(120);
    pnl_title.setWidth(400);
    pnl_top.full(tbl_top);

    pnl_content.divideV(pnl_graph, pnl_grd);
    pnl_grd.divideV(pnl_topGrd, pnl_botGrd);

    pnl_topGrd.divideV(tbl_topGrd, pnl_topGrdCon);
    tbl_topGrd.setHeight(30);

    pnl_topGrdCon.full(topGrd);
    pnl_botGrd.full(botGrd);

    topGrd.addColumn('combo', '카테고리', ['CATEGORY',comboStoreCat], 120);
    topGrd.addColumn('text', '요약', 'SUMMARY', 200);
    topGrd.addColumn('text', '상세 내용', 'CONTENT', 500);
    topGrd.addColumn('combo', '관련 담당자', 'USER_KEY', 120);

    //grd.addColumn('text', '개발 단위', 'D_DEV_NM', 200);

    botGrd.addColumn('text', '버전NO', 'VERSION_NO', 100);
    botGrd.addColumn('text', '요약', 'SUMMARY', 200);
    botGrd.addColumn('text', '상세 내용', 'CONTENT', 500);
    botGrd.addColumn('date', '끝난 날짜', 'END_DT', 120);

}