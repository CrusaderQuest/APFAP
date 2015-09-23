/// <reference path="../../Resource/Scripts/ext-all-debug.js" />
/// <reference path="../../Resource/Scripts/component.js" />
/// <reference path="../../Resource/Scripts/noncomponent.js" />
//

//View 단 정의 영역 시작
var pnl_contents = ApPanel.create();
var pnl_main = ApPanel.create();
var pnl_grid = ApPanel.create();
//data-type
var comboStore = Ext.create('Ext.data.ArrayStore', {
    fields: ['SHOWVALUE', 'HIDEVALUE'],
    data: [
        ['필수사항', '필수사항'],
        ['선택사항', '선택사항'],
        ['요구사항', '요구사항']
    ]
});
var comboStore2 = Ext.create('Ext.data.ArrayStore', {
    fields: ['SHOWVALUE', 'HIDEVALUE'],
    data: [
        ['DB', 'DB'],
        ['UI', 'UI'],
        ['통신', '통신'],
        ['기타', '기타']
    ]
});
var gridData;

var deleteArray = [];

//db user
var prU = DBParams.create('sp_DefFormB01', 'USER_INFO');
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
dt_EDATE.setToday();

//grid add column
var grd_a = ApGrid.create(false, true);
grd_a.addColumn('combo', '기능 중요도', ['FUNC_IMP', comboStore], 100);
grd_a.addColumn('combo', '기능 분류', ['CATEGORY', comboStore2], 100);
grd_a.addColumn('text', '기능 명', 'FUNC_NM', 200);
grd_a.addColumn('date', '등록일', 'E_DT', 110);
grd_a.addColumn('combo', '등록자', ['E_USER', dsu[0]], 80);

var tbl_input = ApTable.create(1);
tbl_input.setTarget();
var cbo_imp = ApCombo.create('중요도');
cbo_imp.bindStore(comboStore);
cbo_imp.setWidth(200);
var cbo_category = ApCombo.create('기능 분류');
cbo_category.bindStore(comboStore2);
cbo_category.setWidth(200);
var txt_nm = ApText.create('기능 명');
txt_nm.setWidth(800);
var txta_summary = ApTextArea.create('상세 내용');
txta_summary.setWidth(800);
txta_summary.setHeight(200);

var cbo_NOTICE_USER_HH = ApCombo.create('등록자', 'NOTICE_USER');
cbo_NOTICE_USER_HH.bindStore(dsu[0]);
var dt_update = ApDate.create();
dt_update.setToday();
var btn_update = ApButton.create('등록');
btn_update.setMargin('0 10 0 20')
tbl_input.cellShare(3);

ApEvent.onlaod = function () {


    viewPanel.full(pnl_contents);
    pnl_contents.divideV(tbl_H, pnl_grid, tbl_H);
    tbl_H.setHeight(30);
    pnl_grid.divideH(grd_a, tbl_input, grd_a);

    grd_a.setWidth(530);
    dt_EDATE.setWidth(110);

    GRD_LOAD();
}
