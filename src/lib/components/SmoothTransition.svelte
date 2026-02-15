<!-- Компонент для плавных переходов между блоками -->
<script lang="ts">
  export let show: boolean = true;
</script>

{#if show}
  <div class="smooth-transition">
    <slot />
  </div>
{/if}

<style>
.smooth-transition {
  transition: opacity 0.6s, transform 0.6s;
  opacity: 1;
  transform: translateY(0);
}
.smooth-transition:not(:hover) {
  opacity: 0.95;
}
</style>
