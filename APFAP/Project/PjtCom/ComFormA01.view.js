/// <reference path="../../Resource/Scripts/ext-all-debug.js" />
/// <reference path="../../Resource/Scripts/component.js" />
/// <reference path="../../Resource/Scripts/noncomponent.js" />
//

//View 단 정의 영역 시작

//-------------------폼 전역변수 시작-----------------
var comboStoreState;
var comboSearchState;
var comboStoreUser;
var comboSearchUser;
var grdStore;
var filterStore;
var isSearched = 0;
//-------------------폼 전역변수 끝-----------------

//-------------------컴포넌트 시작--------------------
var pnl_top = ApPanel.create("top field");
var pnl_content = ApPanel.create("contents field");

var tbl_top = ApTable.create(3);
tbl_top.setTarget();

var btn_save = ApButton.create("저장");
var pnl_title = ApLabel.create("고객 요청 내역");
var pnl_summary = ApLabel.create("고객의 추가 요청 내역을 관리할 수 있습니다.");

var pnl_grid = ApPanel.create("그리드");
var pnl_search = ApPanel.create("조회조건");

var tbl_tabSearch1 = ApTable.create(12);
tbl_tabSearch1.setTarget();
tbl_tabSearch1.setStyleSearch();
var dt_sDate = ApDate.create('요청일자'); var lbl_a = ApLabel.create('~'); var dt_eDate = ApDate.create('');
var lbl_c = ApLabel.create('상태'); var cmb_reqState = ApCombo.create();
var lbl_d = ApLabel.create('접수자'); var cmb_reqUser1 = ApCombo.create();
var lbl_e = ApLabel.create('처리자'); var cmb_reqUser2 = ApCombo.create();
var btn_search = ApButton.create('조회');

var grd = ApGrid.create(true, true);
//-------------------컴포넌트 끝--------------------

ApEvent.onlaod = function () {
    viewPanel.divideV(pnl_top, pnl_content);
    pnl_top.setHeight(50);

    btn_save.setWidth(120);
    pnl_title.setWidth(400);
    pnl_top.full(tbl_top);

    pnl_content.divideV(pnl_search, pnl_grid);
    
    pnl_search.setHeight(30);
    pnl_search.full(tbl_tabSearch1);
    pnl_grid.full(grd);

    dt_eDate.setWidth(100);
    cmb_reqState.setWidth(100);
    cmb_reqUser1.setWidth(100);
    cmb_reqUser2.setWidth(100);

    dbStateLoad();
    dbUserLoad();
    cmb_reqState.setStore(comboSearchState);
    cmb_reqUser1.setStore(comboSearchUser);
    cmb_reqUser2.setStore(comboSearchUser);

    grd.addColumn('date', '요청 날짜', 'REQ_DT', 120);
    grd.addColumn('combo', '상태', ['STATE_CD', comboStoreState], 120);
    grd.addColumn('text', '요약', 'SUMMARY', 200);
    grd.addColumn('text', '상세 내용', 'CONTENT', 700);
    grd.addColumn('combo', '접수자', ['USER_KEY1', comboStoreUser], 120);
    grd.addColumn('combo', '처리자', ['USER_KEY2', comboStoreUser], 120);
    grd.addColumn('date', '완료 날짜', 'END_DT', 120);

    dbLoad();
    getEmptyTable();
}