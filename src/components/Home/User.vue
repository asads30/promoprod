<template>
    <div class="user">
        <div class="container">
          <div class="usertop">
            <div class="user-title"><span>{{ name }}</span> <img src="@/assets/images/verify.svg" alt=""></div>
            <div class="user-phone">{{ phone }}</div>
          </div>
          <div class="userlive">
            <router-link class="userlive-btn" to="/video"><img src="@/assets/images/live.svg" alt="">{{ $t('video.video') }}</router-link>
          </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'UserHomeBlock',
    props: {
        name: String,
        phone: Number
    }
}
</script>

<style lang="scss" scoped>
.user{
    padding: 0 0 12px;
    .container{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .user-title{
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 4px;
        span{
            font-size: 16px;
            font-weight: 600;
            color: var(--text);
        }
    }
    .user-phone{
        font-size: 14px;
        color: var(--text);
        a{
            color: var(--text);
        }
    }
    .userlive-btn{
        background: #FF2B32;
        border-radius: 5px;
        display: flex;
        align-items: center;
        color: #fff;
        gap: 5px;
        padding: 5px 12px;
        text-decoration: none;
        font-size: 14px;
    }
  }
</style>