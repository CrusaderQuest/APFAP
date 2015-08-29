/// <reference path="../../Resource/Scripts/ext-all-debug.js" />
/// <reference path="../../Resource/Scripts/component.js" />
/// <reference path="../../Resource/Scripts/noncomponent.js" />
//

//View 단 정의 영역 시작
var pnl_contentsH = ApPanel.create();
var pnl_contentsD = ApPanel.create();
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
var btn_change = ApButton.create("수정");
var btn_save = ApButton.create("저장");
//grid add column
var grd_a = ApGrid.create(true);
grd_a.addColumn('combo', '기능 중요도', ['FUNC_IMP',comboStore], 80);
grd_a.addColumn('combo', '카테고리', ['CATEGORY', comboStore2], 100);
grd_a.addColumn('text', '기능 명', 'FUNC_NM', 200);

//tbl_input
var tbl_input = ApTable.create(1);
tbl_input.setTarget();
var txt_nm = ApTextArea.create('기능 명');
var txta_summary = ApTextArea.create('개요');
var txta_blank = ApTextArea.create('비고');

//tbl_ad
var tbl_ad = ApTable.create();
tbl_ad.setTarget();
var btn_add = ApButton.create('추가');
var btn_del = ApButton.create('삭제');

ApEvent.onlaod = function () {

    grd_a.setDisabled(true);

    btn_save.setVisible(false);
    btn_change.setWidth(70);
    btn_save.setWidth(70);

    txt_nm.setWidth(200);
    txta_summary.setWidth(300);
    txta_summary.setWidth(500);

    pnl_contentsH.divideV(tbl_btn, grd_a);
    pnl_contentsD.divideV(tbl_input, tbl_ad);
    tbl_btn.setHeight(50);
    grd_a.setWidth(380);
    viewPanel.divideH(pnl_contentsH,pnl_contentsD);
    GRD_LOAD();
}
