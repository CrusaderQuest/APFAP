/// <reference path="../../Resource/Scripts/ext-all-debug.js" />
/// <reference path="../../Resource/Scripts/component.js" />
/// <reference path="../../Resource/Scripts/noncomponent.js" />
//

//View 단 정의 영역 시작
var pnl_proNM = ApPanel.create('Project Name'); //panel 정의
var grd = ApGrid.create();// grid 생성 
grd.addColumn('date', '날짜', 'E_DT', 200);//grid 의 column 추가 
grd.addColumn('check', '업로드 여부', 'CHECK_UPLOAD', 200);
grd.addColumn('text', 'Summary', 'SUMMARY', 730);

grd.setWidth('fit');

////////////////////////////////////////////


var pnl_sysArchi = ApPanel.create('System Architecture ');

var pnl_sys_imageView = ApPanel.create('image Viewer');
//image 를 위한 table생성
var tbl_image = ApTable.create(1);
tbl_image.setTarget();
var upload = ApUpload.create('test', 'aa');
var img = ApImg.create();
img.setWidth(1200);
img.setHeight(400);

upload.eUpload = function (fileKey) {//image upload를 위한 filekey 설정
    img.setFileKey(fileKey);
}
upload.eClear = function () {
    img.setFileKey('');
}

ApEvent.onlaod = function () {
}
///////////////////
var dbc_save;


var pnl_main = ApPanel.create('main');
ApEvent.onlaod = function () {//각 panel 들을 삽입 및 panel 별 배치
    pnl_proNM.full(grd);
    pnl_sysArchi.full(tbl_image);
   
    pnl_main.divideV(pnl_proNM, pnl_sysArchi, pnl_proNM);
    pnl_proNM.setHeight(90);
    viewPanel.full(pnl_main);
    tbl_image.setHeight(34);


    get_Init_Table();//get Init Table 함수 호출
    getTable();
   
}


