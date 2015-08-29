/// <reference path="../../Resource/Scripts/ext-all-debug.js" />
/// <reference path="../../Resource/Scripts/component.js" />
/// <reference path="../../Resource/Scripts/noncomponent.js" />
/// <reference path="AnlFormB01.app.js" />

//View 단 정의 영역 시작
var pnl_contents = ApPanel.create("UI_ANLYSIS");

//data-type
var comboStore = Ext.create('Ext.data.ArrayStore', {
    fields: ['SHOWDATA', 'HIDEDATA'],
    data: [
        ['소프트웨어', 'SOFTWARE'],
        ['하드웨어', 'HARDWARE'],
        ['인력', 'HUMAN'],
        ['기타', 'ETC']
    ]
});
var gridData;
var deleteArray = [];
//pnl_grid
var tbl_btn = ApTable.create();
tbl_btn.setTarget();
var btn_change = ApButton.create("수정");
var btn_save = ApButton.create("저장");

var grd_a = ApGrid.create(true,true);
grd_a.addColumn('combo', '분류', ['CATEGORY', comboStore], 200);
grd_a.addColumn('text', '명칭', 'DEV_NM', 300);
grd_a.addColumn('text', '용도', 'DEV_USE', 400);
grd_a.addColumn('text', '비고', 'BLANK', 300);

//grd_a.reconfigure(gridData);
ApEvent.onlaod = function () {

    grd_a.setDisabled(true);

    btn_save.setVisible(false);
    btn_change.setWidth(70);
    btn_save.setWidth(70);

    pnl_contents.divideV(tbl_btn, grd_a);
    tbl_btn.setHeight(50);
    viewPanel.full(pnl_contents);
    GRD_LOAD();
}
