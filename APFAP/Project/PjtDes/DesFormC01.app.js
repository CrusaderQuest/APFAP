/// <reference path="../../Resource/Script/ext-all-debug.js" />
/// <reference path="../../Resource/Script/component.js" />
/// <reference path="../../Resource/Script/noncomponent.js" />
/// <reference path="DesFormD01.view.js" />

//App 단 정의 영역 시작
//pnl_sub.eClick = function (selected) {
//    console.log(selected.data);
//    if (selected.data == 'Menu Child 1') {
//        grd.reconfigure(gridData1);
//    }
//    else if (selected.data.text == 'Menu Child 2') {
//        grd.reconfigure(gridData2);
//    }
//    else {
//        grd.reconfigure(gridData);
//    }
//    //grd.reconfigure(gridData);
//}
function getTable() {
    var pr = DBParams.create('sp_DesFormC01', 'GET_TABLE');
    var ds = DBconnect.runProcedure(pr);
    grd_save = ds[0];
    var pn = DBParams.create('sp_DesFormC01', 'GET_TABLE_FOR_TREE');
    var dtree = DBconnect.runProcedure(pn);
    tree_save = dtree[0];
    
    grd.reconfigure(grd_save);


}
pnl_sub.eClick = function (selected) {
    console.log(selected.value.getValue('NO'));
    for (var i = 0; i < grd_save.data.length; i++) {
        if (selected.value.getValue('NO') == grd_save.data.items[i].data.SCREEN_NO)
            {
            grd.reconfigure(grd_save.data.items[i].data);
        }
    }
}