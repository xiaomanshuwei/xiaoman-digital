/*
小滿｜詢價表單 Google Apps Script 後端

使用方式：
1. 建立一份 Google 試算表，例如「小滿｜客戶詢價」。
2. 在試算表：擴充功能 → Apps Script。
3. 把本檔案內容貼到 Code.gs。
4. OWNER_EMAIL 已設定為 xiaomanshuwei@gmail.com；試算表仍使用目前綁定的試算表，不需另建新表。
5. 執行 setupSheet() 一次，授權 Google 權限。
6. 部署 → 新增部署 → 網頁應用程式：
   - 執行身分：我
   - 誰可以存取：任何人
7. 複製 Web App URL。
8. 回到網站 assets/app.js，把 CONTACT_ENDPOINT 換成該 URL。
9. 重新部署網站。

注意：
- 這個 Web App 會把詢價資料寫入目前綁定的試算表，並寄送通知至 xiaomanshuwei@gmail.com。
- MailApp 會寄一封通知給 OWNER_EMAIL。
*/

const OWNER_EMAIL = "xiaomanshuwei@gmail.com";
const SHEET_NAME = "詢價資料";

function setupSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = ss.insertSheet(SHEET_NAME);

  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      "時間", "姓名", "公司／品牌", "Email", "網站類型", "預算",
      "網域", "Logo", "RWD", "多語系", "需求說明"
    ]);
  }
}

function doPost(e) {
  try {
    setupSheet();

    const data = JSON.parse(e.postData.contents || "{}");
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    const now = new Date();

    sheet.appendRow([
      now,
      data.name || "",
      data.company || "",
      data.email || "",
      data.type || "",
      data.budget || "",
      data.domain || "",
      data.logo || "",
      data.rwd || "",
      data.languages || "",
      data.message || ""
    ]);

    const subject = "【小滿網站】收到新的客戶詢價";
    const body =
      "收到新的網站詢價：\n\n" +
      "姓名：" + (data.name || "") + "\n" +
      "公司／品牌：" + (data.company || "") + "\n" +
      "Email：" + (data.email || "") + "\n" +
      "網站類型：" + (data.type || "") + "\n" +
      "預算：" + (data.budget || "") + "\n" +
      "網域：" + (data.domain || "") + "\n" +
      "Logo：" + (data.logo || "") + "\n" +
      "RWD：" + (data.rwd || "") + "\n" +
      "多語系：" + (data.languages || "") + "\n\n" +
      "需求說明：\n" + (data.message || "");

    if (OWNER_EMAIL && !OWNER_EMAIL.includes("YOUR_EMAIL")) {
      MailApp.sendEmail(OWNER_EMAIL, subject, body);
    }

    return ContentService
      .createTextOutput(JSON.stringify({ok: true}))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ok: false, error: String(error)}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
