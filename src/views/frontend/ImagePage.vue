<template>
  <div class="imagepage-area position-relative">
    <nav class="navbar navbar-expand-lg navbar-dark" data-aos="fade-down" data-aos-duration="2000">
      <router-link to="/shop">
        <h1 class="navbar-logo">
          <img src="@/assets/images/core-img/logo2.png" width="137px" height="55px" alt="Amado" />
        </h1>
      </router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav ml-auto">
          <router-link class="nav-link" to="/shop">Home</router-link>
          <router-link class="nav-link" to="/shop/products">Products</router-link>
          <router-link class="nav-link" to="/shop/coupons">Coupons</router-link>
          <router-link class="nav-link" to="/shop/cart">Cart</router-link>
        </div>
      </div>
    </nav>
    <Swiper></Swiper>
    <div class="imagepage-content d-flex d-sm-none">
      <div class="logo">
        <img src="@/assets/images/core-img/logo2.png" width="137" height="55" alt="Amado" />
      </div>
      <div class="imagepage-content-text">
        <p>
          FEEL PROUD OF YOUR HOME
          <br />Our Design Guides can help
        </p>
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
          <img src="@/assets/images/core-img/logo.png" class="img-fluid" alt="Amado" />
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
