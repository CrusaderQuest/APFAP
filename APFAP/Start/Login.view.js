/// <reference path="../Resource/Scripts/ext-all-debug.js" />
/// <reference path="../Resource/Scripts/component.js" />
/// <reference path="../Resource/Scripts/noncomponent.js" />

var loginPanel = Ext.create('Ext.panel.Panel', {
    height : 150,
    width: 320,
    title: '어서오세요. 회원님'
})

var loginTable = ApTable.create(1);
loginTable.setTarget();

var txt_USERID_L = ApText.create('','a',0);
txt_USERID_L.setWidth(300);
txt_USERID_L.emptyText = '아이디를 입력해주세요.';
txt_USERID_L.applyEmptyText();
var txt_USERPW_L = ApText.create('','b',0);
txt_USERPW_L.setWidth(195);
txt_USERPW_L.emptyText = '비밀번호';
txt_USERPW_L.applyEmptyText();
var btn_LOGIN_L = ApButton.create('들어가기','c');
btn_LOGIN_L.setMargin('0 0 0 15')
loginTable.cellShare(2);

var joinPanel = Ext.create('Ext.panel.Panel', {
    //flex: 3,
    height : 250,
    width: 310,
    title: '지금당장 프로젝트에 참여하세요!'
})

var joinTable = ApTable.create(1);
joinTable.setTarget();

var txt_USERID_J = ApText.create('', 'a', 0);
txt_USERID_J.setWidth(300);
txt_USERID_J.emptyText = '아이디';
txt_USERID_J.applyEmptyText();
var txt_EMAIL_J = ApText.create('', 'a', 0);
txt_EMAIL_J.setWidth(300);
txt_EMAIL_J.emptyText = '이메일 주소';
txt_EMAIL_J.applyEmptyText();
var txt_USERPW_J = ApText.create('', 'b', 0);
txt_USERPW_J.setWidth(195);
txt_USERPW_J.emptyText = '비밀번호';
txt_USERPW_J.applyEmptyText();
var btn_JOIN_J = ApButton.create('가입하기', 'c');
btn_JOIN_J.setMargin('0 0 0 15')
joinTable.cellShare(2);

viewPanel.add({
    xtype: 'panel',
    header: false,
    background: 'red',
    title: 'My Panel',
    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    items: [
        {
            xtype: 'tbspacer',
            flex: 1
        },
        {
            xtype: 'panel',
            width : 850,
            header: false,
            title: 'My Panel',
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'panel',
                    flex: 1,
                    header: false,
                    title: 'My Panel',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'tbspacer',
                            //flex: 1,
                            height: 155
                        },
                        {
                            xtype: 'tbspacer',
                            height: 350,
                            cls: 'loginLogo'
                        },
                        {
                            xtype: 'tbspacer',
                            flex: 1
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    width: 310,
                    header: false,
                    title: 'My Panel',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'tbspacer',
                            flex: 1,
                            height: ''
                        },
                        loginPanel,
                        {
                            xtype: 'tbspacer',
                            height: 20
                        },
                        joinPanel,
                        {
                            xtype: 'tbspacer',
                            flex: 1
                        }
                    ]
                }
            ]
        },
        {
            xtype: 'tbspacer',
            flex: 1
        }
    ]
})


ApEvent.onlaod = function () {
    loginPanel.add(loginTable);
    joinPanel.add(joinTable);
    txt_USERPW_L.inputEl.dom.type = 'password';
    txt_USERPW_J.inputEl.dom.type = 'password';
}