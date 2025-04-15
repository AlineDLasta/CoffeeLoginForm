const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#password');
const form = document.querySelector('#form');
const emailError = document.querySelector('#emailError');
const passwordError = document.querySelector('#passwordError');
const successMessage = document.querySelector('#successMessage');
const forgotPassword = document.querySelector('#forgotPassword');
const passwordResetContainer = document.querySelector('#passwordResetContainer');
const passwordResetEmail = document.querySelector('#passwordResetEmail');
const passwordResetSubmit = document.querySelector('#passwordResetSubmit');
const passwordResetMessage = document.querySelector('#passwordResetMessage');
const newAccount = document.querySelector('#newAccount');
const formRegister = document.querySelector('#formRegister');
const userRegister = document.querySelector('#userRegister');
const emailRegister = document.querySelector('#emailRegister');
const passwordRegister = document.querySelector('#passwordRegister');
const emailRegisterError = document.querySelector('#emailRegisterError');
const passwordRegisterError = document.querySelector('#passwordRegisterError');
const successRegisterMessage = document.querySelector('#successRegisterMessage');
const nameRegisterError = document.querySelector('#nameRegisterError');
const regex = /^\S+@\S+\.\S+$/;

//Envio do formulário
form.addEventListener('submit', handleSubmit);
formRegister.addEventListener('submit', handleRegister);

function validateName(){
    const nameValue = userRegister.value;
    if (nameValue === ''){
        nameRegisterError.innerText = 'Please fill in the field with your name.';
        return false;
    } else {
        nameRegisterError.innerText = '';
        return true;
    }
}

function validateEmail(inputElement, errorElement) {
    const emailValue = inputElement.value;
    if (emailValue === '') {
        errorElement.innerText = 'Please fill in the email field.';
        return false;
    } else if (!regex.test(emailValue)) {
        errorElement.innerText = 'Invalid email format.';
        return false;
    } else {
        errorElement.innerText = ''; // limpa o erro caso esteja tudo certo
        return true;
    }
}

function validatePassword(inputElement, errorElement) {
    const passwordValue = inputElement.value;

    if (passwordValue === '') {
        errorElement.innerText = 'Please fill in the password field.';
        return false;
    } else if (passwordValue.length < 6) {
        errorElement.innerText = 'Your password must be at least 6 digits long!';
        return false;
    } else {
        errorElement.innerText = '';
        return true;
    }
}

// Manipula o envio do formulário
function handleSubmit(event) {
    const isEmailValid = validateEmail(emailInput, emailError);
    const isPasswordValid = validatePassword(passwordInput, passwordError);

    if (!isEmailValid || !isPasswordValid) {
        event.preventDefault();
        successMessage.innerText = '';
    } else {
        const userText = localStorage.getItem('user');
        successMessage.innerText = '';

        if (!userText){
            successMessage.innerText = 'You dont have an account yet. Sign up first!';
            successMessage.classList.add('showMessage');
            successMessage.style.color = 'red';
            return;
        }

        const userObj = JSON.parse(userText);
        if (emailInput.value === userObj.email && passwordInput.value === userObj.password){
            successMessage.innerText = 'Login successful!';
            successMessage.classList.add('showMessage');
            successMessage.style.color = 'green';
        } else {
            successMessage.innerText = 'Incorrect email or password.';
            successMessage.classList.add('showMessage');
            successMessage.style.color = 'red';
        }

        setTimeout(() => {
            successMessage.classList.remove('showMessage');
            successMessage.innerText = '';
        }, 2000);
    }
}

function handleRegister(event) {
    const isEmailValid = validateEmail(emailRegister, emailRegisterError);
    const isPasswordValid = validatePassword(passwordRegister, passwordRegisterError);
    const isNameValid = validateName();
    if (!isEmailValid || !isPasswordValid || !isNameValid) {
        event.preventDefault();
        successRegisterMessage.innerText = '';
    } else {
        event.preventDefault();
        successRegisterMessage.innerText = 'Registration form sent successfully!';
        successRegisterMessage.classList.add('showMessage');

        const user = {
            name : userRegister.value,
            email : emailRegister.value,
            password: passwordRegister.value
        };
        const userJSON = JSON.stringify(user);
        localStorage.setItem('user', userJSON);

        setTimeout(() => {
            successRegisterMessage.classList.remove('showMessage');
            successRegisterMessage.innerText = '';
        }, 2000);
    } 
}

//Visibilidade do container de redefinição de senha
forgotPassword.addEventListener('click', (event) => {
    event.preventDefault();
    passwordResetContainer.classList.toggle('hidden');
    passwordResetMessage.innerText = '';
    passwordResetEmail.value = '';
});

passwordResetSubmit.addEventListener('click', (event) => {
    const emailR = passwordResetEmail.value;

    if (emailR === '') {
        passwordResetMessage.innerText = 'Please fill in the email field.';
        passwordResetMessage.style.color = 'red';
        passwordResetMessage.style.fontWeight = 'bold';
        return false;
    } else if (!regex.test(emailR)) {
        passwordResetMessage.innerText = 'Invalid email format.';
        passwordResetMessage.style.color = 'red';
        passwordResetMessage.style.fontWeight = 'bold';
        return false;
    } else {
        passwordResetMessage.innerText = 'Your password reset email has been sent successfully.';
        passwordResetMessage.style.color = 'green';
        passwordResetMessage.style.fontWeight = 'bold';

        setTimeout(() => {
            passwordResetContainer.classList.add('hidden');
            passwordResetMessage.innerText = '';
        }, 2000);

        return true;
    }
});

newAccount.addEventListener('click', (e) => {
    e.preventDefault();
    form.hidden = true;
    formRegister.hidden = false;
});

backToLogin.addEventListener('click', (e) => {
    e.preventDefault();
    formRegister.hidden = true;
    form.hidden = false;

    successMessage.innerText = '';
    successMessage.classList.remove('showMessage');
});
