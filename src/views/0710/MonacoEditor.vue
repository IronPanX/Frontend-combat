<template>
  <div>
    <h2>使用monaco-editor编辑保存代码</h2>
    <div>
      Language:
      <select id="languageSelect" v-model="language" @change="handleLanguage">
        <option value="html">HTML</option>
        <option value="css">CSS</option>
        <option value="javascript">Javascript</option>
      </select>
      |
      <input ref="readFile" :accept="suffix" type="file" @input="readFile">
      |
      <button @click="saveFile">保存文件</button>
    </div>
    <br>
    <div id="container" style="width: 1280px;height: 720px;"></div>
  </div>
</template>

<script>
import * as monaco from 'monaco-editor'

export default {
  name: "MonacoEditor",
  data() {
    return {
      language: 'html',
      suffix: '.html',
      name: '',
      suffixes: {
        'html': '.html',
        'css': '.css',
        'javascript': '.js'
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
        language: 'html',
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
      let name = this.$refs.readFile.files[0].name
      let blob = new Blob([content], {type: `text/${this.language}`})
      let downloadEl = document.createElement("a");
      let href = window.URL.createObjectURL(blob);
      downloadEl.href = href;
      downloadEl.download = `${name}`;
      document.body.appendChild(downloadEl);
      downloadEl.click();
      document.body.removeChild(downloadEl);
    }
  }
}
</script>
<style></style>
