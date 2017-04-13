
function newListItem() {
    document.getElementById("training-list").innerHTML += "<button type='button' class='list-group-item list-item-custom-1' onclick='newListItem();'><div class='pull-left' style='margin-top: 3px'>Deutsch - Französisch</div><div class='pull-right vertical-align'><span class='badge' style='margin-right: 5px'>123</span><i class='material-icons'>chevron_right</i></div></button>";
}

function loadEntries() {
    //$('#training-list').load('server.php?mode=list');

    var newhtml = '';

    $.ajax({

        url: 'server.php?mode=list',
        type: 'GET',
        success: function (json) {
            alert(json);


            var arr = $.parseJSON(json);
            for(var i=0; i < arr.length; i++){
                newhtml += '<button type="button" class="list-group-item list-item-custom-1"><div class="pull-left" style="margin-top: 3px">'+ arr[i].name +'</div><div class="pull-right vertical-align"><span class="badge" style="margin-right: 5px">'+arr[i].line_cnt+'</span> <i class="material-icons">chevron_right</i></div></button>';
            }
            document.getElementById("training-list").innerHTML = newhtml;

        }

    });

}


$(document).ready(function () {
    loadEntries();
});
