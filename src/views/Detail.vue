<template>
  <v-container>
    <v-row style="background: rgb(251 248 248)">
      <v-col class="col-sm-5">
        <v-container>
          <v-row>
            <v-col class="col-sm-12">
              <img
                width="100%"
                height="400px"
                v-bind:src="'http://localhost:9000/files/' + chiTiet.avatar"
                alt=""
              />
            </v-col>
          </v-row>
        </v-container>
      </v-col>
      <v-col class="col-sm-4">
        <v-container>
          <v-row>
            <v-col class="col-12">
              <span class="product_name">{{ chiTiet.name }}</span>
            </v-col>
          </v-row>

          <v-row style="">
            <v-col class="col-12">
              <span class="font-weight-medium"
                >Thương Hiệu: <span class="caption">{{ chiTiet.nhasx }}</span>
              </span>
            </v-col>
          </v-row>

          <v-row align="center" class="pl-4">
            <v-rating
              :value="4.1"
              color="amber"
              dense
              half-increments
              readonly
              size="14"
            ></v-rating>
            <span class="caption">4.1 sao - 10 đánh giá</span>
          </v-row>

          <v-row style="background: rgb(250, 250, 250)">
            <v-col class="col-12 pl-4 border_bottom">
              Gía:
              <span class="price_1"> {{ chiTiet.price }} </span>
              <span class="font-weight-regular">₫</span>
              <span class="isSale">{{ chiTiet.deal }}</span>
            </v-col>
            <v-row class="description_top">
              <v-col class="col-12 pl-4 border_bottom">
                <div>
                  <span class="content_description">
                    - Miếng Giảm Mụn Đầu Đen Ciracle Goodbye Blackhead thật sự
                    là phương pháp giảm mụn đầu đen và mụn cám rất hiệu quả.
                    <br
                  /></span>
                  <span class="content_description">
                    - Miếng Giảm Mụn Đầu Đen Ciracle Goodbye Blackhead thật sự
                    là phương pháp giảm mụn đầu đen và mụn cám rất hiệu quả.
                    <br
                  /></span>
                </div>
              </v-col>
            </v-row>
          </v-row>
          <v-row>
            <v-col class="col-12 pl-4">
              <span>Số Lượng</span>
              <input
                type="number"
                min="1"
                max="99"
                v-model="amount"
                class="input_amount"
              />
              <v-btn
                color="#1f601f"
                class="btn_add"
                @click="addProduct(chiTiet)"
              >
                Chọn Mua</v-btn
              >
            </v-col>
          </v-row>
          <v-row style="padding-left: 16px">
            <div class=""></div>
          </v-row>
        </v-container>
      </v-col>

      <!-- detail right -->
      <detail_right />
    </v-row>

    <v-tabs dark background-color="teal darken-3" show-arrows class="mt-2">
      <v-tabs-slider color="teal lighten-3"></v-tabs-slider>
      <v-tab>Thông Tin Mô Tả</v-tab>
      <v-tab>Nhận xét của khách hàng</v-tab>
      <v-tab-item>
        <v-container style="background: #f7f7f7">
          <v-row class="description">
            <v-col class="col-9 pa-1">
              <h2>Thông Tin Mô Tả</h2>
              <div  v-html="chiTiet.description"></div>
              <span></span>
              <!-- <p>{{ chiTiet.description }}</p> -->
            </v-col>
          </v-row>
        </v-container>
      </v-tab-item>
      <v-tab-item>
        <v-container style="background: #f7f7f7">
          <h2>Nhận Xét Của Khách Hàng</h2>
          <div class="mt-4">
            <template v-for="comment in comments">
              <v-row v-bind:key="comment.id">
                <v-col class="col-1 pa-0 pl-4">
                  <v-avatar color="primary" size="47">NH</v-avatar>
                </v-col>
                <v-col class="col-3 pa-0">
                  <h3>{{ comment.user_name }}</h3>
                  <h6>Nhận xét vào {{ convertDate(comment.createdDate)}}</h6>
                </v-col>
              </v-row>
              <v-row v-bind:key="comment.id">
                <v-col class="col-10 pa-auto">
                  <p class="pl-10">{{ comment.content }}</p>
                </v-col>
              </v-row>
            </template>
          </div>

          <v-row>
            <v-col class="col-9 pa-6">
              <div style="display: flex; flex: 1 1 0%">
                <input
                  type="text"
                  v-model="newCmt"
                  width="100%"
                  id=""
                  style="
                    flex: 1 1 0%;
                    border: 1px solid rgb(224, 224, 224);
                    border-radius: 4px;
                  "
                  class="pa-2"
                />
              </div>
            </v-col>
            <v-col class="col-2 pa-6">
              <v-btn
                text
                class="ml-4"
                style="background: rgb(253, 210, 47)"
                @click="addComment"
              >
                <span
                  class="font-weight-light custom-transform-class text-none caption black--text"
                >
                  Thêm nhận xét
                </span>
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-tab-item>
    </v-tabs>

    <v-row> </v-row>
    <!-- <v-row style="background: #f7f7f7" class="mt-4">
        
      </v-row> -->
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import detail_right from "@/components/Detail_Right";

export default {
  name: "Detail",
  data() {
    return {
      newCmt: null,

      amount: 1,
      chiTiet: {},
      product: {
        productId: "",
      },
      page: 0,
    };
  },
  computed: {
    // ...mapState(["comments"]),
    ...mapState({
      comments: (state) => state.comments.comments,
    }),
  },
  created() {
    const URL = "http://localhost:9000/api/find-one/" + this.$route.params.id;
    const axios = require("axios").default;
    axios.get(URL).then((response) => (this.chiTiet = response.data));
    this.$store.dispatch("getComment", {
      id_product: this.$route.params.id,
      page: this.page,
    });
    console.log(this.chiTiet);
  },
  methods: {
    addProduct: function (product) {
      var newItem = Object.assign({}, product, {
        amount: this.amount,
      });

      this.$store.commit("addItem", newItem);
    },


    addComment: function () {
      if (this.newCmt == null) {
        alert("Bạn chưa điền nội dung");
      } else {
        this.$store.dispatch("addComment", {
          id_product: this.$route.params.id,
          content: this.newCmt,
          page: this.page,
        });
        this.newCmt = null;
      }
    },
    convertDate(date)
    {
      return new Date(date).toLocaleString();

    }
  },

  filters: {
    toUSD(value) {
      if (typeof value !== "number") {
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
  components: {
    detail_right,
  },
};
</script>

<style scoped>
.input_amount {
  margin-left: 10px;
  width: 50px;
  height: 35px;
  text-align: center;
  border: 1px solid #eee;
  border-radius: 7px;
  outline: none;
}
.isSale {
  color: #666;
  font-weight: 400px;
  font-size: 14px;
  margin-left: 10px;
  text-decoration: line-through;
}

.price_1 {
  font-weight: 700;
  color: #199427;
  font-size: 18px;
}
.product_name {
  font-size: 20px;
  color: #666;
  text-transform: capitalize;
  display: block;
  margin: 0 0 5px;
  line-height: 28px;
}
.border_bottom {
  border-bottom: 2px solid #eee;
}
.btn_add {
  color: #eee;
  margin-left: 20px;
}
.content_description {
  color: #0d0e0d;
  font-weight: 400;
  font-size: 12px;
  padding: 0;
}
.description_top {
  height: 175px;
}
</style>