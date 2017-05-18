// selected id from index.php
var id_global;
var dir_global = true;
// array for receiving file data from server.php
var arr;
// correct answer (button)
var answer;
// counter for current vocable
var current = 0;
// array for shuffled vocable ids
var list;


function randomInt(min, max) {
    return Math.floor((Math.random() * (max - min + 1) + min));
}

function randomIntArray(min, max, length, exclude) {

    exclude = (typeof exclude === 'undefined') ? null : exclude;
    // parameter validation
    if (max - min < 1) {
        return null;
    }
    var len = (length-1 <= (max - min) ? length : (max - min + 1));

    var numbers = [], array = [], random;
    for (var z = min, i = 0; z <= max; z++){
        if (z === exclude) {
            continue;
        }
        numbers[i] = z;
        i++;
    }
    for(var j = numbers.length-1; len; len--, j--) {
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
    var random = [list[current]];
    random = random.concat(randomIntArray(0, arr.count-1, 4, list[current]));
    // random numbers to place items in list (right box)
    var random_item = randomIntArray(0, 4, 5);
    // alert("current="+ current);
    // alert("random="+random);
    // alert("random_item=" + random_item);


    // update correct answer and direction
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
        url: 'server/server.php',
        data: { mode:'get_file_content', id: id_global },
        success: function (json) {
            arr = $.parseJSON(json);
            list = randomIntArray(0, arr.count-1, arr.count);
            nextVocab();
        }
    });
}

function nextVocab () {
    if (current === arr.count) {
        current = 0;
        // reset progress bar
        $('#progress-lesson').css({width: 0});
        // shuffle vocables
        list = randomIntArray(0, arr.count-1, arr.count);
    }

    $('#language-swap').removeClass('toggle-disabled');
    var wrapper = $('#right-box-wrapper');
    var html = '<div id="right-box" class="list-group list-transparent">';
    for (var i=0; i<5; i++) {
        html += '<button id="btn-'+ i +'" type="button" class="list-group-item wordwrap" onclick="answerChosen(this);"></button>';
    }
    html += '</div>';
    wrapper.html(html);
    getNewVocab(dir_global);
    $('#right-box').animate({opacity: 1}, 150);

    // increment vocable index
    current++;
}

function answerChosen(button) {
    $('#language-swap').addClass('toggle-disabled');
    // update progress bar
    var newWidth = Math.round(current/(arr.count)*100);
    $('#progress-lesson').css({width: newWidth + "%"});

    var wrapper = $('#right-box-wrapper');
    if (button.id === 'btn-' + answer) {

        wrapper.animate({opacity: 0}, 100, function () {
            wrapper.html('<div class="jumbotron jumbotron-transparent-correct"><h1>Richtig!</h1><p>'+
                button.innerHTML +'</p><button type="button" class="btn btn-default" onclick="nextVocab();">Weiter</button></div>');
            wrapper.animate({opacity: 1}, 100);
        });

        $.ajax({
            url: 'server/server.php',
            type: 'POST',
            data: { mode: 'set_stat', id: id_global, answer: 1 },
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
            url: 'server/server.php',
            type: 'POST',
            data: { mode: 'set_stat', id: id_global, answer: 0 },
            success: function (ret) {
               // alert(ret);
            }
        });
    }
}

$('#language-swap').click(function () {
    if (!($(this).hasClass('toggle-disabled'))) {
        $(this).toggleClass("swapped");
        dir_global = !dir_global;
        getNewVocab(dir_global);
    }
});