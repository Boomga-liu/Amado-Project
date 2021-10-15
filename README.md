![](https://upload.cc/i1/2021/09/18/xXwbAF.png)
![](https://upload.cc/i1/2021/10/15/UAKwrR.png)
![](https://upload.cc/i1/2021/09/18/eE9LUn.png)
![](https://upload.cc/i1/2021/09/18/Mted1Z.png)

# Amado

> Amado 家具電商網站

Demo：https://boomga-liu.github.io/Amado-Project/#/

## 專案說明

- 網站主要使用 `Vue.js` 和 `Vue Cli` 架設而成
- 引入 `Vue-Router` 與 `Vue-Axios` 等套件
- 引入 `Bootstrap 4` 樣式
- 開發後台管理系統
- 使用 `ESLint Standard` 規範
- 使用 `Event Bus` 傳遞跨元件資料
- Layout 使用 `Bootstrap 4` 結合 `Sass/SCSS` 切版
- 使用 `Font Awesome`

### 前台

- 使用 `Swiper` 套件製作 Hero Header
- 限制商品可購買數量，避免使用者超買
- 使用 `Vee Validation` 套件驗證表單
- 建立商品分類，依照類別篩選商品，產生分頁
- 結帳時可使用優惠碼，並計算優惠價格
- 使用 `vue-loading-overlay` 優化使用者體驗
- 使用 `Vuex` 管理喜歡清單功能
- 支援 RWD 響應式網站

### 後台

- 使用 Cookie 驗證後台登入狀態
- 商品管理：
  - 新增、編輯、刪除商品資訊
  - 開啟、關閉商品啟用
  - 可上傳圖片連結網址，或上傳圖片檔案
  - 商品列表可依照類別分類
- 訂單管理：
  - 新增、編輯、刪除優惠券
  - 模擬實際訂單功能
