/// <reference path="../Resource/Scripts/ext-all-debug.js" />
/// <reference path="../Resource/Scripts/component.js" />
/// <reference path="../Resource/Scripts/noncomponent.js" />

var pr = DBParams.create('sp_COMMAIN', 'SEARCH_PROJECT_BASE');
//데이터셋
var ds = DBconnect.runProcedure(pr);

var headerPanel = ApPanel.create();
var tbl_Logo = ApTable.create(1);
tbl_Logo.setTarget();
var img = ApImg.create();
img.setFileKey(ds[0].getAt(0).data.P_IMAGE);
img.setSize(100, 100)
tbl_Logo.add(img);
var headerPanelDetail = ApPanel.create();

var tbl_header = ApTable.create(1);
tbl_header.setTarget();

var lbl_TITLE = ApLabel.create(ds[0].getAt(0).data.TITLE);

//lbl_TITLE.setStyle('color', 'red')
lbl_TITLE.setStyle('font-Weight', 'bold');
lbl_TITLE.setStyle('font-size', '20px');
lbl_TITLE.setStyle('padding', '20px')
var txt_TEAMNAME = ApText.create('팀명', 'tset', 30);
txt_TEAMNAME.setStyle('padding-left', '20px')
txt_TEAMNAME.setReadOnly(true);
txt_TEAMNAME.setValue(ds[0].getAt(0).data.P_TEAM);
tbl_header.cellShare(2);
//var cbo_imp = ApCombo.create("중요도");
var mainPanel = ApPanel.create();

var headerPanelSub = ApPanel.create();

var tbl_login = ApTable.create(1);
tbl_login.setTarget();
tbl_login.setStyle('padding-top', '20px');
tbl_login.setStyle('padding-left', '10px');
var lbl_login = ApLabel.create(ds[1].getAt(0).data.USER_NM + ' 님 환영합니다.');

var tbl_content = ApTable.create(1);
tbl_content.setTarget();
var btn_messenger = ApButton.create('초대하기');
var btn_context = ApButton.create('공지사항');
var cbo_formType = ApCombo.create('', 'test', 0);

var tre_COM = ApTree.create('');
var tre_DEF = ApTree.create('');
var tre_ANL = ApTree.create('');
var tre_DES = ApTree.create('');
var tre_DEV = ApTree.create('');
var tre_EVL = ApTree.create('');
var tre_TES = ApTree.create('');

var menu = Ext.create('Ext.panel.Panel', {
    layout: 'accordion',
    defaults: {
        // applied to each contained panel
        bodyStyle: 'padding:5px'
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
//공지사항
//미팅
var homePanel = ApPanel.create();

var pnl_tmp_1 = ApPanel.create();
var pnl_tmp_2 = ApPanel.create();

var tab_main = ApTab.create();

var pnl_Join = ApPanel.create();

var tbl_Join = ApTable.create(1);
tbl_Join.setTarget();
var txt_search_Join = ApText.create('검색', 'aa', 30);
txt_search_Join.setWidth(200);
var btn_search_Join = ApButton.create('찾기');
btn_search_Join.setWidth(70);
tbl_Join.cellShare(2);

var grd_Join = ApGrid.create();
grd_Join.addColumn('text', '유저', 'USER_NM', 280);
grd_Join.addColumn('hide', 'USER_KEY');
grd_Join.setLockColumns('USER_NM');

//초대 상자
var win_Join = Ext.create('Ext.Window', {
    title: '초대하기',
    width: 320,
    height: 400,
    //x: 450,
    //y: 200,
    closeAction: 'hide',
    modal:true,
    headerPosition: 'top',
    layout: 'fit',
    items:[pnl_Join]
})

ApEvent.onlaod = function () {
    viewPanel.divideV(headerPanel, mainPanel, headerPanel);
    headerPanel.setHeight(100);
    headerPanel.divideH(tbl_Logo, headerPanelDetail);
    tbl_Logo.setWidth(110);
    headerPanelDetail.divideH(tbl_header, headerPanelSub, headerPanelSub);
    tbl_header.setWidth(600);
    headerPanelSub.divideH(tbl_login, tbl_content);
    mainPanel.divideH(menu, tab_main, menu);
    tab_main.addTab('메인').full({
        html: '<iframe src="Home.html?" width="100%" height="100%" frameborder="0"></iframe>'
    });
    menu.setWidth(200);
    homePanel.full();
    SYS_INIT();
    //TREE_LOAD();
    GET_CONTENT();
    pnl_Join.divideV(tbl_Join, grd_Join);
    tbl_Join.setHeight(35);
}