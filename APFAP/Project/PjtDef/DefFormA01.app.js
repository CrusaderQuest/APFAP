/// <reference path="../../Resource/Scripts/ext-all-debug.js" />
/// <reference path="../../Resource/Scripts/component.js" />
/// <reference path="../../Resource/Scripts/noncomponent.js" />
/// <reference path="DefFormA01.view.js" />

//App 단 정의 영역 시작

function GRD_LOAD() {
    //데이터생성
    //var pr = DBParams.create('sp_ANLFORMA01', 'GET_TABLE');
    ////데이터셋
    //var ds = DBconnect.runProcedure(pr);
    //gridData = ds[0];
    //grd_a.reconfigure(gridData);
}

btn_change.eClick = function () {
    txt_title.setDisabled(false);
    txta_subtitle.setDisabled(false);
    btn_change.setVisible(false)
    btn_change2.setVisible(true);
}
btn_change2.eClick = function () {
    txt_title.setDisabled(true);
    txta_subtitle.setDisabled(true);
    btn_change2.setVisible(false);
    btn_change.setVisible(true);
}