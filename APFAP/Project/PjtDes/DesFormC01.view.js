/// <reference path="../../Resource/Scripts/ext-all-debug.js" />
/// <reference path="../../Resource/Scripts/component.js" />
/// <reference path="../../Resource/Scripts/noncomponent.js" />
//

//View 단 정의 영역 시작
var pnl_proNM = ApPanel.create('Project Name');
var pnl_proUP = ApPanel.create('table나와야지');
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
grd.addColumn('text', 'Summary', 'SUMMARY', 900);

grd.reconfigure(gridData);
pnl_proUP.full(grd);


var pnl_proDown = ApPanel.create('버튼만나옴');
var fake2 = ApTable.create(2);
fake2.setTarget();
var insert2 = ApButton.create('insert image');
var delete2 = ApButton.create('delete image');
pnl_proDown.full(fake2);
pnl_proNM.divideV(pnl_proUP, pnl_proDown);




var pnl_sysArchi = ApPanel.create('System Architecture Image');
var fake = ApTable.create(2);
fake.setTarget();

var insertbtn = ApButton.create('insert image');
var deletebtn = ApButton.create('delete image');
pnl_sysArchi.full(fake);
viewPanel.divideV(pnl_proNM, pnl_sysArchi);
pnl_proNM.setHeight(300);



//insertbtn.setHeight(430);
//insertbtn.setWidth(1360);

//var comboStore = Ext.create('Ext.data.ArrayStore', {
//    fields: ['HIDEDATA', 'SHOWDATA'],
//    data: [
//        ['aa', 'AAA'],
//        ['bb', 'BBB'],
//        ['cc', 'CCC'],
//        ['dd', 'DDD'],
//        ['ee', 'EEEE']
//    ]
//});

//Ext.define('testData', {
//    extend: 'Ext.data.Model',
//    fields: [
//{ name: 'USERID' },
//{ name: 'CHECK', type: 'boolean' },
//{ name: 'DATE', type: 'date', dateFormat: 'Y-m-d' },
//{ name: 'SEQ', type: 'number' },
//{ name: 'COMBO' }
//    ]
//});
//var gridData = Ext.create('Ext.data.ArrayStore', {
//    model: 'testData',
//    data: [
//        ['aaa1', false, '2015-07-29', 30.24, 'AAA'],
//        ['aaa2', false, '2015-07-29', 30.24, 'BBB'],
//        ['aaa3', true, '2015-07-29', 30.24, 'CCC'],
//        ['aaa4', true, '2015-07-29', 30.24, 'AAA'],
//        ['aaa5', false, '2015-07-29', 30.24, 'AAA'],
//        ['aaa6', false, '2015-07-29', 30.24, 'BBB'],
//    ]
//});
//var grd = ApGrid.create();  
//grd.addColumn('text', '텍스트', 'USERID', 200);
//grd.addColumn('num', '넘버', 'SEQ', 200);
//grd.addColumn('date', '날짜', 'DATE', 200);
//grd.addColumn('check', '체크', 'CHECK', 200);
//grd.addColumn('combo', '콤보', ['COMBO', comboStore], 200);
//grd.reconfigure(gridData);
//viewPanel.full(grd);
