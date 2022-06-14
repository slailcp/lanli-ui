<template>
  <div class="popup-page">
    <template v-if="nodeData.type!=='start'">
      <div class="group">
        <span
          v-if="!showedit"
          @click="showedit = true;"
          class="copybtn"
          data-clipboard-target="#foo"
        >
          {{ClipboardName}}
          <Icon name="Edit" color="#999" />
        </span>
        <input
          v-if="showedit"
          @blur="showedit = false;"
          id="foo"
          type="text"
          v-model="ClipboardName"
        />
      </div>
    </template>
    <div class="group">
      <div class="key">nodeName:</div>
      <input class="value" type="text" v-model.trim="nodeName" />
    </div>

    <div class="group" v-if="conditionsData.length">
      <div class="key">level:</div>
      <select class="value" v-model="level">
        <option v-for="item in conditionsData.length-1" :key="item">{{item}}</option>
      </select>
    </div>

    <div class="group">
      <div class="key">设置条件:</div>
      <div class="value">
        <span class="app-list" v-for="item of condlist" :key="item.name" @click="chooseFn(item,1)">
          <Icon class="ver-mid" name="circle-check" color="#999" v-show="item.checked" />
          <Icon class="ver-mid" name="circle" color="#999" v-show="!item.checked" />
          <span class="ver-mid">{{item.value}}</span>
        </span>
      </div>
    </div>
  </div>
  <div class="bottom">
    <span class="btn" @click="onCancel">取消</span>
    <span class="btn enter" @click="onEnter">确定</span>
  </div>
</template>

<script>
import { defineComponent, reactive, toRefs } from "vue";
import { setCondLevel, Toast, Icon } from "approval-flow";
export default defineComponent({
  props: ["conditionsData", "nodeData"],
  emits: ["on-enter", "on-cancel"],
  components: { Icon },
  setup(props, { emit }) {
    const state = reactive({
      ClipboardName: "",
      nodeName: "",
      level: 0,
      showedit: false,
      condlist: [
        { name: "0", value: "条件1" },
        { name: "1", value: "条件2" },
        { name: "2", value: "条件3" },
        { name: "3", value: "条件4" },
        { name: "4", value: "条件5" },
        { name: "5", value: "条件6" },
      ],
    });

    state.ClipboardName = props.nodeData.name || "";
    state.nodeName = props.nodeData.nodeName || "";
    state.level = props.nodeData.level;

    const onEnter = () => {
      if (!state.nodeName) {
        Toast({ message: "nodeName不可以为空" });
        return;
      }

      state.popupshow = false;
      props.nodeData.name = state.ClipboardName;
      props.nodeData.nodeName = state.nodeName;
      setCondLevel(props.conditionsData, props.nodeData.level, state.level);

      props.nodeData.properties.condition =
        state.condlist.find((item) => item.checked) || "";

      emit("on-enter");
    };
    const onCancel = () => {
      emit("on-cancel");
    };

    const chooseFn = (item, type) => {
      if (type == 1) state.condlist.forEach((item) => (item.checked = false));
      item.checked = !item.checked;
    };
    return {
      ...toRefs(state),
      onEnter,
      onCancel,
      chooseFn,
    };
  },
});
</script>

<style lang="less" scoped>
.ver-mid {
  vertical-align: middle;
  display: inline-block;
}
.app-list {
  margin-right: 20px;
  cursor: pointer;
  display: inline-block;
}
.group {
  display: flex;
  margin-bottom: 10px;
  line-height: 32px;
  .key {
    width: 100px;
    text-align: right;
  }
  .value {
    flex: 1;
    margin-left: 10px;
  }
}
.popup-page {
  min-height: 100%;
  padding-bottom: 70px;
  box-sizing: border-box;
  padding: 20px;
  input,
  select {
    height: 30px;
    width: 200px;
    line-height: 30px;
    border: 1px solid #d8d8d8;
    border-radius: 7px;
    outline: none;
    margin-left: 10px;
  }
}
.bottom {
  position: static;
  bottom: 0;
  width: 100%;
  box-shadow: 0 0 5px #333;
  line-height: 70px;
  margin-top: -70px;
  text-align: center;
  .btn {
    display: inline-block;
    width: 100px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    color: #333;
    border: 1px solid #d8d8d8;
    cursor: pointer;
    margin: 0 10px;
    &.enter {
      background: #00a0ed;
      color: #fff;
      border-color: #00a0ed;
    }
  }
}
</style>
