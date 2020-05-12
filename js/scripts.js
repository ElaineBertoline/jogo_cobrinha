let canvas = document.getElementById("snake");
// contexto renderiza  o desenho que vai ser feito dentro do canvas 
let context = canvas.getContext("2d");
//tratará o arquivo com um plano 2d
let box = 32;
//32 pixels  cada quadradinho 
let snake = [];
        snake[0] = {
        x: 8 * box,
        y: 8 * box
        }
        //damos o tamanho 
    //variavel para executar os movimentos da cobrinha
    let direction = "right";
        //direção da cobrinha 
        let food = {
            //elemento para a funcao drowFood
            //para que a comidinha apareça em varios lugares diferentes vamos usar 2 métodos que fazem na criacao de numeros aleatorios 
            x: Math.floor(Math.random() * 15 + 1) * box,
            y: Math.floor(Math.random() * 15 + 1) * box
            /* math.floor retira a parte flutuante do math.randow 
            o math.randow retorna sempre um numero aleatorio ate 1
            floor retira a parte flutuante 0,1 até o tamanho setado que no nosso caso é o 16 
            */
        }

//desenha e define a cor 
    function criarBG(){
        // fillStyle --> estilo - definimos uma cor para o context
        context.fillStyle = "lightgreen";
        context.fillRect(0, 0, 16 * box, 16 * box);
    }
    //fillRect --> deenha nosso retangulo, ou seja a area que será definido o jogo 
    //4 parâmetros --> posicao x y, altura e largura  
    //altura e largura de 16 px 

    
    function CriarCobrinha(){
        for(i=0; i < snake.length; i++){
            context.fillStyle = "green";
            context.fillRect(snake[i].x, snake[i].y, box, box);
        //tamanho x e y da variavel box  
        //contexto ligado ä cobrinha 

        }

    }

    //funçao para desenhar a comidinha
    function drawFood(){
        context.fillStyle = "red";
        // cor da comidinha
        context.fillRect(food.x, food.y, box, box);
        //vamos criar um novo elemento que será um array 

  }
//vamos criar um evento se escopo, vamos passar todos os parametros nesse evento
    document.addEventListener('keydown', update);
//pegara o keydown - evento de clique e chama a funcao update 

function update (event){
    //se o numero do codigo for 37 que é o da direita ele vai fazer com que a cobrinha vá para a direita, se for 38 vai para baixo 
    //39 esquerda e 40 para cima 
    if(event.KeyCode == 37 && direction != "right") direction = "left";
    //a direcao não pode ser oposta da direcao que estamos setando, pois se colocarmos para traz ela bugará porque só tem uma cabeca 
    if(event.KeyCode == 38 && direction != "down") direction = "up";
    if(event.KeyCode == 39 && direction != "left") direction = "right";
    if(event.KeyCode == 40 && direction != "up") direction = "down";
}
    // só muda se a direçao anterior nao for o contrário 
    //voce aperta uma tecla o addEventListener chama a update e passa como argumento o evento de tecla, 37, 38, 39, 40 


    //funcao para atiualizar o jogo de tempos em tempos para que ela consiga se mexer no intervalo e para a funcao quando a cobrinha encostar no corpo dela 

    function iniciarJogo(){
        //colocamos todas as variaveis que devem ser iniciadas dentro da função
        if(snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
        if(snake[0].x < 0 &&  direction == "left") snake[0].x = 16 * box;
        if(snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
        if(snake[0].y < 0 && direction == "up") snake[0].y = 16 * box;
      
        criarBG();
        CriarCobrinha();
        drawFood();
        //Após criar a funcao preisamos chamá-la no inicio do jogo 

        //devemos criar a posiçao da cobrinha x e y para o ponto de partida 
        let snakeX = snake[0].x;
        let snakeY = snake[0].y;

         if(direction == "right") snakeX += box; 
         //se a direcao for = a posicao do snakex ( right) adiciona um box a mais 
         if(direction == "left") snakeX -= box; 
         // ponto cartesiano - direita aumenta, esquerda diminui, por isso vamos decrementar -=
        if(direction == "up") snakeY -= box;
        if(direction == "down") snakeY += box;

        //caso a posiçao snake x seja diferente dA food x e a posicao snakey seja diferente da food y, senao continua aumentando e usamos a funcao mat.floor 
        if(snakeX != food.x && snakeY != food.y){
            snake.pop(); 
             //pop - retira o ultimo elemento do nosso array 
        } 
        else{
            food.x = Math.floor(Math.random() * 15 + 1) * box;
            food.y = Math.floor(Math.random() * 15 + 1) * box;
        }
     
          //temos o movimento mas nao temos a cabeca da cobrinha
        //vamos criar uma nova cabeca com o unshiftmetodo que acrescentra uma no primeiro movimentoi, ou seja , a frente 

        let newHead = {
            x: snakeX,
            y: snakeY
        }

        
        snake.unshift(newHead);

//até essa etapoa nao funciona porque é preciso fazer que a cabeca u;ltrapasse a tela e passe para o outro lado 
    }

    let jogo = setInterval(iniciarJogo, 100);
    //passo um intwrvalo de 100ms e a cada 100ms ela reinicia o jogo sem travar 

//mexeremos com os controles para que ela nao desapareça na tela 
//para que ande na direcao solicitada o jogo precisa captar o toque no botão e trasmita o toque naquela tela para a funcao 

//para que a comidinha aumente de tamanho precisamoa checar as coordenadas e fazer com que ela acrescente e deixe de decrementar caso isso ocorra 

