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

//pnl_grid

var tbl_grid = ApTable.create();
tbl_grid.setTarget();
var btn_add = ApButton.create("그리드 추가");
var btn_del = ApButton.create("그리드 삭제");
var btn_save = ApButton.create("데이터베이스에 저장");
var grd_a = ApGrid.create(true);
grd_a.addColumn('text', 'UI명', 'UI_NM', 200);
grd_a.addColumn('text', '개요', 'SUMMARY', 300);
grd_a.addColumn('combo', '유사도', ['REQ_SIMILARITY', comboStore],200);
grd_a.addColumn('text', '비고', 'BLANK', 300);

//grd_a.reconfigure(gridData);
ApEvent.onlaod = function () {
    pnl_contents.divideV(grd_a, tbl_grid);
    viewPanel.full(pnl_contents);

    GRD_LOAD();
}
