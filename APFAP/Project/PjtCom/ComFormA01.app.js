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
    grd.reconfigure(grdData);
}
function dbUserLoad() {
    var pr = DBParams.create('sp_ComFormA01', 'GET_PROJECT_USER');
    var ds = DBconnect.runProcedure(pr);
    comboStoreUser = ds[0];
}
function dbStateLoad() {
    var pr = DBParams.create('sp_ComFormA01', 'GET_STATE');
    var ds = DBconnect.runProcedure(pr);
    comboStoreState = ds[0];
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
function convertSTATE_CD() {

    return;
}
function convertUSER_KEY() {

    return;
}
function dbInsertUpdate() {
    for (var i = 0; i < grdData.data.length; i++) {
        //튜블 수 loop
        if (grdData.data.items[i].data.REQ_NO == null) {//insert
            var pr = DBParams.create('sp_ComFormA01', 'INSERT_TABLE');
        } else {//update
            var pr = DBParams.create('sp_ComFormA01', 'UPDATE_TABLE');
            pr.addParam('REQ_NO', grdData.data.items[i].data.REQ_NO);

        }
        pr.addParam('REQ_DT', grdData.data.items[i].data.REQ_DT);
        pr.addParam('SUMMARY', grdData.data.items[i].data.SUMMARY);
        pr.addParam('DESCRIPTION', grdData.data.items[i].data.CONTENT);
        pr.addParam('STATE_CD', convertSTATE_CD(grdData.data.items[i].data.STATE_NM));
        pr.addParam('END_DT', grdData.data.items[i].data.DEADLINE);
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
    //dbSave() 호출하고 true면 저장된거. false면 안된거.
    //저장 된거면 다시 로드해서 뿌려주기.
    //deletelist 초기화.
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
        REQ_NO: '', REQ_DT: '', SUMMARY: '', CONTENT: '', STATE_NM: '',
        END_DT: '', USER_NM: ''
    });
}
btn_delete.eClick = function () {
    //스토어에서 뺴고, deletelist 추가.
    for (var i = 0; i < grdData.getSelection().length; i++) {
        var tempNo = grd.getSelection()[i].data.REQ_NO;
        deleteArray.add(tempNo);
    }
    dTableArray.remove(grd.getSelection());
}