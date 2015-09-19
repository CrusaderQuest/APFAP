/// <reference path="../../Resource/Script/ext-all-debug.js" />
/// <reference path="../../Resource/Script/component.js" />
/// <reference path="../../Resource/Script/noncomponent.js" />
/// <reference path="DesFormC01.view.js" />
var delArr = [];
var selected = '';
//App 단 정의 영역 시작
//버튼 기능
btn_show_H.eClick = function () {
    tre_H.expandAll();
}
btn_add_H.eClick = function () {
    var node = getNode('', true, true);
    tre_H.addNode(node);
}
btn_child_H.eClick = function () {
    var node = getNode('', true, true);
    tre_H.addNode(node, tre_H.selected);
}
btn_remove_H.eClick = function () {
    tre_H.selected.cascadeBy(function (childNode) {
        var delObj = {
            SCREEN_NO: '',
            SCREEN_NM: '',
        };
        delObj.SCREEN_NO = childNode.data.value.getValue("SCREEN_NO");
        delObj.SCREEN_NM = childNode.data.text;
        delArr.push(delObj);
    }, this);

    tre_H.removeNode(tre_H.selected);
}
btn_up_H.eClick = function () {
    tre_H.upNode(tre_H.selected);
}
btn_down_H.eClick = function () {
    tre_H.downNode(tre_H.selected);
}
btn_save_H.eClick = function () {
    if (tre_H.selected != '');
    TREE_SAVE();
}
tre_H.eEnter = function (node) {
    txt_SCREEN_NM_D.setValue(node.value.getValue('SCREEN_NM'));
}
tre_H.eClick = function (node) {
    if (node.value.getValue('SCREEN_NO') != undefined) {
        tbl_D.enable();
        console.log(node);
        CLEAR_TABLE();
        txt_SCREEN_NM_D.setValue(node.text);
        txa_SUMMARY_D.setValue(node.value.getValue('SUMMARY'));
        txt_USER_NM_D.setValue(node.value.getValue('USER_KEY'));
        upl_UPLOAD_D.setFileKey(node.value.getValue('UP_KEY'));
        img_UPLOAD_D.setFileKey(node.value.getValue('UP_KEY'));
        txt_SCREEN_D.setValue(node.value.getValue('SCREEN_DATE'));
    } else {
        tbl_D.disable();
        img_UPLOAD_D.setFileKey('');
    }

}

//이미지처리
upl_UPLOAD_D.eUpload = function (fileKey) {
    img_UPLOAD_D.setFileKey(fileKey);
}
upl_UPLOAD_D.eClear = function () {
    img_UPLOAD_D.setFileKey('');
}
function CLEAR_TABLE() {
    txt_SCREEN_NM_D.setValue('');
    txa_SUMMARY_D.setValue('');
    txt_USER_NM_D.setValue('');
    upl_UPLOAD_D.setFileKey('');
    img_UPLOAD_D.setFileKey('');
    txt_SCREEN_D.setValue('');
}
function SYS_INIT() {
    TREE_BIND();
}
function TREE_BIND() {
    var pr = DBParams.create('sp_DesFormC01', 'SEARCH_TREE');
    var ds = DBconnect.runProcedure(pr);

    tre_H.clear();
    for (var i = 0 ; i < ds[0].getCount() ; i++) {
        reafQuarter = true;
        var node = getNode(ds[0].getAt(i).get('SCREEN_NM'), true, false);
        node.value.setValue('SCREEN_NO', ds[0].getAt(i).get('SCREEN_NO'));
        node.value.setValue('SUMMARY', ds[0].getAt(i).get('SUMMARY'));
        node.value.setValue('UP_KEY', ds[0].getAt(i).get('UP_KEY'));
        node.value.setValue('SCREEN_DATE', ds[0].getAt(i).get('SCREEN_DATE'));
        tre_H.bindNode(node, ds[0].getAt(i).get('DEPTH'));
        
    }
}
function TREE_SAVE() {
    //현재 트리의 상태값 저장
    var treeArr = [];
    //저장할 데이터 객체 저장
    var saveArr = [];
    //트리상태 저장
    tre_H.getRootNode().cascadeBy(function (childNode) {
        treeArr.push(childNode);
        length++;
    }, this);
    for (var i = 1; i < treeArr.length; i++) {
        //저장할 데이터 객체
        var saveObj = {
            SCREEN_NO: '',
            SCREEN_NM: '',
            DEPTH: '',
            SEQ: ''

        };
        saveObj.SCREEN_NO = treeArr[i].data.value.getValue("SCREEN_NO");
        saveObj.SCREEN_NM = treeArr[i].data.text; 
        saveObj.DEPTH = treeArr[i].data.depth;
        saveObj.SEQ = i;
        saveArr.push(saveObj);
    }
    //Insert Update 구분
    for (var i = 0; i < saveArr.length; i++) {
        if(saveArr[i].SCREEN_NO == undefined){
            //인서트건
            var pr = DBParams.create('sp_DesFormC01', 'INSERT_TREE');
            pr.addParam('SCREEN_NM', saveArr[i].SCREEN_NM);
            pr.addParam('DEPTH', saveArr[i].DEPTH);
            pr.addParam('SEQ', saveArr[i].SEQ);
            var ds = DBconnect.runProcedure(pr);
        } else {
            //업데이트 건
            var pr = DBParams.create('sp_DesFormC01', 'UPDATE_TREE');
            pr.addParam('SCREEN_NO', saveArr[i].SCREEN_NO);
            pr.addParam('SCREEN_NM', saveArr[i].SCREEN_NM);
            pr.addParam('DEPTH', saveArr[i].DEPTH);
            pr.addParam('SEQ', saveArr[i].SEQ);
            var ds = DBconnect.runProcedure(pr);
        }
    }
    //누른건 업데이트
    var pr = DBParams.create('sp_DesFormC01', 'UPDATE_TABLE');
    pr.addParam('SCREEN_NO', tre_H.selected.data.value.getValue('SCREEN_NO'));
    pr.addParam('UP_KEY', upl_UPLOAD_D.getFileKey());
    pr.addParam('SUMMARY', txa_SUMMARY_D.getValue());
    pr.addParam('SCREEN_DATE', txt_SCREEN_D.getValue());
    pr.addParam('UP_USER', txt_USER_NM_D.getValue());
    var ds = DBconnect.runProcedure(pr);
    //딜리트 처리
    for (var i = 0; i < delArr.length; i++) {
        if (delArr[i].SCREEN_NO != '') {
            var pr = DBParams.create('sp_DesFormC01', 'DELETE_TREE');
            pr.addParam('SCREEN_NO', delArr[i].SCREEN_NO);
            var ds = DBconnect.runProcedure(pr);
        }
    }
    CLEAR_TABLE();
    selected = tre_H.selected.data;
    TREE_BIND();
}