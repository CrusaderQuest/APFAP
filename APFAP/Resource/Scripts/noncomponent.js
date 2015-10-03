/// <reference path="component.js" />
//Global value

//Global function

//set, get 관련된 추가 함수들 
var ApFn = {
    //ApFn.function
    toDbTyoe: function (type, value) {
        if (type == 'date') {   //date 
            return value.substr(0, 4) + value.substr(5, 2) + value.substr(8, 2);
        } else if (type == 'bool') {
            return value == true ? 'T' : 'F';
        }
    },
    setImportColor: function (text) {   //red로 강조
        var tag = "<font color='red'>" + text + '</font>';
        return tag
    },
    getUser: function () {  //로그인 한 User get ex) U0000001
        if (GetSession() == undefined) {
            return 'X';
        } else {
            var value = GetSession().S_USER_NO;
            return value;
        }
    },
    getProjectKey: function () {    //활성화 되어 있는 프로젝트키 get
        if (GetSession() == undefined) {
            return 'X';
        } else {
            var value = GetSession().S_PROJECT_KEY;
            return value;
        }
        //return 'P0000000001';
    },
    isMaster: function () { //관리자 권한을 가졌는지 확인
        if (GetSession() == undefined) {
            return 'X';
        } else {

            if (GetSession().S_MASTER_TF == 'true') {
                return true;
            } else {
                return false;
            }
        }
    },
    setYMD: function (value) {  //date타입의 변환
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

//db에 넘길 파라미터
Ext.define('DBParams', {
    procedureName: '',
    procedureSection: '',
    params: ''
});

//파라미터 추가 
DBParams.prototype.addParam = function (paramName, paramValue) {
    if (this.params == '') {
        this.params = paramName + '※' + paramValue;
    } else {
        this.params += '|' + paramName + '※' + paramValue;
    }
}
DBParams.prototype.setName = function (procedureName) {
    this.procedureName = procedureName;
}//setName
DBParams.prototype.setSection = function (Section) {
    this.setSection = Section;
}//setSection

var DBParams = {
    //DBParmas.create()
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
        //이용자가 누구인지, 어떤 프로젝트 인지에 따라서
        dbParams.addParam('PROJECT_KEY', ApFn.getProjectKey());
        dbParams.addParam('E_USER', ApFn.getUser());
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
                    S_PROJECT_KEY: responseStr.split('※')[2],
                    S_MASTER_TF: responseStr.split('※')[3],
                    S_READ_ONLY: responseStr.split('※')[4]
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

//viewPanel 위에 contents들이 존재
var viewPanel = ApPanel.create('컨텐츠전체영역');
var viewPort = '';

//contents 각각 시작시 로드
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

//입력 내용 db에 저장 버튼
var btn_SAVE = ApButton.create('Sync');
btn_SAVE.setIcon('../../Resource/Themes/Save_1.png');
btn_SAVE.setIconCls('btn_save');
btn_SAVE.setWidth(70);

var txt = '로드실패';
try {   
    txt = parent.tab_main.getActiveTab().items.items[0].explane;
} catch (e) {

}
var lbl_DISCRIPT = ApLabel.create(txt);

var pr = DBParams.create('sp_COMMAIN', 'SEARCH_PROG');
pr.addParam('CONTENT_CD', document.location.href.substr
    (document.location.href.indexOf('Project') + 15, 3).toUpperCase() +
    document.location.href.substr(document.location.href.indexOf('Project') + 22, 1).toUpperCase());
var ds = DBconnect.runProcedure(pr);
var num_RATE = ApNum.create('진행율');
num_RATE.setMaxValue(100);
num_RATE.setWidth(170);
try {
    num_RATE.setValue(ds[0].getAt(0).get('RATE'));
} catch (e) {

}
var lbl_RATE = ApLabel.create('%');
lbl_RATE.setMargin('5 0 0 2');
var btn_RATESAVE = ApButton.create('저장');
btn_RATESAVE.setWidth(50);
btn_RATESAVE.eClick = function () {
    var pr = DBParams.create('sp_COMMAIN', 'UPDATE_PROG');
    pr.addParam('CONTENT_CD', document.location.href.substr(document.location.href.indexOf('Project') + 15, 3).toUpperCase() + document.location.href.substr(document.location.href.indexOf('Project') + 22, 1).toUpperCase());
    pr.addParam('RATE', num_RATE.getValue());
    var ds = DBconnect.runProcedure(pr);
    location.replace(document.location.href);
}
if (ApFn.isMaster() != true) {
    num_RATE.setReadOnly(true);
    btn_RATESAVE.setHidden(true);
}
menuFrame.cellShare(3);
menuFrame.items.items[0].setWidth(90);
menuFrame.items.items[1].setWidth(700);
if (unescape(document.location.href.indexOf('Project/')) > -1) {
    if (GetSession().S_READ_ONLY == 'true') {
        btn_SAVE.setHidden(true);
        btn_RATESAVE.setHidden(true);
    }
}


if (document.location.href.indexOf('Start/Home.html') == -1 && document.location.href.indexOf('Start/Project.html') == -1) {
    Ext.onReady(function () {
        var urlArray = ['Start/Main.html', 'Start/Login.html', 'Start/Project.html'];
        var urlArray2 = ['Project/PjtCom/COMFORMB01.html'];
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
            if (unescape(document.location.href.indexOf(urlArray2[0])) > -1) {
                return;
            }
        }
        if (unescape(document.location.href.indexOf('Project/PjtCom')) > -1) {
            //lbl_DISCRIPT.setHidden(true);
            num_RATE.setHidden(true);
            lbl_RATE.setHidden(true);
            btn_RATESAVE.setHidden(true);
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

        //if (unescape(document.location.href.indexOf(urlArray2[i])) > -1) {
        //    num_RATE.setHidden(true);
        //    lbl_RATE.setHidden(true);
        //    btn_RATESAVE.setHidden(true);
        //}
        ApEvent.onlaod();
        return;
    });
}