/// <reference path="../../Resource/Scripts/ext-all-debug.js" />
/// <reference path="../../Resource/Scripts/component.js" />
/// <reference path="../../Resource/Scripts/noncomponent.js" />
//

//View 단 정의 영역 시작
//class 설계 부분

var pnl_class_OUT = ApPanel.create("interface , class");
var pnl_Interface_tree = Ext.create('Ext.tree.Panel', {
    title: 'Interface Tree',
    width: 200,
    collapsible: true,
    tools: [{
        type: 'close',
        handler: function () { }
    }],
    store: Ext.create('Ext.data.TreeStore', {
        root: {
            expanded: true,
            children: [
                { text: "Interface GUS", leaf: true },
                {
                    text: "Interface Jinsung", leaf: true,
                    children: [
                        { text: "sub Menu option2.1", leaf: true },
                        { text: "sub Menu option2.2", leaf: true }
                    ]
                },
                { text: "Interface Junhee", leaf: true }
            ]
        }
    }),
    viewConfig: {
        plugins: {
            ptype: 'treeviewdragdrop'
        }
    },
    buttons: [{ text: 'Save' }],
    rootVisible: false
});

var pnl_Class_tree = Ext.create('Ext.tree.Panel', {
    title: 'Simple Tree',
    width: 200,
    tools: [{
        type: 'close',
        handler: function () { }
    }],
    store: Ext.create('Ext.data.TreeStore', {
        root: {
            expanded: true,
            children: [
                { text: "Class GUS", leaf: true },
                {
                    text: "Class Jinsung", leaf: true,
                    children: [
                        { text: "sub Menu option2.1", leaf: true },
                        { text: "sub Menu option2.2", leaf: true }
                    ]
                },
                { text: "Class Junhee", leaf: true }
            ]
        }
    }),
    viewConfig: {
        plugins: {
            ptype: 'treeviewdragdrop'
        }
    },
    buttons: [{ text: 'Save' }],
    rootVisible: false
});

pnl_class_OUT.divideH(pnl_Interface_tree, pnl_Class_tree);

var pnl_class_Description = ApPanel.create("Class Description");
var tbl_class_Description = ApTable.create(1);

tbl_class_Description.setTarget();

var cbo_class_Description = ApCombo.create("class 선택");
cbo_class_Description.addItem('gusClass', 'jinsungClass');
cbo_class_Description.addItem('junheeClass', 'jinsungClass');

//tbl_class_Description.setBodyStyle('background-color', '#0f00f0');
pnl_class_Description.full(tbl_class_Description);
//pnl_class_Description.setBodyStyle('background-color', '#ff0000');

viewPanel.divideV(pnl_class_OUT, pnl_class_Description);

