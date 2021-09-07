<template>
  <el-container>
    <el-aside style="padding-top: 15px;background: lightgray;">
      <el-scrollbar>
        <draggable
            :clone="cloneComponent"
            :group="{ name: 'componentsGroup', pull: 'clone', put: false }"
            :list="components"
            :sort="false"
            draggable=".components-item"
            style="display: flex;flex-direction: column;align-items: center;"
        >
          <el-button v-for="(element, index) in components"
                     :key="index"
                     class="components-item"
                     style="margin-bottom: 15px;"
                     @click="addComponent(element)"
          >
            {{ element.label }}
          </el-button>
        </draggable>
      </el-scrollbar>
    </el-aside>
    <el-main>
      <el-scrollbar>
        <el-row>
          <el-form class="form" label-width="100px">
            <draggable :animation="340" :list="drawingList" group="componentsGroup">
              <DraggableItem
                  v-for="(item, index) in drawingList"
                  :key="'render' + index"
                  :current-item="item"
                  :index="index"
                  :draw-list="drawingList"
                  @deleteItem="deleteItem"
              />
            </draggable>
          </el-form>
        </el-row>
      </el-scrollbar>
    </el-main>
  </el-container>
</template>

<script>
import drawingDefault from "./drawingDefault";
import draggable from 'vuedraggable'
import DraggableItem from "./DraggableItem";

export default {
  name: "Home",
  components: {
    DraggableItem,
    draggable,

  },
  data() {
    return {
      components: [
        {
          label: '输入框',
          tag: 'el-input',
        },
        {
          label: '计数器',
          tag: 'el-input-number',
        },
        {
          label: '级联选择器',
          tag: 'el-cascader',
        },
        {
          label: '开关',
          tag: 'el-switch',
        },
        {
          label: '滑块',
          tag: 'el-slider',
        },
        {
          label: '时间选择器',
          tag: 'el-time-picker',
        },
        {
          label: '日期选择器',
          tag: 'el-date-picker',
        },
        {
          label: '评分',
          tag: 'el-rate',
        },
        {
          label: '颜色选择器',
          tag: 'el-color-picker',
        },
        {
          label: '按钮',
          tag: 'el-button'
        }
      ],
      drawingList: drawingDefault
    }
  },
  mounted() {

  },
  methods: {
    addComponent(item) {
      this.drawingList.push(this.cloneComponent(item))
    },

    cloneComponent(origin) {
      return JSON.parse(JSON.stringify(origin))
    },

    deleteItem(index, list) {
      list.splice(index, 1)
    }
  }
}
</script>

<style>
.el-button:first-child {
  margin-left: 10px;
}

.form {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  padding: 30px;
}

.form-item {
  position: relative;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  padding: 15px;
  border: dashed 1px transparent;
  cursor: move;
}

.form-item:hover {
  border-color: lightgray;
}

.form-item:hover .del-btn {
  display: block;
}

.del-btn {
  display: none;
  position: absolute;
  top: 0;
  right: 0;
  -webkit-transform: translate(50%, -100%);
  -moz-transform: translate(50%, -100%);
  -ms-transform: translate(50%, -100%);
  -o-transform: translate(50%, -100%);
  transform: translate(50%, -100%);
}
</style>
