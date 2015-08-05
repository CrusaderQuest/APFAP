/// <reference path="../../Resource/Scripts/ext-all-debug.js" />
/// <reference path="../../Resource/Scripts/component.js" />
/// <reference path="../../Resource/Scripts/noncomponent.js" />
//

//View 단 정의 영역 시작

//Ext.onReady(function () {

//    Ext.define('MpPanel', {
//        extend: 'Ext.panel.Panel',
//        dataType: 'panel'
//    });
//});

//배치
//viewPanel.divideH(aa, bb);
////스타일설정
//aa.setWidth('40%');
//cc.setWidth(200);
//ee.setHeight('70%');
//aa.setCollapsible(true);

//var aa = ApPanel.create('첫번째 왼쪽');
//var bb = ApPanel.create('첫번째 오른쪽');
//var cc = ApPanel.create('첫번째 왼쪽의 자식 왼쪽');
//var dd = ApPanel.create('첫번째 왼쪽의 자식 오른쪽');
//var ee = ApPanel.create('첫번째 오른쪽의 자식 위쪽');
//var ff = ApPanel.create('첫번째 오른쪽의 자식 아래쪽');

//var table = ApTable.create(1);
//table.setTarget();

//var txt = ApText.create('거스바보');
//var txt2 = ApText.create('진성바보');
//var txt3 = ApText.create('창은바보');
//var txt4 = ApText.create('준희천재');
//var combo = ApCombo.create('준희2천재');
//combo.addItem('test', 'test1');
//combo.addItem('test2', 'test2');
//combo.addItem('test3', 'test3');
//viewPanel.full(table);

//왼쪽부분을 tree 형식으로 수정할 것 tree 형식 module 받아서 수정할 것임

var pnl_class_Design = ApPanel.create("Class Design");
var tbl_class_Design = ApTable.create(1);

tbl_class_Design.setTarget();

var txt_className = ApText.create("class 이름  ");
var txt_className1 = ApText.create("class 이름  ");
var txt_className2 = ApText.create("class 이름  ");
pnl_class_Design.full(tbl_class_Design);

var pnl_class_Description = ApPanel.create("Class Description");
var tbl_class_Description = ApTable.create(1);

tbl_class_Description.setTarget();

var cbo_class_Description = ApCombo.create("class 선택");
cbo_class_Description.addItem('gusClass', 'jinsungClass');
cbo_class_Description.addItem('junheeClass', 'jinsungClass');

//tbl_class_Description.setBodyStyle('background-color', '#0f00f0');
pnl_class_Description.full(tbl_class_Description);
//pnl_class_Description.setBodyStyle('background-color', '#ff0000');

viewPanel.divideH(pnl_class_Design, pnl_class_Description);
