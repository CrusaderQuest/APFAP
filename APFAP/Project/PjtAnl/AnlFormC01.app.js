/// <reference path="../../Resource/Scripts/ext-all-debug.js" />
/// <reference path="../../Resource/Scripts/component.js" />
/// <reference path="../../Resource/Scripts/noncomponent.js" />
/// <reference path="AnlFormA01.view.js" />

//App 단 정의 영역 시작
var i = 0;
function GRD_LOAD() {
    //데이터생성
    var pr = DBParams.create('sp_AnlFormC01', 'GET_TABLE');
    //데이터셋
    var ds = DBconnect.runProcedure(pr);
    gridData = ds[0];
    grd_a.reconfigure(gridData);
}

set_txt = function (bool) {
    grd_a.setDisabled(bool);
    btn_save.setVisible(!bool);
    btn_change.setVisible(bool);
}
grd_a.eButtonAddClick = function () {
    gridData.add({ CATEGORY: '선택', DEV_NM: '', DEV_USE: '', BLANK: '비고' });
}

grd_a.eButtonDeleteClick = function () {
    if (grd_a.selModel.getSelection() == 0) {
        Ext.Msg.alert("경고 창", "체크 해주세요.");
    } else {
        for (var i = 0; i < grd_a.getSelection().length; i++) {
            var tempNo = grd_a.getSelection()[i].data.DEV_NO;
            deleteArray.push(tempNo);
        }
        gridData.remove(grd_a.selModel.getSelection());
    }
}

btn_change.eClick = function () {
    set_txt(false);
}

btn_save.eClick = function () {
    for (var i = 0; i < gridData.data.length; i++) {
        //튜블 수 loop
        var pr;
        if (gridData.data.items[i].data.DEV_NO == 0) {//insert
            pr = DBParams.create('sp_AnlFormC01', 'INSERT_TABLE');
        } else {//update
            pr = DBParams.create('sp_AnlFormC01', 'UPDATE_TABLE');
            pr.addParam('DEV_NO', gridData.data.items[i].data.DEV_NO);
        }
        pr.addParam('CATEGORY', gridData.data.items[i].data.CATEGORY);
        pr.addParam('DEV_NM', gridData.data.items[i].data.DEV_NM);
        pr.addParam('DEV_USE', gridData.data.items[i].data.DEV_USE);
        pr.addParam('BLANK', gridData.data.items[i].data.BLANK);

        var ds = DBconnect.runProcedure(pr);
    }
    deleteDB();
    //
    set_txt(true);
    GRD_LOAD();
}
function deleteDB() {
    var pr = DBParams.create('sp_AnlFormC01', 'DELETE_TABLE');
    for (var i = 0; i < deleteArray.length; i++) {
        //각 탭 delete list 튜블 수 loop
        pr.addParam('DEV_NO', deleteArray.pop());
        var ds = DBconnect.runProcedure(pr);
    }
}
