export class Modal {
    static window(content) {
        const body = document.querySelector('body');

        const mainModal = document.createElement('div')
        mainModal.id = 'mainModal';

        const modalWindow = document.createElement('div');
        modalWindow.classList.add('modalWindow');

        const postHeader = document.createElement('div');
        postHeader.classList.add('postHeader');

        const cardImg = document.createElement('img');
        cardImg.src = content.image;
        cardImg.alt = content.username;

        const cardAuthor = document.createElement('div');
        const authorH3 = document.createElement('h3');
        authorH3.innerText = content.username;
        const authorP = document.createElement('p');
        authorP.innerText = content.work_at;
        cardAuthor.append(authorH3, authorP);
        postHeader.append(cardImg, cardAuthor);

        const postTitle = document.createElement('h2');
        postTitle.innerText = content.title;

        const postText = document.createElement('p');
        postText.innerText = content.description;

        const closeButton = document.createElement('button');
        closeButton.id = 'closeButton';
        closeButton.innerText = 'X';

        modalWindow.append(postHeader, postTitle, postText, closeButton);
        mainModal.appendChild(modalWindow);
        body.appendChild(mainModal);

        closeButton.addEventListener('click', ()=> body.removeChild(mainModal))
    }
}