/// <reference path="../Resource/Script/ext-all-debug.js" />
/// <reference path="../Resource/Script/component.js" />
/// <reference path="../Resource/Script/noncomponent.js" />
/// <reference path="Login.view.js" />

//로그인클릭
btn_LOGIN_L.eClick = function () {
    if (txt_USERID_L.getValue() == '') {
        ApMsg.warning('아이디를 입력해 주세요.', function () {
            txt_USERID_L.focus();
        })
        return;
    }
    if (txt_USERPW_L.getValue() == '') {
        ApMsg.warning('비밀번호를 입력해 주세요.', function () {
            txt_USERPW_L.focus();
        })
        return;
    }
    TRY_LOGIN(txt_USERID_L.getValue(), txt_USERPW_L.getValue());
}
//회원가입 클릭
btn_JOIN_J.eClick = function () {
    if (txt_USERID_J.getValue() == '') {
        ApMsg.warning('아이디를 입력해 주세요.', function () {
            txt_USERID_J.focus();
        })
        return;
    }
    if (txt_EMAIL_J.getValue() == '') {
        ApMsg.warning('이메일을 입력해 주세요.', function () {
            txt_EMAIL_J.focus();
        })
        return;
    }
    if (txt_USERPW_J.getValue() == '') {
        ApMsg.warning('비밀번호를 입력해 주세요.', function () {
            txt_USERPW_J.focus();
        })
        return;
    }
    TRY_JOIN(txt_USERID_J.getValue(), txt_USERPW_J.getValue(), txt_EMAIL_J.getValue())
}
txt_USERPW_L.eKeyDown = function (e) {
    if(e.keyCode == 13)
    btn_LOGIN_L.eClick();
}
txt_USERPW_J.eKeyDown = function (e) {
    if (e.keyCode == 13)
    btn_JOIN_J.eClick();
}
function TRY_LOGIN(userid, userpw) {
    Ext.Ajax.request({
        async: false,
        url: '../ServerCore/Login.aspx',
        method: 'POST',
        params: {
            USERID: userid,
            USERPW: userpw
        },
        reader: {
            type: 'json'
        },
        success: function (response, eOpt) {
            console.log(response)
            var resText = response.responseText;
            if (resText == 'NID') {
                ApMsg.warning('아이디가 존재하지 않네요! 다시한번 확인해 주세요', function(){
                    txt_USERPW_L.setValue('');
                    txt_USERID_L.focus();
                });
                return;
            } else if (resText == 'NPW') {
                ApMsg.warning('비밀번호가 정확하지 않네요! 다시한번 확인해 주세요', function () {
                    txt_USERPW_L.setValue('');
                    txt_USERPW_L.focus();
                });
                return;
            } else {
                location.replace('../Start/Project.html');
            }
        },
        failure: function (response, options) {
            ApMsg.warning('헉.. 통신이 실패했습니다. 인터넷 연결상태를 확인해 주세요.');
        }
    });
}

function TRY_JOIN(userid, userpw, email) {
    Ext.Ajax.request({
        async: false,
        url: '../ServerCore/Join.aspx',
        method: 'POST',
        params: {
            USERID: userid,
            USERPW: userpw,
            EMAIL: email
        },
        reader: {
            type: 'json'
        },
        success: function (response, eOpt) {
            console.log(response)
            var resText = response.responseText;
            if (resText == 'EID') {
                ApMsg.warning('멋진 아이디인, "' + txt_USERID_J.getValue() + '"는 이미 다른 분이 사용중입니다..-_-', function () {
                    txt_USERID_J.setValue('');
                    txt_USERID_J.focus();
                });
                return;
            } else if (resText == 'EEMAIL') {
                ApMsg.warning('"' + txt_EMAIL_J.getValue() + '" 이 이메일로는 이미 가입된 것 같은데요?', function () {
                    txt_EMAIL_J.setValue('');
                    txt_EMAIL_J.focus();
                });
                return;
            } else {
                ApMsg.warning('축하합니다! 회원가입에 성공 했습니다. 환영합니다. "' + txt_USERID_J.getValue() + "님!'", function () {
                    txt_USERID_L.setValue(txt_USERID_J.getValue());
                    txt_USERPW_L.setValue(txt_USERPW_J.getValue());
                    txt_USERID_J.setValue('');
                    txt_EMAIL_J.setValue('');
                    txt_USERPW_J.setValue('');
                    txt_USERPW_L.focus();
                });
            }
        },
        failure: function (response, options) {
            ApMsg.warning('헉.. 통신이 실패했습니다. 인터넷 연결상태를 확인해 주세요.');
        }
    });
}