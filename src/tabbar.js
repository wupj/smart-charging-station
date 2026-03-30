/**
 * TabBar 配置文件
 * 用于定义底部导航栏的样式、图标和路由
 */
export const tabBarConfig = {
  // 底部导航栏列表，最多5个
  list: [
    {
      pagePath: '/pages/index/index',
      selectedIconPath: '/static/tabbar/home-active.png',
      iconPath: '/static/tabbar/home.png',
      text: '首页'
    },
    {
      pagePath: '/pages/order/order',
      selectedIconPath: '/static/tabbar/order-active.png',
      iconPath: '/static/tabbar/order.png',
      text: '订单'
    },
    {
      pagePath: '/pages/device/device',
      selectedIconPath: '/static/tabbar/device-active.png',
      iconPath: '/static/tabbar/device.png',
      text: '设备'
    },
    {
      pagePath: '/pages/user/user',
      selectedIconPath: '/static/tabbar/user-active.png',
      iconPath: '/static/tabbar/user.png',
      text: '我的'
    }
  ],
  // TabBar 的基本样式
  color: '#999999',           // 默认图标颜色
  selectedColor: '#667eea',   // 选中图标颜色
  backgroundColor: '#ffffff', // 背景颜色
  borderStyle: 'white',       // 边框颜色 (black/white)
  // 自定义 TabBar (可选)
  custom: false
}

export default tabBarConfig
