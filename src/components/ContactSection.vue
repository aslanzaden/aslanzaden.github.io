<script setup lang="ts">
import { profile } from '../data/profile'
import TopoBackground from './TopoBackground.vue'
</script>

<template>
  <section id="contact" class="section">
    <div class="container">
      <div class="cta card">
        <TopoBackground :route="false" class="cta-topo" />
        <span class="eyebrow">05 · Contact</span>
        <h2 class="section-title">Let's build something together</h2>
        <div class="actions">
          <a class="btn btn-primary" :href="`mailto:${profile.email}`">{{ profile.email }}</a>
          <a class="btn btn-ghost" :href="profile.linkedin" target="_blank" rel="noopener">LinkedIn</a>
          <a class="btn btn-ghost" :href="profile.github" target="_blank" rel="noopener">GitHub</a>
          <a class="btn btn-ghost" :href="profile.cv" download>Download CV</a>
        </div>
      </div>
    </div>
  </section>
  <footer class="container footer">
    <span>© {{ new Date().getFullYear() }} {{ profile.name }}</span>
    <span class="mono">{{ profile.coords }} · {{ profile.location }}</span>
    <span>Built with Vue 3, TypeScript &amp; Vite</span>
  </footer>
</template>

<style scoped>
.cta {
  position: relative;
  overflow: hidden;
  isolation: isolate;
  padding: 56px 40px;
  /* Bold finale: fixed colours so it reads the same in light and dark. */
  --contour: rgb(255 255 255 / 0.16);
  --sec: #fde047;
  --surface: #2a3fbf;
  --text-muted: rgb(255 255 255 / 0.85);
  background: linear-gradient(135deg, #2547d0 0%, #5b3fe0 55%, #7c3aed 100%);
  border: 0;
  color: #ffffff;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.cta-topo {
  z-index: -1;
}
.mono {
  font-family: var(--mono);
  font-size: 13px;
}
.actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  margin-top: 28px;
}
.actions .btn-primary {
  word-break: break-all;
  background: #ffffff;
  color: #2547d0;
  border-color: #0f172a;
  box-shadow: 4px 4px 0 #0f172a;
}
.actions .btn-ghost {
  background: transparent;
  color: #ffffff;
  border-color: rgb(255 255 255 / 0.6);
}
.actions .btn-ghost:hover {
  border-color: #ffffff;
  box-shadow: 4px 4px 0 #0f172a;
}
.cta .section-title::after {
  margin: 12px auto 0;
}
.footer {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 8px;
  padding-top: 24px;
  padding-bottom: 40px;
  color: var(--text-muted);
  font-size: 14px;
}
@media (max-width: 560px) {
  .cta {
    padding: 32px 20px;
  }
}
</style>
