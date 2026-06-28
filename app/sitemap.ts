import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://project-block.com'
  const now = new Date()

  return [
    { url: base, lastModified: now, changeFrequency: 'daily', priority: 1.0 },
    { url: `${base}/docs`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/status`, lastModified: now, changeFrequency: 'daily', priority: 0.5 },
    { url: `${base}/privacy`, lastModified: now, changeFrequency: 'monthly', priority: 0.3 },
    { url: `${base}/terms`, lastModified: now, changeFrequency: 'monthly', priority: 0.3 },
  ]
}
