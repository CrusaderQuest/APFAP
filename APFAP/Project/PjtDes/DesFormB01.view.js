/// <reference path="../../Resource/Scripts/ext-all-debug.js" />
/// <reference path="../../Resource/Scripts/component.js" />
/// <reference path="../../Resource/Scripts/noncomponent.js" />
//

//View 단 정의 영역 시작
//data Base 설계 부분 
var pnl_DBname = ApPanel.create('table Name');
Ext.define('tableName', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'tableName' },
    ]
});

var gridData_table_name = Ext.create('Ext.data.ArrayStore', {
    model: 'tableName',
    data: [
        ['gusTable'], ['jinsungTable'], ['junheeTable'], ['giniTable']
    ]
});

var grd = ApGrid.create();
grd.addColumn('text', 'table Name', 'tableName', 195);
grd.reconfigure(gridData_table_name);

pnl_DBname.full(grd);



var pnl_DBdetail = ApPanel.create('table Detail');

Ext.define('tableDetail', {
    extend: 'Ext.data.Model',

    fields: [
        { name: 'columnName' },
        { name: 'dataType' },
        { name: 'primaryKey', type: 'boolean' },
        { name: 'nullCheck', type: 'boolean' },
        { name: 'summary' },
        { name: 'example_1' },
        { name: 'example_2' },
        { name: 'example_3' },
        { name: 'example_4' },
    ]
});

var gridData = Ext.create('Ext.data.ArrayStore', {
    model: 'tableDetail',
    data: [
        ['gusColumn', 'varchar(12)', true, false, '거스컬럼', 'K000000000000', 'K000000000000', 'K000000000000', 'K000000000000'],
        ['jinsungColumn', 'varchar(12)', true, false, '진성컬럼', 'K000000000000', 'K000000000000', 'K000000000000', 'K000000000000'],
        ['junheeColumn', 'varchar(MAX)', false, true, '준희컬럼', 'K000000000000', 'K000000000000', 'K000000000000', 'K000000000000'],
        ['giniColumn', 'varchar(12)', false, true, '기니컬럼', 'K000000000000', 'K000000000000', 'K000000000000', 'K000000000000']
    ]
});
var gridData_second = Ext.create('Ext.data.ArrayStore', {
    model: 'tableDetail',
    data: [
        ['유진성', 'varchar(12)', true, false, '거스컬럼', 'K000000000000', 'K000000000000', 'K000000000000', 'K000000000000'],
        ['핵바보', 'varchar(12)', true, false, '진성컬럼', 'K000000000000', 'K000000000000', 'K000000000000', 'K000000000000'],
        ['발냄새', 'varchar(MAX)', false, true, '준희컬럼', 'K000000000000', 'K000000000000', 'K000000000000', 'K000000000000'],
        ['꿀꿀이', 'varchar(12)', false, true, '기니컬럼', 'K000000000000', 'K000000000000', 'K000000000000', 'K000000000000']
    ]
});

var grd_Detail = ApGrid.create();
grd_Detail.addColumn('text', 'column Name', 'columnName', 100);
grd_Detail.addColumn('text', 'data Type', 'dataType', 100);
grd_Detail.addColumn('check', 'primary Key', 'primaryKey', 100);
grd_Detail.addColumn('check', 'null check', 'nullCheck', 100);

grd_Detail.reconfigure(gridData);
/////////////////////////////////////////////////////

Ext.define('tableExample', {
    extend: 'Ext.data.Model',

    fields: [
        { name: 'example_1' },
        { name: 'example_2' },
        { name: 'example_3' },
        { name: 'example_4' },
    ]
});

var gridData_example = Ext.create('Ext.data.ArrayStore', {
    model: 'tableExample',
    data: [
        ['K000000000000', 'K000000000000', 'K000000000000', 'K000000000000'],
        ['K000000000000', 'K000000000000', 'K000000000000', 'K000000000000'],
        ['K000000000000', 'K000000000000', 'K000000000000', 'K000000000000'],
        ['K000000000000', 'K000000000000', 'K000000000000', 'K000000000000']
    ]
});
var gridData_example2 = Ext.create('Ext.data.ArrayStore', {
    model: 'tableExample',
    data: [
        ['이거이제', 'K000000000000', 'K000000000000', 'K000000000000'],
        ['같이바끼지롱', 'K000000000000', 'K000000000000', 'K000000000000'],
        ['K000000000000', 'K000000000000', 'K000000000000', 'K000000000000'],
        ['K000000000000', 'K000000000000', 'K000000000000', 'K000000000000']
    ]
});

var grd_Example = ApGrid.create();
grd_Example.addColumn('text', 'gusColumn', 'example_1', 100);
grd_Example.addColumn('text', 'jinsungColumn', 'example_2', 100);
grd_Example.addColumn('text', 'junheeColumn', 'example_3', 100);
grd_Example.addColumn('text', 'giniColumn', 'example_4', 100);

grd_Example.reconfigure(gridData_example);


pnl_DBdetail.divideV(grd_Detail, grd_Example);



viewPanel.divideH(pnl_DBname, pnl_DBdetail);
pnl_DBname.setWidth(250);