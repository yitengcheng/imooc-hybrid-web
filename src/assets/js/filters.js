import Vue from 'vue';

/**
 * 金额处理
 * @param value 调用过滤器时，调用的文本
 */
Vue.filter('priceValue', (value) => {
    // 如果文本不存在，返回空
    if (!value) {
        return '';
    }
    // 文本转换成float
    let result = parseFloat(value);
    // 如果文本为intger类型的文本，表示当前文本没有小数
    if (Number.isInteger(result)) {
        return result;
    }
    // 文本包含小数，result.toFixed(2)
    return result.toFixed(2);
});
/**
 * 时间过滤器
 */
Vue.filter('filterTime', (value) => {
    if (!value) {
        return '';
    }
    // value 不是时间格式 时：分：秒
    if (value.indexOf(':') === -1) {
        return value;
    }

    let result = '';
    const arr = value.split(':');
    if (parseInt(arr[0]) < 10) {
        result = '0' + arr[0];
    } else {
        result = arr[0];
    }
    if (parseInt(arr[1]) < 10) {
        result += ':0' + arr[1];
    } else {
        result += arr[1];
    }
    if (parseInt(arr[2]) < 10) {
        result += ':0' + arr[2];
    } else {
        result += arr[2];
    }
    return result;
});
