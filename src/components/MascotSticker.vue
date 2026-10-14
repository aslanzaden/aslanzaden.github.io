<script setup lang="ts">
// Hero mascot: a waving map-pin character with a laptop, a speech bubble and
// a few doodles. The white sticker outline and shadow come from an SVG filter.
</script>

<template>
  <svg class="mascot" viewBox="0 0 340 380" role="img" aria-label="Map-pin mascot waving next to a laptop, saying: Let's build something!">
    <defs>
      <filter id="sticker" x="-25%" y="-25%" width="150%" height="150%">
        <feMorphology in="SourceAlpha" operator="dilate" radius="5" result="grown" />
        <feFlood flood-color="#ffffff" />
        <feComposite in2="grown" operator="in" result="outline" />
        <feOffset in="grown" dy="6" result="moved" />
        <feGaussianBlur in="moved" stdDeviation="5" result="blurred" />
        <feFlood flood-color="#0f172a" flood-opacity="0.22" />
        <feComposite in2="blurred" operator="in" result="shadow" />
        <feMerge>
          <feMergeNode in="shadow" />
          <feMergeNode in="outline" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>

    <!-- Ground shadow (outside the sticker so it stays soft). -->
    <ellipse class="ground" cx="175" cy="350" rx="60" ry="9" />

    <g class="bob">
      <g filter="url(#sticker)">
        <!-- Waving arm (behind the body). -->
        <g class="wave">
          <path class="limb" d="M110 200 Q78 178 72 140" />
          <circle class="body" cx="70" cy="132" r="13" />
        </g>

        <!-- Pin body. -->
        <path class="body" d="M175 340 C142 288 92 250 92 180 A83 83 0 1 1 258 180 C258 250 208 288 175 340 Z" />
        <circle class="face" cx="175" cy="172" r="56" />

        <!-- Face: one open eye, one winking, blush and a big smile. -->
        <ellipse class="ink" cx="155" cy="165" rx="7" ry="9" />
        <circle class="shine" cx="157.5" cy="161.5" r="2.4" />
        <path class="ink-line" d="M186 167 Q195 156 204 167" />
        <circle class="blush" cx="141" cy="186" r="7" />
        <circle class="blush" cx="209" cy="186" r="7" />
        <path class="ink-line smile" d="M160 187 Q175 203 190 187" />

        <!-- Laptop held in front. -->
        <g transform="rotate(-8 255 280)">
          <rect class="screen" x="200" y="232" width="112" height="74" rx="9" />
          <text class="code" x="256" y="276" text-anchor="middle">&lt;/&gt;</text>
          <rect class="base" x="190" y="304" width="134" height="11" rx="5" />
        </g>
        <path class="limb" d="M234 222 Q214 240 210 262" />
      </g>
    </g>

    <!-- Speech bubble. -->
    <g class="bubble" filter="url(#sticker)">
      <path class="bubble-bg" d="M22 22 h150 a16 16 0 0 1 16 16 v44 a16 16 0 0 1 -16 16 h-92 l-22 22 l4 -22 h-40 a16 16 0 0 1 -16 -16 v-44 a16 16 0 0 1 16 -16 Z" transform="rotate(-6 100 70)" />
      <text class="bubble-text" transform="rotate(-6 100 70)">
        <tspan x="98" y="55" text-anchor="middle">Let's build</tspan>
        <tspan x="98" y="82" text-anchor="middle">something!</tspan>
      </text>
    </g>

    <!-- Doodles. -->
    <g filter="url(#sticker)">
      <path class="bolt" d="M300 40 L276 88 H296 L282 130 L320 72 H298 L312 40 Z" />
    </g>
    <path class="spark s1" d="M44 250 l5 13 13 5 -13 5 -5 13 -5 -13 -13 -5 13 -5 Z" />
    <path class="spark s2" d="M306 172 l4 9 9 4 -9 4 -4 9 -4 -9 -9 -4 9 -4 Z" />
    <circle class="spark s3" cx="262" cy="20" r="5" />
  </svg>
</template>

<style scoped>
.mascot {
  display: block;
  width: 100%;
  height: auto;
  overflow: visible;
}
.ground {
  fill: var(--text);
  opacity: 0.12;
  animation: squash 3.2s ease-in-out infinite;
  transform-origin: 175px 350px;
}
.bob {
  animation: bob 3.2s ease-in-out infinite;
}
@keyframes bob {
  50% {
    transform: translateY(-10px);
  }
}
@keyframes squash {
  50% {
    transform: scaleX(0.82);
    opacity: 0.07;
  }
}
.body {
  fill: var(--accent);
}
.limb {
  fill: none;
  stroke: var(--accent);
  stroke-width: 13;
  stroke-linecap: round;
}
.wave {
  transform-origin: 110px 200px;
  animation: wave 2.4s ease-in-out infinite;
}
@keyframes wave {
  0%,
  60%,
  100% {
    transform: rotate(0);
  }
  70% {
    transform: rotate(-14deg);
  }
  80% {
    transform: rotate(8deg);
  }
  90% {
    transform: rotate(-10deg);
  }
}
.face {
  fill: #ffffff;
}
.ink {
  fill: #0f172a;
}
.shine {
  fill: #ffffff;
}
.ink-line {
  fill: none;
  stroke: #0f172a;
  stroke-width: 4.5;
  stroke-linecap: round;
}
.smile {
  stroke-width: 5;
}
.blush {
  fill: #fb7185;
  opacity: 0.45;
}
.screen {
  fill: #1e293b;
}
.base {
  fill: #475569;
}
.code {
  font-family: var(--mono);
  font-size: 30px;
  font-weight: 500;
  fill: #4ade80;
}
.bubble {
  transform-origin: 80px 110px;
  animation: pop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0.6s both;
}
@keyframes pop {
  from {
    transform: scale(0);
  }
}
.bubble-bg {
  fill: var(--pin);
}
.bubble-text {
  font-family: var(--display);
  font-size: 22px;
  font-weight: 700;
  fill: #ffffff;
}
.bolt {
  fill: #facc15;
}
.spark {
  fill: var(--pin);
  transform-box: fill-box;
  transform-origin: center;
  animation: twinkle 2.6s ease-in-out infinite;
}
.s2 {
  fill: #facc15;
  animation-delay: 0.9s;
}
.s3 {
  fill: var(--accent);
  animation-delay: 1.6s;
}
@keyframes twinkle {
  50% {
    transform: scale(0.5);
    opacity: 0.5;
  }
}
</style>
