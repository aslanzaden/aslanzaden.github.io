// All site content lives here — edit this file to update the portfolio.

export const profile = {
  name: 'Novrasta Aslanzade',
  role: 'Frontend Developer',
  location: 'Baku, Azerbaijan',
  coords: '40.41° N, 49.87° E',
  email: 'novrasta.aslanzade@gmail.com',
  github: 'https://github.com/aslanzaden',
  linkedin: 'https://www.linkedin.com/in/novrasta-aslanzade',
  cv: './Novrasta_Aslanzade_CV.pdf',
  headline: 'Frontend Developer building scalable interfaces for business-critical systems.',
  tagline:
    '2+ years of experience delivering production-ready web applications with Vue.js, Nuxt.js, React and TypeScript, from enterprise dashboards and reusable UI component libraries to interactive map-based applications.',
  // Short "what I do" tiles shown under the hero.
  focus: [
    { icon: 'dashboard', title: 'Enterprise dashboards', text: 'Procurement, insurance, purchase order and fleet systems' },
    { icon: 'layers', title: 'Component libraries', text: 'Shared Storybook UI kit reused across 4 applications' },
    { icon: 'map', title: 'Maps & GIS', text: 'Leaflet, Turf.js and real-time vehicle tracking' },
    { icon: 'nodes', title: 'Frontend architecture', text: 'Modular structure and TanStack Query server state' },
  ],
}

export const stats = [
  { value: '2+', label: 'years in production frontend' },
  { value: '6+', label: 'enterprise apps shipped' },
  { value: '500+', label: 'internal business users' },
  { value: '40+', label: 'reusable UI components' },
]

// Real app screenshots. Put the image files in public/screenshots/ and list them
// here as './screenshots/<file>'. While a list is empty, the illustrative mock-up is shown instead.
export interface Screenshot {
  src: string
  alt: string
  caption?: string
}

export const experience = {
  company: 'Prodata LLC',
  title: 'Frontend Developer',
  location: 'Baku, Azerbaijan',
  period: 'Apr 2024 — Present',
  context: 'Enterprise procurement, insurance, purchase order & fleet management systems',
  tags: ['Vue.js', 'Nuxt.js', 'React', 'TypeScript', 'Agile · 2-week sprints'],
  impact: [
    { value: '6+', label: 'enterprise apps', text: 'Built and maintained for 500+ internal users' },
    { value: '−35%', label: 'redundant API calls', text: 'Query deduplication and cache invalidation' },
    { value: '−30%', label: 'feature dev time', text: 'Shared Storybook library of 40+ components' },
    { value: '10+', label: 'feature teams', text: 'Scalable architecture, no major refactors' },
  ],
  otherProjects: [
    {
      name: 'Insurance Management System',
      metric: '−45%',
      metricLabel: 'request-creation time',
      text: 'A 12-step manual process turned into 5 guided steps.',
      screenshots: [] as Screenshot[],
    },
    {
      name: 'Purchase Order Management System',
      metric: '3d → <1d',
      metricLabel: 'approval turnaround',
      text: 'Approval chains with real-time status tracking.',
      screenshots: [] as Screenshot[],
    },
  ],
}

export interface Project {
  id: string
  eyebrow: string
  title: string
  summary: string
  points: string[]
  metrics: { value: string; label: string }[]
  stack: string[]
  screenshots: Screenshot[]
}

export const projects: Project[] = [
  {
    id: 'fleet',
    eyebrow: 'Prodata · Real-time GIS',
    title: 'Fleet Management System',
    summary:
      'A real-time GIS platform for dispatch operators to track, monitor and route a fleet of 1,300+ vehicles on a live map.',
    points: [
      'Live positions from a WebSocket/STOMP feed',
      'Clustered Leaflet map with Turf.js geo calculations',
      'Route drawing and editing with Leaflet-Geoman',
    ],
    metrics: [
      { value: '1,300+', label: 'tracked vehicles' },
      { value: '<1s', label: 'map refresh' },
      { value: '1000s', label: 'events / minute' },
    ],
    stack: ['Vue.js', 'TypeScript', 'Leaflet', 'Leaflet-Geoman', 'Turf.js', 'GeoJSON', 'WebSocket / STOMP', 'geographiclib-geodesic'],
    screenshots: [
      {
        src: './screenshots/fleet-technics-list.jpg',
        alt: 'Machinery list next to a map of all geozones',
        caption: 'GPS operator: machinery list in a resizable split view with all geozones on the map',
      },
      {
        src: './screenshots/fleet-track-map.jpg',
        alt: 'Vehicle GPS track drawn on the map with direction arrows',
        caption: 'Vehicle track for the selected period, with direction arrows and the current position',
      },
      {
        src: './screenshots/fleet-map-measure.jpg',
        alt: 'Drawing and measuring tools on the vehicle track map',
        caption: 'Drawing and measuring tools (Leaflet-Geoman) on top of the track',
      },
      {
        src: './screenshots/fleet-work-orders.jpg',
        alt: 'Work orders list',
        caption: 'Chief agronomist: work orders list',
      },
      {
        src: './screenshots/fleet-field-select.jpg',
        alt: 'Field selection panel with the field polygon and area on the map',
        caption: 'Creating a work order: picking a field, with its polygon and area shown on the map',
      },
      {
        src: './screenshots/fleet-work-order-view.jpg',
        alt: 'Work order detail page',
        caption: 'Work order details: services, work volume, schedule and assigned machinery',
      },
      {
        src: './screenshots/fleet-geozone.jpg',
        alt: 'Geozone side panel with the field boundary on the map',
        caption: 'Geozone panel: field boundary and calculated area',
      },
    ],
  },
  {
    id: 'procurement',
    eyebrow: 'Prodata · Enterprise workflow',
    title: 'Procurement Management Dashboard',
    summary:
      'The frontend for a full-cycle procurement platform, from vendor qualification through tender creation and commercial evaluation to contract awarding.',
    points: [
      'Multi-step forms with conditional validation',
      'TanStack Query caching and targeted invalidation',
      'Built on the shared component library',
    ],
    metrics: [
      { value: '4', label: 'lifecycle stages' },
      { value: '15+', label: 'request types' },
      { value: '-35%', label: 'redundant API calls' },
    ],
    stack: ['Vue.js', 'Nuxt.js', 'TypeScript', 'TanStack Query', 'Pinia', 'Axios', 'SASS'],
    screenshots: [
      {
        src: './screenshots/procurement-sourcing-list.jpg',
        alt: 'Sourcing list with status summary cards, filters and paginated table',
        caption: 'Sourcing list: status summary cards, filters and a paginated table',
      },
      {
        src: './screenshots/procurement-sourcing-details.jpg',
        alt: 'Sourcing details with scores, timeline and requested nomenclatures',
        caption: 'Sourcing details: commercial and technical scores, timeline and requested items',
      },
      {
        src: './screenshots/procurement-sourcing-overview.jpg',
        alt: 'Sourcing award view, Nomenclatures tab, with line splitting',
        caption: 'Award stage, Nomenclatures tab: splitting a line between vendors',
      },
      {
        src: './screenshots/procurement-price-comparison.jpg',
        alt: 'Sourcing award view, Price comparison tab, with vendor offers',
        caption: 'Award stage, Price comparison tab: comparing vendor offers per split line',
      },
      {
        src: './screenshots/procurement-vendor-qualification.jpg',
        alt: 'Multi-step vendor qualification form with scoring',
        caption: 'Vendor qualification: multi-step evaluation form with a live score',
      },
    ],
  },
]

export const uiKit = {
  name: '@aslanzaden/ui-kit',
  description:
    'An open-source React + TypeScript component library, documented and developed in Storybook and published to npm. Ships ES and CommonJS builds, generated type definitions and a single stylesheet.',
  repo: 'https://github.com/aslanzaden/ui-kit',
  storybook: 'https://aslanzaden.github.io/ui-kit',
  npm: 'https://www.npmjs.com/package/@aslanzaden/ui-kit',
  install: 'npm install @aslanzaden/ui-kit',
  components: ['Button', 'IconButton', 'Icon', 'Badge', 'Input', 'Checkbox', 'Dropdown', 'DataTable', 'DataCounter', 'Modal', 'Stepper', 'Toaster'],
  stack: ['React 19', 'TypeScript', 'Storybook 10', 'Vite', 'Vitest', 'GitHub Actions'],
}

export const skills = [
  { group: 'Languages', items: ['JavaScript (ES6+)', 'TypeScript'] },
  { group: 'Frameworks', items: ['Vue.js', 'Nuxt.js', 'React'] },
  { group: 'State & data', items: ['TanStack Query', 'Pinia', 'Vuex', 'React Hooks', 'Axios', 'REST APIs'] },
  { group: 'UI & styling', items: ['CSS', 'SASS', 'Tailwind CSS', 'Storybook'] },
  { group: 'Maps & geospatial', items: ['Leaflet', 'Leaflet-Geoman', 'Turf.js', 'GeoJSON', 'geographiclib-geodesic'] },
  { group: 'Workflow', items: ['Git', 'Jira', 'Agile / Scrum'] },
]

export const education = [
  { school: 'Code Academy, Baku', degree: 'Diploma in Software Development', period: '2022 — 2023' },
  { school: 'Azerbaijan State University of Economics', degree: "Bachelor's in Finance", period: '2014 — 2018' },
]

export const languages = ['Azerbaijani — native', 'Russian — native', 'English — proficient']
