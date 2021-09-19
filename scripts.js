// Business logic
function totalOrders(size,crust,topping,orders){
    this.size = size;
    this.crust = crust;
    this.toppings = topping;
    this.orders = orders;
}

totalOrders.prototype.totalCharges = function(){
    return (this.size + this.crust + this.toppings || this.size + this.crust || this.crust + this.toppings || this.size + this.toppings) * this.orders;
} 

  //Adds delivery charges
  totalOrders.prototype.addDeliveryCharge = function(){
    return ((this.size + this.crust + this.toppings || this.size + this.crust || this.crust + this.toppings || this.size + this.toppings) * this.orders) + 150;
  }

// user interface
$(document).ready(function(){
    
    // shows information to complete order
    $('.btn').click(function(){
        $('.order').show();
    });
    
    // hides the information
    $('#cancel').click(function(){
        $('.order').hide();
    });

    // collects values of the order
    $('#total-charge').last().click(function(){
        let size = parseInt($('input:radio[name=size]:checked').val());
        let crust = parseInt($('input:radio[name=crust]:checked').val());
        let topping =[];
            $.each($('input:checkbox[name=topping]:checked'),function(){
                topping.push(parseInt($(this).val()))
            });
            let totalToppings = 0;
            for(let i=0; i<topping.length; i++){
                totalToppings += topping[i];
            }
        let numberOfPizza = parseInt($('#orders-selected').val());

        let totalPizzaCharge = new totalOrders(size,crust,totalToppings,numberOfPizza);

        $('#pizzaCharges').text("Ksh."+totalPizzaCharge.totalCharges());

        // Adds location to summary
        $('#add-location').click(function(event){
            event.preventDefault();

            // Adds delivery charges
            let deliveryCharge = new totalOrders(size,crust,totalToppings,numberOfPizza);

            $('#pizzaCharges').text("Ksh."+deliveryCharge.addDeliveryCharge());
             
            // collects delivery location
            let deliveryLocation = $('#location').val();

            $('s-location').text(deliveryLocation);

            // alert the user a message
            alert(" your order will be delivered to your location-"+deliveryLocation);
            

            // hides delivery info
            $('.delivery-info').hide();
        });
    });
});