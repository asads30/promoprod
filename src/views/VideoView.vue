<template>
    <div class="page">
        <div class="video">
            <div class="video-top">
                <Header :left="true" :right="false" :center="true" :centerText="$t('video.video')"/>
            </div>
            <div class="video-body">
                <div class="container">
                    <div class="video-item">
                        <video :width="width" controls>
                            <source src="https://wpaka.uz/video.mp4" type="video/mp4">
                            Ваш браузер не підтримує відео HTML.
                         </video>
                        <div class="video-box">
                            <div class="video-title">{{ $t('video.video1') }}</div>
                            <div class="video-date"><span>15:00</span> 07.10.2023</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Header from '@/components/Header'
    export default {
        name: 'StartView',
        components: {
            Header
        },
        computed: {
            width(){
                const screenWidth = window.screen.width
                return screenWidth - 40
            }
        }
    }
</script>

<style lang="scss">
    .video{
        &-box{
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            gap: 12px;
        }
        &-date{
            font-size: 10px;
            display: flex;
            align-items: center;
            gap: 10px;
            color: var(--text3);
            margin-top: 5px;
            line-height: 16px;
        }
        &-title{
            font-size: 16px;
            color: var(--text);
            font-weight: 500;
            line-height: 135%;
        }
        &-item:not(:last-child){
            margin-bottom: 30px;
        }
        &-item{
            video{
                border-radius: 30px;
            }
        }
    }
</style>