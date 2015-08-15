/// <reference path="../Resource/Scripts/ext-all-debug.js" />
/// <reference path="../Resource/Scripts/component.js" />
/// <reference path="../Resource/Scripts/noncomponent.js" />

var headerPanel = ApPanel.create();
var tbl_Logo = ApTable.create(1);
tbl_Logo.setTarget();
var CmLabel_usericon = {
    xtype: 'image',
    src: 'http://placehold.it/100x100',
    height: 100, // Specifying height/width ensures correct layout
    width: 100
    //listeners: {
    //    render: function(c) {
    //        c.getEl().on('click', function(e) {
    //            alert('User clicked image');
    //        }, c);
    //    }
    //}
}
tbl_Logo.add(CmLabel_usericon);
var headerPanelDetail = ApPanel.create();

var tbl_header = ApTable.create(1);
tbl_header.setTarget();

var lbl_TITLE = ApLabel.create('A Project For All Project');
lbl_TITLE.setStyle('color', 'red')
lbl_TITLE.setStyle('font-Weight', 'bold');
lbl_TITLE.setStyle('font-size', '30px');
lbl_TITLE.setStyle('padding', '20px')
var txt_TEAMNAME = ApText.create('팀명', 'tset', 30);
txt_TEAMNAME.setStyle('padding-left', '20px')
txt_TEAMNAME.setReadOnly(true);
tbl_header.cellShare(2);
//var cbo_imp = ApCombo.create("중요도");
var mainPanel = ApPanel.create();

var headerPanelSub = ApPanel.create();

var tbl_login = ApTable.create(1);
tbl_login.setTarget();
tbl_login.setStyle('padding-top', '20px');
tbl_login.setStyle('padding-left', '10px');
var lbl_login = ApLabel.create('거니니 님 환영합니다.');
var lbl_Member = ApLabel.create('접속자 : 지니니, 으니니, 주니니.');

var tbl_content = ApTable.create(1);
tbl_content.setTarget();
var btn_messenger = ApButton.create('메신져');
var btn_context = ApButton.create('공지사항');

var tre_COM = ApTree.create('');
var tre_DEF = ApTree.create('');
var tre_ANL = ApTree.create('');
var tre_DES = ApTree.create('');
var tre_DEV = ApTree.create('');
var tre_EVL = ApTree.create('');
var tre_TES = ApTree.create('');

var menu = Ext.create('Ext.panel.Panel', {
    title: 'Accordion Layout',
    layout: 'accordion',
    defaults: {
        // applied to each contained panel
        bodyStyle: 'padding:15px'
    },
    layoutConfig: {
        // layout-specific configs go here
        titleCollapse: false,
        animate: true,
        activeOnTop: true
    },
    items: [{
        title: '공통',
        layout: 'fit',
        items: [tre_COM]
    },{
        title: '정의',
        layout: 'fit',
        items:[tre_DEF]
    }, {
        title: '분석',
        layout: 'fit',
        items: [tre_ANL]
    }, {
        title: '설계',
        layout: 'fit',
        items: [tre_DES]
    }, {
        title: '개발',
        layout: 'fit',
        items: [tre_DEV]
    }, {
        title: '테스트',
        layout: 'fit',
        items: [tre_TES]
    }, {
        title: '평가',
        layout: 'fit',
        items: [tre_EVL]
    }]
});
var grd_form = ApGrid.create();
grd_form.setLockColumns('CODE_D_KEY', 'CODE_D_NM');
grd_form.addColumn('text', '폼코드', 'CODE_D_KEY', 200);
grd_form.addColumn('text', '타이틀', 'CODE_D_NM', 200);

var tab_main = ApTab.create();


ApEvent.onlaod = function () {
    viewPanel.divideV(headerPanel, mainPanel, headerPanel);
    headerPanel.setHeight(100);
    headerPanel.divideH(tbl_Logo, headerPanelDetail);
    headerPanelDetail.divideH(tbl_header, headerPanelSub, headerPanelSub);
    tbl_header.setWidth(600);
    headerPanelSub.divideH(tbl_login, tbl_content);
    tbl_Logo.setWidth(100);
    mainPanel.divideH(menu, tab_main, menu);
    tab_main.addTab('메인').full(grd_form);
    menu.setWidth(200);
    SYS_INIT();
    TREE_LOAD();
    GET_CONTENT();
}