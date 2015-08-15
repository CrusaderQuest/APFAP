/// <reference path="../Resource/Script/ext-all-debug.js" />
/// <reference path="../Resource/Script/component.js" />
/// <reference path="../Resource/Script/noncomponent.js" />
/// <reference path="Main.view.js" />

//App 단 정의 영역 시작
/*
 * 메인화면 비즈니스로직 
 * @date  2015-08-15
 * @autor JuneJobs
*/

//카테고리 별로 컨텐츠 가져오기
function GET_CONTENT() {
    var pr = DBParams.create('SP_COMMAIN', 'SEARCH_CONTENT');
    //데이터셋
    var ds = DBconnect.runProcedure(pr);
    var arr_COM = [], //공통
        arr_DEF = [], //정의
        arr_ANL = [], //분석
        arr_DES = [], //설계
        arr_DEV = [], //개발
        arr_TES = [], //테스트
        arr_EVL = []; //평가
    for (var i = 0; i < ds[0].data.items.length; i++) {
        var categoryType = ds[0].data.getAt(i).data.FORMCD.substr(0, 3);
        if (categoryType == 'COM') arr_COM.push([ds[0].data.getAt(i).data.FORMCD, ds[0].data.getAt(i).data.FORMNM]);
        else if (categoryType == 'DEF') arr_DEF.push([ds[0].data.getAt(i).data.FORMCD, ds[0].data.getAt(i).data.FORMNM]);
        else if (categoryType == 'ANL') arr_ANL.push([ds[0].data.getAt(i).data.FORMCD, ds[0].data.getAt(i).data.FORMNM]);
        else if (categoryType == 'DES') arr_DES.push([ds[0].data.getAt(i).data.FORMCD, ds[0].data.getAt(i).data.FORMNM]);
        else if (categoryType == 'DEV') arr_DEV.push([ds[0].data.getAt(i).data.FORMCD, ds[0].data.getAt(i).data.FORMNM]);
        else if (categoryType == 'TES') arr_TES.push([ds[0].data.getAt(i).data.FORMCD, ds[0].data.getAt(i).data.FORMNM]);
        else if (categoryType == 'EVL') arr_EVL.push([ds[0].data.getAt(i).data.FORMCD, ds[0].data.getAt(i).data.FORMNM]);
        else console.error('이상한컨텐츠명 포함되어있음. 공통코드 확인필요');
    }
    var arr_CONTENT = [arr_COM, arr_DEF, arr_ANL, arr_DES, arr_DEV, arr_TES, arr_EVL];
    var arr_CONTENTREE = [tre_COM, tre_DEF, tre_ANL, tre_DES, tre_DEV, tre_TES, tre_EVL];
    for (var i = 0; i < arr_CONTENT.length; i++) {
        for (var j = 0; j < arr_CONTENT[i].length; j++) {
            var node = getNode(arr_CONTENT[i][j][1], true);
            node.value.setValue('FORMCD', arr_CONTENT[i][j][0]);
            arr_CONTENTREE[i].bindNode(node, 1, true);
        }
    }
}


//폼 렌더링시 초기화
function TREE_LOAD() {
    //데이터생성
    var pr = DBParams.create('SP_COMMAIN', 'SEARCH_TREE');
    //데이터셋
    var ds = DBconnect.runProcedure(pr);
    grd_form.reconfigure(ds[0]);
}

function SYS_INIT() {
    txt_TEAMNAME.setValue('Master Plan');
}