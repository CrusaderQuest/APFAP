/// <reference path="../../Resource/Scripts/ext-all-debug.js" />
/// <reference path="../../Resource/Scripts/component.js" />
/// <reference path="../../Resource/Scripts/noncomponent.js" />
//

//View 단 정의 영역 시작

var pnl_top = ApPanel.create("top field");
var pnl_content = ApPanel.create("contents field");

viewPanel.divideV(pnl_top, pnl_content);
pnl_top.setHeight('10%');

var pnl_title = ApPanel.create("팀내 개발 후 수정내역");
//pnl_title.setBodyStyle('background-color','#ff0000');
var pnl_summary = ApPanel.create("고객 요청에 의한 수정 외에 개발 후 수정한 내역을 관리할 수 있습니다.");

pnl_top.divideH(pnl_title, pnl_summary);
pnl_title.setWidth('25%');

var pnl_grid = ApPanel.create("이곳에 그리드가 추가될 예정");
//--------------------------------------------------
var comboStoreCategory = Ext.create('Ext.data.ArrayStore', {
    fields: ['HIDEDATA', 'SHOWDATA'],
    data: [
        ['D01', 'UI'],
        ['D02', 'Server'],
        ['D03', 'Client'],
        ['D04', 'DB'],
        ['D05', '기타']
    ]
});
var comboStoreState = Ext.create('Ext.data.ArrayStore', {
    fields: ['HIDEDATA', 'SHOWDATA'],
    data: [
        ['E01', '접수'],
        ['E02', '확인'],
        ['E03', '처리 중'],
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

Ext.define('customerReqData', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'REQ_DT', type: 'date', dateFormat: 'Y-m-d' },
        { name: 'CATEGORY' },
        { name: 'SUMMARY' },
        { name: 'CONTENT' },
        { name: 'STATE' },
        { name: 'E_DT', type: 'date', dateFormat: 'Y-m-d' },
        { name: 'WORKER' }
    ]
});
var gridData = Ext.create('Ext.data.ArrayStore', {
    model: 'customerReqData',
    data: [
        ['2015-07-02', 'UI', '업로드 UI 수정 요청', '업로드 UI 개후졌음 수정해주셈 이렇게 저렇게', '완료', '2015-08-03', '거니니'],
        ['2015-07-02', 'UI', '메인 UI 수정 요청', '메인 UI 개후졌음 수정해주셈 이렇게 저렇게', '처리 중', '', '거니니'],
        ['2015-07-02', 'DB', 'DB 테이블 수정 요청', 'DB테이블 개후졌음 수정해주셈 이렇게 저렇게', '완료', '2015-08-05', '으니니'],
        ['2015-07-02', 'Server', '서버 통신 수정 요청', '서버 개후졌음 수정해주셈 이렇게 저렇게', '완료', '2015-08-06', '주니니']
    ]
});
var grd = ApGrid.create();
grd.addColumn('date', '이슈 날짜', 'REQ_DT', 120);
grd.addColumn('combo', '카테고리', ['CATEGORY', comboStoreCategory], 120);
grd.addColumn('text', '요약', 'SUMMARY', 200);
grd.addColumn('text', '상세 내용', 'CONTENT', 700);
grd.addColumn('combo', '상태', ['STATE', comboStoreState], 120);
grd.addColumn('date', '완료 날짜', 'E_DT', 120);
grd.addColumn('combo', '담당자', ['WORKER', comboStoreWorker], 120);

grd.reconfigure(gridData);
//--------------------------------------------------
pnl_content.full(pnl_grid);
pnl_grid.full(grd);