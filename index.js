$(function(){
    var topping_source=$("#topping-template").html()
    var topping_template=Handlebars.compile(topping_source);

    var crust_source=$("#crust-template").html()
    var crust_template=Handlebars.compile(crust_source);

    var order_count_source=$("#order-count").html()
    var order_count_template=Handlebars.compile(order_count_source);
    
    Parse.initialize('vasylynka');
    Parse.serverURL="http://localhost:1337/parse";
    
    var Order=Parse.Object.extend("Order");

    $(".form-group").hide();
    $(".table.table-bordered").hide();
    $("#order").click(function(){
        $(".form-group").show();

    })

    function takeOrder(){
        var order = new Order();
        order.save({
            topping: $("#topping").val(),
            crust: $("#crust").val()
        }, {
            success:function(order){
                $("#message").addClass("alert alert-success").html("Success" + order.get("topping") + '+' + order.get("crust") + " taken");
            },
            error:function(order, error){
                $("#message").addClass("alert alert-error").html("Error" + order.get("topping") + '+' + order.get("crust")+ " not taken");
            }
        })

    }

    $("#order-button").click(function(){
        console.log('Click');
        $("#topping").hide();
        $("#crust").hide();
        $(".table.table-bordered").hide();
        takeOrder();
        var query=new Parse.Query(Order);
        query.equalTo("")

    })

    function getToppingById(id){
        for (var i in order_topping){
            if(library[i].id==id)
                return order_topping[i]
        } 
        return {}

        
    }
});