function start() { // inicio start()
    $('#inicio').hide();
    $('#fundoGame').append('<div id="jogador" class="anima1"></div>');
    $('#fundoGame').append('<div id="inimigo1"></div>');
    $('#fundoGame').append('<div id="inimigo2"></div>');
    $('#fundoGame').append('<div id="amigo" class="anima3"></div>');
    $('#fundoGame').append('<div id="placar"></div>');
    $('#fundoGame').append('<div id="energia"></div>');
    $("#fim").html("<h1> Game Over </h1><p>Sua pontuação foi: " + pontos + "</p>" + "<div id='reinicia' onClick=reiniciaJogo() ><h3>Jogar Novamente</h3></div>");
    
    // variáveis do jogo
    var jogo = {}
    var velocidade = 5;
    var posicaoY = parseInt(Math.random() * 334);
    var podeAtirar = true;
    var fimdejogo = false;
    var TECLA = {
        W: 87,
        S: 83,
        D: 68
    }
    jogo.pressionou = [];
    $(document).keydown(function(e){
        jogo.pressionou[e.which] = true;
    });
    $(document).keyup(function(e){
        jogo.pressionou[e.which] = false;
    });
    var pontos=0;
    var salvos=0;
    var perdidos=0;
    var energiaAtual=3;
    
    //game loop
    jogo.timer = setInterval(loop, 30);

    function loop() {
        movefundo();
        movejogador();
        moveinimigo1();
        moveinimigo2();
        moveamigo();
        colisao();
        placar();
        energia();
    } // fim do loop()

    function movefundo() {
        let esquerda = parseInt($('#fundoGame').css('background-position'));
        $('#fundoGame').css('background-position', esquerda - 1)
    } // fim do movefundo()

    function movejogador() {
        if (jogo.pressionou[TECLA.W]) {
            var topo = parseInt($('#jogador').css('top'));
            $('#jogador').css('top', topo - 10);
            if (topo <= 0) {
                $('#jogador').css('top', topo + 10);
            }
        }
        if (jogo.pressionou[TECLA.S]) {
            var topo = parseInt($('#jogador').css('top'));
            $('#jogador').css('top', topo + 10);
            if (topo >= 434) {
                $('#jogador').css('top', topo - 10);
            }
        }
        if (jogo.pressionou[TECLA.D]) {
            // função Disparo
            disparo();
        }
    } // fim moverjogador()

    function moveinimigo1() {
        let posicaoX = parseInt($('#inimigo1').css('left'));
        $('#inimigo1').css('left', posicaoX - velocidade);
        $('#inimigo1').css('top', posicaoY);
        if (posicaoX <= 0) {
            posicaoY = parseInt(Math.random() * 334);
            $('#inimigo1').css('left', 694);
            $('#inimigo1').css('top', posicaoY);
        }
    } // fim moveinimigo1()

    function moveinimigo2() {
        let posicaoX = parseInt($('#inimigo2').css('left'));
        $('#inimigo2').css('left', posicaoX - 3);
        if (posicaoX <= 0) {
            $('#inimigo2').css('left', 775);
        }
    } // fim moveinimigo2()

    function moveamigo() {
        let posicaoX = parseInt($('#amigo').css('left'));
        $('#amigo').css('left', posicaoX + 1);
        if (posicaoX >= 830) {
            $('#amigo').css('left', 0);
        }
    } // fim moveamigo()

    function disparo() {
        if (podeAtirar == true) {
            podeAtirar = false;
            topo = parseInt($("#jogador").css("top"));
            posicaoX = parseInt($("#jogador").css("left"));
            tiroX = posicaoX + 175;
            topoTiro = topo + -15;
            $("#fundoGame").append("<div id='disparo'></div>");
            $("#disparo").css("top", topoTiro);
            $("#disparo").css("left", tiroX);
            var tempoDisparo=window.setInterval(executaDisparo, 30);
        } // fecha podeAtirar

        function executaDisparo() {
            posicaoX = parseInt($("#disparo").css("left"));
            $("#disparo").css("left", posicaoX + 15);
            if (posicaoX > 900) {
                window.clearInterval(tempoDisparo);
                tempoDisparo = null;
                $("#disparo").remove();
                podeAtirar = true;
            }
        } // fim executaDisparo()
    } // fim disparo

    function colisao() {
        var colisao1 = ($("#jogador").collision($("#inimigo1")));
        var colisao2 = ($("#jogador").collision($("#inimigo2")));
        var colisao3 = ($("#disparo").collision($("#inimigo1")));
        var colisao4 = ($("#disparo").collision($("#inimigo2")));
        var colisao5 = ($("#jogador").collision($("#amigo")));
        var colisao6 = ($("#inimigo2").collision($("#amigo")));
        // jogador com o inimigo1

        if (colisao1.length > 0) {
            energiaAtual--;
            inimigo1X = $("#inimigo1").css("left");
            inimigo1Y = $("#inimigo1").css("top");
            explosao1(inimigo1X, inimigo1Y);
            posicaoY = parseInt(Math.random()*334);
            $("#inimigo1").css("left", 694);
            $("#inimigo1").css("top", posicaoY);
        }
        // jogador com o inimigo2
        if (colisao2.length > 0) {
            energiaAtual--;
            inimigo2X = parseInt($("#inimigo2").css("left"));
            inimigo2Y = parseInt($("#inimigo2").css("top"));
            explosao2(inimigo2X, inimigo2Y);
            $("#inimigo2").remove();
            reposicionaInimigo2();
        }
        // disparo com o inimigo1
        if (colisao3.length > 0) {
            pontos=pontos+50;
            inimigo1X = parseInt($("#inimigo1").css("left"));
            inimigo1Y = parseInt($("#inimigo1").css("top"));
            explosao1(inimigo1X, inimigo1Y);
            $("#disparo").css("left", 950);
            posicaoY = parseInt(Math.random() * 334);
            $("#inimigo1").css("left", 694);
            $("#inimigo1").css("top", posicaoY);
        }
        // disparo com o inimigo2
        if (colisao4.length > 0) {
            pontos=pontos+100;
            inimigo2X = parseInt($("#inimigo2").css("left"));
            inimigo2Y = parseInt($("#inimigo2").css("top"));
            explosao2(inimigo2X, inimigo2Y);
            $("#inimigo2").remove();
            $("#disparo").css("left", 950);
            reposicionaInimigo2();
        }
        // jogador com o amigo
        if (colisao5.length > 0) {
            salvos++;
            reposicionaAmigo();
            $("#amigo").remove();
        }
        if (colisao6.length>0){
            perdidos++;
            amigoX=parseInt($("#amigo").css("left"));
            amigoY=parseInt($("#amigo").css("top"));
            explosao3(amigoX,amigoY);
            $("#amigo").remove()
            reposicionaAmigo()
        }
    } // fim colisao

    function explosao1(inimigo1X, inimigo1Y) {
        $("#fundoGame").append('<div id="explosao1"></div>');
        $("#explosao1").css("background-image", "url(imgs/explosao.png)");
        var div = $("#explosao1");
        div.css("top", inimigo1Y);
        div.css("left", inimigo1X);
        div.animate({width:160, opacity: 0}, "slow");
        var tempoExplosao = window.setInterval(removeExplosao, 1000);
        function removeExplosao() {
            div.remove();
            window.clearInterval(tempoExplosao);
            tempoExplosao = null;
        }
    } // fim explosao1

    function explosao2(inimigo2X, inimigo2Y) {
        $("#fundoGame").append("<div id='explosao2'></div>");
        $("#explosao2").css("background-image", "url(imgs/explosao.png)");
        var div2 = $("#explosao2");
        div2.css("top", inimigo2Y);
        div2.css("left", inimigo2X);
        div2.animate({width:200, opacity:0}, "slow");
        var tempoExplosao2 = window.setInterval(removeExplosao2, 1000);
        function removeExplosao2() {
            div2.remove();
            window.clearInterval(tempoExplosao2);
            tempoExplosao2 = null;
        }
    } // fim da explosao2

    function explosao3(amigoX, amigoY){
        $('#fundoGame').append('<div id="explosao3" class="anima4"></div>');
        $('#explosao3').css("top", amigoY)
        $('#explosao3').css("left", amigoX)
        var tempoExplosao3 = window.setInterval(resetaExplosao3,1000)
        function resetaExplosao3(){
            $('#explosao3').remove()
            window.clearInterval(tempoExplosao3)
            tempoExplosao3 = null
        }
    } // fim da explosao3

    // reposiciona Inimigo2
    function reposicionaInimigo2() {
        var tempoColisao4 = window.setInterval(reposiciona4, 5000);
        function reposiciona4() {
            window.clearInterval(tempoColisao4);
            tempoColisao4 = null;
            if (fimdejogo == false) {
                $("#fundoGame").append("<div id='inimigo2'></div>");
            }
        }
    } // fim reposicionaInimigo2()
    
    // reposicionaAmigo
    function reposicionaAmigo() {
        var tempoAmigo = window.setInterval(reposiciona6, 6000);
        function reposiciona6() {
            window.clearInterval(tempoAmigo);
            tempoAmigo = null;
            if (fimdejogo == false) {
                $("#fundoGame").append("<div id='amigo' class='anima3'></div>");
            }
        }
    } // fim repocionaAmigo()
    function placar() {
    $("#placar").html("<h2> Pontos: " + pontos + " Salvos: " + salvos + " Perdidos: " + perdidos + "</h2>");
    } //fim da função placar()

    //Barra de energia
    function energia() {
    if (energiaAtual==3) {
        $("#energia").css("background-image", "url(imgs/energia3.png)");
        }
    if (energiaAtual==2) {
        $("#energia").css("background-image", "url(imgs/energia2.png)");
        }
    if (energiaAtual==1) {
        $("#energia").css("background-image", "url(imgs/energia1.png)");
        }
    if (energiaAtual==0) {
        $("#energia").css("background-image", "url(imgs/energia0.png)");
        //Game Over
        }
    if(energiaAtual==0){
        $("#energia").css("background-image", "url(imgs/energia0.png)");
        //Game Over
        gameOver();
    }
    } // Fim da função energia()    

    //Função GAME OVER
    function gameOver () {
    fimdejogo=true;
    window.clearInterval(jogo.timer);
    jogo.timer=null;
    $("#jogador").remove();
    $("#inimigo1").remove();
    $("#inimigo2").remove();
    $("#amigo").remove();
    $("#fundoGame").append("<div id='fim'></div>");
    $("#fim").html("<h1>Game Over!!!</h1><p>Total de pontos: " + pontos + "</p>" + "<div id='reinicia' onClick=reiniciaJogo()><h3>Tentar novamente</h3></div>");
    } // Fim da função gameOver();
}
//Reinicia o Jogo
    function reiniciaJogo() {
    $("#fim").remove();
    start();
} //Fim da função reiniciaJogo
// fim start()