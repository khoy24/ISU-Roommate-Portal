let navbarToggler = document.querySelector('.navbar-toggler');
let profileIcon = document.getElementById('p-icon');
let profileText = document.getElementById('p-text');

// checks to change profile vs icon when clicked
navbarToggler.addEventListener('click', () => {

    // keep track of the clicks of the toggle to see whether it is expanded or not
    if (navbarToggler.getAttribute('aria-expanded') === "true") {
        console.log("expanded");
        // expanded (hide profile icon and show profile text)
        profileIcon.classList.add('d-none');
        profileText.classList.remove('d-none');
    } else {
        console.log("not expanded");
        // not expanded (show profile icon and hide profile text)
        profileIcon.classList.remove('d-none');
        profileText.classList.add('d-none');
    }
    // d-none is bootstraps way of doing display: none
    // by doing this we add it to the class list, so we can change what is displayed when the
    // toggler is expanded

});

// changes wording profile vs 
window.addEventListener('resize', () => {
    if (window.innerWidth >= 992) {
        profileIcon.classList.remove('d-none');
        profileText.classList.add('d-none');
    } else {
        profileIcon.classList.add('d-none');
        profileText.classList.remove('d-none');
    }
});


// load the images and texts for the homepage

fetchData();
function fetchData(){
    fetch('./home.json')
    .then(function (response) {
    return response.json();
    })
    .then(function (data) {
        console.log(data);
        carouselList = loadImagesIntoList(data.homeimages);
        addCarouselImages(carouselList)
    })
    .catch(function (err) {
        console.log('error:' + err);
    });

};

function loadImagesIntoList(data){
    let list = [];
    for (let i = 0; i < data.length; i++) {
        list[i] = data[i];
    }
    return list;
}

var carouselGroup = document.getElementById("carousel-group")
var prevButton = document.getElementById("control-prev");
var nextButton = document.getElementById("control-next");
var currentImage = 1;

prevButton.addEventListener('click', () => {
    if (currentImage===0){
        currentImage = carouselList.length - 1;
    } else {
        currentImage -= 1;
    }
    addCarouselImages(carouselList);
})

nextButton.addEventListener('click', () => {
    if (currentImage===carouselList.length-1){
        currentImage = 0;
    } else {
        currentImage += 1;
    }
    addCarouselImages(carouselList);
    
})

function addCarouselImages(data){

    for (let i = 0; i < data.length; i++) {
        let label = data[i].label;
        let path = data[i].path;
        let description = data[i].description;
        let alt = data[i].alt;
        let imageId = data[i].imageId;
    
        if (imageId === currentImage){
            carouselGroup.removeChild(carouselGroup.firstChild);
            carouselGroup.innerHTML=``;
            let AddCarouselItem = document.createElement("div");      
            AddCarouselItem.classList.add("div");
            AddCarouselItem.classList.add("mx-auto");
            AddCarouselItem.innerHTML = `
                <div style="position: relative; max-width: 546.4px; max-height: 364.71px; margin: auto;">
                    <img src="${path}" class="d-block w-100" alt="${alt}" style="width: 100%; height: auto; object-fit: cover;">
                    <div class="carousel-text" id="carousel-text" style="position: absolute; width:90%; top: 80%; left: 50%; transform: translate(-50%, -50%); text-align: center; color: white;">
                        <h5>${label}</h5>
                        <p>${description}</p>
                    </div>
                </div>
            `;
        
            carouselGroup.appendChild(AddCarouselItem);
        }
    }
} 













function getHalls() {
    fetch("./data.json")
    .then(response => response.json())
    .then(halls => loadImages(halls, 1))
    .catch(err => console.log("error: " + err))
    // console.log(halls);
}

function loadImages(Images, n) {
    const imageArray = [];

    //if loading residence halls
    if (n === 1) {
    Images.Halls.forEach(hall => {
        imageArray.push(
            hall
        )
    });
    }

    console.log(imageArray);

    var Card = document.getElementById("col");

    for (var i = 0; i < imageArray.length; i++) {
        let name = imageArray[i].Name;
        let Price = imageArray[i].Price;
        let AirConditioned = imageArray[i].AirConditioned;
        let OpenDuringWinterBreak = imageArray[i].OpenDuringWinterBreak;
        let Eligibility = imageArray[i].Eligibility;
        let URL = imageArray[i].URL;
        let description = imageArray[i].Description;
        let AddCard = document.createElement("div");
        AddCard.classList.add("col");
        AddCard.innerHTML = `
        <div class="card shadow-sm">
        <img src=${URL} class="card-img-top" alt="..."></img>
        <div class="card-body">
        <p class="card-text"> <strong>${name}</strong>, $${Price} <br>
        Air Conditioned: ${AirConditioned}<br>
        Open for Winter Break: ${OpenDuringWinterBreak}
        <div class="tooltip" style="float: right;">See More
        <span class="tooltiptext">${description}</span>
        </div>
        </div>
        </div>
        `;
        Card.appendChild(AddCard);
    }
}


function getQuestions() {
    fetch("./data.json")
    .then(response => response.json())
    .then(questions => loadQuestions(questions))
    .catch(err => console.log("error: " + err))
    // console.log(halls);
}

function loadQuestions(Questions) {
    const questionArray = [];

    Questions.Questions.forEach(question => {
        questionArray.push(
            question
        )
    });

    console.log(questionArray);

    var quizBody = document.getElementById("QuizBody");

    for (var i = 0; i < questionArray.length; i++) {
        let question = questionArray[i].Question;
        let name = questionArray[i].Name;
        let id1 = questionArray[i].ID1;
        let value1 = questionArray[i].Value1;
        let id2 = questionArray[i].ID2;
        let value2 = questionArray[i].Value2;
        let id3 = questionArray[i].ID3;
        let value3 = questionArray[i].Value3;
        let addQuestion = document.createElement("div");
        addQuestion.innerHTML = `
        <legend style="font-size: 18px; padding: 0 10px; margin-top: 30px;">${question}</legend>
        <div>
        <input type="radio" id="${id1}" name="${name}" value="${value1}" />
        <label for="${id1}">${value1}</label>
        </div>
        <div>
        <input type="radio" id="${id2}" name="${name}" value="${value2}" />
        <label for="${id2}">${value2}</label>
        </div>
        <div>
        <input type="radio" id="${id3}" name="${name}" value="${value3}" />
        <label for="${id3}">${value3}</label>
        </div>
        `;
        quizBody.appendChild(addQuestion);
    }

}