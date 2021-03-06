import marked from 'marked';

(function(){ if(typeof document !== 'undefined'){ var head=document.head||document.getElementsByTagName('head')[0], style=document.createElement('style'), css=""; style.type='text/css'; if (style.styleSheet){ style.styleSheet.cssText = css; } else { style.appendChild(document.createTextNode(css)); } head.appendChild(style); } })();

var component = {
  data: function data() {
    return {
      emoji: {}
    }
  },
  created: function created() {
    var this$1 = this;

    fetch('//api.github.com/emojis', {
      mode: 'cors'
    }).then(function (response) { return response.json(); })
      .then(function (data) {
        this$1.emoji = data;
      });
  },
  computed: {
    renderedContent: function renderedContent() {
      var this$1 = this;

      var content = this.$slots.default[0].text.replace(/\n\s+/g, "\n\n");

      return marked(content, { sanitize: true })
        .replace(/:(.*):/g, function (match, $1) {
          if (this$1.emoji.hasOwnProperty($1)) {
            return ("<img src=\"" + (this$1.emoji[$1]) + "\" width='18' />")
          }

          return match
        })
    }
  },
  render: function render(h) {
    return h('div', {
      domProps: {
        innerHTML: this.renderedContent
      }
    })
  }
}

// Import vue component

// Declare install function executed by Vue.use()
function install(Vue) {
  if (install.installed) { return; }
  install.installed = true;
  Vue.component('MarkdownContent', component);
}

// Create module definition for Vue.use()
var plugin = {
  install: install,
};

// Auto-install when vue is found (eg. in browser via <script> tag)
var GlobalVue = null;
if (typeof window !== 'undefined') {
  GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue;
}
if (GlobalVue) {
  GlobalVue.use(plugin);
}

export default component;
export { install };
