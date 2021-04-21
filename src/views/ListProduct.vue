<template>
  <v-container>
          <v-row>
            <v-col class="col-12 pa-2">
              <img
                width="100%"
                src="https://salt.tikicdn.com/cache/w885/ts/banner/34/21/bb/1d869d0922c453d6ee938253dcb3a871.png"
                alt=""
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col class="col-sm-6 pa-2">
              <a
                href="https://tiki.vn/chuong-trinh/tra-gop-dien-thoai-may-tinh-bang?src=static_block"
              >
                <img
                  width="100%"
                  src="https://salt.tikicdn.com/ts/categoryblock/51/72/3f/ec09eb1e7022d1eccc2a9f4f847f6577.jpg"
                  alt=""
                />
              </a>
            </v-col>

            <v-col class="col-sm-6 pa-2">
              <a
                href="https://tiki.vn/chuong-trinh/tra-gop-dien-thoai-may-tinh-bang?src=static_block"
              >
                <img
                  width="100%"
                  src="https://salt.tikicdn.com/ts/categoryblock/b2/33/91/77464daad9b1c45a5293e194f90ccebc.jpg"
                  alt=""
                />
              </a>
            </v-col>
          </v-row>

          <v-row>
            <router-link 
            v-for="item in productSearch.content"
              v-bind:key="item.id"
              :to="'/detail/'+item.id"
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
                    >{{item.name}}</v-card-title
                  >
                  <v-card-text>
                    <v-row>
                      <div class="overline font-weight-black text-none pt-1">
                        <span style="font-weight: 500">{{ item.price| toUSD }}</span>
                        <span class="text-decoration-line-through">
                          {{ item.deal }}
                        </span>
                      </div>
                    </v-row>
                    <v-row align="center">
                      <v-rating
                        :value="2"
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
         <v-container>
      <v-row justify="center">
        <v-col cols="8">
          <v-container class="max-width">
            <v-pagination
              v-model="page"
              class="my-4"
              @input="gotoPage"
              v-bind:length="productSearch.totalPages"
            ></v-pagination>
          </v-container>
        </v-col>
      </v-row>
    </v-container>
    
        </v-container>
</template>

<script>
import Navabar from '@/components/Navabar.vue'
import {mapState} from 'vuex'
export default {
  
  name: "ListProduct",
  data: () => ({
    model: 0,
    page: 1,
    colors: ["primary", "secondary", "yellow darken-2", "red", "orange"],
    items: [
      
    ],
  }),
 created() {
  
  if(this.$route.params.type=="search")
  {
   
      this.$store.commit('SEARCH_KEY',{
        "key": this.$route.params.key,
        "page": this.$route.params.page
      });
  }
  if(this.$route.params.type=="category")
  {
   
     this.$store.commit('LOAD_CARTEGORY',{
        "key": this.$route.params.key,
        "page": this.$route.params.page
      });
  }
  
 },
 components:{
    Navabar
 },
 computed: {
   ...mapState([
      "productSearch"
    ])
 },
 methods :{
   gotoPage()
   {
    
     this.$store.commit('LOAD_CARTEGORY',{
        "key": this.$route.params.key,
        "page": (this.page-1)
      });
   }
 },
 filters: {
    toUSD (value) {
      if (typeof value !== "number") {
        return value;
    }
    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'VND',
        minimumFractionDigits: 0
    });
    return formatter.format(value);
    }
  }
};
</script>

<style scope="this api replaced by slot-scope in 2.5.0+">
.item {
  width: 20%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  z-index: 0;
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
</style>