/// <reference path="../../Resource/Scripts/ext-all-debug.js" />
/// <reference path="../../Resource/Scripts/component.js" />
/// <reference path="../../Resource/Scripts/noncomponent.js" />
//

//View 단 정의 영역 시작

//var aa = ApPanel.create('첫번째 왼쪽');
//var bb = ApPanel.create('첫번째 오른쪽');
//var cc = ApPanel.create('첫번째 왼쪽의 자식 왼쪽');
//var dd = ApPanel.create('첫번째 왼쪽의 자식 오른쪽');
//var ee = ApPanel.create('첫번째 오른쪽의 자식 위쪽');
//var ff = ApPanel.create('첫번째 오른쪽의 자식 아래쪽');
//배치
//viewPanel.divideH(aa, bb);
////스타일설정
//aa.setWidth('40%');
//cc.setWidth(200);
//ee.setHeight('70%');
//aa.setCollapsible(true);
//var comboStore = Ext.create('Ext.data.ArrayStore', {
//    fields: ['HIDEDATA', 'SHOWDATA'],
//    data: [
//        ['aa', 'AAA'],
//        ['bb', 'BBB'],
//        ['cc', 'CCC'],
//        ['dd', 'DDD'],
//        ['ee', 'EEEE']
//    ]
//});

//Ext.define('testData', {
//    extend: 'Ext.data.Model',
//    fields: [
//        { name: 'USERID' },
//        { name: 'CHECK', type: 'boolean' },
//        { name: 'DATE', type: 'date', dateFormat: 'Y-m-d' },
//        { name: 'SEQ', type: 'number' },
//        { name: 'COMBO' }
//    ]
//});
//var gridData = Ext.create('Ext.data.ArrayStore', {
//    model: 'testData',
//    data: [
//        ['aaa1', false, '2015-07-29', 30.24, 'AAA'],
//        ['aaa2', false, '2015-07-29', 30.24,'BBB'],
//        ['aaa3', true, '2015-07-29', 30.24,'CCC'],
//        ['aaa4', true, '2015-07-29', 30.24, 'AAA'],
//        ['aaa5', false, '2015-07-29', 30.24, 'AAA'],
//        ['aaa6', false, '2015-07-29', 30.24, 'BBB'],
//    ]
//});
//var grd = ApGrid.create();
//grd.addColumn('text', '텍스트', 'USERID', 200);
//grd.addColumn('num', '넘버', 'SEQ', 200);
//grd.addColumn('date', '날짜', 'DATE', 200);
//grd.addColumn('check', '체크', 'CHECK', 200);
//grd.addColumn('combo', '콤보', ['COMBO', comboStore], 200);
//grd.reconfigure(gridData);
//viewPanel.full(grd);
