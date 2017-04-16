$(document).ready(function () {
    $.ajax({
        url: 'server.php?mode=id',
        type: 'GET',
        success: function (echo) {
            //alert(echo);
        }
    });

    var lb = $('#left-box');
    var rb = $('#right-box');
    lb.outerHeight(rb.innerHeight());
    lb.animate({opacity: '1.0'}, 200);
    rb.animate({opacity: '1.0'}, 400);
    $('#language-bar').animate({opacity: '1.0'},100);
});




function sameHeight() {
    $('#left-box').outerHeight($('#right-box').innerHeight());
}

function navClick(elem, event) {
    event.preventDefault();
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
