 
     
      
     //let sheetWebhookUrl = `https://script.google.com/macros/s/AKfycbzq3rzJX7YEzZK23lVJpIJw6mOVpAtHqCAQTWSi8aFr3Ofb8ClBgAr5djg832eg79FR/exec{admissionNum}`;
  window.addEventListener('load', () => {
  // पेज लोड होने के 2 सेकंड बाद कोड चलेगा
  setTimeout(() => {
    
    // 1. पूरे पेज का टेक्स्ट रीड करना
    let pageText = document.body.innerText || document.body.textContent;
    
    // 2. अप्रैल महीने को ढूंढना
    let hasApril = pageText.toLowerCase().includes('april');

    if (hasApril) {
      
      // 3. 'N-' के साथ 7 अंकों वाले एडमिशन नंबर को खोजना (जैसे N-2025022)
      let admissionMatch = pageText.match(/N-\d{7}/);
      
      if (admissionMatch) {
        let admissionNum = admissionMatch[0]; // पहले सटीक मैचिंग नंबर को टेक्स्ट रूप में उठाना
        
        // 4. बिल्कुल सही यूआरएल स्ट्रक्चर (?id= के साथ)
        let baseUrl = "https://script.google.com/macros/s/AKfycbzq3rzJX7YEzZK23lVJpIJw6mOVpAtHqCAQTWSi8aFr3Ofb8ClBgAr5djg832eg79FR/exec";
        let sheetWebhookUrl = baseUrl + "?id=" + encodeURIComponent(admissionNum) + "&nocache=" + Math.random();
        
        // 5. डेटा भेजना
        fetch(sheetWebhookUrl, {
          method: "GET",
          mode: "no-cors"
        })
        .then(() => {
          console.log("डेटा भेज दिया गया है। कृपया शीट में चेक करें: " + admissionNum);
        })
        .catch(error => {
          console.error("नेटवर्क एरर आया:", error);
        });
        
      } else {
        console.log("ERROR: इस रसीद पर 'N-' पैटर्न वाला एडमिशन नंबर नहीं मिला।");
      }
    } else {
      console.log("NOT FOUND: इस रसीद में 'April' शब्द नहीं मिला।");
    }

  }, 2000); // 2 सेकंड का इंतजार
});