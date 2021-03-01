<template>
  <div>
    <nav aria-label="Page navigation example">
      <ul class="pagination justify-content-center">
        <li class="page-item" :class="{ disabled: !pages.has_pre }">
          <a
            class="page-link"
            href="#"
            aria-label="Previous"
            @click.prevent="changePages(pages.current_page - 1)"
          >
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li
          class="page-item"
          v-for="page in pages.total_pages"
          :key="page"
          :class="{ active: pages.current_page === page }"
        >
          <a class="page-link" href="#" @click.prevent="changePages(page)">
            {{
            page
            }}
          </a>
        </li>
        <li class="page-item" :class="{ disabled: !pages.has_next }">
          <a
            class="page-link"
            href="#"
            aria-label="Next"
            @click.prevent="changePages(pages.current_page + 1)"
          >
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  props: ['pages'], // 接收外部的資料
  methods: {
    changePages (page) {
      this.$emit('emit-page', page)
    } // $emit向外層傳遞事件並帶入參數
  }
}
</script>
