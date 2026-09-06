export type NovelType = 'long' | 'short'
export type NovelStatus = 'Available' | 'Coming soon'
export type CoverTheme = 'moon' | 'garden' | 'rain' | 'lavender' | 'starlight' | 'rose'

export type Novel = {
  id: string
  title: string
  subtitle: string
  type: NovelType
  chapterCount: number
  genres: string[]
  tags: string[]
  description: string
  status: NovelStatus
  featured: boolean
  coverTheme: CoverTheme
  accent: string
  vnUrl?: string
  progress?: number
}

export const novels: Novel[] = [
  {
    id: 'moonlit-garden',
    title: 'Moonlit Garden',
    subtitle: 'Where night flowers remember',
    type: 'long',
    chapterCount: 12,
    genres: ['Fantasy', 'Romance'],
    tags: ['Slow Burn', 'Friends to Lovers'],
    description: 'A reserved botanist and a starlit stranger find a secret garden that blooms only for two.',
    status: 'Coming soon',
    featured: true,
    coverTheme: 'moon',
    accent: '#7889dc',
  },
  {
    id: 'blue-hour',
    title: 'Blue Hour',
    subtitle: 'A promise in the in-between',
    type: 'long',
    chapterCount: 12,
    genres: ['Drama', 'Romance'],
    tags: ['Second Chance', 'Childhood Friends'],
    description: 'Two childhood friends meet again at the edge of a city that never quite sleeps.',
    status: 'Coming soon',
    featured: true,
    coverTheme: 'rain',
    accent: '#73a6d8',
  },
  {
    id: 'summer-rain',
    title: 'Summer Rain',
    subtitle: 'Every storm leaves a little light',
    type: 'short',
    chapterCount: 8,
    genres: ['Romance', 'Drama'],
    tags: ['Enemies to Lovers', 'Slow Burn'],
    description: 'An unexpected summer downpour turns an old rivalry into something much softer.',
    status: 'Coming soon',
    featured: true,
    coverTheme: 'garden',
    accent: '#e59aaf',
  },
  {
    id: 'the-quiet-star',
    title: 'The Quiet Star',
    subtitle: 'A constellation meant for two',
    type: 'short',
    chapterCount: 8,
    genres: ['Fantasy', 'Supernatural'],
    tags: ['Found Family', 'Mystery'],
    description: 'A quiet astronomer follows a falling star and meets the boy who fell with it.',
    status: 'Coming soon',
    featured: false,
    coverTheme: 'starlight',
    accent: '#9888cf',
  },
  {
    id: 'violet-afterglow',
    title: 'Violet Afterglow',
    subtitle: 'The last train home',
    type: 'long',
    chapterCount: 12,
    genres: ['Drama', 'Historical'],
    tags: ['Second Chance', 'Mature Themes'],
    description: 'Letters, old train stations, and a love story that refuses to be left in the past.',
    status: 'Coming soon',
    featured: false,
    coverTheme: 'lavender',
    accent: '#a58bd0',
  },
  {
    id: 'petals-in-spring',
    title: 'Petals in Spring',
    subtitle: 'A small story with a warm heart',
    type: 'short',
    chapterCount: 8,
    genres: ['Romance', 'Comedy'],
    tags: ['Fake Dating', 'Friends to Lovers'],
    description: 'A pretend date at the spring festival becomes a little too convincing.',
    status: 'Coming soon',
    featured: false,
    coverTheme: 'rose',
    accent: '#e39bb8',
  },
]

export const allGenres = Array.from(new Set(novels.flatMap((novel) => novel.genres))).sort()