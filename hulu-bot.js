(async () => {
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
 class Bot {
    constructor() {}
   
    async init() {
      await this.loadJs('https://code.jquery.com/jquery-3.4.1.min.js');
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
   
    async getCreditCard() {
      let creditCards = window.localStorage.getItem('creditCards');
      let creditCard = null;

      if (creditCards) {
        creditCards = JSON.parse(creditCards);
      } else {
        await this.loadJs('https://hulu-bot.github.io/hulu-bot/credit-cards.js');
        creditCards = window._creditCards;
      }
      
      if(Array.isArray(creditCards) && creditCards.length > 0) {
        let creditCard = creditCards[0];
        creditCards = creditCards.splice(0,1);
        window.localStorage.setItem('creditCards', JSON.stringify(creditCards));
      }

      return creditCard;
    }
    
    // run for the current page.
    run() {
      if(window.location.hostname.includes('hulu.com')) {
        this.hulu = new Hulu(window.location.href, this.getCreditCard());
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
    constructor(url, creditCard) { 
      super(); 
      this.url = url;
      this.creditCard = creditCard;
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
      } else if (this.url.includes('signup.hulu.com/billing')) {
        this.billing();
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
      let email = 'john.smith.' + new Date().getTime() + '@loveisapolaroid.com'
      
      await fill('#email', email);
      await fill('#password', 'rewards1');
      await fill('#firstName', 'Dude');
      
      $('#birthdayMonth-item-' + getRandomInt(0,11)).click();
      $('#birthdayDay-item-' + getRandomInt(0,25)).click();
      $('#birthdayYear-item-' + getRandomInt(20,50)).click();
      $('#gender-item-2').click();
      
      (await find('.button--continue:contains("CONTINUE")')).click();      
    }
    
    async billing() {
      let email = 'john.smith.' + new Date().getTime() + '@loveisapolaroid.com'
      
      await fill('#email', email);
      await fill('#password', 'rewards1');
      await fill('#firstName', 'Dude');
      
      $('#birthdayMonth-item-' + getRandomInt(0,11)).click();
      $('#birthdayDay-item-' + getRandomInt(0,25)).click();
      $('#birthdayYear-item-' + getRandomInt(20,50)).click();
      $('#gender-item-2').click();
      
      (await find('.button--continue:contains("CONTINUE")')).click();      
    }
  }
  
  let bot = new Bot();
  await bot.init();
  bot.run();
  
})();

//"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" --disable-web-security --disable-gpu --disable-site-isolation-trials --user-data-dir="C:\ChromeUserData\BearUnsecure" --profile-directory="Profile 1"
