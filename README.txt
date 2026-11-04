小滿｜網站與數位服務｜第三版

這一版新增「C 方案」：
客戶填寫網站詢價表單 → Google Apps Script → Google 試算表留存 → Email 通知你。

部署步驟：
1. 建立 Google 試算表。
2. 擴充功能 → Apps Script。
3. 貼上 google-apps-script-Code.gs。
4. 把 OWNER_EMAIL 改成你自己的 Email。
5. 執行 setupSheet() 一次並完成授權。
6. 部署為「網頁應用程式」：
   - 執行身分：我
   - 存取權：任何人
7. 複製 Web App URL。
8. 開啟 assets/app.js，把 CONTACT_ENDPOINT 的內容替換成 Web App URL。
9. 將整個網站重新部署到 Netlify / GitHub Pages。

重要：
- 目前程式沒有把你的 Email 寫死，所以不會誤寄給別人。
- 正式上線前一定要先測試一筆測試詢價。
- Google Apps Script 的授權、配額與 Google 帳戶政策可能隨時間調整。

第四版案例展示：以提供的三個實際網站為來源，加入真實網站圖片、庫存系統介面預覽與實際網站連結。詢價功能與最新 Apps Script URL 保留不變。


本次更新（2026-11-04）：
- 合作流程項目新增滑鼠懸停上浮效果。
- 作品展示的圖片與「查看案例」連結，分別導向三個對應案例的詳細區塊。
- 全站頁尾新增聯絡信箱：xiaomanshuwei@gmail.com。
- Apps Script 通知收件人已更新為 xiaomanshuwei@gmail.com。
- 詢價資料仍寫入原本綁定的 Google 試算表，不會自動建立新試算表。

重要：網站 ZIP 內的 Apps Script 程式碼已更新，但雲端已部署的 Apps Script 不會因為替換網站檔案而自動更新。
請將 google-apps-script-Code.gs 的內容貼回原本綁定該試算表的 Apps Script 專案，儲存後到「部署 → 管理部署 → 編輯 → 版本：新增版本 → 部署」。
沿用原本部署，通常可保留原 Web App URL；若 Google 顯示網址有變動，才需要同步更新 assets/app.js 的 CONTACT_ENDPOINT。
部署後請送出一筆測試詢問，確認試算表新增資料，且通知寄到 xiaomanshuwei@gmail.com。


本次品牌動畫更新：
- 首頁載入時新增小滿數位 Logo 開場動畫，淡入、上移、底線展開後淡出。
- 導覽列 Logo 在滑鼠移上或鍵盤聚焦時會微幅上浮。
- 尊重系統減少動態效果設定；其他頁面與原有聯絡表單功能不變。
