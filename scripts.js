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

    // collects values of the order
    $('form#order').last().submit(function (event) {

        event.preventDefault();

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

    $('#show-delivery').click(function(){
        $('.delivery-info').show(1000);
    })
    $('.delivery-info form').submit(function (event) {

        event.preventDefault();

        // adds delivery charges
        $('.pizzaCharges').text("Ksh."+(totalCost + 150));


        alert(" your order will be delivered to your location");

        $('.delivery-info').hide();
    });

      // shows the final total charges
    $('#checkout').click(function(){
        $('.order-info').hide();
        $('.summary-confirm').show();
    });
});