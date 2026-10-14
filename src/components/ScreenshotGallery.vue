<script setup lang="ts">
import { onBeforeUnmount, ref, watch } from 'vue'
import type { Screenshot } from '../data/profile'

// Real app screenshots in a browser-style frame: thumbnails switch the main
// image, clicking the main image opens it full size.

const props = defineProps<{ images: Screenshot[]; title: string }>()

const active = ref(0)
const zoomed = ref(false)

function onKey(e: KeyboardEvent) {
  if (e.key === 'Escape') zoomed.value = false
  else if (e.key === 'ArrowRight') active.value = (active.value + 1) % props.images.length
  else if (e.key === 'ArrowLeft') active.value = (active.value - 1 + props.images.length) % props.images.length
}

watch(zoomed, (open) => {
  if (open) window.addEventListener('keydown', onKey)
  else window.removeEventListener('keydown', onKey)
})
onBeforeUnmount(() => window.removeEventListener('keydown', onKey))
</script>

<template>
  <figure class="gallery card">
    <div class="chrome">
      <span class="dots"><i /><i /><i /></span>
      <span class="label">{{ title }}</span>
    </div>

    <button class="main" type="button" :aria-label="`Open ${images[active].alt} full size`" @click="zoomed = true">
      <img :src="images[active].src" :alt="images[active].alt" loading="lazy" />
    </button>

    <figcaption v-if="images[active].caption" class="caption">{{ images[active].caption }}</figcaption>

    <div v-if="images.length > 1" class="thumbs">
      <button
        v-for="(img, i) in images"
        :key="img.src"
        type="button"
        :class="['thumb', { active: i === active }]"
        :aria-label="`Show ${img.alt}`"
        @click="active = i"
      >
        <img :src="img.src" alt="" loading="lazy" />
      </button>
    </div>

    <Teleport to="body">
      <div v-if="zoomed" class="lightbox" role="dialog" aria-modal="true" @click="zoomed = false">
        <img :src="images[active].src" :alt="images[active].alt" @click.stop />
        <button class="close" type="button" aria-label="Close" @click="zoomed = false">×</button>
      </div>
    </Teleport>
  </figure>
</template>

<style scoped>
.gallery {
  margin: 0;
  overflow: hidden;
}
.chrome {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 14px;
  border-bottom: 1px solid var(--border);
  background: var(--surface-2);
}
.dots {
  display: flex;
  gap: 6px;
}
.dots i {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--border);
}
.label {
  font-family: var(--mono);
  font-size: 12px;
  color: var(--text-muted);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.main {
  display: block;
  width: 100%;
  padding: 0;
  border: 0;
  background: var(--surface);
  cursor: zoom-in;
}
.main img {
  display: block;
  width: 100%;
  aspect-ratio: 16 / 10;
  object-fit: cover;
  object-position: top left;
}
.caption {
  padding: 10px 14px 0;
  font-size: 13px;
  color: var(--text-muted);
}
.thumbs {
  display: flex;
  gap: 8px;
  padding: 12px 14px 14px;
  overflow-x: auto;
}
.thumb {
  flex: 0 0 76px;
  padding: 0;
  border: 2px solid transparent;
  border-radius: 8px;
  overflow: hidden;
  background: var(--surface-2);
  cursor: pointer;
  opacity: 0.6;
  transition: opacity 0.15s, border-color 0.15s;
}
.thumb:hover,
.thumb.active {
  opacity: 1;
}
.thumb.active {
  border-color: var(--accent);
}
.thumb img {
  display: block;
  width: 100%;
  aspect-ratio: 16 / 10;
  object-fit: cover;
  object-position: top left;
}
.lightbox {
  position: fixed;
  inset: 0;
  z-index: 100;
  display: grid;
  place-items: center;
  padding: 24px;
  background: rgb(0 0 0 / 0.8);
  cursor: zoom-out;
}
.lightbox img {
  max-width: 100%;
  max-height: 100%;
  border-radius: 8px;
  cursor: default;
}
.close {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 40px;
  height: 40px;
  border: 0;
  border-radius: 50%;
  background: rgb(255 255 255 / 0.15);
  color: #fff;
  font-size: 24px;
  line-height: 1;
  cursor: pointer;
}
</style>
