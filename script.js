const images = []; //Array, onde cada imagem será adicionada
let currentIndex = 0; //imagem "0"
const carousel = document.getElementById('carousel');
const indicatorsContainer = document.getElementById('indicators');
const imageInput = document.getElementById('imageInput');

//Responsável por criar o elemento img
function createImageElement(src) {
  const img = document.createElement('img');
  img.src = src;
  img.classList.add('slide-item')
  carousel.appendChild(img);
}

//Responsável por exibir a imagem do índice especifico no carrossel
function showImage(index) {
  if (index >= 0 && index < images.length) { //posição da imagem array nas imagens
    const imagesList = carousel.getElementsByTagName('img'); //quando a tag "img" for criada, ela recebe um elemento.
    for (let i = 0; i < imagesList.length; i++) {
    }
   currentIndex = index;                                                //Neste caso a imagem quando for colocada a tag carrossel 
    updateIndicators();                                                 //receberá o elememento "translate" que receberá um "-"
    carousel.style.transform = `translateX(-${currentIndex * 100}%)`;   //e fará a imagem ir para a esquerda.
  }
}

//Ao clicar na seta da direita, ativará o "currentIndex" que aumentará em 1% o valor da posição do mesmo
function nextImage() {                                                               
  currentIndex = (currentIndex + 1) % images.length;//fazendo com que não ultrapasse o número total de arrays em "img"                     
  showImage(currentIndex); //Basicamente a função que irá mostrar a próxima imagem
}

//Possuí a mesma função de cima, mas ele diminue o valor em -1%
function previousImage() {                                                         
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  showImage(currentIndex);
}

//Responsável por criar a função de adicionar um ou várias imagens
function addImages() {
  const files = imageInput.files;

  for (let i = 0; i < files.length; i++) {
    const reader = new FileReader(); //Toda imagem criada gera um FileReader, responsável por ler o arquivo
    reader.onload = function(event) { //que adiciona a URL da imagem no formato base64 ao array "images"
      const src = event.target.result;
      images.push(src);
      createImageElement(src); //que cria a tag img

      showImage(images.length - 1); //Exibe a ultima imagem adicionada
    };
    reader.readAsDataURL(files[i]); //Lê os arquivos como URL
  }
}

//Responsável por criar os indicadores(bolinhas) toda vez que for adicionada uma imagem
function updateIndicators() {
  indicatorsContainer.innerHTML = ''; //Responsável por adicionar nenhum outro atributo adicional
  for (let i = 0; i < images.length; i++) { //Fará os indicadores ficarem posicionados
    const indicator = document.createElement('span'); //Que vai criar o elemento "span"
    indicator.className = 'indicator'; //pegará a div "indicator" no HTML
    if (i === currentIndex) {
      indicator.classList.add('active'); //Fará cada "span" ter a classe "active"
    }
    indicator.onclick = function() { //Para cada clik nos indicadores, ele irá mostrar as imagens atribuidas a ele
      showImage(i);
    };
    indicatorsContainer.appendChild(indicator);
  }
}
images.forEach(image => createImageElement(image)); //Irá percorrer e chamar a função createImageElement(image) para cada imagem pré-definida.
showImage(currentIndex); //e chamar a função "createImageElement(image)"" para cada imagem pré-definida.
