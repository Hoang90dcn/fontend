<template>
  <v-container>
    <v-row>
      <v-col class="col-9">
        <div>
          <h3>1.Chọn hình thức giao hàng</h3>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="col-9">
        <div class="styles__Left">
          <v-radio-group v-model="shipping" >
            <v-radio
              checked="checked"
              label=" Giao Trong 2h-3h sau khi đặt hàng"
              value="39000"
            >
            </v-radio>
            <v-radio label="Giao Trong Ngày" value="30000"> </v-radio>
            <v-radio label="Giao Tiêu Chuẩn" value="15000"> </v-radio>
          </v-radio-group>
        </div>
      </v-col>
      <v-col class="col-3 styles__Right">
        <div>
          <h5>Đơn hàng ({{ cart.length }} sản phẩm)</h5>
        </div>
        <hr />
        <div v-for="item in cart" v-bind:key="item.id">
          <div class="caption">
            <span> {{ item.amount }} x {{ item.name }} </span>
            <br />
            <!-- <h4>{{item.totalMoney}}</h4> -->
          </div>
          <hr />
        </div>
        <div>
          <h5>Phí Giao hàng: {{ shipping }}</h5>
        </div>
        <hr />
        <div>
          <!-- <h4 style="color: red">Tổng đơn hàng: {{cart1.tatol}} đ</h4> -->
        </div>
        <button
          style="background: red; color: white; width: 100%"
          @click="addCart"
        >
          Tiến hành đặt hàng
        </button>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="col-9">
        <div>
          <h3>2.Nhập địa chỉ giao hàng</h3>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="col-9">
        <div class="styles__Left">
          <v-container>
            <v-row style="text-align: center">
              <v-col class="col-4"><h5 class="pt-6">Họ Tên</h5></v-col>
              <v-col class="col-8">
                <v-text-field v-model="firstname" label="Họ Tên"></v-text-field>
              </v-col>
            </v-row>

            <v-row style="text-align: center">
              <v-col class="col-4"><h5 class="pt-6">Số điện thoại</h5></v-col>
              <v-col class="col-8">
                <v-text-field v-model="firstname" label="Số điện thoại"></v-text-field>
              </v-col>
            </v-row>

            <v-row style="text-align: center">
              <v-col class="col-4"><h5 class="pt-6">Tỉnh/Thành Phố</h5></v-col>
              <v-col class="col-8">
                <v-select
                  v-model="city"
                  :items="cities"
                  menu-props="auto"
                  hide-details
                  label="Tỉnh"
                  item-text="name"
                  item-value="id"
                  single-line
                   @change="selectCity()"
                ></v-select>
              </v-col>
            </v-row>

            <v-row style="text-align: center">
              <v-col class="col-4"><h5 class="pt-6">Quận/huyện</h5></v-col>
              <v-col class="col-8">
                <v-select
               
                  v-model="district"
                  :items="districts"
                  menu-props="auto"
                  hide-details
                  label="Tỉnh"
                  single-line
                  item-text="name"
                  item-value="id"
                 @change="selectDistrict()"
                ></v-select>
              </v-col>
            </v-row>

            <v-row style="text-align: center">
              <v-col class="col-4"><h5 class="pt-6">Xã/Phường</h5></v-col>
              <v-col class="col-8">
                <v-select
                  v-model="ward"
                  :items="wards"
                  menu-props="auto"
                  hide-details
                  label="Xã Phường"
                  item-text="name"
                  item-value="id"
                  single-line
                ></v-select>
              </v-col>
            </v-row>
            <v-row style="text-align: center">
              <v-col class="col-4"><h5 class="pt-1">Điạ Chỉ</h5></v-col>
              <v-col class="col-8">
                <v-textarea color="black" label="Địa chỉ cụ thể"></v-textarea>
              </v-col>
            </v-row>
          </v-container>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "CheckOut",
  data() {
    return {
      shipping: 0,
      address: "Haf noi",
      city: '',
      district: '',
      ward: '',
        turnOnDistrict: false,
    };
  },
   async created() {
    this.loading = true;
    await this.$store.dispatch('getAllCity',1);
     this.loading = false;
  },
  computed: {
    ...mapState(["numberProduct","loading"]),
    ...mapState({
      cart: (state) => state.cart.cart,
      cities: state=>state.address.city,
      districts: state=>state.address.district,
      wards: state=>state.address.wards,
    }),
  },
  methods: {
    async addCart() {
      // if (this.shipping == null) {
      //   alert("Bạn phải chọn hình thức giao hàng");
      //   return;
      // }
      // if (this.address == null) {
      //   alert("Bạn điền địa chỉ nhận hàng");
      //   return;
      // }
      //this.$store.commit("SAVE_CART")
      //this.$router.push("/");
      this.$store.commit('CHANGE_LOADING',true);
      await this.$store.dispatch('saveCart');
       this.$store.commit('CHANGE_LOADING',false);
       this.$router.push("/");

    },
    selectCity()
    {
       this.$store.dispatch('getAllDistrict',this.city);
    },
    selectDistrict()
    {
      this.$store.dispatch('getAllWards',this.district);
    }
  },
};
</script>


<style>
.styles__Left {
  max-width: 100%;
  margin: 0px 0px 10px 30px;
  border: 1px solid rgb(239, 239, 239);
  border-radius: 4px;
  padding: 17px;
  position: relative;
  box-sizing: border-box;
}
.styles__input {
  border: 1px solid rgb(204, 204, 204);
  border-radius: 4px;
  padding: 6px 12px;
  line-height: 20px;
  outline: none;
  width: 100%;

  height: 40px;
}
.styles__Right {
  border: 1px solid rgb(204, 204, 204);
  border-radius: 4px;
  padding: 40px 15px 0px;
  box-sizing: border-box;
  margin-top: 10px;
}
</style>