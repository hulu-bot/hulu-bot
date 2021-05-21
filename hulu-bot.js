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
      (await find('#email'))[0].focus();
      
      /*
      //var fireOnThis = (await find('#email'))[0];
      
      //$('#email').val('derp@gmail.com');
      var fireOnThis = $('#email')[0];
      
      var keyboardEvent = document.createEvent('KeyboardEvent');
      var initMethod = typeof keyboardEvent.initKeyboardEvent !== 'undefined' ? 'initKeyboardEvent' : 'initKeyEvent';

      keyboardEvent[initMethod](
        'keydown', // event type: keydown, keyup, keypress
        true, // bubbles
        true, // cancelable
        window, // view: should be window
        false, // ctrlKey
        false, // altKey
        false, // shiftKey
        false, // metaKey
        65, // keyCode: unsigned long - the virtual key code, else 0
        0, // charCode: unsigned long - the Unicode character associated with the depressed key, else 0
      );
      fireOnThis.dispatchEvent(keyboardEvent);
      */
      /*
      var evObj;
      if( window.KeyEvent ) {
        evObj = document.createEvent('KeyEvents');
        evObj.initKeyEvent( 'keyup', true, true, window, false, false, false, false, 45, 0 );
      } else {
        evObj = document.createEvent('UIEvents');
        evObj.initUIEvent( 'keyup', true, true, window, 1 );
        evObj.keyCode = 45;
      }
      fireOnThis.dispatchEvent(evObj);
      */
      
      //(await find('#email')).sendkeys('A');
      //(await find('#email')).val('derp@gmail.com');
      //(await find('#password')).trigger(jQuery.Event('keypress', { keycode: 13 }));
      //(await find('#password')).val('derp');
    }
  }
  
  let bot = new Bot();
  await bot.init();
  bot.run();
  
})();

//"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" --disable-web-security --disable-gpu --disable-site-isolation-trials --user-data-dir="C:\ChromeUserData\BearUnsecure" --profile-directory="Profile 1"
