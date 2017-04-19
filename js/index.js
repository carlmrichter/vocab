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
            for(var i=0; i < arr.length; i++){
                newhtml += '<button id="'+ i +'" type="button" onclick="listItemClicked(this);" class="list-group-item list-item-custom-1"><div class="pull-left list-text" style="margin-top: 3px">'+ arr[i].name +'</div><div class="pull-right vertical-align"><span class="badge" style="margin-right: 5px; background-color: #333;">'+arr[i].line_cnt+'</span><i class="material-icons" style="color:#333;">chevron_right</i></div></button>';
            }
            document.getElementById("training-list").innerHTML = newhtml;
            $('#training-list').animate({opacity: '1.0'},200);
        }
    });
}

$(document).ready(function () {
    loadEntries();
});
