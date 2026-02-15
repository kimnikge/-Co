<!-- Микроанимация: плавный появляющийся числовой счетчик -->
<script lang="ts">
  export let value: number = 0;
  export let duration: number = 1200;
  let display = 0;
  let start = 0;
  let raf: number;

  import { onDestroy } from 'svelte';

  function animate() {
    start = performance.now();
    function step(now: number) {
      const progress = Math.min((now - start) / duration, 1);
      display = Math.floor(value * progress);
      if (progress < 1) {
        raf = requestAnimationFrame(step);
      } else {
        display = value;
      }
    }
    raf = requestAnimationFrame(step);
  }

  $: value, animate();

  onDestroy(() => {
    cancelAnimationFrame(raf);
  });
</script>

<span class="counter">{display}</span>

<style>
.counter {
  font-size: 2rem;
  font-weight: bold;
  color: #fff;
  transition: color 0.3s;
}
</style>
