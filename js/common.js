$(document).ready(function () {
    $('.content-wrapper').fadeIn(200);
});

window.addEventListener("load", function(){

        window.cookieconsent.initialise({
            "palette": {
                "popup": {
                    "background": "#000"
                },
                "button": {
                    "background": "#d5dfa0"
                }
            },
            "content": {
                "message": "Diese Website benutzt Cookies um Ihnen die bestmögliche Erfahrung zu bieten. Mit der Weiterbenutzung der Website erklären Sie sich damit einverstanden, dass Cookies gesetzt werden. ",
                "dismiss": "Alles klar!",
                "link": "Mehr erfahren"
            }
        });

});