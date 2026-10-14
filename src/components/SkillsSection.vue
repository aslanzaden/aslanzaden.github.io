<script setup lang="ts">
import { education, languages, skills } from '../data/profile'
</script>

<template>
  <section id="skills" class="section">
    <div class="container">
      <div class="section-head">
        <span class="eyebrow">// toolbox</span>
        <h2 class="section-title">Skills &amp; background</h2>
      </div>

      <div class="skills">
        <div v-for="s in skills" :key="s.group" class="group card">
          <h3>{{ s.group }}</h3>
          <div class="tags">
            <span v-for="item in s.items" :key="item" class="tag">{{ item }}</span>
          </div>
        </div>
      </div>

      <div class="bottom">
        <div class="card block">
          <h3>Education</h3>
          <div v-for="e in education" :key="e.school" class="edu">
            <div>
              <strong>{{ e.school }}</strong>
              <p>{{ e.degree }}</p>
            </div>
            <span class="period">{{ e.period }}</span>
          </div>
        </div>
        <div class="card block">
          <h3>Languages</h3>
          <ul>
            <li v-for="l in languages" :key="l">{{ l }}</li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.skills {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}
.group {
  padding: 20px;
}
h3 {
  font-size: 15px;
  margin-bottom: 14px;
}
.bottom {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 16px;
  margin-top: 16px;
}
.block {
  padding: 20px;
}
.edu {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  padding: 10px 0;
  border-top: 1px solid var(--border);
}
.edu p {
  color: var(--text-muted);
  font-size: 15px;
}
.period {
  font-family: var(--mono);
  font-size: 13px;
  color: var(--text-muted);
  white-space: nowrap;
}
ul {
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 8px;
}
@media (max-width: 900px) {
  .skills {
    grid-template-columns: repeat(2, 1fr);
  }
  .bottom {
    grid-template-columns: 1fr;
  }
}
@media (max-width: 560px) {
  .skills {
    grid-template-columns: 1fr;
  }
  .edu {
    flex-direction: column;
    gap: 2px;
  }
}
</style>
