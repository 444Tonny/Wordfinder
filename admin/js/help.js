
/* Help */

document.getElementById('help').addEventListener('click', function() {

    document.getElementById('manual').style.display = 'flex';
});

document.getElementById('manual-close').addEventListener('click', function(e) {
  
    document.getElementById('manual').style.display = 'none';
})
