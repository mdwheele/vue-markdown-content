# MarkdownContent

## Install

```bash
npm install vue-markdown-content
```

## Usage

```vue
<template>
  <div>
    <markdown-content>
      # Hello, World!
      
      This is some sample text! Remember, you can also use GitHub Emoji! :+1:
      
      The component reads https://api.github.com/emojis.
    </markdown-content>
  </div>
</template>

<script>
import MarkdownContent from "vue-markdown-content"

export default {
  components: {
    MarkdownContent
  },
}
</script>
```

## Contributing

I have no idea what I'm doing packaging NPM modules. Send a pull request!

## License 

[MIT](LICENSE.md)
