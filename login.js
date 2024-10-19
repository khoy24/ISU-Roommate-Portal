
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
function login(users, userInput, passwordInput, email, password) {
    if (email === userInput && password === passwordInput) {
        document.getElementById("loginuser").innerHTML = "user and password correct";
    } else {
        document.getElementById("loginuser").innerHTML = "user and/or password incorrect";
    }
}
async function useAdmin(userInput, passwordInput) {
    console.log("use admin activated");
    const users = await fetchUser(); 
    console.log(users);
    let user1;
    const data = users;
    var email1;
    var password1;
    data.users.forEach(user => {
        var { email } = user; // Destructure to get the email
        var { password } = user;
        console.log(password);
        console.log('Email:', email);
        console.log('User Object:', user);
        if (email === userInput && password===passwordInput){
            user1 = user;
            email1 = email;
            password1 = password
        } 
    });

    console.log(email1);
    
    // console.log(user);
    // console.log( " " + user.password);
    login(user1, userInput, passwordInput, email1, password1);
}
document.getElementById("loginButton").addEventListener("click", () => {
    event.preventDefault();
    console.log("login clicked");
    const userInput = document.getElementById("userInput").value;
    const passwordInput = document.getElementById("passwordInput").value;
    console.log(userInput + " " + passwordInput);
    useAdmin(userInput, passwordInput);
});

