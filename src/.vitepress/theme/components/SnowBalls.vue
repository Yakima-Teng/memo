<template>
  <div class="snow-balls">
    <div
      class="snow"
      v-for="item in 100"
      :key="item"
    />
  </div>
</template>

<style lang="scss" scoped>
.snow-balls {
  --size: 8px;
  .snow {
    position: fixed;
    top: 0 - var(--size);
    left: 0;
    width: var(--size);
    height: var(--size);
    z-index: 1;
    background: transparent scroll no-repeat center center;
    background-size: contain;
    transform: translate3d(0, 0, 0) rotate(0deg);
    border-radius: 50%;
    animation: float 3s ease-in-out 0ms infinite;
    opacity: 0.3;
    pointer-events: none;
  }
  @for $i from 1 through 100 {
    .snow:nth-child(#{$i}) {
      --size: #{random(8) * 2}px;
      --left-ini: #{random(20) - 10}vw;
      --left-end: #{random(20) - 10}vw;
      left: #{random(100)}vw;
      animation: snowfall #{5 + random(10)}s linear infinite;
      animation-delay: -#{random(10)}s;
      //box-shadow: 0 0 15px 10px rgba(255, 255, 255, 0.3);
      //background-color: hsla(0, 0%, 100, .8);
      background-image: url('../assets/icon-snow.svg');
    }
  }
  /* added small blur every 6 snow*/
  .snow:nth-child(6n) {
    filter: blur(1px);
  }
  @keyframes snowfall {
    0% {
      transform: translate3d(var(--left-ini), 0, 0) rotate(0deg);
      opacity: 0.3;
    }
    90% {
      transform: translate3d(var(--left-end), 300px, 0) rotate(360deg);
      opacity: 0;
    }
    100% {
      transform: translate3d(var(--left-ini), 0, 0) rotate(0deg);
      opacity: 0;
    }
  }
}
</style>
