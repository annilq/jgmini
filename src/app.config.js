module.exports = {
  pages: [
    'pages/work/index',
    'pages/index/index',
    'pages/login/index',
    'pages/user/index',
    'pages/task/index',
    'pages/approvepage/index',
  ],
  window: {
    navigationBarTitleText: '云建管',
    navigationBarBackgroundColor: '#4095ff'
  },
  tabBar: {
    "list": [
      {
        "pagePath": "pages/index/index",
        "iconPath":"/images/icon.png",
        "text": "工作"
      },
      {
        "pagePath": "pages/task/index",
        "iconPath":"/images/icon.png",
        "text": "任务"
      },
      {
        "pagePath": "pages/user/index",
        "iconPath":"/images/icon.png",
        "text": "我的"
      }
    ]
  }
};
