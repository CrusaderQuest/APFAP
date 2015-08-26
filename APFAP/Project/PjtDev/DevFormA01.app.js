/// <reference path="../../Resource/Script/ext-all-debug.js" />
/// <reference path="../../Resource/Script/component.js" />
/// <reference path="../../Resource/Script/noncomponent.js" />
/// <reference path="DevFormA01.view.js" />

//App 단 정의 영역 시작

//그리드 T/F 체크박스로 구현.
//상위 카테고리 추가하고 조회하는 것 추가.

//window
/*
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
                            dDevDeleteArray.data.items[i].data.add({ D_DEV_NO: dTableArray.data.items[i].data.data.items[j].data.D_DEV_NO });
                            dTableArray.data.items[i].data.removeAt(j);
                            j = j - 1;
                        }
                    }

                }
                for (var i = 0; i < comboStoreCategory.data.length; i++) {
                    if (comboStoreCategory.data.items[i].data.SHOWVALUE == currentCat) {
                        comboStoreCategory.removeAt(i);
                        cmb_catView.bindStore(comboStoreCategory);
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
    var pr1 = DBParams.create('sp_DevFormA01', 'GET_TABLE');
    var ds1 = DBconnect.runProcedure(pr1);
    for (var i = 0; i < 4; i++) {
        dTableArray.add(ds1[i]);
        dDevDeleteArray.add(Ext.create('Ext.data.ArrayStore', {
            model: 'devDelete_Array'
        }));
    }
}
function dbSave() {
    dTableAdd();
    for (var i = 0; i < 4; i++) {
        var errTuple;
        if (errTuple = isErrInTuple(i)) {
            msgShow(i, errTuple);
            return 0;
        }
    }
    categoryInsertUpdate();
    comboStoreCategory.clearData();
    selComboStoreCategory.clearData();
    dbCategoryLoad();

    dbInsertUpdate();
    dbDelete();
    categoryDelete();
    comboStoreCategory.clearData();
    selComboStoreCategory.clearData();
    dbCategoryLoad();
    return 1;
}
function dbUserLoad() {
    var pr = DBParams.create('sp_DevFormA01', 'GET_PROJECT_USER');
    var ds = DBconnect.runProcedure(pr);
    comboStoreUser = ds[0];
}
function dbCategoryLoad() {
    var pr1 = DBParams.create('sp_DevFormA01', 'GET_DEV_CATEGORY');
    var ds1 = DBconnect.runProcedure(pr1);
    comboStoreCategory = ds1[0];
    cmb_catView.bindStore(comboStoreCategory);
    var pr2 = DBParams.create('sp_DevFormA01', 'GET_SEL_CATEGORY');
    var ds2 = DBconnect.runProcedure(pr2);
    selComboStoreCategory = ds2[0];
}
//DB 통신 private
function isErrInTuple(i) {
    //튜플들이 정상인지. return ( 에러x: 0 에러o: 튜플번호.)
    for (var j = 0; j < dTableArray.data.items[i].data.data.length; j++) {
        if (dTableArray.data.items[i].data.data.items[j].data.CATEGORY_NM == '')
            return j;
        if (dTableArray.data.items[i].data.data.items[j].data.D_DEV_NM == '')
            return j;
        if (dTableArray.data.items[i].data.data.items[j].data.START_DT == '')
            return j;
        if (dTableArray.data.items[i].data.data.items[j].data.DEV_VALUE == '')
            return j;
        if (dTableArray.data.items[i].data.data.items[j].data.TEST_VALUE == '')
            return j;
        if (dTableArray.data.items[i].data.data.items[j].data.DEADLINE == '')
            return j;
        if (dTableArray.data.items[i].data.data.items[j].data.USER_NM == '')
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
        }
    }
}
function dbDelete() {
    for (var i = 0; i < 4; i++) {
        //서버,DB,UI,기타 loop
        for (var j = 0; j < dDevDeleteArray.data.items[i].data.data.length; j++) {
            //각 탭 delete list 튜블 수 loop
            var pr = DBParams.create('sp_DevFormA01', 'DELETE_TABLE');
            pr.addParam('D_DEV_NO', dDevDeleteArray.data.items[i].data.data.items[j].data.D_DEV_NO);
            var ds = DBconnect.runProcedure(pr);
        }
    }
}
function categoryInsertUpdate() {
    for (var i = 0; i < comboStoreCategory.data.length; i++) {
        //각 탭 튜블 수 loop
        var pr;
        if (comboStoreCategory.data.items[i].data.HIDEVALUE == 0) {//insert
            pr = DBParams.create('sp_DevFormA01', 'INSERT_CATEGORY');
        } else {//update
            pr = DBParams.create('sp_DevFormA01', 'UPDATE_CATEGORY');
            pr.addParam('CATEGORY_NO', comboStoreCategory.data.items[i].data.HIDEVALUE);
        }
        //pr.addParam('CATEGORY_NO', convertCATEGORY_NO(dTableArray.data.items[i].data.data.items[j].data.CATEGORY_NM));
        pr.addParam('CATEGORY_NM', comboStoreCategory.data.items[i].data.SHOWVALUE);

        var ds = DBconnect.runProcedure(pr);
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

//filterStore 변경.
function setFilterStore() {
    filterStore.clearData();
    for (var i = 0; i < dTableArray.data.items[currentBtn].data.data.length; i++) {
        if (dTableArray.data.items[currentBtn].data.data.items[i].data.CATEGORY_NM == currentCat) {
            filterStore.add(dTableArray.data.items[currentBtn].data.data.items[i].data);
        }
    }
    grd.reconfigure(filterStore);
}
//3개 버튼 (카테고리)
btn_catInsert.eClick = function () {
    //같은 이름이 있는지
    for (var i = 0; i < comboStoreCategory.data.length; i++) {
        if (comboStoreCategory.data.items[i].data.SHOWVALUE == txt_catInsert.getValue()) 
            return;
    }
    //null이 아니면 추가
    if (txt_catInsert.getValue() != '') {
        var input = txt_catInsert.getValue();
        comboStoreCategory.add({ HIDEVALUE: 0, SHOWVALUE: input });
        cmb_catView.bindStore(comboStoreCategory);
        txt_catInsert.setValue(null);

        if (currentCat == '전체') {
            grd.reconfigure(dTableArray.data.items[currentBtn].data);
        } else {
            grd.reconfigure(filterStore);
        }
    }
}
btn_catSearch.eClick = function () {
    dTableAdd();
    if (currentCat != '전체') {
        setFilterStore();
        grd.setLockColumns('CATEGORY_NM');
    }
    else {
        grd.reconfigure(dTableArray.data.items[currentBtn].data);
        grd.setUnLockColumns('CATEGORY_NM');
    }
}
btn_catDelete.eClick = function () {
    dTableAdd();
    if (currentCat == '전체')
        totalMsgShow();
    else
        catMsgShow();
}

//탭 변경시 메인 store add
function dTableAdd() {
    for (var i = 0; i < filterStore.data.length; i++) {
        if (filterStore.data.items[i].data.D_DEV_NO < 0) {
            filterStore.data.items[i].data.D_DEV_NO = 0;
            dTableArray.data.items[currentBtn].data.add(filterStore.data.items[i].data);
        }
    }
    filterStore.clearData();
}
//4개 탭
btn_server.eClick = function () {
    //이제 탭에서 cmb값을 조건으로 reconfigure 해야함.
    if (currentBtn != 0) {
        dTableAdd();
        initBtnColor(currentBtn);
        currentBtn = 0;
        selBtnColor(currentBtn);
        if (currentCat == '전체') {
            grd.reconfigure(dTableArray.data.items[0].data);
        } else {
            setFilterStore();
        }
    }
}
btn_db.eClick = function () {
    if (currentBtn != 1) {
        dTableAdd();
        initBtnColor(currentBtn);
        currentBtn = 1;
        selBtnColor(currentBtn);
        if (currentCat == '전체') {
            grd.reconfigure(dTableArray.data.items[1].data);
        } else {
            setFilterStore();
        }
    }
}
btn_ui.eClick = function () {
    if (currentBtn != 2) {
        dTableAdd();
        initBtnColor(currentBtn);
        currentBtn = 2;
        selBtnColor(currentBtn);
        if (currentCat == '전체') {
            grd.reconfigure(dTableArray.data.items[2].data);
        } else {
            setFilterStore();
        }
    }
}
btn_etc.eClick = function () {
    if (currentBtn != 3) {
        dTableAdd();
        initBtnColor(currentBtn);
        currentBtn = 3;
        selBtnColor(currentBtn);
        if (currentCat == '전체') {
            grd.reconfigure(dTableArray.data.items[3].data);
        } else {
            setFilterStore();
        }
    }
}
//3개 버튼 (그리드)
grd.eButtonAddClick = function () {
    //새 튜플 추가.
    //이제 insert,delete에 filterSotre에 되어도 dTable 에도 되어야함.
    if (currentCat != '전체') {
        filterStore.add({
            D_DEV_NO: filterStoreCnt, CATEGORY_NM: currentCat, D_DEV_NM: null, START_DT: null, DEV_VALUE: null, TEST_VALUE: null,
            DEADLINE: null, USER_KEY: null, USER_NM: null, END_DT: null
        });
        
    } else {
        dTableArray.data.items[currentBtn].data.add({
            D_DEV_NO: filterStoreCnt, CATEGORY_NM: null, D_DEV_NM: null, START_DT: null, DEV_VALUE: null, TEST_VALUE: null,
            DEADLINE: null, USER_KEY: null, USER_NM: null, END_DT: null
        });
        
    }
    filterStoreCnt = filterStoreCnt - 1;
}
grd.eButtonDeleteClick = function () {
    //deletelist추가
    for (var i = 0; i < grd.getSelection().length; i++) {
        var tempNo = grd.getSelection()[i].data.D_DEV_NO;
        dDevDeleteArray.data.items[currentBtn].data.add({ D_DEV_NO: tempNo });
    }
    if (currentCat != '전체') {

        

        var tempCnt = grd.getSelection().length;
        for (var i = 0; i < tempCnt; i++) {
            for (var j = 0; j < 4; j++) {
                for (var k = 0; k < dTableArray.data.items[j].data.data.length; k++) {
                    if (dTableArray.data.items[j].data.data.items[k].data.D_DEV_NO == grd.getSelection()[i].data.D_DEV_NO) {
                        dTableArray.data.items[j].data.removeAt(k);
                        k = k - 1;
                    }
                }
            }
        }
        filterStore.remove(grd.getSelection());

    }
    dTableArray.data.items[currentBtn].data.remove(grd.getSelection());
}
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
            categoryDeleteArray.clearData();
            dTableArray.clearData();
            filterStore.clearData();
            
            dbLoad();
            
            grd.columnsMap[0].getEditor().bindStore(selComboStoreCategory);
            grd.setUnLockColumns('CATEGORY_NM');
            grd.reconfigure(dTableArray.data.items[0].data);
            initBtnColor(currentBtn);
            currentBtn = 0;
            selBtnColor(currentBtn);
            cmb_catView.setSelection(comboStoreCategory.data.items[0]);
            cmb_catView.eChange(cmb_catView);
        }
    }
}
//콤보박스 변경 이벤트.
cmb_catView.eChange = function (record) {
    currentCat = record.selection.data.SHOWVALUE;
}
grd.eSelectionChange = function (record, rowIndex, paramId) {
    console.log(paramId, record.data, rowIndex);
    text_cc.setValue(record.data.USERID);
}
grd.eUpdate = function (record, rowIndex, paramId) {
    if (paramId == 'START_DT' || paramId == 'DEADLINE' || paramId == 'END_DT') {
        var t1Date = record.get(paramId);
        var t2Date = Ext.Date.dateFormat(t1Date, 'Y-m-d');
        record.set(paramId, t2Date);
    }
}
*/

//최상단 공통 컴포넌트
btn_save.eClick = function () {

}
//DB 통신
function getTable() {
    var pr = DBParams.create('sp_DevFormA01', 'GET_TABLE');
    pr.addParam('H_DEV_NO', currentBtn - 1);
    var ds = DBconnect.runProcedure(pr);
    grdStore = ds[0];
}
function getEmptyTable() {
    var pr = DBParams.create('sp_DevFormA01', 'GET_EMPTY_TABLE');
    var ds = DBconnect.runProcedure(pr);
    filterStore = ds[0];
}
function dbUserLoad() {
    var pr = DBParams.create('sp_DevFormA01', 'GET_PROJECT_USER');
    var ds = DBconnect.runProcedure(pr);
    comboStoreUser = ds[0];
}
//그리드 버튼 이벤트
grd.eButtonAddClick = function () {

}
grd.eButtonDeleteClick = function () {

}
//그래프
function calGraph() {

}
//5개 탭 버튼 클릭 이벤트
btn_main.eClick = function () {
    if (currentBtn != 0) {
        //넘어오기 전 작업


        initBtnColor(currentBtn);
        //넘어 온 후 작업
        currentBtn = 0;

        
        selBtnColor(currentBtn);
        pnl_tabView.full(pnl_mainTabView);
    }
}
btn_server.eClick = function () {
    if (currentBtn != 1) {
        //넘어오기 전 작업


        initBtnColor(currentBtn);
        //넘어 온 후 작업
        currentBtn = 1;

        getTable();
        grd.reconfigure(grdStore);
        selBtnColor(currentBtn);
        pnl_tabView.full(pnl_subTabView);
    }
}
btn_db.eClick = function () {
    if (currentBtn != 2) {
        //넘어오기 전 작업


        initBtnColor(currentBtn);
        //넘어 온 후 작업
        currentBtn = 2;

        getTable();
        grd.reconfigure(grdStore);
        selBtnColor(currentBtn);
        pnl_tabView.full(pnl_subTabView);
    }
}
btn_ui.eClick = function () {
    if (currentBtn != 3) {
        //넘어오기 전 작업


        initBtnColor(currentBtn);
        //넘어 온 후 작업
        currentBtn = 3;

        getTable();
        grd.reconfigure(grdStore);
        selBtnColor(currentBtn);
        pnl_tabView.full(pnl_subTabView);
    }
}
btn_etc.eClick = function () {
    if (currentBtn != 4) {
        //넘어오기 전 작업


        initBtnColor(currentBtn);
        //넘어 온 후 작업
        currentBtn = 4;

        getTable();
        grd.reconfigure(grdStore);
        selBtnColor(currentBtn);
        pnl_tabView.full(pnl_subTabView);
    }
}

//util function
function initBtnColor(i) {
    if (i == 0) {
        btn_main.setStyle('background-color', '#0000ff');
    } else if (i == 1) {
        btn_server.setStyle('background-color', '#0000ff');
    } else if (i == 2) {
        btn_db.setStyle('background-color', '#0000ff');
    } else if (i == 3) {
        btn_ui.setStyle('background-color', '#0000ff');
    } else {
        btn_etc.setStyle('background-color', '#0000ff');
    }
}
function selBtnColor(i) {
    if (i == 0) {
        btn_main.setStyle('background-color', '#00ffff');
    } else if (i == 1) {
        btn_server.setStyle('background-color', '#00ffff');
    } else if (i == 2) {
        btn_db.setStyle('background-color', '#00ffff');
    } else if (i == 3) {
        btn_ui.setStyle('background-color', '#00ffff');
    } else {
        btn_etc.setStyle('background-color', '#00ffff');
    }
}