
let estadoHistoria = 0;
let alturaPlanta = 20;
let plantaCresceu = false;
let frutaPronta = false;
let caminhaoX;
let fruta = {
  x: 0,
  y: 0,
  raio: 15,
  cor: '#ff4d4d'
};

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);
  textSize(22);
  textFont('Helvetica');
  
  caminhaoX = -150;
}

function draw() {
  if (estadoHistoria === 0) {
    desenharCenaCampo();
  } else if (estadoHistoria === 1) {
    desenharCenaTransporte();
  } else if (estadoHistoria === 2) {
    desenharCenaCidade();
  } else if (estadoHistoria === 3) {
    desenharTelaFinal();
  }
}

function desenharCenaCampo() {
  // Cenário
  background('#87CEEB'); 
  noStroke();
  fill('#8B4513'); 
  rect(0, height * 0.7, width, height * 0.3);

  fill(0);
  if (!plantaCresceu) {
    text('No campo, tudo começa com uma semente.', width / 2, height / 4);
    text('Clique na tela para regar e fazê-la crescer!', width / 2, height / 4 + 40);
  }

  strokeWeight(10);
  stroke('#228B22');
  line(width / 2, height * 0.7, width / 2, height * 0.7 - alturaPlanta);

  if (alturaPlanta > 150) {
    plantaCresceu = true;
    noStroke();
    fill(fruta.cor);
    fruta.x = width / 2 + 15;
    fruta.y = height * 0.7 - alturaPlanta;
    circle(fruta.x, fruta.y, fruta.raio * 2);

    if (!frutaPronta) {
       fill(0);
       text('A terra nos deu um fruto!', width / 2, height / 4);
       text('Clique mais uma vez para colher e levar para a cidade.', width / 2, height / 4 + 40);
    }
  }
  
  if (frutaPronta) {
     estadoHistoria = 1;
  }
}

function desenharCenaTransporte() {

  background('#87CEEB'); 
  noStroke();
  fill('#6B6B6B'); 
  rect(0, height * 0.7, width, height * 0.3);
  
  fill(0);
  text('O alimento viaja do campo para a cidade...', width / 2, height / 3);

  desenharCaminhao(caminhaoX, height * 0.7);
  
  caminhaoX += 3;
  

  noStroke();
  fill(fruta.cor);
  circle(caminhaoX + 35, height * 0.7 - 50, fruta.raio * 2);

  if (caminhaoX > width + 150) {
    estadoHistoria = 2;
  }
}

function desenharCaminhao(x, y) {
  fill('#1E90FF');
  rect(x, y - 60, 100, 60);
  rect(x + 100, y - 40, 50, 40);

  fill(0);
  circle(x + 20, y, 30);
  circle(x + 80, y, 30);
}

function desenharCenaCidade() {
  background('#B0C4DE');
  
  noStroke();
  fill('#696969');
  rect(width * 0.1, height * 0.3, 100, height * 0.7);
  rect(width * 0.3, height * 0.2, 120, height * 0.8);
  rect(width * 0.7, height * 0.1, 150, height * 0.9);
  
  fill('#A0522D');
  rect(width * 0.2, height * 0.8, width * 0.6, 20);
  
  fruta.x = width / 2;
  fruta.y = height * 0.8 - fruta.raio;
  fill(fruta.cor);
  circle(fruta.x, fruta.y, fruta.raio * 2);
  
  fill(0);
  text('Na cidade, o alimento chega à nossa mesa.', width / 2, height / 3);
  text('Clique na fruta para celebrar esta conexão!', width / 2, height / 3 + 40);
}

function desenharTelaFinal() {
  background('#FFFACD');
  fill('#2E8B57');
  textSize(32);
  text('Conexão Campo-Cidade Celebrada!', width / 2, height / 2 - 40);
  textSize(22);
  text('Obrigado, agricultor! Obrigado, transportador!', width / 2, height / 2 + 20);
  
  textSize(18);
  fill(0);
  text('Pressione qualquer tecla para reiniciar a história.', width / 2, height - 50);
}

function mousePressed() {
  if (estadoHistoria === 0) {
    if (plantaCresceu) {
        frutaPronta = true;
    } else {
        alturaPlanta += 30; 
    }
  }
  
  if (estadoHistoria === 2) {
    let distancia = dist(mouseX, mouseY, fruta.x, fruta.y);
    if (distancia < fruta.raio) {
      estadoHistoria = 3;
    }
  }
}

function keyPressed() {
    if (estadoHistoria === 3) {
        reiniciarHistoria();
    }
}

function reiniciarHistoria() {
    estadoHistoria = 0;
    alturaPlanta = 20;
    plantaCresceu = false;
    frutaPronta = false;
    caminhaoX = -150;
}