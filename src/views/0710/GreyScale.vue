<template>
  <div>
    <h2>图片转灰度图</h2>
    <div>
      <div>
        <input ref="readImage" accept="image/*" type="file" @input="handleImageFile">
        |
        <button @click="toGrey">转灰度图</button>
        |
        <button @click="saveImage">保存图片</button>
      </div>
      <br>
      <canvas id="canvas"></canvas>
      <div id="imageContainer"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "GreyScale",
  data() {
    return {
      canvas:{},
      context:{},
      imageFile: {},
      imageWidth: '',
      imageHeight: '',
      imageData: {},
      greyData: {}
    }
  },
  methods: {
    handleImageFile() {
      this.imageFile = this.$refs.readImage.files[0]
      this.initCanvas()
    },

    initCanvas() {
      let image = new Image()
      let reader = new FileReader()
      this.canvas = document.getElementById("canvas")
      this.context = this.canvas.getContext('2d')
      reader.readAsDataURL(this.imageFile)
      reader.onload = () => {
        image.src = reader.result
        image.onload = () => {
          this.imageWidth = image.width
          this.imageHeight = image.height
          this.canvas.width = this.imageWidth
          this.canvas.height = this.imageHeight
          this.context.drawImage(image, 0, 0, this.imageWidth, this.imageHeight)
          this.getImgData(this.context)
        }
      }
    },

    getImgData(ctx) {
      this.imageData = ctx.getImageData(0, 0, this.imageWidth, this.imageHeight)
      this.greyData = this.imageData
    },

    toGrey() {
      this.convertToGrey(this.imageData)
      this.context.putImageData(this.greyData, 0, 0)
    },

    convertToGrey(data) {
      for (let x = 0; x < this.imageWidth; x++) {
        for (let y = 0; y < this.imageHeight; y++) {
          let index = (x + y * this.imageWidth) * 4
          let r = data.data[index]
          let g = data.data[index + 1]
          let b = data.data[index + 2]
          let a = data.data[index + 3]
          let grey = 0.299 * r + 0.587 * g + 0.114 * b
          this.greyData.data[index] = grey
          this.greyData.data[index + 1] = grey
          this.greyData.data[index + 2] = grey
          this.greyData.data[index + 3] = a
        }
      }
    },

    dataURLtoBlob(dataurl) {
      var arr = dataurl.split(',');
      var _arr = arr[1].substring(0,arr[1].length-2);
      var mime = arr[0].match(/:(.*?);/)[1],
          bstr =atob(_arr),
          n = bstr.length,
          u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new Blob([u8arr], {
        type: mime
      });
    },

    saveImage() {
      let blob = this.dataURLtoBlob(this.canvas.toDataURL(this.imageFile.type))
      let downloadEl = document.createElement("a");
      let href = window.URL.createObjectURL(blob);
      downloadEl.href = href;
      downloadEl.download = `${this.imageFile.name.split('.')[0]}-grey.${this.imageFile.name.split('.')[1]}`;
      document.body.appendChild(downloadEl);
      downloadEl.click();
      document.body.removeChild(downloadEl);
    }

  }
}
</script>

<style>

</style>
