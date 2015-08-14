/// <reference path="../../Resource/Scripts/ext-all-debug.js" />
/// <reference path="../../Resource/Scripts/component.js" />
/// <reference path="../../Resource/Scripts/noncomponent.js" />
/// <reference path="DefFormC01.view.js" />

//App 단 정의 영역 시작
var i = 0;
if (grd_a.selModel.getCount() == 1) {
    i = grd_a.selModel.getSelection();
    Ext.Msg.alert("경고 창", gridData.getData());
}
btn_ok.eClick = function () {
    if (txt_reqNm.getValue() == '') {
        Ext.Msg.alert("경고 창", "선택된 요구사항이 없습니다.");
    }
    else {
        gridData.setFeild(1, {"SUMMARY":"ASDASD"});
    }
}


grd_a.eSelectionChange = function (record, rowIndex, paramId) {
    console.log(paramId, record.data, rowIndex);
    txt_category.setValue(record.data.CATEGORY);
    txt_reqNm.setValue(record.data.REQNM);
    txt_blank.setValue(record.data.BLANK);
}


btn_clrear.eClick = function () {
    txt_summary.setValue(null);
    txt_desc.setValue(null);
    txt_imp.setValue(null);
}

//grd.reconfigure(gridData);


