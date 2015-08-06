/// <reference path="../../Resource/Scripts/ext-all-debug.js" />
/// <reference path="../../Resource/Scripts/component.js" />
/// <reference path="../../Resource/Scripts/noncomponent.js" />
//

//View 단 정의 영역 시작
//DATA BASE 설계쪽인데 아직 flow chart 가 완성안됬기 때문에 디자인 안했음
//Ext.require('Ext.draw.Component');
var drawComponent = Ext.create('Ext.draw.Container', {
    width: 200,
    height: 200,
    sprites: [{
        type: 'circle',
        fillStyle: '#79BB3F',
        r: 100,
        x: 100,
        y: 100
    }]
});
var gus = ApPanel.create('gus');
var tab = ApTab.create();
tab.addTab('하이').full(drawComponent);
tab.addTab('헬로우');
tab.addTab('안녕');
viewPanel.full(tab)