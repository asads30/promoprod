<template>
  <div class="referall">
      <div class="container">
        <div class="referall-title">
          {{ $t('home.home7') }}<br />{{ $t('home.home7-2') }}
        </div>
        <button class="referall-btn" @click="goRef">
          <span>{{ $t('home.home8') }}</span>
          <img src="@/assets/images/referall.svg" alt="">
        </button>
      </div>
  </div>
</template>

<script>
export default {
  name: 'ReferallHomeBlock',
  methods: {
    goRef(){
      this.$router.push('/referall')
    }
  },
}
</script>

<style lang="scss" scoped>

.referall {
  position: relative;
  .referall-title{
    color: var(--text2);
    text-align: center;
    font-size: 12px;
    line-height: 135%;
    margin-bottom: 8px;
  }
  .referall-btn {
    height: 40px;
    border-radius: 10px;
    background: #505369;
    line-height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    border: 0;
    gap: 10px;
    span{
      font-size: 14px;
      font-weight: 600;
      color: #fff;
      font-family: 'Golos Text', sans-serif !important;
    }
  }
}
</style>