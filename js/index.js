function listItemClicked(src) {
   window.location.href = 'training.php?id=' + src.id;
}

function loadEntries() {
    var newhtml = '';
    $.ajax({
        url: 'server.php',
        type: 'POST',
        data: { mode: 'list'},
        success: function (json) {
            //alert(json);
            var arr = $.parseJSON(json);
            if (arr.length === 0) {
                document.getElementById('content-wrapper').innerHTML = '<div class="jumbotron jumbotron-transparent">' +
                    '<h1>Keine Lektionen vorhanden</h1><p>Du kannst neue Lektionen in den Einstellungen hinzufügen.</p></div>';
            }
            for(var i=0; i < arr.length; i++){
                newhtml += '<button type="button" id="'+i+'" onclick="listItemClicked(this)" class="list-group-item list-group-item-action"><span class="float-left">'+ arr[i].name +'</span><span class="float-right vertical-align"><span class="badge badge-pill badge-default">'+arr[i].line_cnt+'</span><i class="material-icons">chevron_right</i></span></button>';
            }
            document.getElementById("training-list").innerHTML = newhtml;
            //$('#training-list').animate({opacity: '1.0'}, 100);
        }
    });
}

$(document).ready(function () {
    loadEntries();
});

// $('#menu-toggler').click(function () {
//    if ($(this).hasClass('collapsed'))
//        $('#mainNavBar').addClass('toggled');
//    else
//        $('#mainNavBar').removeClass('toggled');
// });
