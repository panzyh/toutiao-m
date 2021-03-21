<template >
  <div class="search-result" >
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :error.sync="error"
      error-text="加载失败，请点击重试"
      @load="onLoad"
    >
      <van-cell
        v-for="(article,index) in list"
        :key="index"
        :title="article.title" />
    </van-list >
  </div >
</template >

<script >
import { getSearchResult } from '@/api/search'

export default {
  name: 'SearchResult',
  components: {},
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      perpage: 20,
      error: false
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async onLoad () {
      try {
        // 1. 请求获取数据
        const { data: res } = await getSearchResult({
          page: this.page, // 页码
          per_page: this.perpage, // 每页大小
          q: this.searchText// 查询关键词
        })
        // console.log(res)

        // 2. 将数据添加到数组列表中
        const { results } = res.data
        this.list.push(...results)

        // 3. 将本次加载中的 loading 关闭
        this.loading = false

        // 4. 判断是否还有数据
        if (results.length) {
          this.page++
        } else {
          this.finished = true
        }
      } catch (e) {
        // 展示加载失败的提示状态
        this.error = true

        // 加载失败了 loading 也要关闭
        this.loading = false
      }
    }
  }
}
</script >

<style scoped lang="less" ></style >
