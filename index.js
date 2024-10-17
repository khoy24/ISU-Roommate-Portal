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
    //read the form
    const b = document.getElementById("carousel-inner-group");
    // b.addEventListener("submit",(event)=>{
    // event.preventDefault(); // Prevent the form from submitting in the traditional way
    fetch('./home.json')
    .then(function (response) {
    return response.json();
    })
    .then(function (data) {
        console.log(data);
        loadCarouselImages(data.homeimages);
    })
    .catch(function (err) {
        console.log('error:' + err);
    });

    // });
}


function loadCarouselImages(data){

    var carouselGroup = document.getElementById("carousel-inner-group");
    for (let i = 0; i < data.length; i++) {
        console.log(data);
        let label = data[i].label;
        let path = data[i].path;
        let description = data[i].description;
        let alt = data[i].alt;
        let imageId = data[i].imageId;
        // construct the HTML element
        let AddCarouselItem = document.createElement("div");
        if (i===0){
            AddCarouselItem.classList.add("active");
        }

        AddCarouselItem.classList.add("carousel-item"); // Add Bootstrap class to the column
        AddCarouselItem.classList.add("mx-auto");
        AddCarouselItem.innerHTML = `
            <img src=${path} class="d-block w-100" alt=${alt}>
                <div class="carousel-caption d-none d-md-block">
                <h5>${label}</h5>
                <p>${description}</p>
                </div>
            `;
        carouselGroup.appendChild(AddCarouselItem);
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
        Open for Winter Break: ${OpenDuringWinterBreak} <br>
        <button id="${name}">button</button> 
        <p style="display: none;">${description}</p>
        </div>
        </div>
        `;
        Card.appendChild(AddCard);
    }
}

if ($('body').is('.housing')){
    let temp = document.querySelectorAll('.button');

    temp.forEach((item) => {
        item.addEventListener('click', () => {
            console.log(item.id);
        })
    });
}