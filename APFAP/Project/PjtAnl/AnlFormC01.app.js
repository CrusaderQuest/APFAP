/// <reference path="../../Resource/Scripts/ext-all-debug.js" />
/// <reference path="../../Resource/Scripts/component.js" />
/// <reference path="../../Resource/Scripts/noncomponent.js" />
/// <reference path="AnlFormA01.view.js" />

//App 단 정의 영역 시작
var i = 0;
function GRD_LOAD() {
    //데이터생성
    var pr = DBParams.create('sp_ANLFORMC01', 'GET_TABLE');
    //데이터셋
    var ds = DBconnect.runProcedure(pr);
    gridData = ds[0];
    grd_a.reconfigure(gridData);
}
btn_add.eClick = function () {
    gridData.add({ DEV_NO: 'aaa' + i++, CATEGORY: '', DEV_NM: '', DEV_USE: '', BLANK: '' });
}
btn_del.eClick = function () {
    if (grd_a.selModel.getSelection() == 0) {
        Ext.Msg.alert("경고 창", "체크 해주세요.");
    } else {
        gridData.remove(grd_a.selModel.getSelection());
    }
}