const config = {
  // 站点标题
  siteTitle: "浙江美森细胞科技有限公司",

  // 各种开关
  isRelease: true,

  // 服务端
  apiServerProtocol: (window.location.protocol + "//") || 'http://',
  apiServerHost: window.location.hostname || 'localhost',
  apiServerPort: window.location.port || 81,
  apiServerUrl: window.location.origin || "http://localhost:81",

  // 菜单项
  menu: [{
    id: "productCenter",
    name: "产品中心",
    href: "#",
    childMenu: [{
      id: "cells",
      name: "细胞产品",
      href: "#",
    }, {
      id: "cellsCulture ",
      name: "细胞培养技术",
      href: "#",
    }, {
      id: "microorganism",
      name: "微生物研究技术",
      href: "#",
    },]
  }, {
    id: "customizedServices",
    name: "定制服务",
    href: "#",
    childMenu: [{
      id: "PreservationServices",
      name: "保藏服务",
      href: "#"
    }, {
      id: "cellsCustomization",
      name: "细胞定制",
      href: "#"
    }, {
      id: "cellsIdentification",
      name: "细胞鉴定",
      href: "#"
    },]
  }, {
    id: "purchaseAndSupport",
    name: "购买和支持",
    href: "#",
    childMenu: [{
      id: "howToBuy",
      name: "如何购买",
      href: "#"
    }, {
      id: "technicalSupport",
      name: "技术支持",
      href: "#"
    }, {
      id: "productManual",
      name: "产品使用手册",
      href: "#"
    }, {
      id: "coaDownload",
      name: "COA 下载",
      href: "#"
    }, {
      id: "ctccDistributor",
      name: "CTCC 分销商",
      href: "#"
    },]
  },
  {
    id: "aboutUs",
    name: "关于我们",
    href: "#",
    childMenu: [{
      id: "companyProfile",
      name: "公司简介",
      href: "#"
    }, {
      id: "talentRecruitment",
      name: "人才招聘",
      href: "#"
    }, {
      id: "contactUs",
      name: "联系我们",
      href: "#"
    }, {
      id: "newsInformation",
      name: "新闻动态",
      href: "#"
    },
    ]
  },
    // {
    //   id: "salesPromotion",
    //   name: "促销活动",
    //   href: "#",
    // },
  ],

  // api
  api: {
    user: {
      login: "/user/login",
      liuyan: "/user/liuyan",
      registe: "/user/registe",
      sendVerifyCode: "/user/sendVerifyCode",
    },
    product: {
      getCells: "/product/getCells",
      getNaiyaozhu: "/product/getNaiyaozhu",
      getYuandaixibao: "/product/getYuandaixibao",
      getCas9: "/product/getCas9",
      getCRISPRi: "/product/getCRISPRi",
      getLuc1: "/product/getLuc1",
      getLuc2: "/product/getLuc2",
      getCell: '/product/getCell',
    }
  },

};


if (config.isRelease) {
  config.apiServerProtocol = "https://";
  config.apiServerHost = "www.ctcc.online";
  config.apiServerUrl = config.apiServerProtocol + config.apiServerHost + ':' + config.apiServerPort;
}



/**
 * 自定义函数·
 */
jQuery.GetRequest = function (uri = null) {
  const url = uri || window.location.search;
  let theRequest = new Object();
  if (url.indexOf("?") != -1) {
    let str = url.substr(1);
    strs = str.split("&");
    for (let i = 0; i < strs.length; i++) {
      theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
    }
  }
  return theRequest;
};

jQuery.OpenWindow = function (uri = null) {
  var a = $("<a href='" + (uri || '/') + "' target='_blank'></a>").get(0);
  var e = document.createEvent('MouseEvents');
  e.initEvent('click', true, true);
  a.dispatchEvent(e);
};