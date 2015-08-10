/// <reference path="../../Resource/Scripts/ext-all-debug.js" />
/// <reference path="../../Resource/Scripts/component.js" />
/// <reference path="../../Resource/Scripts/noncomponent.js" />
//

//View 단 정의 영역 시작
var pnl_contents = ApPanel.create("FUNC");
var pnl_con = ApPanel.create("func");
var pnl_vi = ApPanel.create("sd");
var tt = ApTable.create();
tt.setTarget();
var bt = ApButton.create("sdd");
var bte = ApButton.create("33");

pnl_vi.divideV( pnl_con,pnl_contents);
pnl_con.full(bte);
pnl_contents.full(bt);
viewPanel.full(pnl_vi);

