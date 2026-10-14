<script setup lang="ts">
import { profile } from '../data/profile'
</script>

<template>
  <section id="contact" class="section">
    <div class="container">
      <div class="cta card">
        <span class="eyebrow">// contact</span>
        <h2 class="section-title">Let's build something together</h2>
        <p class="section-lead">
          I'm open to frontend roles and interesting projects, especially complex dashboards, design systems and map-based apps.
        </p>
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
    <span>Built with Vue 3, TypeScript &amp; Vite</span>
  </footer>
</template>

<style scoped>
.cta {
  padding: 48px 40px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.section-lead {
  max-width: 560px;
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
