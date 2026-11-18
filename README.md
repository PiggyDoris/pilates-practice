# Pilates Notes — 獨立免登入練習站

網站：https://practice.pilatesnotes.site/
匯出版本：2026-11-18，來源提交 e9a2c98158e2a675c6ada009effd76486d28d00d。

這是獨立練習站的完整靜態原始碼與圖片。未包含原站學生資料、備課紀錄、帳號同步、Git 記錄或部署憑證。本次匯出沒有修改線上網站。

## 本機開啟

安裝 Python 3 後，在本資料夾開啟終端機：

```sh
python -m http.server 8000 --directory docs
```

瀏覽 http://localhost:8000 。Windows 也可使用 `py -m http.server 8000 --directory docs`。
請透過 HTTP 伺服器開啟，不要直接雙擊 HTML；動作摘要頁需要讀取 JSON。

## 主要檔案

- `docs/index.html`：主介面、記憶與考試程式（JavaScript 直接寫在 HTML 內）。
- `docs/curriculum-data.js`、`module1-data.js`、`legacy-cases.js`：教材及題目資料。
- `docs/movement-media.js`、`part-cd-data.js`：動作圖片對應及 Part C／D 資料。
- `docs/movement-media/`：圖片素材。
- `docs/visitor.html`、`visitor.js`、`visitor-notes.json`：動作摘要、搜尋及轉換練習。
- `docs/course-workspace.css`：樣式。
- `check.cjs`：基本功能檢查；安裝 Node.js 後執行 `node check.cjs`。

## 部署與修改

此站不需安裝 npm 套件、不需建置、不需後端或登入服務。將 `docs/` 內容部署到支援靜態網站的主機即可，首頁是 `index.html`。自訂網址與 HTTPS 需在新主機另行設定；程式碼本身不會自動綁定網域。

練習紀錄使用 sessionStorage，只屬於當前瀏覽器分頁，不會跨裝置同步；關閉分頁後不保證保留。程式沿用原站的共用函式，可能仍包含未啟用的備課相關函式，但導覽限制在練習頁，沒有連接私人資料服務。

## 已知限制

圖片內容與已發布的獨立練習版相同。先前發現的文字混入、裁切殘片、部分動作共用圖片與階段標示不清等問題尚未全部修正，不能把這份當成完成圖片審核的版本。教材圖片與內容仍受原權利人權利保護，這份匯出不代表授予對外再散布的授權。

## GitHub Pages

此儲存庫以 GitHub Pages 發布：Settings → Pages → Source 選「Deploy from a branch」，Branch 選 `main`、資料夾選 `/docs`。
站內連結已改為相對路徑，可在 `https://<帳號>.github.io/<儲存庫名稱>/` 這類子路徑下正常運作。
