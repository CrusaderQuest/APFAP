/// <reference path="../../Resource/Scripts/ext-all-debug.js" />
/// <reference path="../../Resource/Scripts/component.js" />
/// <reference path="../../Resource/Scripts/noncomponent.js" />
//

//View 단 정의 영역 시작
var pnl_proNM = ApPanel.create('Project Name');

var grd = ApGrid.create();
grd.addColumn('date', '날짜', 'E_DT', 200);
grd.addColumn('check', '업로드 여부', 'CHECK_UPLOAD', 200);
grd.addColumn('text', 'Summary', 'SUMMARY', 730);


grd.setWidth('fit');
////////////////////////////////////////////


var pnl_sysArchi = ApPanel.create('System Architecture ');

var pnl_sys_imageView = ApPanel.create('image Viewer');

var tbl_image = ApTable.create(1);
tbl_image.setTarget();
var upload = ApUpload.create('test', 'aa');
var img = ApImg.create();
img.setWidth(1200);
img.setHeight(400);

upload.eUpload = function (fileKey) {
    img.setFileKey(fileKey);
}
upload.eClear = function () {
    img.setFileKey('');
}

ApEvent.onlaod = function () {
}
///////////////////
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
    //pnl_sysArchi.divideV(tbl_image,pnl_sys_imageView,tbl_image);
    pnl_sysArchi.full(tbl_image);
   
    pnl_main.divideV(pnl_proNM, pnl_sysArchi, pnl_proNM);
    pnl_proNM.setHeight(90);
    viewPanel.divideV(tbl_main, pnl_main, tbl_main);
    tbl_main.setHeight(34);
    tbl_image.setHeight(34);
    getTable();

}


