$(document).ready(function(){
    
    // shows information to complete order
    $('.btn').click(function(){
        $('.order').show();
    })
    
    // hides the information
    $('#cancel').click(function(){
        $('.order').hide();
    })
});