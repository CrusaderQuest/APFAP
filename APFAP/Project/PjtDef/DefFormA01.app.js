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

btn_SAVE.eClick = function () {
    if(dbData.getCount == 0){
        var prIU = DBParams.create('sp_DEFFORMA01', 'INSERT_TABLE');
    }else{
        var prIU = DBParams.create('sp_DEFFORMA01', 'UPDATE_TABLE');
        //데이터셋
        prIU.addParam("TITLE", txt_title.getValue());
        prIU.addParam("SUBTITLE", txta_subtitle.getValue());
    }
    var ds = DBconnect.runProcedure(prIU);
}
