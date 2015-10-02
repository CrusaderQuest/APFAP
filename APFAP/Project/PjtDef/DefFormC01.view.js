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
    data: [  //문서타입
        ['PPT 파일', 'ppt'],
        ['한글 문서', 'hwp'],
        ['PDA 파일', 'pda'],
        ['사진 파일', 'image'],
        ['기타', 'ext']
    ]
});
var gridData;   //기본 gridstore
var deleteArray = [];
var up_key = 1;
var Dindex; //포커스에 이용

//db user
var prU = DBParams.create('sp_DefFormC01', 'USER_INFO');
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
grd_a.addColumn('combo', '문서 타입', ['CATEGORY', comboStore], 100);
grd_a.addColumn('text', '문서 명', 'DOC_NM', 200);
grd_a.addColumn('date', '등록일', 'E_DT', 110);
grd_a.addColumn('combo', '등록자', ['E_USER', dsu[0]], 110);

//input Field
var tbl_input = ApTable.create(1);
tbl_input.setTarget();
var cbo_category = ApCombo.create('문서 타입');
cbo_category.bindStore(comboStore);
cbo_category.setWidth(200);
var txt_nm = ApText.create('문서 명');
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

    grd_a.setWidth(435);
    dt_EDATE.setWidth(110);

    GRD_LOAD();
}
