<template>
  <div>
    <SiteHeader />
    <h2>Not Found</h2>
    <p>
      <WarningIcon class="big"/>
    </p>
    <p>
      Either the article or page you're looking for doesn't exist, or something is broken and I'm redirecting you to this page to avoid further embarassing myself.
    </p>
    <p>
      If you believe you're not supposed to see this page, a quick heads-up on Twitter or Github would be really appreciated.
    </p>
  </div>
</template>
<script lang="ts">
import SiteHeader from '../components/SiteHeader.vue'
import WarningIcon from '../assets/icons/warning.svg'

export default {
  components: {
    SiteHeader,
    WarningIcon,
  }
}
</script>
<style>
.big {
  height: 200px;
  width: 100%;
}
.big path:not([fill="none"]) {
  fill: #8fd3f3;
}
</style>
