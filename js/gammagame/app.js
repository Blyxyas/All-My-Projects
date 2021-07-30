//****************************************************************************************************************************************
/*
^
^ Copyright 2021 Blyxyas, github.com/Blyxyas. If you want to use this code, you must leave this (current) line intact and legible.
^ I don't think you're gonna use this code, but I'll leave it in here anyway.
! IMPORTANT ¡ ↓
^ Btw this is in work in progress, so don't expect it to work.
^
*/
//****************************************************************************************************************************************

// * Auxiliar variables and things:
// ! IMPORTANT →→→→→→→→→ :  Recommended: To visualize better this code use the "Colorful Comments" extension in VS Code.

// Import readline and fs modules.
fs = require("fs");
rl = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Import the save file, if it exists, else, create a file named "savestate" and start the game.
savestate = require("./savestate.json");
// And import another data module to handle the game's auxiliar variables, commands, etc....
data = require("./data.json");
// Create all the variables and objects that will be used in the game:

let money = 123;
let inventory = data.inventory;
// ^ display inventory function
function displayInventory() {
  console.log("Inventory:" + inventory.toString().replace(",", "\n"));
}
let boughItems = data.boughItems;

// **********************
// TODO: SAVE FUNCTION ↓↓
// **********************

function save() {
  if (fs.existsSync("./savestate.json")) {
    console.log("savestate file detected in the current directory");
    // TODO: SAVE FUNCTION
  } else {
    console.log(
      "savestate file not detected in the current directory, creating a new one"
    );
    fs.writeFileSync("./savestate.json", JSON.stringify(savestate));
  }
}
/* 
* *******************************************
 ^ MAIN GAME
* *******************************************

* **********************
 ~ Commands:
* **********************
 ~   help - Shows the list of commands.
 ~   save - Saves the game state.
 ~   exit / quit - quits the game (and saves the game state.)
 ~   inv - Shows the inventory.
 ~   stats - Shows the player's stats.
 ~   shop - Displays the shop.
 */

// TODO: more commands, maybe?
// **********************

rl.on("line", (line) => {
    // * Some global stuff:
    if (line === "save") {
      save();
    }
    if (line === "inv") {
      console.log(displayInventory());
    }
    if (line === "exit" || line === "quit") {
      console.log(
        "Goodbye! (All your progress were saved to 'savestate.json')"
      );
      process.exit();
    }
    if (line === "help") {
      console.log(data.help);
    }

    // ******************************************
    // ^ The actual mechanics:
    // ******************************************

    // *   If the player has enough money, he can buy an item.

    if (line === "shop") {
      console.log(data.shopLine);
      rl.on("line", (line) => {
        if (money >= data.prices[line - 1]) {
          money -= data.prices[line - 1];
          console.log(`Bought\nMoney remaining: ${money}`);
        } else {
          console.log(`Not enough money to buy that item (Money = ${money})`);
        }
      });
    }

    // ************** End of: [if statement = command] **************
  }
);