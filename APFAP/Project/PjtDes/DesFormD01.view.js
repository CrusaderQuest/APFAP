/// <reference path="../../Resource/Scripts/ext-all-debug.js" />
/// <reference path="../../Resource/Scripts/component.js" />
/// <reference path="../../Resource/Scripts/noncomponent.js" />
//

//View 단 정의 영역 시작

//여기는 화면정의에 대한 부분임(이미지 삽입해서 보여주는거)

var pnl_sub = Ext.create('Ext.panel.Panel', {
    title: 'screen 이름을 button', buttons: [{ text: 'insert' },
        { text: 'delete' }
    ]
});
var tbl_tree = ApTable.create(1);
tbl_tree.setTarget();
var btn_main = ApButton.create('메인화면');
var btn_page2 = ApButton.create('두번째화면');
var btn_page3 = ApButton.create('세번째화면');
pnl_sub.add(tbl_tree);

var pnl_detail = ApPanel.create('밖의 껍데기');
var pnl_detail_grid = Ext.create('Ext.panel.Panel', { title: 'grid + button', buttons: [{ text: 'insert image' }, { text: 'delete image' }] });
var pnl_detail_image = ApPanel.create('SCREEN IMAGE');
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

var grd = ApGrid.create();
grd.addColumn('text', '프로젝트 이름', 'PROJECTNM', 200)
grd.addColumn('date', '날짜', 'DATE', 200);
grd.addColumn('check', '업로드 여부', 'CHECK', 200);
grd.addColumn('text', 'summary', 'SUMMARY', 530);

grd.reconfigure(gridData);
pnl_detail_grid.add(grd);
grd.setWidth('fit');

pnl_detail.divideV(pnl_detail_grid, pnl_detail_image);
pnl_detail_grid.setHeight(200);
viewPanel.divideH(pnl_sub, pnl_detail);
pnl_sub.setWidth(180);
//grid 밑에 업로드 한 이미지를 삽입함/// <reference path="../../Resource/Scripts/ext-all-debug.js" />
/// <reference path="../../Resource/Scripts/component.js" />
/// <reference path="../../Resource/Scripts/noncomponent.js" />
//

//View 단 정의 영역 시작

//여기는 화면정의에 대한 부분임(이미지 삽입해서 보여주는거)

var pnl_sub = Ext.create('Ext.panel.Panel', {
    title: 'screen 이름을 button', buttons: [{ text: 'insert' },
        { text: 'delete' }
    ]
});
var tbl_tree = ApTable.create(1);
tbl_tree.setTarget();
var btn_main = ApButton.create('메인화면');
var btn_page2 = ApButton.create('두번째화면');
var btn_page3 = ApButton.create('세번째화면');
pnl_sub.add(tbl_tree);

var pnl_detail = ApPanel.create('밖의 껍데기');
var pnl_detail_grid = Ext.create('Ext.panel.Panel', { title: 'grid + button', buttons: [{ text: 'insert image' }, { text: 'delete image' }] });
var pnl_detail_image = ApPanel.create('SCREEN IMAGE');
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

var grd = ApGrid.create();
grd.addColumn('text', '프로젝트 이름', 'PROJECTNM', 200)
grd.addColumn('date', '날짜', 'DATE', 200);
grd.addColumn('check', '업로드 여부', 'CHECK', 200);
grd.addColumn('text', 'summary', 'SUMMARY', 530);

grd.reconfigure(gridData);
pnl_detail_grid.add(grd);
grd.setWidth('fit');

pnl_detail.divideV(pnl_detail_grid, pnl_detail_image);
pnl_detail_grid.setHeight(200);
viewPanel.divideH(pnl_sub, pnl_detail);
pnl_sub.setWidth(180);
//grid 밑에 업로드 한 이미지를 삽입함