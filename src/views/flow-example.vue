<template>
  <div class="pagebox">
    <div class="topnav">
      <span class="enter" @click="onSubmit">提交</span>
    </div>
    <OfficeFlow :add-nodes="adddata" :node="cnode" @on-add="onAdd" @on-choose="onChoose" />

    <Popup v-model:show="popupshow" position="right" style="height:100%;width:40%">
      <template v-if="nodeData.type !== 'condition'">
        <choose-approval
          v-if="popupshow "
          :conditionsData="conditionsData"
          :nodeData="nodeData"
          @on-cancel="popupshow = false"
          @on-enter="popupshow = false"
        />
      </template>

      <template v-else>
        <choose-condition
          v-if="popupshow"
          :conditionsData="conditionsData"
          :nodeData="nodeData"
          @on-cancel="popupshow = false"
          @on-enter="popupshow = false"
        />
      </template>
    </Popup>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { OfficeFlow, FlowValidate, Popup, Toast } from "approval-flow";
import chooseApproval from "./components/choose-approval.vue";
import chooseCondition from "./components/choose-condition.vue";
import ClipboardJS from "clipboard";
new ClipboardJS(".copybtn");

@Options({
  components: {
    OfficeFlow: OfficeFlow,
    Popup,
    chooseApproval,
    chooseCondition,
  },
})
export default class ScorePage extends Vue {
  // 原始数据
  cnode = {
    name: "提交人",
    type: "start",
    nodeName: "",
    properties: {
      // 数据可以存放到properties对象里面
    },
  };

  // 添加节点的时候有哪些项目
  adddata = [
    { key: "approver", value: "审批人", icon: "Stamp", color: "#3d91eb" },
    {
      key: "notifier",
      value: "抄送人",
      icon: "Promotion",
      color: "orange",
    },
    { key: "hehe", value: "呵呵", icon: "UserFilled", color: "blue" },
    { key: "lala", value: "拉拉", icon: "StarFilled", color: "green" },
    { key: "condition", value: "条件分支", icon: "Branch", color: "#333" },
  ];

  // 交互相关
  popupshow = false;
  nodeData: any = {};
  conditionsData: any[] = [];

  // 提交校验
  onSubmit() {
    FlowValidate(this.cnode)
      .then((ret) => {
        console.log("validate success!");
        console.log(this.cnode);
      })
      .catch((err) => {
        console.log(err);
        Toast({
          allowHtml: true,
          message: `${!err.ValidateNodeNames ? "存在空节点,请补充<br/>" : ""} ${
            !err.flows ? "存在没有审批人的流程!" : ""
          }`,
        });
      });
  }

  // 选择节点,打开弹出层
  onChoose({ type, node, conditions }: any) {
    this.popupshow = true;
    this.nodeData = node;
    this.conditionsData = conditions;
  }

  // 添加节点
  onAdd({ type, node }: any) {
    //
  }
}
</script>

<style lang="less" scoped >
:deep(.approvalFlow) {
  .node-hehe {
    &:hover {
      box-shadow: 0 1px 8px 0 rgb(116, 116, 255);
    }
    .title {
      background-color: rgb(212, 212, 252);
      color: blue;
    }
    .title::after {
      background: blue;
    }
  }
  .node-lala {
    &:hover {
      box-shadow: 0 1px 8px 0 green;
    }
    .title {
      background-color: rgb(194, 255, 194);
      color: green;
    }
    .title::after {
      background: green;
    }
  }
}

.topnav {
  line-height: 90px;
  .enter {
    display: inline-block;
    width: 100px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    color: #333;
    border: 1px solid #d8d8d8;
    cursor: pointer;
    margin: 0 10px;
    background: #00a0ed;
    color: #fff;
    border-color: #00a0ed;
  }
}
</style>
