<template>
  <v-dialog v-model="dialog" width="510">
    <template v-slot:activator="{ on, attrs }">
      <v-btn text  dark v-bind="attrs" v-on="on" @click="open">
        <span
          class="font-weight-light custom-transform-class text-none caption green--text"
          >Đăng Nhập
        </span>
      </v-btn>
    </template>

    <v-card>
      <v-card-title class="title"><div> Đăng Nhập</div> </v-card-title>

      <v-card-text>
        <v-container>
          <v-row>
            <v-col class="col-3">
              <label for="email" class="labe-form">Email/sđt</label>
            </v-col>
            <v-col cols="col-9">
              <input
                type="text"
                id="email"
                v-model="username"
                placeholder="Nhập số điện thoại hoặc email"
                class="input-from"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col class="col-3">
              <label for="pass" class="labe-form">Mật Khẩu</label>
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
        </v-container>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green" text @click="login"> Đăng Nhập </v-btn>
        <v-btn color="green" text @click="cancel()"> Hủy </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import {mapState} from 'vuex'
export default {
  
  data() {
    return {
    
      username: '',
      password: '',
    };
  },
  methods: {
     async login() {
      
      this.$store.commit('CHANGE_LOADING',true);
      try {
        await this.$store.dispatch("login", {
        username: this.username,
        password: this.password,
        
      });
       this.$message({
          message: 'Đăng Nhập Thành Công',
          type: 'success'
        });
      } catch (error) {
         this.$message({
          message: 'Đăng Nhập Thất Bại',
          type: 'error'
        });
      }
      finally{
        this.$store.commit('CHANGE_LOADING',false);
        this.dialog = false;
      }
      
     
    },
    cancel()
    {
      this.$store.commit('CHANGE_LOGIN',false);
      console.log(this.dialog);
    },
    open()
    {
       this.$store.commit('CHANGE_LOGIN',true);
       console.log(this.dialog)
    }
   
  },
   computed:{
       ...mapState({
        dialog: state=>state.dialog.login,
      }),
    }
};
</script>

<style scoped>
.title{
    background-color: green;
    text-align: center! important;
}
</style>