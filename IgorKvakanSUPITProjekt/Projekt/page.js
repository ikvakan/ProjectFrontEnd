
 const jsonFulek="http://www.fulek.com/VUA/SUPIT/GetCategoriesAndFoods";
 
 var cart=[]; //polje

 var Item=function(id,name,quantity,price){ //konstruktor za  Item
    this.Id=id;
    this.Name=name;
    this.Quantity=quantity;
    this.Price=price;
    this.toString=function(){
        return `${this.Id} ${this.Name} ${this.Quantity} ${this.Price} kn`;
    };
    this.getId=function () {
        return parseInt(this.ID);
    }
}


Item.prototype.itemCost=function () {
        return `${this.Quantity * this.Price}`;
}  
 

function createItem() {

    var id=parseInt($(".nazivJela").attr("data-id"));
    var name=$(".nazivJela").html();
    var quantity=parseInt($(".quantity-input").val());
    var price=parseInt($("#price").attr("data-price"));
    
    return new Item(id,name,quantity,price);
}

function addItemToCart(item) {
/*
    cart.forEach(element => {
        if (element.Id===item.Id) {
            element.Quantity+=item.quantity;
           return;
        }
    });
*/      
            cart.push(item);
            
}
 




function totalCostInCart() 
{
    var total=0;
    cart.forEach(element => {
        total+=parseInt(element.itemCost());    
    });    
    console.log(total);
    
    return total;
}

$(function () {


/*.........................................JSON...........................*/
$.getJSON(jsonFulek,
    function (data) {
      console.log(data);
      
       for(var i=0; i < data.length;i++){
         $(".meni-order").append(createH2(data[i].Id,data[i].Naziv));

         data[i].Ponuda.forEach(element => {
        $(".meni-order").append(createTable(element.JeloId,element.Naziv,element.Opis,element.Cijena));
            
            
        });
    }
         
    /*....................................GET DATA.............................*/
    getDataFromSubDialog();



});


/*....................................DIALOG................................*/
var animationDialog={
    effect: 'fade',
    duration: 300
   // hide: {effect: 'fade', duration: 5000}
}

    
    var orderDialogPostavke={
        modal:true,
        autoOpen:false,
        width:1200,
        show:animationDialog,
        hide:animationDialog,
        height:800,
        buttons:[
            {
                text:"Close",
                click:function(){
                    $(this).dialog("close");
                }
            },
            {
               text:"Clear all",
               click:function () {
                cart=[]; //delete from cart
                $(".remove").remove();
                
                }
            }
        ]
    }
    
    $(".content-order").dialog(orderDialogPostavke);
    $(".ui-dialog-titlebar").hide();  

                    
                


    $("#btn-order").on("click",function(){
        $(".content-order").dialog("open");
    });

    /*.......................................SUB-DIALOG....................................*/

        var animationSubdialod={
            effect: 'slide',
            duration: 300
        }

    var subDialogPostvavke={
        modal:true,
        autoOpen:false,
        show:animationSubdialod,
        hide:animationSubdialod,
        width:400,
        height:400,
        draggable:true,
        buttons:{
            "Order":function () {
                var item=createItem();
                addItemToCart(item);
                var cost=totalCostInCart();
                $("#total").remove(); 
                
                $(".table").append(createOrderTable(item,cost));
                
              
                $(".quantity-input").val(1); // set quant to 1
                $(this).dialog("close");
            },
            "Close":function () {
                $(".quantity-input").val(1);
                $(this).dialog("close");
                
            }
        }
    }
    
   
    $(".sub-dialog").dialog(subDialogPostvavke);
    $(".ui-dialog-titlebar").hide();
    
      
}); 
        
        /*----------------------GETDATA...............................*/

function getDataFromSubDialog() {

    $(".meni-jelo").click(function (e) {
        e.preventDefault();
        //Naziv i ID
        var jelo=$(this).text();
        var id=$(this).attr("data-id");
        $(".nazivJela").attr("data-id",id);
        $(".nazivJela").text(jelo);
        //Cijena
        var price=$(this).attr("data-price");
        $("#price").attr("data-price",price);

        $(".sub-dialog").dialog("open");
    });
}        

        
    
/*       
function onClickRemove(){
    $(".remove").click(function () {
        $(this).remove();  
        $("#total").remove();
        
    });
       
    
}
*/

//...................TEMPLATE....................

function createH2(id,tekst){
    var h2=`<h2 id=${id}>${tekst}</h2>`;
    return h2;
}


function createTable(jeloID,jelo,opis,cijena)
{
    var table=`
    <table class="meni-table">
                <tr>
                    <td ><span class="meni-jelo" data-price=${cijena<0 ? 0:cijena} data-id=${jeloID}>${jelo}</span></td>
                                 
                    <td rowspan="2" id="price" data-price="" >${cijena<=0 ? 0: cijena } kn </td>
                </tr>
                <tr>
                    <td><span id="opis">${opis}</span></td>
                </tr>
            </table>
            `;
            return table;
}
            
         
    

function createOrderTable(podaciItem,cost) {

    var tr=`
    <tr class="remove" id="orderTable"  >
    <td id="podaci-id">${podaciItem.Id}</td>
    <td id="podaci-name">${podaciItem.Name}</td>
    <td id="podaci-quantity">${podaciItem.Quantity} </td>
    <td id="podaci-price">${podaciItem.itemCost()} kn</td>
    <td id="remove-row" onclick="onClickRemove()" style="cursor:pointer; color:red;"></td>
    </tr>
    <tr class="remove" id="total">
        <td></td>
        <td></td>
        <td >Total</td>
        <td class="item-cost"  >${cost} kn</td>
    </tr>
    `;
    return tr;
}
                




    
    
    
      
        

    


                


                
                

    
    
    








    
    
   



    




            

