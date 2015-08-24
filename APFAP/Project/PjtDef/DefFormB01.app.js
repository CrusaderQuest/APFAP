/// <reference path="../../Resource/Scripts/ext-all-debug.js" />
/// <reference path="../../Resource/Scripts/component.js" />
/// <reference path="../../Resource/Scripts/noncomponent.js" />
/// <reference path="DefFormB01.view.js" />

//View 단 정의 영역 시작
function GRD_LOAD() {
    //데이터생성
    var pr = DBParams.create('sp_DefFormB01', 'GET_TABLE');
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
    gridData.add({ FUNC_IMP: '선택', CATEGORY: '기타', FUNC_NM: '', SUMMARY: '', BLANK: '' }); 
}

grd_a.eButtonDeleteClick = function () {
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
    for (var i = 0; i < gridData.data.length; i++) {
        //튜블 수 loop
        var pr;
        if (gridData.data.items[i].data.UP_KEY == 0) {//insert
            pr = DBParams.create('sp_DefFormB01', 'INSERT_TABLE');
        } else {//update
            pr = DBParams.create('sp_DefFormB01', 'UPDATE_TABLE');
            pr.addParam('UP_KEY', gridData.data.items[i].data.UP_KEY);
        }
        pr.addParam('FUNC_IMP', gridData.data.items[i].data.FUNC_IMP);
        pr.addParam('CATEGORY', gridData.data.items[i].data.CATEGORY);
        pr.addParam('FUNC_NM', gridData.data.items[i].data.FUNC_NM);
        pr.addParam('SUMMARY', gridData.data.items[i].data.SUMMARY);
        pr.addParam('BLANK', gridData.data.items[i].data.BLANK);

        var ds = DBconnect.runProcedure(pr);
    }
    deleteDB();
    //
    set_txt(true);
    GRD_LOAD();
}
function deleteDB() {
    var pr = DBParams.create('sp_DefFormB01', 'DELETE_TABLE');
    for (var i = 0; i < deleteArray.length; i++) {
        //각 탭 delete list 튜블 수 loop
        pr.addParam('UP_KEY', deleteArray.pop());
        var ds = DBconnect.runProcedure(pr);
    }
}

