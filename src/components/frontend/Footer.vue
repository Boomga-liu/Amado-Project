<template>
  <div class="footer-area">
    <footer class="footer">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-12 col-lg-4">
            <a href="#">
              <div class="footer-logo bg-cover"></div>
            </a>
            <p class="copywrite mt-2">
              Copyright &copy; 此為專案練習，無商業用途。 by Boomga-liu
            </p>
          </div>
          <div class="col-12 col-lg-8">
            <nav class="navbar navbar-expand-lg">
              <button
                class="navbar-toggler mb-2"
                type="button"
                data-toggle="collapse"
                data-target="#footerSupportedContent"
                aria-controls="footerSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <i class="fa fa-bars"></i>
              </button>
              <div
                class="collapse navbar-collapse justify-content-end"
                id="footerSupportedContent"
              >
                <ul class="navbar-nav w-75 justify-content-between">
                  <li class="nav-item">
                    <router-link class="nav-link" to="/">
                      HOME
                    </router-link>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="#">SHOP</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="#">PRODUCT</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="#">CART</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="#">CHECKOUT</a>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>
<script>
export default {
  data () {
    return {}
  }
}
</script>
