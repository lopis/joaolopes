<script lang="ts">
</script>

<input class="checkbox" type="checkbox" id="checkbox">
<label class="theme-label" for="checkbox">
  <div class="sun"></div>
  <div class="moon"></div>
</label>
<div class="content">
  <slot />
</div>

<style>
.theme-label {
  position: fixed;
  top: 24px;
  right: 24px;
  height: 24px;
  width: 24px;
  z-index: 1;
}

@media (max-width: 600px) {
  .theme-label {
    top: unset;
    bottom: 24px;
  }
}

.checkbox {
  display: none;
}

.sun, .moon {
  position: absolute;
  top: 0;
  right: 0;
  backface-visibility: hidden;
}

.sun, .moon,
.sun::after, .sun::before,
.moon::after, .moon::before {
  transition: all 200ms ease-in-out;
}

.checkbox:not(:checked) ~ * {
  --dark1: #622369;
  --dark2: #1a0228;
  --light1: #fffcf7;
  --light2: #ffc9c9;
  --underline: #37164955;
}
@media (prefers-color-scheme: dark) {
  .checkbox:not(:checked) ~ * {
    --dark1: #fffcf7;
    --dark2: #ffc9c9;
    --light1: #622369;
    --light2: #1a0228;
    --underline: #ffdada55;
  }
}
.checkbox:checked ~ * {
    --dark1: #fffcf7;
    --dark2: #ffc9c9;
    --light1: #622369;
    --light2: #1a0228;
    --underline: #ffdada55;
}
@media (prefers-color-scheme: dark) {
  .checkbox:checked ~ * {
    --dark1: #622369;
    --dark2: #1a0228;
    --light1: #fffcf7;
    --light2: #ffc9c9;
    --underline: #37164955;
  }
}

.checkbox:checked ~  .theme-label .sun {
  transform: rotate(22.5deg) rotateY(0deg);
}

.checkbox:checked ~  .theme-label .moon {
  transform: rotateY(180deg);
}

.sun,
.sun::after,
.sun::before,
.moon {
  --border: 2px;
  display: inline-block;
  height: 24px;
  width: 24px;
  background: var(--dark2);
  z-index: 2;
  box-shadow: 0 0 0 var(--border) var(--light1);
}

.sun {
  transform: rotate(22.5deg) rotateY(180deg);
}

.sun::after, .sun::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  transform: rotate(45deg);
}

.sun::after {
  border-radius: 24px;
}

.moon {
  transform: none;
  border-radius: 24px;
  transform: rotateY(0deg);
}

.moon::before, .moon::after {
  content: "";
  position: absolute;
  height: 6px;
  width: 6px;
  border-radius: 8px;
  border: var(--border) solid var(--light1);
  bottom: 10%;
  left: 15%;
}

.moon::after {
  height: 2px;
  width: 2px;
  bottom: 45%;
  left: 65%;
}
</style>
