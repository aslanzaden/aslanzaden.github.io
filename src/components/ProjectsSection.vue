<script setup lang="ts">
import { projects } from '../data/profile'
import FleetMapMock from './mocks/FleetMapMock.vue'
import ProcurementMock from './mocks/ProcurementMock.vue'
import ScreenshotGallery from './ScreenshotGallery.vue'

const mocks = { fleet: FleetMapMock, procurement: ProcurementMock } as const
const allHaveScreenshots = projects.every((p) => p.screenshots.length > 0)
const someHaveScreenshots = projects.some((p) => p.screenshots.length > 0)
</script>

<template>
  <section id="projects" class="section">
    <div class="container">
      <div class="section-head">
        <span class="eyebrow">// featured work at prodata</span>
        <h2 class="section-title">Modules I built</h2>
        <p v-if="allHaveScreenshots" class="section-lead">
          These two are business-critical systems I work on at Prodata. Click a screenshot to see it full size.
        </p>
        <p v-else-if="someHaveScreenshots" class="section-lead">
          These two are business-critical systems I work on at Prodata. Screenshots are from a test environment; where I can't show the real UI,
          there's a small interactive mock-up of how it works instead.
        </p>
        <p v-else class="section-lead">
          These two are business-critical systems I work on at Prodata. They're internal tools, so instead of screenshots each one has a small
          interactive mock-up that shows how it works.
        </p>
      </div>

      <div class="list">
        <article v-for="(p, i) in projects" :key="p.id" :class="['project', { flip: i % 2 === 1 }]">
          <div class="visual">
            <ScreenshotGallery v-if="p.screenshots.length" :images="p.screenshots" :title="p.title" />
            <component :is="mocks[p.id as keyof typeof mocks]" v-else />
          </div>

          <div class="body">
            <span class="eyebrow">{{ p.eyebrow }}</span>
            <h3>{{ p.title }}</h3>
            <p class="summary">{{ p.summary }}</p>

            <ul class="points">
              <li v-for="(pt, j) in p.points" :key="j">{{ pt }}</li>
            </ul>

            <dl class="metrics">
              <div v-for="m in p.metrics" :key="m.label">
                <dd>{{ m.value }}</dd>
                <dt>{{ m.label }}</dt>
              </div>
            </dl>

            <div class="tags">
              <span v-for="s in p.stack" :key="s" class="tag">{{ s }}</span>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.list {
  display: grid;
  gap: 72px;
}
.project {
  display: grid;
  grid-template-columns: 1.15fr 1fr;
  gap: 40px;
  align-items: center;
}
.project.flip .visual {
  order: 2;
}
.visual {
  min-width: 0;
}
h3 {
  font-size: 26px;
  font-weight: 800;
}
.summary {
  margin-top: 10px;
  color: var(--text-muted);
  font-size: 17px;
}
.points {
  margin: 18px 0 0;
  padding-left: 18px;
  display: grid;
  gap: 8px;
}
.points li::marker {
  color: var(--accent);
}
.metrics {
  display: flex;
  gap: 28px;
  margin: 22px 0;
  flex-wrap: wrap;
}
.metrics div {
  display: flex;
  flex-direction: column;
}
.metrics dd {
  margin: 0;
  font-size: 24px;
  font-weight: 800;
  color: var(--accent);
}
.metrics dt {
  font-size: 13px;
  color: var(--text-muted);
}
@media (max-width: 900px) {
  .project {
    grid-template-columns: 1fr;
    gap: 24px;
  }
  .project.flip .visual {
    order: 0;
  }
}
</style>
