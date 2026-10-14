<script setup lang="ts">
import { onMounted, ref } from 'vue'

withDefaults(defineProps<{ route?: boolean }>(), { route: true })

// Decorative hero backdrop: topographic contour lines around a few "peaks",
// plus a GPS-style route that draws itself and a vehicle that drives along it.

interface Peak {
  x: number
  y: number
  rings: number
  seed: number
}

const peaks: Peak[] = [
  { x: 980, y: 210, rings: 11, seed: 1.3 },
  { x: 180, y: 600, rings: 9, seed: 4.1 },
  { x: 640, y: -40, rings: 7, seed: 2.7 },
]

// Closed, smooth loop: radius wobbles with a couple of sine waves so every
// ring is irregular like a real elevation line. Catmull-Rom → cubic Bézier.
function ring(p: Peak, r: number): string {
  const n = 48
  const pts: [number, number][] = []
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2
    const k = 1 + 0.16 * Math.sin(3 * a + p.seed) + 0.08 * Math.sin(5 * a + p.seed * 2 + r * 0.02)
    pts.push([p.x + Math.cos(a) * r * k * 1.25, p.y + Math.sin(a) * r * k])
  }
  let d = `M${pts[0][0].toFixed(1)},${pts[0][1].toFixed(1)}`
  for (let i = 0; i < n; i++) {
    const p0 = pts[(i - 1 + n) % n]
    const p1 = pts[i]
    const p2 = pts[(i + 1) % n]
    const p3 = pts[(i + 2) % n]
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6]
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6]
    d += `C${c1[0].toFixed(1)},${c1[1].toFixed(1)} ${c2[0].toFixed(1)},${c2[1].toFixed(1)} ${p2[0].toFixed(1)},${p2[1].toFixed(1)}`
  }
  return d + 'Z'
}

const contours = peaks.flatMap((p) => Array.from({ length: p.rings }, (_, i) => ring(p, 26 + i * 30)))

const routePath = 'M840,40 C900,120 1060,110 1040,220 S880,300 930,400 S1110,470 1060,560 S940,640 980,720'
const waypoints = [
  [840, 40],
  [1040, 220],
  [930, 400],
  [1060, 560],
]

const animate = ref(false)
onMounted(() => {
  animate.value = !window.matchMedia('(prefers-reduced-motion: reduce)').matches
})
</script>

<template>
  <svg class="topo" viewBox="0 0 1200 720" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
    <g class="contours">
      <path v-for="(d, i) in contours" :key="i" :d="d" :class="{ major: i % 4 === 0 }" />
    </g>

    <g v-if="route" class="route">
      <path class="route-base" :d="routePath" />
      <path id="hero-route" class="route-line" :d="routePath" pathLength="1" />
      <g v-for="([x, y], i) in waypoints" :key="i" class="waypoint" :style="{ animationDelay: `${0.4 + i * 0.5}s` }">
        <circle :cx="x" :cy="y" r="9" class="halo" />
        <circle :cx="x" :cy="y" r="4.5" />
      </g>
      <g v-if="animate" class="vehicle">
        <circle r="11" class="halo" />
        <circle r="5.5" />
        <animateMotion dur="14s" begin="2.4s" repeatCount="indefinite" rotate="auto">
          <mpath href="#hero-route" />
        </animateMotion>
      </g>
    </g>
  </svg>
</template>

<style scoped>
.topo {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  -webkit-mask-image: linear-gradient(to bottom, #000 55%, transparent);
  mask-image: linear-gradient(to bottom, #000 55%, transparent);
}
.contours {
  fill: none;
  stroke: var(--contour);
  stroke-width: 1;
  animation: drift 40s ease-in-out infinite alternate;
}
.contours .major {
  stroke-width: 1.8;
}
@keyframes drift {
  to {
    transform: translate(-24px, 14px);
  }
}
.route-base {
  fill: none;
  stroke: var(--route);
  stroke-width: 2;
  stroke-dasharray: 6 8;
}
.route-line {
  fill: none;
  stroke: var(--accent);
  stroke-width: 2.5;
  stroke-linecap: round;
  stroke-dasharray: 1;
  stroke-dashoffset: 0;
  opacity: 0.55;
  animation: draw 2.4s ease-out both;
}
@keyframes draw {
  from {
    stroke-dashoffset: 1;
  }
}
.waypoint {
  fill: var(--pin);
  animation: pop 0.4s ease-out both;
}
@keyframes pop {
  from {
    opacity: 0;
  }
}
.halo {
  fill: var(--pin);
  opacity: 0.18;
}
.vehicle {
  fill: var(--accent);
}
.vehicle .halo {
  fill: var(--accent);
  opacity: 0.2;
}
@media (max-width: 900px) {
  .route {
    display: none;
  }
}
</style>
