/// <reference path="../../Resource/Scripts/ext-all-debug.js" />
/// <reference path="../../Resource/Scripts/component.js" />
/// <reference path="../../Resource/Scripts/noncomponent.js" />
/// <reference path="AnlFormA01.app.js" />

//View 단 정의 영역 시작
var pnl_contents = ApPanel.create();
var pnl_main = ApPanel.create();
var pnl_grid = ApPanel.create();
//data-type
var comboStore = Ext.create('Ext.data.ArrayStore', {
    fields: ['SHOWVALUE', 'HIDEVALUE'],
    data: [
        ['상', '1'],
        ['중', '2'],
        ['하', '3']
    ]
});
var comboStore2 = Ext.create('Ext.data.ArrayStore', {
    fields: ['SHOWVALUE', 'HIDEVALUE'],
    data: [
        ['이미지', 'Image'],
        ['문서', 'DOC'],
        ['기타', 'EXC']
    ]
});
var gridData;
var deleteArray = [];

//db user
var prU = DBParams.create('sp_AnlFormA01', 'USER_INFO');
var dsu = DBconnect.runProcedure(prU);

// tbl_main
var tbl_main = ApTable.create(2);
tbl_main.addCls('tableStyle_main');
tbl_main.updateLayout();
tbl_main.setTarget();
var btn_save = ApButton.create("변경상태 저장");
var lb_main = ApLabel.create("UI 분석 ---- 프로그램의 UI를 분석한 결과를 업로드 해주세요.");

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

//grid add columnvar grd_a = ApGrid.create(true, true);
var grd_a = ApGrid.create(false, true);
grd_a.addColumn('combo', '유사도', ['REQ_SIMILARITY', comboStore], 60);
grd_a.addColumn('text', 'UI명', 'UI_NM', 200);
grd_a.addColumn('combo', '파일 분류',['FILE_CATEGORY', comboStore2], 80);
grd_a.addColumn('date', '등록일', 'S_DT', 100);

var tbl_input = ApTable.create(1);
tbl_input.setTarget();
var cbo_req = ApCombo.create('유사도');
cbo_req.bindStore(comboStore);
cbo_req.setWidth(200);
var cbo_fcagtegory = ApCombo.create('파일 분류');
cbo_fcagtegory.bindStore(comboStore2);
cbo_fcagtegory.setWidth(200);
var txt_nm = ApText.create('UI명');
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

    pnl_contents.divideV(tbl_H, pnl_grid, tbl_H);
    pnl_grid.divideH(grd_a, tbl_input, grd_a);
    viewPanel.divideV(tbl_main, pnl_contents, tbl_main);

    grd_a.setWidth(470);
    btn_save.setWidth(120);
    dt_EDATE.setWidth(110);

    tbl_H.setHeight(30);
    tbl_main.setHeight(35);
    GRD_LOAD();
}
