/// <reference path="../../Resource/Scripts/ext-all-debug.js" />
/// <reference path="../../Resource/Scripts/component.js" />
/// <reference path="../../Resource/Scripts/noncomponent.js" />
//

//View 단 정의 영역 시작

var pnl_top = ApPanel.create("top field");
var pnl_content = ApPanel.create("contents field");

viewPanel.divideV(pnl_top, pnl_content);
pnl_top.setHeight('10%');

var pnl_title = ApPanel.create("핵심과제 성과분석");
//pnl_title.setBodyStyle('background-color','#ff0000');
var pnl_summary = ApPanel.create("정의부에서 작성한 핵심과제에 대한 성과분석을 관리할 수 있습니다.");

pnl_top.divideH(pnl_title, pnl_summary);
pnl_title.setWidth('25%');

var pnl_grid = ApPanel.create("이곳에 그리드가 추가될 예정");
//--------------------------------------------------

Ext.define('mainReqAnalData', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'SUMMARY' },
        { name: 'REVIEW' }
    ]
});
var gridData = Ext.create('Ext.data.ArrayStore', {
    model: 'mainReqAnalData',
    data: [
        ['이미지뷰 영역의 충분한 확보', '잘댐 ㅎㅎ'],
        ['업로드시 모든 파일 양식 지원', '잘 안댐 ㅠㅠ']
    ]
});
var grd = ApGrid.create();
grd.addColumn('text', '요약', 'SUMMARY', 200);
grd.addColumn('text', '평가', 'REVIEW', 700);

grd.reconfigure(gridData);
//--------------------------------------------------
pnl_content.full(pnl_grid);
pnl_grid.full(grd);