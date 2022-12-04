let popupAlreadyShowed = false

function changePassword(id)
{
    if( ! popupAlreadyShowed ) {
        document.getElementById('popup').style.display = 'block';
        document.getElementById("id_admin").value = id;
    }
}

document.getElementById('popup-close').addEventListener('click', function(e) {
    document.getElementById('popup').style.display = 'none'
})