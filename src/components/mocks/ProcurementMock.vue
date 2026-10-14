<script setup lang="ts">
import { computed, ref } from 'vue'

// An illustrative re-creation of the procurement pipeline: pick a lifecycle
// stage in the stepper to see the requests currently sitting in it.

type Status = 'Approved' | 'In review' | 'Action needed'

const stages = ['Vendor qualification', 'Tender creation', 'Commercial evaluation', 'Contract award'] as const

const requests: { id: string; title: string; category: string; stage: number; status: Status }[] = [
  { id: 'PR-2041', title: 'Office IT equipment', category: 'Goods', stage: 0, status: 'In review' },
  { id: 'PR-2038', title: 'Logistics partner onboarding', category: 'Services', stage: 0, status: 'Action needed' },
  { id: 'PR-2035', title: 'Security services', category: 'Services', stage: 0, status: 'Approved' },
  { id: 'PR-2029', title: 'Fleet tyres — annual supply', category: 'Goods', stage: 1, status: 'In review' },
  { id: 'PR-2027', title: 'Warehouse racking', category: 'Works', stage: 1, status: 'Approved' },
  { id: 'PR-2019', title: 'Fuel cards programme', category: 'Services', stage: 2, status: 'In review' },
  { id: 'PR-2016', title: 'Network infrastructure upgrade', category: 'Works', stage: 2, status: 'Action needed' },
  { id: 'PR-2012', title: 'GPS tracking hardware', category: 'Goods', stage: 2, status: 'Approved' },
  { id: 'PR-2004', title: 'Cleaning services', category: 'Services', stage: 3, status: 'Approved' },
]

const active = ref(2)

const counts = computed(() => stages.map((_, i) => requests.filter((r) => r.stage === i).length))
const rows = computed(() => requests.filter((r) => r.stage === active.value))

const statusClass: Record<Status, string> = {
  Approved: 'ok',
  'In review': 'info',
  'Action needed': 'warn',
}
</script>

<template>
  <div class="mock card">
    <div class="topbar">
      <span class="title">Procurement requests</span>
      <span class="new">+ New request</span>
    </div>

    <ol class="stepper">
      <li v-for="(s, i) in stages" :key="s">
        <button :class="{ active: active === i, done: i < active }" :aria-current="active === i ? 'step' : undefined" @click="active = i">
          <span class="num">
            <svg v-if="i < active" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l5 5L20 7" /></svg>
            <template v-else>{{ i + 1 }}</template>
          </span>
          <span class="label">{{ s }}</span>
          <span class="count">{{ counts[i] }}</span>
        </button>
      </li>
    </ol>

    <div class="table" role="table" :aria-label="`Requests in ${stages[active]}`">
      <div class="tr th" role="row">
        <span role="columnheader">ID</span>
        <span role="columnheader">Request</span>
        <span role="columnheader" class="cat">Category</span>
        <span role="columnheader">Status</span>
      </div>
      <TransitionGroup name="row">
        <div v-for="r in rows" :key="r.id" class="tr" role="row">
          <span role="cell" class="id">{{ r.id }}</span>
          <span role="cell" class="req">{{ r.title }}</span>
          <span role="cell" class="cat">{{ r.category }}</span>
          <span role="cell"><span :class="['badge', statusClass[r.status]]">{{ r.status }}</span></span>
        </div>
      </TransitionGroup>
    </div>

    <div class="footer">
      <span>Stage {{ active + 1 }} of {{ stages.length }} · {{ rows.length }} requests</span>
      <span class="hint">Click a stage above</span>
    </div>
  </div>
</template>

<style scoped>
.mock {
  overflow: hidden;
  font-size: 13px;
}
.topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid var(--border);
}
.title {
  font-weight: 700;
  font-size: 14px;
}
.new {
  font-size: 12px;
  font-weight: 600;
  padding: 5px 10px;
  border-radius: 7px;
  background: var(--accent);
  color: var(--accent-text);
}
.stepper {
  list-style: none;
  margin: 0;
  padding: 14px 12px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 6px;
  background: var(--surface-2);
}
.stepper button {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 6px;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid transparent;
  background: transparent;
  color: var(--text-muted);
  font: inherit;
  font-size: 12px;
  text-align: left;
  cursor: pointer;
  position: relative;
  height: 100%;
}
.stepper button:hover {
  background: var(--surface);
}
.stepper button.active {
  background: var(--surface);
  border-color: var(--accent);
  color: var(--text);
}
.num {
  display: grid;
  place-items: center;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  border: 1.5px solid var(--border);
  font-weight: 700;
  font-size: 11px;
  background: var(--surface);
}
.active .num,
.done .num {
  background: var(--accent);
  border-color: var(--accent);
  color: var(--accent-text);
}
.label {
  font-weight: 600;
  line-height: 1.3;
}
.count {
  position: absolute;
  top: 10px;
  right: 10px;
  font-family: var(--mono);
  font-size: 11px;
}
.table {
  padding: 4px 0;
  min-height: 170px;
}
.tr {
  display: grid;
  grid-template-columns: 72px 1fr 80px 104px;
  gap: 10px;
  align-items: center;
  padding: 10px 16px;
  border-bottom: 1px solid var(--border);
}
.th {
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--text-muted);
  font-weight: 600;
}
.id {
  font-family: var(--mono);
  color: var(--text-muted);
}
.req {
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.cat {
  color: var(--text-muted);
}
.badge {
  font-size: 11px;
  font-weight: 600;
  padding: 3px 8px;
  border-radius: 999px;
  white-space: nowrap;
}
.badge.ok {
  background: var(--success-soft);
  color: var(--success);
}
.badge.info {
  background: var(--accent-soft);
  color: var(--accent);
}
.badge.warn {
  background: var(--warning-soft);
  color: var(--warning);
}
.footer {
  display: flex;
  justify-content: space-between;
  padding: 12px 16px;
  color: var(--text-muted);
}
.row-enter-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}
.row-enter-from {
  opacity: 0;
  transform: translateY(6px);
}
@media (max-width: 560px) {
  .stepper {
    grid-template-columns: repeat(2, 1fr);
  }
  .tr {
    grid-template-columns: 64px 1fr 96px;
  }
  .cat {
    display: none;
  }
  .hint {
    display: none;
  }
}
</style>
