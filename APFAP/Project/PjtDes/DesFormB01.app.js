/// <reference path="../../Resource/Script/ext-all-debug.js" />
/// <reference path="../../Resource/Script/component.js" />
/// <reference path="../../Resource/Script/noncomponent.js" />
/// <reference path="DesFormB01.view.js" />

//App 단 정의 영역 시작
grd.eSelectionChange = function (record, rowindex, paramId) {
    if (rowindex == 2) {
        console.log('2번row index 클릭!');
        grd_Detail.reconfigure(gridData_second);
        grd_Example.reconfigure(gridData_example2);
        btn_insert.eClick = function () {
            gridData_second.add("''");
        }
        console.log(grd.getRow(2));
        txt_test.setValue(grd.getRow(2).data.tableName);
    }
    if (rowindex == 1) {
        console.log('1번row index 클릭!');
        grd_Detail.reconfigure(gridData);
        grd_Example.reconfigure(gridData_example);

        btn_insert.eClick = function () {
            gridData.add("''");
        }
    }
}

btn_delete.eClick = function () {
    gridData.remove(grd_Detail.getSelection());
    gridData_second.remove(grd_Detail.getSelection());
}