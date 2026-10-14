<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { profile } from '../data/profile'

const links = [
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#ui-kit', label: 'UI Kit' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
]

const open = ref(false)
const isDark = ref(false)

onMounted(() => {
  const explicit = document.documentElement.dataset.theme
  isDark.value = explicit ? explicit === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches
})

function toggleTheme() {
  isDark.value = !isDark.value
  const theme = isDark.value ? 'dark' : 'light'
  document.documentElement.dataset.theme = theme
  try {
    localStorage.setItem('theme', theme)
  } catch {
    // Storage can be unavailable (private mode); the toggle still works for this visit.
  }
}
</script>

<template>
  <header class="nav">
    <div class="container nav-inner">
      <a href="#top" class="brand" @click="open = false">
        <span class="logo">NA</span>
        <span class="brand-name">{{ profile.name }}</span>
      </a>

      <nav :class="['links', { open }]" aria-label="Main">
        <a v-for="l in links" :key="l.href" :href="l.href" @click="open = false">{{ l.label }}</a>
      </nav>

      <div class="actions">
        <button class="icon-btn" :aria-label="isDark ? 'Switch to light theme' : 'Switch to dark theme'" @click="toggleTheme">
          <svg v-if="isDark" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>
          <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" /></svg>
        </button>
        <button class="icon-btn menu-btn" :aria-expanded="open" aria-label="Toggle menu" @click="open = !open">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path v-if="!open" d="M4 7h16M4 12h16M4 17h16" /><path v-else d="M6 6l12 12M18 6L6 18" /></svg>
        </button>
      </div>
    </div>
  </header>
</template>

<style scoped>
.nav {
  position: sticky;
  top: 0;
  z-index: 50;
  background: color-mix(in srgb, var(--bg) 85%, transparent);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border);
}
.nav-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
  gap: 16px;
}
.brand {
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--text);
  font-weight: 700;
}
.brand:hover {
  text-decoration: none;
}
.logo {
  display: grid;
  place-items: center;
  width: 34px;
  height: 34px;
  border-radius: 9px;
  background: var(--accent);
  color: var(--accent-text);
  font-size: 13px;
  font-weight: 800;
}
.links {
  display: flex;
  gap: 4px;
}
.links a {
  color: var(--text-muted);
  font-weight: 500;
  font-size: 15px;
  padding: 6px 12px;
  border-radius: 8px;
}
.links a:hover {
  color: var(--text);
  background: var(--surface-2);
  text-decoration: none;
}
.actions {
  display: flex;
  gap: 6px;
}
.icon-btn {
  display: grid;
  place-items: center;
  width: 38px;
  height: 38px;
  border-radius: 10px;
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--text);
  cursor: pointer;
}
.menu-btn {
  display: none;
}

@media (max-width: 820px) {
  .brand-name {
    display: none;
  }
  .menu-btn {
    display: grid;
  }
  .links {
    display: none;
    position: absolute;
    top: 64px;
    left: 0;
    right: 0;
    flex-direction: column;
    padding: 8px 16px 16px;
    background: var(--bg);
    border-bottom: 1px solid var(--border);
  }
  .links.open {
    display: flex;
  }
  .links a {
    padding: 12px;
  }
}
</style>
