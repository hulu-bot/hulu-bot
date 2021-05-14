(async () => {
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
 class _Bot {
    constructor() {
      
    }
   
    async init() {
      await this.loadJs('https://code.jquery.com/jquery-3.4.1.min.js');
    }
    
    // dynamically load JS file from URL.
    async loadJs(src){
      //(async () => {
        await new Promise(resolve => {
          console.log('inner 1');
          let head = document.head || document.getElementsByTagName('head')[0];
          let script = document.createElement('script');

          script.onreadystatechange = script.onload = () => {
            console.log('inner 3');
            resolve();            
          }
          script.src = src;
          script.type = 'text/javascript';

          head.insertBefore(script, head.firstChild);
          console.log('inner 2');
          //document.getElementsByTagName('head')[0].appendChild(script);
        });
      //})();
      
      console.log('outer');
    }
    
    // run for the current page.
    run() {
      if(window.location.hostname.includes('hulu.com')) {
        this.hulu = new Hulu(window.location.href);
        this.hulu.check();
      }
    }
  }
  
  class PageMonitor {
    constructor() {}
    async monitor(query, action) {
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
    constructor(url) { 
      super(); 
      this.url = url;
    }
    
    check() {
      if(this.url.includes('hulu.com/welcome')) {
        this.welcome();
      } else if(this.url.includes('derp')) {
        
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
