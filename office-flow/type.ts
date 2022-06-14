export type FlowNodeProp = {
  name: string;
  nodeName:string;
  type: string;
  childNode?: FlowNodeProp;
}

export type FlowCondProp = {
  name: string;
  nodeName:string;
  type: string;
  childNode?: FlowNodeProp;
}

export type FlowConditionNodesProp = {
  type: "route";
  conditionNodes?:FlowNodeProp[]
}