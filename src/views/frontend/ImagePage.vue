<template>
  <div class="imagepage-area position-relative">
    <nav class="imagepage-area-nav d-none d-md-block" data-aos="fade-down" data-aos-duration="2000">
      <div class="nav-text-button d-flex justify-content-center align-items-center">
        <p>
          Welcome to Amado! Let's Go Shopping
          <i class="fas fa-angle-double-right"></i>
        </p>
        <router-link to="/shop" class="btn btn-primary">Online Shop</router-link>
      </div>
    </nav>
    <div class="imagepage-cart-icon d-block d-md-none">
      <router-link to="/shop">
        <i class="fas fa-2x fa-shopping-cart"></i>
        <p>
          Online
          <br />Shop
        </p>
      </router-link>
    </div>
    <Swiper></Swiper>
    <div class="imagepage-content d-flex d-sm-none">
      <h1 class="logo">
        <router-link to="/shop">
          <img src="@/assets/images/core-img/logo2.png" width="137" height="55" alt="Amado" />
        </router-link>
      </h1>
      <div class="imagepage-content-text">
        <p>FEEL PROUD OF YOUR HOME</p>
        <p>Our Design Guides can help</p>
      </div>
    </div>
    <section class="container-fluid concept py-4 my-5" data-aos="fade-up" data-aos-duration="2000">
      <div class="row">
        <div class="col-md-7 concept-img bg-cover"></div>
        <div class="container">
          <div class="row">
            <div class="col-md-12 py-5 concept-text-mobile">
              <div class="concept-text">
                <div class="concept-title">
                  <h4>Concept</h4>
                  <h3>Fashion x Comfort x Texture</h3>
                </div>
                <div class="concept-content">
                  <p>
                    Furniture can be not only fashionable
                    <br />but also comfort and quality at the same time
                    <br />Amado can give you most chooices
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="bg-box d-block d-md-none"></div>
    </section>
    <section class="container-fluid parallex-scrolling-area">
      <div class="container position-relative">
        <div class="row parallex-scrolling-height">
          <div class="col-md-9">
            <div
              class="parallex-scrolling-img d-none d-md-block"
              :style="{ backgroundImage:`url(${ParallexImgOne})` }"
              style="background-position: bottom -90px right 120px"
            ></div>
            <div
              class="parallex-scrolling-img d-block d-md-none"
              :style="{ backgroundImage:`url(${ParallexImgOne})` }"
              style="background-position: bottom -50px right -150px"
            ></div>
          </div>
          <div class="col-md-3 parallex-text-mobile" data-aos="fade-up" data-aos-duration="2000">
            <div class="scroll d-none d-md-block">
              <div class="scroll-back"></div>
              <div class="scroll-drop"></div>
            </div>
            <div class="parallex-scrolling-text text-md-right">
              <div class="parallex-scrolling-title">
                <h3>Chair</h3>
              </div>
              <div class="parallex-scrolling-content">
                <p>
                  The contemporary sof
                  <br />You're sure to love the details
                  <br />of its linear design
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="container mt-5 position-relative">
        <div class="row parallex-scrolling-height flex-row-reverse">
          <div class="col-md-9">
            <div
              class="parallex-scrolling-img d-none d-md-block"
              :style="{ backgroundImage:`url(${ParallexImgTwo})` }"
              style="background-position: bottom -300px left 250px"
            ></div>
            <div
              class="parallex-scrolling-img d-block d-md-none"
              :style="{ backgroundImage:`url(${ParallexImgTwo})` }"
              style="background-position: bottom 0px left 0px"
            ></div>
          </div>
          <div class="col-md-3 parallex-text-mobile" data-aos="fade-up" data-aos-duration="2000">
            <div class="scroll d-none d-md-block">
              <div class="scroll-back" style="left:0"></div>
              <div class="scroll-drop" style="left:0"></div>
            </div>
            <div class="parallex-scrolling-text">
              <div class="parallex-scrolling-title">
                <h3>Table</h3>
              </div>
              <div class="parallex-scrolling-content">
                <p>
                  A table suitable for lunch
                  <br />and wine with guests
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="container mt-5 position-relative">
        <div class="row parallex-scrolling-height">
          <div class="col-md-9">
            <div
              class="parallex-scrolling-img d-none d-md-block"
              :style="{ backgroundImage:`url(${ParallexImgThree})` }"
              style="background-position: bottom 30px right 190px"
            ></div>
            <div
              class="parallex-scrolling-img d-block d-md-none"
              :style="{ backgroundImage:`url(${ParallexImgThree})` }"
              style="background-position: bottom 0px right -150px"
            ></div>
          </div>
          <div class="col-md-3 parallex-text-mobile" data-aos="fade-up" data-aos-duration="2000">
            <div class="scroll d-none d-md-block">
              <div class="scroll-back"></div>
              <div class="scroll-drop"></div>
            </div>
            <div class="parallex-scrolling-text text-md-right">
              <div class="parallex-scrolling-title">
                <h3>Bed</h3>
              </div>
              <div class="parallex-scrolling-content">
                <p>
                  Refined designer style creates
                  <br />a look that you'll relish coming
                  <br />home to every night after a long
                  <br />day at the office.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="container-fluid go-shopping-area">
      <div class="container">
        <div class="logo-bg">
          <img src="@/assets/images/core-img/logo.png" class="img-fluid" alt />
        </div>
        <div class="go-shopping-text">
          <router-link to="/shop" class="btn btn-dark btn-lg">
            <i class="fas fa-angle-right mr-2"></i>Go Shopping
          </router-link>
        </div>
      </div>
    </section>
    <Subscribe />
    <Footer />
  </div>
</template>

<script>
import Swiper from '@/components/frontend/Swiper.vue'
import Subscribe from '@/components/frontend/Subscribe.vue'
import Footer from '@/components/frontend/Footer.vue'
import ParallexScrollingImgOne from '@/assets/images/custom-img/parallex-scrolling-img-1.jpg'
import ParallexScrollingImgTwo from '@/assets/images/custom-img/parallex-scrolling-img-2.jpg'
import ParallexScrollingImgThree from '@/assets/images/custom-img/parallex-scrolling-img-3.jpg'
export default {
  data () {
    return {
      ParallexImgOne: ParallexScrollingImgOne,
      ParallexImgTwo: ParallexScrollingImgTwo,
      ParallexImgThree: ParallexScrollingImgThree
    }
  },
  components: {
    Swiper,
    Subscribe,
    Footer
  }
}
</script>
