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
var btn_aa = ApButton.create('Yo Check');
var btn_bb = ApButton.create('탭체인지');
var text_cc = ApText.create('헤이요');

var comboStore = Ext.create('Ext.data.ArrayStore', {
    fields: ['HIDEDATA', 'SHOWDATA'],
    data: [
        ['aa', 'AAA'],
        ['bb', 'BBB'],
        ['cc', 'CCC'],
        ['dd', 'DDD'],
        ['ee', 'EEEE']
    ]
});

Ext.define('testData', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'USERID' },
        { name: 'CHECK', type: 'boolean' },
        { name: 'DATE', type: 'date', dateFormat: 'Y-m-d' },
        { name: 'SEQ', type: 'number' },
        { name: 'COMBO' }
    ]
});
var gridData = Ext.create('Ext.data.ArrayStore', {
    model: 'testData',
    data: [
        ['aaa1', false, '2015-07-29', 30.24, 'AAA'],
        ['aaa2', false, '2015-07-29', 30.24,'BBB'],
        ['aaa3', true, '2015-07-29', 30.24,'CCC'],
        ['aaa4', true, '2015-07-29', 30.24, 'AAA'],
        ['aaa5', false, '2015-07-29', 30.24, 'AAA'],
        ['aaa6', false, '2015-07-29', 30.24, 'BBB'],
    ]
});
var grd = ApGrid.create();
grd.addColumn('text', '텍스트', 'USERID', 200);
grd.addColumn('num', '넘버', 'SEQ', 200);
grd.addColumn('date', '날짜', 'DATE', 200);
grd.addColumn('check', '체크', 'CHECK', 200);
grd.addColumn('combo', '콤보', ['COMBO', comboStore], 200);
grd.reconfigure(gridData);

var tab = ApTab.create();
tab.addTab('안녕').full(grd);
tab.addTab('하이').full(tbl_H);
tab.addTab('헬로우').full(tre_CUSTOMTREE);
viewPanel.full(tab);