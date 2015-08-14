/// <reference path="../../Resource/Scripts/ext-all-debug.js" />
/// <reference path="../../Resource/Scripts/component.js" />
/// <reference path="../../Resource/Scripts/noncomponent.js" />
//

//View 단 정의 영역 시작
var pnl_proNM = ApPanel.create('Project Name');
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
var pnl_in_pnl =ApPanel.create('button 들어갈 table panel')
var tbl_button = ApTable.create(2);
tbl_button.setTarget();
var btn_insert = ApButton.create('insert');
var btn_delete = ApButton.create('delete');
tbl_button.setPosition(990, 0, null);
pnl_in_pnl.full(tbl_button);

pnl_proNM.divideV(grd,pnl_in_pnl);
grd.setWidth('fit');

var pnl_sysArchi = ApPanel.create('System Architecture Image');
viewPanel.divideV(pnl_proNM, pnl_sysArchi);
pnl_proNM.setHeight(250);



//var pnl_proDown = ApPanel.create('버튼만나옴');
//var fake2 = ApTable.create(2);
//fake2.setTarget();
//var insert2 = ApButton.create('insert image');
//var delete2 = ApButton.create('delete image');
//pnl_proDown.full(fake2);
//pnl_proNM.divideV(pnl_proUP, pnl_proDown);

//var fake = ApTable.create(2);
//fake.setTarget();

//var insertbtn = ApButton.create('insert image');
//var deletebtn = ApButton.create('delete image');
//pnl_sysArchi.full(fake);


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

