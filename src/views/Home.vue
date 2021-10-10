<template>
  <div class="home" style="background: #f2f2f2"
    
  >
    <v-container v-loading="loading" class="pt-0">
      <div class="row ma-0">
        <!-- menu -->
        <div class="col-3 pa-0">
          <Navabar />
        </div>
        <!-- end menu -->

        <div class="col-9 pa-0">
          <div class="row ma-0">
            <!-- bd -->
            <div class="col-12 ml-0 pa-0">
              <div style="height: 362px" class="av">
                <!-- slide -->
                <v-carousel v-model="model" cycle>
                  <v-carousel-item
                    v-for="slide in slides"
                    :key="slide.src"
                    cycle
                  >
                    <v-sheet color="primary" height="100%" tile>
                      <v-row justify="center">
                        <!-- <div>Slide {{ i + 1 }}</div> -->
                        <v-img v-bind:src="slide.src"> </v-img>
                      </v-row>
                    </v-sheet>
                  </v-carousel-item>
                </v-carousel>
                <!-- end slide -->
              </div>
            </div>
            <!-- chia cột bên slide -->
          </div>
         
        </div>
      </div>
      <!-- hàng dưới slide -->
      <div class="row">
        <div class="col-12 pa-1">
          <img src="https://adminbeauty.hvnet.vn/Upload/Files/banner-min.jpg?v=1" alt="">
        </div>

      </div>
     
      <!-- dòng mới sản phẩm -->
    </v-container>
    <v-container>
      <div class="row" style="background: rgb(251 248 248)">
        <div style="flex: 1 1 50%">
         <div class="new_products">
           Hàng Mới Về
         </div>
        </div>

        <div style="display: flex; padding-top: 29px; padding-right: 47px">
          <a href="/list/category/2/0">Xem tất cả</a>
        </div>
      </div>
      <v-row style="background: rgb(251 248 248)">
        <router-link 
        tag="a"
        v-for="item in product"
          v-bind:key="item.id"
          :to="'/detail/' + item.id"
          class="item ma-0 pa-0"
        >
           <v-hover v-slot="{ hover }">
            <v-card
              :elevation="hover ? 12 : 0"
              :class="{ 'on-hover': hover }"
              width="100%"
              class="pa-4"
            >
              <v-img
                style="opacity: 1"
                max-height="200px"
                max-width="auto"
                :src="'http://localhost:9000/files/'+item.avatar"
              ></v-img>
             
              <v-card-title
                class="font-weight-light custom-transform-class text-none body-2 pb-0 ten_sp"
                >{{ item.name }}</v-card-title
              >
              <v-card-text>
                <v-row>
                  <div class="overline font-weight-black text-none pt-1">
                    <span style="font-weight: 500">{{
                      item.price | toUSD
                    }}</span>
                    <span class="price">
                      {{ item.deal | toUSD }}
                    </span>
                  </div>
                </v-row>
                <v-row align="center">
                  <v-rating
                    :value="item.rating"
                    color="amber"
                    dense
                    half-increments
                    readonly
                    size="14"
                  ></v-rating>
                </v-row>
              </v-card-text>
            </v-card>
          </v-hover>
        </router-link>
        
      </v-row>
      <v-row class="f1" style="background: rgb(251 248 248)">
        <a
          href="/list/category/2/0"
          style="
            display: inline-block;
            border-radius: 5px;
            border: 1px solid;
            width: 200px;
            text-align: center;
            line-height: 1.7;
          "
          class="ma-2"
        >
          Xem thêm
        </a>
      </v-row>

     
      <v-row>
        <div class="all_provider">
          Thương Hiệu Nổi Bật
        </div>
      </v-row>
      <v-row class="pa-4" style="background: rgb(251 248 248)">
       <v-slide-group
         v-model="model"
         class="ma-2"
         
          show-arrows
        >
          <v-slide-item
           v-for ="item in provider.provider"
           :key="item.id"
            :color="active ? undefined : 'grey lighten-1'"
           
          >
            <a :href="item.id">
             <v-card class="slide-category mr-8"
             >
            <img
              width="100%"
              :src="'http://localhost:9000/files/'+item.logo"
              alt=""
            />
             <v-scale-transition>
              <v-icon
                v-if="active"
                color="white"
                size="60"
                v-text="'mdi-close-circle-outline'"
              ></v-icon>
            </v-scale-transition>
          </v-card>
          </a>
          </v-slide-item>
        </v-slide-group>
      </v-row>



      <!-- từ khóa hot -->
      <v-row> </v-row>
      <!-- gợi ý dành cho bạn -->
      <v-row>
        <div class="mt-4">
          <span>DÀNH RIÊNG CHO BẠN</span>
        </div>
      </v-row>

      <v-row style="background: rgb(251 248 248)">
        <router-link 
       
        tag="a"
        v-for="item in product"
        v-bind:key="item.id"
        :to="'/detail/' + item.id"
        class="item ma-0 pa-0"
        >
           <v-hover v-slot="{ hover }">
            <v-card
              :elevation="hover ? 12 : 0"
              :class="{ 'on-hover': hover }"
              width="100%"
              class="pa-4"
            >
              <v-img
                style="opacity: 1"
                max-height="200px"
                max-width="auto"
                v-bind:src="'http://localhost:9000/files/'+item.avatar"
              ></v-img>
              <v-card-title
                class="font-weight-light custom-transform-class text-none body-2 pb-0 ten_sp"
                >{{ item.name }}</v-card-title
              >
              <v-card-text>
                <v-row>
                  <div class="overline font-weight-black text-none pt-1">
                    <span style="font-weight: 500">{{
                      item.price | toUSD
                    }}</span>
                    <span class="price">
                      {{item.deal | toUSD}}
                    </span>
                  </div>
                </v-row>
                <v-row align="center">
                  <v-rating
                    :value="item.rating"
                    color="amber"
                    dense
                    half-increments
                    readonly
                    size="14"
                  ></v-rating>
                </v-row>
              </v-card-text>
            </v-card>
          </v-hover>
        </router-link>
       
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Navabar from "@/components/Navabar.vue";
import { mapState } from "vuex";
export default {
  
  name: "Home",
  data: () => ({
    loading : false,
    model: 0,

    colors: ["primary", "secondary", "yellow darken-2", "red", "orange"],
    items: [],
    slides: [
      {
        herf:
          "https://tiki.vn/chuong-trinh/iphone-12-tiki-trading?src=home_v4_main_banner.s7.b52087",
        src:
          "https://salt.tikicdn.com/cache/w584/ts/banner/92/e8/ce/11848eb3c42b51995db2912d2b04c6ef.png",
      },
      {
        herf:
          "https://tiki.vn/khuyen-mai/yeu-bep-nghien-nha-giam-den-50-100-chinh-hang?src=home_v4_main_banner.s2.b52141",
        src:
          "https://salt.tikicdn.com/cache/w584/ts/banner/da/ea/8e/867046949d792e1489d55606bc5f6a8a.jpg",
      },
      {
        herf:
          "https://tiki.vn/chuong-trinh/dai-chien-cong-nghe?src=home_v4_main_banner.s3.b52083",
        src:
          "https://salt.tikicdn.com/cache/w584/ts/banner/be/91/64/fed3166cd5278f5fa86fccbe438fbd8c.png",
      },
      {
        herf:
          "https://tiki.vn/chuong-trinh/do-noi-that-gia-tot-tra-gop?src=home_v4_main_banner.s4.b52084",
        src:
          "https://adminbeauty.hvnet.vn/Upload/Files/banner/happy-day-beauty-garden.jpg?width=1170&height=450&v=15042020",
      },
      {
        herf:
          "https://tiki.vn/chuong-trinh/iphone-12-tiki-trading?src=home_v4_main_banner.s7.b52087",
        src:
          "https://salt.tikicdn.com/cache/w584/ts/banner/a1/0b/0f/ca45b5aeaabc7c824b80e41fd5aee04f.jpg",
      },
    ],
  }),
  async created () {
    this.$store.commit('CHANGE_LOADING', true);
     await this.$store.dispatch("loadHomePage");
    await this.$store.dispatch("loadAllProvider");
    this.$store.commit('CHANGE_LOADING', false);
  },
  computed: {
    ...mapState(["product"]),
    ...mapState({
      provider: state=> state.provider,
      product: state=>state.product.product
    })
  },

  components: {
    Navabar,
  },
  filters: {
    toUSD(value) {
      if (typeof(value) !== "number") {
        return value;
      }
      var formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "VND",
        minimumFractionDigits: 0,
      });
      return formatter.format(value);
    },
  },
};
</script>
<style>
.av .v-carousel__item {
  height: 362px !important;
}
.v-carousel__controls {
  top: 62% !important;
}
.v-window__next,
.v-window__prev {
  top: 30% !important;
}
.mdi-circle {
  font-size: 13px !important;
}
.item {
  width: 20%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  z-index: 0;
 
}
.item:hover{
   border: 2px solid green;
}
.v-card.on-hover.theme--dark > .v-card__text {
  background-color: rgba(#fff, 0.8);
}
.v-card__text {
  color: #000;
}

.ten_sp {
  padding-top: 4px;
  white-space: nowrap;

  overflow: hidden;
  text-overflow: ellipsis;
}
.v-card__title {
  padding: 0 !important;
}
.f1 {
  align-items: center !important;
  flex-direction: column;
}
.slide-category {
  display: flex;
  flex-direction: column;
  padding: 16px;
}
.price{
  text-decoration: line-through;
  margin-left: 10px;
}
.v-card__title:hover{
  color: green;
  text-decoration: underline;
}
.new_products
{
  border-bottom: 2px solid green;
  width: 200px;
  height: 50px;
  text-align: center;
  line-height: 45px;
  font-size: 16px;
  font-weight: 700;
    
}
.ten_provider{
  text-align: center;
}
.all_provider{
  background-color: #fff ;
  margin-top: 30px;
  font-size: 23px;
  text-align: center;
  width: 100%;
}
</style>