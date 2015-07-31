/// <reference path="ext-all-debug.js" />
/*
    2015-07-28
    Team MasterPlan, J.Jobs was build it!
    This help other developer to making easy Ext js script.
*/
/*시스템 사용 temp*/
//테이블타겟용
var _tempTableTarget = '';
/*
    타겟을 지정하는 
*/
_setTarget = function (component) {
    _tempTableTarget.add(Ext.create('Ext.container.Container', {
        margin: '2 0 0 2',
        layout: {
            type: 'column'
        },
        items: [component]
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
};

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
};

//테이블
Ext.define('ApTable', {
    extend: 'Ext.panel.Panel',
    ComponentType: 'table'
});
ApTable.prototype.setTarget = function () {
    _tempTableTarget = this;
}
var ApTable = {
    create: function (colsize) {
        var _ApTable = Ext.create('ApTable', {
            layout:{
                type: 'table',
                columns : colsize
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
});
ApText.prototype.e = {
    focus: function () { },
    change: function (newValue, oldValue) { },
    keyDown: function (e) { }
};
var ApText = {
    create: function (label, paramId) {
        var _ApText = Ext.create('ApText', {
            labelWidth: 80,
            width: 180,
            fieldLabel: label,
            paramId: paramId
        });
        _ApText.on('afterrender', function (me, eOpts) {
            _ApText.on('focus', function (me, eOpts) {
                _ApText.e.focus();
            });
            _ApText.on('change', function (me, newValue, oldValue) {
                _ApText.e.change(newValue, oldValue);
            })
            _ApText.getEl().on('keydown', function (e, t, eOpts) {
                _ApText.e.keyDown(e);
            });
        });
        _setTarget(_ApText)
        return _ApText;
    }
}
//콤보박스
Ext.define('ApCombo', {
    extend: 'Ext.form.ComboBox',
    ComponentType: 'combo'
});
ApCombo.prototype.addItem = function (showValue, hideValue) {

    this.items.push({
        SHOWVALUE: showValue,
        HIDEVALUE: hideValue
    });
    var makeStore = Ext.create('Ext.data.Store', {
        fields: ['SHOWVALUE', 'HIDEVALUE'],
        data: this.items
    });
    this.bindStore(makeStore);
}
ApCombo.prototype.e = {
    focus: function () { },
    change: function (me) { },
    keyDown: function (e) { }
};
var ApCombo = {
    create: function (label, paramId) {
        var _ApCombo = Ext.create('ApCombo', {
            labelWidth: 80,
            width: 180,
            displayField: 'SHOWVALUE',
            fieldLabel: label,
            forceSelection: true,
            paramId: paramId,
            items: []
        });
        _ApCombo.on('afterrender', function (me, eOpts) {
            _ApCombo.on('focus', function (me, eOpts) {
                _ApCombo.e.focus();
            });
            _ApCombo.on('change', function (me, newValue, oldValue) {
                _ApCombo.e.change(newValue, oldValue);
            })
            _ApCombo.getEl().on('keydown', function (e, t, eOpts) {
                _ApCombo.e.keyDown(e);
            });
            _ApCombo.on('select', function (me, records, eOpts) {
                _ApCombo.e.change(me);
            });
        });
        _setTarget(_ApCombo)
        return _ApCombo;
    }
}

/*일반 컴포넌트*/