/// <reference path="../../Resource/Scripts/ext-all-debug.js" />
/// <reference path="../../Resource/Scripts/component.js" />
/// <reference path="../../Resource/Scripts/noncomponent.js" />
/// <reference path="Login.app.js" />

//panel
var pnl_contents = ApPanel.create();
var pnl_login = ApPanel.create();

//data-type

// tbl_login
var tbl_login = ApTable.create();
tbl_login.addCls('tableStyle_main');
tbl_login.updateLayout();
tbl_login.setTarget();
var btn_save = ApButton.create("변경상태 저장");
