<template>
  <div>
    <div class="card-columns">
      <div class="card" data-aos="zoom-in" data-aos-duration="1500">
        <router-link to="shop/products">
          <img src="~@/assets/images/bg-img/1.jpg" alt="image" />
          <div class="card-body">
            <div class="card-line"></div>
            <p class="card-text">From $180</p>
            <h4 class="card-title">Modern Chari</h4>
          </div>
        </router-link>
      </div>
      <div class="card" data-aos="zoom-in" data-aos-duration="1500">
        <router-link to="shop/products">
          <img src="~@/assets/images/bg-img/5.jpg" alt="image" />
          <div class="card-body">
            <div class="card-line"></div>
            <p class="card-text">From $180</p>
            <h4 class="card-title">Plant Pot</h4>
          </div>
        </router-link>
      </div>
      <div class="card" data-aos="zoom-in" data-aos-duration="1500">
        <router-link to="shop/products">
          <img src="~@/assets/images/bg-img/8.jpg" alt="image" />
          <div class="card-body">
            <div class="card-line"></div>
            <p class="card-text">From $180</p>
            <h4 class="card-title">Modern Rocking Chair</h4>
          </div>
        </router-link>
      </div>
      <div class="card" data-aos="zoom-in" data-aos-duration="1500">
        <router-link to="shop/products">
          <img src="~@/assets/images/bg-img/2.jpg" alt="image" />
          <div class="card-body">
            <div class="card-line"></div>
            <p class="card-text">From $180</p>
            <h4 class="card-title">Minimalistic Plant Pot</h4>
          </div>
        </router-link>
      </div>
      <div class="card" data-aos="zoom-in" data-aos-duration="1500">
        <router-link to="shop/products">
          <img src="~@/assets/images/bg-img/6.jpg" alt="image" />
          <div class="card-body">
            <div class="card-line"></div>
            <p class="card-text">From $180</p>
            <h4 class="card-title">Small Table</h4>
          </div>
        </router-link>
      </div>
      <div class="card" data-aos="zoom-in" data-aos-duration="1500">
        <router-link to="shop/products">
          <img src="~@/assets/images/bg-img/9.jpg" alt="image" />
          <div class="card-body">
            <div class="card-line"></div>
            <p class="card-text">From $180</p>
            <h4 class="card-title">Home Deco</h4>
          </div>
        </router-link>
      </div>
      <div class="card" data-aos="zoom-in" data-aos-duration="1500">
        <router-link to="shop/products">
          <img src="~@/assets/images/bg-img/3.jpg" alt="image" />
          <div class="card-body">
            <div class="card-line"></div>
            <p class="card-text">From $180</p>
            <h4 class="card-title">Modern Chari</h4>
          </div>
        </router-link>
      </div>
      <div class="card" data-aos="zoom-in" data-aos-duration="1500">
        <router-link to="shop/products">
          <img src="~@/assets/images/bg-img/4.jpg" alt="image" />
          <div class="card-body">
            <div class="card-line"></div>
            <p class="card-text">From $180</p>
            <h4 class="card-title">Night Stand</h4>
          </div>
        </router-link>
      </div>
      <div class="card" data-aos="zoom-in" data-aos-duration="1500">
        <router-link to="shop/products">
          <img src="~@/assets/images/bg-img/7.jpg" alt="image" />
          <div class="card-body">
            <div class="card-line"></div>
            <p class="card-text">From $180</p>
            <h4 class="card-title">Metallic Chair</h4>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Home',
  data () {
    return {}
  },
  created () {
    this.$bus.$emit('menu:active', 'HOME')
  }
}
</script>
