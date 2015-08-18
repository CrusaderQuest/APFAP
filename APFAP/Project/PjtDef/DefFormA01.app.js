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
    txt_title.setDisabled(false);
    txta_subtitle.setDisabled(false);
    btn_change.setVisible(false)
    btn_change2.setVisible(true);
}
btn_change2.eClick = function () {
    var prUp = DBParams.create('sp_DEFFORMA01', 'UPDATE_TABLE');
    //데이터셋
    prUp.addParam("TITLE", txt_title.getValue());
    prUp.addParam("SUBTITLE", txta_subtitle.getValue());
    var ds = DBconnect.runProcedure(prUp);

    txt_title.setDisabled(true);
    txta_subtitle.setDisabled(true);
    btn_change2.setVisible(false);
    btn_change.setVisible(true);
}