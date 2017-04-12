
function newListItem() {
    document.getElementById("training-list").innerHTML += "<button type='button' class='list-group-item list-item-custom-1' onclick='newListItem();'><div class='pull-left' style='margin-top: 3px'>Deutsch - Französisch</div><div class='pull-right vertical-align'><span class='badge' style='margin-right: 5px'>123</span><i class='material-icons'>chevron_right</i></div></button>";
}

