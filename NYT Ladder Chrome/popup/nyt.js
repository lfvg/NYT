var darkState = false;
var size = 16;

dark.onclick = function(element) {
	if(!darkState){
		document.body.style.background = "#333333";
		var x = document.getElementById("popup-content");
		var y = x.getElementsByTagName("P");
		var i;
		for (i = 0; i < y.length; i++) {
			y[i].style.color = "#d9d9d9";
		}
		var h = x.getElementsByTagName("H1");
		h[0].style.color = "#d9d9d9"
	}
	else{
		document.body.style.background  =  "#FFFFFF";
		var x = document.getElementById("popup-content");
		var y = x.getElementsByTagName("P");
		var i;
		for (i = 0; i < y.length; i++) {
			y[i].style.color = "#000000";
		}
		var h = x.getElementsByTagName("H1");
		h[0].style.color = "#000000"
	}
	darkState = !darkState;
}	


zoommais.onclick = function(element){
	if(size<26){
		size += 2;
		var x = document.getElementById("popup-content");
		var y = x.getElementsByTagName("P");
		var i;
		for (i = 0; i < y.length; i++) {
			y[i].style.fontSize = size + "px";
		}
    }
	
}

zoommenos.onclick = function(element){
	if(size>16){
		size -= 2;
		var x = document.getElementById("popup-content");
		var y = x.getElementsByTagName("P");
		var i;
		for (i = 0; i < y.length; i++) {
			y[i].style.fontSize = size + "px";
		}
    }
}
//current not working
imprimir.onclick = function(element){
	window.print();
	
}

chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  chrome.tabs.sendMessage(tabs[0].id, {command: "getNYTArticle"})
});

chrome.runtime.onMessage.addListener((message) => {
	if (message.command === "setNYTArticle"){
		content = document.getElementById("popup-content");
		content.innerText = "";
		var titulo = document.createElement("H1");
		var tituloTexto = document.createTextNode(message.title);
		titulo.appendChild(tituloTexto);
		content.appendChild(titulo);
		var autores = document.createElement("P");
		var autoresTexto = document.createTextNode(message.autores);
		autores.appendChild(autoresTexto);
		content.appendChild(autores);
	
		for(var i = 0; i<(message.content.length); i++){
			var paragrafo = document.createElement("P");
			var paragrafoTexto = document.createTextNode(message.content[i]);
			paragrafo.appendChild(paragrafoTexto);
			paragrafo.style.width = "580px"
			content.appendChild(paragrafo);
		}
		
	}
});

