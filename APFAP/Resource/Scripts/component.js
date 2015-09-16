﻿/// <reference path="ext-all-debug.js" />
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
    component.setMargin('0 0 0 5');
    _tempTableTarget.add(Ext.create('Ext.container.Container', {
        margin: '2 0 2 2',
        layout: {
            type: 'column'
        },
        items: [component]
    }))
    _tempTableTarget.itemLength++;
}

Ext.define('ApMapArray', {
    key: [],
    value: []
})
ApMapArray.prototype.clear = function () {
    this.key = [];
    this.value = [];
}
ApMapArray.prototype.setValue = function (key, value) {
    this.key.push(key);
    this.value.push(value);
}
ApMapArray.prototype.getValue = function (key) {
    var index = this.key.indexOf(key);
    if (index != -1)
        return this.value[index];
}
ApMapArray.prototype.remove = function (key) {
    var index = this.key.indexOf(key);
    if (index != -1) {
        this.keys.splice(index, 1);
        this.values.splice(index, 1);
    }
}

var ApMapArray = {
    create: function () {
        var _ApMapArray = Ext.create('ApMapArray');
        _ApMapArray.clear();
        return _ApMapArray;
    }
}


function getUrlNode(level, text, url, leaf, expanded) {
    if (level == undefined) {
        return console.error('Level is not defined.')
    };
    if (text == undefined) {
        text = 'I have no text.';
    };
    if (url == undefined) {
        url = 'juneheepark';
    };
    if (leaf == undefined) {
        leaf = false;
    };
    if (expanded == undefined) {
        expanded = false;
    };
    return {
        children: [],
        leaf: leaf,
        level: level,
        text: text,
        hrefTarget: url,
        expanded: expanded
    };
}
function getNode(text, leaf, expanded, check) {
    if (text == undefined || text == "") { text = '빈노드'; };
    if (leaf == undefined || leaf == "") { leaf = undefined };
    if (expanded == undefined || expanded == "") { expanded = true; };
    var node = {
        children: [],
        leaf: leaf,
        text: text,
        value: ApMapArray.create(),
        expanded: expanded
    };
    if (check != undefined && check != "") {
        node.checked = check;
    } else if (check == false) {
        node.checked = false;
    };
    return node;
}
//메세지 처리
var ApMsg = {
    warning : function (text, callback) {
        Ext.Msg.show({
        message: text,
        icon: Ext.Msg.WARNING,
        buttonText: {
            yes : '확인'
        },
        fn : callback
        })
    }
}

//스토어 단 루트 보이기 숨기기 옵션 추가
Ext.define('ApTreeStore', {
    extend: 'Ext.data.TreeStore',
    root: {
        expanded: true,
        children: []
    }
});

ApTreeStore.prototype.addNode = function (parentNode, node) {
    if (parentNode == undefined || parentNode == '') {
        parentNode = this.getRootNode();
    };
    parentNode.appendChild(node);
};


ApTreeStore.prototype.insertNode = function (parentNode, index, node) {
    parentNode.insertChild(index, node);
};

ApTreeStore.prototype.removeNode = function (node) {
    if (node == "") {
        return;
    } else {
        target = node.parentNode;
        target.removeChild(node);
    };
};

//ApTreeStore.prototype.setData = function (node, field, data) {
//    //node.set('text', 'help') store 데이터 변경
//    node.set(field, data);
//};

ApTreeStore.prototype.replaceNode = function (newChild, oldChild, mode) {

    var parentNode = oldChild.parentNode
    if (oldChild.data.index == -1) {
        return;
    };
    if (mode == 'straight') {
        oldChild = parentNode.replaceChild(newChild, oldChild);
        parentNode.insertChild(newChild.data.index + 1, oldChild);
    } else if (mode == 'back') {
        oldChild = parentNode.replaceChild(newChild, oldChild);
        parentNode.insertChild(newChild.data.index, oldChild);
    };
};

//트리 스토어
var ApTreeStore = {
    create: function (rootText) {
        if (rootText == undefined)
            rootText = "";
        var store = Ext.create('ApTreeStore', {
        });
        store.root.text = rootText;
        return store;
    }
};
//트리 모듈
Ext.define('ApTree', {
    extend: 'Ext.tree.Panel',
    componentTree: 'tree'
});
ApTree.prototype.eContextMenu = function (x, y, width, height) { };
ApTree.prototype.eEnter = function (s, r) { };
ApTree.prototype.eClick = function (node) { };
ApTree.prototype.eSelectionChange = function (node) { };
ApTree.prototype.eDbclick = function (node) { };
ApTree.prototype.eExpand = function (s) { };
ApTree.prototype.eCollapse = function (s) { };
ApTree.prototype.setFocus = function (key, value) {
    var index = this.view.getStore().findBy(function (re, id) {
        if (re.raw.value.getValue(key) == value) {
            return true;
        }
    })
    if (index == -1) index = 0;
    this.getSelectionModel().select(index);//포커스이동
};
ApTree.prototype.getIndex = function (key, value) {
    var index = this.view.getStore().findBy(function (re, id) {
        if (re.raw.value.getValue(key) == value) {
            return true;
        }
    });
    return index;
};
ApTree.prototype.addNode = function (node, parentNode) {
    //타겟이 없을경우
    var length = 0;
    if (node.leaf == undefined) {
        node.leaf = true;
    };
    if (parentNode == undefined || parentNode == null) {
        var parentNode;
        //루트 레벨
        if (this.selected == "" || this.selected == undefined) {
            this.store.addNode(parentNode, node);
            if (this.rootVisible == true) {
                length = this.store.root.childNodes.length
            } else {
                length = this.store.root.childNodes.length - 1
            };
            this.getSelectionModel().select(length);
            //선택레벨
        } else {
            parentNode = this.selected.parentNode;
            index = this.selected.data.index + 1;
            this.store.insertNode(parentNode, index, node);

            var record = this.getSelectionModel().lastSelected
            if (record != undefined) {
                if (record.childNodes.length == 0) {
                    this.getSelectionModel().selectNext(node);
                } else {
                    record.cascadeBy(function (childNode) {
                        childNode.expand();
                    })
                    record.cascadeBy(function (childNode) {
                        this.getSelectionModel().selectNext(node);
                    }, this);
                };
            };
        };
    } else {
        parentNode.set('leaf', false);
        if (parentNode.childNodes.length == 0) {
            this.store.addNode(parentNode, node);
            parentNode.expand();
            this.getSelectionModel().selectNext();

        } else {
            var depth = parentNode.childNodes[0].data.depth
            parentNode.cascadeBy(function (childNode) {
                childNode.expand();
            });
            parentNode.cascadeBy(function (childNode) {
                if (childNode.data.depth == depth || childNode.data.index == parentNode.childNodes.length - 1) return;
                this.getSelectionModel().selectNext(node);
            }, this);
        };
    };

    this.selected = this.getSelectionModel().lastSelected;
};

ApTree.prototype.removeNode = function (node) {
    if (this.getRootNode().childNodes.length > 0) {

        if (this.selected.childNodes.length != 0) {
        } else {

        };
        if (this.getSelectionModel().selectPrevious(this.getSelectionModel().lastSelected)) {
            this.store.removeNode(node);
        } else {
            this.getSelectionModel().selectNext();
            this.store.removeNode(node);
        };
        this.selected = this.getSelectionModel().lastSelected
        if (this.getSelectionModel().lastSelected.childNodes.length == 0) {
            this.getSelectionModel().lastSelected.set('leaf', true);
        }
    } else {
        return false;
    };
};

ApTree.prototype.bindNode = function (node, depth, expended) {
    var parentNode = this.getRootNode();
    if (depth == 1) {
        parentNode.appendChild(node);
        if (undefined == this.getRootNode().childNodes[0]) {
            this.node[noedeIndex].leaf = true;
        };

    } else {
        var deepCount = depth - 1;
        for (var i = 0 ; i < deepCount ; i++) {

            if (i == 0) {
                parentNode = this.getRootNode().childNodes[this.getRootNode().childNodes.length - 1];
            }
            else {
                if (parentNode.childNodes.length > 0) {
                    parentNode = parentNode.childNodes[parentNode.childNodes.length - 1];
                };
            };
        };
        //parentNodeNode.leaf = false;
        parentNode.appendChild(node);
        if (expended == true) {
            parentNode.expand();
        } else {
            parentNode.collapse();
        };
    };
};

// getNode
ApTree.prototype.getNode = function (key, value) {
    var parentNode = this.getRootNode();
    parentNode.cascadeBy(function (childNode) {
        childNode.expand();
    });
    parentNode.cascadeBy(function (childNode) {
        if (childNode.raw.value.keys == key && childNode.raw.value.values == value) {
            return childNode;
        };
    }, this);
};

ApTree.prototype.clear = function () {
    this.getRootNode().removeAll();
    this.selected = '';
};
ApTree.prototype.upNode = function (node) {
    var index = node.data.index - 1;
    if (index >= 0) {
        var oldNode = node.parentNode.getChildAt(index);
        this.store.replaceNode(node, oldNode, 'straight');
    };
};

ApTree.prototype.downNode = function (node) {
    var index = node.data.index + 1
    if (index <= node.parentNode.childNodes.length - 1) {
        var oldNode = node.parentNode.getChildAt(index);
        this.store.replaceNode(node, oldNode, 'back');
    };
};

ApTree.prototype.allMember = function () {
    var everyNodes = [];
    this.getRootNode().cascadeBy(function (childNode) {
        everyNodes.push(childNode.raw);
    }, this);
    return everyNodes;
};
var ApTree = {
    store: '',
    frame: false,
    create: function (title, store, editable, rootVisible) {
        if (store != undefined && store != "") {
            this.store = store;
        } else {
            this.store = ApTreeStore.create('Root');
        };
        //트리 더블클릭시 오류 때문에 editable false이면 플러그인안넣도록 수정
        var plug_in = '';
        if (editable) plug_in = 'cellediting';
        if (editable == undefined || editable == "" || editable == false) {
            editable = '';
        } else {
            editable = [{
                xtype: 'treecolumn',
                dataIndex: 'text',
                flex: 1,
                editor: {
                    xtype: 'textfield',
                    allowBlank: false,
                    allowOnlyWhitespace: false
                }
            }];
        };
        if (rootVisible == undefined || rootVisible == "") {
            rootVisible = false;
        } else {
            rootVisible = true;
        };

        var _ApTree = Ext.create('ApTree', {
            title: title,
            store: ApTree.store,
            rootVisible: rootVisible,
            selected: '',
            plugins: plug_in,
            hideHeaders: true,
            useArrows: true,
            columns: editable,
            cls: '',
            frame: ApTree.frame
        });

        _ApTree.on('afterrender', function (me, eOpts) {
            _ApTree.on('itemdblclick', function (s, r, a, b, e) {
                _ApTree.selected = r;
                _ApTree.eDbclick(r.data);
            });
            _ApTree.on('itemclick', function (s, r) {
                _ApTree.selected = r;
                _ApTree.eClick(r.data);
            });
            _ApTree.on('checkchange', function (node, checked, eOpts) {
                node.cascadeBy(function (node) {
                    node.set('checked', checked);
                });
            });
            _ApTree.on('selectionchange', function (node, selected, eOpts) {
                _ApTree.eSelectionChange(selected);
            });
            _ApTree.getEl().on('contextmenu', function (e, t, eOpts) {
                var inputX = _ApTree.getEl().getX();
                var inputY = _ApTree.getEl().getY();
                var inputW = _ApTree.getEl().getWidth();
                var inputH = _ApTree.getEl().getHeight();
                _ApTree.eContextMenu(inputX, inputY, inputW, inputH);
                e.stopEvent();
            });
            _ApTree.on('itemexpand', function (me, eOpts) {
                _ApTree.eExpand(me);
            });

            _ApTree.on('itemcollapse', function (me, eOpts) {
                _ApTree.eCollapse(me);
            });
            _ApTree.on('beforecellkeydown', function (me, td, cellIndex, record, tr, rowIndex, e, eOpts) {
                if (e.button == 12) {
                    _ApTree.eEnter(record, e);
                };
            });
        });
        return _ApTree;
    }
};


/* 레이아웃 관련 컴포넌트 ****************************************************/

Ext.define('ApTab', {
    extend: 'Ext.tab.Panel',
    ComponentType: 'tab'
});
/*
    @parent : ApTab
    @brief : 탭변경 이벤트
    @param : (이전탭, 변경된 탭)
*/
ApTab.prototype.eTabchange = function (tabPanel, newCard) {
};
/*
    @parent : ApTab
    @brief : 탭추가 함수
    @param : (타이틀)
*/
ApTab.prototype.addTab = function (title, closable) {
    if (closable == undefined) closable = false;
    var _tabPage = ApPanel.create();
    _tabPage.title = title;
    _tabPage.tabConfig = { xtype: 'tab', width: this.tabWidth, closable: closable };
    this.add(_tabPage);
    this.setActiveTab(0);
    return _tabPage;
};
/*
    @parent : ApTab
    @brief : 해당인덱스 탭을 가져오는 함수
    @param : (인덱스)
*/
ApTab.prototype.getTab = function (index) {
    return this.items.items[index];
};
/*
    @parent : ApTab
    @brief : ApTab 생성자
    @param : ()
*/
var ApTab = {
    create: function () {
        var _tab = Ext.create('ApTab', {
            listeners: {
                tabchange: function (tabPanel, newCard) {
                    this.eTabchange(tabPanel, newCard);
                }
            }
        });
        return _tab;
    }
};

//패널
Ext.define('ApPanel', {
    extend: 'Ext.panel.Panel',
    dataType: 'panel',
    layout: 'fit',
    height: '100%',
    width: '100%',
    border: 1
});
ApPanel.prototype.full = function (panel) {
    this.add(panel)
};
/*
    @brief : 가로 분할
    @param : (패널1, 패널2, 붙일 패널)
*/
ApPanel.prototype.divideH = function (panel1, panel2, panel) {

    this.setLayout('border');
    if (panel == undefined || panel == panel1) {
        panel = panel1;
    }
    if (panel == undefined || panel == panel1) {
        panel1.setRegion('west');
        panel2.setRegion('center');
    } else {
        panel2.setRegion('east');
        panel1.setRegion('center');
    }
    this.add(panel1);
    panel.width = '50%';
    this.add(panel2);
}
/*
    @brief : 세로 분할
    @param : (패널1, 패널2, 붙일 패널)
*/
ApPanel.prototype.divideV = function (panel1, panel2, panel) {

    this.setLayout('border');
    if (panel == undefined || panel == panel1) {
        panel = panel1;
    }
    if (panel1 == panel) {
        panel1.setRegion('north');
        panel2.setRegion('center');
        //panel1.setCollapsible(true);
    } else {
        panel1.setRegion('center');
        panel2.setRegion('south');
    }
    panel.height = '50%';

    this.full(panel1);
    this.full(panel2);
};

var ApPanel = {
    create: function (title) {
        var _panel = Ext.create('ApPanel', {
            ComponentType: 'Panel',
            region: 'center',
            flex: false,
            header: false,
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
};
ApTable.prototype.setStyleSearch = function () {
    this.addCls('tableStyle_search');
    this.updateLayout();
}
ApTable.prototype.cellShare = function (count) {
    for (var i = 1 ; i < count ; i++) {
        var _Shareitem = _tempTableTarget.items.items[_tempTableTarget.itemLength - count + 1].items.items[0];
        _tempTableTarget.items.items[_tempTableTarget.itemLength - count].add(_Shareitem);
        _tempTableTarget.remove(_tempTableTarget.items.items[_tempTableTarget.itemLength - count + 1]);
    }
    for (var i = 1 ; i < count ; i++) {
        _tempTableTarget.itemLength--;
    }
};
var ApTable = {
    create: function (colSize) {
        var _ApTable = Ext.create('ApTable', {
            layout: {
                type: 'table',
                columns: colSize
            },
            region: 'center',
            items: [],
            itemLength: 0
        });
        return _ApTable;
    }
}

/* 그리드 컴포넌트 **********************************************************/
Ext.define('ApGrid', {
    extend: 'Ext.grid.Panel',
    ComponentType: 'grid',
    columnsMap: []
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
                align: 'left',
                style: 'text-align:center',
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
                align: 'right',
                style: 'text-align:center',
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
                    format: 'Y-m-d',
                    submitFormat: 'c' 
                }
            });
            break;
        case 'check':
            columnType = {
                text: columnText,
                xtype: 'checkcolumn',
                width: width,
                dataIndex: paramId,
                align: 'center',
                //trueText: 'true',
                //falseText: 'false',
                align: 'center',
                editor: {
                    xtype: 'checkfield',
                    //selectOnFocus: true,
                }
            };
            break;
        case 'combo':
            columnType = Ext.create('Ext.grid.column.Column', {
                text: columnText,
                width: width,
                //xtype: 'combocolumn',
                dataIndex: paramId[0],
                align: 'left',
                style: 'text-align:center',
                renderer: function (value) {
                    //console.log(0);
                    try {
                        for (var i = 0; i < this.columnsMap.length; i++) {
                            if (this.columnsMap[i].dataIndex == paramId[0]) {

                                var combo = this.columnsMap[i].getEditor();
                                if (value && combo && combo.store && combo.displayField) {
                                    var index = combo.store.findExact(combo.valueField, value);
                                    if (index >= 0) {
                                        return combo.store.getAt(index).get(combo.displayField);
                                    }
                                }
                                return value;
                            }
                        }
                    } catch (e) {

                    }
                    //var combo = metaData.column.getEditor();
                    //if (value && combo && combo.store && combo.displayField) {
                    //    var index = combo.store.findExact(combo.valueField, value);
                    //    if (index >= 0) {
                    //        return combo.store.getAt(index).get(combo.displayField);
                    //    }
                    //}
                    //return value;
                   
                },
                //store: comboStore,
                //renderer: Ext.util.Format.usMoney,
                editor: {
                    xtype: 'combobox',
                    displayField: 'SHOWVALUE',
                    valueField: 'HIDEVALUE',
                    store: paramId[1]
                    //listeners: {
                    //    change: function (editor, e, eOpts) {
                    //        console.log('sdf');
                    //    }
                    //}
                    //renderer: function (value) {
                    //    if (value != 0 && value != "") {
                    //        if (paramId[1].findRecord("HIDEVALUE", value) != null)
                    //            return paramId[1].findRecord("HIDEVALUE", value).get('name');
                    //        else
                    //            return value;
                    //    }
                    //    else
                    //        return "";  // display nothing if value is empty
                    //}
                }
            });
            break;
            //하이드컬럼 테스트 필요
        case 'hide':
            columnType = Ext.create('Ext.grid.column.Column', {
                text: columnText,
                width: 0,
                dataIndex: paramId
            });
            columnType.isVisible(false);
            break;
    }
    this.columnsMap.push(columnType);
    this.headerCt.insert(this.columns.length - 2, columnType);
    this.getView().refresh();
}
ApGrid.prototype.setLockColumns = function(){
    for (var i = 0; i < arguments.length; i++) {
        this.lockColumns.push(arguments[i]);
    }
}
ApGrid.prototype.setUnLockColumns = function () {
    for (var i = 0; i < arguments.length; i++) {
        if (this.lockColumns.indexOf(arguments[i]) != -1) {
            this.lockColumns.splice(this.lockColumns.indexOf(arguments[i]), 1);
        }
    }
}
ApGrid.prototype.getTotalCount = function () {
    return this.getStore().getCount();
}
ApGrid.prototype.getEmptyRecord = function () {
    var data = []
    for (var i = 0; i < this.columnsMap.length; i++) {
        data.push('');
    }
    var newRecord = Ext.create('Ext.data.Store', {
        model: this.getStore().getModel(),
        data: data
    });
    return newRecord;
}
ApGrid.prototype.getSelectedRecords = function () {
    //var checkedRecords = this.getSelection();
    //checkedRecords.sort(function (a, b) {
    //    return a.internalId < b.internalId ? -1 : a.internalId > b.internalId ? 1 : 0;
    //});
    var returnRecords = [];
    if (this.checkedGrid) {
        for (var i = 0; i < this.store.getCount() ; i++) {
            if (this.getRow(i).data.AP_STATE) {
                returnRecords.push(this.getRow(i));
            }
        }
    } else {
        returnRecords.push(grd_H.selection);
    }
   
    return returnRecords;
}
ApGrid.prototype.getRowIndex = function (record) {
    return this.getStore().indexOf(record);
}
ApGrid.prototype.addRow = function () {
    this.getStore().add(this.getEmptyRecord());
}
ApGrid.prototype.deleteRow = function (records) {
    for (var i = 0; i < records.length; i++) {
        this.deleted.push(records[i]);
        this.getStore().remove(records[i]);
    }
}
ApGrid.prototype.getDeletedRecords = function () {
    return this.deleted;
}
ApGrid.prototype.reconfig = function (store) {
    this.reconfigure(store);
    //체크컬럼 있는지 알아내기
    this.deleted = [];
}
ApGrid.prototype.getRow = function (rowIndex) {
    return this.getStore().getAt(rowIndex);
}
ApGrid.prototype.setRow = function (rowIndex, paramId, value) {
    this.getRow(rowIndex).set(paramId, value)
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
ApGrid.prototype.eBeforeEdit = function (store, rowIndex, paramId, record, value) { };
ApGrid.prototype.eSelectionChange = function (record, rowindex, paramId) { };
ApGrid.prototype.eUpdate = function (record, rowIndex, paramId) { };
ApGrid.prototype.eCellClick = function (store, rowIndex, paramId, record) { };
ApGrid.prototype.eButtonAddClick = function () {

}
ApGrid.prototype.setFocus = function (rowIndex) {
    this.getSelectionModel().select(rowIndex);
    this.getView().focusRow(rowIndex);
    this.eSelectionChange(this.getSelection()[0], rowIndex, this.columnsMap[1].dataIndex);
}
ApGrid.prototype.setFocusOut = function () {
    this.selModel.deselectAll();
}
ApGrid.prototype.eButtonDeleteClick = function () {

}
var ApGrid = {
    create: function (check, type) {
        //var selModel = '';
        var toolbar = [];
        if (type == undefined || false) {
            toolbar = [];
        } else if (type == true) {
            toolbar = [{
                xtype: 'toolbar',
                items: [{
                    //iconCls: 'icon-add',
                    text: '추가',
                    scope: this,
                    handler: function (event, toolEl, panel) {
                        //alert('Do you need help?');
                        _ApGrid.eButtonAddClick();
                    }
                }, {
                    //iconCls: 'icon-delete',
                    text: '삭제',
                    //disabled: true,
                    itemId: 'delete',
                    scope: this,
                    handler: function (event, toolEl, panel) {
                        _ApGrid.eButtonDeleteClick();
                        // show help here
                    }
                }]
            }]
        } else if(type == 'D'){
            toolbar = [{
                xtype: 'toolbar',
                items: [{
                    //iconCls: 'icon-delete',
                    text: '삭제',
                    //disabled: true,
                    itemId: 'delete',
                    scope: this,
                    handler: function (event, toolEl, panel) {
                        _ApGrid.eButtonDeleteClick();
                        // show help here
                    }
                }]
            }]
        }
        var _ApGrid = Ext.create('ApGrid', {
            //store: store,
            width: 'fit',
            title: '',
            checkedGrid : check,
            //header: true,
            lockColumns: [],
            deleted:[],
            dockedItems: toolbar,
            border: 1,
            //selModel: selModel,
            columns: [Ext.create('Ext.grid.RowNumberer')],
            plugins: [Ext.create('Ext.grid.plugin.CellEditing', {
                clicksToEdit: 2
            })],
            listeners: {
                cellclick: function (grd, rowIndex, colIndex, e) {
                    var record = grd.getStore().getAt(grd.selModel.getCurrentPosition().rowIdx);
                    dataIndex = _ApGrid.getView().headerCt.getHeaderAtIndex(colIndex).dataIndex;

                    this.eSelectionChange(record, grd.selModel.getCurrentPosition().rowIdx, dataIndex);
                },
                cellkeydown: function (grd, row, colIndex, z, a, b, event) {
                    var code = event.getCharCode();
                    var rowIndex = grd.selModel.getCurrentPosition().rowIdx;
                    if (code == 38 || code == 40) {
                        if (code == 38) rowIndex--;
                        if (code == 40) rowIndex++;
                        try {
                            var record = grd.getStore().getAt(rowIndex);
                            dataIndex = _ApGrid.getView().headerCt.getHeaderAtIndex(colIndex).dataIndex;

                            this.eSelectionChange(record, rowIndex, dataIndex);
                        } catch (e) {

                        }
                    }
                    else if (code == 37 || code == 39) {
                        try {
                            if (code == 37) colIndex--;
                            if (code == 39) colIndex++;
                            var record = grd.getStore().getAt(rowIndex);
                            dataIndex = _ApGrid.getView().headerCt.getHeaderAtIndex(colIndex).dataIndex;

                            this.eSelectionChange(record, rowIndex, dataIndex);
                        } catch (e) {

                        }
                    }
                },
                beforeedit : function(editor, e ,eOpts){
                    var dataIndex = _ApGrid.getView().headerCt.getHeaderAtIndex(e.colIdx).dataIndex;
                    if (this.lockColumns.indexOf(dataIndex) != -1) {
                        return false;
                    }
                },
                edit: function (editor, e, eOpts) {
                    try {
                        var record = this.getStore().getAt(e.rowIdx);
                        if (editor.context.column.xtype == 'datecolumn') {
                            record.set(editor.context.column.dataIndex, Ext.Date.dateFormat(editor.context.value, 'Y-m-d'));
                        }
                        _ApGrid.eUpdate(record, e.rowIdx, dataIndex);
                        if (record.dirty) {
                            //레코드가 더러울때
                            record.set('AP_STATE', true);
                        } else {
                            record.set('AP_STATE', false);
                        }
                        delete record.modified['AP_STATE'];
                        _ApGrid.view.refresh();
                    } catch (e) {

                    }
                }
            }
        })
        if (check) {
            _ApGrid.addColumn('check', '선택', 'AP_STATE', 50);
        }
        _ApGrid.view.on('itemupdate', function (record, index, node, eOpts) {
            if (_ApGrid.checkedGrid) {
                //_ApGrid.eUpdate(record, e.rowIdx, dataIndex);
                try {
                    delete record.modified['AP_STATE'];
                } catch (e) {

                }
                if (record.dirty) {
                    //레코드가 더러울때
                    var i = 0;
                    for (var key in record.previousValues) {
                        i++;
                    }
                    if (i == 1) {
                        if (record.previousValues.APSTATE) {
                            record.set('AP_STATE', false);
                        }
                        record.commit();
                    } else {

                        record.set('AP_STATE', true);
                    }
                } else {
                    record.set('AP_STATE', false);
                }
                _ApGrid.view.refresh();
            }
            //for (var key in record.modified) {
            //    for (var i = 0; i < _ApGrid.columnsMap.length; i++) {
            //        try {
            //            if (_ApGrid.columnsMap[i].config.editor.xtype == 'combobox') {
            //                if (_ApGrid.columnsMap[i].dataIndex == key) {
            //                    for (var j = 0; j < _ApGrid.columnsMap[i].editor.store.data.items.length; j++) {
            //                        if (_ApGrid.columnsMap[i].editor.store.data.items[j].data.HIDEVALUE == record.data[key]) {
            //                            record.set(key, _ApGrid.columnsMap[i].editor.store.data.items[j].data.SHOWVALUE);
            //                        }
            //                    }
            //                }
            //            }
            //        } catch (e) {

            //        }
            //    }
            //}
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
ApText.prototype.eFocus = function () {
};
ApText.prototype.eChange = function (newValue, oldValue) {
};
ApText.prototype.eKeyDown = function (e) {

}
ApText.prototype.setFeildLabelWidth = function (width) {
    this.labelEl.setWidth(width)
};
var ApText = {
    create: function (label, paramId, labelWidth) {
        if (labelWidth == undefined) labelWidth = 80;
        var _ApText = Ext.create('ApText', {
            labelWidth: 80,
            width: 180,
            fieldLabel: label,
            labelWidth: labelWidth,
            labelStyle: 'white-space: nowrap;',
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
//텍스트에어리어
Ext.define('ApTextArea', {
    extend: 'Ext.form.field.TextArea',
    ComponentType: 'textArea'
});
ApTextArea.prototype.eFocus = function () { };
ApTextArea.prototype.eChange = function (newValue, oldValue) { };
ApTextArea.prototype.eKeyDown = function (e) { };
var ApTextArea = {
    create: function (label, paramId, labelWidth) {
        if (labelWidth == undefined) labelWidth = 80;
        var _ApTextArea = Ext.create('ApTextArea', {
            width: 180,
            fieldLabel: label,
            labelWidth: labelWidth,
            paramId: paramId
        });
        _ApTextArea.on('afterrender', function (me, eOpts) {
            _ApTextArea.on('focus', function (me, eOpts) {
                _ApTextArea.eFocus();
            });
            _ApTextArea.on('change', function (me, newValue, oldValue) {
                _ApTextArea.eChange(newValue, oldValue);
            })
            _ApTextArea.getEl().on('keydown', function (e, t, eOpts) {
                _ApTextArea.eKeyDown(e);
            });
        });
        _setTarget(_ApTextArea);
        return _ApTextArea;
    }
}
//날짜선택
Ext.define('ApDate', {
    extend: 'Ext.form.field.Date',
    ComponentType: 'date'
});
ApDate.prototype.setToday = function () {
    this.setValue(Ext.Date.dateFormat(new Date(), 'Y-m-d'));
};
ApDate.prototype.getYMD = function () {
    return Ext.Date.dateFormat(this.getValue(), 'Y-m-d');
    //var value = this.superclass.getValue.call(this);
    //return Ext.Date.dateFormat(value, 'Ymd');
}
ApDate.prototype.eChange = function (Value) { };
ApDate.prototype.eKeyDown = function (e) { };
var ApDate = {
    create: function (label, paramId, labelWidth) {
        if (labelWidth == undefined) labelWidth = 80;
        var _ApDate = Ext.create('ApDate', {
            width: 190,
            fieldLabel: label,
            labelWidth: labelWidth,
            format: 'Y-m-d',
            paramId: paramId
        });
        _ApDate.on('afterrender', function (me, eOpts) {
            _ApDate.on('change', function (me, newValue, oldValue, eOpts) {
                _animationTarget = this;
                _ApDate.eChange(newValue);
            });
            _ApDate.getEl().on('keydown', function (e, t, eOpts) {
                _ApDate.eKeyDown(e);
            });
        });
        _setTarget(_ApDate);
        return _ApDate;
    }
}

//콤보박스
Ext.define('ApCombo', {
    extend: 'Ext.form.ComboBox',
    ComponentType: 'combo'
});
ApCombo.prototype.eventChange = function (newValue, oldValue) { };

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
ApCombo.prototype.setIndex = function (index) {
    var value = this.getStore().data.items[index].data.SHOWVALUE;
    this.superclass.setValue.call(this, value);
}
ApCombo.prototype.setValue = function (value) {
    this.superclass.setValue.call(this, value);
};
ApCombo.prototype.getValue = function () {
    try {
       return this.getSelection().data.HIDEVALUE;
    } catch (e) {

    }
}
ApCombo.prototype.eFocus = function () {
};
ApCombo.prototype.eChange = function (record) {
};
ApCombo.prototype.eKeyDown = function (e) {
};

ApCombo.prototype.setFeildLabelWidth = function (width) {
    this.labelEl.setWidth(width)
};
var ApCombo = {
    create: function (label, paramId, labelWidth) {
        if (labelWidth == undefined) labelWidth = 80;
        var _ApCombo = Ext.create('ApCombo', {
            labelWidth: 80,
            width: 180,
            displayField: 'SHOWVALUE',
            fieldLabel: label,
            labelWidth: labelWidth,
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
            _ApCombo.on('select', function (me) {
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
            text: text,
            width: 90,
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
//체크박스
Ext.define('ApCheck', {
    extend: 'Ext.form.field.Checkbox',
    componentType: 'check'
});
ApCheck.prototype.eChange = function (newValue, oldValue) { };
ApCheck.prototype.setFeildLabelWidth = function (width) {
    this.labelEl.setWidth(width)
};
var ApCheck = {
    create: function (text, paramId) {
        var _ApCheck = Ext.create('ApCheck', {
            boxLabel: text,
            paramId: paramId
        });
        _ApCheck.on('afterrender', function (me, eOpts) {
            _ApCheck.on('change', function (me, newValue, oldValue) {
                _ApCheck.eChange(newValue, oldValue);
            });
        });
        _setTarget(_ApCheck);
        return _ApCheck;
    }
}
//label
Ext.define('ApLabel', {
    extend: 'Ext.form.Label',
});
ApLabel.prototype.eClick = function () {
    console.log('labelClick');
}
var ApLabel = {
    create: function (text) {
        var _ApLabel = Ext.create('ApLabel', {
            text: text,
            listeners: {
                click: function (a, b) {
                    this.eClick();
                }
            }
        })
        _setTarget(_ApLabel);
        return _ApLabel;
    }
}

Ext.define('ApImg', {
    extend: 'Ext.Img',
    ComponentType: 'image'
});
ApImg.prototype.setFileKey = function (fileKey) {
    if (fileKey != '' && fileKey != undefined) {
        var _pr = DBParams.create('sp_COMFILE', 'GETFILE');
        _pr.addParam('FILEKEY', fileKey);
        var fileDs = DBconnect.runProcedure(_pr);

        if (fileDs[0].data.items.length > 0) {
            var src = fileDs[0].data.items[0].data.UP_SRC
            this.key = fileKey;
            this.setSrc(src);
        } else {
            console.error('파일없음');
        }
    } else {
        this.setSrc('../../Resource/Themes/noImage.png');
    }

}
var ApImg = {
    create: function (src, paramId) {
        if (src == undefined) src = '';
        //if (labelWidth == undefined) labelWidth = 80;
        var _ApImg = Ext.create('ApImg', {
            src: src,
            width: 180,
            height: 180,
            paramId: paramId,
            Key: ''
        });
        if (_ApImg.src == '') {
            _ApImg.setSrc('../../Resource/Themes/noImage.png');
        }
        _setTarget(_ApImg);
        return _ApImg;
    }
}

Ext.define('ApUpload', {
    //extend: 'Ext.panel.Panel',
    extend: 'Ext.form.Panel',
    ComponentType: 'upload'
});
ApUpload.prototype.setFileKey = function (filekey) {
    var pr = DBParams.create('sp_COMFILE', 'GETFILE');
    pr.addParam('FILEKEY', filekey);
    var fileDs = DBconnect.runProcedure(pr);
    if (fileDs[0].data.items.length > 0) {
        this.items.items[0].setRawValue(fileDs[0].data.items[0].data.UP_EXT);
        this.items.items[0].button.hide();
        this.items.items[1].hide();
        this.items.items[2].show();
        this.items.items[3].show();
        this.key = filekey;
    } else {
        console.error('파일없음');
    }
}
ApUpload.prototype.getFileKey = function () {
    return this.key;
}
ApUpload.prototype.getFileName = function () {
    return this.items.items[0].getRawValue();
}
ApUpload.prototype.eUpload = function (fileKeys) {

}
ApUpload.prototype.eClear = function () {

}


var ApUpload = {
    create: function (text, paramId) {
        var _upButton = Ext.create('Ext.button.Button', {
            text: '업로드',
            handler: function () {
                var form = this.up('form').getForm();
                //form.url = form.getRawValue();
                if (form.isValid()) {
                    form.submit({
                        url: '../../ServerCore/FileSystem.aspx?FORMNAME=ComFormC01&E_USER=' + ApFn.getUser() + '&PROJECT_KEY=' + ApFn.getProjectKey(),
                        waitMsg: '파일업로드중...',
                        params: {
                            TYPE: 'UPLOAD'
                        },
                        success: function (fp, o) {
                            ApMsg.warning(o.result.data + ', 업로드 되었습니다.');
                            _ApUpload.items.items[0].setRawValue(o.result.data);
                            _ApUpload.key = o.result.fileKey;
                            _upButton.hide();
                            _downButton.show();
                            _clearButton.show();
                            _ApUpload.items.items[0].button.hide();
                            _ApUpload.eUpload(_ApUpload.key);
                        }
                    });
                }
            }
        });
        var _downButton = Ext.create('Ext.button.Button', {
            text: '다운로드',
            handler: function () {
                var _downForm = Ext.create('Ext.form.Panel', {
                    title: 'hiddenForm',
                    standardSubmit: true,
                    url: '../../ServerCore/FileDownload.aspx?FILEKEY=' + _ApUpload.key + '&E_USER=' + ApFn.getUser() + '&PROJECT_KEY=' + ApFn.getProjectKey(),
                    hidden: true
                });
                //form.url = form.getRawValue();
                if (_downForm.isValid()) {
                    _downForm.submit();
                }
            }
        });
        _clearButton = Ext.create('Ext.button.Button', {
            text: '삭제',
            handler: function () {
                Ext.Ajax.request({
                    async: false,
                    url: '../../ServerCore/FileSystem.aspx?FILEKEY=' + _ApUpload.key + '&E_USER=' + ApFn.getUser() + '&PROJECT_KEY=' + ApFn.getProjectKey(),
                    method: 'POST',
                    params: {
                        TYPE: 'CLEAR'
                    },
                    reader: {
                        type: 'text'
                    },
                    success: function (response, options) {
                        //uploader.reset();
                        _ApUpload.key = '';
                        _ApUpload.items.items[0].button.show();
                        _ApUpload.items.items[0].setRawValue('');
                        _upButton.show();
                        _clearButton.hide();
                        _downButton.hide();
                        _ApUpload.eClear();
                    },
                    failure: function (response, options) {
                        //Ext.Msg.error('Failure', response.responseText);
                        Ext.Msg.error('Failure', response.statusText);
                    }
                });
            }
        });
        var _ApUpload = Ext.create('ApUpload', {
            title: '파일업로더',
            header: false,
            bodyPadding: 10,
            frame: true,
            layout: 'hbox',
            key: '',
            url: '',
            items: [{
                xtype: 'filefield',
                name: 'photo',
                fieldLabel: text,
                labelWidth: 80,
                width: 400,
                msgTarget: 'side',
                allowBlank: false,
                anchor: '100%',
                buttonText: '파일선택..'
            }, _upButton, _downButton, _clearButton]
        });
        _ApUpload.on('afterrender', function (me, eOpts) {
            _ApUpload.items.items[0].on('change', function (me, value, eOpts) {
                me.setRawValue(value.replace(/C:\\fakepath\\/g, ''));
            });
        });
        _downButton.hide();
        _clearButton.hide();
        _setTarget(_ApUpload);
        return _ApUpload;
    }
}