// 存储当前已应用暗色模式的标签ID
let darkModeTabsMap = new Map();

// 检查并应用暗色模式
async function checkAndApplyDarkMode(tabId, url) {
  if (!url) return;
  
  const result = await chrome.storage.sync.get(['darkModeUrls']);
  const urls = result.darkModeUrls || [];
  const shouldApplyDarkMode = urls.some(savedUrl => url.includes(savedUrl));
  
  if (shouldApplyDarkMode) {
    applyDarkMode(tabId);
  }
}

// 应用暗色模式
function applyDarkMode(tabId) {
  chrome.scripting.insertCSS({
    target: { tabId: tabId },
    css: `
      html {
        filter: invert(100%) hue-rotate(180deg) brightness(100%) !important;
        transition: filter 0.1s !important;
      }
      img, video, picture {
        filter: invert(100%) hue-rotate(180deg) !important;
      }
    `
  });
  darkModeTabsMap.set(tabId, true);
}

// 监听标签更新，包括导航开始和加载完成
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  // 当导航开始时就检查并应用暗色模式
  if (changeInfo.status === 'loading' && tab.url) {
    checkAndApplyDarkMode(tabId, tab.url);
  }
});

// 监听存储变化
chrome.storage.onChanged.addListener((changes, namespace) => {
  if (namespace === 'sync' && changes.darkModeUrls) {
    // 当URL列表更新时，重新检查所有标签
    chrome.tabs.query({}, (tabs) => {
      tabs.forEach(tab => {
        if (tab.url) {
          checkAndApplyDarkMode(tab.id, tab.url);
        }
      });
    });
  }
});

// 监听标签关闭
chrome.tabs.onRemoved.addListener((tabId) => {
  darkModeTabsMap.delete(tabId);
}); 