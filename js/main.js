var nameInput = document.getElementById('name');
var emailInput = document.getElementById('email');
var passwordInput = document.getElementById('password');
var errorMsg = document.getElementById('error-msg');
var mainBtn = document.querySelector('main > div > button');
var isSignup = false;

// Signin Signup toggler
(function () {
  var registrationToggleSpan = document.querySelector('main > div > p > span');
  var registrationToggle = document.querySelector('main > div > p > a');

  registrationToggle.addEventListener('click', function () {
    errorMsg.textContent = '';

    // toggle return true when add d-none and false when remove d-none
    if (nameInput.classList.toggle('d-none')) {
      registrationToggle.textContent = 'Sign Up';
      registrationToggleSpan.textContent = "Don't have an account?";
      mainBtn.textContent = 'Sign In';
    } else {
      registrationToggle.textContent = 'Sign In';
      registrationToggleSpan.textContent = 'You have an account?';
      mainBtn.textContent = 'Sign Up';
    }

    isSignup = !isSignup;
    // console.log({ isSignup });

    nameInput.value = '';
    emailInput.value = '';
    passwordInput.value = '';
  });
})();

// ===============================================================================================

var users;
var logInUserIndex;

if (localStorage.getItem('users')) {
  users = JSON.parse(localStorage.getItem('users'));
} else {
  users = [];
}

mainBtn.addEventListener('click', mainBtnClickHandle);

function mainBtnClickHandle() {
  errorMsg.textContent = '';

  if (isSignup) {
    signUp();
  } else {
    signIn();
  }
}

function signUp() {
  if (nameInput.value && emailInput.value && passwordInput.value) {
    if (checkValidateEmail(emailInput.value)) {
      if (checkEmailExistenceDuringSignUp(emailInput.value)) {
        errorMsg.innerHTML = `this email address [<span class="text-lowercase text-white"> ${emailInput.value} </span> ] is used use another one`;
      } else {
        if (createNewUser()) {
          errorMsg.innerHTML = '<span class="text-uppercase text-success">success</span>';
        } else {
          errorMsg.textContent = 'unknown error while creating user';
        }
      }
    } else {
      errorMsg.textContent = 'please write a valid email address';
    }
  } else {
    errorMsg.textContent = 'please fill all required data';
  }
}

function checkValidateEmail(email) {
  email = `${email}`;

  var emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return emailRegex.test(email);
}

function checkEmailExistenceDuringSignUp(email) {
  var isEmailFoundAtSignUp = false;

  email = `${email}`;

  for (var i = 0; i < users.length; i++) {
    if (email == users[i].userEmail) {
      isEmailFoundAtSignUp = true;
    }
  }

  if (isEmailFoundAtSignUp) {
    return true;
  } else {
    return false;
  }
}

function createNewUser() {
  var user = {
    userName: nameInput.value.trim(),
    userEmail: emailInput.value,
    userPassword: passwordInput.value,
  };

  users.push(user);

  saveToLocalStorage('users', users);

  return true;
}

function saveToLocalStorage(myKey, myValue) {
  localStorage.setItem(`${myKey}`, JSON.stringify(myValue));
}

function signIn() {
  if (emailInput.value && passwordInput.value) {
    if (checkValidateEmail(emailInput.value)) {
      if (checkEmailExistenceDuringSignIn(emailInput.value)) {
        saveToLocalStorage('userName', users[logInUserIndex].userName);
        if (localStorage.getItem('userName')) {
          window.location.replace('home.html');
        } else {
          errorMsg.textContent = 'unknown error';
        }
      } else {
        errorMsg.textContent = 'Email or Password is incorrect';
      }
    } else {
      errorMsg.textContent = 'please write a valid email address';
    }
  } else {
    errorMsg.textContent = 'please fill all required data';
  }
}

function checkEmailExistenceDuringSignIn(email) {
  var isEmailFoundAtSignIn = false;

  email = `${email}`;

  for (var i = 0; i < users.length; i++) {
    if (email == users[i].userEmail) {
      isEmailFoundAtSignIn = true;
      logInUserIndex = i;
    }
  }

  if (isEmailFoundAtSignIn) {
    return checkEmailAndPasswordAreValid(emailInput.value, passwordInput.value);
  } else {
    return false;
  }
}

function checkEmailAndPasswordAreValid(email, password) {
  if (users[logInUserIndex].userEmail == email && users[logInUserIndex].userPassword == password) {
    return true;
  }

  return false;
}
