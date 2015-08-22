/// <reference path="../../Resource/Script/ext-all-debug.js" />
/// <reference path="../../Resource/Script/component.js" />
/// <reference path="../../Resource/Script/noncomponent.js" />
/// <reference path="DesFormB01.view.js" />

//App 단 정의 영역 시작

//eSelectionChange(a,b,c);


grd.eSelectionChange = function (record, rowindex, paramId) {
    var prm = DBParams.create('sp_DesFormB01', 'GET_COLUMN');
    prm.addParam('TABLE_KEY',record.data.TABLE_KEY);
    var tblnm = DBconnect.runProcedure(prm);
    tbldetail_save = tblnm[0];
    grd_Detail.reconfigure(tbldetail_save);
    grd_Detail.eButtonAddClick = function () {
        var prm2 = DBParams.create('sp_DesFormB01','INSERT_')
        grd.getSelection().data.TABLE_KEY
        //selected.getSelection()
    }
    //if (rowindex == 2) {
    //    console.log('2번row index 클릭!');
    //    grd_Detail.reconfigure(gridData_second);
    //    grd_Example.reconfigure(gridData_example2);
    //    btn_insert.eClick = function () {
    //        gridData_second.add("''");
    //    }
    //    console.log(grd.getRow(2));
    //    txt_test.setValue(grd.getRow(2).data.tableName);
    //}
    //if (rowindex == 1) {
    //    console.log('1번row index 클릭!');
    //    grd_Detail.reconfigure(gridData);
    //    grd_Example.reconfigure(gridData_example);

    //    btn_insert.eClick = function () {
    //        gridData.add("''");
    //    }
    //}
}

btn_delete.eClick = function () {
    gridData.remove(grd_Detail.getSelection());
    gridData_second.remove(grd_Detail.getSelection());
}

function getTable() {
    var prm = DBParams.create('sp_DesFormB01', 'GET_TABLE_NM');
    var tblnm = DBconnect.runProcedure(prm);
    tblnm_save = tblnm[0];
    //var pn = DBParams.create('sp_DesFormB01', 'GET_TABLE_FOR_TREE');
    //var dtree = DBconnect.runProcedure(pn);
    //tree_save = dtree[0];
    grd.reconfigure(tblnm_save);
    var prm2 = DBParams.create('sp_DesFormB01', 'GET_DEFAULT_COLUMN');
    var column_detail = DBconnect.runProcedure(prm2);
    tbldetail_save = column_detail[0];
    grd_Detail.reconfigure(tbldetail_save);
}
function get_Selected_Table() {
    
}