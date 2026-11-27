import type {
  ServiceItem,
  ProjectItem,
  FinishingPackage,
  BlogPost,
} from '~/data/finishing'

export function mapServiceFromDb(row: any): ServiceItem {
  return {
    slug: row.slug,
    icon: row.icon || 'building',
    title: { ar: row.title_ar, en: row.title_en },
    shortDesc: { ar: row.short_desc_ar || '', en: row.short_desc_en || '' },
    fullDesc: { ar: row.full_desc_ar || '', en: row.full_desc_en || '' },
    image: row.image || '',
    duration: { ar: row.duration_ar || '', en: row.duration_en || '' },
    warranty: { ar: row.warranty_ar || '', en: row.warranty_en || '' },
    deliverables: {
      ar: Array.isArray(row.deliverables_ar) ? row.deliverables_ar : [],
      en: Array.isArray(row.deliverables_en) ? row.deliverables_en : [],
    },
  }
}

export function mapServiceToDb(item: ServiceItem, sortOrder = 0) {
  return {
    slug: item.slug,
    title_ar: item.title.ar,
    title_en: item.title.en,
    short_desc_ar: item.shortDesc.ar,
    short_desc_en: item.shortDesc.en,
    full_desc_ar: item.fullDesc.ar,
    full_desc_en: item.fullDesc.en,
    image: item.image,
    duration_ar: item.duration.ar,
    duration_en: item.duration.en,
    warranty_ar: item.warranty.ar,
    warranty_en: item.warranty.en,
    deliverables_ar: item.deliverables.ar,
    deliverables_en: item.deliverables.en,
    sort_order: sortOrder,
  }
}

export function mapProjectFromDb(row: any): ProjectItem {
  return {
    slug: row.slug,
    category: row.category || 'apartment',
    categoryLabel: { ar: row.category_label_ar || '', en: row.category_label_en || '' },
    title: { ar: row.title_ar, en: row.title_en },
    location: { ar: row.location_ar || '', en: row.location_en || '' },
    locationSlug: row.location_slug || 'new-cairo',
    area: Number(row.area) || 150,
    durationDays: Number(row.duration_days) || 60,
    packageName: { ar: row.package_name_ar || '', en: row.package_name_en || '' },
    style: { ar: row.style_ar || '', en: row.style_en || '' },
    coverImage: row.cover_image || '',
    beforeImage: row.before_image || '',
    afterImage: row.after_image || '',
    gallery: Array.isArray(row.gallery) ? row.gallery : [],
    summary: { ar: row.summary_ar || '', en: row.summary_en || '' },
    highlights: {
      ar: Array.isArray(row.highlights_ar) ? row.highlights_ar : [],
      en: Array.isArray(row.highlights_en) ? row.highlights_en : [],
    },
    coords: { x: Number(row.coords_x) || 50, y: Number(row.coords_y) || 50 },
  }
}

export function mapProjectToDb(item: ProjectItem) {
  return {
    slug: item.slug,
    category: item.category,
    category_label_ar: item.categoryLabel.ar,
    category_label_en: item.categoryLabel.en,
    title_ar: item.title.ar,
    title_en: item.title.en,
    location_ar: item.location.ar,
    location_en: item.location.en,
    location_slug: item.locationSlug,
    area: item.area,
    duration_days: item.durationDays,
    package_name_ar: item.packageName.ar,
    package_name_en: item.packageName.en,
    style_ar: item.style.ar,
    style_en: item.style.en,
    cover_image: item.coverImage,
    before_image: item.beforeImage,
    after_image: item.afterImage,
    gallery: item.gallery,
    summary_ar: item.summary.ar,
    summary_en: item.summary.en,
    highlights_ar: item.highlights.ar,
    highlights_en: item.highlights.en,
    coords_x: item.coords.x,
    coords_y: item.coords.y,
  }
}

export function mapTierFromDb(row: any): FinishingPackage {
  return {
    id: row.id,
    name: { ar: row.name_ar, en: row.name_en },
    badge: row.badge_ar || row.badge_en ? { ar: row.badge_ar || '', en: row.badge_en || '' } : undefined,
    percentage: Number(row.percentage) || 15,
    pricePerSqm: Number(row.price_per_sqm) || 8500,
    popular: Boolean(row.popular),
    desc: { ar: row.desc_ar || '', en: row.desc_en || '' },
    specs: {
      ar: Array.isArray(row.specs_ar) ? row.specs_ar : [],
      en: Array.isArray(row.specs_en) ? row.specs_en : [],
    },
  }
}

export function mapTierToDb(item: FinishingPackage, sortOrder = 0) {
  return {
    id: item.id,
    name_ar: item.name.ar,
    name_en: item.name.en,
    badge_ar: item.badge?.ar || '',
    badge_en: item.badge?.en || '',
    percentage: item.percentage,
    price_per_sqm: item.pricePerSqm,
    popular: Boolean(item.popular),
    desc_ar: item.desc.ar,
    desc_en: item.desc.en,
    specs_ar: item.specs.ar,
    specs_en: item.specs.en,
    sort_order: sortOrder,
  }
}

export function mapBlogFromDb(row: any): BlogPost {
  return {
    slug: row.slug,
    category: { ar: row.category_ar || '', en: row.category_en || '' },
    title: { ar: row.title_ar, en: row.title_en },
    excerpt: { ar: row.excerpt_ar || '', en: row.excerpt_en || '' },
    coverImage: row.cover_image || '',
    readTime: Number(row.read_time) || 5,
    date: row.published_date || '2026-11-24',
    author: { ar: row.author_ar || '', en: row.author_en || '' },
    sections: Array.isArray(row.sections) ? row.sections : [],
  }
}

export function mapBlogToDb(item: BlogPost) {
  return {
    slug: item.slug,
    category_ar: item.category.ar,
    category_en: item.category.en,
    title_ar: item.title.ar,
    title_en: item.title.en,
    excerpt_ar: item.excerpt.ar,
    excerpt_en: item.excerpt.en,
    cover_image: item.coverImage,
    read_time: item.readTime,
    published_date: item.date,
    author_ar: item.author.ar,
    author_en: item.author.en,
    sections: item.sections,
  }
}
