/// <reference path="../../Resource/Scripts/ext-all-debug.js" />
/// <reference path="../../Resource/Scripts/component.js" />
/// <reference path="../../Resource/Scripts/noncomponent.js" />
//

//View 단 정의 영역 시작
//-------------------폼 전역변수 시작---------------
var currentBtn = 0;
var saveBtnState = 0;
var currentCat;
var filterStoreCnt = -1;
var comboStoreUser;
var comboStoreCategory;
var selComboStoreCategory;
Ext.define('D_Data', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'D_DEV_NO', type: 'int' },
        { name: 'CATEGORY_NM' },
        { name: 'D_DEV_NM' },
        { name: 'START_DT', type: 'date', dateFormat: 'Y-m-d' },
        { name: 'DEV_VALUE' },
        { name: 'TEST_VALUE' },
        { name: 'DEADLINE', type: 'date', dateFormat: 'Y-m-d' },
        { name: 'USER_NM' },
        { name: 'END_DT', type: 'date', dateFormat: 'Y-m-d' }
    ]
});
var filterStore = Ext.create('Ext.data.ArrayStore', {
    model: 'D_Data'
});
var dTableArray = Ext.create('Ext.data.ArrayStore', {
    fields: [D_Data]
});
Ext.define('devDelete_Array', {
    extend: 'Ext.data.Model',
    fields: [{ name: 'D_DEV_NO', type: 'int' }]
});
var dDevDeleteArray = Ext.create('Ext.data.ArrayStore', {
    fields: [devDelete_Array]
});
Ext.define('catDelete_Array', {
    extend: 'Ext.data.Model',
    fields: [{ name: 'CATEGORY_NO', type: 'int' }]
});
var categoryDeleteArray = Ext.create('Ext.data.ArrayStore', {
    model: 'catDelete_Array'
});
var comboStoreValue = Ext.create('Ext.data.ArrayStore', {
    fields: ['HIDEDATA', 'SHOWDATA'],
    data: [
        ['true', 'T'],
        ['false', 'F']
    ]
});
var grd = ApGrid.create(true);

//-------------------폼 전역변수 끝-----------------

//-------------------컴포넌트 시작--------------------
var pnl_top = ApPanel.create();
var pnl_content = ApPanel.create();

var tbl_top = ApTable.create(3);
tbl_top.setTarget();

var pnl_title = ApLabel.create("개발 진척도");
var pnl_summary = ApLabel.create("개발 진행 상황에 대한 내역을 관리할 수 있습니다.");
var btn_save = ApButton.create("수정");

var pnl_graphCategory = ApPanel.create("그래프,카테고리 패널");
var pnl_gridTab = ApPanel.create("탭(버튼),그리드 패널");

var pnl_graph = ApPanel.create("그래프 패널");
var pnl_category = ApPanel.create("카테고리 패널");
//in category panel
var tbl_category = ApTable.create(5);
tbl_category.setTarget();
var txt_catInsert = ApText.create();
var btn_catInsert = ApButton.create("추가");
var cmb_catView = ApCombo.create();
var btn_catSearch = ApButton.create("조회");
var btn_catDelete = ApButton.create("삭제");

var pnl_tabBtn = ApPanel.create("탭");
var pnl_grd = ApPanel.create("그리드");

var pnl_tab = ApPanel.create();
var pnl_btn = ApPanel.create();

var tbl_btn = ApTable.create(2);
tbl_btn.setTarget();
var btn_insert = ApButton.create("Add");
var btn_delete = ApButton.create("Delete");

var tab = ApTable.create(4);
tab.setTarget();
var btn_server = ApButton.create("서버");
var btn_db = ApButton.create("DB");
var btn_ui = ApButton.create("UI");
var btn_etc = ApButton.create("기타");
//-------------------컴포넌트 끝---------------------

ApEvent.onlaod = function () {
    viewPanel.divideV(pnl_top, pnl_content);
    pnl_top.setHeight(50);

    pnl_title.setWidth(400);
    pnl_top.full(tbl_top);

    pnl_content.divideV(pnl_graphCategory, pnl_gridTab);
    pnl_graphCategory.setHeight(300);

    pnl_graphCategory.divideV(pnl_graph, pnl_category);
    pnl_graph.setHeight(200);
    pnl_category.full(tbl_category);

    pnl_gridTab.divideV(pnl_tabBtn, pnl_grd);
    pnl_tabBtn.setHeight(80);

    pnl_tabBtn.divideV(pnl_tab, pnl_btn);

    tbl_btn.setPosition(1000, 0, null);
    btn_insert.setWidth(100);
    btn_delete.setWidth(100);
    btn_save.setWidth(100);
    for (var i = 0; i < 4; i++) {
        initBtnColor(i);
    }
    pnl_btn.full(tbl_btn);
    pnl_grd.full(grd);
    pnl_tab.full(tab);

    dbLoad();
    getEmptyTable();
    dbUserLoad();
    dbCategoryLoad();
    grd.addColumn('combo', '카테고리', ['CATEGORY_NM',selComboStoreCategory], 150);
    grd.addColumn('text', '개발 단위', 'D_DEV_NM', 200);
    grd.addColumn('date', '시작 날짜', 'START_DT', 120);
    grd.addColumn('combo', '개발 상태', ['DEV_VALUE', comboStoreValue], 120);
    grd.addColumn('combo', '테스트 상태', ['TEST_VALUE', comboStoreValue], 120);
    grd.addColumn('date', '데드라인', 'DEADLINE', 120);
    grd.addColumn('combo', '담당자', ['USER_NM', comboStoreUser], 120);
    grd.addColumn('date', '완료 날짜', 'END_DT', 120);
    grd.reconfigure(dTableArray.data.items[0].data);
    selBtnColor(0);

    cmb_catView.setEditable(false);
    cmb_catView.setSelection(comboStoreCategory.data.items[0]);
    cmb_catView.eChange(cmb_catView);
    pnl_content.setDisabled(true);
}
