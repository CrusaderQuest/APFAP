/// <reference path="../../Resource/Scripts/ext-all-debug.js" />
/// <reference path="../../Resource/Scripts/component.js" />
/// <reference path="../../Resource/Scripts/noncomponent.js" />
/// <reference path="DefFormA01.view.js" />

//App 단 정의 영역 시작

function GRD_LOAD() {
    //콤보에 데이터
    var pr = DBParams.create('sp_COMPROJECT', 'PROJECT_TYPE');
    var ds = DBconnect.runProcedure(pr);
    cbo_TYPE_1.bindStore(ds[0]);
    cbo_TYPE_2.bindStore(ds[1]);
    //데이터생성
    var pr = DBParams.create('sp_DEFFORMA01', 'GET_TABLE');
    //데이터셋
    var ds = DBconnect.runProcedure(pr);
    dbData = ds[0];
    //데이터 bind
    txt_TITLE.setValue(dbData.data.items[0].data.TITLE);
    dt_END.setValue(dbData.data.items[0].data.ENDDATE);
    txa_SUBTITLE.setValue(dbData.data.items[0].data.SUBTITLE);
    cbo_TYPE_1.setValueHS(dbData.data.items[0].data.P_CATEGORY);
    cbo_TYPE_2.setValueHS(dbData.data.items[0].data.P_TYPE);
    txt_TEAMNAME.setValue(dbData.data.items[0].data.P_TEAM);
    upl_TEAMIMG.setFileKey(dbData.data.items[0].data.P_IMAGE);
    img_TEAMIMG.setFileKey(dbData.data.items[0].data.P_IMAGE);
}   

btn_SAVE.eClick = function () {
    if (EmptyCheck()) {
        var prIU = DBParams.create('sp_DefFormA01', 'UPDATE_TABLE');
        //addParam 파라미터 추가
        prIU.addParam("TITLE", txt_TITLE.getValue());
        prIU.addParam("SUBTITLE", txa_SUBTITLE.getValue());
        prIU.addParam("P_CATEGORY", cbo_TYPE_1.getValue());
        prIU.addParam('ENDDATE', ApFn.toDbTyoe('date', dt_END.getYMD()));
        prIU.addParam("P_TYPE", cbo_TYPE_2.getValue());
        prIU.addParam("P_TEAM", txt_TEAMNAME.getValue());
        prIU.addParam("P_IMAGE", upl_TEAMIMG.getFileKey());
        
        var ds = DBconnect.runProcedure(prIU);
    }else{}
}

upl_TEAMIMG.eUpload = function (fileKey) {
    img_TEAMIMG.setFileKey(fileKey);
}
upl_TEAMIMG.eClear = function () {
    img_TEAMIMG.setFileKey('');
}

EmptyCheck = function () {
    //빈값 체크
    if (txt_TITLE.getValue() == '') {
        ApMsg.warning('프로젝트의 제목을 입력해 주세요.', function () {
            //메세지의 확인버튼을 누를경우 포커스 이동
            txt_TITLE.focus();
        })
        return false;
    } else {
        return true;
    }
    //빈값 체크
    if (txa_SUBTITLE.getValue() == '') {
        ApMsg.warning('프로젝트에 대해서 설명해 주세요.', function () {
            //메세지의 확인버튼을 누를경우 포커스 이동
            txt_TITLE.focus();
        })
        return false;
    } else {
        return true;
    }
    if (cbo_TYPE_1.getValue() == '' || cbo_TYPE_1.getValue() == undefined) {
        ApMsg.warning('프로젝트의 성향을 선택해 주세요.', function () {
            //메세지의 확인버튼을 누를경우 포커스 이동
            cbo_TYPE_1.focus();
        })
        return false;
    } else {
        return true;
    }
    if (cbo_TYPE_2.getValue() == '' || cbo_TYPE_2.getValue() == undefined) {
        ApMsg.warning('프로젝트의 형태를 선택해 주세요.', function () {
            //메세지의 확인버튼을 누를경우 포커스 이동
            cbo_TYPE_2.focus();
        })
        return false;
    } else {
        return true;
    }
    if (txt_TEAMNAME.getValue() == '') {
        ApMsg.warning('프로젝트를 진행할 팀명을 입력해 주세요.', function () {
            //메세지의 확인버튼을 누를경우 포커스 이동
            txt_TEAMNAME.focus();
        })
        return false;
    } else {
        return true;
    }
    if (upl_TEAMIMG.items.items[0].getRawValue() == '') {
        ApMsg.warning('등록할 프로젝트의 대표이미지를 입력해 주세요.', function () {
            //메세지의 확인버튼을 누를경우 포커스 이동
        })
        return false;
    } else {
        return true;
    }
}