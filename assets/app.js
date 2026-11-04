const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav-links');
if (toggle) toggle.addEventListener('click', () => nav.classList.toggle('open'));
document.querySelectorAll('.nav-links a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));

const CONTACT_ENDPOINT = "https://script.google.com/macros/s/AKfycbxSwC_TVPam5-KuM4KSNNnNv0lJSb0Nl33_Txlo5Cz01225jFsbCMZOLsZiW0M4nV4_IQ/exec";
const form = document.getElementById("contactForm");
const statusBox = document.getElementById("formStatus");

if (form) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (CONTACT_ENDPOINT.includes("PASTE_YOUR")) {
      statusBox.textContent = "網站已完成，但尚未設定詢價收件網址。請先完成 Google Apps Script 設定。";
      statusBox.className = "form-status error";
      return;
    }

    const submitButton = form.querySelector("button[type=submit]");
    submitButton.disabled = true;
    submitButton.textContent = "送出中…";
    statusBox.textContent = "";

    const payload = Object.fromEntries(new FormData(form).entries());

    try {
      await fetch(CONTACT_ENDPOINT, {
        method: "POST",
        mode: "no-cors",
        headers: {"Content-Type": "text/plain;charset=utf-8"},
        body: JSON.stringify(payload)
      });

      // Google Apps Script 使用 no-cors 時，瀏覽器無法讀取回應內容。
      // 但你已確認資料會寫入試算表並寄出 Email，因此送出後直接顯示成功狀態。
      form.reset();
      statusBox.textContent = "✓ 詢問已送出！我會再與你聯絡。";
      statusBox.className = "form-status success";
    } catch (error) {
      statusBox.textContent = "送出時發生問題，請稍後再試，或直接使用 Email 聯絡。";
      statusBox.className = "form-status error";
    } finally {
      submitButton.disabled = false;
      submitButton.innerHTML = '送出詢問 <span>↗</span>';
    }
  });
}


/* Remove the opening logo animation after it has faded away. */
const introSplash = document.querySelector(".intro-splash");
if (introSplash) {
  introSplash.addEventListener("animationend", (event) => {
    if (event.animationName === "intro-splash-out") introSplash.remove();
  });
}
