/// <reference path="../../Resource/Scripts/ext-all-debug.js" />
/// <reference path="../../Resource/Scripts/component.js" />
/// <reference path="../../Resource/Scripts/noncomponent.js" />
/// <reference path="DefFormB01.view.js" />

//View 단 정의 영역 시작
var i = 0;
var length = 0;
function GRD_LOAD() {
    //데이터생성
    var pr = DBParams.create('sp_DefFormB01', 'GET_TABLE');
    //데이터셋
    var ds = DBconnect.runProcedure(pr);
    gridData = ds[0];
    grd_a.reconfigure(gridData);
    length = gridData.data.length;
}
set_txt = function (bool) {
    btn_add.setDisabled(bool);
    btn_del.setDisabled(bool);
    grd_a.setDisabled(bool);
    btn_save.setVisible(!bool);
    btn_change.setVisible(bool);
}
btn_add.eClick = function (){
    gridData.add({ UP_KEY: 'aa'+i++ ,FUNC_IMP: '선택', CATEGORY: '기타', FUNC_NM: '', SUMMARY: '', BLANK: '' }); 
}
btn_del.eClick = function () {
    if (grd_a.selModel.getSelection() == 0) {
        Ext.Msg.alert("경고 창", "체크 해주세요.");
    } else {
        for (var i = 0; i < grd_a.getSelection().length; i++) {
            var tempNo = grd_a.getSelection()[i].data.UP_KEY;
            deleteArray.push(tempNo);
        }
        gridData.remove(grd_a.selModel.getSelection());
    }
}

btn_change.eClick = function () {
    set_txt(false);
}
btn_save.eClick = function () {
    if (deleteArray != null) {
        deleteDB();
        var deletedLength = length - deleteArray.length;
        if (deletedLength == gridData.data.length) {
            updateDB(deletedLength);
        } else {
            updateDB(deletedLength);
            insertDB(deletedLength, length);
        }
    }
    else {
        if (gridData.data.length == length) {
            updateDB(length);
        } else {
            updateDB(length);
            insertDB(length, gridData.data.length);
        }
    }
    //
    set_txt(true);
    grd_a.reconfigure(gridData);
    //grd_a.selModel.select(null);
}
//---------------------------------------------------------------
updateDB = function (index) {
    var prUp = DBParams.create('sp_DefFormB01', 'UPDATE_TABLE');
    for (var i = 0; i < index; i++) {
        prUp.addParam('UP_KEY', gridData.data.items[i].data.UP_KEY);
        prUp.addParam('FUNC_IMP', gridData.data.items[i].data.FUNC_IMP);
        prUp.addParam('CATEGORY', gridData.data.items[i].data.CATEGORY);
        prUp.addParam('FUNC_NM', gridData.data.items[i].data.FUNC_NM);
        prUp.addParam('SUMMARY', gridData.data.items[i].data.SUMMARY);
        prUp.addParam('BLANK', gridData.data.items[i].data.BLANK);
    }
    
    var dsUp = DBconnect.runProcedure(prUp);
}
insertDB = function (sindex,eindex) {
    var prIn = DBParams.create('sp_DefFormB01', 'INSERT_TABLE')
    for (var i = sindex; i < eindex; i++) {
        prIn.addParam('FUNC_IMP', gridData.data.items[i].data.FUNC_IMP);
        prIn.addParam('CATEGORY', gridData.data.items[i].data.CATEGORY);
        prIn.addParam('FUNC_NM', gridData.data.items[i].data.FUNC_NM);
        prIn.addParam('SUMMARY', gridData.data.items[i].data.SUMMARY);
        prIn.addParam('BLANK', gridData.data.items[i].data.BLANK);
    }
    var dsIn = DBconnect.runProcedure(prIn);
}

function deleteDB() {
    var pr = DBParams.create('sp_DefFormB01', 'DELETE_TABLE');
    for (var i = 0; i < deleteArray.length; i++) {
        //각 탭 delete list 튜블 수 loop
        pr.addParam('UP_KEY', deleteArray.pop());
    }
    var ds = DBconnect.runProcedure(pr);
}

