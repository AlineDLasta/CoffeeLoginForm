// Seleciona os elementos principais do DOM
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

// Expressão regular para validar o formato do e-mail
const regex = /^\S+@\S+\.\S+$/;

// Evento de envio do formulário principal
form.addEventListener('submit', handleSubmit);

// Validação do campo de e-mail
function validateEmail() {
    const emailValue = emailInput.value;

    if (emailValue === '') {
        emailError.innerText = 'Please fill in the email field.';
        return false;
    } else if (!regex.test(emailValue)) {
        emailError.innerText = 'Invalid email format.';
        return false;
    } else {
        emailError.innerText = ''; // limpa o erro caso esteja tudo certo
        return true;
    }
}

// Validação do campo de senha
function validatePassword() {
    const passwordValue = passwordInput.value;

    if (passwordValue === '') {
        passwordError.innerText = 'Please fill in the password field.';
        return false;
    } else if (passwordValue.length < 6) {
        passwordError.innerText = 'Your password must be at least 6 digits long!';
        return false;
    } else {
        passwordError.innerText = ''; // limpa o erro caso esteja tudo certo
        return true;
    }
}

// Manipula o envio do formulário
function handleSubmit(event) {
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();

    if (!isEmailValid || !isPasswordValid) {
        event.preventDefault(); // impede envio se houver erro
        successMessage.innerText = ''; // limpa mensagem de sucesso
    } else {
        event.preventDefault(); // impede envio para simular validação
        successMessage.innerText = 'Form submitted successfully!';
        successMessage.classList.add('showMessage');

        // Remove a mensagem após 2 segundos
        setTimeout(() => {
            successMessage.classList.remove('showMessage');
            successMessage.innerText = '';
        }, 2000);
    }
}

// Mostra ou esconde o container de redefinição de senha
forgotPassword.addEventListener('click', (event) => {
    event.preventDefault();
    passwordResetContainer.classList.toggle('hidden');
    passwordResetMessage.innerText = ''; // limpa mensagem anterior
    passwordResetEmail.value = ''; // limpa campo de email
});

// Lógica para reset de senha
passwordResetSubmit.addEventListener('click', (event) => {
    const emailR = passwordResetEmail.value;

    if (emailR === '') {
        passwordResetMessage.innerText = 'Please fill in the email field.';
        passwordResetMessage.style.color = 'red';
        return false;
    } else if (!regex.test(emailR)) {
        passwordResetMessage.innerText = 'Invalid email format.';
        passwordResetMessage.style.color = 'red';
        return false;
    } else {
        passwordResetMessage.innerText = 'Your password reset email has been sent successfully.';
        passwordResetMessage.style.color = 'green';

        // Esconde a área de reset depois de 2s e limpa
        setTimeout(() => {
            passwordResetContainer.classList.add('hidden');
            passwordResetMessage.innerText = '';
        }, 2000);

        return true;
    }
});
