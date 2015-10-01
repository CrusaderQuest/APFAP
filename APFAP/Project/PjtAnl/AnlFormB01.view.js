/// <reference path="../../Resource/Scripts/ext-all-debug.js" />
/// <reference path="../../Resource/Scripts/component.js" />
/// <reference path="../../Resource/Scripts/noncomponent.js" />
/// <reference path="AnlFormB01.app.js" />

//View 단 정의 영역 시작
var pnl_contents = ApPanel.create();
var pnl_main = ApPanel.create();
var pnl_grid = ApPanel.create();

//data-type
var comboStore = Ext.create('Ext.data.ArrayStore', {
    fields: ['SHOWVALUE', 'HIDEVALUE'],
    data: [  //업무영역
        ['신규기능', 'new'],
        ['기능수정', 'change'],
        ['기능삭제', 'del'],
        ['기타', 'etc']
    ]   
}); 
var comboStore1 = Ext.create('Ext.data.ArrayStore', {
    fields: ['SHOWVALUE', 'HIDEVALUE'],
    data: [  //중요도
        ['상', 'H'],
        ['중', 'M'],
        ['하', 'L']
    ]    
});
var comboStore2 = Ext.create('Ext.data.ArrayStore', {
    fields: ['SHOWVALUE', 'HIDEVALUE'],
    data: [  //난이도
        ['★', 'a'],
        ['★★', 'b'],
        ['★★★', 'c'],
        ['★★★★', 'd'],
        ['★★★★★', 'e']
    ]   
});

var gridData;   //기본 gridstore
var deleteArray = [];
var up_key = 1;

//db user
var prU = DBParams.create('sp_AnlFormB01', 'USER_INFO');
var dsu = DBconnect.runProcedure(prU);

//search
var tbl_H = ApTable.create(1);
tbl_H.setTarget();
tbl_H.setStyleSearch();
var dt_SDATE = ApDate.create('조회일자');
var lbl_a = ApLabel.create('~');
var dt_EDATE = ApDate.create('');
dt_EDATE.setWidth(110);
var btn_search = ApButton.create('조회');
tbl_H.cellShare(4);
dt_EDATE.setToday();    //현재 날짜로

//grid add column
var grd_a = ApGrid.create(false, true);
grd_a.addColumn('combo', '업무영역', ['CATEGORY', comboStore], 80);
grd_a.addColumn('combo', '중요도', ['IMPORTANT', comboStore1], 70);
grd_a.addColumn('text', '요구사항 명', 'REQ_NM', 200);
grd_a.addColumn('date', '등록일', 'E_DT', 100);
grd_a.addColumn('combo', '난이도', ['LEV', comboStore2], 100);

//input Field
var tbl_input = ApTable.create(1);
tbl_input.setTarget();
var cbo_category = ApCombo.create('업무영역');
cbo_category.bindStore(comboStore);
cbo_category.setWidth(200);
var cbo_important = ApCombo.create('중요도');
cbo_important.bindStore(comboStore1);
cbo_important.setWidth(200);
var cbo_lev = ApCombo.create('난이도');
cbo_lev.bindStore(comboStore2);
cbo_lev.setWidth(200);
var txt_nm = ApText.create('요구사항 명');
txt_nm.setWidth(800);
var txta_summary = ApTextArea.create('상세 내용');
txta_summary.setWidth(800);
txta_summary.setHeight(200);
var up_doc = ApUpload.create("파일 업로드", 'aa');

var cbo_NOTICE_USER_HH = ApCombo.create('등록자', 'NOTICE_USER');
cbo_NOTICE_USER_HH.bindStore(dsu[0]);
var dt_update = ApDate.create();
dt_update.setToday();
var btn_update = ApButton.create('등록');
btn_update.setMargin('0 10 0 20')   //사이 간격 조절
tbl_input.cellShare(3);

//ApEvent
ApEvent.onlaod = function () {

    //set Panel & size
    viewPanel.full(pnl_contents);
    pnl_contents.divideV(tbl_H, pnl_grid, tbl_H);
    tbl_H.setHeight(30);
    pnl_grid.divideH(grd_a, tbl_input, grd_a);

    grd_a.setWidth(470);
    dt_EDATE.setWidth(110);

    GRD_LOAD();
}
