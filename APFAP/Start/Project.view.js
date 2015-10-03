/// <reference path="../Resource/Scripts/ext-all-debug.js" />
/// <reference path="../Resource/Scripts/component.js" />
/// <reference path="../Resource/Scripts/noncomponent.js" />

//프로젝트 등록
//프로젝트 선택

//진행중 프로젝트
var grd_GOING = ApGrid.create();
grd_GOING.addColumn('text', '성향', 'P_CATEGORY', 50);
grd_GOING.addColumn('text', '형태', 'P_TYPE', 100);
grd_GOING.addColumn('text', '제목', 'TITLE', 200);
grd_GOING.addColumn('text', '설명', 'SUBTITLE', 600);
grd_GOING.addColumn('text', '기한', 'ENDDATE', 100);
grd_GOING.addColumn('hide', '', 'PROJECT_KEY');
grd_GOING.addColumn('hide', '', 'MASTER_TF');
grd_GOING.setLockColumns('TITLE', 'SUBTITLE', 'P_CATEGORY', 'P_TYPE');

//프로젝트 참여하기
var grd_JOIN = ApGrid.create();
grd_JOIN.addColumn('text', '성향', 'P_CATEGORY', 50);
grd_JOIN.addColumn('text', '형태', 'P_TYPE', 100);
grd_JOIN.addColumn('text', '제목', 'TITLE', 200);
grd_JOIN.addColumn('text', '설명', 'SUBTITLE', 600);
grd_JOIN.addColumn('text', '기한', 'ENDDATE', 100);
grd_JOIN.addColumn('hide', '', 'PROJECT_KEY');
grd_JOIN.setLockColumns('TITLE', 'SUBTITLE', 'P_CATEGORY', 'P_TYPE');

//프로젝트 열람하기
var grd_SELECT = ApGrid.create();
grd_SELECT.addColumn('text', '성향', 'P_CATEGORY', 50);
grd_SELECT.addColumn('text', '형태', 'P_TYPE', 100);
grd_SELECT.addColumn('text', '제목', 'TITLE', 200);
grd_SELECT.addColumn('text', '설명', 'SUBTITLE', 600);
grd_SELECT.addColumn('text', '기한', 'ENDDATE', 100);
grd_SELECT.addColumn('hide', '', 'PROJECT_KEY');
grd_SELECT.setLockColumns('TITLE', 'SUBTITLE', 'P_CATEGORY', 'P_TYPE');

//완료된 프로젝트
var grd_CLOSED = ApGrid.create();
grd_CLOSED.addColumn('text', '성향', 'P_CATEGORY', 50);
grd_CLOSED.addColumn('text', '형태', 'P_TYPE', 100);
grd_CLOSED.addColumn('text', '제목', 'TITLE', 200);
grd_CLOSED.addColumn('text', '설명', 'SUBTITLE', 600);
grd_CLOSED.addColumn('text', '기한', 'ENDDATE', 100);
grd_CLOSED.addColumn('hide', '', 'PROJECT_KEY');
grd_CLOSED.addColumn('hide', '', 'MASTER_TF');
grd_CLOSED.setLockColumns('TITLE', 'SUBTITLE', 'P_CATEGORY', 'P_TYPE');

//프로젝트 만들기
var tbl_MAKE = ApTable.create(1);
tbl_MAKE.setTarget();
//input area
var txt_TITLE = ApText.create('제목');
txt_TITLE.setWidth(410);
var dt_END = ApDate.create('기한', '', 60);
dt_END.setWidth(185);
dt_END.setToday();
tbl_MAKE.cellShare(2);  //제목, 기한 나란하게 2개
var txa_SUBTITLE = ApTextArea.create('설명');
txa_SUBTITLE.setWidth(600);
var cbo_TYPE_1 = ApCombo.create('성향', '');
var cbo_TYPE_2 = ApCombo.create('형태', '');
var txt_TEAMNAME = ApText.create('팀명');
txt_TEAMNAME.setWidth(230);
tbl_MAKE.cellShare(3);
//이미지 
var upl_TEAMIMG = ApUpload.create('대표 이미지');
var img_TEAMIMG = ApImg.create();
img_TEAMIMG.setSize(100, 100);

var btn_CREATE = ApButton.create('만들기');

//dashboard 만들기 (진행중인 프로젝트, 프로젝트 참여하기,만들기,열람하기, 완료된 프로젝트)
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
        //columnWidths: [
		//    0.50,
		//    0.50
        //],
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
            //columnIndex: 0,
            height: 200
        }, {
            type: 'portlet',
            title: '프로젝트 참여하기',
            //columnIndex: 1,
            height: 150
        }, {
            type: 'portlet',
            title: '프로젝트 만들기',
            //columnIndex: 0,
            height: 343
        }, {
            type: 'portlet',
            title: '프로젝트 열람하기',
            //columnIndex: 1,
            height: 550
        }, {
            type: 'portlet',
            title: '완료된 프로젝트',
            //columnIndex: 0,
            height: 150
        }]
    }]

});

var aa = Ext.create('Main');
Ext.onReady(function () {
    //main 틀 aa에 각각 순서에 맞춰서 add
    viewPort = Ext.create('Ext.container.Viewport', {
        layout: 'fit',
        items: [aa]
    });
    SYS_INIT();
    aa.items.items[0].items.items[0].items.items[0].add(grd_GOING);
    aa.items.items[0].items.items[0].items.items[1].add(grd_JOIN);
    aa.items.items[0].items.items[0].items.items[2].add(tbl_MAKE);
    aa.items.items[0].items.items[0].items.items[3].add(grd_SELECT);
    aa.items.items[0].items.items[0].items.items[4].add(grd_CLOSED);
    aa.items.items[0].items.items[0].items.items[2].collapse();
    aa.items.items[0].items.items[0].items.items[3].collapse();
    aa.items.items[0].items.items[0].items.items[4].collapse();
})