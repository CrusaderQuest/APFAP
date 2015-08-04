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

pnl_content.divideV(pnl_graph_root, pnl_grid_root);
pnl_graph_root.divideV(pnl_graph_top, pnl_graph_bottom);
pnl_graph_top.divideH(pnl_graph1, pnl_graph2);
pnl_graph_bottom.full(pnl_graph3);
pnl_grid_root.full(pnl_grid);