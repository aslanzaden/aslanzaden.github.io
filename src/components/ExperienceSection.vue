<script setup lang="ts">
import { experience } from '../data/profile'
import ScreenshotGallery from './ScreenshotGallery.vue'

const impactColors = ['blue', 'teal', 'violet', 'orange']
const otherColors = ['orange', 'green']
const tint = (c: string) => ({ '--c': `var(--c-${c})`, '--c-soft': `var(--c-${c}-soft)` })
</script>

<template>
  <section id="experience" class="section">
    <div class="container">
      <div class="section-head">
        <span class="eyebrow">01 · Experience</span>
        <h2 class="section-title">Where I work</h2>
      </div>

      <article class="card job">
        <header class="role">
          <span class="period">{{ experience.period }}</span>
          <h3>{{ experience.title }}</h3>
          <p class="company">{{ experience.company }} · {{ experience.location }}</p>
          <p class="context">{{ experience.context }}</p>
          <div class="tags">
            <span v-for="t in experience.tags" :key="t" class="tag">{{ t }}</span>
          </div>
        </header>

        <dl class="impact">
          <div v-for="(m, i) in experience.impact" :key="m.label" class="metric" :style="tint(impactColors[i % impactColors.length])">
            <dd class="value">{{ m.value }}</dd>
            <dt>
              <span class="label">{{ m.label }}</span>
              <span class="how">{{ m.text }}</span>
            </dt>
          </div>
        </dl>
      </article>

      <div class="others">
        <article v-for="(p, i) in experience.otherProjects" :key="p.name" class="card other" :style="tint(otherColors[i % otherColors.length])">
          <div class="other-metric">
            <span class="value">{{ p.metric }}</span>
            <span class="label">{{ p.metricLabel }}</span>
          </div>
          <div>
            <h3>{{ p.name }}</h3>
            <p>{{ p.text }}</p>
          </div>
          <ScreenshotGallery v-if="p.screenshots.length" class="shots" :images="p.screenshots" :title="p.name" />
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.job {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 32px;
  padding: 32px;
}
.period {
  font-family: var(--mono);
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--sec);
}
h3 {
  margin-top: 8px;
  font-size: 24px;
  font-weight: 700;
}
.company {
  margin-top: 4px;
  font-weight: 600;
  color: var(--accent);
}
.context {
  margin-top: 12px;
  color: var(--text-muted);
  font-size: 15px;
}
.role .tags {
  margin-top: 18px;
}
.impact {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin: 0;
}
.metric {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 18px;
  border-radius: 12px;
  background: var(--c-soft);
}
.value {
  margin: 0;
  font-family: var(--display);
  font-size: 34px;
  font-weight: 700;
  line-height: 1;
  letter-spacing: -0.02em;
  color: var(--c);
}
.metric dt {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.label {
  font-family: var(--mono);
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--text);
}
.how {
  font-size: 14px;
  line-height: 1.45;
  color: var(--text-muted);
}
.others {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-top: 16px;
}
.other {
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  gap: 20px;
  padding: 22px 24px;
}
.other-metric {
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 120px;
  padding-right: 20px;
  border-right: 2px dashed var(--route);
}
.other-metric .value {
  font-size: 28px;
}
.other {
  border-left: 5px solid var(--c);
}
.other h3 {
  margin: 0;
  font-size: 17px;
  font-weight: 600;
}
.other p {
  margin-top: 4px;
  font-size: 14px;
  color: var(--text-muted);
}
.shots {
  grid-column: 1 / -1;
}
@media (max-width: 900px) {
  .job {
    grid-template-columns: 1fr;
    gap: 24px;
  }
  .others {
    grid-template-columns: 1fr;
  }
}
@media (max-width: 560px) {
  .job {
    padding: 20px;
  }
  .impact {
    grid-template-columns: 1fr;
  }
  .other {
    grid-template-columns: 1fr;
    gap: 12px;
  }
  .other-metric {
    padding: 0 0 12px;
    border-right: 0;
    border-bottom: 2px dashed var(--route);
  }
}
</style>
