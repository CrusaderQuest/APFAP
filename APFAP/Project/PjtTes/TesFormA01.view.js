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

var pnl_tab = ApPanel.create("탭 패널");
var pnl_grid = ApPanel.create("그리드 패널");

pnl_content.divideV(pnl_tab, pnl_grid);
pnl_tab.setHeight('10%');