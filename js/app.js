'use strict';


let imageArr = [
    'bag.jpg',
    'banana.jpg',
    'bathroom.jpg',
    'boots.jpg',
    'breakfast.jpg',
    'bubblegum.jpg',
    'chair.jpg',
    'cthulhu.jpg',
    'dog-duck.jpg',
    'dragon.jpg',
    'pen.jpg',
    'pet-sweep.jpg',
    'scissors.jpg',
    'shark.jpg',
    'sweep.png',
    'tauntaun.jpg',
    'unicorn.jpg',
    'water-can.jpg',
    'wine-glass.jpg'
];

let all = [];
let counter = 0;
let round = 25;

let firstImage = document.getElementById('1stImage');
let secondImage = document.getElementById('2ndImage');
let thirdImage = document.getElementById('3rdImage');

const imageSection = document.getElementById('images-section');


function busMallPictures(name, imageSrc) {

    this.name = name;
    this.image = imageSrc;
    this.seen = 0;
    busMallPictures.all.push(this);

}

busMallPictures.all = [];

for (let i = 0; i < imageArr.length; i++) {
    new busMallPictures(imageArr[i].split('.')[0], imageArr[i]);
}

console.log(busMallPictures.all);


function run() {
    let firstRandom = randomNumber(0, imageArr.length - 1);
    let secondRandom = randomNumber(0, imageArr.length - 1);
    let thirdRandom = randomNumber(0, imageArr.length - 1);

    firstImage.src = './img/' + busMallPictures.all[firstRandom].image;
    secondImage.src = './img/' + busMallPictures.all[secondRandom].image;
    thirdImage.src = './img/' + busMallPictures.all[thirdRandom].image;

    busMallPictures.all[firstRandom].seen++;
    busMallPictures.all[secondRandom].seen++;
    busMallPictures.all[thirdRandom].seen++;

    console.log(busMallPictures.all);
}

run();

imageSection.addEventListener('click', clickHandler);
function clickHandler(event) {
    if ((event.target.id === '1stImage' || event.target.id === '2ndImage' || event.target.id === '3rdImage') && counter < round) {
        run();
        counter++;
    }
    if (counter == round) {
        counter++;

        
        let section = document.getElementById('viewResult');
        

        let result = document.createElement('button');
        result.textContent = 'Result';
        section.appendChild(result);

        result.addEventListener('click', clickListener);
        function clickListener() {
            let ulElement = document.createElement('ul');
            section.appendChild(ulElement);

            for (let i = 0; i < imageArr.length; i++) {
                let liElement = document.createElement('li');
                liElement.textContent = imageArr[i].split('.')[0] + ' picture has been seen ' + busMallPictures.all[i].seen + ' times';
                ulElement.appendChild(liElement);
            }



        }
    }
}

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}