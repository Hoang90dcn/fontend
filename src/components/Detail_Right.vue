<template>
       <v-col class="col-3 detail_right pa-0">
        <v-container>
          <v-row>
            <span class="title_detail_right">-- CHẤT LƯỢNG CHO TẤT CẢ --</span>
           
          </v-row>
          <v-row v-for="detail in list" :key="detail.image">
           <v-col class="col-3 pa-0 " >
             <img :src="detail.image" alt="" class="image_detail_right">
           </v-col>
           <v-col class="col-9 content_detail_right">
            {{detail.title}} <br>
            <p class="caption black--text" >{{detail.content}}</p>
           </v-col>
           
          </v-row>





        


          
        </v-container>
      </v-col>
</template>

<script>
export default {
    data(){
        return{
            list:[
                {
                    title: " MỸ PHẨM 100% CHÍNH HÃNG",
                    image: "https://adminbeauty.hvnet.vn/Upload/files/chinh-sach-04.png?v=012",
                    content: "Chất lượng sản phẩm luôn được chứng nhận bằng sự tin cậy của Khách Hàng suốt nhiều năm qua"
                },
                 {
                    title: "LUÔN ĐƯỢC TÍCH ĐIỂM",
                    image: "https://adminbeauty.hvnet.vn/Upload/files/chinh-sach-05.png?v=012",
                    content: "Đơn hàng từ 100k=1 điểm 10 điểm nhận voucher 100k"
                },
                 {
                    title: "MỸ PHẨM 100% CHÍNH HÃNG",
                    image: "https://adminbeauty.hvnet.vn/Upload/files/chinh-sach-06.png?v=012",
                    content: "Đơn hàng trên 500k trên toàn quốc."
                },
                 {
                    title: "TRI ÂN KHÁCH HÀNG",
                    image: "https://adminbeauty.hvnet.vn/Upload/files/chinh-sach-07.png?v=012",
                    content: "Với các chương trình khuyến mãi, các sự kiện & quà tặng đặc biệt vô cùng hấp dẫn"
                },

            ]
        }
    }

}
</script>

<style scope="this api replaced by slot-scope in 2.5.0+">
.detail_right{
  border:1px solid #eee;
}
.image_detail_right{
  max-width: 70px;
  height: 75px;
}
.title_detail_right{
  border-bottom: 1px solid #eee;
  text-align: center;
  width: 100%;
  font-size: 16px;
    font-weight: 700;
    line-height: 46px;
    color: #333;
}
.content_detail_right{
  color: #1f601f;
    font-weight: 700;
    font-size: 11px;
    padding: 0;
}
</style>