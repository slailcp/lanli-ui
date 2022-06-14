export const removeValidate = (node: any) => {
  delete node.validate;

  if (node.childNode) {
    removeValidate(node.childNode)
  }
  if (node.conditionNodes) {
    node.conditionNodes.forEach((item: any, index: number) => {
      delete item.validate;
      if (item.childNode) {
        removeValidate(item.childNode)
      }
    })
  }
}


export const setCondLevel = (conditions: any[], curlevel: any, nextlevel: any) => {
  nextlevel = nextlevel - 1;
  curlevel = curlevel - 1;
  
  if(nextlevel === conditions.length-1) {
    console.warn('设计的level不可以是最后一个')
    return
  }
  const temp = conditions[curlevel];
  conditions.splice(curlevel, 1);
  conditions.splice(nextlevel, 0, temp)
  return true;
}


/**
 * 
 * 如果从上往下的过程中,有审批存在,就不反向递归赋值validate,
 * 如果从下往上的过程中一直都没有审批的存在,则方向递归从下往上赋值validate
 */


export let ValidateNodeNames = true;
export const FlowValidate = (node: any) => {
  ValidateNodeNames = true;
  return new Promise((resolve, reject) => {
    // node.validate = false;
    const flows = flowdg(node, false)

    if (!flows || !ValidateNodeNames) {
      reject({
        ValidateNodeNames,
        flows
      })

      return;
    }
    resolve(true)
  })

}


// 判断节点是否为没有内容
function contentValid(node: any) {
  node.contentValid = true;
  if (node.type !== 'route' && !node.nodeName) { node.contentValid = false; ValidateNodeNames = false; }
}


export function flowdg(node: any, bool: boolean): boolean {

  // 判断节点是否为没有内容
  contentValid(node)

  // 顺向赋值,如果上一个节点为true或者当前节点是审批,则validate为true
  node.validate = bool || node.type === 'approver';

  // 如果当前节点下没有条件分支也没有childNode节点分支,则表示是流程的最后一个节点,isv则为true,否则为false
  let isv = !node.childNode && (!node.conditionNodes || !node.conditionNodes.length) ? true : false;
  if (node.childNode) {
    // 反向取值,获取子节点是否存在审批人
    isv = flowdg(node.childNode, node.validate) || node.childNode.type === 'approver';
    node.validate = isv;// 如果平级childNode是审批人,当前节点就是true
  }

  let cn = false;// cn,默认是false,表示,条件中存在没有审批人的分支
  if (node.conditionNodes) {
    const vArr: any[] = [...Array(node.conditionNodes.length)]; // 所有的条件分支的结果存到vArr数组
    node.conditionNodes.forEach((item: any, index: number) => {
      item.validate = node.validate || isv;
      // 判断节点是否为没有内容
      contentValid(item)

      if (item.childNode) {
        // 反向取值,当前分支下的节点是否存在审批人,
        vArr[index] = flowdg(item.childNode, node.validate)
      }

      // 反向赋值,如果当前节点是false或者undefine,(说明当前流程从上到下的流程中不存在审批)
      if (!node.validate) {
        item.validate = vArr[index] || isv;
      }
    })

    // 反向赋值,如果当前节点是false或者undefine,(说明当前流程从上到下的流程中不存在审批)
    if (!node.validate) {
      // 判断当前条件分支是否全部都有审批人
      if (vArr.length && vArr.every(item => item) && node.conditionNodes.length == vArr.length) { cn = true; }

      node.validate = cn || isv || node.type === 'approver'; // childNode有审批或者conditionNodes下面全部都是审批或者当前节点是审批
    }
  }

  // 将当前节点是否存在审批人return出去
  return node.validate || node.type === 'approver' // 有节点信息
}