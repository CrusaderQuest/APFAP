/// <reference path="ext-all-debug.js" />
/*
    2015-07-28
    Team MasterPlan, J.Jobs was build it!
    This help other developer to making easy Ext js script.
*/
/* 컴포넌트 정의시 사용되는 내부로직 *****************************************/
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


/* 레이아웃 관련 컴포넌트 ****************************************************/

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
//탭
Ext.define('ApTab', {
    extend: 'Ext.tab.Panel',
    ComponentType: 'tab'
});

ApTab.prototype.eTabchange = function (tabPanel, newCard) {

};
var ApTab = {
    create: function () {
        var _tab = Ext.create('ApTab', {
            listeners: {
                tabchange: function (tabPanel, newCard) {
                    eTabchange(tabPanel, newCard);
                }
            }
        });
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

/* 그리드 컴포넌트 **********************************************************/
Ext.define('ApGrid', {
    extend: 'Ext.grid.Panel',
    ComponentType : 'grid'
})
ApGrid.prototype.addColumn = function (type, columnText, paramId, width, align) {
    var columnType = null;
    if (width == undefined) {
        width = 200;
    }
    switch (type) {
        case 'text':
            columnType = Ext.create('Ext.grid.column.Column', {
                text: columnText,
                xtype: 'textcolumn',
                dataIndex: paramId,
                align: 'center',
                width: width,
                editor: {
                    xtype: 'textfield',
                    align: 'left',
                }

            });
            break;
        case 'num':
            columnType = Ext.create('Ext.grid.column.Column', {
                text: columnText,
                xtype: 'numbercolumn',
                dataIndex: paramId,
                width: width,
                align: 'center',
                editor: {
                    xtype: 'numberfield',
                    align: 'right',
                    allowBlank: false,
                    minValue: 0,
                    maxValue: 100000
                }
            });
            break;
        case 'date':
            columnType = Ext.create('Ext.grid.column.Column', {
                text: columnText,
                xtype: 'datecolumn',
                format: 'Y-m-d',
                dataIndex: paramId,
                width: width,
                align: 'center',
                sortable: true,
                renderer: Ext.util.Format.dateRenderer('Y-m-d'),
                editor: {
                    xtype: 'datefield',
                    format: 'Y-m-d'
                }
            });
            break;
        case 'check':
            columnType = Ext.create('Ext.grid.column.Column', {
                text: columnText,
                xtype: 'checkcolumn',
                width: width,
                dataIndex: paramId,
                align: 'center',
                trueText: 'Yes',
                falseText: 'No',
                align: 'center',
                editor: {
                    xtype: 'checkfield',
                    selectOnFocus: true,
                }
            });
            break;
        case 'combo':
            columnType = Ext.create('Ext.grid.column.Column', {
                text: columnText,
                width: width,
                dataIndex: paramId[0],
                align: 'center',
                //store: comboStore,
                //renderer: Ext.util.Format.usMoney,
                editor: {
                    xtype: 'combobox',
                    displayField: 'SHOWDATA',
                    valueField: 'SHOWDATA',
                    store: paramId[1],
                }
            });
            break;
    }
    this.headerCt.insert(this.columns.length-2, columnType);
    this.getView().refresh();
}
ApGrid.prototype.eFocus = function () {
    console.log('focus');
};
ApGrid.prototype.eChange = function (newValue, oldValue) {
    console.log('change');
};
ApGrid.prototype.eKeyDown = function (e) {
    console.log('KeyDown');
}
var ApGrid = {
    create: function () {
        var _ApGrid = Ext.create('ApGrid', {
            //store: store,
            width: 550,
            title: 'TEST',
            border: 1,
            selModel: Ext.create('Ext.selection.CheckboxModel'),
            columns: [Ext.create('Ext.grid.RowNumberer')],
            plugins: [Ext.create('Ext.grid.plugin.CellEditing', {
                clicksToEdit: 2
            })]
        })
        _ApGrid.on('afterrender', function (me, eOpts) {
            _ApGrid.on('focus', function (me, eOpts) {
                _ApGrid.eFocus();
            });
            _ApGrid.on('change', function (me, newValue, oldValue) {
                _ApGrid.eChange(newValue, oldValue);
            })
            _ApGrid.getEl().on('keydown', function (e, t, eOpts) {
                _ApGrid.eKeyDown(e);
            });
        });
        return _ApGrid;
    }
}
/* 일반 컴포넌트 ************************************************************/
//텍스트박스
Ext.define('ApText', {
    extend: 'Ext.form.field.Text',
    ComponentType: 'text'
});
ApText.prototype.eFocus = function(){
};
ApText.prototype.eChange = function (newValue, oldValue) {
};
ApText.prototype.eKeyDown = function (e) {

}
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
                _ApText.eFocus();
            });
            _ApText.on('change', function (me, newValue, oldValue) {
                _ApText.eChange(newValue, oldValue);
            })
            _ApText.getEl().on('keydown', function (e, t, eOpts) {
                _ApText.eKeyDown(e);
            });
        });
        _setTarget(_ApText);
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
ApCombo.prototype.eFocus = function () {
};
ApCombo.prototype.eChange = function (me) {
};
ApCombo.prototype.eKeyDown = function (e) {
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
                _ApCombo.eFocus();
            });
            _ApCombo.getEl().on('keydown', function (e, t, eOpts) {
                _ApCombo.eKeyDown(e);
            });
            _ApCombo.on('select', function (me, records, eOpts) {
                _ApCombo.eChange(me);
            });
        });
        _setTarget(_ApCombo);
        return _ApCombo;
    }
}
//버튼
Ext.define('ApButton', {
    extend: 'Ext.button.Button',
    ComponentType: 'button'
});
ApButton.prototype.eClick = function () {
};
var ApButton = {
    create: function (text, paramId) {
        var _ApButton = Ext.create('ApButton', {
            labelWidth: 80,
            text : text,
            width: 180,
            fieldLabel: label,
            paramId: paramId
        });
        _ApButton.on('afterrender', function (me, eOpts) {
            _ApButton.on('click', function (me, eOpts) {
                _ApButton.eClick();
            });
        });
        _setTarget(_ApButton)
        return _ApButton;
    }
}

/*일반 컴포넌트*/
