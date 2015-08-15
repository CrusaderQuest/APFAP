/// <reference path="../../Resource/Scripts/ext-all-debug.js" />
/// <reference path="../../Resource/Scripts/component.js" />
/// <reference path="../../Resource/Scripts/noncomponent.js" />
/// <reference path="AnlFormB01.view.js" />

//View 단 정의 영역 시작
function GRD_LOAD() {
    //데이터생성
    var pr = DBParams.create('sp_ANLFORMB01', 'GET_TABLE');
    //데이터셋
    var ds = DBconnect.runProcedure(pr);
    gridData = ds[0];
    grd_a.reconfigure(gridData);
}

var i = 0;
btn_ok.eClick = function () {
    if (txt_reqNm.getValue() == '') {
        Ext.Msg.alert("경고 창", "요구사항을 입력해주세요!");
    } else {
        gridData.add({
            USERID: 'aaa' + i++, CATEGORY: txt_category.getValue(), REQNM: txt_reqNm.getValue(),
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
//btn_save.eClick = function () {
//    Ext.Msg.show({
//        title:'발냄새',
//        message: '당신은발냄새가납니까',
//        buttons: Ext.Msg.YESNO,
//        icon: Ext.Msg.QUESTION,
//        fn: function(btn) {
//            if (btn === 'yes') {
//                pr.addParam('UPDATE_TABLE', 'gridData');
//                Ext.Msg.alert('Yes','정직하시군요발냄새를더나게해드리죠.');
//            } else{

//            }
//        }
//    });
//}
   

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

grd_a.eSelectionChange = function (record, rowIndex, paramId) {
    console.log(paramId, record.data, rowIndex);
    txt_category.setValue(record.data.CATEGORY);
    txt_reqNm.setValue(record.data.REQ_NM);
    txt_summary.setValue(record.data.SUMMARY);
    txt_desc.setValue(record.data.DESCRIPTION);
    txt_blank.setValue(record.data.BLANK);
    cbo_imp.setValue(record.data.IMPORTANT);
    var star = ''; 
    var starP = 0;
    starP = record.data.LEV;
    for (var i = 0; i < starP; i++) {
        star += "★";
    }
    cbo_lev.setValue(star);
}