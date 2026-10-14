<script setup lang="ts">
import { onBeforeUnmount, onMounted } from 'vue'
import NavBar from './components/NavBar.vue'
import HeroSection from './components/HeroSection.vue'
import ExperienceSection from './components/ExperienceSection.vue'
import ProjectsSection from './components/ProjectsSection.vue'
import UiKitSection from './components/UiKitSection.vue'
import SkillsSection from './components/SkillsSection.vue'
import ContactSection from './components/ContactSection.vue'
import RouteTrail from './components/RouteTrail.vue'

// Fade cards and section headings in as they scroll into view.
let observer: IntersectionObserver | undefined

onMounted(() => {
  if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  observer = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue
        e.target.classList.add('in')
        observer?.unobserve(e.target)
      }
    },
    { rootMargin: '0px 0px -8% 0px' },
  )
  document.querySelectorAll('main .section .section-head, main .section .card, main .project').forEach((el) => {
    // A project fades in as one block, so skip the cards nested inside it.
    if (!el.matches('.project') && el.closest('.project')) return
    el.classList.add('reveal')
    observer!.observe(el)
  })
})
onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <NavBar />
  <RouteTrail />
  <main>
    <HeroSection />
    <ExperienceSection />
    <ProjectsSection />
    <UiKitSection />
    <SkillsSection />
    <ContactSection />
  </main>
</template>
