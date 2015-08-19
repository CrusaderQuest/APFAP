﻿/// <reference path="../../Resource/Scripts/ext-all-debug.js" />
/// <reference path="../../Resource/Scripts/component.js" />
/// <reference path="../../Resource/Scripts/noncomponent.js" />
//

//View 단 정의 영역 시작

//-----------------전역변수 시작-----------------------
var saveBtnState = 0;
var comboState;
var comboUser;
var deleteArray = Ext.create('Ext.data.ArrayStore', {
    fields: [{ name: 'TES_NO', type: 'int' }]
});
Ext.define('totalTestData', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'TES_NO', type: 'int' },
        { name: 'TES_DT', type: 'date', dateFormat: 'Y-m-d' },
        { name: 'SUMMARY' },
        { name: 'CONTENT' },
        { name: 'STATE_NM' },
        { name: 'END_DT', type: 'date', dateFormat: 'Y-m-d' },
        { name: 'USER_NM' }
    ]
});
var grdData = Ext.create('Ext.data.ArrayStore', {
    model: 'totalTestData'
});
var grd = ApGrid.create(true);
//-----------------전역변수 끝 ------------------------
//-----------------컴포넌트 시작-----------------------
var pnl_top = ApPanel.create("top field");
var pnl_content = ApPanel.create("contents field");

var tbl_top = ApTable.create(3);
tbl_top.setTarget();

var pnl_title = ApLabel.create("테스트 진척도");
var pnl_summary = ApLabel.create("개발부 통합테스트에 대한 내역을 관리할 수 있습니다.");
var btn_save = ApButton.create("수정");


var pnl_btn = ApPanel.create("버튼들 들어갈 패널");
var tbl_btn = ApTable.create(2);
tbl_btn.setTarget();
var btn_insert = ApButton.create("Add");
var btn_delete = ApButton.create("Delete");

var pnl_grid = ApPanel.create("이곳에 그리드가 추가될 예정");
//---------------------컴포넌트 끝-------------------


ApEvent.onlaod = function () {
    viewPanel.divideV(pnl_top, pnl_content);
    pnl_top.setHeight(100);

    pnl_top.full(tbl_top);
    pnl_title.setWidth(400);

    pnl_content.divideV(pnl_btn, pnl_grid);
    pnl_btn.full(tbl_btn);
    tbl_btn.setPosition(1000, 0, null);

    pnl_grid.full(grd);
    pnl_btn.setHeight(100);

    dbUserLoad();
    dbStateLoad();

    grd.addColumn('date', '테스트 날짜', 'TES_DT', 120);
    grd.addColumn('text', '요약', 'SUMMARY', 200);
    grd.addColumn('text', '상세 내용', 'CONTENT', 700);
    grd.addColumn('combo', '상태', ['STATE_NM', comboState], 120);
    grd.addColumn('date', '완료 날짜', 'END_DT', 120);
    grd.addColumn('combo', '담당자', ['USER_NM', comboUser], 120);

    dbLoad();

    pnl_content.setDisabled(true);
}