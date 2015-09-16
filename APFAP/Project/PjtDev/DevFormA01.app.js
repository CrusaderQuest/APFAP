/// <reference path="../../Resource/Script/ext-all-debug.js" />
/// <reference path="../../Resource/Script/component.js" />
/// <reference path="../../Resource/Script/noncomponent.js" />
/// <reference path="DevFormA01.view.js" />

//App 단 정의 영역 시작

//그리드 T/F 체크박스로 구현.
//탭 옮기면 조회조건 초기화.
//저장하면 조회조건은 그대로고 저장하고 조회조건으로 다시 조회해서 reconfigure


/*
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
grd.eSelectionChange = function (record, rowIndex, paramId) {
    console.log(paramId, record.data, rowIndex);
    text_cc.setValue(record.data.USERID);
}
//콤보박스 변경 이벤트.

*/
//-----------------최상단 공통 컴포넌트-----------------
btn_save.eClick = function () {
    dbSave();
    if (isSearched) {
        //filterStore
        //dbSearch();
    } else {

    }
}
//-----------------------DB 통신-----------------------
//해당 탭의 테이블을 가져옴.
function getTable() {
    var pr = DBParams.create('sp_DevFormA01', 'GET_TABLE');
    pr.addParam('H_DEV_NO', currentBtn - 1);
    var ds = DBconnect.runProcedure(pr);
    grdStore = ds[0];
}
//빈 테이블을 가져옴.
function getEmptyTable() {
    var pr = DBParams.create('sp_DevFormA01', 'GET_EMPTY_TABLE');
    var ds = DBconnect.runProcedure(pr);
    filterStore = ds[0];
}
//프로젝트와 연결된 유저 가져옴.
function dbUserLoad() {
    //그리드의 콤보박스
    var pr1 = DBParams.create('sp_DevFormA01', 'GET_PROJECT_USER');
    var ds1 = DBconnect.runProcedure(pr1);
    comboStoreUser = ds1[0];

    //메인의 유저 차트
    for (var i = 0; i < comboStoreUser.data.length; i++) {
        mainUserChartStore.add({ name:comboStoreUser.data.items[i].data.SHOWVALUE, data:0 });
    }

    //조회조건의 콤보박스
    var pr2 = DBParams.create('sp_DevFormA01', 'GET_USER_SEARCH');
    var ds2 = DBconnect.runProcedure(pr2);
    comboSearchUser = ds2[0];
}
//저장.
function dbSave() {
    //업데이트 되었는지
    if (!isUpdated) return;

    //체크된 레코드
    var selectedRecords = grd.getSelectedRecords();

    //체크된 레코드에 에러값이 있는지
    if (isErrTuple(selectedRecords)) return;

    //추가된행과 업데이트된 행 분기하여 디비에 저장
    var pr = '';
    var ds = '';
    for (var i = 0; i < selectedRecords.length; i++) {
        if (selectedRecords[i].get('D_DEV_NO') == undefined || selectedRecords[i].get('D_DEV_NO') == 0) {
            pr = DBParams.create('sp_DevFormA01', 'INSERT_TABLE');
            pr.addParam('H_DEV_NO', currentBtn - 1);
            pr.addParam('D_DEV_NM', selectedRecords[i].get('D_DEV_NM'));
            pr.addParam('START_DT', ApFn.toDbTyoe('date',selectedRecords[i].get('START_DT')));
            pr.addParam('DEV_VALUE', selectedRecords[i].get('DEV_VALUE'));
            pr.addParam('TEST_VALUE', selectedRecords[i].get('TEST_VALUE'));
            pr.addParam('DEADLINE', ApFn.toDbTyoe('date',selectedRecords[i].get('DEADLINE')));
            pr.addParam('USER_KEY', convertUSER_KEY(selectedRecords[i].get('USER_NM')));
            pr.addParam('END_DT', ApFn.toDbTyoe('date',selectedRecords[i].get('END_DT')));

            ds = DBconnect.runProcedure(pr);
        } else {
            pr = DBParams.create('sp_DevFormA01', 'UPDATE_TABLE');
            pr.addParam('D_DEV_NO', selectedRecords[i].get('D_DEV_NO'));
            pr.addParam('D_DEV_NM', selectedRecords[i].get('D_DEV_NM'));
            pr.addParam('START_DT', ApFn.toDbTyoe('date',selectedRecords[i].get('START_DT')));
            pr.addParam('DEV_VALUE', selectedRecords[i].get('DEV_VALUE'));
            pr.addParam('TEST_VALUE', selectedRecords[i].get('TEST_VALUE'));
            pr.addParam('DEADLINE', ApFn.toDbTyoe('date',selectedRecords[i].get('DEADLINE')));
            pr.addParam('USER_KEY', convertUSER_KEY(selectedRecords[i].get('USER_NM')));
            pr.addParam('END_DT', ApFn.toDbTyoe('date',selectedRecords[i].get('END_DT')));

            ds = DBconnect.runProcedure(pr);
        }
    }

    //삭제된 행
    var deletedRecords = grd.getDeletedRecords();
    for (var i = 0; i < deletedRecords.length; i++) {
        if (deletedRecords[i].get('D_DEV_NO') != undefined || deletedRecords[i].get('D_DEV_NO') != 0) {
            pr = DBParams.create('sp_DevFormA01', 'DELETE_TABLE');
            pr.addParam('D_DEV_NO', deletedRecords[i].get('D_DEV_NO'));
            ds = DBconnect.runProcedure(pr);
        }
    }

    //저장되었습니다.
    isUpdated = 0;
}
//------------------------조회 조건----------------------------
function dbSearch() {
    //현재 탭의 스토어 가져옴
    for (var i = 0; i < grdStore.data.length; i++) {
        filterStore.add(grdStore.getAt(i));
    }

    for (var i = 0; i < filterStore.data.length; i++) {
        // 조회 조건을 충족하지 못하는 레코드 제거
        if (dt_sStartDate.getYMD() != undefined && dt_sStartDate.getYMD() != ''
            && dt_eStartDate.getYMD() != undefined && dt_eStartDate.getYMD() != '') {
            if (dt_sStartDate.getYMD() > filterStore.getAt(i).data.START_DT || dt_eStartDate.getYMD() < filterStore.getAt(i).data.START_DT) {
                filterStore.removeAt(i);
                i = i - 1;
                continue;
            }
        }
        if (dt_sDeadLine.getYMD() != undefined && dt_sDeadLine.getYMD() != ''
            && dt_eDeadLine.getYMD() != undefined && dt_eDeadLine.getYMD() != '') {
            if (dt_sDeadLine.getYMD() > filterStore.getAt(i).data.DEADLINE || dt_eDeadLine.getYMD() < filterStore.getAt(i).data.DEADLINE) {
                filterStore.removeAt(i);
                i = i - 1;
                continue;
            }
        }
        if (dt_sEndDate.getYMD() != undefined && dt_sEndDate.getYMD() != ''
            && dt_eEndDate.getYMD() != undefined && dt_eEndDate.getYMD() != '') {
            if (dt_sEndDate.getYMD() > filterStore.getAt(i).data.END_DT || dt_eEndDate.getYMD() < filterStore.getAt(i).data.END_DT) {
                filterStore.removeAt(i);
                i = i - 1;
                continue;
            }
        }
        if (cmb_devState.getValue() != '전체' && cmb_devState.getValue() != undefined && cmb_devState.getValue() != '') {
            if (cmb_devState.getValue() != filterStore.getAt(i).data.DEV_STATE) {
                filterStore.removeAt(i);
                i = i - 1;
                continue;
            }
        }
        if (cmb_testState.getValue() != '전체' && cmb_testState.getValue() != undefined && cmb_testState.getValue() != '') {
            if (cmb_testState.getValue() != filterStore.getAt(i).data.TEST_STATE) {
                filterStore.removeAt(i);
                i = i - 1;
                continue;
            }
        }
        if (cmb_user.getValue() != '전체' && cmb_user.getValue() != undefined && cmb_user.getValue() != '') {
            if (cmb_user.getValue() != filterStore.getAt(i).data.USER_KEY) {
                filterStore.removeAt(i);
                i = i - 1;
                continue;
            }
        }

    }
    grd.reconfigure(filterStore);
    isSearched = 1;
}
btn_search.eClick = function () {
    dbSearch();
}
//----------------------그리드 버튼 이벤트----------------------
//추가
grd.eButtonAddClick = function () {
    grd.addRow();
    //grd_H.getRow(grd_H.getTotalCount() - 1).set('NOTICE_USER', 'JuneJobs');
    //grd_H.setFocus(grd_H.getTotalCount() - 1);
    isUpdated = 1;
}
//삭제
grd.eButtonDeleteClick = function () {
    var selectedRecords = grd.getSelectedRecords();
    var index = grd.getRowIndex(grd.getSelectedRecords()[0]);
    grd.deleteRow(selectedRecords);
    grd.setFocus(index - 1);
    isUpdated = 1;
}
//--------------------------그래프-----------------------------
//탭 그래프
function drawTabChart() {
    var per = 0;
    for (var i = 0; i < grdStore.data.length; i++) {
        if (grdStore.data.items[i].data.DEV_VALUE == false)
            per += 0;
        else if (grdStore.data.items[i].data.TEST_VALUE == false)
            per += (0.5 / grdStore.data.length);
        else if (grdStore.data.items[i].data.TEST_VALUE == true)
            per += (1 / grdStore.data.length);
    }
    per = per * 100;
    per = Ext.Number.toFixed(per, 2);
    tabChartStore.data.items[0].data.data = per;
    tabChart.redraw();
}
function drawMainChart() {
    //mainTabChartStore 채우기
    var totalPer = 0;
    
    for (var i = 0; i < 4; i++) {
        var pr = DBParams.create('sp_DevFormA01', 'GET_TABLE');
        pr.addParam('H_DEV_NO', i);
        var ds = DBconnect.runProcedure(pr);
        var tempStore = ds[0];

        var tabPer = 0;

        for (var j = 0; j < tempStore.data.length; j++) {
            if (tempStore.data.items[j].data.DEV_VALUE == false)
                tabPer += 0;
            else if (tempStore.data.items[j].data.TEST_VALUE == false)
                tabPer += (0.5 / tempStore.data.length);
            else if (tempStore.data.items[j].data.TEST_VALUE == true)
                tabPer += (1 / tempStore.data.length);
        }
        tabPer = tabPer * 100;
        totalPer += (tabPer / 4);
        tabPer = Ext.Number.toFixed(tabPer, 2);
        mainTabChartStore.data.items[3-i].data.data = tabPer;
    }
    totalPer = Ext.Number.toFixed(totalPer, 2);
    mainTabChartStore.data.items[4].data.data = totalPer;

    //mainUserChartStore 채우기
    var pr1 = DBParams.create('sp_DevFormA01', 'GET_TABLE');
    pr1.addParam('H_DEV_NO', 0);
    var ds1 = DBconnect.runProcedure(pr1);
    var tempStore1 = ds1[0];
    var pr2 = DBParams.create('sp_DevFormA01', 'GET_TABLE');
    pr2.addParam('H_DEV_NO', 1);
    var ds2 = DBconnect.runProcedure(pr2);
    var tempStore2 = ds2[0];
    var pr3 = DBParams.create('sp_DevFormA01', 'GET_TABLE');
    pr3.addParam('H_DEV_NO', 2);
    var ds3 = DBconnect.runProcedure(pr3);
    var tempStore3 = ds3[0];
    var pr4 = DBParams.create('sp_DevFormA01', 'GET_TABLE');
    pr4.addParam('H_DEV_NO', 3);
    var ds4 = DBconnect.runProcedure(pr4);
    var tempStore4 = ds4[0];

    for (var i = 0; i < comboStoreUser.data.length; i++) {
        var cnt = 0;
        var userPer = 0;
        for (var j = 0; j < tempStore1.data.length; j++) {
            if (tempStore1.data.items[j].data.USER_NM == comboStoreUser.data.items[i].data.SHOWVALUE) {
                cnt += 1;
                if (tempStore1.data.items[j].data.DEV_VALUE == false)
                    userPer += 0;
                else if (tempStore1.data.items[j].data.TEST_VALUE == false)
                    userPer += 0.5;
                else if (tempStore1.data.items[j].data.TEST_VALUE == true)
                    userPer += 1;
            }
        }
        for (var j = 0; j < tempStore2.data.length; j++) {
            if (tempStore2.data.items[j].data.USER_NM == comboStoreUser.data.items[i].data.SHOWVALUE) {
                cnt += 1;
                if (tempStore2.data.items[j].data.DEV_VALUE == false)
                    userPer += 0;
                else if (tempStore2.data.items[j].data.TEST_VALUE == false)
                    userPer += 0.5;
                else if (tempStore2.data.items[j].data.TEST_VALUE == true)
                    userPer += 1;
            }
        }
        for (var j = 0; j < tempStore3.data.length; j++) {
            if (tempStore3.data.items[j].data.USER_NM == comboStoreUser.data.items[i].data.SHOWVALUE) {
                cnt += 1;
                if (tempStore3.data.items[j].data.DEV_VALUE == false)
                    userPer += 0;
                else if (tempStore3.data.items[j].data.TEST_VALUE == false)
                    userPer += 0.5;
                else if (tempStore3.data.items[j].data.TEST_VALUE == true)
                    userPer += 1;
            }
        }
        for (var j = 0; j < tempStore4.data.length; j++) {
            if (tempStore4.data.items[j].data.USER_NM == comboStoreUser.data.items[i].data.SHOWVALUE) {
                cnt += 1;
                if (tempStore4.data.items[j].data.DEV_VALUE == false)
                    userPer += 0;
                else if (tempStore4.data.items[j].data.TEST_VALUE == false)
                    userPer += 0.5;
                else if (tempStore4.data.items[j].data.TEST_VALUE == true)
                    userPer += 1;
            }
        }

        userPer = userPer / cnt;
        userPer = userPer * 100;
        userPer = Ext.Number.toFixed(userPer, 2);
        mainUserChartStore.data.items[i].data.data = userPer;
    }
mainTabChart.redraw();
mainUserChart.redraw();
}
function initChart(storeTemp) {
    var chart = Ext.create('Ext.chart.Chart', {
        width: 300,
        height: 100,
        store: storeTemp,
        padding: '10 0 0 0',
        style: 'background: #fff',
        animate: true,
        shadow: false,
        insetPadding: 40,

        //legend: true,
        axes: [
            {
                type: 'Numeric',
                position: 'bottom',
                fields: 'data',
                grid: true,
                minimum: 0,
                maximum: 100
            },
            {
                type: 'Category',
                position: 'left',
                fields: 'name',
                grid: true
            }
        ],
        series: [{
            type: 'bar',
            axis: 'bottom',
            xField: 'name',
            yField: 'data',
            style: {
                //width: '30',
                opacity: 0.80
            },
            highlight: {
                fill: '#000',
                'stroke-width': 2,
                stroke: '#fff'
            },
            tips: {
                trackMouse: true,
                style: 'background: #FFF',
                height: 20,
                width: 100,
                renderer: function (storeItem, item) {
                    this.setTitle(storeItem.get('name') + ': ' + storeItem.get('data') + '%');
                }
            }
        }]
    });
    return chart;
}
//------------------5개 탭 버튼 클릭 이벤트---------------------
btn_main.eClick = function () {
    isSearched = 0;
    var selBtn = 0;
    if (!isUpdated) {
        viewSelTab(selBtn);
        return;
    }
    if (isUpdated && currentBtn != selBtn)
        msgSaveWarning(selBtn);
}
btn_server.eClick = function () {
    isSearched = 0;
    var selBtn = 1;
    if (!isUpdated) {
        viewSelTab(selBtn);
        return;
    }
    if (isUpdated && currentBtn != selBtn)
        msgSaveWarning(selBtn);
}
btn_db.eClick = function () {
    isSearched = 0;
    var selBtn = 2;
    if (!isUpdated) {
        viewSelTab(selBtn);
        return;
    }
    if (isUpdated && currentBtn != selBtn)
        msgSaveWarning(selBtn);
}
btn_ui.eClick = function () {
    isSearched = 0;
    var selBtn = 3;
    if (!isUpdated) {
        viewSelTab(selBtn);
        return;
    }
    if (isUpdated && currentBtn != selBtn)
        msgSaveWarning(selBtn);
}
btn_etc.eClick = function () {
    isSearched = 0;
    var selBtn = 4;
    if (!isUpdated) {
        viewSelTab(selBtn);
        return;
    }
    if (isUpdated && currentBtn != selBtn)
        msgSaveWarning(selBtn);
}

//-------------------------util function------------------------
function msgSaveWarning(selBtn) {
    var btnState;
    Ext.Msg.show({
        message: '저장되지 않은 데이터는 삭제될 수 있습니다.\n저장 하시겠습니까?',
        buttons: Ext.Msg.YESNOCANCEL,
        icon: Ext.Msg.WARNING,
        fn: function (btn) {
            if (btn === 'yes') {
                dbSave();
                isUpdated = 0;
                btnState = 'yes';
                viewSelTab(selBtn);
            } else if(btn == 'no'){
                isUpdated = 0;
                btnState = 'no';
                viewSelTab(selBtn);
            } else {
                btnState = 'cancel';
            }
        }
    });
}
function viewSelTab(selBtn) {
    initBtnColor(currentBtn);
    currentBtn = selBtn;
    if (selBtn != 0) {
        getTable();
        grd.reconfigure(grdStore);
        
        pnl_mainTabView.setHidden(true);
        pnl_subTabView.setHidden(false);
        pnl_tabView.full(pnl_subTabView);
        drawTabChart();
    }
    else {
        pnl_mainTabView.setHidden(false);
        pnl_subTabView.setHidden(true);
        pnl_tabView.full(pnl_mainTabView);
        drawMainChart();
    }
    selBtnColor(currentBtn);
}
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
function isErrTuple(selectedRecords) {
    for (var i = 0; i < selectedRecords.length; i++) {
        //특정 셀의 값을 확인
        if (selectedRecords[i].get('D_DEV_NM') == undefined || selectedRecords[i].get('D_DEV_NM') == ''
            || selectedRecords[i].get('START_DT') == undefined || selectedRecords[i].get('START_DT') == ''
            || selectedRecords[i].get('DEV_VALUE') == undefined || selectedRecords[i].get('DEV_VALUE') == ''
            || selectedRecords[i].get('TEST_VALUE') == undefined || selectedRecords[i].get('TEST_VALUE') == ''
            || selectedRecords[i].get('DEADLINE') == undefined || selectedRecords[i].get('DEADLINE') == ''
            || selectedRecords[i].get('USER_NM') == undefined || selectedRecords[i].get('USER_NM') == '') {
            var index = grd.getRowIndex(selectedRecords[i]);
            //에러메세지 띄움
            ApMsg.warning(index + 1 + '번째 행의 데이터를 넣어주세요.', function () {
                //메세지의 확인버튼을 누를경우 그리드 포커스 이동
                grd.setFocus(index);
            })
            return true;
        }
    }
    return false;
}
function convertUSER_KEY(input) {
    for (var i = 0; i < comboStoreUser.data.length; i++) {
        if (comboStoreUser.data.items[i].data.SHOWVALUE == input)
            return comboStoreUser.data.items[i].data.HIDEVALUE;
    }
}
//----------------------------제약 조건--------------------------------
dt_sStartDate.eChange = function (record) {

}
dt_eStartDate.eChange = function (record) {

}
dt_sDeadLine.eChange = function (record) {

}
dt_eDeadLine.eChange = function (record) {

}
dt_sEndDate.eChange = function (record) {

}
dt_eEndDate.eChange = function (record) {

}
grd.eUpdate = function (record, rowIndex, paramId) {
    /*
    if (paramId == 'START_DT' || paramId == 'DEADLINE' || paramId == 'END_DT') {
        var t1Date = record.get(paramId);
        var t2Date = Ext.Date.dateFormat(t1Date, 'Y-m-d');
        record.set(paramId, t2Date);
    }
    */
    //날짜, 개발,테스트 상태에 따른 조건과 완료날짜.

    isUpdated = 1;
}
