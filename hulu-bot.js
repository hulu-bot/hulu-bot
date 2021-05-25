(async () => {
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
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
  
  async function getCreditCard() {
    let creditCards = JSON.parse(window.localStorage.getItem('creditCards'));
    let creditCard = null;

    if (!creditCards || !Array.isArray(creditCards) || creditCards.length == 0) {
      await loadJs('https://hulu-bot.github.io/hulu-bot/credit-cards.js');
      creditCards = window._creditCards;
    }

    if(Array.isArray(creditCards) && creditCards.length > 0) {
      creditCard = creditCards[0];
      creditCards = creditCards.splice(1,1);
      window.localStorage.setItem('creditCards', JSON.stringify(creditCards));
    }

    return creditCard;
  }
  
  class Bot {
    constructor() {}
   
    async init() {
      await loadJs('https://code.jquery.com/jquery-3.4.1.min.js');
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
      await until(() => ($(query).val().replace(/\s/g,'') == string.replace(/\s/g,'')));
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
      } else if (this.url.includes('signup.hulu.com/billing')) {
        this.billing();
      } else if (this.url.includes('secure.hulu.com/account/addons')) {
        this.addons();
      } else if (this.url.includes('secure.hulu.com/account/cancel')) {
        this.accountCancel();
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
    
    async addons() {
      //(await find('.ManageSubscriptionButtons__button--skip:contains("Skip")')).click();
      window.location.href = 'https://secure.hulu.com/account/cancel';
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
      var creditCard = await getCreditCard();
      
      await fill('#creditCard', creditCard.number);
      await fill('#expiry', creditCard.expiration);
      await fill('#cvc', creditCard.cvc);
      await fill('#zip', creditCard.zip);
      
      (await find('button[type="submit"]:contains("SUBMIT")')).click();
    }
    
    async accountCancel() {
      (await find('button:contains("Continue to Cancel")')).click();
      (await find('label[for="survey-other"]:contains("Other")')).click();
    }
  }
  
  let bot = new Bot();
  await bot.init();
  bot.run();
  
})();

//"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" --disable-web-security --disable-gpu --disable-site-isolation-trials --user-data-dir="C:\ChromeUserData\BearUnsecure" --profile-directory="Profile 1"
