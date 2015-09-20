/// <reference path="component.js" />
//Global value

//Global function

var ApFn = {
    toDbTyoe: function (type, value) {
        if (type == 'date') {
            return value.substr(0, 4) + value.substr(5, 2) + value.substr(8, 2);
        } else if (type == 'bool') {
            return value == true ? 'T' : 'F';
        }
    },
    setImportColor: function (text) {
        var tag = "<font color='red'>" + text + '</font>';
        return tag
    },
    getUser: function () {
        return 'U0000001';
    },
    getProjectKey: function () {
        //var key = getSelection().PROJECT_KEY;
        //if (key == undefined) {
        //    return '';
        //} else {
        //    return key;
        //}
        return 'P0000000001';
    },
    isMaster: function () {
        return false;
    },
    setYMD: function (value) {
        value = value.substr(0, 4) + value.substr(5, 2) + value.substr(8, 2);
        return value;
    }
}

//DB parameters

//Ext.define('Student',
//{
//    name: 'unnamed',
//    getName: function () {
//        return "Student name is" + this.name;
//    }
//}, function () {
//    alert('Student object created');
//});
Ext.define('DBParams', {
    procedureName: '',
    procedureSection: '',
    params: ''
});

DBParams.prototype.addParam = function (paramName, paramValue) {
    if (this.params == '') {
        this.params = paramName + '※' + paramValue;
    } else {
        this.params += '|' + paramName + '※' + paramValue;
    }
}
DBParams.prototype.setName = function (procedureName) {
    this.procedureName = procedureName;
}
DBParams.prototype.setSection = function (Section) {
    this.setSection = Section;
}
var DBParams = {
    create: function (procedureName, procedureSection) {
        var _DBParams = Ext.create('DBParams', {
        });
        _DBParams.procedureName = procedureName;
        _DBParams.procedureSection = procedureSection;
        _DBParams.params = '';
        return _DBParams;
    }
}
//DB Connection
var DBconnect = {
    runProcedure: function (dbParams) {
        var procedureName = dbParams.procedureName;
        var procedureSection = dbParams.procedureSection;
        dbParams.addParam('PROJECT_KEY', ApFn.getProjectKey());
        var params = dbParams.params;
        var storeSet = [];
        Ext.Ajax.request({
            async: false,
            url: '../../ServerCore/DBconnector.aspx',
            method: 'POST',
            params: {
                procedureName: procedureName,
                procedureSection: procedureSection,
                params: params
            },
            reader: {
                type: 'json'
            },
            success: function (response, eOpt) {
                var responseStr = response.responseText;
                while (responseStr != '') {
                    var endIndex = responseStr.indexOf('|');
                    var convertTxt = "";
                    if (endIndex > -1) {
                        convertTxt = responseStr.substring(0, endIndex);
                        responseStr = responseStr.substring(endIndex + 1);
                    } else {
                        convertTxt = responseStr.substring(0, responseStr.length - 2);
                        responseStr = '';
                        Model = '';
                    }


                    var jObject = Ext.JSON.decode(convertTxt);
                    var json = jObject[0];
                    var _sModel = null;
                    if (typeof (jObject) == undefined || jObject.length == 0) {
                        var _model = Ext.define(Ext.id(), { extend: 'Ext.data.Model' });
                        var store = Ext.create('Ext.data.Store', {
                            model: _model.getName(),
                            data: jObject
                        })
                    } else {
                        var fieldArr = [];
                        fieldArr.push({
                            'name': 'AP_STATE', 'type': 'bool'
                        });
                        for (var i = 0; i < Object.keys(json).length ; i++) {
                            var name = Object.keys(json)[i];
                            var type = typeof (json[Object.keys(json)[i]]);
                            if (json[Object.keys(json)[i]] == 'T' || json[Object.keys(json)[i]] == 'F') {
                                type = 'bool';
                                for (var j = 0; j < jObject.length;j++) {
                                    if (jObject[j][Object.keys(json)[i]] == 'T') jObject[j][Object.keys(json)[i]] = true;
                                    if (jObject[j][Object.keys(json)[i]] == 'F') jObject[j][Object.keys(json)[i]] = false;
                                    
                                }

                            }
                            fieldArr.push({
                                'name': name, 'type': type
                            })
                        }
                        var store = Ext.create('Ext.data.Store', {
                            model: Ext.define(Ext.id(), {
                                extend: 'Ext.data.Model',
                                fields: fieldArr,
                            }),
                            data: jObject,
                            proxy: {
                                type: 'memory',
                                reader: {
                                    type: 'json',
                                }
                            }
                        });
                    }
                    storeSet.push(store);
                }
            },
            failure: function (response, options) {
                alert('통신실패');
            }
        });
        return storeSet;
    }
}
function GetSession() {
    var session = undefined;
    Ext.Ajax.request({
        async: false,
        url: '../../ServerCore/getSession.aspx',
        method: 'POST',
        success: function (response, eOpt) {
            var responseStr = response.responseText;
            if (responseStr == 'NSESSION') {
                return false;
            } else {
                session = {
                    S_USER_NO : responseStr.split('※')[0],
                    S_USER_NM: responseStr.split('※')[1],
                    MASTER: responseStr.split('※')[2]
                }
                return session;
            }
        },
        failure: function (response, options) {
            alert('통신실패');
            return false;
        }
    });
    return session;
}


//Ready function start!

var viewPanel = ApPanel.create('컨텐츠전체영역');
var viewPort = '';

ApEvent = {
    onlaod: function () {

    }
}

//메뉴프레임
var menuFrame = ApTable.create(3);
menuFrame.setWidth('100%');
menuFrame.addCls('tableStyle_main');
menuFrame.updateLayout();
menuFrame.setTarget();

var btn_SAVE = ApButton.create('변경상태 저장');
btn_SAVE.setWidth(120);
var txt = '로드실패';
try {
    txt = parent.tab_main.getActiveTab().items.items[0].explane;
} catch (e) {

}
var lbl_DISCRIPT = ApLabel.create(txt);
var num_RATE = ApNum.create('진행율');
num_RATE.setMaxValue(100);
num_RATE.setWidth(170);
var lbl_RATE = ApLabel.create('%');
lbl_RATE.setMargin('5 0 0 2');
var btn_RATESAVE = ApButton.create('저장');
btn_RATESAVE.setWidth(50);
if (ApFn.isMaster() != true) {
    num_RATE.setReadOnly(true);
    btn_RATESAVE.setHidden(true);
}
menuFrame.cellShare(3);
menuFrame.items.items[0].setWidth(150);
menuFrame.items.items[1].setWidth(700);



Ext.onReady(function () {
    var urlArray = ['Start/Main.html', 'Start/Login.html'];
    for (var i = 0; i < urlArray.length; i++) {
        if (unescape(document.location.href.indexOf(urlArray[i])) > -1) {
            viewPort = Ext.create('Ext.container.Viewport', {
                layout: 'border',
                border: 0,
                items: [viewPanel]
            });
            ApEvent.onlaod();
            return;
        }
    }

    viewPort = Ext.create('Ext.container.Viewport', {
        layout: 'border',
        border: 0,
        items: [{
            region: 'north',
            border: 0,
            collapsible: false,
            split: false,
            height: 40,
            cls:'tableStyle_main',
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            items: [menuFrame]
        },
        viewPanel]
    });
    ApEvent.onlaod();
    return;
});