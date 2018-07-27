var darkState = false;
var size = 16;
//aparentemente definir uma funcao e usar onclick na tag nao funciona
function darkmode(){
	if(!dark){
		document.body.style.background = "#333333"; 
	}
	else{
		document.body.style.background  =  "#FFFFFF";
	}
	dark = !dark;
}	

dark.onclick = function(element) {
	if(!darkState){
		document.body.style.background = "#333333"; 
	}
	else{
		document.body.style.background  =  "#FFFFFF";
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

function callback(tabs){
	//PEGA A PRIMEIRA POSICAO (QUE CONINCIDE COM A ABA ATUAL)
	var ct = tabs[0]
	//ENVIA UMA MENSAGEM PARA O CONTENT SCRIPT PASSANDO O ID DA ABA E O COMANDO PARA REQUISITAR O TEXTO DO ARTIGO
	browser.tabs.sendMessage(ct.id, {command: "getNYTArticle"})

	//document.getElementById("popup-content").innerText = ct.id;
}
//FAZ UMA QUERY PRA IDENTIFICAR A ABA (PARTE DO PROCESSO DE REQUISITAR O TEXTO AA O CONTENT SCRIPT)
//E DEPOIS CHAMA A FUNCAO CALLBACK
chrome.tabs.query({active: true, currentWindow: true}, callback);


browser.runtime.onMessage.addListener((message) => {
	if (message.command === "setNYTArticle"){
		content = document.getElementById("popup-content");
		content.innerText = "";
		var titulo = document.createElement("H1");
		var tituloTexto = document.createTextNode(message.title);
		titulo.appendChild(tituloTexto);
		content.appendChild(titulo);
		//content.appendChild(document.createElement("BR"))
		/*if (message.subtitle != ""){
			var subTitulo = document.createElement("P");
			var subTituloTexto = document.createTextNode(message.subtitle);
			titulo.appendChild(subTituloTexto);
			content.appendChild(subTitulo);
		}*/
 		//content.appendChild(document.createElement("BR"))
		for(var i = 0; i<message.content.length; i++){
			var paragrafo = document.createElement("P");
			var paragrafoTexto = document.createTextNode(message.content[i]);
			paragrafo.appendChild(paragrafoTexto);
			content.appendChild(paragrafo);
		}
		
	}
});

