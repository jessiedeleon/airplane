"use strict";
let new_player;
let startPlay;
window.onload = function () {
    class PlaySettings {
        playSettings(element_id, tile, index, action, classname) {
            if (action == "add") {
                document.getElementById(element_id).children[tile].children[index].classList.add(classname);
            }
            else if (action == "remove") {
                document.getElementById(element_id).children[tile].children[index].classList.remove(classname);
            }
        }
        playSound(audioId) {
            let audioPlayer = document.getElementById(audioId);
            audioPlayer.load();
            audioPlayer.play();
        }
        spawnEnemy() {
            setInterval(function () {
                var rand = Math.floor((Math.random() * 10) + 1);
                var column = rand - 1;
                var playS = new PlaySettings();
                playS.playSettings("col-" + column, 0, 0, "add", "active");
            }, 1000);
        }
        enemyAttack() {
            setInterval(function () {
                var enemies = document.getElementsByClassName("enemy active");
                let temp_enemies = Object.assign({}, enemies);
                var num;
                for (num in temp_enemies) {
                    if (num <= 8) {
                        temp_enemies[num].classList.remove("active");
                        if (temp_enemies[num].parentElement.nextElementSibling.children[0].className.indexOf("player") == -1)
                            temp_enemies[num].parentElement.nextElementSibling.children[0].classList.add("active");
                    }
                }
            }, 2000);
        }
    }
    class Player extends PlaySettings {
        constructor() {
            super(...arguments);
            this.xGrid = 10;
            this.yGrid = 10;
            this.position = 2;
        }
        keyCode(key) {
            var currentPos = this.position;
            var column = "col-";
            if (key == 37 || key == 39 || key == 32) {
                if (key == 37 && currentPos > 0) { // move left
                    this.position--;
                    this.playSettings(column + currentPos, this.xGrid - 1, 0, "remove", "active"); // remove class active to plager
                    this.playSettings(column + this.position, this.xGrid - 1, 0, "add", "active"); // add class active to player
                }
                else if (key == 39 && currentPos < this.yGrid - 1) { // move right
                    this.position++;
                    this.playSettings(column + currentPos, this.xGrid - 1, 0, "remove", "active"); // remove class active to plager
                    this.playSettings(column + this.position, this.xGrid - 1, 0, "add", "active"); // add class active to player
                }
                else if (key == 32) { // attack
                    this.playSound("audio_attack");
                    var tile = this.xGrid - 2;
                    var max_playground = this.xGrid - 2;
                    // variable for setinterval to use
                    let playS = this.playSettings;
                    let playSound = this.playSound;
                    var interval = setInterval(function () {
                        if (tile < max_playground) {
                            playS(column + currentPos, tile + 1, 1, "remove", "active");
                        }
                        playS(column + currentPos, tile, 1, "add", "active");
                        if (document.getElementById('col-' + currentPos).children[tile].children[0].className.indexOf("active") != -1) {
                            //Enemy detected, destroy enemy
                            playS(column + currentPos, tile, 0, "remove", "active");
                            playS(column + currentPos, tile, 1, "add", "impact");
                            setTimeout(function () {
                                playS(column + currentPos, tile + 1, 1, "remove", "impact");
                            }, 500);
                            //remove attack when colided with enemy
                            clearInterval(interval);
                            playS(column + currentPos, tile, 1, "remove", "active");
                            playSound("audio_explosion");
                        }
                        if (tile == 0) {
                            clearInterval(interval);
                            setTimeout(function () {
                                playS(column + currentPos, 0, 1, "remove", "active");
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
    // Start Game
    new_player = new Player();
    startPlay = new PlaySettings();
    // Start AI movements
    startPlay.spawnEnemy();
    startPlay.enemyAttack();
    //Start Sounds
    setTimeout(function () {
        startPlay.playSound("audio_bg");
    }, 500);
};
document.addEventListener("keydown", function (event) {
    new_player.keyCode(event.keyCode);
});
