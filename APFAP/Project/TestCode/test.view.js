/// <reference path="../../Resource/Scripts/ext-all-debug.js" />
/// <reference path="../../Resource/Scripts/component.js" />
/// <reference path="../../Resource/Scripts/noncomponent.js" />
//

//View 단 정의 영역 시작

//var tre_CUSTOMTREE = ApTree.create('test', '', true, false);
//var node1 = getNode('', true, false, true);
//var node3 = getNode('', true, false);
//var node2 = getNode('', true, false);
//tre_CUSTOMTREE.bindNode(node1, 1, false);
//tre_CUSTOMTREE.bindNode(node2, 2, false);
//tre_CUSTOMTREE.bindNode(node3, 2, false);
////주석

//var tbl_H = ApTable.create(1);
//tbl_H.setTarget();
//var chk_aa = ApCheck.create('체크지롱');
//var btn_aa = ApButton.create('Yo Check');
//var btn_bb = ApButton.create('탭체인지');
//var text_cc = ApText.create('헤이요');

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
//        { name: 'USERID' },
//        { name: 'CHECK', type: 'boolean' },
//        { name: 'DATE', type: 'date', dateFormat: 'Y-m-d' },
//        { name: 'SEQ', type: 'number' },
//        { name: 'COMBO' }
//    ]
//});
//var gridData = Ext.create('Ext.data.ArrayStore', {
//    model: 'testData',
//    data: [
//        ['aaa1', false, '2015-07-29', 30.24, 'AAA'],
//        ['aaa2', false, '2015-07-29', 30.24,'BBB'],
//        ['aaa3', true, '2015-07-29', 30.24,'CCC'],
//        ['aaa4', true, '2015-07-29', 30.24, 'AAA'],
//        ['aaa5', false, '2015-07-29', 30.24, 'AAA'],
//        ['aaa6', false, '2015-07-29', 30.24, 'BBB'],
//    ]
//});


//var pr = DBParams.create('SP_COMMAIN', 'SEARCH_Detail');
////데이터셋
//var ds = DBconnect.runProcedure(pr);

//var grd = ApGrid.create(true);
//grd.addColumn('text', '텍스트', 'USERID', 200);
//grd.addColumn('num', '넘버', 'SEQ', 200);
//grd.addColumn('date', '날짜', 'DATE1', 200);
//grd.addColumn('check', '체크', 'CHECK1', 200);
//grd.addColumn('combo', '콤보', ['COMBO', ds[0]], 200);
//grd.reconfigure(ds[1]);

//var panel1 = ApPanel.create('aaa');
//var panel2 = ApPanel.create('bbb');

Ext.define('ChartsKitchenSink.view.charts.bar.Basic', {
    extend: 'Ext.Panel',
    xtype: 'basic-bar',


    initComponent: function () {
        var me = this;

        this.myDataStore = Ext.create('Ext.data.JsonStore', {
            fields: ['month', 'data1'],
            data: [
                { month: 'Jan', data1: 20 },
                { month: 'Feb', data1: 20 },
                { month: 'Mar', data1: 19 },
                { month: 'Apr', data1: 18 },
                { month: 'May', data1: 18 },
                { month: 'Jun', data1: 17 },
                { month: 'Jul', data1: 16 },
                { month: 'Aug', data1: 16 },
                { month: 'Sep', data1: 16 },
                { month: 'Oct', data1: 16 },
                { month: 'Nov', data1: 15 },
                { month: 'Dec', data1: 15 }
            ]
        });


        me.items = [{
            xtype: 'chart',
            width: 1000,
            height: 410,
            padding: '10 0 0 0',
            style: 'background: #fff',
            animate: true,
            shadow: false,
            autoScroll: true,
            store: this.myDataStore,
            insetPadding: 40,
            items: [{
                type: 'text',
                text: 'Bar Charts - Basic Bar',
                font: '22px Helvetica',
                width: 100,
                height: 30,
                x: 40, //the sprite x position
                y: 12  //the sprite y position
            }],
            axes: [{
                type: 'Numeric',
                position: 'bottom',
                fields: ['data1'],
                label: {
                    renderer: function (v) { return v + '%'; }
                },
                grid: true,
                minimum: 0
            }, {
                type: 'Category',
                position: 'left',
                fields: ['month'],
                grid: true
            }],
            series: [{
                type: 'bar',
                axis: 'bottom',
                xField: 'month',
                yField: 'data1',
                style: {
                    opacity: 0.80
                },
                highlight: {
                    fill: '#000',
                    'stroke-width': 2,
                    stroke: '#fff'
                },
                tips: {
                    trackMouse: true,
                    style: 'background: #FFF',
                    height: 20,
                    renderer: function (storeItem, item) {
                        this.setTitle(storeItem.get('month') + ': ' + storeItem.get('data1') + '%');
                    }
                }
            }]
        }];

        this.callParent();
    }
});
var aa = Ext.create('ChartsKitchenSink.view.charts.bar.Basic');
viewPanel.full(aa);

ApEvent.onlaod = function () {
    //var tab = ApTab.create();
    //tab.addTab('안녕').full(grd);
    //tab.addTab('하이').full(tbl_H);
    //tab.addTab('헬로우').full(tre_CUSTOMTREE);
}