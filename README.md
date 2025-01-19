# 网页颜色反转插件

一个简单的 Chrome 扩展程序，可以将指定网页的颜色进行反转。特别适用于将深色网页转换为浅色，或将浅色网页转换为深色。

## 初衷
1. 某些网站太反人类了,大白天直接给你暗黑颜色，纯白字体，直接闪瞎眼；目前谷歌商店的插件都是全局的，所以就自己写一个插件，只针对特定网站进行颜色反转。
2. 体验下cursor，利用工具解决实际场景，本仓库所有代码均为其生成

## 功能特点

- 🎯 支持自定义需要反转颜色的网页
- 🚀 页面加载时自动应用颜色反转
- 🖼️ 智能处理图片和视频，保持原有显示效果
- 💾 设置自动保存和同步
- ⚡ 即时生效，无需刷新页面

## 安装方法

1. 下载此仓库的所有文件
2. 打开 Chrome 浏览器，进入扩展程序页面：
   - 在地址栏输入：`chrome://extensions/`
   - 或者通过菜单：设置 -> 扩展程序
3. 开启右上角的"开发者模式"
4. 点击"加载已解压的扩展程序"
5. 选择包含插件文件的文件夹

## 使用说明

1. 点击浏览器工具栏中的插件图标
2. 在弹出窗口中输入需要反转颜色的网址
   - 例如：`example.com`
3. 点击"添加"按钮保存
4. 访问已添加的网站时，颜色会自动反转
5. 如需删除某个网址，点击对应的"删除"按钮即可

## 文件结构
```txt
├── manifest.json     // 插件配置文件
├── popup.html       // 弹出窗口界面
├── popup.js         // 弹出窗口逻辑
├── background.js    // 后台服务脚本
└── icons/          // 图标文件夹
    └── icon.png    // 插件图标
```
## 技术实现

- 使用 Chrome Extension Manifest V3
- 通过 CSS filter 实现颜色反转
- 使用 Chrome Storage API 保存设置
- 使用 Chrome Tabs API 监听页面加载
- 使用 Chrome Scripting API 注入样式

## 注意事项

- 插件需要 `storage`、`activeTab`、`scripting` 和 `host_permissions` 权限
- 颜色反转可能会影响某些特殊设计的网页效果
- 如遇到显示异常，可以尝试删除该网址后重新添加

## 许可证

MIT License

## 贡献指南

欢迎提交 Issue 和 Pull Request 来帮助改进这个插件。

1. Fork 这个仓库
2. 创建您的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交您的更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开一个 Pull Request
