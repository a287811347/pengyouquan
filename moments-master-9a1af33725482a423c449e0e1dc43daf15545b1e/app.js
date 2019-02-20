// TODO: 用户名称需修改为自己的名称
var userName = '道';
// 朋友圈页面的数据
var data = [{
    user: {
        name: '阳和',
        avatar: './img/avatar2.png'
    },
    content: {
        type: 0, // 多图片消息
        text: '华仔真棒，新的一年继续努力！',
        pics: ['./img/reward1.png', './img/reward2.png', './img/reward3.png', './img/reward4.png'],
        share: {},
        timeString: '3分钟前'
    },
    reply: {
        hasLiked: false,
        likes: ['Guo封面', '源小神'],
        comments: [{
            author: 'Guo封面',
            text: '你也喜欢华仔哈！！！'
        },{
            author: '喵仔zsy',
            text: '华仔实至名归哈'
        }]
    }
}, {
    user: {
        name: '伟科大人',
        avatar: './img/avatar3.png'
    },
    content: {
        type: 1, // 分享消息
        text: '全面读书日',
        pics: [],
        share: {
            pics: 'http://coding.imweb.io/img/p3/transition-hover.jpg',
            text: '飘洋过海来看你'
        },
        timeString: '50分钟前'
    },
    reply: {
        hasLiked: false,
        likes: ['阳和'],
        comments: []
    }
}, {
    user: {
        name: '深圳周润发',
        avatar: './img/avatar4.png'
    },
    content: {
        type: 2, // 单图片消息
        text: '很好的色彩',
        pics: ['http://coding.imweb.io/img/default/k-2.jpg'],
        share: {},
        timeString: '一小时前'
    },
    reply: {
        hasLiked: false,
        likes:[],
        comments: []
    }
}, {
    user: {
        name: '喵仔zsy',
        avatar: './img/avatar5.png'
    },
    content: {
        type: 3, // 无图片消息
        text: '以后咖啡豆不敢浪费了',
        pics: [],
        share: {},
        timeString: '2个小时前'
    },
    reply: {
        hasLiked: false,
        likes:[],
        comments: []
    }
}];



// 相关 DOM
var $page = $('.page-moments');
var $momentsList = $('.moments-list');



/**
 * 点赞内容 HTML 模板
 * @param {Array} likes 点赞人列表
 * @return {String} 返回html字符串
 */
function likesHtmlTpl(likes) {
    if (!likes.length) {
        return '';
    }
    var  htmlText = ['<div class="reply-like"><i class="icon-like-blue"></i>'];
    // 点赞人的html列表
    var likesHtmlArr = [];
    // 遍历生成
    for(var i = 0, len = likes.length; i < len; i++) {
        likesHtmlArr.push('<a class="reply-who" href="#">' + likes[i] + '</a>');
    }
    // 每个点赞人以逗号加一个空格来相隔
    var likesHtmlText = likesHtmlArr.join(', ');
    htmlText.push(likesHtmlText);
    htmlText.push('</div>');
    return htmlText.join('');
}
/**
 * 评论内容 HTML 模板
 * @param {Array} likes 点赞人列表
 * @return {String} 返回html字符串
 */
function commentsHtmlTpl(comments) {
    if (!comments.length) {
        return '';
    }
    var  htmlText = ['<div class="reply-comment">'];
    for(var i = 0, len = comments.length; i < len; i++) {
        var comment = comments[i];
        htmlText.push('<div class="comment-item"><a class="reply-who" href="#">' + comment.author + '</a>：' + comment.text + '</div>');
    }
    htmlText.push('</div>');
    return htmlText.join('');
}
/**
 * 评论点赞总体内容 HTML 模板
 * @param {Object} replyData 消息的评论点赞数据
 * @return {String} 返回html字符串
 */
function replyTpl(replyData) {
    var htmlText = [];
    htmlText.push('<div class="reply-zone">');
    htmlText.push(likesHtmlTpl(replyData.likes));
    htmlText.push(commentsHtmlTpl(replyData.comments));
    htmlText.push('</div>');
    return htmlText.join('');
}
/**
 * 多张图片消息模版 （可参考message.html）
 * @param {Object} pics 多图片消息的图片列表
 * @return {String} 返回html字符串
 */
function multiplePicTpl(pics) {
    var htmlText = [];
    htmlText.push('<ul class="item-pic">');
    for (var i = 0, len = pics.length; i < len; i++) {
        htmlText.push('<img class="pic-item" src="' + pics[i] + '">')
    }
    htmlText.push('</ul>');
    return htmlText.join('');
}

function shareMsgTpl(share) {
    var htmlText = [];
    htmlText.push('<a class="item-share">');
    htmlText.push('<img class="share-img" src="' + share.pics + '" width="40" height="40" alt="">');
    htmlText.push('<p class="share-tt">' + share.text + '</p>');
    htmlText.push('</a>');
    return htmlText.join('');
}

/**
 * 循环：消息体
 * @param {Object} messageData 对象
 */
function messageTpl(messageData) {
    var user = messageData.user;
    var content = messageData.content;
    var htmlText = [];
    htmlText.push('<div class="moments-item" data-index="0">');
    // 消息用户头像
    htmlText.push('<a class="item-left" href="#">');
    htmlText.push('<img src="' + user.avatar + '" width="42" height="42" alt=""/>');
    htmlText.push('</a>');
    // 消息右边内容
    htmlText.push('<div class="item-right">');
    // 消息内容-用户名称
    htmlText.push('<a href="#" class="item-name">' + user.name + '</a>');
    // 消息内容-文本信息
    htmlText.push('<p class="item-msg">' + content.text + '</p>');
    // 消息内容-图片列表
    var contentHtml = '';
    // 目前只支持多图片消息，需要补充完成其余三种消息展示
    switch(content.type) {
        // 多图片消息

        case 0:
            contentHtml = multiplePicTpl(content.pics);
            break;
        case 1:
            contentHtml = shareMsgTpl(content.share);

            break;
        case 2:
            contentHtml = multiplePicTpl(content.pics);
            break;
        // TODO: 实现单张图片消息
        case 3:
            contentHtml = multiplePicTpl(content.type);
            break;
        // TODO: 实现无图片消息
    }
    htmlText.push(contentHtml);
    // 消息时间和回复按钮
    htmlText.push('<div class="item-ft">');
    htmlText.push('<span class="item-time">' + content.timeString + '</span>');
    htmlText.push('<div class="item-reply-btn">');
    htmlText.push('<span class="item-reply"></span>');
    htmlText.push('</div></div>');
    // 消息回复模块（点赞和评论）
    htmlText.push(replyTpl(messageData.reply));
    htmlText.push('</div></div>');
    return htmlText.join('');
}
/**
 * 图片对大模块组件
 */
var enlargeImageModule = {
    // 初始化
    init: function() {
        // 获取图片放大组件元素
        this.$element = $('.enlarge-image');
        this.$image = this.$element.find('img');
    },

    /**
     * 放大指定放大图片，并展示图片放大组件
     * @param {String} imgSrc 需要展现的图片地址
     */
    show: function(imgSrc) {
        this.$image.attr('src', imgSrc);
        this.$element.addClass('z-show');
    },
    /**
     * 隐藏图片放大组件
     */
    hide: function() {
        this.$element.removeClass('z-show');
    }
};



/**
 * 页面渲染函数：render
 */
function render() {
    // TODO: 目前只渲染了一个消息（多图片信息）,需要展示data数组中的所有消息数据。
    var messageHtml ='';

    for(var i=0; i<data.length ;i++){
        messageHtml += messageTpl(data[i]);

    }
    $momentsList.html(messageHtml);
}

/**
 * 页面绑定事件函数：bindEvent
 */

function bindEvent() {
    /**
     * 页面图片放大展示，隐藏
     */
     //图片放大
    $page.on('click', '.item-pic .pic-item', function() {
        // 获取图片地址
        var src = $(this).attr('src');
        enlargeImageModule.show(src);
    });
    //图片隐藏
    $page.on('click', '.enlarge-image', function() {
        enlargeImageModule.hide();
    });

    var aP = document.getElementsByClassName('tbl');

    $('.item-reply-btn').after(aP);
    //插入评论点赞组件
    /**
     * 页面点赞评论组件
     */
    $('.item-reply-btn').on("click", function (e) {
        e ? e.stopPropagation() : event.cancelBubble == true; //禁止按钮冒泡
        var $curItem = $(this).parents('.moments-item');
        //parents() 获得当前匹配元素集合中每个元素的祖先元素，使用选择器进行筛选是可选的。
        var $curReply = $curItem.find('.tbl');
        //匹配每个元素中的评论点赞组件
        if($curReply.width()==0) {
            $('.tbl').css({width:'0px'}).hide();
            //点击隐藏全部组件
            $curReply.css({display:'flex'}).animate({width:'200px'});
            //点击显示当前组件
        } else {
            $curReply.animate({width:'0px'}).hide(100)
            //隐藏组件
        }

    });
    $(document).on('click', function() {
        $('.tbl').css({width:'0px'}).hide();
        //点击其他地方隐藏组件
    })
    /**
     * 页面点赞组件
     */
    $('.Fabulous').on('click',function () {
        var $curItem = $(this).parents('.moments-item');
        //parents() 获得当前匹配元素集合中每个元素的祖先元素，使用选择器进行筛选是可选的。
        var i = $curItem.index();
        var replyData = data[i].reply;
        var $curReply = $curItem.find('.reply-like');
        function refreshZone() {
            $curItem.find('.reply-zone').remove();
            $curItem.find('.item-ft').after(replyTpl(replyData));
        };
        if(data[i].reply.likes.indexOf(userName) == -1) {
            //点赞之后，文字变成取消
            data[i].reply.likes.push(userName); //加入点赞数据
            $curItem.find("p.ppp").html('<p class="pppp">取消</p>');

        } else {
            //取消点赞，文字变回点赞
            data[i].reply.likes.pop(userName); //删除点赞数据
            $curItem.find("p.ppp").html('<p class="pppp">点赞</p>');
        }
        refreshZone();
    });
    /**
     * 页面评论组件
     */
    $('.comment').on('click', function () {
        var $curItem = $(this).parents('.moments-item')
        var i = $curItem.index();
        var replyData = data[i].reply;
        $('.commenter').remove(); //清除多余发送框
        $momentsList.append(commentContainer());
        //插入评论组件
        $('.js-send-msg').attr('disabled', true);
        $('.js-send-msg').addClass('disabled-true');
        //设置焦点、、focus
        $(".commenter-input").focus(function(){
            $(".commenter-input").css("background-color","#FFFFCC");
            $(".commenter-input").css({borderColor:'#2ce2ff'});
        });
        //焦点离开样式
        $(".commenter-input").blur(function(){
            $(".commenter-input").css("background-color","#fff");
            $(".commenter-input").css({borderColor:'#ff3b59'});
        });
        //判断输入框是否输入
        $(".commenter-input").bind('input', function() {
            if($(this).val() == '') {
                $('.js-send-msg').attr('disabled', true);
                $('.js-send-msg').removeClass('disabled-false');
                $('.js-send-msg').addClass('disabled-true');
                 //未输入
            } else {
                $('.js-send-msg').attr('disabled', false);
                $('.js-send-msg').addClass('disabled-false');
                //已输入
            }
        });

        $('.commenter button').on('click', function() {

            var $comment = $('.commenter-input').val();
            var replyData = data[i].reply;
            var myComment = {
                author: userName,
                text: $comment
            };
            replyData.comments.push(myComment); //插入回复数据
            //重新渲染reply-zone容器
            $('.moments-item:eq(' + i + ')').find('.reply-zone').remove();
            $('.moments-item:eq(' + i + ')').find('.item-ft').after(replyTpl(replyData));
            $('.commenter').remove(); //隐藏发送框

        })

    });
    //评论函数组件
    function commentContainer() {
        var htmlText = [];
        htmlText.push('<div class="commenter">');
        htmlText.push('<input type="text" class="commenter-input" placeholder="评论">');
        htmlText.push('<button class="js-send-msg">发送</button>');
        htmlText.push('</div>');
        return htmlText.join("");
    }


    // // TODO: 完成页面交互功能事件绑定
}

/**
 * 页面入口函数：init
 * 1、根据数据页面内容
 * 2、绑定事件
 */
function init() {
    enlargeImageModule.init()
    // 渲染页面
    $('.header-user .user-name').html(userName);
    render();
    bindEvent();

}

init();