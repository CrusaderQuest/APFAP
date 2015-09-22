/// <reference path="../Resource/Scripts/ext-all-debug.js" />
/// <reference path="../Resource/Scripts/component.js" />
/// <reference path="../Resource/Scripts/noncomponent.js" />

var myDataStore = Ext.create('Ext.data.JsonStore', {
    fields: ['category', 'data1', 'data2', 'data3', 'data4', 'data5', 'data6'],
    data: [
        { category: 'dd', data1: 20, data2: 37, data3: 78, data4: 4, data5: 68, data6: 70 },
        // { category: 'aa', data1: 20, data2: 37, data3: 78, data4: 4, data5: 68, data6: 70 }
    ]
});
var cha_ING_H = Ext.create('Ext.chart.Chart', {
    width: '100%',
    height: 410,
    id: 'GRF',
    padding: '10 0 0 0',
    animate: true,
    shadow: false,
    config: {
        colors: ['#1ABC9C', '#F1C40F', '#3498DB', '#C0392B', '#9B59B6']
    },
    style: 'background: #fff;',
    legend: {
        position: 'bottom',
        boxStrokeWidth: 0,
        labelFont: '12px Helvetica'
    },
    store: myDataStore,
    insetPadding: 10,
    //items: [{
    //    type: 'text',
    //    text: '단계별 진행상황',
    //    font: '22px 나눔고딕',
    //    width: 100,
    //    height: 30,
    //    x: 40, //the sprite x position
    //    y: 12  //the sprite y position
    //}],
    axes: [{
        type: 'Numeric',
        position: 'left',
        fields: 'data1',
        grid: true,
        minimum: 0,
        label: {
            renderer: function (v) { return v + '%'; }
        }
    }],
    series: [{
        type: 'column',
        axis: 'left',
        title: ['정의', '분석', '설계', '개발', '테스트', '평가'],
        xField: 'category',
        yField: ['data1', 'data2', 'data3', 'data4', 'data5', 'data6'],
        style: {
            opacity: 1
        },
        highlight: {
            fill: '#000',
            'stroke-width': 1,
            stroke: '#000'
        },
        tips: {
            trackMouse: true,
            style: 'background: #FFF',
            height: 20,
            renderer: function (storeItem, item) {
                var browser = item.series.title[Ext.Array.indexOf(item.series.yField, item.yField)];
                this.setTitle(browser + ' for ' + storeItem.get('category') + ': ' + storeItem.get(item.yField) + '%');
            }
        }
    }]
});

//진행상황 상세
var myDataStore = Ext.create('Ext.data.JsonStore', {
    fields: ['month', 'data1'],
    data: [
        { month: '화면설계', data1: 40 },
        { month: 'UI설계', data1: 20 },
        { month: '데이터설계', data1: 19 },
        { month: '고구마설계', data1: 18 },
        { month: '감자 설계', data1: 18 }
    ]
});

var cha_ING_D = Ext.create('Ext.chart.Chart', {
    width: '100%',
    height: 410,
    padding: '10 0 0 0',
    style: 'background: #fff',
    animate: true,
    shadow: false,
    store: myDataStore,
    insetPadding: 25,
    items: [{
        type: 'text',
        text: '정의',
        font: '22px 나눔고딕',
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
});
var grd_NOTICE = ApGrid.create();
grd_NOTICE.addColumn('text', '공지', 'NOTICE_TITLE', 400);
grd_NOTICE.addColumn('text', '내용', 'NOTICE_CONTENT', 200);
grd_NOTICE.setLockColumns('NOTICE_TITLE', 'NOTICE_CONTENT');
var panel4 = ApGrid.create();
panel4.addColumn('text', 'text4', 'aa')
//메인포탈 설계
Ext.define('Main', {
    extend: 'Ext.container.Container',
    
	requires: [
		'Ext.layout.container.Border',
		'Ext.dashboard.Dashboard'
	],	

	layout: {
	    type: 'fit'
	},
	items: [{
	    xtype: 'dashboard',
	    itemId: 'dashboard',
	    reference: 'dashboard',
	    //region: 'center',
	    stateful: false,
	    columnWidths: [
		    0.50,
		    0.50
	    ],
        parts: {
            portlet: {
				viewTemplate: {
					layout: 'fit',
					closable: false,
					maximizable: true
				}				
            }
        },	
        defaultContent: [{
            type: 'portlet',
            title: '단계별 진행상황',
            //font: '22px 나눔고딕',
            columnIndex: 0,
            height: 350
        }, {
			type: 'portlet',
			title: '상세 진행상황',
			columnIndex: 1,
			height: 250
		}, {
			type: 'portlet',
			title: '공지사항',
		    columnIndex: 0,
		    height: 150
		}, {
			type: 'portlet',
			title: '이번주 할일',
		    columnIndex: 1,
		    height: 250
		}]
	}]
	
});

var MAIN = Ext.create('Main');
Ext.onReady(function () {
    viewPort = Ext.create('Ext.container.Viewport', {
        layout: 'fit',
        items: [MAIN]
    });
    MAIN.items.items[0].items.items[0].items.items[0].add(cha_ING_H);
    MAIN.items.items[0].items.items[2].items.items[0].add(cha_ING_D);
    MAIN.items.items[0].items.items[0].items.items[1].add(grd_NOTICE);
    MAIN.items.items[0].items.items[2].items.items[1].add(panel4);
    SYS_INIT();
})