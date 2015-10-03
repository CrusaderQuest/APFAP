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
}); //유사도
var comboStore2 = Ext.create('Ext.data.ArrayStore', {
    fields: ['SHOWVALUE', 'HIDEVALUE'],
    data: [
        ['이미지', 'Image'],
        ['문서', 'DOC'],
        ['기타', 'ETC']
    ]
}); //파일분류

var gridData;   //기본 gridstore
var deleteArray = []; 
var up_key = 1;
var Dindex; //포커스에 이용

//db user
var prU = DBParams.create('sp_AnlFormA01', 'USER_INFO');
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
grd_a.addColumn('combo', '유사도', ['REQ_SIMILARITY', comboStore], 60);
grd_a.addColumn('text', 'UI명', 'UI_NM', 200);
grd_a.addColumn('combo', '파일 분류', ['FILE_CATEGORY', comboStore2], 80);
grd_a.addColumn('date', '등록일', 'E_DT', 100);
grd_a.addColumn('combo', '등록자', ['E_USER', dsu[0]], 0);

//input Field
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

    grd_a.setWidth(465);
    dt_EDATE.setWidth(110);

    GRD_LOAD();
}
