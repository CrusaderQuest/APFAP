/// <reference path="../../Resource/Scripts/ext-all-debug.js" />
/// <reference path="../../Resource/Scripts/component.js" />
/// <reference path="../../Resource/Scripts/noncomponent.js" />
//

//View 단 정의 영역 시작
var pnl_proNM = ApPanel.create('Project Name');
Ext.define('systemArchi', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'E_DATE', type: 'date', dateFormat: 'Y-m-d' },
        { name: 'CHECK_UPLOAD', type: 'boolean' },
        { name: 'SUMMARY' }
    ]
});

//var gridData = Ext.create('Ext.data.ArrayStore', {
//    model: 'systemArchi',
//    data: [
//        ['2015-07-29', false, '이건 업로드가 안된거여']
//    ]
//});

var grd = ApGrid.create();
grd.addColumn('date', '날짜', 'E_DATE', 200);
grd.addColumn('check', '업로드 여부', 'CHECK_UPLOAD', 200);
grd.addColumn('text', 'Summary', 'SUMMARY', 730);
//grd.reconfigure(gridData);
//var pnl_in_pnl =ApPanel.create('button 들어갈 table panel')
//var tbl_button = ApTable.create(2);
//tbl_button.setTarget();
//var btn_insert = ApButton.create('insert');
//var btn_delete = ApButton.create('delete');
//tbl_button.setPosition(990, 0, null);
//pnl_in_pnl.full(tbl_button);


grd.setWidth('fit');

var pnl_sysArchi = ApPanel.create('System Architecture ');
var pnl_sys_imageView = ApPanel.create('image Viewer');
var tbl_image = ApTable.create(2);
//tbl_image.addCls('tableStyle_main');
tbl_image.updateLayout();
tbl_image.setTarget();
var btn_imageUp = ApButton.create('Image Upload');
var btn_imageDel = ApButton.create('Delete Image');
btn_imageUp.setMargin("0 0 0 900");
//btn_imageDel.setMargin("0 0 0 400");
btn_imageUp.setWidth(120);
btn_imageDel.setWidth(120);


var dbc_save;

var tbl_main = ApTable.create(1);
tbl_main.addCls('tableStyle_main');
tbl_main.updateLayout();
tbl_main.setTarget();
var btn_SAVE = ApButton.create('변경상태 저장');
btn_SAVE.setWidth(120);
var pnl_main = ApPanel.create('main');
ApEvent.onlaod = function () {
    pnl_proNM.full(grd);
    pnl_sysArchi.divideV(tbl_image,pnl_sys_imageView,tbl_image);
    pnl_main.divideV(pnl_proNM, pnl_sysArchi, pnl_proNM);
    pnl_proNM.setHeight(90);
    viewPanel.divideV(tbl_main, pnl_main, tbl_main);
    tbl_main.setHeight(34);
    tbl_image.setHeight(34);
    //tbl_image.setPosition(900, 0, 0);
    //tbl_image.setMargin(0, 0, 0, 400);

    getTable();

}


