<script>
export default {
  props: [
    'index',
    'currentItem',
    'drawList'
  ],
  render(h) {
    return h(
        'el-form-item',
        {
          'class': {
            'form-item': true
          },
          attrs: {
            label: this.currentItem.label
          },
        },
        [
          this.currentItem.tag === 'el-button' ?
              h(this.currentItem.tag, {}, ['按钮']) :
              h(this.currentItem.tag),
          h('el-button', {
            'class': {
              'del-btn': true
            },
            attrs: {
              type: 'danger',
              circle: true,
              icon: "el-icon-delete"
            },
            on: {
              click: () => {
                this.$emit('deleteItem',this.index,this.drawList)
              }
            },
          })
        ]
    )
  }
}
</script>
