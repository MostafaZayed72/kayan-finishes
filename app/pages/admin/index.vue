<template>
  <div class="min-h-screen bg-slate-50 dark:bg-brand-black text-slate-900 dark:text-slate-100">
    <!-- Login Gate -->
    <div v-if="!authenticated" class="min-h-screen flex items-center justify-center p-4">
      <div class="w-full max-w-md premium-card space-y-6">
        <div class="text-center space-y-2">
          <KayanLogo size="md" class="mx-auto" />
          <h1 class="text-2xl font-black mt-2">
            {{ locale === 'ar' ? 'لوحة تحكم كيان' : 'Kayan Admin Dashboard' }}
          </h1>
          <p class="text-xs text-slate-500 dark:text-slate-400">
            {{ locale === 'ar' ? 'إدارة الخدمات، المشاريع، نسب الإشراف، المدونة، وطلبات المعاينة' : 'Manage services, projects, supervision tiers, blog & leads' }}
          </p>
        </div>

        <form @submit.prevent="login" class="space-y-4">
          <div>
            <label class="block text-xs font-bold mb-1.5">{{ locale === 'ar' ? 'اسم المستخدم' : 'Username' }}</label>
            <input
              v-model="loginForm.email"
              type="text"
              required
              dir="ltr"
              class="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10 focus:border-brand-orange focus:outline-none text-sm"
            />
          </div>
          <div>
            <label class="block text-xs font-bold mb-1.5">{{ locale === 'ar' ? 'كلمة المرور' : 'Password' }}</label>
            <input
              v-model="loginForm.password"
              type="password"
              required
              dir="ltr"
              class="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10 focus:border-brand-orange focus:outline-none text-sm"
            />
          </div>
          <p v-if="loginError" class="text-xs text-red-500 font-bold">{{ loginError }}</p>
          <button type="submit" :disabled="loggingIn" class="btn-primary w-full justify-center">
            {{ loggingIn ? '...' : (locale === 'ar' ? 'دخول للوحة التحكم' : 'Sign In') }}
          </button>
        </form>
      </div>
    </div>

    <!-- Authenticated Dashboard -->
    <div v-else class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Top Bar -->
      <div class="flex flex-wrap items-center justify-between gap-4 pb-6 mb-6 border-b border-slate-200 dark:border-white/10">
        <div class="flex items-center gap-4">
          <KayanLogo size="sm" />
          <div>
            <h1 class="text-xl font-black">{{ locale === 'ar' ? 'لوحة التحكم الرئيسية' : 'Kayan Admin Panel' }}</h1>
            <div class="flex flex-wrap items-center gap-2 mt-1 text-[11px] font-bold">
              <span
                class="px-2.5 py-0.5 rounded-full"
                :class="status.supabaseConfigured ? 'bg-emerald-500/15 text-emerald-500' : 'bg-amber-500/15 text-amber-500'"
              >
                Supabase: {{ status.supabaseConfigured ? (locale === 'ar' ? 'متصل' : 'Connected') : (locale === 'ar' ? 'غير مضبوط في .env' : 'Not configured') }}
              </span>
              <span
                class="px-2.5 py-0.5 rounded-full"
                :class="status.cloudinaryConfigured ? 'bg-emerald-500/15 text-emerald-500' : 'bg-amber-500/15 text-amber-500'"
              >
                Cloudinary: {{ status.cloudinaryConfigured ? (locale === 'ar' ? 'متصل' : 'Connected') : (locale === 'ar' ? 'غير مضبوط في .env' : 'Not configured') }}
              </span>
            </div>
          </div>
        </div>

        <div class="flex flex-wrap items-center gap-2">
          <button
            v-if="status.supabaseConfigured"
            type="button"
            @click="seedDatabase"
            :disabled="seeding"
            class="px-4 py-2 rounded-full text-xs font-bold bg-brand-orange/15 text-brand-orange border border-brand-orange/30 hover:bg-brand-orange hover:text-white transition-colors"
          >
            {{ seeding ? '...' : (locale === 'ar' ? 'استيراد البيانات الافتراضية' : 'Seed Default Data') }}
          </button>

          <NuxtLink :to="localePath('/')" class="px-4 py-2 rounded-full text-xs font-bold border border-slate-300 dark:border-white/15 hover:border-brand-orange">
            {{ locale === 'ar' ? 'عرض الموقع' : 'View Site' }}
          </NuxtLink>

          <button type="button" @click="logout" class="px-4 py-2 rounded-full text-xs font-bold bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-colors">
            {{ locale === 'ar' ? 'خروج' : 'Logout' }}
          </button>
        </div>
      </div>

      <!-- Toast Message -->
      <div
        v-if="toast"
        class="mb-6 px-4 py-3 rounded-2xl text-sm font-bold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 flex items-center justify-between"
      >
        <span>{{ toast }}</span>
        <button type="button" @click="toast = ''" class="text-xs opacity-70 hover:opacity-100">✕</button>
      </div>

      <!-- KPI Summary -->
      <div class="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        <div class="premium-card !p-4">
          <div class="text-xs text-slate-500">{{ locale === 'ar' ? 'طلبات المعاينة' : 'Leads' }}</div>
          <div class="text-2xl font-black text-brand-orange mt-1">{{ leads.length }}</div>
        </div>
        <div class="premium-card !p-4">
          <div class="text-xs text-slate-500">{{ $t('nav.services') }}</div>
          <div class="text-2xl font-black mt-1">{{ services.length }}</div>
        </div>
        <div class="premium-card !p-4">
          <div class="text-xs text-slate-500">{{ $t('nav.projects') }}</div>
          <div class="text-2xl font-black mt-1">{{ projects.length }}</div>
        </div>
        <div class="premium-card !p-4">
          <div class="text-xs text-slate-500">{{ locale === 'ar' ? 'أنظمة الإشراف' : 'Supervision' }}</div>
          <div class="text-2xl font-black mt-1">{{ supervisionTiers.length }}</div>
        </div>
        <div class="premium-card !p-4">
          <div class="text-xs text-slate-500">{{ $t('nav.blog') }}</div>
          <div class="text-2xl font-black mt-1">{{ blogPosts.length }}</div>
        </div>
      </div>

      <!-- Tabs -->
      <div class="flex flex-wrap gap-2 mb-6">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          type="button"
          @click="activeTab = tab.id"
          class="px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all"
          :class="activeTab === tab.id ? 'bg-brand-orange text-white shadow-md shadow-orange-600/20' : 'bg-white dark:bg-brand-charcoal border border-slate-200 dark:border-white/10 hover:border-brand-orange'"
        >
          {{ tab.label[locale] }}
        </button>
      </div>

      <!-- TAB 1: LEADS -->
      <div v-if="activeTab === 'leads'" class="premium-card overflow-x-auto">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-lg font-black">{{ locale === 'ar' ? 'طلبات المعاينة والتواصل' : 'Inspection & Contact Leads' }}</h2>
          <button type="button" @click="loadLeads" class="text-xs font-bold text-brand-orange">
            {{ locale === 'ar' ? 'تحديث' : 'Refresh' }}
          </button>
        </div>

        <table v-if="leads.length" class="w-full text-sm text-start">
          <thead>
            <tr class="border-b border-slate-200 dark:border-white/10 text-xs text-slate-500">
              <th class="py-3 px-2 text-start">{{ locale === 'ar' ? 'الاسم' : 'Name' }}</th>
              <th class="py-3 px-2 text-start">{{ locale === 'ar' ? 'الهاتف' : 'Phone' }}</th>
              <th class="py-3 px-2 text-start">{{ locale === 'ar' ? 'المنطقة' : 'Location' }}</th>
              <th class="py-3 px-2 text-start">{{ locale === 'ar' ? 'ملاحظات' : 'Notes' }}</th>
              <th class="py-3 px-2 text-start">{{ locale === 'ar' ? 'الحالة' : 'Status' }}</th>
              <th class="py-3 px-2 text-end"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="lead in leads" :key="lead.id" class="border-b border-slate-100 dark:border-white/5">
              <td class="py-3 px-2 font-bold">{{ lead.name }}</td>
              <td class="py-3 px-2" dir="ltr">{{ lead.phone }}</td>
              <td class="py-3 px-2">{{ lead.location || '—' }}</td>
              <td class="py-3 px-2 max-w-xs truncate text-xs text-slate-500">{{ lead.notes || '—' }}</td>
              <td class="py-3 px-2">
                <select
                  :value="lead.status"
                  @change="updateLeadStatus(lead.id, ($event.target as HTMLSelectElement).value)"
                  class="px-2.5 py-1 rounded-lg text-xs font-bold bg-slate-100 dark:bg-black/40 border border-slate-200 dark:border-white/10"
                >
                  <option value="new">{{ locale === 'ar' ? 'جديد' : 'New' }}</option>
                  <option value="contacted">{{ locale === 'ar' ? 'تم التواصل' : 'Contacted' }}</option>
                  <option value="scheduled">{{ locale === 'ar' ? 'معاينة مجدولة' : 'Scheduled' }}</option>
                  <option value="closed">{{ locale === 'ar' ? 'تم التعاقد' : 'Closed' }}</option>
                </select>
              </td>
              <td class="py-3 px-2 text-end">
                <button type="button" @click="deleteItem('leads', lead.id)" class="text-xs text-red-500 font-bold hover:underline">
                  {{ locale === 'ar' ? 'حذف' : 'Delete' }}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <p v-else class="text-sm text-slate-500 py-8 text-center">
          {{ status.supabaseConfigured ? (locale === 'ar' ? 'لا توجد طلبات مسجلة حتى الآن.' : 'No leads recorded yet.') : (locale === 'ar' ? 'قم بضبط متغيرات Supabase في ملف .env لعرض الطلبات وحفظها.' : 'Configure Supabase in .env to store and view leads.') }}
        </p>
      </div>

      <!-- TAB 2: SERVICES -->
      <div v-if="activeTab === 'services'" class="space-y-4">
        <div class="flex justify-between items-center">
          <h2 class="text-lg font-black">{{ $t('nav.services') }}</h2>
          <button type="button" @click="openServiceForm()" class="btn-primary !py-2 !px-5 text-xs">
            + {{ locale === 'ar' ? 'إضافة خدمة' : 'Add Service' }}
          </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div v-for="srv in services" :key="srv.slug" class="premium-card !p-4 flex gap-4 items-center">
            <img :src="srv.image" class="w-20 h-20 rounded-2xl object-cover shrink-0" />
            <div class="flex-grow min-w-0">
              <div class="font-extrabold truncate">{{ srv.title[locale] }}</div>
              <div class="text-xs text-slate-500 truncate">{{ srv.duration[locale] }} • {{ srv.warranty[locale] }}</div>
              <div class="flex gap-3 mt-2 text-xs font-bold">
                <button type="button" @click="openServiceForm(srv)" class="text-brand-orange">{{ locale === 'ar' ? 'تعديل' : 'Edit' }}</button>
                <button type="button" @click="deleteItem('services', srv.slug)" class="text-red-500">{{ locale === 'ar' ? 'حذف' : 'Delete' }}</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- TAB 3: PROJECTS -->
      <div v-if="activeTab === 'projects'" class="space-y-4">
        <div class="flex justify-between items-center">
          <h2 class="text-lg font-black">{{ $t('nav.projects') }}</h2>
          <button type="button" @click="openProjectForm()" class="btn-primary !py-2 !px-5 text-xs">
            + {{ locale === 'ar' ? 'إضافة مشروع' : 'Add Project' }}
          </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div v-for="proj in projects" :key="proj.slug" class="premium-card !p-4 flex gap-4 items-center">
            <img :src="proj.coverImage" class="w-20 h-20 rounded-2xl object-cover shrink-0" />
            <div class="flex-grow min-w-0">
              <div class="font-extrabold truncate">{{ proj.title[locale] }}</div>
              <div class="text-xs text-slate-500 truncate">{{ proj.area }} {{ $t('common.sqm') }} • {{ proj.durationDays }} {{ $t('common.days') }}</div>
              <div class="flex gap-3 mt-2 text-xs font-bold">
                <button type="button" @click="openProjectForm(proj)" class="text-brand-orange">{{ locale === 'ar' ? 'تعديل' : 'Edit' }}</button>
                <button type="button" @click="deleteItem('projects', proj.slug)" class="text-red-500">{{ locale === 'ar' ? 'حذف' : 'Delete' }}</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- TAB 4: SUPERVISION TIERS / CALCULATOR -->
      <div v-if="activeTab === 'calculator'" class="space-y-4">
        <div class="flex justify-between items-center">
          <h2 class="text-lg font-black">{{ locale === 'ar' ? 'أنظمة الإشراف وإعدادات حاسبة التكلفة' : 'Supervision Tiers & Calculator Settings' }}</h2>
          <button type="button" @click="openTierForm()" class="btn-primary !py-2 !px-5 text-xs">
            + {{ locale === 'ar' ? 'إضافة نظام إشراف' : 'Add Tier' }}
          </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div v-for="tier in supervisionTiers" :key="tier.id" class="premium-card !p-5 space-y-3">
            <div class="flex items-center justify-between">
              <span class="font-black text-base">{{ tier.name[locale] }}</span>
              <span class="text-xl font-black text-brand-orange">{{ tier.percentage }}%</span>
            </div>
            <div class="text-xs text-slate-500">
              {{ locale === 'ar' ? 'متوسط تقدير المتر للحاسبة:' : 'Est. Cost/m²:' }} <strong>{{ tier.pricePerSqm.toLocaleString() }} {{ $t('common.egp') }}</strong>
            </div>
            <div class="flex gap-3 pt-2 text-xs font-bold border-t border-slate-200 dark:border-white/10">
              <button type="button" @click="openTierForm(tier)" class="text-brand-orange">{{ locale === 'ar' ? 'تعديل' : 'Edit' }}</button>
              <button type="button" @click="deleteItem('supervision_tiers', tier.id)" class="text-red-500">{{ locale === 'ar' ? 'حذف' : 'Delete' }}</button>
            </div>
          </div>
        </div>
      </div>

      <!-- TAB 5: BLOG -->
      <div v-if="activeTab === 'blog'" class="space-y-4">
        <div class="flex justify-between items-center">
          <h2 class="text-lg font-black">{{ $t('nav.blog') }}</h2>
          <button type="button" @click="openBlogForm()" class="btn-primary !py-2 !px-5 text-xs">
            + {{ locale === 'ar' ? 'إضافة مقال' : 'Add Article' }}
          </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div v-for="post in blogPosts" :key="post.slug" class="premium-card !p-4 flex gap-4 items-center">
            <img :src="post.coverImage" class="w-20 h-20 rounded-2xl object-cover shrink-0" />
            <div class="flex-grow min-w-0">
              <div class="font-extrabold truncate">{{ post.title[locale] }}</div>
              <div class="text-xs text-slate-500 truncate">{{ post.category[locale] }} • {{ post.date }}</div>
              <div class="flex gap-3 mt-2 text-xs font-bold">
                <button type="button" @click="openBlogForm(post)" class="text-brand-orange">{{ locale === 'ar' ? 'تعديل' : 'Edit' }}</button>
                <button type="button" @click="deleteItem('blog_posts', post.slug)" class="text-red-500">{{ locale === 'ar' ? 'حذف' : 'Delete' }}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- EDIT / ADD MODAL -->
    <Teleport to="body">
      <div v-if="editorType" class="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4" @click.self="editorType = null">
        <div class="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white dark:bg-brand-charcoal border border-slate-200 dark:border-white/10 p-6 md:p-8 space-y-5">
          <div class="flex items-center justify-between">
            <h3 class="text-xl font-black">
              {{ editorType === 'services' ? (locale === 'ar' ? 'بيانات الخدمة' : 'Service Details') : '' }}
              {{ editorType === 'projects' ? (locale === 'ar' ? 'بيانات المشروع' : 'Project Details') : '' }}
              {{ editorType === 'supervision_tiers' ? (locale === 'ar' ? 'بيانات نظام الإشراف والحاسبة' : 'Supervision Tier Details') : '' }}
              {{ editorType === 'blog_posts' ? (locale === 'ar' ? 'بيانات المقال' : 'Article Details') : '' }}
            </h3>
            <button type="button" @click="editorType = null" class="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/10">✕</button>
          </div>

          <!-- SERVICE FORM -->
          <form v-if="editorType === 'services'" @submit.prevent="saveEntity('services', draft)" class="space-y-4">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input v-model="draft.slug" required placeholder="Slug (e.g. villas-finishing)" dir="ltr" class="input-field" />
              <input v-model="draft.duration.ar" placeholder="المدة (مثال: 60 - 90 يوم)" class="input-field" />
              <input v-model="draft.title.ar" required placeholder="اسم الخدمة (عربي)" class="input-field" />
              <input v-model="draft.title.en" required placeholder="Service Title (EN)" dir="ltr" class="input-field" />
            </div>
            <AdminImageUploader v-model="draft.image" :label="locale === 'ar' ? 'صورة الخدمة (Cloudinary)' : 'Service Image (Cloudinary)'" />
            <textarea v-model="draft.shortDesc.ar" rows="2" placeholder="وصف مختصر (عربي)" class="input-field" />
            <textarea v-model="draft.shortDesc.en" rows="2" placeholder="Short Description (EN)" dir="ltr" class="input-field" />
            <textarea v-model="draft.fullDesc.ar" rows="3" placeholder="الوصف التفصيلي (عربي)" class="input-field" />
            <button type="submit" :disabled="saving" class="btn-primary w-full justify-center">{{ saving ? '...' : (locale === 'ar' ? 'حفظ الخدمة' : 'Save Service') }}</button>
          </form>

          <!-- PROJECT FORM -->
          <form v-if="editorType === 'projects'" @submit.prevent="saveEntity('projects', draft)" class="space-y-4">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input v-model="draft.slug" required placeholder="Slug (e.g. mivida-villa)" dir="ltr" class="input-field" />
              <select v-model="draft.category" class="input-field">
                <option value="apartment">شقة / دوبلكس</option>
                <option value="villa">فيلا / شاليه</option>
                <option value="commercial">تجاري / إداري</option>
              </select>
              <input v-model="draft.title.ar" required placeholder="عنوان المشروع (عربي)" class="input-field" />
              <input v-model="draft.title.en" required placeholder="Project Title (EN)" dir="ltr" class="input-field" />
              <input v-model="draft.location.ar" placeholder="الموقع (عربي)" class="input-field" />
              <input v-model="draft.location.en" placeholder="Location (EN)" dir="ltr" class="input-field" />
              <input v-model.number="draft.area" type="number" placeholder="المساحة م²" class="input-field" />
              <input v-model.number="draft.durationDays" type="number" placeholder="مدة التنفيذ بالأيام" class="input-field" />
            </div>
            <AdminImageUploader v-model="draft.coverImage" :label="locale === 'ar' ? 'صورة الغلاف (Cloudinary)' : 'Cover Image'" />
            <AdminImageUploader v-model="draft.beforeImage" :label="locale === 'ar' ? 'صورة قبل التشطيب (Cloudinary)' : 'Before Image'" />
            <AdminImageUploader v-model="draft.afterImage" :label="locale === 'ar' ? 'صورة بعد التشطيب (Cloudinary)' : 'After Image'" />
            <textarea v-model="draft.summary.ar" rows="2" placeholder="ملخص المشروع (عربي)" class="input-field" />
            <button type="submit" :disabled="saving" class="btn-primary w-full justify-center">{{ saving ? '...' : (locale === 'ar' ? 'حفظ المشروع' : 'Save Project') }}</button>
          </form>

          <!-- SUPERVISION TIER FORM -->
          <form v-if="editorType === 'supervision_tiers'" @submit.prevent="saveEntity('supervision_tiers', draft)" class="space-y-4">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input v-model="draft.id" required placeholder="ID (e.g. full-supervision)" dir="ltr" class="input-field" />
              <input v-model.number="draft.percentage" type="number" step="0.5" required placeholder="نسبة الإشراف %" class="input-field" />
              <input v-model="draft.name.ar" required placeholder="اسم النظام (عربي)" class="input-field" />
              <input v-model="draft.name.en" required placeholder="Tier Name (EN)" dir="ltr" class="input-field" />
              <input v-model.number="draft.pricePerSqm" type="number" required placeholder="متوسط تكلفة المتر في الحاسبة" class="input-field" />
              <label class="flex items-center gap-2 text-sm font-bold px-2">
                <input v-model="draft.popular" type="checkbox" class="accent-[#E8631A]" />
                <span>{{ locale === 'ar' ? 'تمييز كـ الأكثر طلباً' : 'Mark as Most Popular' }}</span>
              </label>
            </div>
            <textarea v-model="draft.desc.ar" rows="2" placeholder="الوصف (عربي)" class="input-field" />
            <textarea v-model="draft.desc.en" rows="2" placeholder="Description (EN)" dir="ltr" class="input-field" />
            <button type="submit" :disabled="saving" class="btn-primary w-full justify-center">{{ saving ? '...' : (locale === 'ar' ? 'حفظ النظام' : 'Save Tier') }}</button>
          </form>

          <!-- BLOG FORM -->
          <form v-if="editorType === 'blog_posts'" @submit.prevent="saveEntity('blog_posts', draft)" class="space-y-4">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input v-model="draft.slug" required placeholder="Slug (e.g. finishing-cost-2026)" dir="ltr" class="input-field" />
              <input v-model="draft.date" type="date" class="input-field" />
              <input v-model="draft.title.ar" required placeholder="عنوان المقال (عربي)" class="input-field" />
              <input v-model="draft.title.en" required placeholder="Article Title (EN)" dir="ltr" class="input-field" />
              <input v-model="draft.category.ar" placeholder="التصنيف (عربي)" class="input-field" />
              <input v-model.number="draft.readTime" type="number" placeholder="دقائق القراءة" class="input-field" />
            </div>
            <AdminImageUploader v-model="draft.coverImage" :label="locale === 'ar' ? 'صورة المقال (Cloudinary)' : 'Cover Image'" />
            <textarea v-model="draft.excerpt.ar" rows="2" placeholder="ملخص المقال (عربي)" class="input-field" />
            <textarea v-model="draft.excerpt.en" rows="2" placeholder="Excerpt (EN)" dir="ltr" class="input-field" />
            <button type="submit" :disabled="saving" class="btn-primary w-full justify-center">{{ saving ? '...' : (locale === 'ar' ? 'حفظ المقال' : 'Save Article') }}</button>
          </form>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: false })

const { locale } = useI18n()
const localePath = useLocalePath()
const { services, projects, supervisionTiers, blogPosts, refresh } = useKayanData()

const authenticated = ref(false)
const loggingIn = ref(false)
const loginError = ref('')
const loginForm = reactive({ email: '', password: '' })

const status = reactive({
  supabaseConfigured: false,
  cloudinaryConfigured: false,
})

const activeTab = ref<'leads' | 'services' | 'projects' | 'calculator' | 'blog'>('leads')
const tabs = [
  { id: 'leads' as const, label: { ar: 'طلبات المعاينة', en: 'Leads' } },
  { id: 'services' as const, label: { ar: 'خدماتنا', en: 'Services' } },
  { id: 'projects' as const, label: { ar: 'المشاريع', en: 'Projects' } },
  { id: 'calculator' as const, label: { ar: 'الحاسبة ونسب الإشراف', en: 'Calculator & Tiers' } },
  { id: 'blog' as const, label: { ar: 'المدونة', en: 'Blog' } },
]

const leads = ref<any[]>([])
const toast = ref('')
const seeding = ref(false)
const saving = ref(false)
const editorType = ref<string | null>(null)
const draft = ref<any>({})

const checkAuth = async () => {
  const res = await $fetch<any>('/api/admin/auth', {
    method: 'POST',
    body: { action: 'check' },
  })
  authenticated.value = res.authenticated
  status.supabaseConfigured = res.supabaseConfigured
  status.cloudinaryConfigured = res.cloudinaryConfigured
  if (authenticated.value && status.supabaseConfigured) {
    loadLeads()
  }
}

const login = async () => {
  loggingIn.value = true
  loginError.value = ''
  try {
    const res = await $fetch<any>('/api/admin/auth', {
      method: 'POST',
      body: loginForm,
    })
    authenticated.value = res.authenticated
    status.supabaseConfigured = res.supabaseConfigured
    status.cloudinaryConfigured = res.cloudinaryConfigured
    if (status.supabaseConfigured) loadLeads()
  } catch {
    loginError.value = locale.value === 'ar' ? 'بيانات الدخول غير صحيحة' : 'Invalid credentials'
  } finally {
    loggingIn.value = false
  }
}

const logout = async () => {
  await $fetch('/api/admin/auth', { method: 'POST', body: { action: 'logout' } })
  authenticated.value = false
}

const loadLeads = async () => {
  if (!status.supabaseConfigured) return
  try {
    const res = await $fetch<{ data: any[] }>('/api/admin/crud', {
      method: 'POST',
      body: { entity: 'leads', action: 'list' },
    })
    leads.value = res.data || []
  } catch {
    leads.value = []
  }
}

const seedDatabase = async () => {
  seeding.value = true
  try {
    await $fetch('/api/admin/seed', { method: 'POST' })
    await refresh()
    toast.value = locale.value === 'ar' ? 'تم استيراد جميع البيانات الافتراضية إلى Supabase بنجاح!' : 'Default data seeded to Supabase!'
  } catch (err: any) {
    toast.value = err?.data?.statusMessage || 'Seed failed'
  } finally {
    seeding.value = false
  }
}

const updateLeadStatus = async (id: string, newStatus: string) => {
  await $fetch('/api/admin/crud', {
    method: 'POST',
    body: { entity: 'leads', action: 'update_status', id, payload: { status: newStatus } },
  })
  toast.value = locale.value === 'ar' ? 'تم تحديث حالة الطلب' : 'Status updated'
}

const deleteItem = async (entity: string, id: string) => {
  if (!status.supabaseConfigured) {
    toast.value = locale.value === 'ar' ? 'يرجى ربط Supabase أولاً في ملف .env' : 'Please configure Supabase in .env first'
    return
  }
  await $fetch('/api/admin/crud', {
    method: 'POST',
    body: { entity, action: 'delete', id },
  })
  if (entity === 'leads') await loadLeads()
  else await refresh()
  toast.value = locale.value === 'ar' ? 'تم الحذف بنجاح' : 'Deleted successfully'
}

const saveEntity = async (entity: string, payload: any) => {
  if (!status.supabaseConfigured) {
    toast.value = locale.value === 'ar' ? 'يرجى ربط Supabase أولاً في ملف .env' : 'Please configure Supabase in .env first'
    return
  }
  saving.value = true
  try {
    await $fetch('/api/admin/crud', {
      method: 'POST',
      body: { entity, action: 'upsert', payload },
    })
    await refresh()
    editorType.value = null
    toast.value = locale.value === 'ar' ? 'تم الحفظ بنجاح!' : 'Saved successfully!'
  } catch (err: any) {
    toast.value = err?.data?.statusMessage || err?.message || 'Save failed'
    editorType.value = null
  } finally {
    saving.value = false
  }
}

const openServiceForm = (item?: any) => {
  draft.value = item
    ? JSON.parse(JSON.stringify(item))
    : {
        slug: '',
        icon: 'building',
        title: { ar: '', en: '' },
        shortDesc: { ar: '', en: '' },
        fullDesc: { ar: '', en: '' },
        image: '',
        duration: { ar: '60 - 90 يوم', en: '60 - 90 Days' },
        warranty: { ar: 'ضمان 10 سنوات', en: '10-Year Warranty' },
        deliverables: { ar: [], en: [] },
      }
  editorType.value = 'services'
}

const openProjectForm = (item?: any) => {
  draft.value = item
    ? JSON.parse(JSON.stringify(item))
    : {
        slug: '',
        category: 'apartment',
        categoryLabel: { ar: 'شقة سكنية', en: 'Apartment' },
        title: { ar: '', en: '' },
        location: { ar: 'التجمع الخامس', en: 'New Cairo' },
        locationSlug: 'new-cairo',
        area: 180,
        durationDays: 75,
        packageName: { ar: 'الإشراف الكامل 15%', en: 'Full Supervision 15%' },
        style: { ar: 'مودرن', en: 'Modern' },
        coverImage: '',
        beforeImage: '',
        afterImage: '',
        gallery: [],
        summary: { ar: '', en: '' },
        highlights: { ar: [], en: [] },
        coords: { x: 50, y: 50 },
      }
  editorType.value = 'projects'
}

const openTierForm = (item?: any) => {
  draft.value = item
    ? JSON.parse(JSON.stringify(item))
    : {
        id: '',
        name: { ar: '', en: '' },
        badge: { ar: '', en: '' },
        percentage: 15,
        pricePerSqm: 8500,
        popular: false,
        desc: { ar: '', en: '' },
        specs: { ar: [], en: [] },
      }
  editorType.value = 'supervision_tiers'
}

const openBlogForm = (item?: any) => {
  draft.value = item
    ? JSON.parse(JSON.stringify(item))
    : {
        slug: '',
        category: { ar: 'نصائح التشطيب', en: 'Finishing Tips' },
        title: { ar: '', en: '' },
        excerpt: { ar: '', en: '' },
        coverImage: '',
        readTime: 5,
        date: new Date().toISOString().slice(0, 10),
        author: { ar: 'فريق كيان الهندسي', en: 'Kayan Engineering Team' },
        sections: [],
      }
  editorType.value = 'blog_posts'
}

onMounted(checkAuth)
</script>

<style scoped>
.input-field {
  @apply w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10 focus:border-brand-orange focus:outline-none text-sm;
}
</style>
