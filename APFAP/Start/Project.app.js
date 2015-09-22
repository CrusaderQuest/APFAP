/// <reference path="../Resource/Scripts/ext-all-debug.js" />
/// <reference path="../Resource/Scripts/component.js" />
/// <reference path="../Resource/Scripts/noncomponent.js" />
/// <reference path="Project.view.js" />

//App 단 정의 영역 시작
/*
 * 메인화면 비즈니스로직 
 * @date  2015-08-15
 * @autor JuneJobs
*/

//**전역변수영역


//**일반함수영역
function SYS_INIT() {
    // 프로젝트 생성 콤보박스 로드

    var pr = DBParams.create('sp_COMPROJECT', 'PROJECT_TYPE');
    var ds = DBconnect.runProcedure(pr);
    cbo_TYPE_1.bindStore(ds[0]);
    cbo_TYPE_2.bindStore(ds[1]);
    //프로젝트 선택 로드
    pr = DBParams.create('sp_COMPROJECT', 'SEARCH_PROJECT');
    ds = DBconnect.runProcedure(pr);
    grd_SELECT.bindStore(ds[0]);
    //진행중인 프로젝트 로드
    grd_GOING.bindStore(ds[1]);
    //완료된 프로젝트 로드
    grd_CLOSED.bindStore(ds[2]);
    //프로젝트 참가하기 로드
    grd_JOIN.bindStore(ds[3]);
    
}
//이미지처리
upl_TEAMIMG.eUpload = function (fileKey) {
    img_TEAMIMG.setFileKey(fileKey);
}
upl_TEAMIMG.eClear = function () {
    img_TEAMIMG.setFileKey('');
}
btn_CREATE.eClick = function () {
    //빈값 체크
    if (txt_TITLE.getValue() == '') {
        ApMsg.warning('프로젝트의 제목을 입력해 주세요.', function () {
            //메세지의 확인버튼을 누를경우 포커스 이동
            txt_TITLE.focus();
        })
        return;
    }
    //빈값 체크
    if (txa_SUBTITLE.getValue() == '') {
        ApMsg.warning('프로젝트에 대해서 설명해 주세요.', function () {
            //메세지의 확인버튼을 누를경우 포커스 이동
            txt_TITLE.focus();
        })
        return;
    }
    if (cbo_TYPE_1.getValue() == '' || cbo_TYPE_1.getValue() == undefined) {
        ApMsg.warning('프로젝트의 성향을 선택해 주세요.', function () {
            //메세지의 확인버튼을 누를경우 포커스 이동
            cbo_TYPE_1.focus();
        })
        return;
    }
    if (cbo_TYPE_2.getValue() == '' || cbo_TYPE_2.getValue() == undefined) {
        ApMsg.warning('프로젝트의 형태를 선택해 주세요.', function () {
            //메세지의 확인버튼을 누를경우 포커스 이동
            cbo_TYPE_2.focus();
        })
        return;
    }
    if (txt_TEAMNAME.getValue() == '') {
        ApMsg.warning('프로젝트를 진행할 팀명을 입력해 주세요.', function () {
            //메세지의 확인버튼을 누를경우 포커스 이동
            txt_TEAMNAME.focus();
        })
        return;
    }
    if (upl_TEAMIMG.items.items[0].getRawValue() == '') {
        ApMsg.warning('등록할 프로젝트의 대표이미지를 입력해 주세요.', function () {
            //메세지의 확인버튼을 누를경우 포커스 이동
        })
        return;
    }
    //프로젝트 생성
    var pr = DBParams.create('sp_COMPROJECT', 'MAKE_PROJECT');
    pr.addParam('TITLE', txt_TITLE.getValue());
    pr.addParam('SUBTITLE', txa_SUBTITLE.getValue());
    pr.addParam('P_CATEGORY',cbo_TYPE_1.getValue());
    pr.addParam('P_TYPE',cbo_TYPE_2.getValue());
    pr.addParam('P_TEAM',txt_TEAMNAME.getValue());
    pr.addParam('P_IMAGE', upl_TEAMIMG.getFileKey());
    var ds = DBconnect.runProcedure(pr);

    ApMsg.warning('멋진 프로젝트가 되길 바랍니다!', function () {
        txt_TITLE.setValue('');
        txa_SUBTITLE.setValue('');
        cbo_TYPE_1.setValue('');
        cbo_TYPE_2.setValue('');
        txt_TEAMNAME.setValue('');
        upl_TEAMIMG.setFileKey('');
        img_TEAMIMG.setFileKey('');
        SYS_INIT();
    })
}
grd_SELECT.eCellDbClick = function (record, rowIndex, paramId) {
    _setSession(record.data.PROJECT_KEY, 'X');
}
grd_JOIN.eCellDbClick = function (record, rowindex, paramId) {
    Ext.MessageBox.confirm('♧프로젝트 참가 알림♧', '"' + record.data.TITLE + '"프로젝트에 참가 하실려구요?', function (btn) {

        if (btn == 'yes') {
            var pr = DBParams.create('sp_COMPROJECT', 'JOIN_PROJECT');
            pr.addParam('P_KEY', record.data.PROJECT_KEY);
            var ds = DBconnect.runProcedure(pr);
            SYS_INIT();
        }
        else {
        }

    });
}
grd_GOING.eCellDbClick = function (record, rowIndex, paramId) {
    _setSession(record.data.PROJECT_KEY, record.data.MASTER_TF);
}

grd_CLOSED.eCellDbClick = function (record, rowIndex, paramId) {
    _setSession(record.data.PROJECT_KEY, record.data.MASTER_TF);
}




function _setSession(projectkey, master_tf) {
    Ext.Ajax.request({
        async: false,
        url: '../../ServerCore/setSession.aspx',
        method: 'POST',
        params: {
            PROJECT_KEY: projectkey,
            MASTER_TF: master_tf
        },
        success: function (response, eOpt) {
            location.replace('../Start/Main.html');
        },
        failure: function (response, options) {
            alert('통신실패');
            return false;
        }
    });
}