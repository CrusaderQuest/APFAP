﻿/// <reference path="../Resource/Script/ext-all-debug.js" />
/// <reference path="../Resource/Script/component.js" />
/// <reference path="../Resource/Script/noncomponent.js" />
/// <reference path="Main.view.js" />

//App 단 정의 영역 시작
/*
    d
*/


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