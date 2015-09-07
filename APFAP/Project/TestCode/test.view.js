/// <reference path="../../Resource/Scripts/ext-all-debug.js" />
/// <reference path="../../Resource/Scripts/component.js" />
/// <reference path="../../Resource/Scripts/noncomponent.js" />
//

//View 단 정의 영역 시작


var tbl = ApTable.create(1);
tbl.setTarget();
var upload = ApUpload.create('test', 'aa');
var img = ApImg.create();
viewPanel.full(tbl);

upload.eUpload = function (fileKey) {
    img.setFileKey(fileKey);
}
upload.eClear = function () {
    img.setFileKey('');
}

ApEvent.onlaod = function () {
}