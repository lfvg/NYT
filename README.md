# NYT Ladder

Esse projeto é uma prova de conceito, criado com a intenção de mostrar como o paywall (por isso o nome 'Ladder', entendeu? wall, T.) implementado por alguns sites pode ser facilmente contornado.

Falhas de design  semelhantes podem ser encontradas nos sites dos jornais Estadão, Washington Post e San Francisco Chronicle.


### Instalação

Nas pastas 'Chrome' e 'Firefox' se encontram as extensões empacotadas para os respectivos navegadores nas várias versões.

**Firefox**

Basta arrastar o arquivo .xpi do diretório aonde ele foi baixado para dentro de qualquer aba em branco no navegador e confirmar a instalação.

**Chrome**

Infelizmente o Chrome não permite que extensões obtidas de fora da Chrome Web Store rodem no navegador, mas é possivel carregar a extensão descompactada a partir do código disponível na pasta 'NYT Ladder Chrome'.

Note que é preciso habilitar o modo desenvolvedor no Chrome para realizar essa ação. 

### Problemas conhecidos

O projeto foi desenvolvido inicialmente para Firefox portanto a maioria dos erros estarão na versão portada para Google Chrome.

**Firefox**

  - O botão de 'Darkmode' trava quando não há nenhum artigo carregado no popup
  - O subtítulo estava com o tamanho H1 independente do tamanho setado, por isso foi removido
  - O título se subseções da matéria não é exibido
  - Mudanças de configuração, como alterar o tamanho do texto e ativar/desativar o modo escuro, não estão sendo salvas
  
**Chrome**

Por ser um porte a versão para o Chrome se encontra atrás da versão desenvolvida para Firefox por tanto ela possui também todos os problemas listados acima. 

  - O botão de print não funciona
