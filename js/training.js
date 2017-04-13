function sameHeight() {
    $('#left-box').outerHeight($('#right-box').innerHeight());
}


function navClick(elem) {
    if (!elem.classList.contains("active")){
        elem.classList.toggle("active");
        if (elem.id === "language-1"){
            document.getElementById("language-2").classList.toggle("active");
            // Language 1 change code
        }
        else if (elem.id === "language-2") {
            document.getElementById("language-1").classList.toggle("active");
            // language 2 change code
        }
    }
}
