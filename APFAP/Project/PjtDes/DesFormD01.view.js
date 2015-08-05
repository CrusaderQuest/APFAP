/// <reference path="../../Resource/Scripts/ext-all-debug.js" />
/// <reference path="../../Resource/Scripts/component.js" />
/// <reference path="../../Resource/Scripts/noncomponent.js" />
//

//View 단 정의 영역 시작

//여기는 화면정의에 대한 부분임(이미지 삽입해서 보여주는거)

var pnl_sub = ApPanel.create('여기는 tree 로 menu ');
var tbl_tree = ApTable.create(1);
tbl_tree.setTarget();
var btn_main = ApButton.create('메인화면');
var btn_page2 = ApButton.create('두번째화면');
var btn_page3 = ApButton.create('세번째화면');
pnl_sub.full(tbl_tree);

var pnl_detail = ApPanel.create('여기는 화면이미지 보여주는것 + grid');

Ext.define('systemArchi', {
    extend: 'Ext.data.Model',
    fields: [
        //{ name: 'PROJECTNM' },
        { name: 'DATE', type: 'date', dateFormat: 'Y-m-d' },
        { name: 'CHECK', type: 'boolean' },
        { name: 'SUMMARY' }
    ]
});

var gridData = Ext.create('Ext.data.ArrayStore', {
    model: 'systemArchi',
    data: [
        ['2015-07-29', false, '이건 업로드가 안된거여']
    ]
});

var grd = ApGrid.create();
//grd.addColumn('text', '프로젝트 이름', 'PROJECTNM', 200);

grd.addColumn('date', '날짜', 'DATE', 200);
grd.addColumn('check', '업로드 여부', 'CHECK', 200);
grd.addColumn('text', 'page name', 'SUMMARY', 900);

grd.reconfigure(gridData);
pnl_detail.full(grd);

viewPanel.divideH(pnl_sub, pnl_detail);
pnl_sub.setWidth(180);
//grid 밑에 업로드 한 이미지를 삽입함