/// <reference path="../../Resource/Scripts/ext-all-debug.js" />
/// <reference path="../../Resource/Scripts/component.js" />
/// <reference path="../../Resource/Scripts/noncomponent.js" />
//

//View 단 정의 영역 시작
//-------------------폼 전역변수 시작---------------
var currentBtn = 0;
Ext.define('D_Data', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'D_DEV_NO' },
        { name: 'D_DEV_NM' },
        { name: 'START_DT', type: 'date', dateFormat: 'Ymd' },
        { name: 'DEV_VALUE' },
        { name: 'TEST_VALUE' },
        { name: 'DEADLINE', type: 'date', dateFormat: 'Ymd' },
        { name: 'USER_KEY' },
        { name: 'USER_NM' },
        { name: 'END_DT', type: 'date', dateFormat: 'Ymd' }
    ]
});
var dTableArray = Ext.create('Ext.data.ArrayStore', {
    fields: [D_Data]
});
Ext.define('delete_Array', {
    extend: 'Ext.data.Model',
    fields: [{ name: 'D_DEV_NO', type: 'int' }]
});
var deleteArray = Ext.create('Ext.data.ArrayStore', {
    fields: [delete_Array]
});
var comboStoreUser = Ext.create('Ext.data.ArrayStore', {
    fields: ['HIDEDATA', 'SHOWDATA']
});
/*
var comboStoreUser = Ext.create('Ext.data.ArrayStore', {
    fields: [{name:'USER_KEY'},
             {name:'USER_NM'}]
});
*/
//----------temp------------
//var comboStoreUser;
//comboStoreUser.add('00000001', '거스');
//comboStoreUser.add('00000002', '으니');
//----------end temp--------
var comboStoreValue = Ext.create('Ext.data.ArrayStore', {
    fields: ['HIDEDATA', 'SHOWDATA'],
    data: [
        ['true', 'T'],
        ['false', 'F']
    ]
});
var grd = ApGrid.create(true);
grd.addColumn('text', '개발 단위', 'D_DEV_NM', 200);
grd.addColumn('date', '시작 날짜', 'START_DT', 120);
grd.addColumn('combo', '개발 상태', ['DEV_VALUE', comboStoreValue], 120);
grd.addColumn('combo', '테스트 상태', ['TEST_VALUE', comboStoreValue], 120);
grd.addColumn('date', '데드라인', 'DEADLINE', 120);
grd.addColumn('combo', '담당자', ['USER_NM', comboStoreUser], 120);
grd.addColumn('date', '완료 날짜', 'END_DT', 120);
//-------------------폼 전역변수 끝-----------------

//-------------------폼 내 모듈 시작----------------

//-------------------폼 내 모듈 끝------------------

//-------------------컴포넌트 시작--------------------
var pnl_top = ApPanel.create();
var pnl_content = ApPanel.create();

var tbl_top = ApTable.create(2);
tbl_top.setTarget();

var pnl_title = ApLabel.create("개발 진척도");
var pnl_summary = ApLabel.create("개발 진행 상황에 대한 내역을 관리할 수 있습니다.");

var pnl_graph = ApPanel.create("전체,개발자별 그래프 패널");
var pnl_gridTab = ApPanel.create("탭(버튼),그리드 패널");

var pnl_tabBtn = ApPanel.create("탭");
var pnl_grd = ApPanel.create("그리드");

var pnl_tab = ApPanel.create();
var pnl_btn = ApPanel.create();

var tbl_btn = ApTable.create(4);
tbl_btn.setTarget();
var btn_insert = ApButton.create("Add");
var btn_delete = ApButton.create("Delete");
var btn_save = ApButton.create("Save");
var btn_reload = ApButton.create("Reload");

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

    pnl_content.divideV(pnl_graph, pnl_gridTab);
    pnl_graph.setHeight(100);

    pnl_gridTab.divideV(pnl_tabBtn, pnl_grd);
    pnl_tabBtn.setHeight(80);

    pnl_tabBtn.divideV(pnl_tab, pnl_btn);

    tbl_btn.setPosition(1000, 0, null);
    btn_insert.setWidth(100);
    btn_delete.setWidth(100);
    btn_save.setWidth(100);
    btn_reload.setWidth(100);
    pnl_btn.full(tbl_btn);

    pnl_grd.full(grd);

    pnl_tab.full(tab);

    dbLoad();
    dbUserLoad();
    grd.reconfigure(dTableArray.data.items[0].data);
}
