# 登录页面说明文档

## 概述

已成功创建一个功能完整、设计美观的登录页面，支持多平台（微信小程序、H5、App等）。

## 文件结构

```
src/
├── pages/
│   ├── login/
│   │   └── login.vue          # 登录页面组件
│   └── index/
│       └── index.vue          # 首页（已存在）
├── api/
│   ├── request.ts             # API请求封装
│   └── auth.ts                # 登录相关API接口
└── styles/
    └── global.scss            # 全局样式文件
```

## 功能特性

### 1. 登录表单
- 手机号输入（自动过滤非数字字符）
- 密码输入（支持显示/隐藏切换）
- 表单验证（手机号格式、必填检查）
- 错误提示

### 2. 微信一键登录（小程序环境）
- 自动检测运行环境
- 调用 uni.login() 获取微信登录凭证
- 支持获取用户信息
- 自动跳转到首页

### 3. 登录状态管理
- 登录状态检测
- Token自动存储
- 自动跳转首页（已登录用户）

### 4. 错误处理
- 网络错误提示
- 表单验证错误
- Token过期自动跳转

### 5. 响应式设计
- 移动端优化的布局
- 触摸友好的交互
- 流畅的动画效果

## 使用说明

### 测试登录功能

默认测试账号：
- 手机号：13800138000
- 密码：123456

测试步骤：
1. 打开登录页面
2. 输入手机号和密码
3. 点击"登录"按钮
4. 登录成功后自动跳转到首页

### 修改API地址

在 `src/api/request.ts` 中修改：
```typescript
const baseURL = import.meta.env.VITE_API_BASE_URL || ''
```

建议在 `.env` 文件中配置：
```
VITE_API_BASE_URL=https://your-api-domain.com
```

### 集成真实后端API

在 `src/pages/login/login.vue` 中修改 `mockLogin` 方法：

```typescript
import { login } from '@/api/auth'

const handleLogin = async () => {
  if (!validateForm()) {
    return
  }

  isLoading.value = true

  try {
    const res = await login({
      phone: formData.value.phone,
      password: formData.value.password
    })

    // 保存token
    uni.setStorageSync('token', res.data.token)

    // 跳转到首页
    uni.reLaunch({
      url: '/pages/index/index'
    })
  } catch (error: any) {
    errorMessage.value = error.message || '登录失败，请重试'
    uni.showToast({
      title: errorMessage.value,
      icon: 'none',
      duration: 2000
    })
  } finally {
    isLoading.value = false
  }
}
```

### 微信小程序配置

1. 在 `src/manifest.json` 中配置微信小程序AppID：
```json
{
  "mp-weixin": {
    "appid": "your-appid-here"
  }
}
```

2. 在微信小程序后台配置合法域名：
   - request合法域名
   - uploadFile合法域名
   - downloadFile合法域名

3. 配置用户信息授权：
   - 在小程序后台开启"用户信息获取"

## 平台适配

### 微信小程序
- 显示"微信一键登录"按钮
- 使用 uni.login() API
- 调用 getUserInfo 获取用户信息

### H5/APP
- 显示手机号+密码登录
- 隐藏"微信一键登录"按钮

### 其他小程序平台
- 默认显示手机号+密码登录
- 可根据需要添加其他平台登录方式

## 样式定制

### 修改主题颜色

在 `src/pages/login/login.vue` 中修改 CSS 变量：
```scss
.login-container {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

### 调整布局间距

修改 `src/pages/login/login.vue` 中的 padding 和 margin 值。

### 修改Logo

替换 `logo-icon-inner` 中的 emoji 或使用自定义图标：
```vue
<image class="logo-icon" src="/static/logo.png"></image>
```

## 常见问题

### Q: 登录后没有跳转？
A: 检查是否正确设置了 token，确保 pages.json 中的登录页面是第一个页面。

### Q: 微信登录不显示？
A: 确认运行环境是否为小程序，检查是否正确获取了用户信息授权。

### Q: 表单验证不生效？
A: 检查输入框是否正确绑定了 v-model，确认手机号格式验证规则。

### Q: API请求失败？
A: 检查 baseURL 配置是否正确，确认网络连接正常，查看浏览器控制台错误信息。

## 性能优化建议

1. **图片优化**：使用 WebP 格式的小图标和Logo
2. **代码分割**：将 API 模块按需导入
3. **缓存策略**：合理使用 uni.setStorageSync 和 uni.getStorageSync
4. **防抖处理**：对频繁触发的输入事件添加防抖
5. **懒加载**：对首屏外的内容进行懒加载

## 后续改进建议

1. 添加验证码登录功能
2. 支持第三方登录（QQ、支付宝等）
3. 添加登录状态持久化
4. 实现记住密码功能
5. 添加密码强度检测
6. 优化加载动画效果
7. 添加暗色主题支持

## 技术栈

- Vue 3 Composition API
- TypeScript
- UniApp 框架
- SCSS
- 响应式设计

## 许可证

MIT
