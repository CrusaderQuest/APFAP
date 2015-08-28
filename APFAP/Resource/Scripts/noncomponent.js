/// <reference path="C:\Users\준희\Desktop\APFAP\APFAP\ServerCore/DBconnector.aspx" />

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
        dbParams.addParam('PROJECT_KEY', 'P0000000001');
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

//Ready function start!

var viewPanel = ApPanel.create('컨텐츠전체영역');
var viewPort = '';

ApEvent = {
    onlaod: function () {

    }
}

Ext.onReady(function () {
    viewPort = Ext.create('Ext.container.Viewport', {
        layout: 'border',
        border: 0,
        items: [viewPanel]
    });
    ApEvent.onlaod();
});