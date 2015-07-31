/// <reference path="../../Resource/Scripts/ext-all-debug.js" />
/// <reference path="../../Resource/Scripts/component.js" />
/// <reference path="../../Resource/Scripts/noncomponent.js" />
//

//View 단 정의 영역 시작

var aa = ApPanel.create('첫번째 왼쪽');
var bb = ApPanel.create('첫번째 오른쪽');
var cc = ApPanel.create('첫번째 왼쪽의 자식 왼쪽');
var dd = ApPanel.create('첫번째 왼쪽의 자식 오른쪽');
var ee = ApPanel.create('첫번째 오른쪽의 자식 위쪽');
var ff = ApPanel.create('첫번째 오른쪽의 자식 아래쪽');
//배치
//viewPanel.divideH(aa, bb);
////스타일설정
//aa.setWidth('40%');
//cc.setWidth(200);
//ee.setHeight('70%');
//aa.setCollapsible(true);

var table = ApTable.create(1);
table.setTarget();

var txt = ApText.create('거스바보');
var txt2 = ApText.create('진성바보');
var txt3 = ApText.create('창은바보');
var txt4 = ApText.create('준희천재');
var combo = ApCombo.create('준희2천재');
combo.addItem('test', 'test1');
combo.addItem('test2', 'test2');
combo.addItem('test3', 'test3');
viewPanel.full(table);
txt.e.change = function () {

}