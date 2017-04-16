
function newListItem() {
    document.getElementById("training-list").innerHTML += "<button type='button' class='list-group-item list-item-custom-1' onclick='newListItem();'><div class='pull-left' style='margin-top: 3px'>Deutsch - Französisch</div><div class='pull-right vertical-align'><span class='badge' style='margin-right: 5px'>123</span><i class='material-icons'>chevron_right</i></div></button>";
}

function listItemClicked(src) {
   window.location.href = 'training.php?id=' + src.id;
}

function loadEntries() {
    var newhtml = '';
    $.ajax({
        url: 'server.php?mode=list',
        type: 'GET',
        success: function (json) {
            //alert(json);
            var arr = $.parseJSON(json);
            for(var i=0; i < arr.length; i++){
                newhtml += '<button id="'+ i +'" type="button" onclick="listItemClicked(this);" class="list-group-item list-item-custom-1"><div class="pull-left" style="margin-top: 3px">'+ arr[i].name +'</div><div class="pull-right vertical-align"><span class="badge" style="margin-right: 5px">'+arr[i].line_cnt+'</span> <i class="material-icons">chevron_right</i></div></button>';
            }
            document.getElementById("training-list").innerHTML = newhtml;
            $('#training-list').animate({opacity: '1.0'},200);
        }
    });
}


$(document).ready(function () {
    loadEntries();
});

function post(path, parameters) {
    var form = $('<form></form>');

    form.attr("method", "post");
    form.attr("action", path);

    $.each(parameters, function(key, value) {
        var field = $('<input></input>');

        field.attr("type", "hidden");
        field.attr("name", key);
        field.attr("value", value);

        form.append(field);
    });

    // The form needs to be a part of the document in
    // order for us to be able to submit it.
    $(document.body).append(form);
    form.submit();
}