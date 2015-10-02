/// <reference path="../Resource/Scripts/ext-all-debug.js" />
/// <reference path="../Resource/Scripts/component.js" />
/// <reference path="../Resource/Scripts/noncomponent.js" />

var pr = DBParams.create('sp_COMMAIN', 'SEARCH_GRAPH_H');
var ds = DBconnect.runProcedure(pr);
var cha_ING_H = Ext.create('Ext.chart.Chart', {
    width: '100%',
    height: 410,
    id: 'cha_ING_H',
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
        labelFont: '12px Helvetica',
        renderer: function (sprite, storeItem, barAttr, i, store) {
            var colorArray = [],
                index = 0,
                filter = this.__excludes,
                l;


            if (!filter) {
                colorArray = colors;
            } else {
                for (l = colors.length; index < l; ++index) {
                    if (!filter[index]) {
                        colorArray.push(colors[index]);
                    }
                }
            }
            barAttr.fill = colorArray[i % colorArray.length];
            return barAttr;
        },
    },
    store: ds[0],
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
        fields: 'P_DEF',
        grid: true,
        minimum: 0,
        label: {
            renderer: function (v) { return v + '%'; }
        }
    }],
    series: [{
        type: 'column',
        axis: 'left',
        //renderer: function (sprite, record, attr, index, store) {
        //    return Ext.apply(attr, {
        //        fill: 'yellow'
        //    });
        //},
        title: ['정의', '분석', '설계', '개발', '테스트', '평가'],
        xField: 'ALLRATE',
        yField: ['P_DEF', 'P_ANL', 'P_DES', 'P_DEV', 'P_TES', 'P_EVL'],
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
            width: 200,
            renderer: function (storeItem, item) {
                var browser = item.series.title[Ext.Array.indexOf(item.series.yField, item.yField)];
                this.setTitle(browser + '단계의 ' + storeItem.get('ALLRATE') + ': ' + storeItem.get(item.yField) + '%');
            }
        },
        listeners: {
            itemmousedown: function (obj) {
                var pr = DBParams.create('sp_COMMAIN', 'SEARCH_GRAPH_D');
                pr.addParam('CONTENT_CD',obj.yField.substr(2, 3));
                var sto_cha_ING_D = DBconnect.runProcedure(pr);
                // get the correct serie
                MAIN.items.items[0].items.items[2].items.items[0].removeAll();
                var index = '';
                if (obj.yField.substr(2, 3) == 'DEF' ){
                    index = 0;
                } else if (obj.yField.substr(2, 3) == 'ANL') {
                    index = 1;
                } else if (obj.yField.substr(2, 3) == 'DES') {
                    index = 2;
                } else if (obj.yField.substr(2, 3) == 'DEV') {
                    index = 3;
                } else if (obj.yField.substr(2, 3) == 'TES') {
                    index = 4;
                } else if (obj.yField.substr(2, 3) == 'EVL') {
                    index = 5;
                }
                MAIN.items.items[0].items.items[2].items.items[0].add(
                    Ext.create('Ext.chart.Chart', {
                    width: '100%',
                    height: 410,
                    padding: '10 0 0 0',
                    style: 'background: #fff',
                    animate: true,
                    shadow: false,
                    store: sto_cha_ING_D[0],
                    insetPadding: 15,
                    items: [{
                        type: 'text',
                        text: obj.series.title[index],
                        font: '16px 나눔고딕',
                        width: 100,
                        height: 30,
                        x: 40, //the sprite x position
                        y: 12  //the sprite y position
                    }],
                    axes: [{
                        type: 'Numeric',
                        position: 'bottom',
                        fields: ['RATE'],
                        label: {
                            renderer: function (v) { return v + '%'; }
                        },
                        minimum: 0
                    }, {
                        type: 'Category',
                        position: 'left',
                        fields: ['FORMNAME']
                    }],
                    series: [{
                        type: 'bar',
                        axis: 'bottom',
                        xField: 'FORMNAME',
                        yField: 'RATE',
                        style: {
                            opacity: 0.80
                        },
                        highlight: {
                            fill: '#000',
                            'stroke-width': 2,
                            stroke: '#fff'
                        },
                        renderer: function (sprite, record, attr, index, store) {
                            return Ext.apply(attr, {
                                fill: '#3590D2'
                            });
                        },
                        tips: {
                            trackMouse: true,
                            style: 'background: #FFF',
                            height: 20,
                            renderer: function (storeItem, item) {
                                this.setTitle(storeItem.get('FORMNAME') + ': ' + storeItem.get('RATE') + '%');
                            }
                        }
                    }]
                    })
                )

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

var pr = DBParams.create('sp_COMMAIN', 'SEARCH_GRAPH_D');
pr.addParam('CONTENT_CD', 'DEF');
var sto_cha_ING_D = DBconnect.runProcedure(pr);
var cha_ING_D = Ext.create('Ext.chart.Chart', {
    width: '100%',
    height: 410,
    padding: '10 0 0 0',
    style: 'background: #fff',
    animate: true,
    shadow: false,
    store: sto_cha_ING_D[0],
    insetPadding: 15,
    items: [{
        type: 'text',
        text: '정의',
        font: '16px 나눔고딕',
        width: 100,
        height: 30,
        x: 40, //the sprite x position
        y: 12  //the sprite y position
    }],
    axes: [{
        type: 'Numeric',
        position: 'bottom',
        fields: ['RATE'],
        label: {
            renderer: function (v) { return v + '%'; }
        },
        minimum: 0
    }, {
        type: 'Category',
        position: 'left',
        fields: ['FORMNAME']
    }],
    series: [{
        type: 'bar',
        axis: 'bottom',
        xField: 'FORMNAME',
        yField: 'RATE',
        renderer: function(sprite, record, attr, index, store){
            return Ext.apply(attr, {
                fill: '#3590D2'
            });
        },
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
                this.setTitle(storeItem.get('FORMNAME') + ': ' + storeItem.get('RATE') + '%');
            }
        }
    }]
});
var grd_NOTICE = ApGrid.create();
grd_NOTICE.addColumn('text', '공지', 'NOTICE_TITLE', 200);
grd_NOTICE.addColumn('text', '내용', 'NOTICE_CONTENT', 500);
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
		    0.40,
		    0.60
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
            height:500
        }, {
			type: 'portlet',
			title: '상세 진행상황',
			columnIndex: 1,
			height: 194
		}, {
			type: 'portlet',
			title: '공지사항',
			columnIndex: 1,
			height: 300
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
    MAIN.items.items[0].items.items[2].items.items[1].add(grd_NOTICE);
    SYS_INIT();
})