<template>
  <div class="count-down">
    <span class="count-down-end-time">{{endHours}}点场</span>
    <span class="count-down-surplus">{{surplus | filterTime}}</span>
  </div>
</template>

<script>
import { watch } from 'fs';
/**
 * 能力：传递给组件活动开始时间，组件根据这个时间去进行计算
 * 1、 当前时间未到开始时间，展示倒计时
 * 2、 当前时间到了活动开始时间，展示活动进行中
 * 3、 当前时间超过开始时间，展示活动结束
 */
export default {
    props: {
        endHours: {
            type: Number,
            required: true,
            default: 0
        }
    },
    data () {
        return {
            // 展示活动状态
            surplus: '',
            // 距离活动开始时间的秒数
            diffSeconds: 0,
            interval: undefined
        };
    },
    created () {
        this.computedSurplusTime();
    },
    methods: {
    /**
     * 计算展示内容
     */
        computedSurplusTime () {
            if (this.interval) {
                clearInterval(this.interval);
            }
            const date = new Date();
            // 当前时间超过开始时间，展示活动结束
            if (date.getHours() > this.endHours) {
                return (this.surplus = '活动已结束');
            }
            // 当前时间到了活动开始时间，展示活动进行中
            if (date.getHours() === this.endHours) {
                return (this.surplus = '活动进行中');
            }
            // 当前时间未到开始时间，展示倒计时
            // 获取当前时间与活动开始时间的差距秒数
            // 根据秒数转换成对应的 -> 时：分：秒
            // 例：开始时间16，当前时间12，差距3小时59分59秒，而非4小时
            const diffHours = this.endHours - date.getHours() - 1;
            // 差距分钟数
            const diffMinutes = 60 - date.getMinutes() - 1;
            // 差距秒数
            const diffSeconds = 60 - date.getSeconds();
            // 转换为对应秒数
            this.diffSeconds = diffHours * 3600 + diffMinutes * 60 + diffSeconds;
            // 当前秒数每过1秒，秒数就应该-1
            this.interval = setInterval(() => {
                this.diffSeconds -= 1;
            }, 1000);
        }
    },
    watch: {
    // 当diffSeconds值发生变化的时候，就会回调当前方法
        diffSeconds (newV) {
            // 当前的秒数 /3600， 向下取整，获取到了转化的小时数
            const hours = Math.floor(newV / 3600);
            // 当前的秒数 /60， 向下取整，获取到了转化的分钟数
            // 获取到所有的分钟数 3600/60 =60分钟
            // 对60取模，超过小时数的分钟数
            const minutes = Math.floor(newV / 60) % 60;
            // 当前的秒数 % 60，获取到超过小时数，分钟数的秒数
            const seconds = newV % 60;
            // 拼装数据
            this.surplus = hours + ':' + minutes + ':' + seconds;
            // 在当面秒数变为0的时候，需要修改展示数据
            if (newV === 0) {
                this.computedSurplusTime();
            }
        },
        // 监听活动开始时间的变化
        endHours () {
            this.computedSurplusTime();
        }
    }
};
</script>
<style lang='scss' scoped>
@import "@css/style.scss";
.count-down {
  display: inline-block;
  font-size: $infoSize;
  margin-left: $marginSize;
  span {
    display: inline-block;
    padding: px2rem(2) px2rem(4);
  }
  &-end-time {
    background-color: $mainColor;
    border-top-left-radius: px2rem(4);
    border-bottom-left-radius: px2rem(4);
    border: px2rem(1) solid $mainColor;
    color: #fff;
  }
  &-surplus {
    background-color: #fff;
    border-top-right-radius: px2rem(4);
    border-bottom-right-radius: px2rem(4);
    border: px2rem(1) solid $mainColor;
    color: $mainColor;
  }
}
</style>
