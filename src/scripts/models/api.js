import { instance, inst } from "./axios.js";
import { Toast } from "./toast.js";

export class Request {

    static async login(block) {
        Toast.create('Consultando API para fazer Login')
        const logUser = await instance
            .post('/users/login/', block)
            .then((res) => {
                if (res.statusText == 'OK') {
                    Toast.create('Login realizado com sucesso');
                    localStorage.setItem("@Techposters:userid", res.data.user_uuid);
                    localStorage.setItem("@Techposters:token", res.data.token);
                    setTimeout(() => window.location.replace('../../../dashboard'), 2125);
                }
            })
            .catch((err) => {
                Toast.create('Acesso não autorizado\nEssa conta não existe ou os dados estão incorretos, logo não pode acessar a página');
            })
    }

    static async addNewUser(block) {
        const newUser = await inst
            .post('/users/', block)
            .then((res) => {
                Toast.create(res.statusText);
                return res;
            })
            .catch((err) => {
                console.log('ERROR', err)
                Toast.create(err.message);
            })

        return newUser;
    }

    static async userInterace(userId) {
        const userData = await instance
            .get('/users/' + userId + '/')
            .then((res) => {
                return res;
            })
            .catch((err) => {
                console.log(err);
                Toast.create('Seção: Criar Post[ERRO] ' + err.message);
            })
        return userData;
    }

    static async userList(page) {
        const userLi = await instance
            .get('/users/?offset=' + page + '&limit=3')
            .then((res) => {
                return res;
            })
            .catch((err) => {
                console.log(err);
                Toast.create('Seção: Lista de Usuários[ERRO] ' + err.message);
            })
        return userLi;
    }

    static async pickPostList() {
        const postLi = await instance
            .get('/posts/')
            .then((res) => {
                Toast.create('Carregando: Lista de Posts');
                return res.data.count - 10;
            })
            .catch((err) => {
                console.log(err);
                Toast.create('Falhou: Lista de Posts' + err.message);
            })
        return postLi;
    }

    static async postList(newestPage) {
        const postLi = await instance
            .get('/posts/?offset=' + newestPage)
            .then((res) => {
                return res;
            })
            .catch((err) => {
                console.log(err);
                Toast.create('Seção: Lista de Posts[ERRO]' + err.message);
            })
        return postLi;
    }

    static async newPost(postData) {
        Toast.create('Alimentando o API: ' + postData.title)
        const addPost = await instance
            .post('/posts/', postData)
            .then((res) => {
                if (res.statusText == 'Created') {
                    setTimeout(() => {
                        window.location.reload()
                    }, 2500);

                }
            })
            .catch((err) => {
                Toast.create('Seção: Novo Post ' + err.message);
            })
    }

    static async followUser(followId) {
        const addPost = await instance
            .post('/users/follow/', followId)
            .then((res) => {
                Toast.create('Follow: ' + res.statusText);
                window.location.reload();
            })
            .catch((err) => {
                console.log(err);
                Toast.create('NO follow: ' + err.message);
            })
    }

    static async unfollowUser(followId) {
        const addPost = await instance
            .delete('/users/unfollow/' + followId + '/')
            .then((res) => {
                Toast.create('Unfollow: ' + followId);
            })
            .catch((err) => {
                console.log(err);
                Toast.create('NO unfollow: ' + err.message);
            })
    }

    static async likePost(postId) {
        const addPost = await instance
            .post('/likes/', postId)
            .then((res) => {
                Toast.create('Like: ' + res.statusText);
                if (res.statusText == 'Created') {
                    setTimeout(() => {
                        window.location.reload()
                    }, 2500);
                }
            })
            .catch((err) => {
                console.log(err);
                Toast.create('NO Likey: ' + err.message);
            })
    }

    static async unlikePost(postId) {
        console.log(postId)
        const addPost = await instance
            .delete('/likes/' + postId + '/')
            .then((res) => {
                Toast.create('Unlike: ' + postId);
                setTimeout(() => {
                    window.location.reload()
                }, 2500);
            })
            .catch((err) => {
                console.log(err);
                Toast.create('NO Likey: ' + err.message);
            })
    }
}