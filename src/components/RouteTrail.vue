<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

// A GPS-style route that runs down the whole page: from the top, behind the
// hero mascot, then along the right margin through every section's divider
// pin. The solid part follows the scroll position, with a vehicle at its head.

interface Pt {
  x: number
  y: number
  len: number // distance along the route up to this point
}

const width = ref(0)
const height = ref(0)
const d = ref('')
const total = ref(1)
const drawn = ref(0)
const head = ref<{ x: number; y: number } | null>(null)
const visible = ref(false)
const reduced = ref(false)

let pts: Pt[] = []
let frame = 0
let resizeObserver: ResizeObserver | undefined

const smooth = (a: number, b: number, t: number) => {
  const x = Math.min(1, Math.max(0, (t - a) / (b - a)))
  return x * x * (3 - 2 * x)
}

function build() {
  const page = document.documentElement
  width.value = page.clientWidth
  height.value = page.scrollHeight

  const content = document.querySelector<HTMLElement>('main .section .container')
  const sections = [...document.querySelectorAll<HTMLElement>('main .section')]
  const mascot = document.querySelector<HTMLElement>('.mascot-wrap')
  const hero = document.querySelector<HTMLElement>('.hero')
  if (!content || !sections.length || !hero) return

  const sy = window.scrollY
  const cs = getComputedStyle(content)
  const contentRight = content.getBoundingClientRect().right - parseFloat(cs.paddingRight)
  const gutter = width.value - contentRight

  // No free margin on narrow screens: hide instead of running behind content.
  visible.value = gutter >= 70
  if (!visible.value) return

  const xg = contentRight + gutter / 2
  // Divider pins sit at the right end of each section's dashed line.
  const stops = sections.map((s) => ({ x: contentRight - 6, y: s.getBoundingClientRect().top + sy + 1 }))

  const raw: { x: number; y: number }[] = []
  const heroTop = hero.getBoundingClientRect().top + sy + 24

  // Hero: from the top margin, curving in behind the mascot.
  let from = { x: xg, y: heroTop }
  if (mascot && mascot.offsetParent) {
    const r = mascot.getBoundingClientRect()
    const m = { x: r.left + r.width * 0.5, y: r.top + sy + r.height * 0.55 }
    for (let y = from.y; y <= m.y; y += 6) {
      const t = (y - from.y) / (m.y - from.y)
      raw.push({ x: from.x + (m.x - from.x) * smooth(0.1, 0.9, t), y })
    }
    from = m
  }

  // Each leg swings out into the margin, wiggles, and comes back to the next pin.
  for (const to of stops) {
    const span = to.y - from.y
    for (let y = from.y; y <= to.y; y += 6) {
      const t = (y - from.y) / span
      const out = smooth(0, 0.18, t) * (1 - smooth(0.82, 1, t))
      const base = from.x + (to.x - from.x) * smooth(0.82, 1, t)
      const wiggle = Math.sin(t * Math.PI * 3) * Math.min(28, gutter * 0.18) * out
      raw.push({ x: base + (xg - base) * out + wiggle, y })
    }
    raw.push(to)
    from = to
  }

  let len = 0
  pts = raw.map((p, i) => {
    if (i) len += Math.hypot(p.x - raw[i - 1].x, p.y - raw[i - 1].y)
    return { ...p, len }
  })
  total.value = len || 1
  d.value = pts.map((p, i) => `${i ? 'L' : 'M'}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join('')
  update()
}

// Draw the route down to a line a bit below the middle of the viewport.
function update() {
  frame = 0
  if (!pts.length) return
  if (reduced.value) {
    drawn.value = total.value
    head.value = null
    return
  }
  const target = window.scrollY + window.innerHeight * 0.6
  let i = pts.findIndex((p) => p.y > target)
  if (i === -1) i = pts.length - 1
  const p = pts[Math.max(0, i)]
  drawn.value = p.len
  head.value = { x: p.x, y: p.y }
}

const onScroll = () => {
  if (!frame) frame = requestAnimationFrame(update)
}
const onResize = () => {
  if (!frame) frame = requestAnimationFrame(build)
}

onMounted(() => {
  reduced.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  build()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onResize)
  // Lazy images and fonts change the page height after load.
  resizeObserver = new ResizeObserver(onResize)
  resizeObserver.observe(document.body)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onResize)
  resizeObserver?.disconnect()
  cancelAnimationFrame(frame)
})
</script>

<template>
  <svg
    v-if="visible && d"
    class="trail"
    :width="width"
    :height="height"
    :viewBox="`0 0 ${width} ${height}`"
    aria-hidden="true"
    focusable="false"
  >
    <path class="ahead" :d="d" />
    <path class="driven" :d="d" :style="{ strokeDasharray: `${drawn} ${total}` }" />
    <g v-if="head" class="vehicle" :transform="`translate(${head.x} ${head.y})`">
      <circle r="12" class="halo" />
      <circle r="6" />
    </g>
  </svg>
</template>

<style scoped>
.trail {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  pointer-events: none;
  overflow: visible;
}
.ahead {
  fill: none;
  stroke: var(--route);
  stroke-width: 2;
  stroke-dasharray: 6 8;
}
.driven {
  fill: none;
  stroke: var(--accent);
  stroke-width: 3;
  stroke-linecap: round;
  stroke-linejoin: round;
  opacity: 0.7;
}
.vehicle {
  fill: var(--accent);
}
.halo {
  opacity: 0.2;
  animation: pulse 1.8s ease-out infinite;
  transform-box: fill-box;
  transform-origin: center;
}
@keyframes pulse {
  to {
    transform: scale(1.8);
    opacity: 0;
  }
}
</style>
