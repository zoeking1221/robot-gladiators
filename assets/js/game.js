var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

var enemyNames = ["Roborto", "Amy Android", "Robo Trumple"];
var enemyHealth = 50;
var enemyAttack = 12;

// Game States
// "WIN" - Player robot has defeated all enemy-robots
//      * Fight all enemy-robots
//      * Defeat each enemy-robot
// "LOSE" - Player robot's health is zero or less

var fight = function(enemyName) {
    
    // repeat and execute as long as the enemy-robot is alive
    while(enemyHealth > 0 && playerHealth > 0) {

        var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");
            
            // is player picks "skip" confirm and then stop the loop
            if (promptFight === "skip" || promptFight === "SKIP") {
                // confirm player wants to skip
                var confirmSkip = window.confirm("Are you sure you'd like to quit?");

                //if yes (true), leave fight
                if (confirmSkip) {
                    window.alert(playerName + " has decided to skip this fight. Goodbye!");
                    // subtract money from playerMoney for skipping
                    playerMoney = Math.max(0, playerMoney - 10);
                    console.log("playerMoney", playerMoney);
                    break;
                }
            }

        // if player choses to fight, then fight
        if (promptFight === "fight" || promptFight === "FIGHT") {


            // remove enemy's health by subtracting the amount set in the playerAttack variable
            // generate random damage value based on player's attack power
            var damage = randomNumber(playerAttack - 3, playerAttack);
            enemyHealth = Math.max(0, enemyHealth - damage);
            console.log(
            playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining."
        );
  
            // check enemy's health
            if (enemyHealth <= 0) {
                window.alert(enemyName + " has died!");

            // award player money for winning
            playerMoney = playerMoney + 20;

            // leave while() loop since enemy is dead
            break;
            } else {
                window.alert(enemyName + " still has " + enemyHealth + " health left.");
            }
  
            // remove player's health by subtracting the amount set in the enemyAttack variable
            // generate random damage value based on enemy's attack power
            var damage = randomNumber(enemyAttack - 3, enemyAttack);
            playerHealth = Math.max(0, playerHealth - damage);
            console.log(
            enemyName + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + " health remaining."
            );
  
            // check player's health
            if (playerHealth <= 0) {
                window.alert(playerName + " has died!");
                // leave while() loop if player is dead
                break;
                } else {
                    window.alert(playerName + " still has " + playerHealth + " health left.");
                }
            }
    
        } 
    };   
              

var startGame = function() {
    // reset player stats
    playerHeath = 100;
    playerAttack = 10;
    playerMoney = 10;

    for(var i = 0; i < enemyNames.length; i++) {
        if(playerHealth > 0) {
            window.alert("Welcome to Robot Gladiators! Round " + ( i + 1 ));
            
            var pickedEnemyName = enemyNames[i];
            enemyHealth = randomNumber(40, 60);
            fight(pickedEnemyName);

            //  if we're not at the last enemy in the array
            if (playerHealth > 0 && i < enemyNames.length - 1) {
                // ask if player wants to use the store before next round
                var storeConfirm = window.confirm("The fight is over, visit the store before next round?");
                
                // if yes, take them to the store() function

                if (storeConfirm) {
                    shop();
                }
            }
        }
        else {
            window.alert("You have lot your robot in battle! Game Over!");
            break;
        }
    }
    // after the loop ends, player is either out of health or enemies to fight, so fun the endGame function
    endGame();
};

// function to end the entire game
var endGame = function () {
    // if player is still alive, player wins!
    if(playerHealth > 0) {
        window.alert("Great job, you've survived the game! You now have a score of " + playerMoney + ".");
    }
    else {
        window.alert("You've lost your robot in battle.");
    }
    var playAgainConfirm = window.confirm("Would you like to play again?");
    if(playAgainConfirm) {
        // restart the game
        startGame();
    }
    else {
        window.alert("Thank you for playing Robot Gladiators! Come back soon!");
    }
}

// shop function
var shop = function() {
    // ask player what they'd like to do
    var shopOptionPrompt = window.prompt(
        "Would you like to REFILL your health, UPGRATE your attack, or LEAVE the store? Please enter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice."
        );
    switch (shopOptionPrompt) {
        case "REFILL":
        case "refill":
            if (playerMoney >= 7) {
                window.alert("Refilling player's health by 20 for 7 dollars.");
                playerHealth = playerHealth + 20;
                playerMoney = playerMoney - 7;
            }
            else {
                window.alert("You don't have enough money!");
            }
            break;
        
        case "UPGRADE":
        case "upgrade":
            if (playerMoney >= 7) {
                window.alert("Upgrading player's attack by 6 for 7 dollars.");
                // increase attack and decrease money
                playerAttack = playerAttack + 6;
                playerMoney = playerMoney - 7;
            }
            else {
                window.alert("You don't have enough money!");
            }
            break;
        
        case "LEAVE":
        case "leave":
            window.alert("Leaving the store.");

            // do nothing, so function will end
            break;
            default: 
                window.alert("You did not pick a valid option. Try again.");

                // call shop() again to force a player to pick a valid option
                shop();
                break;
    }
};


// function to generate a random numeric value 
var randomNumber = function(min, max) {
    var value = Math.floor(Math.random() * (max - min + 1) + min);
    return value;
};

// start the game when the page lads
startGame();

