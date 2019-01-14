
import './styles.css';
import { Tamagotchi } from './tamagotchi.js';
import $ from 'jquery';

$(document).ready(function(){
  let tamagotchi = null;
  const DEV = 100;
  $("#new").click(function() {
    $("#main-menu").hide();
    $("#create").show();
    $("#error").hide();
  });
  $("#create-form").submit(function(event) {
    event.preventDefault();
    const difficulty = parseInt($("#difficulty").val());
    if(difficulty < 4 && difficulty > 0) {
      tamagotchi = new Tamagotchi($("#name").val(), $("#color").val(),parseInt($("#difficulty").val()));
      $("#create-form").hide();
      $("#title").show();
      $("#title").prepend(`<li>Difficulty: ${4-tamagotchi.difficulty}</li><br>`);
      $("#title").prepend(`<li>Color: ${tamagotchi.color}</li><br>`);
      $("#title").prepend(`<li>Name: ${tamagotchi.name}</li><br>`);
      $("#error").hide();
      update();
      const updateDisplay = setInterval(() => {
        update();
        if(tamagotchi.hunger === 0 || tamagotchi.thirst === 0) {
          clearInterval(updateDisplay);
          tamagotchi.end();
          $("#end").text(`${tamagotchi.name} has died from neglect!`)
        } else if(tamagotchi.boredom === 0) {
          clearInterval(updateDisplay);
          tamagotchi.end();
          $("#end").text(`${tamagotchi.name} has run away out of boredom!`)
        }
      }, 30000 * tamagotchi.difficulty/DEV)
      $("#stop").click(()=> {
        clearInterval(updateDisplay);
        tamagotchi.end();
      });
    } else {
      $("#error").text("Please input a difficulty from one to three.");
      $("#error").show();
    }
  });
  $("#update").click(function() {
    update();
  });
  function update(){
    $("#status-hunger").text(`Hunger: ${tamagotchi.hunger}`);
    $("#status-thirst").text(`Thirst: ${tamagotchi.thirst}`);
    $("#status-boredom").text(`Boredom: ${tamagotchi.boredom}`);
    let alerts = ``;
    tamagotchi.alerts.forEach(function(alert) {
      alerts += `${alert}<br>`
    });
    $("#status-alerts").html(`${alerts}`);
  }
  $('#pizza-slice').click(function(){
    if(checkGameOn()) {
      tamagotchi.eatPizzaSlice();
      update();
    }
  })
  $('#pizza-whole').click(function(){
    if(checkGameOn()) {
      tamagotchi.eatPizzaWhole();
      update();
    }
  })
  $('#play-fetch').click(function(){
    if(checkGameOn()) {
      tamagotchi.playFetch();
      update();
    }
  })
  $('#water').click(function(){
    if(checkGameOn()) {
      tamagotchi.drinkGlassOfWater();
      update();
    }
  })
  function checkGameOn() {
    return !(tamagotchi.hunger === 0 || tamagotchi.thirst === 0 || tamagotchi.boredom === 0)
  }
})
