/// <reference path="../../Resource/Script/ext-all-debug.js" />
/// <reference path="../../Resource/Script/component.js" />
/// <reference path="../../Resource/Script/noncomponent.js" />
/// <reference path="ComFormA01.view.js" />

//App 단 정의 영역 시작
//고객 보수 내역
//------------------------WINDOW------------------------------
function msgShow(i) {
    Ext.Msg.show({
        message: (i + 1) + '번째 튜플 오류',
        icon: Ext.Msg.WARNING,
    });
}
//------------------------DB------------------------------
function dbLoad() {
    var pr = DBParams.create('sp_ComFormA01', 'GET_TABLE');
    var ds = DBconnect.runProcedure(pr);
    grdData = ds[0];
    grd.reconfigure(grdData);
}
function dbUserLoad() {
    var pr = DBParams.create('sp_ComFormA01', 'GET_PROJECT_USER');
    var ds = DBconnect.runProcedure(pr);
    comboUser = ds[0];
}
function dbStateLoad() {
    var pr = DBParams.create('sp_ComFormA01', 'GET_STATE');
    var ds = DBconnect.runProcedure(pr);
    comboState = ds[0];
}
//------------------------DB private--------------------------
function isErrInTuple() {
    //튜플들이 정상인지. return ( 에러x: 0 에러o: 튜플번호.)
    for (var i = 0; i < grdData.data.length; i++) {
        if (grdData.data.items[i].data.REQ_DT == null)
            return i;
        if (grdData.data.items[i].data.SUMMARY == null)
            return i;
        if (grdData.data.items[i].data.CONTENT == null)
            return i;
        if (grdData.data.items[i].data.STATE_NM == null)
            return i;
        if (grdData.data.items[i].data.END_DT == null)
            return i;
        if (grdData.data.items[i].data.USER_NM == null)
            return i;
    }

    return false;
}
function convertSTATE_CD(input) {
    for (var i = 0; i < comboState.data.length; i++) {
        if (comboState.data.items[i].data.SHOWVALUE == input)
            return comboState.data.items[i].data.HIDEVALUE;
    }
}
function convertUSER_KEY(input) {
    for (var i = 0; i < comboUser.data.length; i++) {
        if (comboUser.data.items[i].data.SHOWVALUE == input)
            return comboUser.data.items[i].data.HIDEVALUE;
    }
}
//------------------------BUTTON EVENT--------------------------

/*
grd.eUpdate = function (record, rowIndex, paramId) {
    if (paramId == 'REQ_DT' || paramId == 'END_DT') {
        var t1Date = record.get(paramId);
        var t2Date = Ext.Date.dateFormat(t1Date, 'Y-m-d');
        record.set(paramId, t2Date);
    }
}
*/