import { Tamagotchi } from './../src/tamagotchi.js';

describe('A Tamagotchi', function() {
  let tamagotchi = null;

  beforeEach(function() {
    jasmine.clock().install();
    tamagotchi = new Tamagotchi("Test", "Blue", 2);
  });

  afterEach(function() {
    jasmine.clock().uninstall();
  });

  it('should create a new Tamagotchi for the user to engage with', function() {
    expect(tamagotchi.name).toEqual("Test");
    expect(tamagotchi.hunger).toBeDefined();
    expect(tamagotchi.thirst).toBeDefined();
    expect(tamagotchi.boredom).toBeDefined();
  });

  it('will have hunger, thirst, and boredom go down by one every second', function() {
    jasmine.clock().tick(180001);
    expect(tamagotchi.hunger).toEqual(97);
    expect(tamagotchi.thirst).toEqual(97);
    expect(tamagotchi.boredom).toEqual(97);
  });

  it('will have hunger, thirst, or boredom go up by a given ammount', function() {
    jasmine.clock().tick(1200001);
    tamagotchi.eatPizzaWhole();
    tamagotchi.drinkGlassOfWater();
    tamagotchi.playFetch();
    expect(tamagotchi.hunger).toEqual(100);
    expect(tamagotchi.thirst).toEqual(90);
    expect(tamagotchi.boredom).toEqual(100);
  });

  it('will have alerts when the tamagotchi gets hungry, thirsty, or bored', function() {
    jasmine.clock().tick(3000001);
    expect(tamagotchi.alerts).toEqual(["FEED ME!", "I'M THIRSTY!", "I'M BORED!"])
    tamagotchi.eatPizzaSlice();
    expect(tamagotchi.alerts).toEqual(["I'M THIRSTY!", "I'M BORED!"])
  });
});
