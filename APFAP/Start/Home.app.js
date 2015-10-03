/// <reference path="../Resource/Scripts/ext-all-debug.js" />
/// <reference path="../Resource/Scripts/component.js" />
/// <reference path="../Resource/Scripts/noncomponent.js" />
/// <reference path="Home.view.js" />

//App 단 정의 영역 시작
/*
 * 메인화면 비즈니스로직 
 * @date  2015-08-15
 * @autor JuneJobs
*/

//**전역변수영역
grd_NOTICE.eCellDbClick = function (record, rowindex, paramId) {
    ApMsg.warning(record.data.NOTICE_CONTENT);
}

//**일반함수영역
function SYS_INIT() {
    var pr = DBParams.create('SP_COMMAIN', 'SEARCH_NOTICE');
    var ds = DBconnect.runProcedure(pr);
    grd_NOTICE.bindStore(ds[0]);
}
function RECONFIG() {

    var pr = DBParams.create('sp_COMMAIN', 'SEARCH_GRAPH_H');
    var ds = DBconnect.runProcedure(pr);
    cha_ING_H.bindStore(ds[0]);
    var pr = DBParams.create('SP_COMMAIN', 'SEARCH_NOTICE');
    var ds = DBconnect.runProcedure(pr);
    grd_NOTICE.bindStore(ds[0]);
    var pr = DBParams.create('sp_COMMAIN', 'SEARCH_GRAPH_D');
    pr.addParam('CONTENT_CD', 'DEF');
    var sto_cha_ING_D = DBconnect.runProcedure(pr);
    // get the correct serie
    MAIN.items.items[0].items.items[2].items.items[0].removeAll();
    MAIN.items.items[0].items.items[2].items.items[0].add(
        Ext.create('Ext.chart.Chart', {
            width: '100%',
            height: 410,
            padding: '10 0 0 0',
            style: 'background: #fff',
            animate: true,
            shadow: false,
            store: sto_cha_ING_D[0],
            insetPadding: 15,
            items: [{
                type: 'text',
                text: '정의',
                font: '16px 나눔고딕',
                width: 100,
                height: 30,
                x: 40, //the sprite x position
                y: 12  //the sprite y position
            }],
            axes: [{
                type: 'Numeric',
                position: 'bottom',
                fields: ['RATE'],
                label: {
                    renderer: function (v) { return v + '%'; }
                },
                minimum: 0
            }, {
                type: 'Category',
                position: 'left',
                fields: ['FORMNAME']
            }],
            series: [{
                type: 'bar',
                axis: 'bottom',
                xField: 'FORMNAME',
                yField: 'RATE',
                style: {
                    opacity: 0.80
                },
                highlight: {
                    fill: '#000',
                    'stroke-width': 2,
                    stroke: '#fff'
                },
                renderer: function (sprite, record, attr, index, store) {
                    return Ext.apply(attr, {
                        fill: '#3590D2'
                    });
                },
                tips: {
                    trackMouse: true,
                    style: 'background: #FFF',
                    height: 20,
                    renderer: function (storeItem, item) {
                        this.setTitle(storeItem.get('FORMNAME') + ': ' + storeItem.get('RATE') + '%');
                    }
                }
            }]
        })
    )

}