let new_player: any;

window.onload = function(){

	class Player {
		playerName: string;
		constructor(public firstName: string, public lastName: string){
			this.playerName = firstName  + ' ' + lastName;
		}
		xGrid: number = 10;
		yGrid: number = 10;
		position: number = 2;
		keyCode(key: any){
			var currentPos = this.position;
			if(key == 37 || key == 39 || key == 32)
			{
				if(key == 37 && currentPos > 0){ // move left
					this.position--;
					document.getElementById('col-'+ currentPos).children[this.xGrid - 1].children[0].classList.remove("active"); // remove class active to plager
					document.getElementById('col-'+this.position).children[this.xGrid - 1].children[0].classList.add("active"); // add class active to player
				}else if(key == 39 && currentPos < this.yGrid - 1){ // move right
					this.position++;
					document.getElementById('col-'+currentPos).children[this.xGrid - 1].children[0].classList.remove("active"); // remove class active to plager
					document.getElementById('col-'+this.position).children[this.xGrid - 1].children[0].classList.add("active"); // add class active to player
				}else if(key == 32){ // attack
					var tile : number = this.xGrid - 2;
					var max_playground : number = this.xGrid - 2;

					var interval: any = setInterval(function(){ 
						if(tile < max_playground)
							document.getElementById('col-'+currentPos).children[tile+1].children[1].classList.remove("active");

						document.getElementById('col-'+currentPos).children[tile].children[1].classList.add("active");
						
						if(document.getElementById('col-'+currentPos).children[tile].children[0].className.indexOf("active") != -1){
							//Enemy detected, destroy enemy
							document.getElementById('col-'+currentPos).children[tile].children[0].classList.remove("active");
							document.getElementById('col-'+currentPos).children[tile].children[1].classList.add("impact");

							setTimeout(function(){
								document.getElementById('col-'+currentPos).children[tile + 1].children[1].classList.remove("impact");
							},500);

							//remove attack when colided with enemy
							clearInterval(interval);
							document.getElementById('col-'+currentPos).children[tile].children[1].classList.remove("active");
						}
						
						if(tile == 0){
							clearInterval(interval);
							setTimeout(function(){
								document.getElementById('col-'+currentPos).children[0].children[1].classList.remove("active");
							},500);
						}
						else{
							tile--;
						}
					}, 500);
				}
			}
		}
	}

	new_player = new Player("Jessie", "de Leon");

	//AI movements spawn
	setInterval(function(){ 
		var rand: number = Math.floor((Math.random() * 10) + 1);
		var	test: number = rand -1;
		document.getElementById('col-'+test).children[0].children[0].classList.add("active");
	}, 1000);

	// Speed of enemy going down
	setInterval(function(){ 
		var enemies = document.getElementsByClassName("enemy active");
		let temp_enemies = Object.assign({}, enemies);

		for (var num in temp_enemies) {

			if(num <= 8)
			{
				temp_enemies[num].classList.remove("active")

				if(temp_enemies[num].parentElement.nextElementSibling.children[0].className.indexOf("player") == -1)
					temp_enemies[num].parentElement.nextElementSibling.children[0].classList.add("active")
			}
		}
	}, 2000);
}

document.addEventListener("keydown", function(event){
	new_player.keyCode(event.keyCode);
});
