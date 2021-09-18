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
    })
    
    // hides the information
    $('#cancel').click(function(){
        $('.order').hide();
    })
});