/// <reference path="../../Resource/Scripts/ext-all-debug.js" />
/// <reference path="../../Resource/Scripts/component.js" />
/// <reference path="../../Resource/Scripts/noncomponent.js" />
/// <reference path="AnlFormC01.view.js" />

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

grd_a.eButtonAddClick = function () {
    grd_a.reconfigure(gridData);
    gridData.add({ CATEGORY: '기타', DEV_NM: null, DEV_USE: null, S_DT: null, E_USER: null, E_DT: null });
    grd_a.setFocus(grd_a.getTotalCount() - 1);
}
grd_a.eButtonDeleteClick = function () {
    if (grd_a.selModel.getSelection() == 0) {
        //Ext.Msg.alert("경고 창", "클릭 해주세요.");
    } else {
        for (var i = 0; i < grd_a.getSelection().length; i++) {
            var tempNo = grd_a.getSelection()[i].data.DEV_NO;
            deleteArray.push(tempNo);
        }
        gridData.remove(grd_a.selModel.getSelection());
    }
}

btn_SAVE.eClick = function () {
    for (var i = 0; i < gridData.data.length; i++) {
        //튜블 수 loop
        var pr;
        if (gridData.data.items[i].data.DEV_NO == 0) {//insert
            pr = DBParams.create('sp_AnlFormC01', 'INSERT_TABLE');
            pr.addParam('S_DT', ApFn.setYMD(gridData.data.items[i].data.S_DT));
        } else {//update
            pr = DBParams.create('sp_AnlFormC01', 'UPDATE_TABLE');
            pr.addParam('DEV_NO', gridData.data.items[i].data.DEV_NO);
        }
        pr.addParam('CATEGORY', gridData.data.items[i].data.CATEGORY);
        pr.addParam('DEV_NM', gridData.data.items[i].data.DEV_NM);
        pr.addParam('DEV_USE', gridData.data.items[i].data.DEV_USE);
        pr.addParam('E_DT', ApFn.setYMD(gridData.data.items[i].data.E_DT));

        var ds = DBconnect.runProcedure(pr);
    }
    deleteDB();
    //
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
btn_search.eClick = function () {
    if (dt_SDATE.getYMD() > dt_EDATE.getYMD()) { }
    else {
        var prS = DBParams.create('sp_AnlFormC01', 'DT_SEARCH');
        prS.addParam('S_SEARCH', dt_SDATE.getYMD());
        prS.addParam('E_SEARCH', dt_EDATE.getYMD());
        var dsS = DBconnect.runProcedure(prS);
        grd_a.reconfigure(dsS[0]);


    }
}