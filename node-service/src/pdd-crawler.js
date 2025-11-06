// 引入 webdriverio（Appium 的 Node 客户端）
const { remote } = require('webdriverio');

// 配置连接信息（告诉 Appium 要操控哪个设备和 App）
const capabilities = {
    platformName: "Android",  // 平台：安卓
    "appium:deviceName": "emulator-5554",  // 设备名，随便写或用 adb devices 查
    "appium:appPackage": "com.xunmeng.pinduoduo",  // 拼多多的包名（固定）
    "appium:appActivity": ".ui.activity.MainActivity",  // 拼多多启动页面（固定）
    "appium:noReset": true,  // 不重置 App 数据（避免每次打开都重新登录）
    "appium:automationName": "UiAutomator2"  // 安卓自动化引擎（必须加，否则可能报错）
};

// 连接 Appium 服务器并操作 App
async function getPddHomepage() {
    // 1. 连接 Appium 服务器（默认地址 http://localhost:4723/wd/hub）
    const driver = await remote({
        // path: '/wd/hub',
        path: '/', // 或直接删除 path 配置（默认就是根路径）
        port: 4723,
        capabilities: capabilities
    });

    try {
        console.log("等待首页加载...");

        // 使用 XPath 定位 content-desc 为"搜索"的 TextView
        const searchInput = await driver.$('//android.widget.TextView[@content-desc="搜索"]');

        // 等待元素出现（最长15秒）
        await searchInput.waitForDisplayed({ timeout: 15000 });
        console.log("已定位到搜索框");

        // 点击搜索框
        console.log("点击搜索框...");
        await searchInput.click();

        // （可选）点击后可以继续输入内容或其他操作
        await driver.pause(2000); // 点击后等待2秒，观察效果

    } catch (err) {
        console.error("出错了：", err);
    } finally {
        // 5. 关闭连接（重要！否则模拟器会一直被占用）
        await driver.deleteSession();
    }
}

// 执行函数
getPddHomepage();