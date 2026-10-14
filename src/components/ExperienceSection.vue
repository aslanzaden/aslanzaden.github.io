<script setup lang="ts">
import { experience } from '../data/profile'
import ScreenshotGallery from './ScreenshotGallery.vue'
</script>

<template>
  <section id="experience" class="section">
    <div class="container">
      <div class="section-head">
        <span class="eyebrow">// experience</span>
        <h2 class="section-title">Where I work</h2>
      </div>

      <article class="card job">
        <header class="job-head">
          <div>
            <h3>{{ experience.title }} · <span class="company">{{ experience.company }}</span></h3>
            <p class="context">{{ experience.context }}</p>
          </div>
          <span class="period">{{ experience.period }}</span>
        </header>

        <ul class="highlights">
          <li v-for="(h, i) in experience.highlights" :key="i">{{ h }}</li>
        </ul>

        <div class="others">
          <div v-for="p in experience.otherProjects" :key="p.name" class="other">
            <h4>{{ p.name }}</h4>
            <p>{{ p.text }}</p>
            <ScreenshotGallery v-if="p.screenshots.length" class="shots" :images="p.screenshots" :title="p.name" />
          </div>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
.job {
  padding: 28px;
}
.job-head {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
}
h3 {
  font-size: 20px;
}
.company {
  color: var(--accent);
}
.context {
  color: var(--text-muted);
  margin-top: 4px;
}
.period {
  font-family: var(--mono);
  font-size: 13px;
  color: var(--text-muted);
  white-space: nowrap;
}
.highlights {
  margin: 20px 0 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 10px;
}
.highlights li {
  position: relative;
  padding-left: 22px;
}
.highlights li::before {
  content: '';
  position: absolute;
  left: 4px;
  top: 10px;
  width: 7px;
  height: 7px;
  border-radius: 2px;
  background: var(--accent);
}
.others {
  margin-top: 24px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}
.other {
  padding: 16px 18px;
  border-radius: 12px;
  background: var(--surface-2);
}
.other h4 {
  margin: 0 0 4px;
  font-size: 15px;
}
.other p {
  font-size: 14px;
  color: var(--text-muted);
}
.shots {
  margin-top: 14px;
}
@media (max-width: 720px) {
  .job {
    padding: 20px;
  }
  .others {
    grid-template-columns: 1fr;
  }
}
</style>
