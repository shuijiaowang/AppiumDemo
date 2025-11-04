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
        // 2. 等待 App 加载完成（最多等 10 秒）
        await driver.pause(10000);  // 简单粗暴的等待，实际可以等某个元素出现

        // 3. 获取当前页面的 XML 结构（相当于 App 的“HTML”）
        const pageSource = await driver.getPageSource();
        console.log("拼多多首页 XML 内容：\n", pageSource);

        // 4. 保存到文件（方便查看）
        const fs = require('fs');
        fs.writeFileSync('pdd_home.xml', pageSource, 'utf-8');
        console.log("已保存到 pdd_home.xml 文件");

    } catch (err) {
        console.error("出错了：", err);
    } finally {
        // 5. 关闭连接（重要！否则模拟器会一直被占用）
        await driver.deleteSession();
    }
}

// 执行函数
getPddHomepage();