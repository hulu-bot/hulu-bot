(async () => {
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  class Bot {
    constructor() {
      this.loadJs('https://code.jquery.com/jquery-3.4.1.min.js');
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
      let hostname = window.location.hostname;
      
      if(hostname.includes('hulu.com')) {
        this.hulu = new Hulu();
        this.hulu.check(url);
      }
    }
  }
  
  class PageMonitor {
    constructor() {}
    monitor(query, action) {
      while(!query()) {
        await sleep(1000);
      }      
      if(action) {
        action(); 
      }
    }
  }
  
  // ======
  // Hulu processing class
  // ======
  class Hulu extends PageMonitor {
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
      this.monitor(
        () => $('.Masthead__input button:contains("FREE TRIAL")'),
        () => $('.Masthead__input button:contains("FREE TRIAL")').click()
      );
    }
  }
  
  let bot = new Bot();
  bot.run();
  
})();

//"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" --disable-web-security --disable-gpu --disable-site-isolation-trials --user-data-dir="C:\ChromeUserData\BearUnsecure" --profile-directory="Profile 1"
