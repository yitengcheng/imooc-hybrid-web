<template>
  <div
    class="goods"
    :class="[layoutClass,{'goods-scroll':isScroll}]"
    :style="{height:goodsViewHeight}"
    ref="goods"
    @scroll="onScrollChange"
  >
    <!--
        如何在同一个组件中展示不同的样式:
        1.html表示整个布局的结构,具体的展示样式,将由CSS决定
        2.每种展示样式对应不同的css,也就是对应不同的类名(css)
            1. 垂直列表 -> goods-list
            2. 网格布局 -> goods-grid
            3. 瀑布流布局 -> goods-waterfall
        3. 实现不同的展示形式,本质上就是实现不同的css样式

        瀑布流布局:
        1. 创建商品列表的基本html和css，让item相对于goods（div）进行排列
        2. 生成不同高度的图片，撑起不同高度的item
        3. 计算item的位置，来达到从上到下，从左到右依次排列的目的
    -->
    <!-- 如果不允许goods单独滑动,就不添加goods-scroll这个类 -->
    <!-- 商品排序:
            1. 排序之后的数据源,用来在html中进行展示(替换掉dataSource)
            2. 定义排序规则(可以直接使用GoodsOptions中数据源的id)
            3. 定义排序方法,根据排序规则来修改对应的排序
    -->
    <div
      class="goods-item"
      :class="layoutItemClass"
      v-for="(item,index) in  sortGoodsData"
      :key="index"
      ref="goodsItem"
      @click="onItemClick(item)"
      :style="goodsItemStyles[index]"
    >
      <!-- 图片 -->
      <img class="goods-item-img" :src="item.img" :style="imgStyles[index]" />
      <div class="goods-item-desc">
        <p
          class="goods-item-desc-name text-line-2"
          :class="{'goods-item-desc-name-hint':!item.isHave}"
        >
          <direct v-if="item.isDirect"></direct>
          <no-have v-if="!item.isHave"></no-have>
          {{item.name}}
        </p>
        <div class="goods-item-desc-data">
          <p class="goods-item-desc-data-price">￥{{item.price | priceValue}}</p>
          <p class="goods-item-desc-data-volume">销量：{{item.volume}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Direct from '@c/goods/Direct';
import NoHave from '@c/goods/NoHave';
import { watch } from 'fs';
export default {
    components: { Direct, NoHave },
    props: {
    /**
     * 父元素中指定的展示形式
     * 1. 垂直列表
     * 2. 网格布局
     * 3. 瀑布流布局
     */
        layoutType: {
            type: String,
            default: '1'
        },
        /**
     * 是否允许goods单独滑动
     * 默认允许goods单独滑动
     */
        isScroll: {
            type: Boolean,
            default: true
        },
        /**
     * 排序规则
     */
        sort: {
            type: String,
            default: '1'
        }
    },
    data () {
        return {
            // 数据源
            dataSource: [],
            // 排序数据
            sortGoodsData: [],
            // 最大高度
            MAX_IMG_HEIGHT: 230,
            // 最小高度
            MIN_IMG_HEIGHT: 178,
            // 图片样式集合
            imgStyles: [],
            // item margin
            ITEM_MARGIN_SIZE: 8,
            // item样式集合
            goodsItemStyles: [],
            // goods组件高度
            goodsViewHeight: '100%',
            // 不同展示形式下的类名
            // 1.垂直列表的展示形式(默认) -> goods-list & goods-list-item
            // 2.网格布局的展示形式 -> goods-grid & goods-grid-item
            layoutClass: 'goods-list',
            layoutItemClass: 'goods-list-item',
            // 滑动距离
            scrollTopValue: 0
        };
    },
    created () {
        this.initData();
    },
    /**
   * keepAlive 组件被激活的时候调用
   * 去为滑动模块指定滑动距离
   */
    activated () {
        this.$refs.goods.scrollTop = this.scrollTopValue;
    },
    methods: {
    /**
     * 获取数据
     */
        initData () {
            this.$http.post('/api/getGoods').then(data => {
                if (data.success) {
                    this.dataSource = data.list;
                    // 数据排序
                    this.setSortGoodsData();
                    // 设置布局
                    this.initLayout();
                }
            });
        },
        /**
     * 商品排序
     */
        setSortGoodsData () {
            switch (this.sort) {
            // 默认
            case '1':
                // 深拷贝数据源(slice)
                this.sortGoodsData = this.dataSource.slice(0);
                break;
                // 价格由高到低
            case '1-2':
                this.getSortGoodsDataFromKey('price');
                break;
                // 销量由高到低
            case '1-3':
                this.getSortGoodsDataFromKey('volume');
                break;
                // 有货优先
            case '2':
                this.getSortGoodsDataFromKey('isHave');
                break;
                // 直营优先
            case '3':
                this.getSortGoodsDataFromKey('isDirect');
                break;
            }
        },
        /**
     * 根据传入的key来进行排序
     */
        getSortGoodsDataFromKey (key) {
            /**
       * sort 可以完成数组的数据排序
       * 当接收的值为负数的时候,表示goods1排列在goods2之前
       * 当接收的值为正数的时候,表示goods1排列在goods2之后
       * 当接收的值为0的时候,表示排序不变
       */
            this.sortGoodsData.sort((goods1, goods2) => {
                // 根据传入的key获取对应的value
                let v1 = goods1[key];
                let v2 = goods2[key];
                // 对value 进行对比
                // boolean类型的值(有货优先和直营优先)
                if (typeof v1 === 'boolean') {
                    if (v1) {
                        return -1;
                    }
                    if (v2) {
                        return 1;
                    }
                    return 0;
                }
                // float类型值的处理(价格,销量)
                if (parseFloat(v1) >= parseFloat(v2)) {
                    return -1;
                }
                return 1;
            });
        },
        /**
     * 返回随机的图片高度
     */
        imgHeight () {
            // Math.random() -> 0 - 1 随机数 * （高度区间） + 最低图片高度
            let result = Math.floor(
                Math.random() * (this.MAX_IMG_HEIGHT - this.MIN_IMG_HEIGHT) +
          this.MIN_IMG_HEIGHT
            );
            return result;
        },
        /**
     * 根据随机图片高度，生成对应的图片数据
     */
        initImgStyles () {
            this.dataSource.forEach(item => {
                // 随机生成的图片高度
                let imgHeight = this.imgHeight() + 'px';
                // push 图片高度，到img样式集合
                this.imgStyles.push({
                    height: imgHeight
                });
            });
        },
        /**
     * 瀑布流布局
     * 1. 获取到所有的item元素
     * 2. 遍历item元素，得到每一个item高度，加上一个margin高度
     * 3. 创建两个变量，leftHeightTotal,rightHeightTotal 分别表示左右两侧目前距离顶部的高度
     * 通过对比左右两侧距离顶部高度，来确定item放置位置
     * 如果左侧小于等于右侧高度的话，那么item就应该放置到左侧。此时 item距离左侧为0，距离顶部为当前的leftHeightTotal
     * 否则，item放置到右侧，此时item距离右侧为0，距离顶部为rightHeightTotal
     * 4. 保存计算出的item的所有样式，配置到item上
     * 5. item配置完成之后，对比左右两侧最大高度，把最大高度设为goods组件高度
     */
        initWaterfall () {
            // 获取所有item元素
            let $goodsItem = this.$refs.goodsItem;
            if (!$goodsItem) return;
            // 左右两侧距离顶部的高度
            let leftHeightTotal = 0;
            let rightHeightTotal = 0;
            $goodsItem.forEach(($el, index) => {
                // item 样式
                let goodsItemStyle = {};
                // 遍历item元素，得到每一个item高度，加上一个margin高度
                let elHeight = $el.clientHeight + this.ITEM_MARGIN_SIZE;
                // 对比左右两侧距离顶部的高度
                if (leftHeightTotal <= rightHeightTotal) {
                    // item就应该放置到左侧。此时 item距离左侧为0，距离顶部为当前的leftHeightTotal
                    goodsItemStyle = {
                        left: '0px',
                        top: leftHeightTotal + 'px'
                    };
                    // 更新左侧距离顶部的高度
                    leftHeightTotal += elHeight;
                } else {
                    goodsItemStyle = {
                        right: '0px',
                        top: rightHeightTotal + 'px'
                    };
                    // 更新右侧距离顶部的高度
                    rightHeightTotal += elHeight;
                }
                // 保存计算出的item的所有样式，配置到item上
                this.goodsItemStyles.push(goodsItemStyle);
                // 在不允许单独滑动的时候
                if (!this.isScroll) {
                    this.goodsViewHeight =
            (leftHeightTotal > rightHeightTotal
                ? leftHeightTotal
                : rightHeightTotal) + 'px';
                }
            });
        },
        /**
     * 设置布局,为不同的layoutType设定不同的展示形式
     * 1. 初始化影响到布局的数据
     *  1. goodsViewHeight -> 垂直布局和网格布局(100%) 瀑布流(实际高度)
     *  2. goodsItemStyle
     *  3. imgStyle
     * 2. 为不同的layoutType设置不同的展示类
     */
        initLayout () {
            // 初始化数据
            this.goodsViewHeight = '100%';
            this.goodsItemStyles = [];
            this.imgStyles = [];
            // 为不同的layoutType设置不同的展示类
            switch (this.layoutType) {
            // 垂直列表
            case '1':
                this.layoutClass = 'goods-list';
                this.layoutItemClass = 'goods-list-item';
                break;
                // 网格布局
            case '2':
                this.layoutClass = 'goods-grid';
                this.layoutItemClass = 'goods-grid-item';
                break;
                // 瀑布流布局
            case '3':
                this.layoutClass = 'goods-waterfall';
                this.layoutItemClass = 'goods-waterfall-item';
                this.initImgStyles();
                // 调用创建瀑布流的方法（等到dom创建完成之后）
                this.$nextTick(() => {
                    this.initWaterfall();
                });
                break;

            default:
                this.layoutClass = 'goods-list';
                this.layoutItemClass = 'goods-list-item';

                break;
            }
        },
        /**
     * 商品点击事件
     */
        onItemClick (item) {
            // 商品无库存不允许跳转
            if (!item.isHave) {
                alert('该商品无库存');
                return;
            }
            this.$router.push({
                name: 'goodsDetail',
                params: {
                    good: item,
                    routerType: 'push'
                }
            });
        },
        onScrollChange ($event) {
            this.scrollTopValue = $event.target.scrollTop;
        }
    },
    watch: {
    /**
     * 监听layoutType
     */
        layoutType: function () {
            this.initLayout();
        },
        /**
     * 监听sort改变
     */
        sort: function () {
            this.setSortGoodsData();
        }
    }
};
</script>
<style lang='scss' scoped>
@import "@css/style.scss";
.goods {
  background-color: $bgColor;
  &-scroll {
    overflow: hidden;
    overflow-y: auto;
  }

  &-item {
    background-color: #fff;
    padding: $marginSize;
    box-sizing: border-box;
    &-desc {
      width: 100%;
      &-name {
        color: #000;
        font-size: $infoSize;
        line-height: px2rem(18);
        &-hint {
          color: $hintColor;
        }
      }
      &-data {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: $marginSize;
        &-price {
          font-size: $titleSize;
          color: $mainColor;
          font-weight: 500;
        }
        &-volume {
          font-size: $infoSize;
          color: $hintColor;
        }
      }
    }
  }
}

// 垂直列表
.goods-list {
  &-item {
    display: flex;
    border-bottom: 1px solid $lineColor;
    .goods-item-img {
      width: px2rem(120);
      height: px2rem(120);
    }
    .goods-item-desc {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: $marginSize;
    }
  }
}

// 网格布局
.goods-grid {
  padding: $marginSize;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  &-item {
    width: 49%;
    border-radius: $radiusSize;
    margin-bottom: $marginSize;
  }
  .goods-item-img {
    width: 100%;
  }
}

// 瀑布流
.goods-waterfall {
  position: relative;
  margin: $marginSize;
  &-item {
    position: absolute;
    width: 49%;
    border-radius: $radiusSize;
    .goods-item-img {
      width: 100%;
    }
  }
}
</style>
