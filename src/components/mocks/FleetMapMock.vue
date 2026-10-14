<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, reactive, ref } from 'vue'

// An illustrative re-creation of the fleet map: vehicles stream along roads,
// dense areas collapse into clusters, and a planned route is drawn on top.

type Pt = [number, number]

const roads: Pt[][] = [
  [[0, 70], [120, 70], [210, 40], [400, 40]],
  [[0, 180], [140, 180], [260, 150], [400, 150]],
  [[60, 0], [60, 260]],
  [[170, 0], [190, 120], [170, 260]],
  [[300, 0], [300, 260]],
  [[0, 240], [400, 220]],
  [[220, 260], [260, 150], [350, 90], [400, 80]],
]

const route: Pt[] = [[60, 230], [60, 180], [140, 180], [260, 150], [350, 90]]

const clusters = [
  { x: 92, y: 120, n: 214 },
  { x: 350, y: 195, n: 486 },
  { x: 240, y: 92, n: 131 },
]

function lengthOf(line: Pt[]) {
  let len = 0
  for (let i = 1; i < line.length; i++) len += Math.hypot(line[i][0] - line[i - 1][0], line[i][1] - line[i - 1][1])
  return len
}

function pointAt(line: Pt[], t: number): Pt {
  let remaining = t * lengthOf(line)
  for (let i = 1; i < line.length; i++) {
    const [ax, ay] = line[i - 1]
    const [bx, by] = line[i]
    const seg = Math.hypot(bx - ax, by - ay)
    if (remaining <= seg) {
      const k = remaining / seg
      return [ax + (bx - ax) * k, ay + (by - ay) * k]
    }
    remaining -= seg
  }
  return line[line.length - 1]
}

const routeD = route.map((p, i) => `${i ? 'L' : 'M'}${p[0]} ${p[1]}`).join(' ')
const roadPaths = roads.map((r) => r.map((p, i) => `${i ? 'L' : 'M'}${p[0]} ${p[1]}`).join(' '))

interface Vehicle {
  id: string
  road: number
  t: number
  speed: number
  dir: 1 | -1
  idle: boolean
}

const vehicles = reactive<Vehicle[]>(
  Array.from({ length: 16 }, (_, i) => ({
    id: `VH-${String(1000 + i * 37).padStart(4, '0')}`,
    road: i % roads.length,
    t: (i * 0.137) % 1,
    speed: 0.00025 + ((i * 7) % 5) * 0.00008,
    dir: (i % 2 ? 1 : -1) as 1 | -1,
    idle: i % 6 === 0,
  })),
)

const positions = computed(() => vehicles.map((v) => pointAt(roads[v.road], v.t)))

const showClusters = ref(true)
const showRoute = ref(true)
const selected = ref<number | null>(2)
const events = ref(4180)

const selectedInfo = computed(() => {
  if (selected.value === null) return null
  const v = vehicles[selected.value]
  const [x, y] = positions.value[selected.value]
  return { ...v, x, y, kmh: v.idle ? 0 : Math.round(v.speed * 160000) }
})

let raf = 0
let last = 0
let ticker: number | undefined

function frame(now: number) {
  const dt = last ? Math.min(now - last, 50) : 16
  last = now
  for (const v of vehicles) {
    if (v.idle) continue
    v.t += v.speed * v.dir * dt * 0.06
    if (v.t > 1 || v.t < 0) {
      v.dir = (v.dir * -1) as 1 | -1
      v.t = Math.min(1, Math.max(0, v.t))
    }
  }
  raf = requestAnimationFrame(frame)
}

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  raf = requestAnimationFrame(frame)
  ticker = window.setInterval(() => {
    events.value = 3900 + Math.round(Math.random() * 600)
  }, 1200)
})

onBeforeUnmount(() => {
  cancelAnimationFrame(raf)
  clearInterval(ticker)
})
</script>

<template>
  <div class="mock card">
    <div class="toolbar">
      <span class="live"><span class="pulse" />Live · STOMP</span>
      <span class="events">{{ events.toLocaleString('en-US') }} events/min</span>
      <div class="toggles">
        <button :class="{ on: showClusters }" :aria-pressed="showClusters" @click="showClusters = !showClusters">Clusters</button>
        <button :class="{ on: showRoute }" :aria-pressed="showRoute" @click="showRoute = !showRoute">Route</button>
      </div>
    </div>

    <svg viewBox="0 0 400 260" class="map" role="img" aria-label="Illustration of a live fleet map with moving vehicles, clusters and a planned route">
      <rect width="400" height="260" class="map-bg" />
      <g class="blocks">
        <rect x="75" y="85" width="80" height="80" rx="6" />
        <rect x="205" y="55" width="80" height="80" rx="6" />
        <rect x="315" y="100" width="70" height="40" rx="6" />
        <rect x="75" y="195" width="80" height="30" rx="6" />
        <rect x="10" y="85" width="40" height="80" rx="6" />
        <rect x="315" y="165" width="70" height="45" rx="6" />
      </g>
      <path v-for="(d, i) in roadPaths" :key="i" :d="d" class="road" />

      <g v-if="showRoute">
        <path :d="routeD" class="route" />
        <circle :cx="route[0][0]" :cy="route[0][1]" r="6" class="route-start" />
        <circle :cx="route[route.length - 1][0]" :cy="route[route.length - 1][1]" r="6" class="route-end" />
      </g>

      <g
        v-for="(p, i) in positions"
        :key="vehicles[i].id"
        :transform="`translate(${p[0]} ${p[1]})`"
        class="vehicle"
        :class="{ idle: vehicles[i].idle, selected: selected === i }"
        @click="selected = selected === i ? null : i"
      >
        <circle r="9" class="hit" />
        <circle r="4.5" class="dot" />
      </g>

      <g v-if="showClusters">
        <g v-for="c in clusters" :key="c.n" :transform="`translate(${c.x} ${c.y})`" class="cluster">
          <circle r="19" class="halo" />
          <circle r="14" class="core" />
          <text text-anchor="middle" dy="4">{{ c.n }}</text>
        </g>
      </g>
    </svg>

    <div class="footer">
      <template v-if="selectedInfo">
        <span class="mono">{{ selectedInfo.id }}</span>
        <span :class="['badge', selectedInfo.idle ? 'warn' : 'ok']">{{ selectedInfo.idle ? 'Idle' : 'Moving' }}</span>
        <span>{{ selectedInfo.kmh }} km/h</span>
      </template>
      <span v-else class="hint">Click a vehicle to inspect it</span>
      <span class="total">1,312 vehicles online</span>
    </div>
  </div>
</template>

<style scoped>
.mock {
  overflow: hidden;
}
.toolbar,
.footer {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 14px;
  font-size: 13px;
  flex-wrap: wrap;
}
.toolbar {
  border-bottom: 1px solid var(--border);
}
.footer {
  border-top: 1px solid var(--border);
  min-height: 46px;
}
.live {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-weight: 600;
}
.pulse {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--success);
  animation: pulse 1.6s infinite;
}
@keyframes pulse {
  0% { box-shadow: 0 0 0 0 color-mix(in srgb, var(--success) 60%, transparent); }
  100% { box-shadow: 0 0 0 8px transparent; }
}
.events {
  font-family: var(--mono);
  color: var(--text-muted);
}
.toggles {
  margin-left: auto;
  display: flex;
  gap: 4px;
}
.toggles button {
  font: inherit;
  font-size: 12px;
  padding: 4px 10px;
  border-radius: 7px;
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--text-muted);
  cursor: pointer;
}
.toggles button.on {
  background: var(--accent-soft);
  color: var(--accent);
  border-color: transparent;
}
.map {
  display: block;
  width: 100%;
  height: auto;
}
.map-bg {
  fill: var(--map-bg);
}
.blocks rect {
  fill: var(--map-block);
}
.road {
  fill: none;
  stroke: var(--map-road);
  stroke-width: 9;
  stroke-linecap: round;
  stroke-linejoin: round;
}
.route {
  fill: none;
  stroke: var(--accent);
  stroke-width: 3.5;
  stroke-dasharray: 8 6;
  stroke-linecap: round;
  animation: dash 1.5s linear infinite;
}
@keyframes dash {
  to { stroke-dashoffset: -28; }
}
.route-start {
  fill: var(--surface);
  stroke: var(--accent);
  stroke-width: 3;
}
.route-end {
  fill: var(--accent);
}
.vehicle {
  cursor: pointer;
}
.vehicle .hit {
  fill: transparent;
}
.vehicle .dot {
  fill: var(--success);
  stroke: var(--surface);
  stroke-width: 1.5;
}
.vehicle.idle .dot {
  fill: var(--warning);
}
.vehicle.selected .dot {
  fill: var(--accent);
}
.vehicle.selected .hit {
  fill: color-mix(in srgb, var(--accent) 25%, transparent);
}
.cluster .halo {
  fill: color-mix(in srgb, var(--accent) 20%, transparent);
}
.cluster .core {
  fill: var(--accent);
}
.cluster text {
  fill: var(--accent-text);
  font-size: 10px;
  font-weight: 700;
  font-family: var(--font);
}
.mono {
  font-family: var(--mono);
  font-weight: 500;
}
.badge {
  font-size: 12px;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 999px;
}
.badge.ok {
  background: var(--success-soft);
  color: var(--success);
}
.badge.warn {
  background: var(--warning-soft);
  color: var(--warning);
}
.hint,
.total {
  color: var(--text-muted);
}
.total {
  margin-left: auto;
}
</style>
