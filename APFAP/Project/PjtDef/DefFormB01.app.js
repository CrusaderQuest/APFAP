/// <reference path="../../Resource/Scripts/ext-all-debug.js" />
/// <reference path="../../Resource/Scripts/component.js" />
/// <reference path="../../Resource/Scripts/noncomponent.js" />
/// <reference path="DefFormB01.view.js" />

//View 단 정의 영역 시작
var i = 0;
btn_ok.eClick = function () {
    gridData.add(reqData, ['aaa' + i++, txt_category.getValue(), txt_reqNm.getValue(), txt_blank.getValue()]);
    
}
btn_clrear.eClick = function () {
    txt_category.setValue(null);
    txt_reqNm.setValue(null);
    txt_blank.setValue(null);
    gridData.remove(1);
}