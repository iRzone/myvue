<template>
  <div>
    <Table :columns="columns" :data="usersList"></Table>
    <user-form v-model="showModal" :userInfo='userInfo'></user-form>
  </div>
</template>

<script>
import userForm from '@/components/user-form.vue'
import util from '@/libs/util.js'
export default {
  components: {
    userForm
  },
  data () {
    return {
      columns: [
        {
          title: 'ID',
          key: 'ID'
        },
        {
          title: '用户名(账号)',
          key: 'UserName'
        },
        {
          title: '管理员',
          key: 'Admin',
          render: (h, params) => {
            return h('div', [
              h('div', {
                style: {
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  backgroundColor: params.row.Admin? '#19be6b': '#808695'
                },
              })
            ])
          }
        },
        {
          title: '操作',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  disabled: params.row.Admin? true: false
                },
                on: {
                  click: () => {
                    this.handleModal(params.row)
                  }
                }
              }, '修改')
            ])
          }
        }
      ],
      usersList: [],
      showModal: false,
      userInfo: null
    }
  },
  mounted () {
    this.getUserList()
  },
  methods: {
    getUserList () {
      util.get('/users/list').then(res => {
        if (res.data.Code === 200) {
          this.usersList = res.data.Data
        }
      })
    },
    handleModal (e) {
      if (e) {
        this.userInfo = e
      }
      this.showModal = true
    }
  }
}
</script>

<style lang="less" scoped>

</style>
