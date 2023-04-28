
// PLUS MINUS 

$(document).ready(function() {
    $('.minus').click(function () {
        var $input = $(this).parent().find('input.delay-value');
        var sliced = $input.val().slice(0,-3);
        var count = parseInt(sliced) - 1;
        count = count < 0 ? 0 : count;
        $input.val(count + "min");
        $input.change();
        return false;
    });
    $('.plus').click(function () {
        var $input = $(this).parent().find('input.delay-value');
        var sliced = $input.val().slice(0,-3);
        $input.val(parseInt(sliced) + 1 + "min");
        $input.change();
        return false;
    });
});