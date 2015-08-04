/// <reference path="../../Resource/Scripts/ext-all-debug.js" />
/// <reference path="../../Resource/Scripts/component.js" />
/// <reference path="../../Resource/Scripts/noncomponent.js" />
//

//View 단 정의 영역 시작

var pnl_top = ApPanel.create("top field");
var pnl_content = ApPanel.create("contents field");

viewPanel.divideV(pnl_top, pnl_content);
pnl_top.setHeight('10%');

var pnl_title = ApPanel.create("테스트 진척도");
//pnl_title.setBodyStyle('background-color','#ff0000');
var pnl_summary = ApPanel.create("개발부 완료 후 단위, 통합테스트에 대한 내역을 관리할 수 있습니다.");

pnl_top.divideH(pnl_title, pnl_summary);
pnl_title.setWidth('25%');

var pnl_unitTest = ApPanel.create("단위테스트 패널");
var pnl_totalTest = ApPanel.create("통합테스트 패널");
var pnl_unitTab = ApPanel.create("탭 패널");
var pnl_unitGrid = ApPanel.create("그리드 패널");
var pnl_totalGrid = ApPanel.create("그리드 패널");

pnl_content.divideV(pnl_unitTest, pnl_totalTest);
pnl_unitTest.divideV(pnl_unitTab, pnl_unitGrid);
pnl_unitTab.setHeight('10%');
pnl_totalTest.full(pnl_totalGrid);

//--------------------------------------------------
var comboStoreUnitState = Ext.create('Ext.data.ArrayStore', {
    fields: ['HIDEDATA', 'SHOWDATA'],
    data: [
        ['E01', '준비'],
        ['E02', '진행 중'],
        ['E03', '완료']
    ]
});
var comboStoreTotalState = Ext.create('Ext.data.ArrayStore', {
    fields: ['HIDEDATA', 'SHOWDATA'],
    data: [
        ['E01', '접수'],
        ['E02', '확인'],
        ['E03', '진행 중'],
        ['E04', '완료']
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

Ext.define('testData', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'TESTNM' },
        { name: 'STATE' },
        { name: 'WORKER' }
    ]
});
var unitGridData = Ext.create('Ext.data.ArrayStore', {
    model: 'testData',
    data: [
        ['메인 UI','진행 중','거니니'],
        ['로그인 UI', '진행 중', '주니니'],
        ['공통 UI', '완료', '기니니'],
        ['커뮤니티 UI', '준비', '지니니']
    ]
});
var totalGridData = Ext.create('Ext.data.ArrayStore', {
    model: 'testData',
    data: [
        ['메인 UI 오류 발견', '진행 중', '거니니'],
        ['로그인 오류 발견', '진행 중', '주니니'],
        ['공통 UI 오류 발견', '접수', '기니니'],
        ['커뮤니티 UI 오류 발견', '확인', '지니니']
    ]
});
var unitGrd = ApGrid.create();
unitGrd.addColumn('text', '테스트 명', 'TESTNM', 200);
unitGrd.addColumn('combo', '상태', ['STATE', comboStoreUnitState], 120);
unitGrd.addColumn('combo', '담당자', ['WORKER', comboStoreWorker], 120);
var totalGrd = ApGrid.create();
totalGrd.addColumn('text', '오류 내역', 'TESTNM', 200);
totalGrd.addColumn('combo', '상태', ['STATE', comboStoreTotalState], 120);
totalGrd.addColumn('combo', '담당자', ['WORKER', comboStoreWorker], 120);

unitGrd.reconfigure(unitGridData);
totalGrd.reconfigure(totalGridData);
//--------------------------------------------------
pnl_unitGrid.full(unitGrd);
pnl_totalGrid.full(totalGrd);