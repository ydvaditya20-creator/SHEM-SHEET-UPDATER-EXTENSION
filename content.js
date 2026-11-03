
(function() {
  // --- यहाँ अपना Google Apps Script Web App URL डालें ---
  
  const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyfRIwkSQXLQ1lLaG32cv-HStP0822y4RK4urqcooSOf3MiA8H5StAbMcDl-vzIZpFFkg/exec";



  function extractAndSendText() {
    let rawText = "";

    // तरीका 1: पूरे बॉडी का टेक्स्ट उठाना
    if (document.body) {
      rawText = document.body.innerText || document.body.textContent || "";
    }

    // तरीका 2: अगर बॉडी खाली है, तो पूरे डॉक्यूमेंट का टेक्स्ट उठाना
    if (!rawText.trim() && document.documentElement) {
      rawText = document.documentElement.innerText || "";
    }

    // तरीका 3: अगर फिर भी खाली है, तो पूरे HTML को ही टेक्स्ट बना देना (अंतिम हथियार)
    if (!rawText.trim() && document.body) {
      rawText = document.body.innerHTML.replace(/<[^>]*>/g, ' '); // HTML टैग्स हटाकर सिर्फ टेक्स्ट रखना
    }

    // यदि डेटा मिल गया है, तो भेजें
    if (rawText && rawText.trim().length > 10) {
      const payload = {
        url: window.location.href,
        rawText: rawText.toString()
      };

      console.log("डेटा मिल गया! भेजने की प्रक्रिया शुरू...", payload);

      fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      })
      .then(() => {
        console.log("सफलतापूर्वक Google Sheet को डेटा भेज दिया गया है!");
      })
      .catch(err => {
        console.error("नेटवर्क एरर:", err);
      });
      
      return true; // डेटा मिल गया
    }
    
    return false; // डेटा नहीं मिला
  }

  // पेज लोड होने पर तुरंत चलाएं
  console.log("एक्सटेंशन एक्टिवेट हो गया है, डेटा खोजने की कोशिश जारी है...");
  let success = extractAndSendText();

  // अगर तुरंत डेटा नहीं मिला (पेज लोड हो रहा हो), तो 3 सेकंड बाद दोबारा कोशिश करें
  if (!success) {
    console.log("तुरंत डेटा नहीं मिला, 3 सेकंड का इंतज़ार किया जा रहा है...");
    setTimeout(() => {
      let retrySuccess = extractAndSendText();
      if (!retrySuccess) {
        console.error("खेद है! सभी प्रयासों के बाद भी पेज से टेक्स्ट नहीं निकाला जा सका।");
      }
    }, 3000);
  }

})();