/// <reference path="../../Resource/Scripts/ext-all-debug.js" />
/// <reference path="../../Resource/Scripts/component.js" />
/// <reference path="../../Resource/Scripts/noncomponent.js" />
//

//View 단 정의 영역 시작
var upButton = Ext.create('Ext.button.Button', {
    text: '서버업로드',
    handler: function () {
        var form = this.up('form').getForm();
        if (form.isValid()) {
            form.submit({
                url: '../../ServerCore/FileSystem.aspx?FORMNAME=ComFormC01&E_USER=' + ApFn.getUser() + '&PROJECT_KEY='+ ApFn.getProjectKey(),
                waitMsg: '파일업로드중...',
                params: {
                    TYPE: 'UPLOAD'
                },
                success: function (fp, o) {
                    Ext.Msg.alert(o.result.file + ', 업로드 되었습니다.');
                }
            });
        }
    }
});
aa = Ext.create('Ext.form.Panel', {
    title: '파일업로더',
    bodyPadding: 10,
    frame: true,
    layout:'hbox',
    items: [{
        xtype: 'filefield',
        name: 'photo',
        fieldLabel: '파일',
        labelWidth: 50,
        width: 500,
        msgTarget: 'side',
        allowBlank: false,
        anchor: '100%',
        buttonText: '파일선택..'
    }, upButton]
});
viewPanel.full(aa);

ApEvent.onlaod = function () {
    //var tab = ApTab.create();
    //tab.addTab('안녕').full(grd);
    //tab.addTab('하이').full(tbl_H);
    //tab.addTab('헬로우').full(tre_CUSTOMTREE);
}