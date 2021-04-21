<template>
  <nav>
    <v-toolbar color="green" height="60">
      <v-toolbar-title>
        <v-container fluid>
          <v-layout row class="pt-2">
            <div>
              <div class="pl-2" style="display: flex; flex: 1 1 50%">
                <div class="image_logo">
                  <router-link tag="a" to="/">
                   <div>
                      <v-img
                        src="https://salt.tikicdn.com/ts/banner/33/ba/89/54c02d2475983f93a024c0cd13f238e4.png"
                        height="33"
                        width="87"
                      ></v-img>
                    </div>
                  </router-link>
                  
                </div>
                <input
                  type="text"
                  class="pl-1 inputSearch"
                  v-model="key"
                  placeholder="Tìm sản phẩm, danh mục hay thương hiệu mong muốn ..."
                />
                <v-btn text @click="serachByKey">
                  <v-icon left color="rgb(253, 216, 53)"> mdi-magnify </v-icon>
                  <span
                    class="font-weight-light custom-transform-class text-none caption"
                    >Tìm Kiếm</span
                  >
                </v-btn>
              </div>
              <div></div>
            </div>
            <div style="display: flex; flex: 1 1 30%">
              <div style="display: flex; flex-wrap: wrap">
                <v-btn text class="ml-4">
                  <v-icon left color="rgb(253, 216, 53)">
                    mdi-cart-arrow-right
                  </v-icon>
                  <span
                    class="font-weight-light custom-transform-class text-none caption white--text"
                  >
                    Theo dõi <br />
                    đơn hàng
                  </span>
                </v-btn>
              </div>

              <v-btn text class="ml-4">
                <v-icon left color="rgb(253, 216, 53)"> mdi-bell-ring </v-icon>
                <span
                  class="font-weight-light custom-transform-class text-none caption white--text"
                >
                  Thông báo <br />
                  của tôi
                </span>
              </v-btn>
            <span v-if="!user.token">
                <FormLogin/>
            <FormResignter/>
            </span>
            
            <span v-else text>
              <v-btn  text class="ml-4" >
                <span  class="font-weight-light custom-transform-class text-none caption white--text">
                   Xin Chào {{user.name}}
                  </span></v-btn>
                
            <button text class="ml-4" @click="logout()">
              
              <span class="font-weight-light custom-transform-class text-none caption white--text">
                Logout
              </span>
            </button>
            </span>
        
             <v-spacer></v-spacer>
              <v-btn text class="ml-4" outlined to="/cart">
                <v-icon left color="rgb(253, 216, 53)">
                  mdi-cart-arrow-right
                </v-icon>
                <span
                  class="font-weight-light custom-transform-class text-none caption white--text"
                >
                  Gio Hàng <span>{{ cart.cart.length }}</span>
                </span>
              </v-btn>
            </div>
          </v-layout>
        </v-container>
      </v-toolbar-title>
    </v-toolbar>
  </nav>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import FormLogin from "./FormLogin.vue";
import FormResignter from "./FromResigter"
import {getToken} from '@/store/utils/auth'
export default {
  name: "ComHeader",
  created() {
    this.$store.commit('getLocalStorage');
    if(getToken())
    {
       this.$store.dispatch('getInfo');
    }
  },

  data() {
    return {
      key: null,
      page: 0,
      show: true,
    };
  },
  methods: {
    serachByKey: function () {
      console.log(this.key);

      this.$router.push("/list/search");
    },
    logout: function()
    {
      this.$store.dispatch('logout');
      this.$router.push("/");
    }
    
  },
  
  computed: {
    ...mapGetters(["getLength"]),
   
    ...mapState({
        cart:state=>state.cart,
          user: state=>state.user,
      })
  
  },
  components: {
    FormLogin,
    FormResignter,
  },
  
};
</script>

<style>
.input-from {
  border-radius: 4px;
  width: 100%;
  border: 1px solid rgb(204, 204, 204);

  line-height: 34px;
  outline: none;
  padding: 6px 12px !important;
}
.labe-form {
  padding-top: 8px;
  color: rgb(51, 51, 51);
  font-weight: 400;
  line-height: 34px;
}
.inputSearch {
  width: 340px;
  border-radius: 5px;
  background: white;
  outline: none;
  font-size: 13px;
}
.image_logo {
  margin-right: 20px;
}
</style>