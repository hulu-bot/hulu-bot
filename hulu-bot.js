(() => {
  class Bot {
    constructor() {
      this.loadJs('https://code.jquery.com/jquery-3.4.1.min.js');      
      this.hulu = new Hulu();
    }
    
    // dynamically load JS file from URL.
    loadJs(url){
      let script = document.createElement('script');
      script.src = url;
      script.type = 'text/javascript';
      document.getElementsByTagName('head')[0].appendChild(script);
    }
    
    // run for the current page.
    run() {
      let url = window.location.href;
      this.hulu.check(url);
    }
  }
  
  // ======
  // Hulu processing class
  // ======
  class Hulu {
    constructor() {
      
    }
    
    check(url) {
      if(url.includes('hulu.com/welcome')) {
        this.welcome();
      } else if(url.includes('derp')) {
        
      } else {
        
      }
    }
    
    welcome() {
      $('.Masthead__input button:contains("FREE TRIAL")').click();
    }
  }
  
  let bot = new Bot();
  bot.run();
  
})();

//"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" --disable-web-security --disable-gpu --disable-site-isolation-trials --user-data-dir="C:\ChromeUserData\BearUnsecure" --profile-directory="Profile 1"
