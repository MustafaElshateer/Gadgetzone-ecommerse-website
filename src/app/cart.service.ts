import { HttpClient,  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DbseviceService } from './dbservice.service';
import { map } from 'rxjs';
import { JsonPipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  Userid:any|string;
  uname :number|undefined;
  public cartitems:any[]=[];
  public productlist =new BehaviorSubject<any>([]);
  jsonObject:any;
 public data:any=[];
public email2:any;
 public cart:any=[];
  loggedemailid: any | string;


constructor(private http:HttpClient,private dbservice:DbseviceService) { }

ngOnInit(){
 
}


getProducts(){
  return this.productlist.asObservable();
}

// setproduct(product :any){
//   this.cartitems.push(product);
//   this.productlist.next(product);
// }


store:any="";
orderarray:any;
order:any={};


addtocart(a:any) {
  this.http.get<any>("http://localhost:3000/users/").subscribe((z)=>{
  const user1=z.find((data2:any)=>{
    this.loggedemailid=localStorage.getItem('loggedemailid');
    this.store=data2;
    console.log(data2,'data2')
    this.orderarray=this.store.order;
    return data2.emailid === this.loggedemailid;
   

  });

console.log(this.loggedemailid,"userDetails")
  if(user1){
    if(this.store.order != null){
      alert('Cart Order Added Successfully');
      this.orderarray.push(a);
      console.log("CART getted ",a);
      this.http.patch<any>("http://localhost:3000/users/"+ this.loggedemailid,{order:this.orderarray}).subscribe((o)=>{

      console.log("added ",o);

      });
    }
    else{
      alert("Order Added");
      console.log("mail",this.loggedemailid);
       console.log("order",[a]);
      this.http.patch<any>("http://localhost:3000/users/" + this.loggedemailid , {order:[a]}).subscribe((y)=>{
        console.log("order",y);

      });
      
    }
  }
  else{
    alert("user not found");
  }
    })
  
  // this.jsonObject.users[0].cart.push(this.cartitems);
  //can be called where ever needed
  // this.Userid=localStorage.getItem('userid');

  // this.http.get<any>("http://localhost:3000/users").subscribe(res=>{
  //   const user = res.find((a:any)=>{
  //     return a.userid === this.Userid;
      
  //   })
  //   console.log("hey",user);
  //   user.cart.push(this.cartitems);

  // this.uname=this.Userid;
  // console.log("yeah",this.uname);


  
 
    
    
      //  this.http.post<any>("http://localhost:3000.users",this.cartitems).subscribe(data=>{
      //    alert("data added successfully");
      //  }) 
    
  


  

  // this.productlist.next(this.cartitems);
  // this.gettotalprice();
  // console.log("added",this.cartitems);
  

}

gettotalprice():number{

let grandtotal =0;
this.cartitems.map((a:any)=>{
  grandtotal += a.total;
})
return grandtotal;
}

Decrementqty(item:any|number){
 if(item.quantity>1){
     item.quantity--;
     }
console.log(item)
 this.dbservice.getusersdetails().subscribe((data)=>{
   
      const user = data.order.forEach((item:any)=>{
          console.log(item.order);
      })
 })


}

removecartitem(product:any){
  this.cartitems.map((a:any, index:any)=>{
    if(product.id===a.id){
      this.cartitems.splice(index,1);
      this.productlist.next(this.cartitems);
    }
  })


}


emptycart(){
  this.cartitems =[];
  this.productlist.next(this.cartitems);
}


}

