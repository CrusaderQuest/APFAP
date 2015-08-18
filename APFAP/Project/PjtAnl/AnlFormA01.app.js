/// <reference path="../../Resource/Scripts/ext-all-debug.js" />
/// <reference path="../../Resource/Scripts/component.js" />
/// <reference path="../../Resource/Scripts/noncomponent.js" />
/// <reference path="AnlFormA01.view.js" />

//App 단 정의 영역 시작
var length = 0;

function GRD_LOAD() {
    //데이터생성
    var pr = DBParams.create('sp_ANLFORMA01', 'GET_TABLE');
    //데이터셋
    var ds = DBconnect.runProcedure(pr);
    gridData = ds[0];
    grd_a.reconfigure(gridData);
    length = gridData.data.length;
}
btn_add.eClick = function () {
    gridData.add({ UI_NM: '', SUMMARY: '', REQ_SIMILARITY: '', BLANK: '' });
}
btn_del.eClick = function () {
    if (grd_a.selModel.getSelection() == 0) {
        Ext.Msg.alert("경고 창", "체크 해주세요.");
    } else {
        for (var i = 0; i < grd_a.getSelection().length; i++) {
            var tempNo = grd_a.getSelection()[i].data.UP_KEY;
            deleteArray.push = tempNo;
        }
        gridData.remove(grd_a.getSelection());
    }
}
updateDB = function(index){
    //var prUp = DBParams.create('sp_ANLFORMA01', 'UPDATE_TABLE');
    //for (var i = 0; i < index; i++) {
    //    prUp.addParam('UI_NM', gridData.data.items[i].data.UI_NM);
    //    prUp.addParam('SUMMARY', gridData.data.items[i].data.SUMMARY);
    //    prUp.addParam('REQ_SIMILARITY', gridData.data.items[i].data.REQ_SIMILARITY);
    //    prUp.addParam('BLANK', gridData.data.items[i].data.BLANK);
    //}
    
    //var dsUp = DBconnect.runProcedure(prUp);
}
insertDB = function (sindex,eindex) {
    var prIn = DBParams.create('sp_ANLFORMA01', 'INSERT_TABLE')
    for (var i = sindex; i < eindex; i++) {
        prIn.addParam('UI_NM', gridData.data.items[i].data.UI_NM);
        alert(gridData.data.items[i].data.UI_NM);
        prIn.addParam('SUMMARY', gridData.data.items[i].data.SUMMARY);
        prIn.addParam('REQ_SIMILARITY', gridData.data.items[i].data.REQ_SIMILARITY);
        prIn.addParam('BLANK', gridData.data.items[i].data.BLANK);
    }
    var dsIn = DBconnect.runProcedure(prIn);
}

btn_save.eClick = function () {
    if (deleteArray != null) {
        dbDelete();
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
}
function dbDelete() {
    var pr = DBParams.create('sp_ANLFORMA01', 'DELETE_TABLE');
    for (var i = 0; i < deleteArray.length; i++) {
        //각 탭 delete list 튜블 수 loop
        pr.addParam('UP_KEY', deleteArray.pop);
    }
    var ds = DBconnect.runProcedure(pr);
    grd_a.reconfigure(gridData);
}