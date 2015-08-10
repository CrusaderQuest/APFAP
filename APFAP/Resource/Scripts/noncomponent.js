
//Global value

//Global function

//DB parameters
Ext.define('DBParams', {
    procedureName : '',
    procedureSection : '',
    params :''
})

DBParams.protoType.addParam = function (paramName, paramValue) {
    if (this.params == '') {
        this.params = paramName + '※' + paramValue;
    } else {
        this.param = + '|' + paramName + '※' + paramValue;
    }
}
DBParams.protoType.setName = function (procedureName) {
    this.procedureName = procedureName;
}
DBParams.protoType.setSection = function (Section) {
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
        var connectStr = DBparams.procedureName + '※' + DBparams.procedureSection + '※';
        if (sqlParam.params != "") {
            connectStr = + '|' + sqlParam.params;
        };

        //Ext.Ajax.request({
        //    async: false,
        //    url: '',
        //    method: 'POST',
        //    params: {
        //        params : connectStr
        //    },
        //    reader: {
        //        type : 'json'
        //    },
        //    success: function (response, eOpt) {
        //        var responseStr = response.responseText;
        //        while (responseStr == '') {
        //            var endIndex = resText.indexOf('|');
        //            var convertTxt = responseStr.subString(0, endIndex);
        //            responseStr.
        //        }
        //    }
        //})

    }
}

//Ready function start!

var viewPanel = ApPanel.create('컨텐츠전체영역');
var viewPort = '';

Ext.onReady(function () {
    viewPort = Ext.create('Ext.container.Viewport', {
        layout: 'border',
        border: 0,
        items: [viewPanel]
    });
    ApEvent.onlaod();
});