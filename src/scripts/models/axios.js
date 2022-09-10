const token = localStorage.getItem('@Techposters:token');

export const instance = axios.create({
    baseURL: "https://m2-rede-social.herokuapp.com/api",
    headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
    }
});

export const inst = axios.create({
    baseURL: "https://m2-rede-social.herokuapp.com/api",
    headers: {
        "Content-Type": "application/json"
    }
});