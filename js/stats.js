var count = 0;
var bars = [];

$(document).ready(function () {
    $.ajax({
        url: 'server.php',
        type: 'POST',
        data: { mode: 'get_stats'},
        success: function (json) {
            var stats,
                html = '',
                total_answered = 0,
                total_correct = 0,
                filename, answered, wrong, correct;;
            try {
                stats = $.parseJSON(json);
            } catch (err) {

                document.getElementById('stats-wrapper').innerHTML = '<div class="col-md-12" style="padding: .7rem">' +
                    '<div class="jumbotron jumbotron-transparent-dark"><h1>Du hast noch nichts geübt!</h1></div></div>';
                return;
            }

            for (var key in stats){
                if (!stats.hasOwnProperty(key)) continue;
                var obj = stats[key];
                if (obj.hasOwnProperty('filename')) {
                    filename = obj['filename'].replace('.txt', '');
                    obj.hasOwnProperty('answered') ? answered = obj['answered'] : answered = 0;
                    obj.hasOwnProperty('correct') ? correct = obj['correct'] : correct = 0;
                    wrong = answered - correct;
                    total_answered += answered;
                    total_correct += correct;
                    count++;
                    bars[count] = [answered, correct];
                    html += '<div class="col-lg-4 col-sm-6 col-xs-12" style="padding: .7rem">' +
                        '<div class="jumbotron jumbotron-transparent-dark" style="margin: 0;">' +
                        '<h2>'+ filename +'</h2>'+ obj['lang1'] + ' - '+ obj['lang2'] +'<br><br><div class="progress" style="background-color: transparent">' +
                        '<div id="correct-'+ count +'" class="progress-bar progress-bar-success" style="width: 0"></div>' +
                        '<div id="wrong-'+ count +'" class="progress-bar progress-bar-danger" style="width: 0"></div>' +
                        '</div>Gesamt: '+ answered +' | Richtig: '+ correct +' | Falsch: '+ wrong +' </div></div>';
                }


            }
            bars[0] = [total_answered, total_correct];
            var html_total = '<div class="col-md-12" style="padding: .7rem">' +
                '<div class="jumbotron jumbotron-transparent-dark" style="margin: 0;">' +
                '<h1>Alle Lektionen</h1><div class="progress" style="background-color: transparent; height: 4rem">' +
                '<div id="correct-0" class="progress-bar progress-bar-success" style="width: 0"></div>' +
                '<div id="wrong-0" class="progress-bar progress-bar-danger" style="width: 0"></div></div>' +
                '<p>Gesamt: '+ total_answered +' | Richtig: '+ total_correct +' | Falsch: '+ (total_answered-total_correct) +'</p></div></div>';
            document.getElementById('stats-wrapper').innerHTML = html_total + html;
            animateProgressBars();
        }
    });
});

function animateProgressBars() {
    for(var i = 0; i < count + 1; i++){
        var correct_int = Math.round(bars[i][1] / bars[i][0] * 100);
        var wrong_int = Math.round((bars[i][0] - bars[i][1]) / bars[i][0] * 100);
        if (correct_int+wrong_int > 100){
            wrong_int--;
        }
        var correct = correct_int + '%';
        var wrong = wrong_int + '%';
        //alert('C=' + correct+'('+(bars[i][1] / bars[i][0] * 100)+')' + ', W=' + wrong + '('+((bars[i][0] - bars[i][1]) / bars[i][0] * 100)+')');
        //document.getElementById('correct-'+i).style.width = correct;
        //document.getElementById('wrong-'+i).style.width = wrong;
        $('#wrong-' + i).animate({width: wrong}, {duration: 200}, 'linear');
        $('#correct-' + i).animate({width: correct}, {duration: 200}, 'linear');


    }


}