/// <reference path="../../Resource/Script/ext-all-debug.js" />
/// <reference path="../../Resource/Script/component.js" />
/// <reference path="../../Resource/Script/noncomponent.js" />
/// <reference path="test.view.js" />

//App 단 정의 영역 시작
//txt2.eChange = function (newValue, oldValue) {
//    console.log(newValue);
//}
//체크버튼 클릭이벤트
btn_aa.eClick = function () {
    if (chk_aa.getValue()) {
        chk_aa.setValue(false);
    } else {
        chk_aa.setValue(true);
    }
}
btn_bb.eClick = function () {
    tab.setActiveTab(1);
}
grd.eSelectionChange = function (record, rowIndex, dataIndex) {
    console.log(record, rowIndex, dataIndex);
}