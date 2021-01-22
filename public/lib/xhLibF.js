/**
 * @name xhTimer
 * @description 小何定时器控件
 * @param {Function} fn 委托函数 
 * @param {Number} t 定时器执行间隔 
 */
function xhTimer(fn, t) {
    t = t ? t : 3000;
    var timerObj = setInterval(fn, t);

    this.Start = function () {
        if (!timerObj) { timerObj = setInterval(fn, t); }

        return this;
    };

    this.Stop = function () {
        if (timerObj) {
            clearInterval(timerObj);
            timerObj = null;
        }

        return this;
    };

    /**
     * @description 重置定时器
     * @param {Number} newIntervalTime 
     */
    this.Reset = function (newIntervalTime) {
        t = newIntervalTime ? newIntervalTime : t;

        return this.Stop().Start();
    };
}






/**
 * @name xhLunbotu
 * @description 小何轮播图控件
 */
function xhLunbotu($imgView, $controller = null, $prev = null, $next = null) {
    if (!$imgView) { return; }

    this.interval = 1000;

    // 创建轮播图定时器：默认使用淡入淡出特效
    const lunbotuTimer = new xhTimer(this.AnimationFade, this.interval);

    var curIdx = 0;     // 当前图片索引
    var _this = this;   // 轮播图对象指针



    // ========== ========== ===========
    //             公共方法
    // ========== ========== ===========

    // 上一张图片
    this.Prev = function () { curIdx--; this.AnimationFade(); };

    // 下一张图片
    this.Next = function () { curIdx++; this.AnimationFade(); };

    // 停止自动轮播
    this.StopAuto = lunbotuTimer.Stop;

    // 开启自动轮播
    this.StartAuto = lunbotuTimer.Start;

    // 淡入淡出动画
    this.AnimationFade = _AnimationFade;



    // ========== ========== ===========
    //             私有方法
    // ========== ========== ===========

    function _Init() {
        if ($prev) { $($prev).on('click', _this.Prev); }
        if ($next) { $($next).on('click', _this.Next); }

        _this.StartAuto();
    }

    function _AnimationFade() {
        $($imgView[curIdx]).fadeIn(500).siblings().fadeOut(500);
        $($imgView[curIdx]).addClass('active').siblings().removeClass('active');

        _ChangeController();
    }

    function _ChangeController() {
        if (!$controller) { return; }

        $($controller[curIdx]).addClass('active').siblings().removeClass('active');
    }



    // 自动初始化
    _Init();
};