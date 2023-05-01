import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { HttpClient } from '@angular/common/http';
import { DbseviceService } from '../dbservice.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  public product :any =[];
  public grandTotal :number = 0;
  ttl: number|any;
  granttotal: any|number;
  loggedemailid: string | any;
  cart: any=[];
  id: any;
  
  constructor( private cartservice:CartService,private http:HttpClient,private dbservice:DbseviceService) { }

  ngOnInit() {
    this.dbservice.getusersdetails().subscribe((o)=>{
      const user =o.find((u:any)=>{
        this.loggedemailid=localStorage.getItem('loggedemailid');

        return u.emailid === this.loggedemailid;

      })

      this.product=user.order;
    })
  }


  removeitem(cart:any|string){
    
      this.id=this.cart.id
    this.http.delete<any>("http://localhost:3000/order/"+cart.id).subscribe(data=>{
      alert("removed item");
    })

   
        
    

}

  

  emptycart(){
this.http.patch<any>("http://localhost:3000/users/"+this.loggedemailid,{order:[]}).subscribe((y)=>{
      console.log("quant",y)
    });
    this.product=[];
  }

  incrementquantity(item:any|number){
    item.quantity++;
   
    
  }
  decrementquantity(item:any){
    // if(item.quantity>1){
    //   item.quantity--;
    // }
    this.cartservice.Decrementqty(item);
  }
  getCartTotal() {
    let total = 0;
    for (const item of this.product) {
      total += item.price * item.quantity;
    }
    
    return total;
  }
}
