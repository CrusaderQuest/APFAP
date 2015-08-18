/// <reference path="../../Resource/Script/ext-all-debug.js" />
/// <reference path="../../Resource/Script/component.js" />
/// <reference path="../../Resource/Script/noncomponent.js" />
/// <reference path="DesFormD01.view.js" />

//App 단 정의 영역 시작
pnl_sub.eClick = function (selected) {
    console.log(selected.data);
    if (selected.data.text == 'Menu Child 1') {
        grd.reconfigure(gridData1);
    }
    else if (selected.data.text == 'Menu Child 2') {
        grd.reconfigure(gridData2);
    }
    else {
        grd.reconfigure(gridData);
    }
    //grd.reconfigure(gridData);
}
