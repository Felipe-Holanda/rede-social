import { Request } from "./models/api.js";
import { Toast } from "./models/toast.js";

class SignUsers {

    static loginUser() {
        const userForm = document.createElement('form');
        userForm.classList.add('userForm');
        userForm.innerHTML = '';

        const userEmail = document.createElement('input');
        userEmail.type = 'email';
        userEmail.id = 'userEmail';
        userEmail.placeholder = 'Seu e-mail';
        userEmail.required = 'required';

        const userPass = document.createElement('input');
        userPass.type = 'password';
        userPass.id = 'userPass';
        userPass.placeholder = 'Sua Senha';
        userPass.required = 'required';

        const loginSubmit = document.createElement('button');
        loginSubmit.type = 'submit';
        loginSubmit.id = 'loginSubmit';
        loginSubmit.innerText = 'Logar'

        const formLink = document.createElement('a');
        formLink.href = '#';
        formLink.classList.add('formLink');
        formLink.innerText = 'Ainda não possui cadastro'

        const formButton = document.createElement('button');
        formButton.classList.add('formButton');
        formButton.innerText = 'Ir para página de registro';

        userForm.append(userEmail, userPass, loginSubmit, formLink, formButton);

        return userForm;
    }

    static AddUser() {
        const userForm = document.createElement('form');
        userForm.classList.add('userForm');
        userForm.innerHTML = '';

        const addNome = document.createElement('input');
        addNome.type = 'text';
        addNome.id = 'addNome';
        addNome.placeholder = 'Seu nome';
        addNome.required = 'required';

        const addEmail = document.createElement('input');
        addEmail.type = 'text';
        addEmail.id = 'addEmail';
        addEmail.placeholder = 'Seu e-mail';
        addEmail.required = 'required';

        const addPass = document.createElement('input');
        addPass.type = 'password';
        addPass.id = 'addPass';
        addPass.placeholder = 'Sua Senha';
        addPass.required = 'required';

        const addJob = document.createElement('input');
        addJob.type = 'text';
        addJob.id = 'addJob';
        addJob.placeholder = 'Qual o seu trabalho?';
        addJob.required = 'required';

        const addPerfil = document.createElement('input');
        addPerfil.type = 'text';
        addPerfil.id = 'addPerfil';
        addPerfil.placeholder = 'URL da imagem de perfil';
        addPerfil.required = 'required';

        const addSubmit = document.createElement('button');
        addSubmit.type = 'submit';
        addSubmit.id = 'addSubmit';
        addSubmit.innerText = 'Registrar'

        const formLink = document.createElement('a');
        formLink.href = '#';
        formLink.classList.add('formLink');
        formLink.innerText = 'Já possui login'

        const formButton = document.createElement('button');
        formButton.classList.add('formButton');
        formButton.innerText = 'Ir para página de login';

        userForm.append(addNome, addEmail, addPass, addJob, addPerfil, addSubmit, formLink, formButton);
        return userForm;

    }

    static startInterface(loginWindow) {
        const userId = localStorage.getItem("@Techposters:userId");
        const userToken = localStorage.getItem("@Techposters:token");
        if (userToken) {
            Toast.create('Token encontrado!');
            setTimeout(() => {
                window.location.replace('../../dashboard');
            }, 2125);
        }

        const navBar = document.getElementById('navBar');
        const userWindow = document.querySelector('.userWindow');

        navBar.addEventListener('click', (ev) => {

            if (ev.target.classList.value == 'optionNav') {
                if (loginWindow) {
                    loginWindow = false;
                    SignUsers.userInterface(loginWindow);
                }
                else {
                    loginWindow = true;
                    SignUsers.userInterface(loginWindow);
                }
            }
        });
        userWindow.addEventListener('click', (ev) => {
            if (ev.target.classList.value == 'formButton') {
                if (loginWindow) {
                    loginWindow = false;
                    SignUsers.userInterface(loginWindow);
                }
                else {
                    loginWindow = true;
                    SignUsers.userInterface(loginWindow);
                }
            }
            if (ev.target.id == 'loginSubmit') {
                ev.preventDefault();
                let userBlock = {
                    email: document.getElementById('userEmail').value,
                    password: document.getElementById('userPass').value
                }
                Request.login(userBlock);
            }
            if (ev.target.id == 'addSubmit') {
                ev.preventDefault();
                let userBlock = {
                    username: document.getElementById('addNome').value,
                    email: document.getElementById('addEmail').value,
                    password: document.getElementById('addPass').value,
                    work_at: document.getElementById('addJob').value,
                    image: document.getElementById('addPerfil').value,
                }
                Request.addNewUser(userBlock);
            }
        });
    }

    static userInterface(loginWindow) {
        const userWindow = document.querySelector('.userWindow');
        userWindow.innerHTML = '';

        const optionNav = document.querySelector('.optionNav');
        const activeNav = document.querySelector('.activeNav');

        const windowH2 = document.createElement('h2');
        userWindow.appendChild(windowH2);

        if (loginWindow) {
            windowH2.innerText = 'Login';
            const userForm = this.loginUser();
            optionNav.classList.toggle('optionNav');
            optionNav.classList.toggle('activeNav');
            activeNav.classList.toggle('activeNav');
            activeNav.classList.toggle('optionNav');
            userWindow.appendChild(userForm);
        }
        else {
            windowH2.innerText = 'Cadastro';
            const userForm = this.AddUser();
            optionNav.classList.toggle('optionNav');
            optionNav.classList.toggle('activeNav');
            activeNav.classList.toggle('activeNav');
            activeNav.classList.toggle('optionNav');
            userWindow.appendChild(userForm);
        }


    }
}

SignUsers.startInterface(true);
SignUsers.userInterface(true)