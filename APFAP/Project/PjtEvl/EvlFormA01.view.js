/// <reference path="../../Resource/Scripts/ext-all-debug.js" />
/// <reference path="../../Resource/Scripts/component.js" />
/// <reference path="../../Resource/Scripts/noncomponent.js" />
//

//View 단 정의 영역 시작

var pnl_top = ApPanel.create("top field");
var pnl_content = ApPanel.create("contents field");

viewPanel.divideV(pnl_top, pnl_content);
pnl_top.setHeight('10%');

var pnl_title = ApPanel.create("프로젝트 리뷰");
//pnl_title.setBodyStyle('background-color','#ff0000');
var pnl_summary = ApPanel.create("프로젝트가 진행된 내역을 보고 리뷰를 관리할 수 있습니다.");

pnl_top.divideH(pnl_title, pnl_summary);
pnl_title.setWidth('25%');

var pnl_graph_root = ApPanel.create("루트 그래프 패널");
var pnl_grid_root = ApPanel.create("그리드 패널");
var pnl_graph_top = ApPanel.create("상위 그래프 패널");
var pnl_graph_bottom = ApPanel.create("하위 그래프 패널");
var pnl_graph1 = ApPanel.create("그래프1");
var pnl_graph2 = ApPanel.create("그래프2");
var pnl_graph3 = ApPanel.create("그래프3");
var pnl_grid = ApPanel.create("평가,Point 그리드");
//나중에 각각의 패널안에 컴포넌트를 채우면 됩니다.

//--------------------------------------------------
var comboStoreCategory = Ext.create('Ext.data.ArrayStore', {
    fields: ['HIDEDATA', 'SHOWDATA'],
    data: [
        ['D01', '정의'],
        ['D02', '분석'],
        ['D03', '설계'],
        ['D04', '개발'],
        ['D05', '테스트'],
        ['D06', '수정 지점'],
        ['D07', '기타']
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
Ext.define('projectReviewData', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'CATEGORY' },
        { name: 'SUMMARY' },
        { name: 'PERIODGAP' },
        { name: 'REVIEW' },
        { name: 'WORKER' }
    ]
});
var gridData = Ext.create('Ext.data.ArrayStore', {
    model: 'projectReviewData',
    data: [
        ['정의', '','+20','컨셉이 개 애매해서 20일 더 걸림!!','거니니'],
        ['개발', '', '+20', '휴가 다녀와서 20일 더 걸림 ㅎㅎ 야호', '으니니'],
        ['수정 지점', '정의부 요구사항 수정 필요', '', '요구사항 정의를 확실히 못해서 나중에 또 수정해야 했음', '거니니'],
        ['수정 지점', 'DB 설계도 수정 필요', '', 'DB 설계 잘못해서 수정해야 했음 시밤 ㅠㅠ', '지니니'],
        ['수정 지점', 'DB 설계도 수정 필요', '', 'DB 설계 잘못해서 수정해야 했음 시밤 ㅠㅠ', '지니니'],
    ]
});
var grd = ApGrid.create();
grd.addColumn('combo', '카테고리', ['CATEGORY', comboStoreCategory], 120);
grd.addColumn('text', '요약', 'SUMMARY', 200);
grd.addColumn('num', '기간 차이', 'PERIODGAP', 120);
grd.addColumn('text', '상세 리뷰', 'REVIEW', 700);
grd.addColumn('combo', '담당자', ['WORKER', comboStoreWorker], 120);

grd.reconfigure(gridData);
//--------------------------------------------------
pnl_content.divideV(pnl_graph_root, pnl_grid_root);
pnl_graph_root.divideV(pnl_graph_top, pnl_graph_bottom);
pnl_graph_top.divideH(pnl_graph1, pnl_graph2);
pnl_graph_bottom.full(pnl_graph3);
pnl_grid_root.full(pnl_grid);

pnl_grid.full(grd);