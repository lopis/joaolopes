<script>
  import ThemeProvider from '../components/ThemeProvider.svelte'
</script>

<ThemeProvider>
  <main>
    <div class="content">
      <slot />
    </div>
  </main>
</ThemeProvider>

<style>
  main {
    min-height: 100vh;
    box-sizing: border-box;
    padding-bottom: 50px;
    background: linear-gradient(-10deg, var(--light2) 30%, var(--light1) 100%) fixed;
    color: var(--dark2);
  }

  .content {
    max-width: 1000px;
    margin: auto;
  }
</style>
