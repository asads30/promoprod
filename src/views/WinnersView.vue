<template>
    <div class="page">
        <div class="winners">
            <div class="winners-top">
                <Header :left="true" :right="false" :center="true" :centerText="$t('winners.title')" :leftText="getOld == true ? 'start' : 'home'"/>
                <div class="winners-toptitle">
                    <div class="container">
                        <div class="winners-title">{{ $t('winners.des') }}</div>
                    </div>
                </div>
            </div>
            <div class="winners-body">
                <div class="winners-list">
                    <div class="container">
                        <div class="winners-list-title">{{ $t('winners.win1') }} | 07.10.2023</div>
                        <div class="winners-list-top">
                            <div class="winners-list-top-item">{{ $t('winners.name') }}</div>
                            <div class="winners-list-top-item">{{ $t('winners.prize') }}</div>
                            <div class="winners-list-top-item">{{ $t('winners.chance') }}</div>
                        </div>
                        <div class="winners-list-item" v-for="winner in winners1" :key="winner.id">
                            <div class="winners-list-item-left">
                                <div class="winners-item-name">
                                    <img src="@/assets/images/winner.svg" alt="" v-if="winner.id != 40">
                                    <img src="@/assets/images/winner-gold.svg" alt="" v-else>
                                    <span>{{ winner.chance.user.name }}</span>
                                </div>
                                <div class="winners-item-phone">{{ winner.chance.user.phone_number }}</div>
                            </div>
                            <div class="winners-list-item-center" v-if="$i18n.locale == 'ru'" :class="winner.id == 40 ? 'gold': ''">{{ winner.prize.name_ru }}</div>
                            <div class="winners-list-item-center" v-if="$i18n.locale == 'uz'" :class="winner.id == 40 ? 'gold': ''">{{ winner.prize.name_uz }}</div>
                            <div class="winners-list-item-center" v-if="$i18n.locale == 'en'" :class="winner.id == 40 ? 'gold': ''">{{ winner.prize.name_en }}</div>
                            <div class="winners-list-item-right">
                                <div class="winners-list-item-chance">{{ winner.chance.id }}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="winners-list">
                    <div class="container">
                        <div class="winners-list-title">{{ $t('winners.win2') }} | 21.09.2023</div>
                        <div class="winners-list-top">
                            <div class="winners-list-top-item">{{ $t('winners.name') }}</div>
                            <div class="winners-list-top-item">{{ $t('winners.prize') }}</div>
                            <div class="winners-list-top-item">{{ $t('winners.chance') }}</div>
                        </div>
                        <div class="winners-list-item" v-for="winner in winners2" :key="winner.id">
                            <div class="winners-list-item-left">
                                <div class="winners-item-name">
                                    <img src="@/assets/images/winner.svg" alt="">
                                    <span>{{ winner.chance.user.name }}</span>
                                </div>
                                <div class="winners-item-phone">{{ winner.chance.user.phone_number }}</div>
                            </div>
                            <div class="winners-list-item-center" v-if="$i18n.locale == 'ru'">{{ winner.prize.name_ru }}</div>
                            <div class="winners-list-item-center" v-if="$i18n.locale == 'uz'" >{{ winner.prize.name_uz }}</div>
                            <div class="winners-list-item-center" v-if="$i18n.locale == 'en'" >{{ winner.prize.name_en }}</div>
                            <div class="winners-list-item-right">
                                <div class="winners-list-item-chance">{{ winner.chance.id }}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="winners-list">
                    <div class="container">
                        <div class="winners-list-title">{{ $t('winners.win3') }} | 07.09.2023</div>
                        <div class="winners-list-top">
                            <div class="winners-list-top-item">{{ $t('winners.name') }}</div>
                            <div class="winners-list-top-item">{{ $t('winners.prize') }}</div>
                            <div class="winners-list-top-item">{{ $t('winners.chance') }}</div>
                        </div>
                        <div class="winners-list-item" v-for="winner in winners3" :key="winner.id">
                            <div class="winners-list-item-left">
                                <div class="winners-item-name">
                                    <img src="@/assets/images/winner.svg" alt="">
                                    <span>{{ winner.chance.user.name }}</span>
                                </div>
                                <div class="winners-item-phone">{{ winner.chance.user.phone_number }}</div>
                            </div>
                            <div class="winners-list-item-center" v-if="$i18n.locale == 'ru'">{{ winner.prize.name_ru }}</div>
                            <div class="winners-list-item-center" v-if="$i18n.locale == 'uz'">{{ winner.prize.name_uz }}</div>
                            <div class="winners-list-item-center" v-if="$i18n.locale == 'en'">{{ winner.prize.name_en }}</div>
                            <div class="winners-list-item-right">
                                <div class="winners-list-item-chance">{{ winner.chance.id }}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="winners-list">
                    <div class="container">
                        <div class="winners-list-title">{{ $t('winners.win4') }} | 24.08.2023</div>
                        <div class="winners-list-top">
                            <div class="winners-list-top-item">{{ $t('winners.name') }}</div>
                            <div class="winners-list-top-item">{{ $t('winners.prize') }}</div>
                            <div class="winners-list-top-item">{{ $t('winners.chance') }}</div>
                        </div>
                        <div class="winners-list-item" v-for="winner in winners4" :key="winner.id">
                            <div class="winners-list-item-left">
                                <div class="winners-item-name">
                                    <img src="@/assets/images/winner.svg" alt="">
                                    <span>{{ winner.chance.user.name }}</span>
                                </div>
                                <div class="winners-item-phone">{{ winner.chance.user.phone_number }}</div>
                            </div>
                            <div class="winners-list-item-center" v-if="$i18n.locale == 'ru'">{{ winner.prize.name_ru }}</div>
                            <div class="winners-list-item-center" v-if="$i18n.locale == 'uz'">{{ winner.prize.name_uz }}</div>
                            <div class="winners-list-item-center" v-if="$i18n.locale == 'en'">{{ winner.prize.name_en }}</div>
                            <div class="winners-list-item-right">
                                <div class="winners-list-item-chance">{{ winner.chance.id }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Header from '@/components/Header'
import {mapGetters} from 'vuex';
import mixpanel from "mixpanel-browser";

export default {
    name: 'WinnersView',
    components: {
        Header
    },
    computed: {
        ...mapGetters([
            'getWeb',
            'getWinners',
            'getOld'
        ]),
        winners1(){
            return this.getWinners ? this.getWinners.slice(0, 10) : this.getWinners
        },
        winners2(){
            return this.getWinners ? this.getWinners.slice(10, -17) : this.getWinners
        },
        winners3(){
            return this.getWinners ? this.getWinners.slice(19, -8) : this.getWinners
        },
        winners4(){
            return this.getWinners ? this.getWinners.slice(-8) : this.getWinners
        }
    },
    mounted() {
        if(!this.getWinners){
            fetch(`https://promadm.click.uz/api/winners?web_session=${this.getWeb}`).then(async response => {
                const data = await response.json();
                if(response.ok){
                    this.$store.commit('setWinners', data)
                }
            })
        }
    },
  beforeRouteEnter(to, from){
     if(from.name=== 'home'){
       mixpanel.track('Promo_Member_Launch_HomePage')
     } else {
       mixpanel.track('Promo_Guest_Launch_WinersPage')
     }
  }
}
</script>

<style lang="scss" scoped>
    .winners{
        &-toptitle{
            padding-bottom: 20px;
        }
        &-title{
            font-size: 20px;
            line-height: 24px;
            font-weight: 700;
            text-align: center;
        }
        &-body{
            height: calc(100dvh - 142px);
            overflow-y: auto;
        }
        &-list{
            border-radius: 12px;
            background: var(--bg2);
            padding: 20px 0;
            margin-bottom: 10px;
            &-title{
                background: linear-gradient(54deg, #FCFE5D -3.58%, #FDDC08 23.61%, #FD9F83 50.44%, #F97DD3 75.18%, #C566E4 109.63%);
                background-clip: text;
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                font-size: 14px;
                line-height: 16px;
                font-weight: 700;
                text-align: center;
            }
            &-top{
                border-top: 1px solid rgba(255, 255, 255, 0.10);
                margin-top: 20px;
                padding: 15px 0;
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 20px;
                &-item{
                    font-size: 12px;
                    color: var(--text3);
                    line-height: 16px;
                    width: 100%;
                }
            }
            &-item{
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 20px;
                padding: 10px 0;
                border-bottom: 1px solid rgba(255, 255, 255, 0.10);
                &>div{
                    width: 100%;
                }
                &-center{
                    font-size: 12px;
                    letter-spacing: 0.1px;
                    font-weight: 700;
                    color: var(--text);
                }
                &-center.gold{
                    background: linear-gradient(54deg, #FFC62F 12.36%, #FFEAA5 48.68%, #EBD084 69.53%, #A37207 146.8%);
                    background-clip: text;
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
                &-chance{
                    height: 24px;
                    background: #0073FF;
                    color: #fff;
                    padding: 0 8px;
                    border-radius: 24px;
                    display: inline-block;
                    font-size: 12px;
                    line-height: 24px;
                    font-weight: 700;
                }
                &:last-child{
                    border-bottom: 0;
                    padding-bottom: 0;
                }
            }
        }
        &-list:last-child{
            margin-bottom: 0;
        }
    }
    .winners-item-name{
        img{
            margin-right: 4px;
        }
        span{
            font-size: 12px;
            color: var(--text);
        }
    }
    .winners-item-phone{
        font-size: 10px;
        font-weight: 700;
        line-height: 16px;
        color: var(--text3);
    }
</style>