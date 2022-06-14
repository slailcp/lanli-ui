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
      <div class="key">选择审批人:</div>
      <div class="value">
        <span
          class="app-list"
          v-for="item of applist"
          :key="item.name"
          @click="chooseApproval(item,1)"
        >
          <Icon class="ver-mid" name="circle-check" color="#999" v-show="item.checked" />
          <Icon class="ver-mid" name="circle" color="#999" v-show="!item.checked" />
          <span class="ver-mid">{{item.value}}</span>
        </span>
      </div>
    </div>

    <div class="group" v-if="applist[2].checked">
      <div class="key">选择员工:</div>
      <div class="value">
        <span
          class="app-list"
          v-for="item of members"
          :key="item.mid"
          @click="chooseApproval(item,2)"
        >
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
      applist: [
        { name: "0", value: "直属领导" },
        { name: "0", value: "申请人本人" },
        { name: "0", value: "指定成员" },
      ],
      members: [
        { mid: "0", value: "貂蝉" },
        { mid: "1", value: "吕布" },
        { mid: "2", value: "赵云" },
        { mid: "3", value: "关羽" },
        { mid: "4", value: "张飞" },
        { mid: "5", value: "刘备" },
        { mid: "6", value: "孙尚香" },
        { mid: "7", value: "西施" },
      ],
    });

    state.ClipboardName = props.nodeData.name || "";
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

      emit("on-enter");
    };
    const onCancel = () => {
      emit("on-cancel");
    };

    const chooseApproval = (item, type) => {
      if (type == 1) state.applist.forEach((item) => (item.checked = false));
      if (type == 2) state.members.forEach((item) => (item.checked = false));
      item.checked = !item.checked;
    };
    return {
      ...toRefs(state),
      onEnter,
      onCancel,
      chooseApproval,
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
