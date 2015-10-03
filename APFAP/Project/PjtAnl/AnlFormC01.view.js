/// <reference path="../../Resource/Scripts/ext-all-debug.js" />
/// <reference path="../../Resource/Scripts/component.js" />
/// <reference path="../../Resource/Scripts/noncomponent.js" />
/// <reference path="AnlFormC01.app.js" />

//View 단 정의 영역 시작
var pnl_contents = ApPanel.create();

//data-type
var comboStore = Ext.create('Ext.data.ArrayStore', {
    fields: ['SHOWVALUE', 'HIDEVALUE'],
    data: [   //분류
        ['소프트웨어', 'SOFT'],
        ['하드웨어', 'HARD'],
        ['인력', 'HUMAN'],
        ['기타', 'ETC']
    ]
});

var gridData;   //기본 gridstore
var deleteArray = [];
var Dindex; //포커스에 이용

//db user
var prU = DBParams.create('sp_AnlFormC01', 'USER_INFO');
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
grd_a.addColumn('combo', '분류', ['CATEGORY', comboStore], 110);
grd_a.addColumn('text', '명칭', 'DEV_NM', 300);
grd_a.addColumn('text', '용도', 'DEV_USE', 500);
grd_a.addColumn('date', '등록일', 'E_DT', 120);
grd_a.addColumn('combo', '등록자', ['E_USER', dsu[0]], 100);

//ApEvent
ApEvent.onlaod = function () {

    //set Panel & size
    pnl_contents.divideV(tbl_H, grd_a, tbl_H);
    tbl_H.setHeight(30);
    viewPanel.full(pnl_contents);
    dt_EDATE.setWidth(110);

    GRD_LOAD();
}
