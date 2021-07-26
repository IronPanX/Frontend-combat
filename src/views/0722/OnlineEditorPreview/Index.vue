<template>
  <div>
    <h2>在线编辑器预览</h2>
    <div>
      Language:
      <select id="languageSelect" v-model="language" @change="handleLanguage">
        <option value="html">HTML</option>
        <option value="css">CSS</option>
        <option value="javascript">Javascript</option>
        <option value="vue">Vue</option>
      </select>
      |
      <input ref="readFile" :accept="suffix" type="file" @input="readFile">
      |
      <button @click="saveFile">保存文件</button>
      |
      <button @click="preview">预览</button>
    </div>
    <br>
    <div class="flex-container">
      <div id="container" style="width: 60%;height: 720px;"></div>
      <iframe id="frame" src="" style="width: 40%;height: 720px;"></iframe>
    </div>
  </div>
</template>

<script>
import * as monaco from 'monaco-editor'
import axios from 'axios'

export default {
  name: "Index",
  data() {
    return {
      language: 'javascript',
      suffix: '.js',
      name: '',
      suffixes: {
        'html': '.html',
        'css': '.css',
        'javascript': '.js',
      }
    }
  },
  mounted() {
    this.initEditor()
  },
  methods: {
    initEditor() {
      monaco.editor.create(document.getElementById('container'), {
        value: '',
        language: 'javascript',
        automaticLayout: true,
        theme: 'vs-dark'
      });
    },
    handleLanguage() {
      monaco.editor.setModelLanguage(monaco.editor.getModels()[0], this.language)
      this.suffix = this.suffixes[this.language]
    },
    readFile() {
      let reader = new FileReader()
      reader.readAsText(this.$refs.readFile.files[0])
      reader.onload = () => {
        monaco.editor.getModels()[0].setValue(reader.result)
      }
    },
    saveFile() {
      let content = monaco.editor.getModels()[0].getValue()
      let name = this.$refs.readFile.files[0] ? this.$refs.readFile.files[0].name : '新建文件'
      let blob = new Blob([content], {type: `text/${this.language}`})
      let downloadEl = document.createElement("a");
      let href = window.URL.createObjectURL(blob);
      downloadEl.href = href;
      downloadEl.download = `${name}`;
      document.body.appendChild(downloadEl);
      downloadEl.click();
      document.body.removeChild(downloadEl);
    },
    preview() {
      axios.post('http://localhost/node/upload', {
        data: monaco.editor.getModels()[0].getValue(),
        suffix: this.suffix
      }).then(res => {
        console.log(res)
        let iframeEl = document.getElementById('frame')
        iframeEl.src = res.data.url
      }).catch(err => console.log(err))

    }
  }
}
</script>

<style scoped>
.flex-container {
  display: flex;
}
</style>
