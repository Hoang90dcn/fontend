<template>
  <v-dialog v-model="dialog" width="520">
    <template v-slot:activator="{ on, attrs }">
      <v-btn text dark v-bind="attrs" v-on="on">
        <span
          class="font-weight-light custom-transform-class text-none caption green--text"
          >Đăng Ký
        </span>
      </v-btn>
    </template>

    <v-card>
      <v-card-title class="title"><div> Đăng Ký</div> </v-card-title>

      <v-card-text>
        <v-container>
          <v-row>
            <v-col class="col-3">
              <label for="account" class="labe-form">Tên đăng nhập</label>
            </v-col>
            <v-col cols="col-9">
              <input
                type="text"
                id="account"
                class="input-from"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col class="col-3">
              <label for="pass" class="labe-form">Email</label>
            </v-col>
            <v-col cols="col-9">
              <input
                type="password"
                id="pass"
                v-model="password"
                
                class="input-from"
              />
            </v-col>
          </v-row>
            <v-row>
            <v-col class="col-3">
              <label class="labe-form">Họ và tên</label>
            </v-col>
            <v-col cols="col-9">
              <input
               
                
                class="input-from"
              />
            </v-col>
          </v-row>

           <v-row>
            <v-col class="col-3">
              <label class="labe-form">Số điện thoại</label>
            </v-col>
            <v-col cols="col-9">
              <input
               
                
                class="input-from"
              />
            </v-col>
          </v-row>


           <v-row>
            <v-col class="col-3">
              <label class="labe-form">Mật Khẩu</label>
            </v-col>
            <v-col cols="col-9">
              <input
               
                
                class="input-from"
              />
            </v-col>
          </v-row>

           <v-row>
            <v-col class="col-3">
              <label class="labe-form">Nhập lại mật khẩu</label>
            </v-col>
            <v-col cols="col-9">
              <input
               
                
                class="input-from"
              />
            </v-col>
          </v-row>

          
        </v-container>


      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green" text @click="login"> Đăng ký </v-btn>
        <v-btn color="green" text @click="dialog = false"> Hủy </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      username: '',
      password: '',
      account: '',
      email: '',
      phone: '',
    };
  },
  methods: {
    login() {
     
      this.$store.commit("LOGIN", {
        username: this.username,
        password: this.password,
      });
    },
  },
};
</script>

<style scoped>
.title{
    background-color: green;
    text-align: center! important;
}
</style>