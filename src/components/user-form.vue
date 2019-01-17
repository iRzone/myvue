<template>
  <Modal v-model="modal" title="修改用户信息" @on-ok="ok" @on-cancel="cancel">
    <p>Content of dialog</p>
    <p>Content of dialog</p>
    <p>Content of dialog</p>
  </Modal>
</template>

<script>
export default {
  data () {
    return {
      modal: false
    }
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    userInfo: {
      type: Object,
      default: null
    }
  },
  watch: {
    value: function (e) {
      this.modal = e
    },
    modal: function (e) {
      if (!e) {
        this.$emit('input', e)
      }
    }
  },
  methods: {
    ok () {
      this.$Message.info('Clicked ok');
    },
    cancel () {
      this.$Message.info('Clicked cancel');
    }
  }
}
</script>
