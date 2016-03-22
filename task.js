/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */

function addAqiData() {
    var city = document.getElementById("aqi-city-input").value.trim();
    var val = document.getElementById("aqi-value-input").value.trim();
    if(/^([a-zA-Z]+|[\u4e00-\u9fa5]+)$/.test(city) === false)
        alert("您输入的城市格式错误");
    else if(/^\d+$/.test(val) === false)
        alert("您输入的污染指数格式错误");
    else
        aqiData[city] = val;



    

}


/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
    var buf = "";
    for(var city in aqiData){
        buf += "<tr><td>" + city + "</td><td>" + aqiData[city] + "</td><td><button data-city='"+city+"'>删除</button></td></tr>";
    }
    document.getElementById("aqi-table").innerHTML = buf;
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
    addAqiData();
    renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(city) {
    // do sth.
    delete aqiData[city];
    renderAqiList();
}

function init() {

    var btn = document.getElementById("add-btn");
    var table = document.getElementById("aqi-table");
    function addEvent(target, type , handler){
        if(target.addEventListener)
            target.addEventListener(type,handler,false);
        else
            target.attachEvent("on"+type,function (event){
                return handler.call(target,event);
            } );
    }

    addEvent(btn,"click",addBtnHandle);
    // / 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
    
    addEvent(table,"click",function(e){
        if(e.target.nodeName.toLowerCase() === "button")
            delBtnHandle.call(null,e.target.dataset.city);
    });
    // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数

}

init();
