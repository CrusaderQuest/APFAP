/// <reference path="../../Resource/Script/ext-all-debug.js" />
/// <reference path="../../Resource/Script/component.js" />
/// <reference path="../../Resource/Script/noncomponent.js" />
/// <reference path="DevFormA01.view.js" />

//App 단 정의 영역 시작

//window
function msgShow(i, j) {
    Ext.Msg.show({
        message: (i + 1) + '번째 탭' + (j + 1) + '번째 튜플 오류',
        icon: Ext.Msg.WARNING,
    });
}
//DB 통신
function dbLoad() {
    var pr = DBParams.create('sp_DevFormA01', 'GET_TABLE');
    var ds = DBconnect.runProcedure(pr);
    for (var i = 0; i < 4; i++) {
        dTableArray.add(ds[i]);
        deleteArray.add(Ext.create('Ext.data.ArrayStore', {
            model: 'delete_Array'
        }));
    }
}
function dbSave() {
    for (var i = 0; i < 4; i++) {
        var errTuple;
        if (errTuple = isErrInTuple(i)) {
            msgShow(i, errTuple);
            return 0;
        }
    }
    dbInsertUpdate();
    dbDelete();
    return 1;
}
function dbUserLoad() {
    var pr = DBParams.create('sp_DevFormA01', 'GET_PROJECT_USER');
    var ds = DBconnect.runProcedure(pr);
    comboStoreUser = ds[0];
}
//DB 통신 private
function isErrInTuple(i) {
    //튜플들이 정상인지. return ( 에러x: 0 에러o: 튜플번호.)
    for (var j = 0; j < dTableArray.data.items[i].data.data.length; j++) {
        if (dTableArray.data.items[i].data.data.items[j].data.D_DEV_NM == null)
            return j;
        if (dTableArray.data.items[i].data.data.items[j].data.START_DT == null)
            return j;
        if (dTableArray.data.items[i].data.data.items[j].data.DEV_VALUE == null)
            return j;
        if (dTableArray.data.items[i].data.data.items[j].data.TEST_VALUE == null)
            return j;
        if (dTableArray.data.items[i].data.data.items[j].data.DEADLINE == null)
            return j;
        if (dTableArray.data.items[i].data.data.items[j].data.USER_NM == null)
            return j;
    }
    return false;
}
function dbInsertUpdate() {
    for (var i = 0; i < 4; i++) {
        //서버,DB,UI,기타 loop
        for (var j = 0; j < dTableArray.data.items[i].data.data.length; j++) {
            //각 탭 튜블 수 loop
            var pr;
            if (dTableArray.data.items[i].data.data.items[j].data.D_DEV_NO == null) {//insert
                pr = DBParams.create('sp_DevFormA01', 'INSERT_TABLE');
                pr.addParam('H_DEV_NO', i);

            } else {//update
                pr = DBParams.create('sp_DevFormA01', 'UPDATE_TABLE');
                pr.addParam('D_DEV_NO', dTableArray.data.items[i].data.data.items[j].data.D_DEV_NO);

            }
            pr.addParam('D_DEV_NM', dTableArray.data.items[i].data.data.items[j].data.D_DEV_NM);
            pr.addParam('START_DT', dTableArray.data.items[i].data.data.items[j].data.START_DT);
            pr.addParam('DEV_VALUE', dTableArray.data.items[i].data.data.items[j].data.DEV_VALUE);
            pr.addParam('TEST_VALUE', dTableArray.data.items[i].data.data.items[j].data.TEST_VALUE);
            pr.addParam('DEADLINE', dTableArray.data.items[i].data.data.items[j].data.DEADLINE);
            pr.addParam('USER_KEY', convertUSER_KEY(dTableArray.data.items[i].data.data.items[j].data.USER_NM));
            //pr.addParam('USER_KEY', 
            //              getUserNm(dTableArray.data.items[i].data.data.items[j].data.USER_KEY));
            pr.addParam('END_DT', dTableArray.data.items[i].data.data.items[j].data.END_DT);

            var ds = DBconnect.runProcedure(pr);
        }
    }
}
function dbDelete() {
    for (var i = 0; i < 4; i++) {
        //서버,DB,UI,기타 loop
        for (var j = 0; j < deleteArray.data.items[i].data.data.length; j++) {
            //각 탭 delete list 튜블 수 loop
            var pr = DBParams.create('sp_DevFormA01', 'DELETE_TABLE');
            pr.addParam('D_DEV_NO', deleteArray.data.items[i].data.data.items[j].data);
            var ds = DBconnect.runProcedure(pr);
        }
    }
}
function convertUSER_KEY(input) {
    for (var i = 0; i < comboStoreUser.data.length; i++) {
        if (comboStoreUser.data.items[i].data.SHOWDATA == input)
            return comboStoreUser.data.items[i].data.HIDEDATA;
    }
}
function initBtnColor(i) {
    if (i == 0) {
        btn_server.setStyle('background-color', '#0000ff');
    } else if (i == 1) {
        btn_db.setStyle('background-color', '#0000ff');
    } else if (i == 2) {
        btn_ui.setStyle('background-color', '#0000ff');
    } else {
        btn_etc.setStyle('background-color', '#0000ff');
    }
}
function selBtnColor(i) {
    if (i == 0) {
        btn_server.setStyle('background-color', '#00ffff');
    } else if (i == 1) {
        btn_db.setStyle('background-color', '#00ffff');
    } else if (i == 2) {
        btn_ui.setStyle('background-color', '#00ffff');
    } else {
        btn_etc.setStyle('background-color', '#00ffff');
    }
}
//4개 탭
btn_server.eClick = function () {
    if (currentBtn != 0) {
        grd.reconfigure(dTableArray.data.items[0].data);
        initBtnColor(currentBtn);
        currentBtn = 0;
        selBtnColor(currentBtn);
    }
}
btn_db.eClick = function () {
    if (currentBtn != 1) {
        grd.reconfigure(dTableArray.data.items[1].data);
        initBtnColor(currentBtn);
        currentBtn = 1;
        selBtnColor(currentBtn);
    }
}
btn_ui.eClick = function () {
    if (currentBtn != 2) {
        grd.reconfigure(dTableArray.data.items[2].data);
        initBtnColor(currentBtn);
        currentBtn = 2;
        selBtnColor(currentBtn);
    }
}
btn_etc.eClick = function () {
    if (currentBtn != 3) {
        grd.reconfigure(dTableArray.data.items[3].data);
        initBtnColor(currentBtn);
        currentBtn = 3;
        selBtnColor(currentBtn);
    }
}

//3개 버튼
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
            dTableArray.clearData();
            dbLoad();
            grd.reconfigure(dTableArray.data.items[0].data);
            initBtnColor(currentBtn);
            currentBtn = 0;
            selBtnColor(currentBtn);
        }
    }
}
btn_insert.eClick = function () {
    //새 튜플 추가.
    dTableArray.data.items[currentBtn].data.add({
        D_DEV_NM: null, START_DT: null, DEV_VALUE: null, TEST_VALUE: null, DEADLINE: null,
        USER_KEY: null, USER_NM: null, END_DT: null
    });
}
btn_delete.eClick = function () {
    //deletelist추가
    for (var i = 0; i < grd.getSelection().length; i++) {
        var tempNo = grd.getSelection()[i].data.D_DEV_NO;
        deleteArray.data.items[currentBtn].data.add(tempNo);
    }
    dTableArray.data.items[currentBtn].data.remove(grd.getSelection());
}

/*
grd.eSelectionChange = function (record, rowIndex, paramId) {
    console.log(paramId, record.data, rowIndex);
    text_cc.setValue(record.data.USERID);
}
grd.eUpdate = function (record, rowIndex, paramId) {
    console.log(paramId, record.data, rowIndex);
}
*/


