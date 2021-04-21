<template>

 <div>
   
   <v-container style="margin: auto" v-if="cart.length===0">
     <v-row>
       <v-col class="col-8" style="margin: auto">
         <img src="http://localhost:9000/files/products/cart.png" alt="">
         <div class="text">Giỏ hàng chưa có sản phẩm nào</div>
         <div><router-link to="/">Quay lại trang chủ</router-link></div>
       </v-col>
      
     </v-row>
   </v-container>
    <v-container v-else>
   
    <v-row  style="background: #f2f2f2">
      <v-col class="col-9">
        
        <v-container>
          
          <v-row >
            GIỎ HÀNG
            <span class="caption mt-1 ml-2"
              >({{ cart.length}} sản phẩm)</span
            >
          </v-row>
        </v-container>
      </v-col>
      <v-col class="col-3"> </v-col>
    </v-row>

   
    <v-row>
      <v-col class="col-9">
        <v-container>
          
          <v-row v-for="item in cart" v-bind:key="item.id" class="border_bottom">
            <v-col class="col-2 ">
              <v-img
                width="100"
                height="90"
                v-bind:src="'http://localhost:9000/files/'+item.avatar"
              >
              </v-img>
            </v-col>

            <v-col class="col-4 pt-8">
              
                
                <span class="name_product">{{item.name}}</span>
              
            </v-col>
            <v-col class="col-2 pt-8">
               <h4> {{item.price}}đ</h4>
            </v-col>
            <v-col class="col-2 pt-8">
               <div style="display: flex">
                    <!-- <span>-</span> -->
               <input type="number" v-model.number="item.amount" min="1" max="99" @change="editItemInCart(item)" class="input_amount">
                <button class="deleteItem" @click="deleteItemInCart(item)">Xóa</button>
               </div>
            </v-col>
            <v-col class="col-2 pt-8">
              <span class="name_product">{{calculator(item)}}</span>
            </v-col>
          </v-row>
           
        </v-container>
      </v-col>
      <v-col class="col-3 check_out">
          <div class="border_bottom title_checkOut">
            THAN TOÁN
          </div>
          <div>
              <span class="caption">Tạm Tính</span> <span>{{total}}</span>

          </div>
          <hr>
          <div><span class="caption">Thành Tiền</span> <span>{{total}}</span> </div>
          <div class="mt-2">
              <button style="background:red; color: white; width: 100%" @click="check_out">Tiến hành đặt hàng</button>
          </div>
         </v-col>

    </v-row>
  </v-container>
 </div>
</template>

<script>
import { mapState} from "vuex";
export default {
  
  
  computed: {
     ...mapState({
        cart:state=>state.cart.cart,
        user: state=> state.user,
        dialog: state=>state.dialog,
      }),
    total()
    {
      var t=0;
      for(let i=0; i<this.cart.length; i++)
      {
        t+=this.cart[i].amount * this.cart[i].price;
      }
      return t;
    }
  },
  methods: {
    check()
    {
    
      // this.$router.push("/Check-Out")
       if( this.user.token=== '')
     {
       console.log(this.user.token)
         this.$message({
          message: 'Bạn cần phải đăng nhập.',
          type: 'warning'
        });
         this.$store.commit('CHANGE_LOGIN',true);
     }
     else{
       this.$router.push("/Check-Out")
     }
    },
    check_out()
    {
    
      this.check()
      
    },
    editItemInCart(item)
    {
        this.$store.commit('editItemInCart',item);
    },
    deleteItemInCart(item)
    {
      this.$store.commit('deleteItemInCart',item);
    },
    calculator(item)
    {
      return item.price * item.amount;
    }
  },
};
</script>

<style scoped>
.border_bottom{
  border-bottom: 2px solid #eee;
}
.name_product{
  color: #000;
  font-size: 14px;
  text-decoration: none;
  padding-top: 70px;
   font-weight: 400;
  
}
.input_amount{
  border: 2px solid #eee ;
  text-align: center;
  height: 30px;
  border-radius: 7px;
}
.check_out{
  margin-top: 20px;
  border: 2px solid #eee;
  height: 200px;
}
.title_checkOut{
  text-align: center;
}
.deleteItem{
  border: 2px solid #eee;
  margin-left: 10px;
  
  height: 30px;
  width: 80px;
  border-radius: 5px;
}
.text{
  color: rgb(33, 221, 64);
  font-size: 14px;
}
</style>
