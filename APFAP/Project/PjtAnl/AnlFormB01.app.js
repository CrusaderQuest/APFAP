/// <reference path="../../Resource/Scripts/ext-all-debug.js" />
/// <reference path="../../Resource/Scripts/component.js" />
/// <reference path="../../Resource/Scripts/noncomponent.js" />
/// <reference path="AnlFormB01.view.js" />

//View 단 정의 영역 시작
function GRD_LOAD() {
    //데이터생성
    var pr = DBParams.create('MAIN_REQ', 'SEARCH_TABLE');
    //데이터셋
    var ds = DBconnect.runProcedure(pr);
    grd_a.reconfigure(ds[0]);
}

var i = 0;
btn_ok.eClick = function () {
    if (txt_reqNm.getValue() == '') {
        Ext.Msg.alert("경고 창", "요구사항을 입력해주세요!");
    } else {
        gridData.add({ USERID: 'aaa' + i++, CATEGORY: txt_category.getValue(), REQNM: txt_reqNm.getValue(), 
            SUMMARY: txt_summary.getValue(), DESCRIPTION: txt_desc.getValue(), IMPORTANT: cbo_imp.getValue(),
            LEVEL: cbo_lev.getValue(), BLANK: txt_blank.getValue() });
    }
}
btn_del.eClick = function () {
    if (grd_a.selModel.getSelection() == 0) {
        Ext.Msg.alert("경고 창", "체크 해주세요.");
    } else {
        gridData.remove(grd_a.selModel.getSelection());
    }
}
btn_clrear.eClick = function () {
    txt_category.setValue(null);
    txt_reqNm.setValue(null);
    txt_blank.setValue(null);
    txt_category.setValue(null);
    txt_summary.setValue(null);
    txt_desc.setValue(null);
    cbo_imp.setValue(null);
    cbo_lev.setValue(null);
}