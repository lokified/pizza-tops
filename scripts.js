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
    });
});