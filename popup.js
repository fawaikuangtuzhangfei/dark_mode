document.addEventListener("DOMContentLoaded", function () {
  const urlInput = document.getElementById("urlInput");
  const addButton = document.getElementById("addUrl");
  const urlList = document.getElementById("urlList");

  // 加载已保存的URL列表
  loadUrls();

  chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
    let fullUrl = tabs[0].url;
    const baseUrl = extractBaseUrl(fullUrl);
    console.log(baseUrl);
    urlInput.value = baseUrl;
  });

  addButton.addEventListener("click", function () {
    const url = urlInput.value.trim();
    if (url) {
      addUrlToList(url);
      urlInput.value = "";
    }
  });

  function addUrlToList(url) {
    chrome.storage.sync.get(["darkModeUrls"], function (result) {
      const urls = result.darkModeUrls || [];
      if (!urls.includes(url)) {
        urls.push(url);
        chrome.storage.sync.set({ darkModeUrls: urls }, function () {
          displayUrls(urls);
        });
      }
    });
  }

  function loadUrls() {
    chrome.storage.sync.get(["darkModeUrls"], function (result) {
      const urls = result.darkModeUrls || [];
      displayUrls(urls);
    });
  }

  function extractBaseUrl(fullUrl) {
    try {
      const u = new URL(fullUrl);
      return `${u.protocol}//${u.hostname}`;
    } catch (e) {
      return ""; // 若不是合法URL
    }
  }

  function displayUrls(urls) {
    urlList.innerHTML = "";
    urls.forEach((url) => {
      const div = document.createElement("div");
      div.className = "url-item";
      div.innerHTML = `
        <span>${url}</span>
        <button class="delete-btn" data-url="${url}">删除</button>
      `;
      urlList.appendChild(div);
    });

    // 添加删除按钮的事件监听
    document.querySelectorAll(".delete-btn").forEach((btn) => {
      btn.addEventListener("click", function () {
        const urlToDelete = this.getAttribute("data-url");
        removeUrl(urlToDelete);
      });
    });
  }

  function removeUrl(url) {
    chrome.storage.sync.get(["darkModeUrls"], function (result) {
      const urls = result.darkModeUrls || [];
      const newUrls = urls.filter((u) => u !== url);
      chrome.storage.sync.set({ darkModeUrls: newUrls }, function () {
        displayUrls(newUrls);
      });
    });
  }
});
