// import pinyinMatch from "pinyin-match";
import { remote } from "@/api/common";
// 防抖
function debounce(func, delay) {
  var timer = null;
  return function () {
    var context = this;
    var args = arguments;
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(function () {
      func.apply(context, args);
      timer = null;
    }, delay);
  };
}

// 节流
function throttle(func, delay, immediate) {
  var timer = null;
  return function () {
    var context = this;
    var args = arguments;
    if (!timer) {
      // 如果是立即执行，则在时间段的开始处执行
      if (immediate) {
        func.apply(context, args);
      }

      timer = setTimeout(function () {
        // 如果是非立即执行，则在时间段的结束处执行
        if (!immediate) {
          func.apply(context, args);
        }
        timer = null;
      }, delay);
    }
  };
}

/**
 * 金钱输入框处理
 * @param {*} val
 * @param {*} limit
 */
function onInputMoneyHandle(val, limit = 0) {
  val = val.replace(/[^\d.]/g, ""); //保留数字
  val = val.replace(/^00/, "0."); //开头不能有两个0
  val = val.replace(/^\./g, "0."); //开头为小数点转换为0.
  val = val.replace(/\.{2,}/g, "."); //两个以上的小数点转换成一个
  val = val.replace(".", "$#$").replace(/\./g, "").replace("$#$", "."); //只保留一个小数点
  /^0\d+/.test(val) ? (val = val.slice(1)) : ""; //两位以上数字开头不能为0
  const str = "^(\\d+)\\.(\\d{" + limit + "}).*$";
  const reg = new RegExp(str);
  if (limit === 0) {
    // 不需要小数点
    val = val.replace(reg, "$1");
  } else {
    // 通过正则保留小数点后指定的位数
    val = val.replace(reg, "$1.$2");
  }
  return val;
}

/**
 * 修复最后一位是小数点的情况
 * @param {*} obj
 * @param {*} property
 * @returns
 */
function fixMoney(obj, property) {
  const str = obj[property];
  if (!str || !str.substr) {
    return;
  }
  const lastChar = str.substr(str.length - 1, 1);
  if (lastChar == ".") {
    obj[property] = str.substr(0, str.length - 1);
  }
}

/**
 * cascader级联单选处理
 * @param {*} this_
 * @param {*} val
 * @param {*} ref
 */
function cascaderHandleChange(this_, val, ref) {
  // 如果当前选中的节点下面没有子级节点就关闭Cascader遮罩
  if (
    this_.$refs[ref].getCheckedNodes() &&
    this_.$refs[ref].getCheckedNodes().length > 0
  ) {
    if (!this_.$refs[ref].getCheckedNodes()[0].hasChildren) {
      this_.$refs[ref].dropDownVisible = false;
    }
  }
}

/**
 * 金额千分位格式化，back 为 true 去除千分位的格式化
 * @param {*} number
 * @param {*} back
 * @returns
 */
function formatThousands(number, back) {
  let minusFlag = false;
  // 不为真直接返回 0
  if (!number || number == "" || number == 0) {
    return "0.00";
  }
  // 负数处理
  if (number < 0) {
    number = String(number).substring(1, number.length);
    minusFlag = true;
  }
  number = Number(number).toFixed(2);
  // 转为字符串，并按照.拆分
  const arr = (number + "").split(".");
  // 整数部分再拆分
  const int = arr[0].split("");
  // 小数部分
  const fraction = arr[1] || "";

  // 去除千分位
  if (back) {
    return (
      (minusFlag ? "-" : "") +
      (int + "").replaceAll(",", "") +
      (!!fraction ? "." + fraction : "")
    );
  } else {
    // 返回的变量
    let r = "";
    int.reverse().forEach((v, i) => {
      // 非第一位并且是位值是3的倍数，添加“,”
      if (i !== 0 && i % 3 === 0) {
        r = v + "," + r;
      } else {
        // 正常添加字符
        r = v + r;
      }
    });
    // 整数部分和小数部分拼接
    return (minusFlag ? "-" : "") + r + (!!fraction ? "." + fraction : "");
  }
}

// /**
//  * 搜索方法针对el-select标签（支持拼音／首拼搜索）
//  * @param {*} list 需要搜索的数组
//  * @param {*} value 搜索词
//  * @param {*} key List的元素为对象时需要传入对象键名
//  * @returns
//  */
// function pySearch(list, value, key) {
//   let result;
//   if (list) {
//     if (key && value) {
//       result = list.filter(item => {
//         return pinyinMatch.match(item[key], value);
//       });
//       return result.length == 0 ? [] : result;
//     } else {
//       return list;
//     }
//   }
// }

/**
 * 数字金额转中文大写金额
 * @param {*} money
 */
function numberPriceToChinesePrice(money) {
  if (!/^(0|[1-9]\d*)(\.\d+)?$/.test(money)) {
    return "数据非法";
  }
  let unit = "千百拾亿千百拾万千百拾元角分";
  let str = "";
  money = money.replace(",", "");
  money += "00";
  const p = money.indexOf(".");
  if (p >= 0) {
    money = money.substring(0, p) + money.substr(p + 1, 2);
  }
  unit = unit.substr(unit.length - money.length);
  for (let i = 0; i < money.length; i++) {
    str += "零壹贰叁肆伍陆柒捌玖".charAt(money.charAt(i)) + unit.charAt(i);
  }
  return str
    .replace(/零(千|百|拾|角)/g, "零")
    .replace(/(零)+/g, "零")
    .replace(/零(万|亿|元)/g, "$1")
    .replace(/(亿)万|壹(拾)/g, "$1$2")
    .replace(/^元零?|零分/g, "")
    .replace(/元$/g, "元整");
}

async function listDict(...args) {
  try {
    const requestArray = args.map(e => remote(e));

    return await Promise.all(requestArray);
  } catch (error) {
    // 处理错误
    console.error("其中一个请求失败", error);
    throw new Error("其中一个请求失败:" + error.message);
  }
}

async function listDictAuto(target, ...args) {
  try {
    const requestArray = args.map(e => remote(e.type));
    const results = await Promise.all(requestArray);

    for (let i = 0; i < results.length; i++) {
      const key = args[i].key;
      target[key] = results[i].data.data;
    }
  } catch (error) {
    // 处理错误
    console.error("其中一个请求失败", error);
    throw new Error("其中一个请求失败:" + error.message);
  }
}

export {
  throttle,
  debounce,
  onInputMoneyHandle,
  cascaderHandleChange,
  fixMoney,
  formatThousands,
  numberPriceToChinesePrice,
  listDict,
  listDictAuto
};
