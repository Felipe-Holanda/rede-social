export class Toast {
    static create(msg){
         Toastify({
            text: msg,
            duration: 5000,
            close: true,
            gravity: "top",
            position: "center",
            style: {
                background: "#364FC7",
            },
        }).showToast();
    }
}