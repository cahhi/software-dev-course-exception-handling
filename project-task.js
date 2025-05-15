/*
Scenario:
You’ve been hired to help a local pet shelter digitize its animal adoption records. The program is meant to:
  
  Allow users to enter an animal type and adoption fee.
  
  Add the animal and fee to a list.
  
  Retrieve the adoption fee for a specific animal when requested.

However, the initial developer left the program in a buggy state, with missing exception-handling logic
and some errors in the implementation. Your job is to fix it!



Instructions
Start by Understanding the Errors:
Run the program and observe the exceptions that occur. Document what the exceptions are and where they happen.

Write Exception Handling Code:
Use try/catch blocks to handle the errors so the program doesn’t crash when incorrect input or unexpected situations occur.

Test and Debug:
Test the program with valid and invalid inputs to confirm that exceptions are handled gracefully
and the program continues running as intended.
*/


// Will need to import / install readline-sync if not done so already within project dir: npm install readline-sync 
const readlineSync = require('readline-sync');

// Initial Code with Bugs (modified to use readline-sync)
let dogs = [];
let cats = [];
let exoticAnimals =[];
let animals = [];
let fees = [];

/*try {
    function addAnimal(name, fee) {
        if (!name || fee <0) {
            throw new Error("Invalid animal name or adoption fee");
        }
        {animals.push(name)};
        fees.push(fee);
    }
} catch (err) {
    console.log("User entered invalid animal name or adoption fee. Will continue the program");
}*/


function addAnimal(name, type, fee) {
    try { //added a try block to test for invalid input
    if (!name || !type || fee < 0) {
        throw new Error("Invalid animal name or adoption fee!");
    }     
     }catch (err) { //added the catch block to catch the invalid inputs but keep going.
    console.log("User entered invalid animal name or adoption fee.");
    }
    //pushing each type of animal into an array so that it is accessible for later. 
    if (type === "dog") {
        dogs.push(name);
        animals.push(name);
        fees.push(fee);
    }else if (type === "cat") {
        cats.push(name);
        animals.push(name);
        fees.push(fee);
    }else {
        exoticAnimals.push(name);
        animals.push(name);
        fees.push(fee);
    }
} 

function getAdoptionFee(animalName) {
    let index = animals.indexOf(animalName);

    try { //added a try to account for user's entering in numbers that aren't valid
    if (index === -1) {
        throw new Error("Animal not found in records!");
    }
    return fees[index];
} catch(err) { //entered catch so that the program continues to run 
    console.log("User entered animal name not found in records!");
}
}

function viewAnimals(){ //added a function that pushes each animal into a specific array so that users can view the animal based on the type
    let userChoice = readlineSync.question("Would you like to view 'dogs', 'cats, or 'exotic animals': ").toLowerCase();
    if (userChoice === "dogs") {
        console.log(dogs);
    }else if (userChoice === "cats"){
        console.log(cats);
    }else {
        console.log(exoticAnimals);
    }
}
// Main program
console.log("Welcome to the Pet Shelter System");
while (true) {
    let action = readlineSync.question("Choose an action: 'add', 'fee', or 'view', 'exit': ").toLowerCase();
    if (action === "exit") {
        console.log("Goodbye!");
        break;
    }
    if (action === "add") {
        let animal = readlineSync.question("Enter the animal's name: ");
        let animalType = readlineSync.question("Enter the type of animal: ");
        let fee = Number(readlineSync.question("Enter the adoption fee: "));
        addAnimal(animal, animalType, fee);
        console.log(`${animal} added with a fee of $${fee}.`);
    } else if (action === "fee") {
        let animal = readlineSync.question("Enter the animal's name to find its adoption fee: ");
        console.log(`${animal}'s adoption fee is $${getAdoptionFee(animal)}.`);
    }else if (action === "view") {//added view so that users can view the animals that have been added 
       
        viewAnimals();
    } else {
        console.log("Invalid action. Please choose 'add', 'fee', or 'exit'.");
    }
}



/*
Problems to Solve

Invalid Input Errors:
  What happens if the user provides a negative adoption fee or leaves the name blank?

  If the user provides a negative adoption fee or leaves the name blank, a throw error occurs. This stops the whole program from running. Even if one is valid (animal name or adoption fee), then the throw error still occurs but the program exits out.

  What happens if the user tries to find the fee for an animal that hasn’t been added?

  I am given an error that states "Animal Not Found In Records" but the whole program stops running. 

Code Flow Problems:
  What happens if the program throws an exception? Does the rest of the code continue running?

  No, if the program encounters any errors, it is stopped and does not continue. The user must restart the whole program again manually. 

Structured Exception Handling:
  Add try/catch blocks to handle the above errors gracefully.
*/
