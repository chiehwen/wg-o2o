# WorldGym 會籍禮物卡導入提案

這是一個使用 React + Vite + Tailwind CSS 建立的簡報應用程式。

## 本地開發

```bash
# 安裝依賴
npm install

# 啟動開發伺服器
npm run dev

# 建置生產版本
npm run build
```

## 部署到 Vercel

### 步驟 1：推送到 GitHub

1. 在 GitHub 建立新的 repository（例如：`wg-o2o`）
2. 執行以下指令：

```bash
git remote add origin https://github.com/你的GitHub帳號/wg-o2o.git
git push -u origin main
```

### 步驟 2：在 Vercel 部署

1. 前往 [Vercel](https://vercel.com)
2. 使用 GitHub 帳號登入
3. 點擊 "Add New Project"
4. 選擇你的 `wg-o2o` repository
5. Vercel 會自動偵測設定（已包含 `vercel.json`）
6. 點擊 "Deploy"
7. 等待部署完成（約 1-2 分鐘）

完成後，你會得到一個網址，例如：`https://wg-o2o.vercel.app`

之後每次 push 到 GitHub，Vercel 會自動重新部署！

