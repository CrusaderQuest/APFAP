/// <reference path="../../Resource/Scripts/ext-all-debug.js" />
/// <reference path="../../Resource/Scripts/component.js" />
/// <reference path="../../Resource/Scripts/noncomponent.js" />
//

//View 단 정의 영역 시작

var tre_CUSTOMTREE = ApTree.create('test', '', true, false);
var node1 = getNode('', true, false, true);
var node3 = getNode('', true, false);
var node2 = getNode('', true, false);
tre_CUSTOMTREE.bindNode(node1, 1, false);
tre_CUSTOMTREE.bindNode(node2, 2, false);
tre_CUSTOMTREE.bindNode(node3, 2, false);
//주석

var tbl_H = ApTable.create(1);
tbl_H.setTarget();
var chk_aa = ApCheck.create('체크지롱');

var tab = ApTab.create();
tab.addTab('하이').full(tbl_H);
tab.addTab('헬로우').full(tre_CUSTOMTREE);
tab.addTab('안녕');
viewPanel.full(tab);