<template>
  <div class="ui center aligned container">
    <br>
    <div class="ui horizontal pagination menu">

      <a :class="'item ' + allowedPageClass(page - 1)" href="javascript:void(0)" @click="prev">&lt;
      </a>

      <a v-for="pageNum in totalPages" :key="pageNum" :class="'item ' + activeClass(pageNum)" href="javascript:void(0)" @click="setPage(pageNum)">{{ pageNum }}
      </a>

      <a :class="'item ' + allowedPageClass(page + 1)" href="javascript:void(0)" @click="next">&gt;
      </a>

    </div>

    <p v-show="parseInt(items)">{{count}}</p>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Number,
      required: true
    },
    perPage: {
      type: Number,
      default: 10
    },
    countText: {
      type: String,
      default: 'Mostrando {from} a {to} de {count} jogos|{count} jogos|1 jogo'
    },
    currentPage: {
      type: Number,
      default: 1
    }
  },
  model: {
    prop: 'currentPage',
    event: 'page-change'
  },
  data: function () {
    return { page: this.currentPage }
  },
  watch: {
    currentPage: function (val) {
      this.page = val
    }
  },
  computed: {
    totalPages: function () {
      return this.items ? Math.ceil(this.items / this.perPage) : 1
    },
    count: function () {
      let from = (this.page - 1) * this.perPage + 1
      let to = this.page === this.totalPages ? this.items : from + this.perPage - 1
      let parts = this.countText.split('|')
      let i = this.items === 1 ? 2 : this.totalPages === 1 ? 1 : 0
      return parts[i].replace('{count}', this.items).replace('{from}', from).replace('{to}', to)
    }
  },
  methods: {
    setPage: function (page) {
      if (this.allowedPage(page)) {
        this.page = page
        this.$emit('page-change', page)
      }
    },
    next: function () {
      return this.setPage(this.page + 1)
    },
    prev: function () {
      return this.setPage(this.page - 1)
    },
    allowedPage: function (page) {
      return page >= 1 && page <= this.totalPages
    },
    allowedPageClass: function (page) {
      return this.allowedPage(page) ? '' : 'disabled'
    },
    activeClass: function (page) {
      return this.page === page ? 'active' : ''
    }
  }
}
</script>

<style scoped>
  .pagination-component {
    text-align: center;
  }
  .pagination {
    margin: auto;
  }
</style>
