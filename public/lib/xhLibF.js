/**
 * @name xhTimer
 * @description 小何定时器控件
 * @param {Function} fn 委托函数 
 * @param {Number} t 定时器执行间隔 
 */
function xhTimer(fn, t) {
    var t = parseInt(t) ? parseInt(t) : 3000;
    var _timerObj = setInterval(fn, t);



    // ========== ========== ===========
    //             公共方法
    // ========== ========== ===========

    // 开启定时器
    this.Start = function () {
        if (!_timerObj) { _timerObj = setInterval(fn, t); }

        return this;
    };

    // 停止定时器
    this.Stop = function () {
        if (_timerObj) {
            clearInterval(_timerObj);
            _timerObj = null;
        }

        return this;
    };

    /**
     * @description 重置定时器
     * @param {Number} newIntervalTime 
     */
    this.Reset = function (newIntervalTime) {
        t = parseInt(newIntervalTime) ? parseInt(newIntervalTime) : t;

        return this.Stop().Start();
    };



}






/**
 * @name xhLunbotu
 * @description 小何轮播图控件
 * @param {Object} $imgView 对象·视窗对象
 * @param {Object} $controller 对象·控制图序
 * @param {Object} $prev 对象·前一张图片
 * @param {Object} $next 对象·后一张图片
 */
function xhLunbotu($imgView, $controller = null, $prev = null, $next = null) {
    if (!$imgView) { console.error("视图错误!"); return; }

    var _t = 3000;          // 当前轮询间隔
    var _this = this;       // 轮播图对象指针
    var _curIdx = 0;        // 当前图片索引
    var lunbotuTimer = new xhTimer(_Next, _t);   // 创建轮播图定时器：默认使用淡入淡出特效



    // ========== ========== ===========
    //             公共方法
    // ========== ========== ===========

    // 停止自动轮播
    this.StopAuto = lunbotuTimer.Stop;

    // 开启自动轮播
    this.StartAuto = lunbotuTimer.Start;



    // ========== ========== ===========
    //             私有方法
    // ========== ========== ===========

    function _Init() {
        if ($prev) { $($prev).on('click', _Prev); }
        if ($next) { $($next).on('click', _Next); }

        _this.StartAuto();
    }

    function _Next() {
        if (++_curIdx >= $($imgView).length) { _curIdx = 0; }
        _RunAnimation();
    }

    function _Prev() {
        if (--_curIdx < 0) { _curIdx = $($imgView).length - 1; }
        _RunAnimation();
    }

    function _RunAnimation() {
        _AnimationFade();
        lunbotuTimer.Reset();
    }

    function _AnimationFade() {
        $($imgView[_curIdx]).fadeIn(500).siblings().fadeOut(500);
        $($imgView[_curIdx]).addClass('active').siblings().removeClass('active');

        _ChangeController();
    }

    function _ChangeController() {
        if (!$controller) { return; }

        $($controller[_curIdx]).addClass('active').siblings().removeClass('active');
    }



    // 自动初始化
    _Init();
};