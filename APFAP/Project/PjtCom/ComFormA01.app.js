/// <reference path="../../Resource/Script/ext-all-debug.js" />
/// <reference path="../../Resource/Script/component.js" />
/// <reference path="../../Resource/Script/noncomponent.js" />
/// <reference path="ComFormA01.view.js" />

//App 단 정의 영역 시작
//고객 보수 내역
function msgShow(i) {
    Ext.Msg.show({
        message: (i + 1) + '번째 튜플 오류',
        icon: Ext.Msg.WARNING,
    });
}

function dbLoad() {
    var pr = DBParams.create('sp_ComFormA01', 'GET_TABLE');
    var ds = DBconnect.runProcedure(pr);
    grdData = ds[0];
    convertDBDate();
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
function dbSave() {
    var errTuple;
    if(errTuple=isErrInTuple()){
        msgShow(errTuple);
        return 0;
    }else{
        dbInsertUpdate();
        dbDelete();
        return 1;
    }
}
//DB private
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
        if (comboState.data.items[i].data.SHOWDATA == input)
            return comboState.data.items[i].data.HIDEDATA;
    }
}
function convertUSER_KEY(input) {
    for (var i = 0; i < comboUser.data.length; i++) {
        if (comboUser.data.items[i].data.SHOWDATA == input)
            return comboUser.data.items[i].data.HIDEDATA;
    }
}
function convertDate(input) {
    return Ext.Date.dateFormat(input, 'Ymd');
}
function convertDBDate() {
    for (var i = 0; i < grdData.data.length; i++) {
        var tempREQ_DT = grdData.data.items[i].data.REQ_DT;
        var tempEND_DT = grdData.data.items[i].data.END_DT;
        var modiREQ_DT = new Date();
        var modiEND_DT = new Date();
        modiREQ_DT.setYear(tempREQ_DT.substr(0, 4));
        modiEND_DT.setYear(tempEND_DT.substr(0, 4));
        modiREQ_DT.setMonth(tempREQ_DT.substr(4, 2));
        modiEND_DT.setMonth(tempEND_DT.substr(4, 2));
        modiREQ_DT.setDate(tempREQ_DT.substr(6, 2));
        modiEND_DT.setDate(tempEND_DT.substr(6, 2));
        grdData.data.items[i].data.REQ_DT = modiREQ_DT;
        grdData.data.items[i].data.END_DT = modiEND_DT;
    }
}
function dbInsertUpdate() {
    for (var i = 0; i < grdData.data.length; i++) {
        //튜블 수 loop
        var pr;
        if (grdData.data.items[i].data.REQ_NO == null) {//insert
            pr = DBParams.create('sp_ComFormA01', 'INSERT_TABLE');
        } else {//update
            pr = DBParams.create('sp_ComFormA01', 'UPDATE_TABLE');
            pr.addParam('REQ_NO', grdData.data.items[i].data.REQ_NO);
        }
        pr.addParam('REQ_DT', convertDate(grdData.data.items[i].data.REQ_DT));
        pr.addParam('SUMMARY', grdData.data.items[i].data.SUMMARY);
        pr.addParam('DESCRIPTION', grdData.data.items[i].data.CONTENT);
        pr.addParam('STATE_CD', convertSTATE_CD(grdData.data.items[i].data.STATE_NM));
        pr.addParam('END_DT', convertDate(grdData.data.items[i].data.END_DT));
        pr.addParam('USER_KEY', convertUSER_KEY(grdData.data.items[i].data.USER_NM));

        var ds = DBconnect.runProcedure(pr);
    }
}
function dbDelete() {
    for (var i = 0; i < deleteArray.data.length; i++) {
        //각 탭 delete list 튜블 수 loop
        var pr = DBParams.create('sp_ComFormA01', 'DELETE_TABLE');
        pr.addParam('REQ_NO', deleteArray.data.items[i].data);
        var ds = DBconnect.runProcedure(pr);
    }
}

btn_save.eClick = function () {
    if (saveBtnState == 0) {
        pnl_content.setDisabled(false);
        btn_save.setText("저장");
        saveBtnState = 1;
    } else {
        pnl_content.setDisabled(true);
        btn_save.setText("수정");
        saveBtnState = 0;
        //DB 통신 insert, update, delete.
        if (dbSave()) {
            //다시 로드. deletelist 초기화
            deleteArray.clearData();
            grdData.clearData();
            dbLoad();
        }
    }
}
btn_insert.eClick = function () {
    //grdData.addRow();
    grdData.add({
        REQ_NO: null, REQ_DT: null, SUMMARY: null, CONTENT: null, STATE_NM: null,
        END_DT: null, USER_NM: null
    });
}
btn_delete.eClick = function () {
    //스토어에서 뺴고, deletelist 추가.
    for (var i = 0; i < grd.getSelection().length; i++) {
        var tempNo = grd.getSelection()[i].data.REQ_NO;
        deleteArray.add(tempNo);
    }
    grdData.remove(grd.getSelection());
}