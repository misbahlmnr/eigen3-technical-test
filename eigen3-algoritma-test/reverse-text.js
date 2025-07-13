const input = "NEGIE1";

const letters = input.match(/[A-Za-z]/g);
const numbers = input.match(/[0-9]/g);

const result = letters.reverse().join("") + numbers.join("");

console.log(result);
