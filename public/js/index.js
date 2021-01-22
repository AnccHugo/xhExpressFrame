$(function () {
    var lunboto = new xhLunbotu($('.slides li'));
    // Lunbotu();
});




/**
 * @description 轮播图
 */
function Lunbotu() {
    const lunbotuInterval = 3000;

    // 自动轮播 定时器
    const timerLunbotu = new xhTimer(function () {
        var $controls = $('.flex-control-paging li');
        var curControlIdx = parseInt($controls.index($('.flex-control-paging li.active')));

        curControlIdx++;

        if (curControlIdx >= $controls.length) { curControlIdx -= $controls.length; }
        $($controls[curControlIdx]).trigger('click');
    }, lunbotuInterval);


    // 图序按钮 点击事件
    $('.flex-control-paging li').each(function (index, ele) {
        $(this).on('click', function () {
            $($('.slides li')[index]).fadeIn(500).siblings().fadeOut(500);
            $($('.slides li')[index]).addClass('active').siblings().removeClass('active');
            $($('.flex-control-paging li')[index]).addClass('active').siblings().removeClass('active');

            timerLunbotu.Reset()
        });
    });


    // 前后按钮 点击事件
    $('a.flex-prev').on('click', function () {
        var $controls = $('.flex-control-paging li');
        var curControlIdx = parseInt($controls.index($('.flex-control-paging li.active')));

        curControlIdx--;

        if (curControlIdx < 0) { curControlIdx += $controls.length; }
        $($controls[curControlIdx]).trigger('click');

        timerLunbotu.Reset()
    });
    $('a.flex-next').on('click', function () {
        var $controls = $('.flex-control-paging li');
        var curControlIdx = parseInt($controls.index($('.flex-control-paging li.active')));

        curControlIdx++;

        if (curControlIdx >= $controls.length) { curControlIdx -= $controls.length; }
        $($controls[curControlIdx]).trigger('click');

        timerLunbotu.Reset()
    });


}