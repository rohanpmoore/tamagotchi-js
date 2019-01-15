const DEV = 1;
const messages = [];

export class Tamagotchi {
  constructor(name, color, difficulty) {
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
    }, 30000*this.difficulty/DEV);
    this.messagePicker = setInterval(() => {
      this.message = messages[Math.floor(Math.random()*messages.length)];
    }, 150000*this.difficulty/DEV);
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
      this.mood = "Desperate";
    } else if (lowest <= 25) {
      this.mood = "Angry";
    } else if (lowest <= 50) {
      this.mood = "Irritated";
    } else if (lowest <= 75) {
      this.mood = "Indifferent";
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

  // save() {
  //   const fs = require('fs');
  //   fs.writeFile("/tmp/test.txt", "Hey there!", function(err) {
  //     if(err) {
  //       return console.log(err);
  //     }
  //     console.log("The file was saved!");
  //   });
  // }
}
