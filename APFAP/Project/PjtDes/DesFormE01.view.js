/// <reference path="../../Resource/Scripts/ext-all-debug.js" />
/// <reference path="../../Resource/Scripts/component.js" />
/// <reference path="../../Resource/Scripts/noncomponent.js" />
//

//View 단 정의 영역 시작

//grid 로 category 화면 나타내는 부분

var pnl_menuTree = ApPanel.create('tree들어갈 부분');
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
grd.addColumn('date', '날짜', 'DATE', 200);
grd.reconfigure(gridData);
pnl_detail.full(grd);
viewPanel.divideH(pnl_menuTree, pnl_detail);
pnl_menuTree.setWidth(300);