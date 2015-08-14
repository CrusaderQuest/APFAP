/// <reference path="../../Resource/Scripts/ext-all-debug.js" />
/// <reference path="../../Resource/Scripts/component.js" />
/// <reference path="../../Resource/Scripts/noncomponent.js" />
//

//View 단 정의 영역 시작
var pnl_proNM = ApPanel.create('Project Name');
//var pnl_proUP = ApPanel.create('table나와야지');
Ext.define('systemArchi', {
    extend: 'Ext.data.Model',
    fields: [
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

grd.addColumn('date', '날짜', 'DATE', 200);
grd.addColumn('check', '업로드 여부', 'CHECK', 200);
grd.addColumn('text', 'Summary', 'SUMMARY', 910);

grd.reconfigure(gridData);
//pnl_proUP.divideV(grd,);
var pnl_in_pnl = Ext.create('Ext.panel.Panel', { title: 'button추가된 panel', buttons: [{ text: 'insert image' }, { text: 'delete image' }] });
pnl_in_pnl.add(grd);
grd.setWidth('fit');
pnl_proNM.full(pnl_in_pnl);


//var pnl_proDown = ApPanel.create('버튼만나옴');
//var fake2 = ApTable.create(2);
//fake2.setTarget();
//var insert2 = ApButton.create('insert image');
//var delete2 = ApButton.create('delete image');
//pnl_proDown.full(fake2);
//pnl_proNM.divideV(pnl_proUP, pnl_proDown);




var pnl_sysArchi = ApPanel.create('System Architecture Image');
//var fake = ApTable.create(2);
//fake.setTarget();

//var insertbtn = ApButton.create('insert image');
//var deletebtn = ApButton.create('delete image');
//pnl_sysArchi.full(fake);
viewPanel.divideV(pnl_proNM, pnl_sysArchi);
pnl_proNM.setHeight(250);



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












///////////////////////////////////////////////////////////////////////
///// <reference path="../../Resource/Scripts/ext-all-debug.js" />
///// <reference path="../../Resource/Scripts/component.js" />
///// <reference path="../../Resource/Scripts/noncomponent.js" />
////

////View 단 정의 영역 시작
////class 설계 부분

//var pnl_class_OUT = ApPanel.create("interface , class");
//var pnl_Interface_tree = Ext.create('Ext.tree.Panel', {
//    title: 'Interface Tree',
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
//                { text: "Interface GUS", leaf: true },
//                {
//                    text: "Interface Jinsung", leaf: true,
//                    children: [
//                        { text: "sub Menu option2.1", leaf: true },
//                        { text: "sub Menu option2.2", leaf: true }
//                    ]
//                },
//                { text: "Interface Junhee", leaf: true }
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

//var pnl_Class_tree = Ext.create('Ext.tree.Panel', {
//    title: 'Simple Tree',
//    width: 200,
//    tools: [{
//        type: 'close',
//        handler: function () { }
//    }],
//    store: Ext.create('Ext.data.TreeStore', {
//        root: {
//            expanded: true,
//            children: [
//                { text: "Class GUS", leaf: true },
//                {
//                    text: "Class Jinsung", leaf: true,
//                    children: [
//                        { text: "sub Menu option2.1", leaf: true },
//                        { text: "sub Menu option2.2", leaf: true }
//                    ]
//                },
//                { text: "Class Junhee", leaf: true }
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

//pnl_class_OUT.divideH(pnl_Interface_tree, pnl_Class_tree);

//var pnl_class_Description = ApPanel.create("Class Description");
//var tbl_class_Description = ApTable.create(1);

//tbl_class_Description.setTarget();

//var cbo_class_Description = ApCombo.create("class 선택");
//cbo_class_Description.addItem('gusClass', 'jinsungClass');
//cbo_class_Description.addItem('junheeClass', 'jinsungClass');

////tbl_class_Description.setBodyStyle('background-color', '#0f00f0');
//pnl_class_Description.full(tbl_class_Description);
////pnl_class_Description.setBodyStyle('background-color', '#ff0000');

//viewPanel.divideV(pnl_class_OUT, pnl_class_Description);

