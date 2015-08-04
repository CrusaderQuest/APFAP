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
pnl_content.full(pnl_grid);