"use strict";
let new_player;
window.onload = function () {
    class Player {
        constructor(firstName, lastName) {
            this.firstName = firstName;
            this.lastName = lastName;
            this.xGrid = 10;
            this.yGrid = 10;
            this.position = 2;
            this.playerName = firstName + ' ' + lastName;
        }
        keyCode(key) {
            var currentPos = this.position;
            if (key == 37 || key == 39 || key == 32) {
                if (key == 37 && currentPos > 0) { // move left
                    this.position--;
                    document.getElementById('col-' + currentPos).children[this.xGrid - 1].children[0].classList.remove("active"); // remove class active to plager
                    document.getElementById('col-' + this.position).children[this.xGrid - 1].children[0].classList.add("active"); // add class active to player
                }
                else if (key == 39 && currentPos < this.yGrid - 1) { // move right
                    this.position++;
                    document.getElementById('col-' + currentPos).children[this.xGrid - 1].children[0].classList.remove("active"); // remove class active to plager
                    document.getElementById('col-' + this.position).children[this.xGrid - 1].children[0].classList.add("active"); // add class active to player
                }
                else if (key == 32) { // attack
                    var tile = this.xGrid - 2;
                    var max_playground = this.xGrid - 2;
                    var interval = setInterval(function () {
                        if (tile < max_playground)
                            document.getElementById('col-' + currentPos).children[tile + 1].children[1].classList.remove("active");
                        document.getElementById('col-' + currentPos).children[tile].children[1].classList.add("active");
                        if (document.getElementById('col-' + currentPos).children[tile].children[0].className.indexOf("active") != -1) {
                            //Enemy detected, destroy enemy
                            document.getElementById('col-' + currentPos).children[tile].children[0].classList.remove("active");
                            document.getElementById('col-' + currentPos).children[tile].children[1].classList.add("impact");
                            setTimeout(function () {
                                document.getElementById('col-' + currentPos).children[tile + 1].children[1].classList.remove("impact");
                            }, 500);
                            //remove attack when colided with enemy
                            clearInterval(interval);
                            document.getElementById('col-' + currentPos).children[tile].children[1].classList.remove("active");
                        }
                        if (tile == 0) {
                            clearInterval(interval);
                            setTimeout(function () {
                                document.getElementById('col-' + currentPos).children[0].children[1].classList.remove("active");
                            }, 500);
                        }
                        else {
                            tile--;
                        }
                    }, 500);
                }
            }
        }
    }
    new_player = new Player("Jessie", "de Leon");
    //AI movements spawn
    setInterval(function () {
        var rand = Math.floor((Math.random() * 10) + 1);
        var test = rand - 1;
        document.getElementById('col-' + test).children[0].children[0].classList.add("active");
    }, 1000);
    // Speed of enemy going down
    setInterval(function () {
        var enemies = document.getElementsByClassName("enemy active");
        let temp_enemies = Object.assign({}, enemies);
        for (var num in temp_enemies) {
            if (num <= 8) {
                temp_enemies[num].classList.remove("active");
                if (temp_enemies[num].parentElement.nextElementSibling.children[0].className.indexOf("player") == -1)
                    temp_enemies[num].parentElement.nextElementSibling.children[0].classList.add("active");
            }
        }
    }, 2000);
};
document.addEventListener("keydown", function (event) {
    new_player.keyCode(event.keyCode);
});
