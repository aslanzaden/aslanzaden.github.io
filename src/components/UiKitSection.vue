<script setup lang="ts">
import { computed, ref } from 'vue'
import { uiKit } from '../data/profile'

// Live stories embedded straight from the published Storybook.
const demos = [
  { label: 'Button', id: 'components-button--all-modes' },
  { label: 'DataTable', id: 'components-datatable--playground' },
  { label: 'Dropdown', id: 'components-dropdown--multiselect' },
  { label: 'Input', id: 'components-input--interactive' },
  { label: 'Stepper', id: 'components-stepper--interactive' },
  { label: 'Badge', id: 'components-badge--all-variants' },
  { label: 'Toaster', id: 'components-toaster--playground' },
]

const active = ref(0)
const src = computed(() => `${uiKit.storybook}/iframe.html?id=${demos[active.value].id}&viewMode=story`)
const storyUrl = computed(() => `${uiKit.storybook}/?path=/story/${demos[active.value].id}`)

const copied = ref(false)
async function copyInstall() {
  try {
    await navigator.clipboard.writeText(uiKit.install)
    copied.value = true
    setTimeout(() => (copied.value = false), 1500)
  } catch {
    // Clipboard access can be blocked; the command stays visible to copy by hand.
  }
}
</script>

<template>
  <section id="ui-kit" class="section">
    <div class="container">
      <div class="section-head">
        <span class="eyebrow">// open source</span>
        <h2 class="section-title">UI Kit</h2>
        <p class="section-lead">{{ uiKit.description }}</p>
      </div>

      <div class="grid">
        <div class="info card">
          <code class="pkg">{{ uiKit.name }}</code>

          <button class="install" @click="copyInstall">
            <span><span class="prompt">$</span> {{ uiKit.install }}</span>
            <span class="copy">{{ copied ? 'Copied' : 'Copy' }}</span>
          </button>

          <h3>{{ uiKit.components.length }} components</h3>
          <div class="tags">
            <span v-for="c in uiKit.components" :key="c" class="tag mono">{{ c }}</span>
          </div>

          <h3>Built with</h3>
          <div class="tags">
            <span v-for="s in uiKit.stack" :key="s" class="tag">{{ s }}</span>
          </div>

          <div class="links">
            <a class="btn btn-primary" :href="uiKit.storybook" target="_blank" rel="noopener">Open Storybook</a>
            <a class="btn btn-ghost" :href="uiKit.repo" target="_blank" rel="noopener">GitHub</a>
            <a class="btn btn-ghost" :href="uiKit.npm" target="_blank" rel="noopener">npm</a>
          </div>
        </div>

        <div class="preview card">
          <div class="tabs" role="tablist" aria-label="Live component previews">
            <button
              v-for="(d, i) in demos"
              :key="d.id"
              role="tab"
              :aria-selected="active === i"
              :class="{ on: active === i }"
              @click="active = i"
            >
              {{ d.label }}
            </button>
          </div>
          <div class="frame-wrap">
            <iframe :key="src" :src="src" :title="`${demos[active].label} story from the UI Kit Storybook`" loading="lazy" />
          </div>
          <div class="frame-foot">
            <span>Live from Storybook — try interacting with it</span>
            <a :href="storyUrl" target="_blank" rel="noopener">Open story ↗</a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: 1fr 1.4fr;
  gap: 20px;
  align-items: start;
}
.info {
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.pkg {
  font-family: var(--mono);
  font-size: 18px;
  font-weight: 500;
  color: var(--accent);
}
.install {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 12px 14px;
  border-radius: 10px;
  border: 1px solid var(--border);
  background: var(--surface-2);
  color: var(--text);
  font-family: var(--mono);
  font-size: 13px;
  cursor: pointer;
  text-align: left;
}
.prompt {
  color: var(--text-muted);
}
.copy {
  font-family: var(--font);
  font-size: 12px;
  font-weight: 600;
  color: var(--accent);
}
h3 {
  font-size: 14px;
  margin-top: 6px;
  color: var(--text-muted);
  font-weight: 600;
}
.mono {
  font-family: var(--mono);
  font-size: 12px;
}
.links {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 8px;
}
.preview {
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.tabs {
  display: flex;
  gap: 4px;
  padding: 8px;
  border-bottom: 1px solid var(--border);
  overflow-x: auto;
}
.tabs button {
  font: inherit;
  font-size: 13px;
  font-weight: 500;
  padding: 6px 12px;
  border-radius: 8px;
  border: none;
  background: transparent;
  color: var(--text-muted);
  cursor: pointer;
  white-space: nowrap;
}
.tabs button.on {
  background: var(--accent-soft);
  color: var(--accent);
}
.frame-wrap {
  background: #ffffff;
  height: 440px;
}
iframe {
  width: 100%;
  height: 100%;
  border: 0;
  display: block;
}
.frame-foot {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  padding: 10px 14px;
  font-size: 13px;
  color: var(--text-muted);
  border-top: 1px solid var(--border);
}
@media (max-width: 900px) {
  .grid {
    grid-template-columns: 1fr;
  }
  .frame-wrap {
    height: 400px;
  }
}
</style>
