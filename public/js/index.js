$(function () {
    var lunbotu = new xhLunbotu($('#bannerView li'), $('#bannerControl li'), $('#bannerPrev'), $('#bannerNext'));

    _Init();
});



function _Init() {
    _Bind_Tesetuijian();
}
function _Bind_Tesetuijian() {
    $('#productTesetuijian .product_menu li').each(function (idx, ele) {
        $(ele).mouseenter(function () {
            $(ele).addClass('active').siblings().removeClass('active');
            $($('#productTesetuijian .product_content li')[idx]).addClass('active').siblings().removeClass('active');
        });
    });
}