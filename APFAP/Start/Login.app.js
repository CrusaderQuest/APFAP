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
    if (TRY_LOGIN(txt_USERID_L.getValue(), txt_USERPW_L.getValue())) {

    }
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
                location.replace('../Start/Main.html');
            }
        },
        failure: function (response, options) {
            ApMsg.warning('헉.. 통신이 실패했습니다. 인터넷 연결상태를 확인해 주세요.');
        }
    });
}