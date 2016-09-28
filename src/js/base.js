$(function(){
    var url_video = "http://es2.laizhuan.com/install_guide.m4v";
    var url_ios = "https://itunes.apple.com/cn/app/lai-zhuan/id1095922364?mt=8";
    var url_android = "http://es3.apptui.net/weixin/apk_download/";
    var link_ios = "lzv2store12://user/isUser";
    var link_android = "laizhuan://com.hb.moon.app/openwith";

    // 页面初始化
    $('.loading').addClass('loading_run');
    // 数据填充
    window.render_data = function(data){
        $('.data_version').text(data.version);
        $('.data_date').text(data.date);
        if(data.id){
            $('.data_user').text(data.user);
            $('.data_id').text(data.id);
            $('.data_date_length').text(data.date_length);
        }else{
            $('.swiper-slide').eq(0).remove();
        }
        $('.data_user_img').css("background-image",'url('+data.user_img+')');
        $.each(data.news, function(i, item){
            i < 5 && $('.user_img_'+(i+1)).css("background-image",'url('+item.img+')');
        });
        render_news(data.news);

        new Swiper ('.swiper-container', {
            pagination: '.swiper-pagination',
            nextButton: '.banner_title'
        });
        $('.loading').remove();
        $('body').addClass("dom_ready");
    }
    // 按钮按下动画
    $('body').on('touchstart MSPointerDown pointerdown','.btn',function(){
        $(this).addClass('btn_down');
    }).on('touchend MSPointerUp pointerup touchcancel MSPointerCancel pointercancel','.btn',function(){
        $(this).removeClass('btn_down');
    });

    // 渲染最新用户动态
    function render_news(data){
        var _html = '', i = 0,all_data = [],init_data = [];
        if(!$('.user_news .news_item').length){
            init_data = data.splice(0, 4);
            $.each(init_data, function(i, item){
                _html += _li_html(item);
            });
            $('.user_news').prepend($(_html));
        }
        all_data = data.concat(init_data);
        _insert_li();
        function _insert_li(){
            $('.user_news').prepend($(_li_html(all_data[i])));
            i++;
            i === all_data.length && (i = 0);
            setTimeout(_insert_li, 3000);
            $('.user_news .news_item').length > 6 && $('.user_news .news_item').eq(6).remove();
        }

        function _li_html(item){
            return '<li class="news_item">'
                +'<div class="user_img" style="background-image: url('+item.img+')"><i class="crown"></i></div>'
                +'<p class="news_info">'
                    +'<span class="news_time">'+item.time+'</span> 体验了'
                    +'<span class="news_task">'+item.task+'</span> 获得奖励'
                +'</p>'
            +'</li>';
        }
    }
    // 下载或安装
    var install = (function(){
        var url = cur_device.ios ? url_ios : url_android;
        return function(){
            window.open(url);
        };
    })();
    // 启动
    var start_up = (function(){
        var link = cur_device.ios ? link_ios : link_android;
        return function(){
            window.location.href = link;
        };
    })();

    // 交互
    $('body').on('tap','.btn_play',function(){
        window.location.href = url_video;
    }).on('tap','.btn_install',function(){
        install();
    }).on('tap','.btn_start_up',function(){
        start_up();
    });
});

// 模拟数据
setTimeout(function(){
    var data = {
        version: '3.0.0.1',
        date: '2016/11/11',
        user: '雪人努努',
        id: '30743522',
        date_length: '92',
        user_img: 'http://avatar.csdn.net/B/A/B/1_dog250.jpg',
        news: [{
                img: "http://avatar.csdn.net/D/D/E/3_u012420654.jpg",
                time: '1分钟前',
                task: '网易新闻1'
        },{
                img: "http://avatar.csdn.net/E/B/1/3_foruok.jpg",
                time: '2分钟前',
                task: '网易新闻22'
        },{
                img: "http://avatar.csdn.net/4/9/8/3_a10615.jpg",
                time: '3分钟前',
                task: '网易新闻333'
        },{
                img: "http://avatar.csdn.net/1/C/D/3_tianchi92.jpg",
                time: '4分钟前',
                task: '网易新闻4444'
        },{
                img: "http://avatar.csdn.net/2/8/6/3_huaxun66.jpg",
                time: '5分钟前',
                task: '网易新闻55555'
        },{
                img: "http://avatar.csdn.net/F/C/4/3_ty_hf.jpg",
                time: '6分钟前',
                task: '网易新闻666666'
        },{
                img: "http://avatar.csdn.net/B/2/6/3_dd864140130.jpg",
                time: '7分钟前',
                task: '网易新闻7777777'
        },{
                img: "http://avatar.csdn.net/E/B/F/3_wyccyw123456.jpg",
                time: '8分钟前',
                task: '网易新闻88888888'
        },{
                img: "http://avatar.csdn.net/1/8/2/3_zl18603543572.jpg",
                time: '9分钟前',
                task: '网易新闻999999999'
        }]
    };
    render_data(data);
},4100);
