(function(){
	if (window.hasRun) {
		return;
	}
	window.hasRun = true;


	var paragrafos = document.getElementsByClassName("css-1i0edl6 e2kc3sl0");
	var artigo;
	if(paragrafos.length!=0){
		for (var i = 0; i < paragrafos.length; i++) {
		artigo += paragrafos[i].innerText + "\n";
	}
	else{
		artigo = "Não foi possivel ler o artigo.";
	}
	
	browser.runtime.onMessage.addListener((message) => {
		if (message.command === "getNYTArticle"){
			return artigo
		}
	}

})();
