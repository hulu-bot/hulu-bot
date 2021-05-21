(async () => {
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
 class Bot {
    constructor() {}
   
    async init() {
      await this.loadJs('https://code.jquery.com/jquery-3.4.1.min.js');
      await this.loadJs('https://hulu-bot.github.io/hulu-bot/bililiteRange.js');
      await this.loadJs('https://hulu-bot.github.io/hulu-bot/jquery.sendkeys.js');
    }
    
    // dynamically load JS file from URL.
    loadJs(src){
      return new Promise(resolve => {
        let head = document.head || document.getElementsByTagName('head')[0];
        let script = document.createElement('script');

        script.onreadystatechange = script.onload = () => resolve();
        script.src = src;
        script.type = 'text/javascript';

        head.insertBefore(script, head.firstChild);
      });
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
    
    async $(query) {
      let found = null;
      while(!(found = $(query)) || !found.length) {
        await sleep(1000);
      }      
      return found;
    }
    
    async click(query) {
      let found = null;
      while(!(found = query()) || !found.length) {
        await sleep(1000);
      }      
      if(found.click) {
        found.click();
      }
    }
    
    async fill(query, value) {
      let found = null;
      while(!(found = query()) || !found.length) {
        await sleep(1000);
      }      
      if(found.value) {
        found.click();
      }
    }
  }
  
  async function find(query) {
    let found = null;
    while(!(found = $(query)) || !found.length) {
      await sleep(1000);
    }      
    return found;
  }
  
  async function until(condition) {
    while(!condition()) {
      await sleep(1000);
    }
  }
  
  async function fill(query, string) {
    (await find(query)).val('');
    if($(query).val() == '') {
      $(query)[0].focus();
      document.title = 'BotHelper:SendText('+string+')';
      await until(() => ($(query).val() == string));
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
      if (this.url.includes('hulu.com/start/affiliate?')) {
        this.affiliate();
      } else if (this.url.includes('hulu.com/welcome')) {
        this.welcome();
      } else if (this.url.includes('signup.hulu.com/plans')) {
        this.plans();
      } else if (this.url.includes('signup.hulu.com/account')) {
        this.account();
      } else {
        
      }
    }
    
    async affiliate() {
      window.location.href = "https://www.hulu.com";
    }
    
    async welcome() {
      (await find('.Masthead__input button:contains("FREE TRIAL")')).click();
    }
    
    async plans() {
      (await find('button[aria-label*="$5.99"]:contains("SELECT")')).click();
    }
    
    async account() {
      await fill('#email', 'derp@herp.com');
      await fill('#password', 'werple');
      await fill('#firstName', 'Dude');
      
      $('#birthdayMonth-item-0').click();
      $('#birthdayDay-item-0').click();
      $('#birthdayYear-item-40').click();
      $('#gender-item-2').click();
      
      (await find('.button--continue:contains("CONTINUE")')).click();      
    }
  }
  
  let bot = new Bot();
  await bot.init();
  bot.run();
  
})();

//"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" --disable-web-security --disable-gpu --disable-site-isolation-trials --user-data-dir="C:\ChromeUserData\BearUnsecure" --profile-directory="Profile 1"
