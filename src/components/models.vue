<script lang="ts" setup>

</script>

<template>
  <div class="models">
    <el-card v-for="(item,i) in 10" :key=i :body-style="{ padding: '0px' }" class="produce_card">
      <img alt="捷豹" src="src/assets/4.avif" style="width: 30vw; background: #f0f0f0;"/>
      <div class="text">
        <div class="header">
          <h2 class="name">F-TYPE</h2>
          <p>F-TYPE 硬顶版</p>
          <p>P300后轮驱动自动档</p>
        </div>
        <div class="center">了解车辆</div>
        <div class="footer">
          <div class="price">
            <span class="produce_price">¥676,800.00*起</span>
            <el-button class="produce_button" color="#3c3c3b" size="large">预约定购</el-button>
          </div>
        </div>
      </div>
    </el-card>

  </div>
</template>

<style lang="less" scoped>
.models {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 1px 1px #5d5d5d;
  flex-wrap: wrap;
  overflow-x: hidden;

  .produce_card {
    width: 30vw;
    height: 65vh;
    margin: 5vh 5vw;

    .text {
      font-family: "阿里妈妈数黑体 Bold ", serif;
      margin: 25px;

      .header {
        padding-bottom: 20px;
        border-bottom: 1px solid #dedede;
        letter-spacing: .04em;
        line-height: 1;
        font-size: 17px;
        font-weight: 700;
        color: #141414;
        margin-bottom: 12px;

        .name {
          margin-bottom: 12px;
        }

        p {
          font-size: 12px;
          font-weight: 500;
          color: rgba(68, 68, 68, .8);
        }
      }

      .center {
        font-size: 12px;
        color: rgba(68, 68, 68, .8);
        font-weight: 600;
        margin-top: 20px;
      }

      .footer {
        margin: 10px 0;

        .price {
          display: flex;
          justify-content: space-between;
          align-items: center;

          .produce_price {
            color: #141414;
            font-size: 18px;
            font-weight: 700;
          }

          .produce_button {
            font-size: 12px;
            font-family: "阿里妈妈数黑体 Bold ", serif;
            font-weight: 700;
          }
        }
      }
    }
  }
}
</style>