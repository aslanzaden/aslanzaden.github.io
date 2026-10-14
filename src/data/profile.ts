// All site content lives here — edit this file to update the portfolio.

export const profile = {
  name: 'Novrasta Aslanzade',
  role: 'Frontend Developer',
  location: 'Baku, Azerbaijan',
  email: 'novrasta.aslanzade@gmail.com',
  github: 'https://github.com/aslanzaden',
  linkedin: 'https://www.linkedin.com/in/novrasta-aslanzade',
  cv: './Novrasta_Aslanzade_CV.pdf',
  headline: 'Frontend Developer building scalable interfaces for business-critical systems.',
  tagline:
    '2+ years of experience delivering production-ready web applications with Vue.js, Nuxt.js, React and TypeScript, from enterprise dashboards and reusable UI component libraries to interactive map-based applications.',
  summary: [
    'At Prodata LLC I develop and maintain enterprise systems for procurement, insurance, purchase orders and fleet management, used by 500+ internal business users. My work spans frontend architecture for multiple business modules, REST API integration and server-state management with TanStack Query, and a shared Storybook component library used across 4 applications.',
    'I focus on maintainable architecture, reusable components, performance and clean user experience. I work in Agile teams on a 2-week sprint cadence, collaborating closely with backend developers and business stakeholders to turn business requirements into efficient, user-friendly solutions.',
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
  highlights: [
    'Developed and maintained 6+ enterprise web applications in Vue.js, Nuxt.js, React and TypeScript, serving 500+ internal users across procurement, insurance and fleet operations.',
    'Integrated REST APIs with Axios and TanStack Query; cut redundant network calls by 35% through query deduplication and cache invalidation strategies.',
    'Designed and maintained a shared Storybook component library of 40+ components, cutting new-feature development time by ~30% and removing visual inconsistencies across 4 business applications.',
    'Designed scalable frontend architecture for procurement, insurance, purchase order and fleet modules, supporting 10+ concurrent feature teams without major refactors.',
    'Shipped releases on a 2-week sprint cadence in close collaboration with backend developers and business stakeholders.',
  ],
  otherProjects: [
    {
      name: 'Insurance Management System',
      text: 'Turned a 12-step manual process into 5 guided steps, cutting average request-creation time by 45%.',
      screenshots: [] as Screenshot[],
    },
    {
      name: 'Purchase Order Management System',
      text: 'Dashboard with approval chains and real-time status tracking; order-approval turnaround went from 3 days to under 1 day.',
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
      'Live vehicle positions streamed from a WebSocket/STOMP feed handling thousands of sensor events per minute.',
      'Leaflet marker clustering and Turf.js geospatial calculations keep the map interactive at sub-second refresh, with no dropped frames on high-density routes.',
      'Route drawing and editing tools for dispatch operators built on Leaflet-Geoman, with geodesic distance calculations.',
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
      'Dynamic multi-step forms with conditional validation covering 15+ distinct request types across procurement categories.',
      'Server state managed with TanStack Query: cached lists, deduplicated requests and targeted invalidation after each workflow action.',
      'Built from the shared component library, so tables, steppers, badges and modals stay consistent with the rest of the product suite.',
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
