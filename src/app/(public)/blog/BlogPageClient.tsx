'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, User, ArrowRight } from 'lucide-react'
import { format } from 'date-fns'

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string | null
  category: string
  author: string | null
  coverImage: string | null
  publishedAt: string | null
  createdAt: string
}

export default function BlogPageClient({ initialBlogs }: { initialBlogs: BlogPost[] }) {
  const [blogs] = useState<BlogPost[]>(initialBlogs)
  const [activeCategory, setActiveCategory] = useState('All')

  const categories = ['All', ...new Set(blogs.map((b) => b.category))]
  const filtered = activeCategory === 'All'
    ? blogs
    : blogs.filter((b) => b.category === activeCategory)

  return (
    <div className="min-h-screen bg-card">
      {/* Hero Section */}
      <section className="relative bg-brand-gradient pt-40 pb-20">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="mb-4 bg-[#f59e0b] text-white hover:bg-[#f59e0b] border-none">
            Resources
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Ideas & Insights for School Leaders
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Insights, tips, and best practices for modern school administration — from admissions to compliance.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="bg-card rounded-xl shadow-lg border p-4 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === cat
                  ? 'bg-[#026dde] text-white'
                  : 'bg-muted text-body hover:bg-muted'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Blog Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-lg text-subtle">No blog posts found.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((blog) => (
              <Link key={blog.id} href={`/blog/${blog.slug}`}>
                <Card className="overflow-hidden group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer h-full">
                  {blog.coverImage ? (
                    <div className="h-48 overflow-hidden">
                      <img
                        src={blog.coverImage}
                        alt={blog.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ) : (
                    <div className="h-48 bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                      <span className="text-6xl font-bold text-primary/20">B</span>
                    </div>
                  )}
                  <CardContent className="p-6 flex flex-col gap-3">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs font-medium">
                        {blog.category}
                      </Badge>
                    </div>
                    <h3 className="text-lg font-semibold text-heading group-hover:text-primary transition-colors line-clamp-2">
                      {blog.title}
                    </h3>
                    <p className="text-sm text-subtle line-clamp-2 flex-1">
                      {blog.excerpt || 'Read this article to learn more...'}
                    </p>
                    <div className="flex items-center justify-between pt-2 border-t border-border">
                      <div className="flex items-center gap-3 text-xs text-subtle">
                        {blog.author && (
                          <span className="flex items-center gap-1">
                            <User className="w-3 h-3" /> {blog.author}
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />{' '}
                          {format(new Date(blog.publishedAt || blog.createdAt), 'MMM d, yyyy')}
                        </span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}