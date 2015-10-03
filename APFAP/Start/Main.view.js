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
//tbl_login.setStyle('padding-top', '20px');
tbl_login.setStyle('padding-left', '10px');
var btn_messenger = ApButton.create('초대하기');
btn_messenger.setWidth(130);
var btn_context = ApButton.create('완료하기');
if (ApFn.isMaster() != true) {
    btn_context.setHidden(true);
}
btn_context.setWidth(130);
var cbo_formType = ApCombo.create('', 'test', 0);
cbo_formType.setWidth(130);
var pnl_progress = ApPanel.create();
pnl_progress.setLayout('vbox');
var progress = Ext.create('Ext.ProgressBar', {
    width: '100%',
    height: 30,
    flat:1
});
ds[0].getAt(0).data.ENDDATE
var nowD = new Date();
var startD = new Date(ds[0].getAt(0).data.STARTDATE);
var thenD = new Date(ds[0].getAt(0).data.ENDDATE);
var doDt = nowD.getTime() - startD.getTime();
doDt = Math.floor(doDt / (1000 * 60 * 60 * 24));

var leftDt = thenD.getTime() - nowD.getTime();
if (leftDt < 0) {
    leftDt = 0;
} else {
    leftDt = Math.floor(leftDt / (1000 * 60 * 60 * 24));
}
var per = thenD.getTime() / nowD.getTime()
var d_day = ApLabel.create("프로젝트를 시작한지" + doDt + " 일 째, 남은 기간 : D - " + leftDt + "일");
d_day.setStyle('padding-top', '10px');
var lbl_login = ApLabel.create(ds[1].getAt(0).data.USER_NM + ' 님 환영합니다.');
lbl_login.setStyle('padding-top', '5px');
lbl_login.setStyle('padding-bottom', '5px');
progress.setValue((doDt / (doDt + leftDt)));
pnl_progress.add(lbl_login);
pnl_progress.add(progress);
pnl_progress.add(d_day);
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
        title: '&nbsp정&nbsp&nbsp&nbsp의',
        layout: 'fit',
        cls: 'colorA',
        items:[tre_DEF]
    }, {
        title: '&nbsp분&nbsp&nbsp&nbsp석',
        layout: 'fit',
        cls: 'colorB',
        items: [tre_ANL]
    }, {
        title: '&nbsp설&nbsp&nbsp&nbsp계',
        layout: 'fit',
        cls: 'colorC',
        items: [tre_DES]
    }, {
        title: '&nbsp개&nbsp&nbsp&nbsp발',
        layout: 'fit',
        cls: 'colorD',
        items: [tre_DEV]
    }, {
        title: '&nbsp테스트',
        layout: 'fit',
        cls: 'colorE',
        items: [tre_TES]
    }, {
        title: '&nbsp평&nbsp&nbsp&nbsp가',
        cls: 'colorF',
        layout: 'fit',
        items: [tre_EVL]
    }, {
        title: '&nbsp공&nbsp&nbsp&nbsp통',
        cls: 'colorG',
        layout: 'fit',
        items: [tre_COM]
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
    headerPanelSub.divideH(pnl_progress, tbl_login, tbl_login);
    tbl_login.setWidth(165);
    mainPanel.divideH(menu, tab_main, menu);
    tab_main.addTab('메인').full({
        html: '<iframe src="Home.html?" width="100%" height="100%" frameborder="0"></iframe>'
    });
    menu.setWidth(230);
    homePanel.full();
    SYS_INIT();
    //TREE_LOAD();
    GET_CONTENT();
    pnl_Join.divideV(tbl_Join, grd_Join);
    tbl_Join.setHeight(35);
}