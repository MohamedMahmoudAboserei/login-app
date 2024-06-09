// ==> inputs <==
let signupName = document.getElementById("signupName");
let signupEmail = document.getElementById("signupEmail");
let signupPassword = document.getElementById("signupPassword");
let loginName = document.getElementById("loginEmail");
let loginPassword = document.getElementById("loginPassword");

let pathParts = location.pathname.split("/");
let baseURL = "";
for (let i = 0; i < pathParts.length - 1; i++) {
    baseURL += "/" + pathParts[i];
}

let username = localStorage.getItem("sessionUsername");
if (username) {
    let usernameElement = document.getElementById("username");
    if (usernameElement) {
        usernameElement.innerHTML = `Welcome <span class="name">${username}</span>`;
    }
}

let signUpArray = [];
if (localStorage.getItem("users") === null) {
    signUpArray = [];
} else {
    signUpArray = JSON.parse(localStorage.getItem("users"));
}

// for check inputs is empty or not
function isSignUpEmpty() {
    return signupName.value === "" || signupEmail.value === "" || signupPassword.value === "";
}
// for check email is exist
function isEmailExist() {
    for (let i = 0; i < signUpArray.length; i++) {
        if (signUpArray[i].email.toLowerCase() === signupEmail.value.toLowerCase()) {
            return true;
        }
    }
    return false;
}
function signUpFunction() {
    if (isSignUpEmpty()) {
        document.getElementById("exist").innerHTML =
            '<span class="text-danger m-3">All inputs are required</span>';
        return false;
    }
    // to store all value as object
    let signUp = {
        name: signupName.value,
        email: signupEmail.value,
        password: signupPassword.value,
    };
    if (isEmailExist()) {
        document.getElementById("exist").innerHTML =
            '<span class="text-danger m-3">Email already exists</span>';
    } else {
        signUpArray.push(signUp);
        localStorage.setItem("users", JSON.stringify(signUpArray));
        document.getElementById("exist").innerHTML =
            '<span class="text-success m-3">Success</span>';
    }
}
let signUpEvent = document.getElementById("signup");
signUpEvent?.addEventListener("click", signUpFunction);
// ============= for login================
//for check inputs is empty or not
function isLoginEmpty() {
    if (!loginName || !loginPassword) {
        return true;
    }
    return loginPassword.value === "" || loginName.value === "";
}
function loginFunction() {
    if (isLoginEmpty()) {
        document.getElementById("incorrect").innerHTML =
            '<span class="text-danger m-3">All inputs are required</span>';
        return false;
    }
    let email = loginName.value;
    let password = loginPassword.value;
    let userFound = false;
    for (let i = 0; i < signUpArray.length; i++) {
        if (
            signUpArray[i].email.toLowerCase() === email.toLowerCase() &&
            signUpArray[i].password === password
        ) {
            localStorage.setItem("sessionUsername", signUpArray[i].name);
            userFound = true;
            if (baseURL === "/") {
                location.replace("https://" + location.hostname + "/index.html");
            } else {
                location.replace(baseURL + "/index.html");
            }
            break;
        }
    }
    if (!userFound) {
        document.getElementById("incorrect").innerHTML =
            '<span class="p-2 text-danger">Incorrect email or password</span>';
    }
}
let loginEvent = document.getElementById("login");
loginEvent?.addEventListener('click', loginFunction);

// for logout
function logout() {
    localStorage.removeItem("sessionUsername");
}
