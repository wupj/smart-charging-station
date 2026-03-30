# 快速启动指南

## 安装依赖
```bash
npm install
```

## 运行项目

### 开发环境（H5）
```bash
npm run dev:h5
```
访问: http://localhost:3000

### 微信小程序
```bash
npm run dev:mp-weixin
```

### APP
```bash
npm run dev:app
```

## 测试登录
1. 打开浏览器访问 http://localhost:3000
2. 输入测试账号：
   - 手机号：13800138000
   - 密码：123456
3. 点击"登录"按钮

## API 配置
在 `.env.development` 中修改后端 API 地址：
```
VITE_API_BASE_URL=http://your-api-server.com/api
```

## 项目结构
```
smart-charging-station/
├── src/
│   ├── pages/
│   │   ├── login/login.vue      # 登录页面
│   │   └── index/index.vue      # 首页
│   ├── api/
│   │   ├── request.ts           # API 请求封装
│   │   └── auth.ts              # 认证 API
│   └── styles/
│       └── global.scss          # 全局样式
├── .env.development             # 开发环境配置
├── package.json
├── vite.config.ts
└── manifest.json
```

## 开发建议
1. 修改 API 接口时，更新 `src/api/request.ts` 和 `src/api/auth.ts`
2. 修改样式时，更新 `src/pages/login/login.vue` 或 `src/styles/global.scss`
3. 修改路由时，更新 `src/pages.json`
