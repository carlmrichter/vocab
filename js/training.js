// selected id from index.php
var id_global;
var dir_global = true;
// array for receiving file data from server.php
var arr;
// correct answer (button)
var answer;

$.fn.animateRotate = function(angle, duration, easing, complete) {
    var args = $.speed(duration, easing, complete);
    var step = args.step;
    return this.each(function(i, e) {
        args.complete = $.proxy(args.complete, e);
        args.step = function(now) {
            $.style(e, 'transform', 'rotate(' + now + 'deg)');
            if (step) return step.apply(e, arguments);
        };

        $({deg: 0}).animate({deg: angle}, args);
    });
};

function randomInt(min, max) {
    return Math.floor((Math.random() * (max - min + 1) + min));
}

function randomIntArray(min, max, length) {

    // parameter validation
    if (max - min < 1) {
        return null;
    }
    var len = (length-1 <= (max - min) ? length : (max - min + 1));

    var numbers = [], array = [], random;
    for (var z = min, i = 0; z <= max; z++, i++){
        numbers[i] = z;
    }
    for(var j = max-min; len; len--, j--) {
        // select random number from numbers
        random = randomInt(0, j);
        // add number to final array
        array.push(numbers[random]);
        //delete that number from numbers
        numbers.splice(random, 1);
    }
    return array;
}

function getNewVocab(direction){
    // random numbers for vocabulary
    var random = randomIntArray(0, arr.count-1, 5);
    // random numbers to place items in list (right box)
    var random_item = randomIntArray(0, 4, 5);
    //alert(random);
    //alert(random_item);


    // update correct answer
    answer = random_item[0];
    dir_global = direction;

    // fill left box
    var leftContent = arr.content[random[0]][(direction ? 0 : 1)].split(', ', 2);
    document.getElementById('left-box-h1').innerHTML = leftContent[0];
    if (leftContent[1]) {
        document.getElementById('left-box-p').innerHTML = leftContent[1];
    } else {
        document.getElementById('left-box-p').innerHTML = '';
    }
    // fill right box
    for(var i = 0; i < 5; i++) {
        document.getElementById('btn-' + random_item[i]).innerHTML = arr.content[random[i]][(direction ? 1 : 0)];
    }
}

function ready(id) {
    id_global = id;
    // ajax request for selected training file contents
    $.ajax({
        type: 'POST',
        url: 'server.php',
        data: { mode:'id', id: id_global },
        success: function (json) {
            arr = $.parseJSON(json);
            // fill language bar with language 1 + 2
            // document.getElementById('language-1').innerHTML = arr.lang1 + ' - ' + arr.lang2;
            // document.getElementById('language-2').innerHTML = arr.lang2 + ' - ' + arr.lang1;
            nextVocab();
        }
    });

    // fade in elements
    //$('#language-bar').animate({opacity: '1.0'},100);
    //$('#left-box').animate({opacity: '1.0'}, 100);
    //$('#right-box').animate({opacity: '1.0'}, 100);
}

// function navClick(elem, event) {
//     event.preventDefault();
//     if (!elem.classList.contains("active")){
//         elem.classList.toggle("active");
//         if (elem.id === "language-1"){
//             document.getElementById("language-2").classList.toggle("active");
//             getNewVocab(true);
//         }
//         else if (elem.id === "language-2") {
//             document.getElementById("language-1").classList.toggle("active");
//             getNewVocab(false);
//         }
//     }
// }

function nextVocab () {
    var wrapper = document.getElementById('right-box-wrapper');
    var html = '<div id="right-box" class="list-group list-transparent">';
    for (var i=0; i<5; i++) {
        html += '<button id="btn-'+ i +'" type="button" class="list-group-item wordwrap" onclick="answerChosen(this);"></button>';
    }
    html += '</div>';
    wrapper.innerHTML = html;
    getNewVocab(dir_global);
    $('#right-box').animate({opacity: 1}, 150);
}

function answerChosen(button) {
    var wrapper = $('#right-box-wrapper');
    if (button.id === 'btn-' + answer) {

        wrapper.animate({opacity: 0}, 100, function () {
            wrapper.html('<div class="jumbotron jumbotron-transparent-correct"><h1>Richtig!</h1><p>'+
                button.innerHTML +'</p><button type="button" class="btn btn-default" onclick="nextVocab();">Weiter</button></div>');
            wrapper.animate({opacity: 1}, 100);
        });

        $.ajax({
            url: 'server.php',
            type: 'POST',
            data: { mode: 'stat', id: id_global, answer: 1 },
            success: function (ret) {
               // alert(ret);
            }
        });
    }
    else {
        var correct = document.getElementById('btn-' + answer).innerHTML;
        wrapper.animate({opacity: 0}, 100, function () {
            wrapper.html('<div class="jumbotron jumbotron-transparent-wrong"><h1>Falsch!</h1><p><s>'+
                button.innerHTML +'</s><p>'+ correct +'</p></p><button id="button-next" type="button" class="btn btn-default" onclick="nextVocab();">Weiter</button></div>');
            wrapper.animate({opacity: 1}, 100);
        });

        $.ajax({
            url: 'server.php',
            type: 'POST',
            data: { mode: 'stat', id: id_global, answer: 0 },
            success: function (ret) {
               // alert(ret);
            }
        });
    }
}

$('#language-swap').click(function () {
    $(this).toggleClass("swapped");
    dir_global = !dir_global;
    getNewVocab(dir_global);
});