var rand_id;
var pokemon_list = [],pokemon_list_index = 0;
function ask_for_random_id(){
	var Display = document.getElementById("pokemonDisplay");		       
	var request = new XMLHttpRequest();
	request.open('GET', 'https://flasktest23.herokuapp.com/login', true);	
	request.onload = function () {  	
//  	console.log(this.response);  		
	//Display.innerHTML = '';
  	Index = this.response;
  	var Resp = JSON.parse(this.response);
  	console.log(Resp);  	
  	Index = Resp;
  	pokemon_list.push(Resp);
  	++pokemon_list_index;
  	//Name = Resp.Name; 
  	Name = getNameFromIndex(Index);
    //var Url = "https://f002.backblazeb2.com/file/pokemon/PokemonSpritesFinal/1.png";
    var Url = name_to_image_link(Name);//getNameFromIndex(Index) + End;    
    //var Url = "F:\\Python27\\PokemonSprites\\charizard\\Normal\\1.png";
    console.log(Url);   
    var div = make_pokemon_card(Url,Name,pokemon_list_index);
    Display.appendChild(div);
	}
	request.send();	
	return this.response;
}
var PokemonNames = ["bulbasaur","ivysaur","venusaur","charmander","charmeleon","charizard","squirtle","wartortle","blastoise"];
var holdTimeout;
function hidePokemonInfo(){
	document.getElementById('pokemon-info').style.display = "none";		
	document.getElementById('black-back').style.display = "none";
}
function showPokemonInfo(id){
	PInfo = pokemon_list[id-1];
	var top  = window.pageYOffset || document.documentElement.scrollTop,
    left = window.pageXOffset || document.documentElement.scrollLeft;
    //console.log(top);
    //console.log(left);
    var width = screen.width,height = screen.height;
	//alert("Something is happening ..."+ width+" - "+height);	
	var back = document.getElementById('black-back');
	back.style.top = top;
	back.style.display = "block";
	var El = document.getElementById('pokemon-info');
	El.style.top = top;	
	document.getElementById('pokemon-color').style.background = "linear-gradient(#1B5E20, #388E3C, #4CAF50)";	
	document.getElementById('nickname').innerHTML = PInfo.Name;
	document.getElementById('name').innerHTML = PInfo.Name;
	document.getElementById('attack').innerHTML = "<img src = 'img/attack.png' style = 'height:20px;width:20px'> " + PInfo.Atk;
	document.getElementById('defense').innerHTML = "<img src = 'img/defense.png' style = 'height:20px;width:20px'> " + PInfo.Def;
	document.getElementById('SPattack').innerHTML = "<img src = 'img/attack.png' style = 'height:20px;width:20px'> " + PInfo.SpAtk;	
	document.getElementById('SPdefense').innerHTML = "<img src = 'img/defense.png' style = 'height:20px;width:20px'> " + PInfo.SpDef;
	document.getElementById('speed').innerHTML = "<img src = 'img/attack.png' style = 'height:20px;width:20px'> " + PInfo.Speed;
	document.getElementById('hp').innerHTML = "<img src = 'img/hp.png' style = 'height:20px;width:20px'> " + PInfo.HP;
	Link = name_to_image_link(PInfo.Name);
	document.getElementById('pokemon_image').src = Link;	
	MovesL = PInfo.Moves;
	if (MovesL.length>=1)
		document.getElementById('move_1').innerHTML = MovesL[0].Name;
	if (MovesL.length>=2)
		document.getElementById('move_2').innerHTML = MovesL[1].Name;
	if (MovesL.length>=3)
		document.getElementById('move_3').innerHTML = MovesL[2].Name;
	if (MovesL.length>=4)
		document.getElementById('move_4').innerHTML = MovesL[3].Name;		
	El.style.display = "block";
}
function name_to_image_link(Name){
	//var Base = "img/PokemonSpritesFinal/";
	var Base = "https://img.pokemondb.net/sprites/x-y/normal/"
	var End = ".png";
	var Url = Base + Name + End;
	return Url;
}
function releaseMouse(){
	clearTimeout(holdTimeout);
}
function holdMouse(){
	holdTimeout = setTimeout(showPopup,500);
}
function showPopup(){			
	alert("Mouse hold ...");	
}
function getNameFromIndex(index){
    return PokemonNames[index-1];	
}
function make_pokemon_card(Url,Name,index){

	var div = document.createElement("DIV");
	div.setAttribute('class', 'mdl-grid mdl-cell--2-col pokemon-card');
	div.setAttribute('style', 'max-width: 90px;');
	div.setAttribute('id', index);	
	div.setAttribute('onclick', 'showPokemonInfo(this.id)');
	div.setAttribute('ontouchstart', 'holdMouse()');	
	div.setAttribute('ontouchend', 'releaseMouse()');	

	// DIV 1
	var img = document.createElement("IMG");
	img.setAttribute('src', Url);
	img.setAttribute('alt', 'PokemonSprite');
	img.setAttribute('style', 'height:80px;width:80px;');
	var div1 = document.createElement("DIV");
	div1.setAttribute('class', 'mdl-cell--12-col');
	div1.setAttribute('style', 'width:100%;height:75%;text-align:center;');
	div1.appendChild(img);	

	// DIV 2
	var span = document.createElement("SPAN");
	var txt = document.createTextNode(Name);
	span.appendChild(txt);
	var div2 = document.createElement("DIV");
	div2.setAttribute('class', 'mdl-cell--12-col');
	div2.setAttribute('style', 'width:100%;text-align:center;');
	div2.appendChild(span);	
	
	// DIV 3
	var progress = document.createElement("DIV");
	progress.setAttribute('class', 'progress-bar-green');	
	progress.setAttribute('style', 'width:70%');
	var div3 = document.createElement("DIV");
	div3.setAttribute('class', 'mdl-cell--12-col progress');
	div3.setAttribute('style', 'width:100%;');
	div3.appendChild(progress);

	//DIV
	div.appendChild(div1);	
	div.appendChild(div2);	
	div.appendChild(div3);	
	return div;
}
function init(){
	document.getElementById("screen_dim").innerHTML = window.innerWidth + " X " + window.innerHeight;
	var Display = document.getElementById("pokemonDisplay");	
	var Base = "img/";
    var End = ".png";               
	for(let i=0;i<24;++i){
	ask_for_random_id();
	//Index = Math.floor((Math.random() * 9) + 1);
    //Name = getNameFromIndex(Index);
    //var Url = Base + getNameFromIndex(Index) + End;    
    //El.getElementsByTagName('img')[0].src = Url;
    //El.getElementsByTagName('span')[0].innerHTML = Name;
    //var div = make_pokemon_card(Url,Name)
    //Display.appendChild(div);
	}	
}
function getSpriteLink(El){        
    var Base = "img/";
    var End = ".png";    
    Index = Math.floor((Math.random() * 9) + 1);
    Name = getNameFromIndex(Index);
    var Url = Base + getNameFromIndex(Index) + End;    
    El.getElementsByTagName('img')[0].src = Url;
    El.getElementsByTagName('span')[0].innerHTML = Name;
}
function abc(){
    alert("a");
}