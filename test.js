const myObj = {
  name: "Chetan",
  lastname: "Patil"
}

const temoOne = myObj;
temoOne.name = "Navin"
console.log(temoOne, "Modified")
console.log(myObj, "Orignal")
console.log(temoOne === myObj);
console.log([] === []);
