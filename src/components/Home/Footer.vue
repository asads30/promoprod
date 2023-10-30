<template>
  <div class="cfooter">
      <div class="container">
        <div class="cfooter-hr"></div>
        <button class="cfooter-btn" :disabled="count < 1" @click="goFortuna">
          <span>{{ $t('home.home9') }}</span>
          <div class="cfooter-btn__label" v-if="count > 0">{{ count }}</div>
          <div class="flare"></div>
        </button>
      </div>
  </div>
</template>

<script>
export default {
  name: 'CfooterHomeBlock',
  props: {
    count: Number
  },
  methods: {
    goFortuna(){
      this.$router.push({name: 'fortuna'})
    }
  },
}
</script>

<style lang="scss" scoped>
.cfooter{
  padding: 20px 0 20px;
  .cfooter-btn {
    background: linear-gradient(0deg,#0073ff,#00c2ff);
    height: 40px;
    border-radius: 10px;
    line-height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    border: 0;
    gap: 10px;
    position: relative;
    overflow: hidden;
    span{
      font-size: 14px;
      font-weight: 600;
      color: #fff;
      font-family: Golos Text,sans-serif!important;
    }
    .cfooter-btn__label {
      height: 25px;
      border-radius: 25px;
      background: #000;
      line-height: 25px;
      font-size: 12px;
      font-weight: 500;
      padding: 0 10px;
      color: #fff;
      font-family: Golos Text,sans-serif!important;
    }
    .flare {
      position: absolute;
      top: 0;
      height: 100%;
      width: 45px;
      transform: skewX(-45deg);
      animation: flareAnimation;
      left: -150%;
      background: linear-gradient(90deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,.4));
      animation: flareAnimation 3s linear infinite;
    }
    &:disabled{
      background: #363744;
      span{
        color: #575965;
      }
    }
  }
  .cfooter-link {
    text-align: center;
    .cfooter-link-btn {
      color: var(--text-secondary);
      text-decoration: underline;
      font-size: 12px;
      line-height: 16px;
    }
  }
  .cfooter-hr{
    background: var(--hr);
    width: 100%;
    height: 1px;
    margin-bottom: 20px;
  }
}
@keyframes flareAnimation {
  0% {
      left: -150%;
  }
  100% {
      left: 150%;
  }
}
</style>