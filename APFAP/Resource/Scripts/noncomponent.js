
//Global value

//Global function

//Ready function start!

var viewPanel = ApPanel.create('컨텐츠전체영역');
var viewPort = '';

Ext.onReady(function () {

    viewPort = Ext.create('Ext.container.Viewport', {
        layout: 'border',
        border: 0,
        items: [viewPanel]
    });

});