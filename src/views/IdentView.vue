<template>
    <div class="ident">
        <div class="container">
            <div class="ident-box">
                <div class="ident-top"></div>
                <div class="ident-center">
                    <div class="ident-center-img">
                        <img src="@/assets/images/ident/main.png" alt="">
                    </div>
                    <div class="ident-center-title">{{ $t('ident.ident1') }}</div>
                    <div class="ident-center-des">{{ $t('ident.ident2') }}</div>
                </div>
                <div @click="sendEvent" class="ident-bottom">
                    <a href="https://my.click.uz/app/identification" class="ident-bottom-btn">{{ $t('ident.ident3') }}</a>
                </div>
            </div>
        </div>
    </div>
  <Modal
      headerCloseBtn
      :btnName="$t('startModalSurvey.btnName')"
      v-show="isModalStartVisible"
      @close="closeStartModal"
      @closeBtnModal="closeStartModal"
  >
    <template v-slot:header>
      <img src="@/assets/images/survey/start-survey.svg" loading="lazy" class="header-image" alt="">
      <p class="header-text">{{ $t('startModalSurvey.title') }}</p>
      <div class="border-header"></div>
    </template>
    <template v-slot:body>
      <p class="modal-body-content">
        {{ $t('startModalSurvey.description') }}
      </p>
    </template>
    <template v-slot:footer></template>
  </Modal>
</template>

<script>
    import mixpanel from "mixpanel-browser";
    import Modal from "@/components/Modal.vue";
    import {getCookie} from "@/boot/util";
    export default {
      name: 'IdentComponent',
      components: { Modal },
      computed: {
        cookie() {
          return getCookie('web-session')
        }
      },
      async created(){
        const queryQuestionsList = (this.cookie) ? this.cookie : this.getWeb;
        await this.$store.dispatch('getQuestionsList', queryQuestionsList);
        if(this.$store.state.questionsList?.length){
          this.isModalStartVisible = true
          this.$store.state.guestCompletesSurvey = true;
        }
      },
      mounted() {
        mixpanel.track('Promo_Guest_Launch_FirstPage');
      },
      data(){
          return {
          isModalStartVisible: false
        }
      },
      methods:{
        sendEvent(){
            mixpanel.track('Promo_Guest_Start_ID');
        },
        closeStartModal() {
          this.isModalStartVisible = false;
        },
      }
    }
</script>

<style lang="scss">
    .ident{
        &-box{
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            height: 100dvh;
        }
        &-top{
            height: 80px;
        }
        &-center{
            &-img{
                margin-bottom: 40px;
                img{
                    width: 100%;
                }
            }
            &-title{
                font-size: 25px;
                font-weight: 700;
                line-height: 110%;
                margin-bottom: 15px;
            }
            &-des{
                font-size: 14px;
                line-height: 135%;
            }
        }
        &-bottom{
            padding-bottom: 40px;
            &-btn{
                border-radius: 10px;
                background: linear-gradient(0deg, #0073FF 0%, #00C2FF 100%), #FFF;
                height: 40px;
                line-height: 40px;
                border: 0;
                width: 100%;
                color: #fff;
                display: block;
                text-align: center;
                text-decoration: none;
                font-size: 14px;
                font-weight: 700;
            }
        }
    }
    .header-image{
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 50px auto 10px auto;
    }
    .header-end-image{
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 25px auto 10px auto;
    }
    .header-text{
      margin: 0;
      color: #363845;
      text-align: center;
      font-family: 'Golos Text', sans-serif !important;
      font-size: 20px;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
      white-space: break-spaces;
    }
    .border-header{
      margin: 15px 0;
      border: 1px solid rgba(0, 0, 0, 0.10);
    }
    .modal-body-content{
      color: #363845;
      text-align: center;
      font-family: Golos Text,sans-serif!important;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }
</style>