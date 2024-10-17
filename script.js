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

/* <details>
<summary style="display: block; width: 87px; padding: 2px; list-style: none; border-style: solid; border-radius: 4px">Description</summary>
<p>${description}</p>
</details> */