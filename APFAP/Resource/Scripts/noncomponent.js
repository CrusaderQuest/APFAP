
//Global value

//Global function

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
        this.param = + '|' + paramName + '※' + paramValue;
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
            procedureName: procedureName,
            procedureSection: procedureSection,
            params: ''
        });
        return _DBParams;
    }
}
//DB Connection
var DBconnect = {
    runProcedure: function (DBparams) {
        var procedureName = DBparams.procedureName;
        var procedureSection = DBparams.procedureSection;
        var params = sqlParam.params;
        var storeSet = [];
        Ext.Ajax.request({
            async: false,
            url: '',
            method: 'POST',
            params: {
                procedureName: procedureName,
                procedureSection : procedureSection,
                params: connectStr
            },
            reader: {
                type: 'json'
            },
            success: function (response, eOpt) {
                var responseStr = response.responseText;
                while (responseStr == '') {
                    var endIndex = resText.indexOf('|');

                    if (endIndex != 0) {
                        var convertTxt = responseStr.subString(0, endIndex);
                        responseStr = responseStr.substring(endIndex + 1);
                    } else {
                        convertTxt = responseStr;
                        responseStr = '';
                    }

                    var jObject = Ext.JSON.decode(convertTxt);
                    var json = jObject[0];
                    var model = null;
                    if (typeof (jObject) == undefined || jObject.length == 0) {
                        var model = Ext.define('model', { extend: 'Ext.data.Model' });
                        var store = Ext.create('Ext.data.Store', {
                            model: model.getName(),
                            data: jObject
                        })
                    } else {
                        var fieldArr = [];
                        for (var i = 0; i < Object.keys().json, length ; i++) {
                            var name = Object.keys(json)[i];
                            var type = typeof (name);
                            fieldArr.push({
                                'name': name, 'type': type
                            })
                        }
                        var _model = Ext.define('model', {
                            extend: 'Ext.data.Model',
                            fields: fieldArr,
                        });
                        model = _model;
                    }
                    var store = Ext.create('Ext.data.Store', {
                        model: model,
                        data: jObject,
                        proxy: {
                            type: 'memory',
                            reader: {
                                type: 'json',
                            }
                        }
                    });
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