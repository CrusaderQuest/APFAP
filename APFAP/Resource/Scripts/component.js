/// <reference path="ext-all-debug.js" />
/*
    2015-07-28
    Team MasterPlan, J.Jobs was build it!
    This help other developer to making easy Ext js script.
*/
/*시스템 사용 temp*/
//테이블타겟용
var _tempTableTarget = '';

_setTarget = function (component) {
    _tempTableTarget.add(Ext.create('Ext.container.Container', {
        margin: '2 0 0 2',
        layout: {
            type: 'column'
        },
        items: [CmComponent]
    }))
}


/*레이아웃 관련 컴포넌트*/

//패널
Ext.define('ApPanel', {
    extend: 'Ext.panel.Panel',
    dataType: 'panel',
    layout: 'fit',
    height: '100%',
    width: '100%',
    border:1
});
ApPanel.prototype.full = function (panel) {
    this.add(panel)
}
/*
    @brief : 가로 분할
    @param : (패널1, 패널2, 붙일 패널)
*/
ApPanel.prototype.divideH = function (panel1, panel2, panel) {

    this.setLayout('border');

    if (panel == undefined || panel == panel1) {
        panel1.setRegion('west');
        panel1.setWidth('50%');
        panel2.setRegion('center');
    } else {
        panel2.setRegion('east');
        panel2.setWidth('50%');
        panel1.setRegion('center');
    }
    this.add(panel1);
    this.add(panel2);
}
/*
    @brief : 세로 분할
    @param : (패널1, 패널2, 붙일 패널)
*/
ApPanel.prototype.divideV = function (panel1, panel2, panel) {

    this.setLayout('border');
    if (panel == undefined) {
        panel = panel1;
    }
    if (panel1 == panel) {
        panel1.setRegion('north');
        panel1.setHeight('50%');
        panel1.setCollapsible(true)
        panel2.setRegion('center');
    } else {
        panel2.setRegion('south');
        panel2.setHeight('50%');
        panel1.setRegion('center');
    }
    
    this.add(panel1);
    this.add(panel2);
}

var ApPanel = {
    create: function (title) {
        var _panel = Ext.create('ApPanel', {
            ComponentType: 'Panel',
            region: 'center',
            flex: false,
            region: 'center',
            collapsible: false,
            title: title,
        })
        return _panel;
    }
}

//테이블
Ext.define('ApTable', {
    extend: 'Ext.panel.Panel',
    ComponentType: 'table'
})
ApTable.prototype.setTarget = function () {
    _tempTableTarget = this;
}
var ApTable = {
    create: function (colsize) {
        var _ApTable = Ext.create('ApTable', {
            layout:{
                type: 'table',
                column : colsize
            },
            region: 'center',
            items: []
        });
        return _ApTable;
    }
}
//텍스트박스
Ext.define('ApText', {
    extend: 'Ext.form.field.Text',
    ComponentType: 'text'
})
ApText.prototype.e = {
    focus: function () { },
    change: function (newValue, oldValue) { },
    keydown: function (e) { }
}
var ApText = {
    create: function (text, paramId) {
        var _ApText = Ext.create('ApText', {
            labelWidth: 80,
            width: 180,
            fieldLabel: text
        });
        _ApText.on('afterrender', function (me, eOpts) {
            _ApText.getEl().on('focus', function (me, eOpts) {
                ApText.e.focus();
            });
            _ApText.getEl().on('change', function (me, eOpts) {
                ApText.e.change(newValue, oldValue);
            })
            _ApText.getEl().on('keydown', function (e, t, eOpts) {
                _CmText.e.KeyDown(e);
            });
        });
        return _ApText;
    }
}

/*일반 컴포넌트*/