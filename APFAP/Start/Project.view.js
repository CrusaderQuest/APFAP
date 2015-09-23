/// <reference path="../Resource/Scripts/ext-all-debug.js" />
/// <reference path="../Resource/Scripts/component.js" />
/// <reference path="../Resource/Scripts/noncomponent.js" />

//프로젝트 등록
//프로젝트 선택

var grd_SELECT = ApGrid.create();
grd_SELECT.addColumn('text', '성향', 'P_CATEGORY', 50);
grd_SELECT.addColumn('text', '형태', 'P_TYPE', 100);
grd_SELECT.addColumn('text', '제목', 'TITLE', 150);
grd_SELECT.addColumn('text', '설명', 'SUBTITLE', 440);
grd_SELECT.addColumn('hide', '', 'PROJECT_KEY');
grd_SELECT.setLockColumns('TITLE', 'SUBTITLE', 'P_CATEGORY', 'P_TYPE');

var grd_JOIN = ApGrid.create();
grd_JOIN.addColumn('text', '성향', 'P_CATEGORY', 50);
grd_JOIN.addColumn('text', '형태', 'P_TYPE', 100);
grd_JOIN.addColumn('text', '제목', 'TITLE', 150);
grd_JOIN.addColumn('text', '설명', 'SUBTITLE', 430);
grd_JOIN.addColumn('hide', '', 'PROJECT_KEY');
grd_JOIN.setLockColumns('TITLE', 'SUBTITLE', 'P_CATEGORY', 'P_TYPE');

var grd_GOING = ApGrid.create();
grd_GOING.addColumn('text', '성향', 'P_CATEGORY', 50);
grd_GOING.addColumn('text', '형태', 'P_TYPE', 100);
grd_GOING.addColumn('text', '제목', 'TITLE', 150);
grd_GOING.addColumn('text', '설명', 'SUBTITLE', 430);
grd_GOING.addColumn('hide', '', 'PROJECT_KEY');
grd_GOING.addColumn('hide', '', 'MASTER_TF');
grd_GOING.setLockColumns('TITLE', 'SUBTITLE', 'P_CATEGORY', 'P_TYPE');

var grd_CLOSED = ApGrid.create();
grd_CLOSED.addColumn('text', '성향', 'P_CATEGORY', 50);
grd_CLOSED.addColumn('text', '형태', 'P_TYPE', 100);
grd_CLOSED.addColumn('text', '제목', 'TITLE', 150);
grd_CLOSED.addColumn('text', '설명', 'SUBTITLE', 430);
grd_CLOSED.addColumn('hide', '', 'PROJECT_KEY');
grd_CLOSED.addColumn('hide', '', 'MASTER_TF');
grd_CLOSED.setLockColumns('TITLE', 'SUBTITLE', 'P_CATEGORY', 'P_TYPE');

var tbl_MAKE = ApTable.create(1);
tbl_MAKE.setTarget();
//제목
var txt_TITLE = ApText.create('제목');
txt_TITLE.setWidth(600);
var txa_SUBTITLE = ApTextArea.create('설명');
txa_SUBTITLE.setWidth(600);
//프로젝트 타입

var cbo_TYPE_1 = ApCombo.create('성향', '');
//프로젝트 형태
var cbo_TYPE_2 = ApCombo.create('형태', '');
//팀명
var txt_TEAMNAME = ApText.create('팀명');
txt_TEAMNAME.setWidth(230);
tbl_MAKE.cellShare(3);
//이미지
var upl_TEAMIMG = ApUpload.create('대표 이미지');
var img_TEAMIMG = ApImg.create();
img_TEAMIMG.setSize(100, 100);
var btn_CREATE = ApButton.create('만들기');

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
            title: '진행중인 프로젝트',
            //font: '22px 나눔고딕',
            columnIndex: 0,
            height: 200
        }, {
            type: 'portlet',
            title: '프로젝트 열람하기',
            columnIndex: 1,
            height: 550
        }, {
            type: 'portlet',
            title: '프로젝트 만들기',
            columnIndex: 0,
            height: 343
        }, {
            type: 'portlet',
            title: '프로젝트 참여하기',
            columnIndex: 1,
            height: 150
        }, {
            type: 'portlet',
            title: '완료된 프로젝트',
            columnIndex: 0,
            height: 150
        }]
    }]

});

var aa = Ext.create('Main');
Ext.onReady(function () {
    viewPort = Ext.create('Ext.container.Viewport', {
        layout: 'fit',
        items: [aa]
    });
    SYS_INIT();
    aa.items.items[0].items.items[0].items.items[0].add(grd_GOING)
    aa.items.items[0].items.items[2].items.items[0].add(grd_SELECT)
    aa.items.items[0].items.items[0].items.items[1].add(tbl_MAKE)
    aa.items.items[0].items.items[2].items.items[1].add(grd_JOIN)
    aa.items.items[0].items.items[0].items.items[2].add(grd_CLOSED)
})