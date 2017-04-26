import App from "./app";



window.onload = function() {
    window.app = new App(document.body);
    window.app.start();
};