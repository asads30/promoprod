<template>
  <div>
  <transition name="modal-fade">
  <div class="modal-backdrop" @click="closeModalBackdrop">
    <div @click.stop="" class="modal" role="dialog"
         aria-labelledby="modalTitle"
         aria-describedby="modalDescription">
      <header id="modalTitle">
        <slot name="header"></slot>
        <img v-if="headerCloseBtn"  src="@/assets/images/Vector.svg" alt=""
            class="btn-close"
            @click="sendCancelPool"
            aria-label="Close modal"
        >
      </header>
      <section id="modalDescription">
        <slot name="body"></slot>
      </section>
      <footer>
        <slot name="footer">
          <button
              type="button"
              class="btn-green"
              @click="close"
              aria-label="Close modal"
          >
            {{ btnName }}
          </button>
        </slot>
      </footer>
    </div>
  </div>
  </transition>
  </div>
</template>

<script>

import {getCookie} from "@/boot/util";

export default {
  name: 'Modal',
  props:{
    btnName:{
      type: String,
      default: 'Начать'
    },
    headerCloseBtn:{
      type: Boolean
    }
  },
  methods: {
    close() {
      if(this.btnName === this.$t('startModalSurvey.btnName')){
        this.$router.replace({name:'survey.index', params: {id: 1}})
      } else{
        this.$emit('close');
      }
    },
    closeModalBackdrop(){
      if(this.$store.state.surveyPoolId){
        const data = {
          web_session: `${getCookie('web-session')}`,
          poll_id: this.$store.state.surveyPoolId
        }
        const request = {
          method: "POST",
          headers: {
            "Accept": 'application/json',
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        }
        fetch('https://promadm.click.uz/api/cancelPoll', request)
      }
        this.$emit('close');
    },
    sendCancelPool(){
        if(this.$store.state.surveyPoolId){
          const data = {
            web_session: `${getCookie('web-session')}`,
            poll_id: this.$store.state.surveyPoolId
          }
          const request = {
            method: "POST",
            headers: {
              "Accept": 'application/json',
              "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
          }
          fetch('https://promadm.click.uz/api/cancelPoll', request)
        }
      this.$emit('closeBtnModal');
    }
  },
};
</script>

<style lang="scss" scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
   & .modal {
     padding: 0 20px 10px;
     width: 80%;
     height: auto;
     position: fixed;
     top: 50%;
     left: 50%;
     display: flex;
     flex-direction: column;
     border-radius: 10px;
     transform: translate(-50%, -50%);
     background: #FCFCFC;
     overflow-x: hidden;
     overflow-y: scroll;
     & .btn-green {
       border-radius: 10px;
       background: linear-gradient(0deg, #0073FF 0%, #00C2FF 100%), #FFF;
       height: 40px;
       line-height: 40px;
       border: 0;
       width: 100%;
       color: #FFFFFF;
       display: block;
       text-align: center;
       font-size: 14px;
       font-weight: 700;
     }
     & .btn-close {
       width: 13px;
       height: 12.966px;
       position: absolute;
       top: 20px;
       right: 20px;
       border: none;
       cursor: pointer;
       color: #616380;
       background: transparent;
     }
   }
}

.modal-fade-enter-from,
.modal-fade-leave-to{
  opacity: 0;
}

.modal-fade-enter-active{
  transition: opacity 1s ease;
}
.modal-fade-leave-active {
  transition: opacity 0.7s ease;
}
</style>