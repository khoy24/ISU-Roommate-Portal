let navbarToggler = document.querySelector('.navbar-toggler');
let profileIcon = document.getElementById('p-icon');
let profileText = document.getElementById('p-text');

// checks to change profile vs icon when clicked
navbarToggler.addEventListener('click', () => {

    // keep track of the clicks of the toggle to see whether it is expanded or not
    if (navbarToggler.getAttribute('aria-expanded') === "true") {
        // expanded (hide profile icon and show profile text)
        profileIcon.classList.add('d-none');
        profileText.classList.remove('d-none');
    } else {
        // not expanded (show profile icon and hide profile text)
        profileIcon.classList.remove('d-none');
        profileText.classList.add('d-none');
    }

});

// changes wording profile vs icon
window.addEventListener('resize', () => {
    if (window.innerWidth >= 992) {
        profileIcon.classList.remove('d-none');
        profileText.classList.add('d-none');
    } else {
        profileIcon.classList.add('d-none');
        profileText.classList.remove('d-none');
    }
});


// login calls
function fetchUser() {
    document.getElementById("loginuser").innerHTML = `Authenticating...`;
    return new Promise((resolve, reject) => {
    fetch("./users.json")
        .then(response=> response.json())
        .then((data)=>{resolve(data)})
        .catch((error)=>{console.log(error);
        });
    });
}
function login(user, userInput, passwordInput, email, password) {
    if (email === userInput && password === passwordInput) {
        document.getElementById("loginuser").innerHTML = "user and password correct";
        document.getElementById("formContainer").innerHTML = "";
        displayUser(user);
    } else {
        document.getElementById("loginuser").innerHTML = `<p style="color:red;">user and/or password incorrect</p>`;
    }
}
async function useAdmin(userInput, passwordInput) {
    const users = await fetchUser(); 
    let user1;
    const data = users;
    var email1;
    var password1;
    data.users.forEach(user => {
        // here we use destructuring to get attributes of user
        var { email } = user; 
        var { password } = user;
        if (email === userInput && password===passwordInput){
            user1 = user;
            email1 = email;
            password1 = password
        } 
    });
    login(user1, userInput, passwordInput, email1, password1);
}
document.getElementById("loginButton").addEventListener("click", () => {
    event.preventDefault();
    const userInput = document.getElementById("userInput").value;
    const passwordInput = document.getElementById("passwordInput").value;
    useAdmin(userInput, passwordInput);
});


// this is called when a login correctly happens and generates all the images and texts from the passed object user
function displayUser(user){

    var profilephotopath = user.profilePhoto;
    var firstname = user.firstname;
    var lastname = user.lastname;
    var bio = user.bio;
    var email = user.email;
    var username = user.username;
    var profilePhotoAlt = user.profilePhotoAlt;
    var galleryImages = user.galleryImages;


    document.getElementById("profilePageDisplay").innerHTML = `
        <div class="row" >
            <div class="col-lg-4" style="text-align:center"">
                <img src=${profilephotopath} id="profPhoto" style="position: relative; width: 15em; height: 15em; border-radius: 50%; overflow:hidden; object-fit: cover;">
                <h2 class="fw-normal my-3">${username}</h2>
                <p>${firstname} ${lastname}</p>
                <button class="btn btn-outline-light" type="button" style="background-color:#7C2529"><a href="mailto: ${email}" style="color:white; text-decoration:none;">Contact Me</a></button>
            </div><!-- /.col-lg-4 -->
            <div class="col-lg-7" id="aboutmetext" style="text-align:left">
                <h2 class="fw-normal my-3">All About Me</h2>
                <p>${bio}</p>
                <div class="container text-center">
                    <div class="row" id="image-gallery">
                    </div>
                </div>
            </div><!-- /.col-lg-4 -->
        </div><!-- /.row -->
    `
    document.getElementById("profPhoto").alt = profilePhotoAlt;


    var newimage = document.getElementById("image-gallery");

    for (let i = 0; i < galleryImages.length; i++) {
        let currentImage = galleryImages[i][0];
        let currentCaption = galleryImages[i][1];
        let alt = galleryImages[i][2];
        let newbox = document.createElement("div");
        newbox.classList.add("div");
        newbox.classList.add("col-4");
        newbox.classList.add("col-lg-4", "col-md-6", "col-sm-12", "mb-3");

        newbox.innerHTML = `

            <img class="img-fluid" src=${currentImage} id="image${i}" style=" margin:0; position: relative; width: 200px; height: 200px; overflow:hidden; object-fit: cover;">
            <p class="my-1">${currentCaption}</p>

        `
        newimage.appendChild(newbox);
        document.getElementById("image" + i).alt = alt;
    }



}