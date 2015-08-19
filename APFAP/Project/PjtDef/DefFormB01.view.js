/// <reference path="../../Resource/Scripts/ext-all-debug.js" />
/// <reference path="../../Resource/Scripts/component.js" />
/// <reference path="../../Resource/Scripts/noncomponent.js" />
//

//View 단 정의 영역 시작
var pnl_contents = ApPanel.create("REQ_DOC");

//data-type
var comboStore = Ext.create('Ext.data.ArrayStore', {
    fields: ['SHOWDATA', 'HIDEDATA'],
    data: [
        ['필수', 'MUST'],
        ['선택', 'SELECT'],
        ['요구사항', 'REQ']
    ]
});
var comboStore2 = Ext.create('Ext.data.ArrayStore', {
    fields: ['SHOWDATA', 'HIDEDATA'],
    data: [
        ['DB', 'DATABASE'],
        ['UI', 'INTERFACE'],
        ['통신', 'NETWORK'],
        ['기타', 'ETC']
    ]
});
var gridData;
var deleteArray = [];
//btn
var tbl_btn = ApTable.create();
tbl_btn.setTarget();
var btn_del = ApButton.create("그리드 삭제");
btn_del.setMargin(20);
var btn_add = ApButton.create("그리드 추가");
tbl_btn.setHeight(100);
var btn_change = ApButton.create("수정");
var btn_save = ApButton.create("저장");
//grid add column
var grd_a = ApGrid.create(true);
grd_a.addColumn('combo', '기능 중요도', ['FUNC_IMP',comboStore], 80);
grd_a.addColumn('combo', '카테고리', ['CATEGORY', comboStore2], 100);
grd_a.addColumn('text', '기능 명', 'FUNC_NM', 300);
grd_a.addColumn('text', '개요', 'SUMMARY', 300);
grd_a.addColumn('text', '비고', 'BLANK', 300);

ApEvent.onlaod = function () {

    btn_add.setDisabled(true);
    btn_del.setDisabled(true);
    grd_a.setDisabled(true);

    btn_save.setVisible(false);
    btn_change.setWidth(70);
    btn_save.setWidth(70);

    pnl_contents.divideV(tbl_btn, grd_a);
    tbl_btn.setHeight(50);
    viewPanel.full(pnl_contents);
    GRD_LOAD();
}
