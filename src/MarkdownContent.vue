<script>
  import marked from 'marked'

  export default {
    data() {
      return {
        emoji: {}
      }
    },
    created() {
      fetch('//api.github.com/emojis', {
        mode: 'cors'
      }).then(response => response.json())
        .then(data => {
          this.emoji = data
        })
    },
    computed: {
      renderedContent() {
        let content = this.$slots.default[0].text.replace(/\n\s+/g, "\n\n")

        return marked(content, { sanitize: true })
          .replace(/:(.*):/g, (match, $1) => {
            if (this.emoji.hasOwnProperty($1)) {
              return `<img src="${this.emoji[$1]}" width='18' />`
            }

            return match
          })
      }
    },
    render(h) {
      return h('div', {
        domProps: {
          innerHTML: this.renderedContent
        }
      })
    }
  }
</script>
