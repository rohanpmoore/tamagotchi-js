export class Tamagotchi {

  constructor(name) {
    this.name = name;
    this.hunger = 100;
    this.thirst = 100;
    this.boredom = 100;
    this.alerts = [];
  }

  setDecay() {
    setInterval(() => {
      this.hunger--;
      this.thirst--;
      this.boredom--;
      this.checkAlerts();
    }, 60000);
  }

  checkAlerts() {
    if(this.hunger <= 50 && !this.alerts.includes("FEED ME!")) {
      this.alerts.push("FEED ME!");
    } else if(this.hunger > 50 && this.alerts.includes("FEED ME!")) {
      this.alerts.splice(this.alerts.indexOf("FEED ME!"), 1);
    }
    if(this.thirst <= 50 && !this.alerts.includes("I'M THIRSTY!")) {
      this.alerts.push("I'M THIRSTY!");
    } else if(this.thirst > 50 && this.alerts.includes("I'M THIRSTY!")) {
      this.alerts.splice(this.alerts.indexOf("I'M THIRSTY!"), 1);
    }
    if(this.boredom <= 50 && !this.alerts.includes("I'M BORED!")) {
      this.alerts.push("I'M BORED!");
    } else if(this.boredom > 50 && this.alerts.includes("I'M BORED!")) {
      this.alerts.splice(this.alerts.indexOf("I'M BORED!"), 1);
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
