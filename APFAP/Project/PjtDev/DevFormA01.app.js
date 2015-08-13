/// <reference path="../../Resource/Script/ext-all-debug.js" />
/// <reference path="../../Resource/Script/component.js" />
/// <reference path="../../Resource/Script/noncomponent.js" />
/// <reference path="DevFormA01.view.js" />

//App 단 정의 영역 시작
//개발 진척 상황

btn_server.eClick = function () {
    grd.reconfigure(dData);
    if (currentBtn != 0) {
        //window form 호출

        currentBtn = 0;
    }
}
btn_db.eClick = function () {
    grd.reconfigure(sampleData);
    if (currentBtn != 1) {


        currentBtn = 1;
    }
}
btn_ui.eClick = function () {
    if (currentBtn != 2) {


        currentBtn = 2;
    }
}
btn_etc.eClick = function () {
    if (currentBtn != 3) {


        currentBtn = 3;
    }
}
btn_insert.eClick = function () {
    dData.add("''");
}
btn_delete.eClick = function () {
    dData.remove(grd.getSelection());
}
/*
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
grd.eSelectionChange = function (record, rowIndex, paramId) {
    console.log(paramId, record.data, rowIndex);
    text_cc.setValue(record.data.USERID);
}
grd.eUpdate = function (record, rowIndex, paramId) {
    console.log(paramId, record.data, rowIndex);
}
*/