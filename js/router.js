function Router() {
    this.routes = {};
    this.currentUrl = '';
}

Router.prototype.route = function(path, callback) {
    this.routes[path] = callback || function() {};
    //给不同的hash设置不同的回调函数
};
Router.prototype.refresh = function() {
    // 路由清單
    let routerList = ['home','promotion','refer','vip','chats','luckyWheel'];

    let urlString = window.location.hash.slice(1);
    let url = new URL(urlString, window.location.origin);
    let path = url.pathname;
    // let searchParams = url.search;

    // console.log('Path:', path.slice(1));
    // console.log('Search Params:', searchParams.slice(1));
    

    //获取到相应的hash值
    // let index = routerList.indexOf(location.hash.slice(2))
    let index = routerList.indexOf(path.slice(1));
    
    if (index == -1) {
        this.currentUrl = '/home'
        location.href = "#/home"
    } else {
        this.currentUrl = `/${path.slice(1)}` || '/home';
    }

    if (this.currentUrl && this.currentUrl != '/') {
        this.routes[this.currentUrl](); //根据当前的hash值来调用相对应的回调函数
    }

};
Router.prototype.init = function() {
    window.addEventListener('load', this.refresh.bind(this), false);
    window.addEventListener('hashchange', this.refresh.bind(this), false);
}

//给window对象挂载属性
window.Router = new Router();
window.Router.init();

// 路由呼叫路徑
Router.route('/home', function() {
    mainInclude('/page/home.html');
    menuList_on(0,0);
    document.title = "ACE88｜Home";
});

Router.route('/promotion', function() {
    mainInclude('/page/promotion.html');
    menuList_on(1,1);
    document.title = "ACE88｜Promotion";
});

Router.route('/refer', function() {
    mainInclude('/page/refer.html');
    menuList_on(2,4);
    document.title = "ACE88｜Refer";
});

Router.route('/vip', function() {
    mainInclude('/page/vip.html');
    menuList_on(3,2);
    document.title = "ACE88｜Vip";
});

Router.route('/chats', function() {
    mainInclude('/page/chats.html');
    menuList_on(4,5);
    document.title = "ACE88｜Chats";
});

Router.route('/luckyWheel', function() {
    mainInclude('/page/luckyWheel.html');
    menuList_on(99,99);
    document.title = "ACE88｜luckyWheel";
});


function mainInclude(src) {
    $.ajax({
        url: src,
        success: function(html) {
            $("#mainCnt").html(html);
        },
        // 發送前
        beforeSend: function() {},
        // 完成
        complete: function() {},
        error: function(error) {
            location.href = "#/home"
        }
    });
}

function menuList_on(idx01,idx02) {
    indexVue.toTop();

    $('#footer li').removeClass('on');
    $(`#footer li:eq(${idx01})`).addClass('on');

    $('#sideMenu li').removeClass('on');
    $(`#sideMenu li:eq(${idx02})`).addClass('on');
}

