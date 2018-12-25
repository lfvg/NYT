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
imprimir.onclick = function(element){
	window.print();
	
}
function callback(tabs){
	//PEGA A PRIMEIRA POSICAO (QUE CONINCIDE COM A ABA ATUAL)
	var ct = tabs[0]
	//ENVIA UMA MENSAGEM PARA O CONTENT SCRIPT PASSANDO O ID DA ABA E O COMANDO PARA REQUISITAR O TEXTO DO ARTIGO
	browser.tabs.sendMessage(ct.id, {command: "getNYTArticle"})

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
		var autores = document.createElement("P");
		var autoresTexto = document.createTextNode(message.autores);
		autores.appendChild(autoresTexto);
		content.appendChild(autores);
		var isImage = false;
	
		for(var i = 0; i<(message.content.length); i++){
			if(isImage){
				var imagem = document.createElement("IMG");
				imagem.setAttribute("src", message.content[i]);
				content.appendChild(imagem);
				isImage = !isImage;
			}
			else{
				if(message.content[i] == "nextIsImage"){
					isImage = !isImage;
				}else{
					var paragrafo = document.createElement("P");
					var paragrafoTexto = document.createTextNode(message.content[i]);
					paragrafo.appendChild(paragrafoTexto);
					paragrafo.style.width = "580px"
					content.appendChild(paragrafo);
				}
			}
		}
		
	}
});

