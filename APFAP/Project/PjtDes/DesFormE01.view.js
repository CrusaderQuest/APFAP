/// <reference path="../../Resource/Scripts/ext-all-debug.js" />
/// <reference path="../../Resource/Scripts/component.js" />
/// <reference path="../../Resource/Scripts/noncomponent.js" />
//

//View 단 정의 영역 시작

//grid 로 category 화면 나타내는 부분
//var pnl_Menu_tree = Ext.create('Ext.tree.Panel', {
//    title: '메뉴 tree',
//    width: 200,
//    collapsible: true,
//    tools: [{
//        type: 'close',
//        handler: function () { }
//    }],
//    store: Ext.create('Ext.data.TreeStore', {
//        root: {
//            expanded: true,
//            children: [
//                { text: "MENU GUS", leaf: true },
//                {
//                    text: "MENU Jinsung", leaf: true,
//                    children: [
//                        { text: "sub Menu option2.1", leaf: true },
//                        { text: "sub Menu option2.2", leaf: true }
//                    ]
//                },
//                { text: "MENU Junhee", leaf: true }
//            ]
//        }
//    }),
//    viewConfig: {
//        plugins: {
//            ptype: 'treeviewdragdrop'
//        }
//    },
//    buttons: [{ text: 'Save' }],
//    rootVisible: false
//});
var pnl_Menu_tree = ApTree.create('Module Test', '', true, false);
var node1 = getNode('Menu Parent', true, false, true);
var node2 = getNode('Menu Child 1', true, false);
var node3 = getNode('Menu Child 2', true, false);
pnl_Menu_tree.bindNode(node1, 1, false);
pnl_Menu_tree.bindNode(node2, 2, false);
pnl_Menu_tree.bindNode(node3, 2, false);

var pnl_detail = ApPanel.create('grid 들어가서 설명할 부분 ');

//grid 부분
Ext.define('menuDescription', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'MENU' },
        { name: 'DESCRIPTION' },
        { name: 'CHECK', type: 'boolean' },
        { name: 'DATE', type: 'date', dateFormat: 'Y-m-d' }
    ]
});

var gridData = Ext.create('Ext.data.ArrayStore', {
    model: 'menuDescription',
    data: [
        ['개발탭', '개발을 위한 메뉴입니다 , 기능은 어떤것이 있다', true, '2015-08-05']
    ]
});

var grd = ApGrid.create();
//grd.addColumn('text', '프로젝트 이름', 'PROJECTNM', 200);
grd.addColumn('text', 'Menu name', 'MENU', 200);
grd.addColumn('text', 'Description', 'DESCRIPTION', 500);
grd.addColumn('check', '업로드 여부', 'CHECK', 100);
grd.addColumn('date', '날짜', 'DATE', 210);
grd.reconfigure(gridData);
pnl_detail.full(grd);
viewPanel.divideH(pnl_Menu_tree, pnl_detail);
pnl_Menu_tree.setWidth(300);