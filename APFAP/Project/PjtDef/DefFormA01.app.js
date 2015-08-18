/// <reference path="../../Resource/Scripts/ext-all-debug.js" />
/// <reference path="../../Resource/Scripts/component.js" />
/// <reference path="../../Resource/Scripts/noncomponent.js" />
/// <reference path="DefFormA01.view.js" />

//App 단 정의 영역 시작

function GRD_LOAD() {
    //데이터생성
    var pr = DBParams.create('sp_DEFFORMA01', 'GET_TABLE');
    //데이터셋
    var ds = DBconnect.runProcedure(pr);
    dbData = ds[0];
    txt_title.setValue(dbData.data.items[0].data.TITLE);
    txta_subtitle.setValue(dbData.data.items[0].data.SUBTITLE);

}

btn_change.eClick = function () {
    set_txt(false);
}

btn_change2.eClick = function () {
    var prUp = DBParams.create('sp_DEFFORMA01', 'UPDATE_TABLE');
    //데이터셋
    prUp.addParam("TITLE", txt_title.getValue());
    prUp.addParam("SUBTITLE", txta_subtitle.getValue());
    var ds = DBconnect.runProcedure(prUp);
    set_txt(true);
}

set_txt = function(bool){
    txt_title.setDisabled(bool);
    txta_subtitle.setDisabled(bool);
    btn_change2.setVisible(!bool);
    btn_change.setVisible(bool);
}