import $ from 'jquery';

export class Tamagotchi {
  constructor(name, color, difficulty, devspeed = 100) {
    this.devspeed = devspeed;
    this.name = name;
    this.hunger = 100;
    this.thirst = 100;
    this.boredom = 100;
    this.mood = "Happy";
    this.alerts = [];
    this.color = color;
    this.difficulty = 4-difficulty;
    this.message = "I really love being a program!"
    this.decay = setInterval(() => {
      this.hunger--;
      this.thirst--;
      this.boredom--;
      this.checkAlerts();
    }, 30000*this.difficulty/this.devspeed);
    this.messagePicker = setInterval(() => {
      this.message = this.messageList[Math.floor(Math.random()*this.messageList.length)];
    }, 150000/this.devspeed);
    this.messageList = ["Random Comment"]
  }

  checkAlerts() {
    this.checkMood();
    this.statusHelper(this.hunger, 50, "FEED ME!");
    this.statusHelper(this.thirst, 50, "I'M THIRSTY!");
    this.statusHelper(this.boredom, 50, "I'M BORED!");
  }

  statusHelper(variable, threshold, text) {
    if(variable <= threshold && !this.alerts.includes(text)) {
      this.alerts.push(text);
    } else if(variable > threshold && this.alerts.includes(text)) {
      this.alerts.splice(this.alerts.indexOf(text), 1);
    }
  }

  checkMood() {
    const lowest = Math.min(this.hunger, this.thirst, this.boredom);
    if(lowest <= 10) {
      this.mood = "Panic";
    } else if (lowest <= 25) {
      this.mood = "Rage";
    } else if (lowest <= 50) {
      this.mood = "Impatient";
    } else if (lowest <= 75) {
      this.mood = "OK";
    } else {
      this.mood = "Happy"
    }
  }



  feed(amount) {
    this.hunger = Math.min((this.hunger + amount), 100);
    this.checkAlerts();
  }

  drink(amount) {
    this.thirst = Math.min((this.thirst + amount), 100);
    this.checkAlerts();
  }

  recreation(amount) {
    this.boredom = Math.min((this.boredom + amount), 100);
    this.checkAlerts();
  }

  eatPizzaWhole() {
    this.feed(100);
  }
  eatBanana() {
    this.feed(5);
  }
  eatPizzaSlice() {
    this.feed(10);
  }
  eatMnM() {
    this.feed(1);
  }
  drinkGlassOfWater() {
    this.drink(10);
  }
  playFetch() {
    this.recreation(20);
  }

  end() {
    clearInterval(this.decay);
    clearInterval(this.messagePicker);
  }

  getMoodGif(mood) {
    return new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      let url = `http://api.giphy.com/v1/gifs/search?q=${mood}&api_key=E0NfURlddZ2EKmbKrAcxyAMOrFvYsSb9&limit=5`
      request.onload = function() {
        if(this.status === 200) {
          resolve(request.response);
        } else {
          reject(Error(request.statusText));
        }
      }
      request.open("GET", url, true);
      request.send();
    });
  }
}
