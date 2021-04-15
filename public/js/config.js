const config = {
  // 站点标题
  siteTitle: "浙江美森细胞科技有限公司",

  // 各种开关
  isRelease: false,

  // 服务端
  apiServerProtocol: 'http://',
  apiServerHost: 'lolcahost',
  apiServerPort: 81,
  apiServerUrl: "http://localhost:81",

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
    product: {
      getCells: "/product/getCells",
      getCell: "/product/getCell",
    }
  },

};


if (config.isRelease) {
  config.apiServerProtocol = "https://";
  config.apiServerHost = "www.ctcc.online";
  config.apiServerUrl = config.apiServerProtocol + config.apiServerHost + ':' + config.apiServerPort;
}