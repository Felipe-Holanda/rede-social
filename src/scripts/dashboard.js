import { Request } from "./models/api.js";
import { Toast } from "./models/toast.js";
import { Modal } from "./models/modal.js";

export class Dash {
    static async listPosts(userId) {
        const getNewsts = await Request.pickPostList();
        const fetchPosts = await Request.postList(getNewsts)
        const postList = fetchPosts.data.results;

        const postCards = document.getElementById('postCards');

        postList.forEach(postCard => {
            const cardLi = document.createElement('li');

            const postHeader = document.createElement('div');
            postHeader.classList.add('postHeader');

            const cardImg = document.createElement('img');
            cardImg.src = postCard.author.image;
            cardImg.alt = postCard.author.username;

            const cardAuthor = document.createElement('div');
            const authorH3 = document.createElement('h3');
            authorH3.innerText = postCard.author.username;
            const authorP = document.createElement('p');
            authorP.innerText = postCard.author.work_at;
            cardAuthor.append(authorH3, authorP);
            postHeader.append(cardImg, cardAuthor);

            const postTitle = document.createElement('h2');
            postTitle.classList.add('postTitle');
            postTitle.innerText = postCard.title;

            const postShort = document.createElement('p');
            const shortDescription = postCard.description;
            if (shortDescription.length > 130) {
                postShort.innerText = shortDescription.slice(0, 130) + '...';
            }
            else {
                postShort.innerText = shortDescription;
            }

            const postOptions = document.createElement('div');
            postOptions.classList.add('postOptions');
            const openPost = document.createElement('button');
            openPost.id = postCard.uuid;
            openPost.innerText = 'Abrir post';
            const likePost = document.createElement('figure');
            let likeImg = '';

            const doILike = postCard.likes;
            let likeSwitcher = false;
            let identify = postCard.uuid

            if (doILike.find(dol => dol.user.uuid == userId)) {
                likeImg = './src/assets/heartRed.png';
                identify = postCard.likes[0].uuid;
                likeSwitcher = true;
            }
            else {
                likeImg = './src/assets/heartBlack.png';
                likeSwitcher = false;
            }
            likePost.innerHTML = '<img src="' + likeImg + '" alt="' + identify + '"> ' + doILike.length;

            postOptions.append(openPost, likePost);
            cardLi.append(postHeader, postTitle, postShort, postOptions);
            postCards.appendChild(cardLi);

            likePost.addEventListener('click', async (ev) => {
                if (ev.target.tagName == 'IMG' && likeSwitcher == false) {
                    const likePost = { post_uuid: ev.target.alt }
                    ev.target.src = './src/assets/heartRed.png';
                    await Request.likePost(likePost);
                }
                else {
                    ev.target.src = './src/assets/heartBlack.png';
                    await Request.unlikePost(ev.target.alt);
                }
            })

            openPost.addEventListener('click', (ev) => {
                const content = {
                    image: postCard.author.image,
                    username: postCard.author.username,
                    work_at: postCard.author.work_at,
                    title: postCard.title,
                    description: postCard.description
                };
                Modal.window(content);
            });
        });
    }

    static async listUsers(page, followingIds) {
        const fetchList = await Request.userList(page);
        const userList = fetchList.data.results;

        const userCards = document.getElementById('userCards');
        userCards.addEventListener('click', async (ev) => {
            if (ev.target.tagName == 'BUTTON' && ev.target.innerText == 'Seguir') {
                ev.target.classList.toggle('followButton');
                ev.target.innerText = 'Seguindo';
                const userToFollow = {
                    following_users_uuid: ev.target.value
                }
                await Request.followUser(userToFollow);
            }
            else if (ev.target.tagName == 'BUTTON' && ev.target.innerText == 'Seguindo') {
                ev.target.classList.toggle('followButton');
                ev.target.innerText = 'Seguir';
                await Request.unfollowUser(ev.target.id);
            }
        });
        userList.forEach(userCard => {
            const cardLi = document.createElement('li');

            const cardImg = document.createElement('img');
            cardImg.src = userCard.image;
            cardImg.alt = userCard.username;

            const cardDiv = document.createElement('div');
            const cardH3 = document.createElement('h3');
            cardH3.innerText = userCard.username;
            const cardP = document.createElement('p');
            cardP.innerText = userCard.work_at;
            cardDiv.append(cardH3, cardP);

            const followButton = document.createElement('button');
            followButton.value = userCard.uuid;
            const doIFollow = followingIds.find(fol => fol.following_users_id.uuid == userCard.uuid);
            if (!doIFollow) {
                followButton.classList.toggle('followButton');
                followButton.id = 'followButton';
                followButton.innerText = 'Seguir';
            } else {
                followButton.id = doIFollow.uuid;
                followButton.innerText = 'Seguindo';
            }

            cardLi.append(cardImg, cardDiv, followButton);
            userCards.appendChild(cardLi);
        });
    }

    static async loadUser(userId) {
        let fetchData = await Request.userInterace(userId);
        const userData = fetchData.data;
        const pickAPage = Math.floor(Math.random() * 150);
        this.listUsers(pickAPage, userData.following);

        const userPost = document.getElementById('userPost');

        const postHeader = document.createElement('div');
        postHeader.classList.add('postHeader');

        const userAvatar = document.createElement('img');
        userAvatar.src = userData.image;
        userAvatar.alt = userData.username;

        const userDiv = document.createElement('div');
        const userH2 = document.createElement('h2');
        userH2.innerHTML = userData.username + '<span>' + userData.followers_amount + ' seguidores</span>'
        const userP = document.createElement('p');
        userP.innerText = userData.work_at;

        userDiv.append(userH2, userP);
        postHeader.append(userAvatar, userDiv);

        const newPost = document.createElement('form');
        newPost.id = 'newPost';

        const newPostTitle = document.createElement('input');
        newPostTitle.type = 'text';
        newPostTitle.id = 'newPostTitle';
        newPostTitle.placeholder = 'Digitar título do post';
        newPostTitle.required = 'required';

        const newPostText = document.createElement('textarea');
        newPostText.id = 'newPostText';
        newPostText.rows = '10';
        newPostText.placeholder = 'Digitar a descrição do post';
        newPostText.required = 'required';

        const newPostSubmit = document.createElement('button');
        newPostSubmit.classList.add('buttonInactive');
        newPostSubmit.type = 'submit';
        newPostSubmit.id = 'newPostSubmit';
        newPostSubmit.innerText = 'Postar';

        newPost.append(newPostTitle, newPostText, newPostSubmit);
        userPost.append(postHeader, newPost);

        newPostSubmit.addEventListener('click', async (ev) => {
            ev.preventDefault();
            if (newPostTitle.value && newPostText.value) {
                newPostSubmit.disabled = 'disabled';
                const newPostData = {
                    title: newPostTitle.value,
                    description: newPostText.value
                }
                await Request.newPost(newPostData);
            }
            else {
                Toast.create('Preencha ambos os campos para postar')
            }
        });
        newPostText.addEventListener('keydown', () => {

            if (newPostTitle.value && newPostText.value) {
                newPostSubmit.classList.remove('buttonInactive');
            }
            else {
                newPostSubmit.classList.add('buttonInactive');
            }
        });
    }

    static startDash() {
        const userToken = localStorage.getItem('@Techposters:token');
        const userId = localStorage.getItem('@Techposters:userid');
        Toast.create('Carregando a API. Tenha paciência!')
        if (!userToken) {
            window.location.assign('./index');
        }
        else {
            this.loadUser(userId);
            this.listPosts(userId);
        }
        const logOff = document.querySelector('nav');
        logOff.addEventListener('click', () => {
            localStorage.clear();
            window.location.reload();
        });
    }
}

Dash.startDash();