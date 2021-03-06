'use strict';

// **************************** Image Array **************************

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

// **************************************** Defining Variables (global) *************************

let all = [];
let counter = 0;
let round = 25;

let firstImage = document.getElementById('1stImage');
let secondImage = document.getElementById('2ndImage');
let thirdImage = document.getElementById('3rdImage');

let firstRandom = 0;
let secondRandom = 0;
let thirdRandom = 0;


const imageSection = document.getElementById('images-section');


// *********************** Constructor Function & Render Function *************************

function busMallPictures(name, imageSrc, seen = 0, vote = 0) {

    this.name = name;
    this.image = imageSrc;
    this.seen = seen;
    this.voted = vote;
    busMallPictures.all.push(this);

}

busMallPictures.all = [];

getData(); // convert the data from local storage as string to array

let prevArray = [];

function run() {




    do {
        firstRandom = randomNumber(0, imageArr.length - 1);
        secondRandom = randomNumber(0, imageArr.length - 1);
        thirdRandom = randomNumber(0, imageArr.length - 1);
    } while (firstRandom === secondRandom || firstRandom === thirdRandom || secondRandom === thirdRandom ||
    prevArray.includes(firstRandom) || prevArray.includes(secondRandom) || prevArray.includes(thirdRandom))


    prevArray = [firstRandom, secondRandom, thirdRandom];

    firstImage.src = './img/' + busMallPictures.all[firstRandom].image;
    secondImage.src = './img/' + busMallPictures.all[secondRandom].image;
    thirdImage.src = './img/' + busMallPictures.all[thirdRandom].image;

    busMallPictures.all[firstRandom].seen++;
    busMallPictures.all[secondRandom].seen++;
    busMallPictures.all[thirdRandom].seen++;

    localStorage.data = JSON.stringify(busMallPictures.all);
    console.log(busMallPictures.all);

    // console.log(busMallPictures.all);
}

run();




// ************************ Click Event Listener **********************

imageSection.addEventListener('click', clickHandler);
function clickHandler(event) {
    if ((event.target.id === '1stImage' || event.target.id === '2ndImage' || event.target.id === '3rdImage') && counter < round) {
        run();
        counter++;

        if (event.target.id === '1stImage') {
            busMallPictures.all[firstRandom].voted++;
        }

        if (event.target.id === '2ndImage') {
            busMallPictures.all[secondRandom].voted++;
        }

        if (event.target.id === '3rdImage') {
            busMallPictures.all[thirdRandom].voted++;
        }


    } 
}

// ************************* Rsult Event Listener *************************

let section = document.getElementById('viewResult');


let result = document.createElement('button');
result.textContent = 'Result';
section.appendChild(result);

result.addEventListener('click', clickListener);
function clickListener() {
    
    if ( counter == round ) {

        counter++;
        
        let ulElement = document.createElement('ul');
        section.appendChild(ulElement);
    
        for (let i = 0; i < imageArr.length; i++) {
            let liElement = document.createElement('li');
            liElement.textContent = `${busMallPictures.all[i].name} has been seen ${busMallPictures.all[i].seen} times and voted ${busMallPictures.all[i].voted} times.`;
            ulElement.appendChild(liElement);
        }
    
    


    // ****************************************  Result Chart *******************************


    function newChart() {

        let namesArray = [];
        let seenArray = [];
        let votedArray = [];

        for (let i = 0; i < busMallPictures.all.length; i++) {
            namesArray.push(busMallPictures.all[i].name);
            seenArray.push(busMallPictures.all[i].seen);
            votedArray.push(busMallPictures.all[i].voted);
        }

        let ctx = document.getElementById('resultChart').getContext('2d');

        let resultChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: namesArray,
                datasets: [{
                    label: '# Seen',
                    data: seenArray,
                    backgroundColor: [
                        'rgba(255, 191, 70, 1)'
                    ],
                    borderColor: [
                        'rgba(107, 5, 4, 1)'
                    ],
                    borderWidth: 2
                }, {
                    label: '# Voted',
                    data: votedArray,
                    backgroundColor: [

                        'rgba(107, 5, 4, 1)'
                    ],
                    borderColor: [
                        'rgba(255, 191, 70, 1)'
                    ],
                    borderWidth: 2
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    newChart();


    // ********************* Remove listener **************************

    result.removeEventListener('click', clickListener);


    }
        
}




// *************************** Random Number Function ***********************

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}


// ************************ Get Data Function (local storage parse) **********************

function getData () {
    if (localStorage.data) {
        let data = JSON.parse(localStorage.data);

        for ( let i = 0; i < data.length; i++) {
            new busMallPictures (data[i].name, data[i].image, data[i].seen, data[i].voted);
        }
    } else {
        for (let i = 0; i < imageArr.length; i++) {
            new busMallPictures(imageArr[i].split('.')[0], imageArr[i]);
        }
    }
}
