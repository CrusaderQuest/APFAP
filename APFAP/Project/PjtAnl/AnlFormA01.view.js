/// <reference path="../../Resource/Scripts/ext-all-debug.js" />
/// <reference path="../../Resource/Scripts/component.js" />
/// <reference path="../../Resource/Scripts/noncomponent.js" />
/// <reference path="AnlFormA01.app.js" />

//View 단 정의 영역 시작
var pnl_contents = ApPanel.create("UI_ANLYSIS");
var deleteArray = [];
//data-type
var comboStore = Ext.create('Ext.data.ArrayStore', {
    fields: ['SHOWDATA','HIDEDATA'],
    data: [
        ['H', 'HIGH'],
        ['M', 'MIDDLE'],
        ['L', 'LOW']
    ]
});
var gridData;

//btn
var tbl_btn = ApTable.create();
tbl_btn.setTarget();
var btn_change = ApButton.create("수정");
var btn_save = ApButton.create("저장");
//grid add column
var grd_a = ApGrid.create(true, true);
grd_a.addColumn('text', 'UI명', 'UI_NM', 200);
grd_a.addColumn('text', '개요', 'SUMMARY', 300);
grd_a.addColumn('combo', '유사도', ['REQ_SIMILARITY', comboStore],200);
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
