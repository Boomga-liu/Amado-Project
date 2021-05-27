<template>
  <div class="swiper-area">
    <swiper class="swiper" :options="swiperOption">
      <swiper-slide v-for="item in ImgArr" :key="item.src">
        <div class="bg-cover swiper-img-size" :style="{ backgroundImage:`url(${item.src})` }"></div>
      </swiper-slide>
      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
    </swiper>
    <div class="swiper-content d-none d-sm-flex" data-aos="zoom-in" data-aos-duration="2000">
      <div class="logo">
        <img src="@/assets/images/core-img/logo.png" width="137" height="55" alt="Amado" />
      </div>
      <div class="swiper-content-text">
        <h3>FEEL PROUD OF YOUR HOME</h3>
        <h3>Our Design Guides can help</h3>
      </div>
    </div>
    <div class="mouse">
      <div class="wheel"></div>
    </div>
  </div>
</template>

<script>
import ImgOne from '@/assets/images/custom-img/swiper-1.jpg'
import ImgTwo from '@/assets/images/custom-img/swiper-2.jpg'
import ImgThree from '@/assets/images/custom-img/swiper-3.jpg'

export default {
  name: 'swiper-example-multiple-slides-per-biew',
  title: 'Multiple slides per view',
  data () {
    return {
      ImgArr: [
        { src: ImgOne },
        { src: ImgTwo },
        { src: ImgThree }
      ],
      swiperOption: {
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        loop: true, // 循环
        autoplay: { // 自动播放
          delay: 3000,
          disableOnInteraction: false
        },
        speed: 3000 // 播放速度
      }
    }
  }
}
</script>
