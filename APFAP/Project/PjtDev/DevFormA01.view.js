/// <reference path="../../Resource/Scripts/ext-all-debug.js" />
/// <reference path="../../Resource/Scripts/component.js" />
/// <reference path="../../Resource/Scripts/noncomponent.js" />
//

//View 단 정의 영역 시작

var pnl_top = ApPanel.create("top field");
var pnl_content = ApPanel.create("contents field");

viewPanel.divideV(pnl_top, pnl_content);
pnl_top.setHeight('10%');

var pnl_title = ApPanel.create("개발 진척도");
//pnl_title.setBodyStyle('background-color','#ff0000');
var pnl_summary = ApPanel.create("개발 진행 상황에 대한 내역을 관리할 수 있습니다.");

pnl_top.divideH(pnl_title, pnl_summary);
pnl_title.setWidth('25%');

var pnl_graph = ApPanel.create("전체,개발자별 그래프 패널");
var pnl_gridContent = ApPanel.create("탭,그리드 패널");
var pnl_devTab = ApPanel.create("탭 패널");
var pnl_devGrid = ApPanel.create("그리드 패널");

pnl_content.divideV(pnl_graph, pnl_gridContent);
pnl_gridContent.divideV(pnl_devTab, pnl_devGrid);
pnl_devTab.setHeight('10%');

//--------------------------------------------------
var comboStoreState = Ext.create('Ext.data.ArrayStore', {
    fields: ['HIDEDATA', 'SHOWDATA'],
    data: [
        ['E01', '준비'],
        ['E02', '진행 중'],
        ['E03', '완료']
    ]
});
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

Ext.define('devData', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'DEVNM' },
        { name: 'DEVSTATE' },
        { name: 'TESTSTATE' },
        { name: 'S_DT', type: 'date', dateFormat: 'Y-m-d' },
        { name: 'DEADLINE', type: 'date', dateFormat: 'Y-m-d' },
        { name: 'WORKER' }
    ]
});
var gridData = Ext.create('Ext.data.ArrayStore', {
    model: 'devData',
    data: [
        ['메인 UI', '진행 중', '준비', '2015-07-02', '2015-07-03', '거니니'],
        ['로그인 UI', '준비', '준비', '2015-07-03', '2015-07-04', '기니니'],
        ['공통 UI', '완료', '진행 중', '2015-07-04', '2015-07-05', '으니니']
    ]
});
var grd = ApGrid.create();
grd.addColumn('text', '개발 단위', 'DEVNM', 200);
grd.addColumn('combo', '개발 상태', ['DEVSTATE', comboStoreState], 120);
grd.addColumn('combo', '테스트 상태', ['TESTSTATE', comboStoreState], 120);
grd.addColumn('date', '시작날짜', 'S_DT', 120);
grd.addColumn('date', '데드라인', 'DEADLINE', 120);
grd.addColumn('combo', '담당자', ['WORKER', comboStoreWorker], 120);

grd.reconfigure(gridData);
//--------------------------------------------------
pnl_devGrid.full(grd);