/// <reference path="../../Resource/Script/ext-all-debug.js" />
/// <reference path="../../Resource/Script/component.js" />
/// <reference path="../../Resource/Script/noncomponent.js" />
/// <reference path="DevFormA01.view.js" />

//App 단 정의 영역 시작

//그리드 T/F 체크박스로 구현.
//상위 카테고리 추가하고 조회하는 것 추가.

//window
function msgShow(i, j) {
    Ext.Msg.show({
        message: (i + 1) + '번째 탭' + (j + 1) + '번째 튜플 오류',
        icon: Ext.Msg.WARNING,
    });
}
function totalMsgShow() {
    Ext.Msg.show({
        message: '전체 카테고리는 지울 수 없습니다.',
        icon: Ext.Msg.WARNING,
    });
}
function catMsgShow() {
    Ext.Msg.show({
        message: '해당 카테고리에 해당하는 튜플이 전부 삭제됩니다. 수행하시겠습니까?',
        buttons: Ext.Msg.YESNO,
        icon: Ext.Msg.WARNING,
        fn: function (btn) {
            if (btn === 'yes') {
                categoryDeleteArray.add({ CATEGORY_NO: convertCATEGORY_NO(currentCat) });
                for (var i = 0; i < 4; i++) {
                    
                    for (var j = 0; j < dTableArray.data.items[i].data.data.length; j++) {
                        //dTable에서 삭제,deleteArray 추가.
                        if (dTableArray.data.items[i].data.data.items[j].data.CATEGORY_NM == currentCat) {
                            dTableArray.data.items[i].data.removeAt(j);
                            dDevDeleteArray.add({ D_DEV_NO: dTableArray.data.items[i].data.data.items[j].data.D_DEV_NO });
                        }
                    }

                }
                for (var i = 0; i < comboStoreCategory.data.length; i++) {
                    if (comboStoreCategory.data.items[i].data.SHOWVALUE == currentCat) {
                        comboStoreCategory.removeAt(i);
                        selComboStoreCategory.removeAt(i - 1);
                    }
                }
                currentCat = '전체';
                initBtnColor(currentBtn);
                currentBtn = 0;
                selBtnColor(currentBtn);
                grd.reconfigure(dTableArray.data.items[currentBtn].data);
            }
        }
    });
}
//DB 통신
function dbLoad() {
    var pr = DBParams.create('sp_DevFormA01', 'GET_TABLE');
    var ds = DBconnect.runProcedure(pr);
    for (var i = 0; i < 4; i++) {
        dTableArray.add(ds[i]);
        dDevDeleteArray.add(Ext.create('Ext.data.ArrayStore', {
            model: 'devDelete_Array'
        }));
        categoryDeleteArray.add(Ext.create('Ext.data.ArrayStore', {
            model: 'catDelete_Array'
        }));
    }
}
function dbSave() {
    for (var i = 0; i < 4; i++) {
        var errTuple;
        if (errTuple = isErrInTuple(i)) {
            msgShow(i, errTuple);
            return 0;
        }
    }
    dbInsertUpdate();
    dbDelete();
    categoryInsertUpdate();
    categoryDelete();
    return 1;
}
function dbUserLoad() {
    var pr = DBParams.create('sp_DevFormA01', 'GET_PROJECT_USER');
    var ds = DBconnect.runProcedure(pr);
    comboStoreUser = ds[0];
}
function dbCategoryLoad() {
    var pr = DBParams.create('sp_DevFormA01', 'GET_DEV_CATEGORY');
    var ds = DBconnect.runProcedure(pr);
    comboStoreCategory = ds[0];
    cmb_catView.bindStore(comboStoreCategory);
    cmb_catView.setValue('전체');
    pr = DBParams.create('sp_DevFormA01', 'GET_SEL_CATEGORY');
    ds = DBconnect.runProcedure(pr);
    selComboStoreCategory = ds[0];
}
//DB 통신 private
function isErrInTuple(i) {
    //튜플들이 정상인지. return ( 에러x: 0 에러o: 튜플번호.)
    for (var j = 0; j < dTableArray.data.items[i].data.data.length; j++) {
        if (dTableArray.data.items[i].data.data.items[j].data.CATEGORY_NM == null)
            return j;
        if (dTableArray.data.items[i].data.data.items[j].data.D_DEV_NM == null)
            return j;
        if (dTableArray.data.items[i].data.data.items[j].data.START_DT == null)
            return j;
        if (dTableArray.data.items[i].data.data.items[j].data.DEV_VALUE == null)
            return j;
        if (dTableArray.data.items[i].data.data.items[j].data.TEST_VALUE == null)
            return j;
        if (dTableArray.data.items[i].data.data.items[j].data.DEADLINE == null)
            return j;
        if (dTableArray.data.items[i].data.data.items[j].data.USER_NM == null)
            return j;
    }
    return false;
}
function dbInsertUpdate() {
    for (var i = 0; i < 4; i++) {
        //서버,DB,UI,기타 loop
        for (var j = 0; j < dTableArray.data.items[i].data.data.length; j++) {
            //각 탭 튜블 수 loop
            var pr;
            if (dTableArray.data.items[i].data.data.items[j].data.D_DEV_NO == 0) {//insert
                pr = DBParams.create('sp_DevFormA01', 'INSERT_TABLE');
                pr.addParam('H_DEV_NO', i);

            } else {//update
                pr = DBParams.create('sp_DevFormA01', 'UPDATE_TABLE');
                pr.addParam('D_DEV_NO', dTableArray.data.items[i].data.data.items[j].data.D_DEV_NO);

            }
            pr.addParam('CATEGORY_NO', convertCATEGORY_NO(dTableArray.data.items[i].data.data.items[j].data.CATEGORY_NM));
            pr.addParam('D_DEV_NM', dTableArray.data.items[i].data.data.items[j].data.D_DEV_NM);
            pr.addParam('START_DT', ApFn.toDbTyoe('date', dTableArray.data.items[i].data.data.items[j].data.START_DT));
            pr.addParam('DEV_VALUE', dTableArray.data.items[i].data.data.items[j].data.DEV_VALUE);
            pr.addParam('TEST_VALUE', dTableArray.data.items[i].data.data.items[j].data.TEST_VALUE);
            pr.addParam('DEADLINE', ApFn.toDbTyoe('date', dTableArray.data.items[i].data.data.items[j].data.DEADLINE));
            pr.addParam('USER_KEY', convertUSER_KEY(dTableArray.data.items[i].data.data.items[j].data.USER_NM));
            //pr.addParam('USER_KEY', 
            //              getUserNm(dTableArray.data.items[i].data.data.items[j].data.USER_KEY));
            if (dTableArray.data.items[i].data.data.items[j].data.END_DT != null)
                pr.addParam('END_DT', ApFn.toDbTyoe('date', dTableArray.data.items[i].data.data.items[j].data.END_DT));

            var ds = DBconnect.runProcedure(pr);
            var a;
        }
    }
}
function dbDelete() {
    for (var i = 0; i < 4; i++) {
        //서버,DB,UI,기타 loop
        for (var j = 0; j < dDevDeleteArray.data.items[i].data.data.length; j++) {
            //각 탭 delete list 튜블 수 loop
            var pr = DBParams.create('sp_DevFormA01', 'DELETE_TABLE');
            pr.addParam('D_DEV_NO', dDevDeleteArray.data.items[i].data.data.items[j].data);
            var ds = DBconnect.runProcedure(pr);
        }
    }
}
function categoryInsertUpdate() {
    for (var i = 0; i < selComboStoreCategory.data.length; i++) {
        //각 탭 튜블 수 loop
        var pr;
        if (selComboStoreCategory.data.items[i].data.CATEGORY_NO == 0) {//insert
            pr = DBParams.create('sp_DevFormA01', 'INSERT_CATEGORY');
        } else {//update
            pr = DBParams.create('sp_DevFormA01', 'UPDATE_CATEGORY');
            pr.addParam('CATEGORY_NO', selComboStoreCategory.data.items[i].data.HIDEDATA);
        }
        //pr.addParam('CATEGORY_NO', convertCATEGORY_NO(dTableArray.data.items[i].data.data.items[j].data.CATEGORY_NM));
        pr.addParam('CATEGORY_NM', selComboStoreCategory.data.items[i].data.SHOWDATA);

        var ds = DBconnect.runProcedure(pr);
        var a;
    }
}
function categoryDelete() {
    for (var i = 0; i < categoryDeleteArray.data.length; i++) {
        //각 탭 delete list 튜블 수 loop
        var pr = DBParams.create('sp_DevFormA01', 'DELETE_CATEGORY');
        pr.addParam('CATEGORY_NO', categoryDeleteArray.data.items[i].data.CATEGORY_NO);
        var ds = DBconnect.runProcedure(pr);
    }
}
function convertUSER_KEY(input) {
    for (var i = 0; i < comboStoreUser.data.length; i++) {
        if (comboStoreUser.data.items[i].data.SHOWDATA == input)
            return comboStoreUser.data.items[i].data.HIDEDATA;
    }
}
function convertCATEGORY_NO(input) {
    for (var i = 0; i < selComboStoreCategory.data.length; i++) {
        if (selComboStoreCategory.data.items[i].data.SHOWDATA == input)
            return selComboStoreCategory.data.items[i].data.HIDEDATA;
    }
}
function initBtnColor(i) {
    if (i == 0) {
        btn_server.setStyle('background-color', '#0000ff');
    } else if (i == 1) {
        btn_db.setStyle('background-color', '#0000ff');
    } else if (i == 2) {
        btn_ui.setStyle('background-color', '#0000ff');
    } else {
        btn_etc.setStyle('background-color', '#0000ff');
    }
}
function selBtnColor(i) {
    if (i == 0) {
        btn_server.setStyle('background-color', '#00ffff');
    } else if (i == 1) {
        btn_db.setStyle('background-color', '#00ffff');
    } else if (i == 2) {
        btn_ui.setStyle('background-color', '#00ffff');
    } else {
        btn_etc.setStyle('background-color', '#00ffff');
    }
}
//3개 버튼 (카테고리)
btn_catInsert.eClick = function () {
    //같은 이름이 있는지
    for (var i = 0; i < comboStoreCategory.data.length; i++) {
        if (comboStoreCategory.data.items[i].data.SHOWVALUE == txt_catInsert.getValue())
            return;
    }
    //null이 아니면 추가
    if (txt_catInsert.getValue() != null) {
        var input = txt_catInsert.getValue();
        comboStoreCategory.add({ SHOWVALUE: input });
        cmb_catView.bindStore(comboStoreCategory);
        txt_catInsert.setValue(null);

        if (currentCat == '전체') {
            grd.reconfigure(dTableArray.data.items[currentBtn].data);
        } else {
            grd.reconfigure(filterStore);
        }
    }
}
function setFilterStore() {
    filterStore.clearData();
    for (var i = 0; i < dTableArray.data.items[currentBtn].data.data.length; i++) {
        if (dTableArray.data.items[currentBtn].data.data.items[i].data.CATEGORY_NM == currentCat) {
            filterStore.add(dTableArray.data.items[currentBtn].data.data.items[i].data);
        }
    }
    grd.reconfigure(filterStore);
}
btn_catSearch.eClick = function () {
    setFilterStore();
}
btn_catDelete.eClick = function () {
    if (currentCat == '전체')
        totalMsgShow();
    else
        catMsgShow();
}

//4개 탭
btn_server.eClick = function () {
    //이제 탭에서 cmb값을 조건으로 reconfigure 해야함.
    if (currentBtn != 0) {
        if (currentCat == '전체') {
            grd.reconfigure(dTableArray.data.items[0].data);
        } else {
            setFilterStore();
        }
        initBtnColor(currentBtn);
        currentBtn = 0;
        selBtnColor(currentBtn);
    }
}
btn_db.eClick = function () {
    if (currentBtn != 1) {
        if (currentCat == '전체') {
            grd.reconfigure(dTableArray.data.items[1].data);
        } else {
            setFilterStore();
        }
        initBtnColor(currentBtn);
        currentBtn = 1;
        selBtnColor(currentBtn);
    }
}
btn_ui.eClick = function () {
    if (currentBtn != 2) {
        if (currentCat == '전체') {
            grd.reconfigure(dTableArray.data.items[2].data);
        } else {
            setFilterStore();
        }
        initBtnColor(currentBtn);
        currentBtn = 2;
        selBtnColor(currentBtn);
    }
}
btn_etc.eClick = function () {
    if (currentBtn != 3) {
        if (currentCat == '전체') {
            grd.reconfigure(dTableArray.data.items[3].data);
        } else {
            setFilterStore();
        }
        initBtnColor(currentBtn);
        currentBtn = 3;
        selBtnColor(currentBtn);
    }
}

//3개 버튼 (그리드)
btn_save.eClick = function () {
    if (saveBtnState == 0) {
        pnl_content.setDisabled(false);
        btn_save.setText("저장");
        saveBtnState = 1;
    } else {
        pnl_content.setDisabled(true);
        btn_save.setText("수정");
        saveBtnState = 0;
        //DB 통신 insert, update, delete.
        if (dbSave()) {
            //다시 로드. deletelist 초기화
            dDevDeleteArray.clearData();
            dTableArray.clearData();
            dbLoad();
            dbCategoryLoad();
            grd.reconfigure(dTableArray.data.items[0].data);
            initBtnColor(currentBtn);
            currentBtn = 0;
            selBtnColor(currentBtn);
            currentCat = '전체';
        }
    }
}
btn_insert.eClick = function () {
    //새 튜플 추가.
    //이제 insert,delete에 filterSotre에 되어도 dTable 에도 되어야함.
    if (currentCat != '전체') {
        filterStore.add({
            CATEGORY_NM: currentCat, D_DEV_NM: null, START_DT: null, DEV_VALUE: null, TEST_VALUE: null,
            DEADLINE: null, USER_KEY: null, USER_NM: null, END_DT: null
        });
    }
    dTableArray.data.items[currentBtn].data.add({
        CATEGORY_NM: null, D_DEV_NM: null, START_DT: null, DEV_VALUE: null, TEST_VALUE: null,
        DEADLINE: null, USER_KEY: null, USER_NM: null, END_DT: null
    });
}
btn_delete.eClick = function () {
    //deletelist추가
    for (var i = 0; i < grd.getSelection().length; i++) {
        var tempNo = grd.getSelection()[i].data.D_DEV_NO;
        dDevDeleteArray.data.items[currentBtn].data.add(tempNo);
    }
    if (currentCat != '전체') {
        filterStore.remove(grd.getSelection());
    }
    dTableArray.data.items[currentBtn].data.remove(grd.getSelection());
}
cmb_catView.eChange = function (record) {
    currentCat = record.selection.data.SHOWVALUE;
}
/*
grd.eSelectionChange = function (record, rowIndex, paramId) {
    console.log(paramId, record.data, rowIndex);
    text_cc.setValue(record.data.USERID);
}
*/
/*
grd.eUpdate = function (record, rowIndex, paramId) {
    if (paramId == 'START_DT' || paramId == 'DEADLINE' || paramId == 'END_DT') {
        var t1Date = record.get(paramId);
        var t2Date = Ext.Date.dateFormat(t1Date, 'Y-m-d');
        record.set(paramId, t2Date);
    }
}
*/