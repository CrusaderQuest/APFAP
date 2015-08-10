/// <reference path="../../Resource/Script/ext-all-debug.js" />
/// <reference path="../../Resource/Script/component.js" />
/// <reference path="../../Resource/Script/noncomponent.js" />
/// <reference path="DesFormD01.view.js" />

//App 단 정의 영역 시작
btn_main.eClick = function () {
    grd.reconfigure(gridData);
}
btn_page2.eClick = function () {
    grd.reconfigure(gridData1);
}
btn_page3.eClick = function () {
    grd.reconfigure(gridData2);
}

