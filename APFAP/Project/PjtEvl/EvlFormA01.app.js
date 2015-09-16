/// <reference path="../../Resource/Script/ext-all-debug.js" />
/// <reference path="../../Resource/Script/component.js" />
/// <reference path="../../Resource/Script/noncomponent.js" />
/// <reference path="EvlFormA01.view.js" />

//App 단 정의 영역 시작
//프로젝트 리뷰

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
    var pr = DBParams.create('sp_EvlFormA01', 'GET_TABLE');
    var ds = DBconnect.runProcedure(pr);
    topGrdStore = ds[0];
    botGrdStore = ds[1];
}
//빈 테이블을 가져옴.
function getEmptyTable() {
    var pr = DBParams.create('sp_EvlFormA01', 'GET_EMPTY_TABLE');
    var ds = DBconnect.runProcedure(pr);
    filterStore = ds[0];
}
//프로젝트와 연결된 유저 가져옴.
function dbUserLoad() {
    //그리드의 콤보박스
    var pr1 = DBParams.create('sp_EvlFormA01', 'GET_PROJECT_USER');
    var ds1 = DBconnect.runProcedure(pr1);
    comboStoreUser = ds1[0];

    //조회조건의 콤보박스
    var pr2 = DBParams.create('sp_EvlFormA01', 'GET_USER_SEARCH');
    var ds2 = DBconnect.runProcedure(pr2);
    comboSearchUser = ds2[0];
}
//카테고리를 가져옴.
function dbCatLoad() {
    //그리드의 콤보박스
    var pr1 = DBParams.create('sp_EvlFormA01', 'GET_PROJECT_CAT');
    var ds1 = DBconnect.runProcedure(pr1);
    comboStoreCat = ds1[0];

    //조회조건의 콤보박스
    var pr2 = DBParams.create('sp_EvlFormA01', 'GET_CAT_SEARCH');
    var ds2 = DBconnect.runProcedure(pr2);
    comboSearchCat = ds2[0];
}
//그래프를 그림.
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

        legend: {
            field: 'name',
            position: 'bottom',
            boxStrokeWidth: 0,
            labelFont: '12px Helvetica'
        },

        series: [{
            type: 'pie',
            angleField: 'data',
            donut: 50,
            label: {
                field: 'name',
                display: 'outside',
                calloutLine: true
            },
            showInLegend: true,
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
                    this.setTitle(storeItem.get('name') + ': ' + storeItem.get('data') + '일');
                }
            }
        }]
    });

    return chart;
}
function drawChart() {
    //part chart
    var pr = DBParams.create('sp_EvlFormA01', 'GET_CHART');
    var ds = DBconnect.runProcedure(pr);
    var temp = ds[0].data.items[0];

    for (var i = 0; i < 5; i++) {
        partStore.add({ name: comboStoreCat.data.items[i].data.SHOWVALUE, data: 0 });
    }
    if (temp.data.DEF_E_DT != '' && temp.data.DEF_E_DT != undefined) {
        partStore.data.items[0].data.data = ApFn.setYMD(temp.data.DEF_E_DT) - ApFn.setYMD(temp.data.START_DT);
        if (temp.data.ANL_E_DT != '' && temp.data.ANL_E_DT != undefined) {
            partStore.data.items[1].data.data = ApFn.setYMD(temp.data.ANL_E_DT) - ApFn.setYMD(temp.data.DEF_E_DT);
            if (temp.data.DES_E_DT != '' && temp.data.DES_E_DT != undefined) {
                partStore.data.items[2].data.data = ApFn.setYMD(temp.data.DES_E_DT) - ApFn.setYMD(temp.data.ANL_E_DT);
                if (temp.data.DEV_E_DT != '' && temp.data.DEV_E_DT != undefined) {
                    partStore.data.items[3].data.data = ApFn.setYMD(temp.data.DEV_E_DT) - ApFn.setYMD(temp.data.DES_E_DT);
                    if (temp.data.TES_E_DT != '' && temp.data.TES_E_DT != undefined) {
                        partStore.data.items[4].data.data = ApFn.setYMD(temp.data.TES_E_DT) - ApFn.setYMD(temp.data.DEV_E_DT);
                    }
                }
            }
        }
    }
    //version chart
    var temp = ds[0];
    for (var i = 0; i < temp.data.length; i++) {
        versionStore.add({ name: temp.data.items[i].data.SUMMARY, data: 0 });
        if (temp.data.items[i].data.TES_E_DT != '' && temp.data.items[i].data.TES_E_DT != undefined) {
            versionStore.data.items[i].data.data = ApFn.setYMD(temp.data.items[i].data.TES_E_DT) - ApFn.setYMD(temp.data.items[i].data.START_DT);
        } else if (temp.data.items[i].data.DEV_E_DT != '' && temp.data.items[i].data.DEV_E_DT != undefined) {
            versionStore.data.items[i].data.data = ApFn.setYMD(temp.data.items[i].data.DEV_E_DT) - ApFn.setYMD(temp.data.items[i].data.START_DT);
        } else if (temp.data.items[i].data.DES_E_DT != '' && temp.data.items[i].data.DES_E_DT != undefined) {
            versionStore.data.items[i].data.data = ApFn.setYMD(temp.data.items[i].data.DES_E_DT) - ApFn.setYMD(temp.data.items[i].data.START_DT);
        } else if (temp.data.items[i].data.ANL_E_DT != '' && temp.data.items[i].data.ANL_E_DT != undefined) {
            versionStore.data.items[i].data.data = ApFn.setYMD(temp.data.items[i].data.ANL_E_DT) - ApFn.setYMD(temp.data.items[i].data.START_DT);
        } else if (temp.data.items[i].data.DEF_E_DT != '' && temp.data.items[i].data.DEF_E_DT != undefined) {
            versionStore.data.items[i].data.data = ApFn.setYMD(temp.data.items[i].data.DEF_E_DT) - ApFn.setYMD(temp.data.items[i].data.START_DT);
        }
    }

    partChart.redraw();
    versionChart.redraw();
}




/*
//저장.
function dbSave() {
    //업데이트 되었는지
    if (!isUpdated) return;

    //체크된 레코드
    var selectedRecords = topGrd.getSelectedRecords();

    //체크된 레코드에 에러값이 있는지
    if (isErrTuple(selectedRecords)) return;

    //추가된행과 업데이트된 행 분기하여 디비에 저장
          topGrd 부분, 아직 DB 없음.
    var pr = '';
    var ds = '';
    for (var i = 0; i < selectedRecords.length; i++) {
        if (selectedRecords[i].get('D_DEV_NO') == undefined || selectedRecords[i].get('D_DEV_NO') == 0) {
            pr = DBParams.create('sp_DevFormA01', 'INSERT_TABLE');
            pr.addParam('H_DEV_NO', currentBtn - 1);
            pr.addParam('D_DEV_NM', selectedRecords[i].get('D_DEV_NM'));
            pr.addParam('START_DT', ApFn.toDbTyoe('date', selectedRecords[i].get('START_DT')));
            pr.addParam('DEV_VALUE', selectedRecords[i].get('DEV_VALUE'));
            pr.addParam('TEST_VALUE', selectedRecords[i].get('TEST_VALUE'));
            pr.addParam('DEADLINE', ApFn.toDbTyoe('date', selectedRecords[i].get('DEADLINE')));
            pr.addParam('USER_KEY', convertUSER_KEY(selectedRecords[i].get('USER_NM')));
            pr.addParam('END_DT', ApFn.toDbTyoe('date', selectedRecords[i].get('END_DT')));

            ds = DBconnect.runProcedure(pr);
        } else {
            pr = DBParams.create('sp_DevFormA01', 'UPDATE_TABLE');
            pr.addParam('D_DEV_NO', selectedRecords[i].get('D_DEV_NO'));
            pr.addParam('D_DEV_NM', selectedRecords[i].get('D_DEV_NM'));
            pr.addParam('START_DT', ApFn.toDbTyoe('date', selectedRecords[i].get('START_DT')));
            pr.addParam('DEV_VALUE', selectedRecords[i].get('DEV_VALUE'));
            pr.addParam('TEST_VALUE', selectedRecords[i].get('TEST_VALUE'));
            pr.addParam('DEADLINE', ApFn.toDbTyoe('date', selectedRecords[i].get('DEADLINE')));
            pr.addParam('USER_KEY', convertUSER_KEY(selectedRecords[i].get('USER_NM')));
            pr.addParam('END_DT', ApFn.toDbTyoe('date', selectedRecords[i].get('END_DT')));

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

    //botGrd 부분

    selectedRecords = botGrd.getSelectedRecords();

    if (isErrTuple(selectedRecords)) return;

    pr = '';
    ds = '';
    for (var i = 0; i < selectedRecords.length; i++) {
            pr = DBParams.create('sp_EvlFormA01', 'UPDATE_VERSION_TABLE');
            pr.addParam('VERSION_NO', selectedRecords[i].get('VERSION_NO'));
            pr.addParam('SUMMARY', selectedRecords[i].get('SUMMARY'));
            pr.addParam('DESCRIPTION', selectedRecords[i].get('CONTENT'));
            pr.addParam('END_DT', ApFn.setYMD(selectedRecords[i].get('END_DT')));
            ds = DBconnect.runProcedure(pr);
    }
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


//--------------------------util function----------------------

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


//-----------------------제약조건---------------------------

*/