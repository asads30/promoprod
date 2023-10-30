<template>
  <router-link to="/super" class="drawing">
       <div class="drawing-top">
         <div class="container">
           <div class="drawing-title">{{ $t('home.home4') }}</div>
           <div class="drawing-more">{{ $t('home.home5') }}</div>
         </div>
       </div>
       <div class="drawing-list">
         <div class="container">
           <div class="drawing-item">
             <div class="drawing-item-label">X8</div>
             <div class="drawing-item-img">
               <img src="@/assets/images/super/prize1.png" alt="">
             </div>
             <div class="drawing-item-title">Apple Watch 8</div>
           </div>
           <div class="drawing-byd">
             <div class="drawing-byd-img">
               <img src="@/assets/images/super/byd.png" alt="">
             </div>
             <div class="drawing-byd-title">{{ $t('home.home6') }}<br /><strong>BYD Song Plus</strong></div>
           </div>
           <div class="drawing-item">
             <div class="drawing-item-label">X8</div>
             <div class="drawing-item-img">
               <img src="@/assets/images/super/prize2.png" alt="">
             </div>
             <div class="drawing-item-title">iPhone 14 Pro Max</div>
           </div>
         </div>
       </div>
 </router-link>
</template>

<script>
export default {
   name: 'DrawingHomeBlock'
}
</script>

<style lang="scss" scoped>
.drawing{
   padding: 12px 0 15px;
   border-radius: 20px;
   background: linear-gradient(28deg, #0024A3 0%, #F465F7 100%);
   margin-bottom: 20px;
   display: block;
   text-decoration: none;
   .drawing-top {
     margin-bottom: 16px;
     .container{
       display: flex;
       align-items: center;
       justify-content: space-between;
       .drawing-title{
         font-size: 16px;
         font-weight: 700;
         color: #fff;
       }
       .drawing-more {
         font-size: 12px;
         color: #fff;
         line-height: 20px;
         text-decoration: none;
       }
     }
   }
   .drawing-list{
     .container{
       display: flex;
       align-items: center;
       justify-content: space-between;
       gap: 8px;
       .drawing-item{
         position: relative;
         width: 70px;
         .drawing-item-label{
           height: 24px;
           width: 24px;
           line-height: 24px;
           font-size: 12px;
           color: #242429;
           font-weight: 600;
           text-align: center;
           border-radius: 24px;
           background: linear-gradient(54deg, #FCFE5D 0%, #FDDC08 24.02%, #FD9F83 47.72%, #F97DD3 69.57%, #C566E4 100%);
           position: absolute;
           right: -8px;
           top: -6px;
         }
         .drawing-item-img{
           height: 80px;
           width: 70px;
           display: flex;
           align-items: center;
           justify-content: center;
           border-radius: 18px;
           background: rgba(255, 255, 255, 0.10);
           margin-bottom: 4px;
           img{
             max-height: 70px;
             max-width: 60px;
           }
         }
         .drawing-item-title{
           font-size: 10px;
           color: #fff;
           text-align: center;
           font-weight: 400;
           height: 30px;
         }
       }
       .drawing-byd{
         width: calc(100% - 176px);
         display: flex;
         flex-direction: column;
         justify-content: center;
         align-items: center;
         .drawing-byd-title{
           text-align: center;
           font-size: 13px;
           color: #fff;
           font-weight: 400;
           line-height: 18px;
         }
         .drawing-byd-img{
           margin-bottom: 10px;
           position: relative;
           display: flex;
           flex-direction: column;
           justify-content: center;
           align-items: center;
           &::before{
            content: '';
            width: 100px;
            height: 100px;
            background: #00DEFF;
            position: absolute;
            filter: blur(12.5px);
            border-radius: 50%;
            bottom: -12px;
           }
           img{
             position: relative;
             height: 80px;
           }
         }
       }
     }
   }
 }
</style>