/// <reference path="../../Resource/Scripts/ext-all-debug.js" />
/// <reference path="../../Resource/Scripts/component.js" />
/// <reference path="../../Resource/Scripts/noncomponent.js" />
//

//View 단 정의 영역 시작

var currentBtn=0;
//-------------------폼 내 모듈-시작----------------



//-------------------폼 내 모듈 끝------------------
var pnl_top = ApPanel.create();
var pnl_content = ApPanel.create();

viewPanel.divideV(pnl_top, pnl_content);
pnl_top.setHeight(50);

var tbl_top = ApTable.create(2);
tbl_top.setTarget();
var pnl_title = ApLabel.create("개발 진척도");
pnl_title.setWidth(400);
//pnl_title.setBodyStyle('background-color','#ff0000');
var pnl_summary = ApLabel.create("개발 진행 상황에 대한 내역을 관리할 수 있습니다.");
pnl_top.full(tbl_top);

var pnl_graph = ApPanel.create("전체,개발자별 그래프 패널");
var pnl_gridTab = ApPanel.create("탭(버튼),그리드 패널");
pnl_content.divideV(pnl_graph, pnl_gridTab);
pnl_graph.setHeight(100);

var pnl_tabBtn = ApPanel.create("탭");
var pnl_grd = ApPanel.create("그리드");
pnl_gridTab.divideV(pnl_tabBtn, pnl_grd);
pnl_tabBtn.setHeight(80);

var pnl_tab = ApPanel.create();
var pnl_btn = ApPanel.create();
pnl_tabBtn.divideV(pnl_tab, pnl_btn);

var tbl_btn = ApTable.create(2);
tbl_btn.setTarget();
var btn_insert = ApButton.create("Add");
var btn_delete = ApButton.create("Delete");
tbl_btn.setPosition(1000, 0, null);
pnl_btn.full(tbl_btn);

//----------------------DB 데이터 포맷---------------
//call GET_H_TABLE
Ext.define('H_Data', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'H_DEV_NO', type: 'int' },
        { name: 'H_DEV_NM' }
    ]
});
var hData = Ext.create('Ext.data.ArrayStore', {
    model: 'H_Data',
    data: [
        [0, '서버'],
        [1, 'DB'],
        [2, 'UI'],
        [3, 'ETC']
    ]
});
//hData의 H_DEV_NO 에 접근해서 dData를 가져옴. USER 랑 조인.
//call GET_D_TABLE
Ext.define('D_Data', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'D_DEV_NM' },
        { name: 'START_DT', type: 'date', dateFormat: 'Ymd' },
        { name: 'DEV_VALUE' },
        { name: 'TEST_VALUE' },
        { name: 'DEADLINE', type: 'date', dateFormat: 'Ymd'},
        { name: 'WORKER' },
        { name: 'END_DT', type: 'date', dateFormat: 'Ymd' }
    ]
});
var dData = Ext.create('Ext.data.ArrayStore', {
    model: 'D_Data',
    data: [
        ['서버 모듈 개발1', '20150702', 'T', 'T', '20150812', '거스', '20150810'],
        ['서버 모듈 개발2', '20150702', 'T', 'F', '20150812', '거스', ''],
        ['서버 모듈 개발3', '20150702', 'F', 'F', '20150812', '거스', '']
    ]
});
var sampleData = Ext.create('Ext.data.ArrayStore', {
    model: 'D_Data',
    data: [
        ['샘플1', '20150702', 'T', 'T', '20150812', '거스', '20150810'],
        ['샘플2', '20150702', 'T', 'F', '20150812', '거스', ''],
        ['샘플3', '20150702', 'F', 'F', '20150812', '거스', '']
    ]
});

//----------------------DB 데이터 포맷 끝------------------

//------------------------그리드 시작----------------------

//PROJECT_USER 에서 프로젝트에 속한 유저들 가져와야함.
var comboStoreWorker = Ext.create('Ext.data.ArrayStore', {
    fields: ['HIDEDATA', 'SHOWDATA'],
    data: [
        ['U0000001', '주니니'],
        ['U0000002', '거니니'],
        ['U0000003', '지니니'],
        ['U0000004', '으니니'],
        ['U0000005', '기니니']
    ]
});
//DEV_VALUE, TEST_VALUE true,false 값 콤보박스.
var comboStoreValue = Ext.create('Ext.data.ArrayStore', {
    fields: ['HIDEDATA', 'SHOWDATA'],
    data: [
        ['true', 'T'],
        ['false', 'F']
    ]
});

var grd = ApGrid.create();
grd.addColumn('text', '개발 단위', 'D_DEV_NM', 200);
grd.addColumn('date', '시작 날짜', 'START_DT', 120);
grd.addColumn('combo', '개발 상태', ['DEV_VALUE', comboStoreValue], 120);
grd.addColumn('combo', '테스트 상태', ['TEST_VALUE', comboStoreValue], 120);
grd.addColumn('date', '데드라인', 'DEADLINE', 120);
grd.addColumn('combo', '담당자', ['WORKER', comboStoreWorker], 120);
grd.addColumn('date', '완료 날짜', 'END_DT', 120);

grd.reconfigure(dData);

pnl_grd.full(grd);
//--------------------그리드 끝---------------------
//-------------------탭 (버튼) 시작-----------------
var tab = ApTable.create(4);
tab.setTarget();
var btn_server = ApButton.create("서버");
var btn_db = ApButton.create("DB");
var btn_ui = ApButton.create("UI");
var btn_etc = ApButton.create("기타");
pnl_tab.full(tab);

//-------------------탭 (버튼) 끝-------------------