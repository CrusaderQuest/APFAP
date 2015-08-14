/// <reference path="../../Resource/Scripts/ext-all-debug.js" />
/// <reference path="../../Resource/Scripts/component.js" />
/// <reference path="../../Resource/Scripts/noncomponent.js" />
//

//View 단 정의 영역 시작

//여기는 화면정의에 대한 부분임(이미지 삽입해서 보여주는거)


var pnl_sub = ApTree.create('Screen 이름을 button', '', true, false);
var node1 = getNode('Menu Parent', true, false, true);
var node2 = getNode('Menu Child 1', true, false);
var node3 = getNode('Menu Child 2', true, false);
pnl_sub.bindNode(node1, 1, false);
pnl_sub.bindNode(node2, 2, false);
pnl_sub.bindNode(node3, 2, false);


var pnl_detail = ApPanel.create('완전밖');
var pnl_detail_UP = ApPanel.create('밖의 껍데기');
var pnl_detail_grid = ApPanel.create('grid');
pnl_detail_grid.setHeight(200);

var pnl_detail_btn = ApPanel.create('button');


var tbl_button = ApTable.create(2);
tbl_button.setTarget();
var btn_insert = ApButton.create('insert');
var btn_delete = ApButton.create('delete');
tbl_button.setPosition(780, 0, null);
pnl_detail_btn.full(tbl_button);

Ext.define('systemArchi', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'PROJECTNM' },
        { name: 'DATE', type: 'date', dateFormat: 'Y-m-d' },
        { name: 'CHECK', type: 'boolean' },
        { name: 'SUMMARY' }
    ]
});

var gridData = Ext.create('Ext.data.ArrayStore', {
    model: 'systemArchi',
    data: [
        ['메인화면', '2015-07-29', false, '이건 업로드가 안된거여']
    ]
});
var gridData1 = Ext.create('Ext.data.ArrayStore', {
    model: 'systemArchi',
    data: [
        ['두번째 화면', '2015-07-29', false, '이건 바뀐거여']
    ]
});
var gridData2 = Ext.create('Ext.data.ArrayStore', {
    model: 'systemArchi',
    data: [
        ['세번째 화면', '2015-07-29', false, '이건 또 바뀐거여']
    ]
});


var grd = ApGrid.create();
grd.addColumn('text', '프로젝트 이름', 'PROJECTNM', 200);
grd.addColumn('date', '날짜', 'DATE', 200);
grd.addColumn('check', '업로드 여부', 'CHECK', 200);
grd.addColumn('text', 'summary', 'SUMMARY', 510);

grd.reconfigure(gridData);
pnl_detail_grid.full(grd);
grd.setWidth(1000);


var pnl_detail_image = ApPanel.create('SCREEN IMAGE');

pnl_detail_UP.divideV(pnl_detail_grid, pnl_detail_btn, pnl_detail_btn);
pnl_detail_btn.setHeight(50);
pnl_detail.divideV(pnl_detail_UP, pnl_detail_image, pnl_detail_UP);
pnl_detail_UP.setHeight(200);



viewPanel.divideH(pnl_sub, pnl_detail);
pnl_sub.setWidth(200);
//grid 밑에 업로드 한 이미지를 삽입함