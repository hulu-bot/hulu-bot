(async () => {
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  // dynamically load JS file from URL.
  function loadJs(src){
    return new Promise(resolve => {
      let head = document.head || document.getElementsByTagName('head')[0];
      let script = document.createElement('script');

      script.onreadystatechange = script.onload = () => resolve();
      script.src = src;
      script.type = 'text/javascript';

      head.insertBefore(script, head.firstChild);
    });
  }
  
  class Bot {
    constructor() {}
   
    async init() {
      await loadJs('https://code.jquery.com/jquery-3.4.1.min.js');
    }
    
    // run for the current page.
    run() { 
      
    }
  }
  
  
  let bot = new Bot();
  await bot.init();
  bot.run();
  
})();


/*
$('c1-ease-commerce-virtual-number-tile:has(div.token-name:contains("Hulu"))')[2].length
  $('c1-ease-commerce-virtual-number-tile:has(div.token-name:contains("Hulu"))')[2].click()
  
  $('div.vcNumber._TLPRIVATE:contains("••••")').length
  
  $('div.vcView').click()
  
  $($('div.vcNumber')[0]).text()
  $($('div.vcExpiration')[0]).text()
  $($('div.vcCVV')[0]).text()
  
  $('.c1-ease-dialog-close-button').click()

$('c1-ease-commerce-virtual-number-tile:has(div.token-name:contains("Hulu"))')[2].length
  $('c1-ease-commerce-virtual-number-tile:has(div.token-name:contains("Hulu"))')[2].click()
  $('button.vc-delete-button').click()
  $('button.deleteButton:contains("Delete")').click()
  $('.c1-ease-dialog-close-button').click()

*/
