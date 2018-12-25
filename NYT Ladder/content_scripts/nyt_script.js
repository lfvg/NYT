//ADICIONA UM LISSENER PARA RECEBER MENSAGENS DO POPUP
browser.runtime.onMessage.addListener((message) => {
	//DECLARAÇÃO DE VARIAVEIS QUE VAO SALVAR O TITULO(STRING), SUBTITULO(STRING) - SE EXISTIR
	//E O CORPO DO ARTIGO(STRING[])
	var titulo = "Não foi possivel ler o artigo";
	//TODAS AS MATERIAS TEM TITULO, POREM NEM TODAS POSSUEM SUBTITULO, POR ISSO O SUBTITULO E INICIALIZADO COM STRING VAZIA
	var subtitulo = "";
	var artigo = [];
	var autoresTexto = "";
	//SE A MENSAGEM RECEBIDA FOR UM REQUISICAO DE ARTIDO DO NYT IEE (getNYTArticle)
	//PROCEDE PARA O SEGUINTE , CASO NAO IGNORA 
	if (message.command === "getNYTArticle"){
		//PROCURA AS TAGS PELO SUA CLASSNAME - LEMBRANDO QUE TITULO PODE SER VAZIO
		var paragrafos = document.getElementsByClassName("css-1xl4flh e2kc3sl0");
		var tempTitle = document.getElementsByClassName("balancedHeadline");
		var tempSubTitle = document.getElementsByClassName("css-p2vh5c ewc5vgb0");
		var autores = document.getElementsByClassName("css-1cbhw1y e1x1pwtg1");
		//DE MODO A EVITAR UM NULL POINT VERIFICASSE PRIMEIRO SE OS ELEMENTOS NAO SAO VAZIOS
		if (tempTitle.length!=0) titulo = tempTitle[0].innerText;
		if(tempSubTitle.length != 0) subtitulo = tempSubTitle[0].innerText;
		//MUDANDO A FORMA DE PEGAR O ARTIGO
		/*if(paragrafos.length!=0){
			for (var i = 0; i < paragrafos.length; i++) {
				artigo.push(paragrafos[i].innerText);
			}
		}*/
		if(autores.length!=0){
			
				autoresTexto += autores[0].innerText;
				
			
		}
		//TALVEZ USAR SELECT BY TAG PRA PEGAR O ARTICLEBODY E A PARTIR DELE USAR
		//QUERYSELECTORALL PARA PEGAR OS P E FIGURE
		//esse select funciona :)
		var articleBody = document.querySelector("section[name=articleBody]");
		var ps = articleBody.querySelectorAll("p");
		var articleContent = articleBody.querySelectorAll("p, figure")
		var teste = "Teste\n";
		//element.getAttribute
		alert(articleContent.length);
		for(var i = 0; i<articleContent.length; i++){
			if(articleContent[i].nodeName ==="P"){
				artigo.push(articleContent[i].innerText);
				teste += articleContent[i].innerText + "\n";
			}else if(articleContent[i].nodeName ==="FIGURE"){
				teste += "---------IMAGEM---------\n";
				teste += "---------IMAGEM---------\n";
				artigo.push("nextIsImage");
				var im = articleContent[i].querySelector("img");
				//length nao funciona com querySelector
				if(im != null){
					
					artigo.push(im.getAttribute("src");
					teste += "---------POSSUI IMG----------\n";
					teste += im.getAttribute("src") + "\n";
				}
				else{
					artigo.push(articleContent[i].getAttribute("itemid"));
				}
			}
		}
		alert(teste);
		//RESPONDE AO POPUP COM O TITULO, SUBTITULO E CORPO DO ARTIGO
		browser.runtime.sendMessage({command: "setNYTArticle", content: artigo, title: titulo, subtitle: subtitulo, autores: autoresTexto});
	}
});


