<script setup lang="ts">
import { profile, stats } from '../data/profile'
</script>

<template>
  <section id="top" class="hero">
    <div class="container">
      <span class="status"><span class="dot" />{{ profile.location }}</span>
      <h1>
        {{ profile.name }}
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

      <dl class="stats">
        <div v-for="s in stats" :key="s.label" class="stat">
          <dt>{{ s.label }}</dt>
          <dd>{{ s.value }}</dd>
        </div>
      </dl>

      <div class="about card">
        <p v-for="(p, i) in profile.summary" :key="i">{{ p }}</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  padding: 72px 0 40px;
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
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--success);
  box-shadow: 0 0 0 4px var(--success-soft);
}
h1 {
  margin-top: 24px;
  font-size: clamp(34px, 6vw, 58px);
  font-weight: 800;
  max-width: 900px;
}
.accent {
  display: block;
  margin-top: 10px;
  font-size: 0.5em;
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
  display: flex;
  flex-direction: column-reverse;
  padding: 18px 20px;
  border-left: 3px solid var(--accent);
  background: var(--surface);
  border-radius: 0 12px 12px 0;
}
.stat dd {
  margin: 0;
  font-size: 30px;
  font-weight: 800;
  letter-spacing: -0.02em;
}
.stat dt {
  color: var(--text-muted);
  font-size: 14px;
}
.about {
  margin-top: 24px;
  padding: 24px 28px;
  display: grid;
  gap: 12px;
  color: var(--text-muted);
}
@media (max-width: 720px) {
  .stats {
    grid-template-columns: repeat(2, 1fr);
  }
  .about {
    padding: 20px;
  }
}
</style>
