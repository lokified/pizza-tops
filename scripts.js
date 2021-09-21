// Business logic
function totalOrders(size, crust, topping, orders) {
    this.size = size;
    this.crust = crust;
    this.toppings = topping;
    this.orders = orders;
}

totalOrders.prototype.totalCharges = function () {
    return (this.size + this.crust + this.toppings) * this.orders;
}

let totalCost = 0;

// user interface
$(document).ready(function () {

    // shows information to complete order
    $('.btn').click(function () {
        $('.order').show();
    });

    // hides the information
    $('#cancel').click(function () {
        $("form")[0].reset();
        $('.order').hide();
    });

    
    $('form#order').last().submit(function (event) {

        event.preventDefault();

        // collects values of the order
        let size = parseInt($('input:radio[name=size]:checked').val());
        let crust = parseInt($('input:radio[name=crust]:checked').val());
        let topping = [];
        $.each($('input:checkbox[name=topping]:checked'), function () {
            topping.push(parseInt($(this).val()))
        });
        let totalToppings = 0;
        for (let i = 0; i < topping.length; i++) {
            totalToppings += topping[i];
        }


        // display selected values in a summary
        let idSize = $('input:radio[name=size]:checked').attr('id');
        let idCrust = $('input:radio[name=crust]:checked').attr('id');
        let idToppings = [];
        $.each($('input:checkbox[name=topping]:checked'), function () {
            idToppings.push($(this).attr('id'));
        });

        let numberOfPizza = parseInt($('#orders-selected').val());
         
        $('.first-summary').show();
        $('.first-summary').append(
            "<tr>"+
            "<td>"+idSize+"</td>"+
            "<td>"+idCrust+"</td>"+
            "<td>"+idToppings +"</td>"+
            "<td>"+numberOfPizza+"</td>"+
        "</tr>"
        );


        //calculates total number of pizza

        let pizzaCharge = new totalOrders(size, crust, totalToppings, numberOfPizza);

        $('.pizzaCharges').text("Ksh." + pizzaCharge.totalCharges());

        // resets the form
        $("form#order")[0].reset();
        
        // Shows the total charges
        totalCost += pizzaCharge.totalCharges();

        $('.pizzaCharges').text("Ksh."+totalCost);

    });

    // options for delivery or not
    let deliverSelected = $('#show-delivery');
    let noDeliver = $('#show-no-delivery');

    if(deliverSelected){ 
        
        $('#show-delivery').click(function(){
            $('.pick-up').hide();
            $('.delivery-info').toggle(1000);
        });
        $('.delivery-info form').submit(function (event) {
    
            event.preventDefault();
    
            // adds delivery charges
            $('.pizzaCharges').text("Ksh."+(totalCost + 150));
    
            let yourName = $("#yourName").val();
            alert(yourName+ ",your order will be delivered to your location");
    
            $('.delivery-info').hide();
        });
        
    }
    if(noDeliver){
        
        $('#show-no-delivery').click(function(){
            $('.delivery-info').hide();
            $('.pick-up').toggle(1000);
        });
        $('.pick-up form').submit(function (event) {
    
            event.preventDefault();
            let yourName2 = $("#yourName").val();
            alert(yourName2 + ",come pick your order in 40 minutes");

            $('.pick-up').hide();
        });
    }


      // shows the final total charges 
    $('#checkout').click(function(){
        $('.order-info').hide();
        $('.summary-confirm').show();
    });

    // confirming order
    $('#confirm').submit(function(){
       alert("Thank you for choosing us!");
    });
});