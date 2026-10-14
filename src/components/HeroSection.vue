<script setup lang="ts">
import { profile, stats } from '../data/profile'
import TopoBackground from './TopoBackground.vue'
import MascotSticker from './MascotSticker.vue'

const [firstName, ...rest] = profile.name.split(' ')
const lastName = rest.join(' ')

// Map palette, cycled across stats and focus tiles.
const statColors = ['blue', 'teal', 'violet', 'orange']
const focusColors = ['teal', 'violet', 'orange', 'green']
const tint = (c: string) => ({ '--c': `var(--c-${c})`, '--c-soft': `var(--c-${c}-soft)` })

// Simple line icons for the focus tiles, keyed by profile.focus[].icon.
const icons: Record<string, string> = {
  dashboard: 'M3 3h7v9H3zM14 3h7v5h-7zM14 12h7v9h-7zM3 16h7v5H3z',
  layers: 'M12 2 2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5',
  map: 'M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21zM12 12.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6z',
  nodes: 'M5 3h4v4H5zM15 3h4v4h-4zM10 17h4v4h-4zM7 7v3h10V7M12 10v7',
}
</script>

<template>
  <section id="top" class="hero">
    <TopoBackground :route="false" />
    <div class="container">
      <div class="top">
        <div class="intro">
          <span class="status">
            <span class="dot" />
            <span class="coords">{{ profile.coords }}</span>
            <span class="sep" />
            {{ profile.location }}
          </span>
          <h1>
            {{ firstName }} <span class="marker">{{ lastName }}</span>
            <span class="accent">{{ profile.headline }}</span>
          </h1>
          <p class="tagline">{{ profile.tagline }}</p>

          <div class="cta">
            <a class="btn btn-primary" href="#projects">View my work</a>
            <a class="btn btn-ghost" :href="profile.cv" download>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12M7 10l5 5 5-5M5 21h14" /></svg>
              Download CV
            </a>
            <a class="btn btn-ghost" :href="profile.github" target="_blank" rel="noopener">GitHub</a>
            <a class="btn btn-ghost" :href="profile.linkedin" target="_blank" rel="noopener">LinkedIn</a>
          </div>
        </div>
        <div class="mascot-wrap">
          <MascotSticker />
        </div>
      </div>

      <dl class="stats">
        <div v-for="(s, i) in stats" :key="s.label" class="stat" :style="tint(statColors[i % statColors.length])">
          <dt>{{ s.label }}</dt>
          <dd>{{ s.value }}</dd>
        </div>
      </dl>

      <ul class="focus">
        <li v-for="(f, i) in profile.focus" :key="f.title" class="tile card" :style="tint(focusColors[i % focusColors.length])">
          <span class="icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path :d="icons[f.icon]" />
            </svg>
          </span>
          <h2>{{ f.title }}</h2>
          <p>{{ f.text }}</p>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  overflow: hidden;
  padding: 88px 0 48px;
  /* Soft "land and water" colour patches under the contour lines. */
  background:
    radial-gradient(520px 380px at 8% 6%, var(--c-teal-soft), transparent 70%),
    radial-gradient(560px 420px at 88% 22%, var(--c-violet-soft), transparent 70%),
    radial-gradient(520px 320px at 55% 96%, var(--c-yellow-soft), transparent 70%);
}
.marker {
  white-space: nowrap;
  background: linear-gradient(transparent 60%, var(--marker) 60%, var(--marker) 92%, transparent 92%);
  padding: 0 4px;
  margin: 0 -4px;
}
.hero > .container {
  position: relative;
}
.top {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 320px;
  align-items: center;
  gap: 32px;
}
.mascot-wrap {
  position: relative;
  z-index: 2;
  margin-top: 24px;
}
@media (max-width: 900px) {
  .top {
    grid-template-columns: 1fr;
  }
  .mascot-wrap {
    order: -1;
    width: 180px;
    margin: 0 0 -8px auto;
  }
}
.status {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: var(--mono);
  font-size: 13px;
  color: var(--text-muted);
  padding: 6px 12px;
  border: 1px solid var(--border);
  border-radius: 999px;
  background: var(--surface);
}
.dot {
  position: relative;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--pin);
}
.dot::after {
  content: '';
  position: absolute;
  inset: -4px;
  border-radius: 50%;
  border: 2px solid var(--pin);
  animation: ping 2s ease-out infinite;
}
@keyframes ping {
  from {
    transform: scale(0.6);
    opacity: 0.8;
  }
  to {
    transform: scale(2);
    opacity: 0;
  }
}
.coords {
  color: var(--text);
}
.sep {
  width: 1px;
  height: 14px;
  background: var(--border);
}
h1 {
  margin-top: 28px;
  font-size: clamp(40px, 7.5vw, 76px);
  font-weight: 700;
  letter-spacing: -0.035em;
  line-height: 1.05;
  max-width: 900px;
}
.accent {
  display: block;
  margin-top: 14px;
  max-width: 720px;
  font-size: 0.42em;
  letter-spacing: -0.02em;
  font-weight: 700;
  line-height: 1.25;
  color: var(--accent);
}
.tagline {
  margin-top: 20px;
  font-size: clamp(17px, 2vw, 19px);
  color: var(--text-muted);
  max-width: 680px;
}
.cta {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 32px;
}
.stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  margin: 56px 0 0;
}
.stat {
  position: relative;
  display: flex;
  flex-direction: column-reverse;
  justify-content: flex-end;
  padding: 18px 20px 18px 42px;
  border: 1px solid var(--border);
  background: var(--surface);
  border-radius: 12px;
}
/* Map-legend swatch: a small waypoint per stat. */
.stat::before {
  content: '';
  position: absolute;
  left: 18px;
  top: 27px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--c);
  box-shadow: 0 0 0 4px var(--c-soft);
}
.stat dd {
  margin: 0;
  font-family: var(--display);
  font-size: 32px;
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.1;
  color: var(--c);
}
.stat dt {
  font-family: var(--mono);
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--text-muted);
  margin-top: 4px;
}
.focus {
  list-style: none;
  margin: 16px 0 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}
.tile {
  padding: 20px;
}
.tile:hover {
  transform: translateY(-2px);
}
.icon {
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: var(--c-soft);
  color: var(--c);
}
.tile {
  border-top: 4px solid var(--c);
}
.tile h2 {
  margin-top: 14px;
  font-size: 17px;
  font-weight: 600;
}
.tile p {
  margin-top: 4px;
  font-size: 14px;
  line-height: 1.5;
  color: var(--text-muted);
}
@media (max-width: 960px) {
  .focus {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 720px) {
  .stats {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 480px) {
  .focus {
    grid-template-columns: 1fr;
  }
}
</style>
