<template>
  <div>
    会员管理
  </div>
</template>

<script>
import util from '@/libs/util.js'
export default {
  data () {
    return {

    }
  },
  mounted () {
    this.getUserList()
  },
  methods: {
    getUserList () {
      util.get('/users/list').then(res => {
        console.log(res)
      })
    }
  }
}
</script>

<style lang="less" scoped>

</style>
