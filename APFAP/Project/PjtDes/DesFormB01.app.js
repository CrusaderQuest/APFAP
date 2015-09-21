/// <reference path="../../Resource/Script/ext-all-debug.js" />
/// <reference path="../../Resource/Script/component.js" />
/// <reference path="../../Resource/Script/noncomponent.js" />
/// <reference path="DesFormB01.view.js" />

//App 단 정의 영역 시작

//eSelectionChange(a,b,c);


grd.eSelectionChange = function (record, rowindex, paramId) {
    if (isUpdated) {
        msgSaveWarning(record);
    } else {
        if (record.data.TABLE_KEY == 0) {
            pr = DBParams.create('sp_DesFormB01', 'ALLOC_H_TABLE');
            ds = DBconnect.runProcedure(pr);
            currentTable = ds[0].data.items[0].data.TABLE_KEY;
            record.data.TABLE_KEY = currentTable;
        } else {
            currentTable = record.data.TABLE_KEY;
        }
        viewTable(currentTable);
    }
}
function viewTable(key) {
    getColumn(key);
    getExample(key);
}
function getTable(key) {
    var prm = DBParams.create('sp_DesFormB01', 'GET_TABLE_NM');
    var tblnm = DBconnect.runProcedure(prm);
    tblnm_save = tblnm[0];
    grd.reconfigure(tblnm_save);
    if (key == 0) currentTable = tblnm_save.data.items[0].data.TABLE_KEY;
}
function getColumn(key) {
    var prm2 = DBParams.create('sp_DesFormB01', 'GET_COLUMN');
    prm2.addParam('TABLE_KEY', key);
    var column_detail = DBconnect.runProcedure(prm2);
    tbldetail_save = column_detail[0];
    grd_Detail.reconfigure(tbldetail_save);
}
function getExample(key) {//
    var prm3 = DBParams.create('sp_DesFormB01', 'GET_EXAMPLE');
    prm3.addParam('TABLE_KEY', key);
    var column_ex = DBconnect.runProcedure(prm3);
    example_save = column_ex[0];
    grd_Example.reconfigure(example_save);
    //prm3.addParam('COLUMN_NO', tbldetail_save.data.items[0].data.COLUMN_NO); 
}
grd.eButtonAddClick = function () {
    grd.addRow();
}
grd.eButtonDeleteClick = function () {
    var selectedRecords = grd.getSelectedRecords();
    var index = grd.getRowIndex(grd.getSelectedRecords()[0]);
    grd.deleteRow(selectedRecords);
    grd.setFocus(index - 1);
}
grd_Detail.eButtonAddClick = function () {
    grd_Detail.addRow();
    isUpdated = 1;
}
grd_Detail.eButtonDeleteClick = function () {
    var selectedRecords = grd_Detail.getSelectedRecords();
    var index = grd_Detail.getRowIndex(grd_Detail.getSelectedRecords()[0]);
    grd_Detail.deleteRow(selectedRecords);
    grd_Detail.setFocus(index - 1);
    isUpdated = 1;
}
grd_Detail.eUpdate = function (record, rowIndex, paramId) {
    isUpdated = 1;
}
grd_Example.eUpdate = function (record, rowIndex, paramId) {
    isUpdated = 1;
}
btn_SAVE.eClick = function () {
    dbSave();
}
function dbSave() {
    if (!isUpdated) return;

    var selectedRecords = grd.getSelectedRecords();

    for (var i = 0; i < selectedRecords.length; i++) {
        var pr = '';
        if (selectedRecords[i].get('TABLE_KEY') == undefined || selectedRecords[i].get('TABLE_KEY') == 0) {
            pr = DBParams.create('sp_DesFormB01', 'INSERT_H_TABLE');
        } else {
            pr = DBParams.create('sp_DesFormB01', 'UPDATE_H_TABLE');
            pr.addParam('TABLE_KEY', selectedRecords[i].get('TABLE_KEY'));
        }
        pr.addParam('TABLE_NM', selectedRecords[i].get('TABLE_NM'));

        var dbc = DBconnect.runProcedure(pr);
    }

    selectedRecords = grd_Detail.getSelectedRecords();

    for (var i = 0; i < selectedRecords.length; i++) {
        var pr = '';
        if (selectedRecords[i].get('COLUMN_NO') == undefined || selectedRecords[i].get('COLUMN_NO') == 0) {
            pr = DBParams.create('sp_DesFormB01', 'INSERT_D_TABLE');
        } else {
            pr = DBParams.create('sp_DesFormB01', 'UPDATE_D_TABLE');
            pr.addParam('COLUMN_NO', selectedRecords[i].get('COLUMN_NO'));
        }
        pr.addParam('TABLE_KEY', currentTable);
        pr.addParam('COLUMN_NM', selectedRecords[i].get('COLUMN_NM'));
        pr.addParam('DATA_TYPE', selectedRecords[i].get('DATA_TYPE'));
        pr.addParam('PRIMARY_CHECK', selectedRecords[i].get('PRIMARY_CHECK'));
        pr.addParam('NULL_CHECK', selectedRecords[i].get('NULL_CHECK'));

        var dbc = DBconnect.runProcedure(pr);
    }

    for (var i = 0; i < example_save.data.length; i++) {
        var pr = '';
        pr = DBParams.create('sp_DesFormB01', 'UPDATE_EX_TABLE');
        pr.addParam('COLUMN_NO', example_save.data.items[i].get('COLUMN_NO'));
        pr.addParam('EXAMPLE_ONE', example_save.data.items[i].get('EXAMPLE_ONE'));
        pr.addParam('EXAMPLE_TWO', example_save.data.items[i].get('EXAMPLE_TWO'));
        pr.addParam('EXAMPLE_THREE', example_save.data.items[i].get('EXAMPLE_THREE'));
        pr.addParam('EXAMPLE_FOUR', example_save.data.items[i].get('EXAMPLE_FOUR'));

        var dbc = DBconnect.runProcedure(pr);
    }

    var deletedRecords = grd.getDeletedRecords();
    for (var i = 0; i < deletedRecords.length; i++) {
        if (deletedRecords[i].get('TABLE_KEY') != undefined || deletedRecords[i].get('TABLE_KEY') != 0) {
            pr = DBParams.create('sp_DesFormB01', 'DELETE_H_TABLE');
            pr.addParam('TABLE_KEY', deletedRecords[i].get('TABLE_KEY'));
            ds = DBconnect.runProcedure(pr);
        }
    }
    deletedRecords = grd_Detail.getDeletedRecords();
    for (var i = 0; i < deletedRecords.length; i++) {
        if (deletedRecords[i].get('COLUMN_NO') != undefined || deletedRecords[i].get('COLUMN_NO') != 0) {
            pr = DBParams.create('sp_DesFormB01', 'DELETE_D_TABLE');
            pr.addParam('COLUMN_NO', deletedRecords[i].get('COLUMN_NO'));
            ds = DBconnect.runProcedure(pr);
        }
    }

    getTable(1);
    viewTable(currentTable);

    isUpdated = 0;
}

function msgSaveWarning(record) {
    Ext.Msg.show({
        message: '저장되지 않은 데이터는 삭제될 수 있습니다.\n저장 하시겠습니까?',
        buttons: Ext.Msg.YESNOCANCEL,
        icon: Ext.Msg.WARNING,
        fn: function (btn) {
            if (btn === 'yes') {
                dbSave();
                isUpdated = 0;
                if (record.data.TABLE_KEY == 0) {
                    pr = DBParams.create('sp_DesFormB01', 'ALLOC_H_TABLE');
                    ds = DBconnect.runProcedure(pr);
                    currentTable = ds[0].data.items[0].data.TABLE_KEY;
                    record.data.TABLE_KEY = currentTable;
                } else {
                    currentTable = record.data.TABLE_KEY;
                }
                viewTable(currentTable);
            } else if (btn == 'no') {
                isUpdated = 0;
                if (record.data.TABLE_KEY == 0) {
                    pr = DBParams.create('sp_DesFormB01', 'ALLOC_H_TABLE');
                    ds = DBconnect.runProcedure(pr);
                    currentTable = ds[0].data.items[0].data.TABLE_KEY;
                    record.data.TABLE_KEY = currentTable;
                } else {
                    currentTable = record.data.TABLE_KEY;
                }
                viewTable(currentTable);
            } else {
                //cancel
            }
        }
    });
}