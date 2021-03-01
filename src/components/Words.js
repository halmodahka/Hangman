var dc_characters = [
  "superman",
  "batman",
  "wonder woman",
  "the flash",
  "green arrow",
  // "martian manhunter",
  // "green lantern",
  // "aquaman",
  // "lex luthor",
  // "the joker",
  // "harley quinn",
  // "black canary",
  // "batwoman",
  // "green arrow",
  // "gorilla grodd",
  // "deathstroke",
];

function randomWord() {
  return dc_characters[Math.floor(Math.random() * dc_characters.length)];
}

export { randomWord };
