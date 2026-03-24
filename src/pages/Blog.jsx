import { useState } from 'react';
import { Link } from 'react-router-dom';
import SectionTitle from '../components/Shared/SectionTitle';
import { ASSET } from '../utils/asset';

const categories = ['All', 'Mental Health', 'Child Care', 'General Health'];

const posts = [
  { title: 'Understanding Depression: Signs & Treatment', category: 'Mental Health', date: 'Mar 1, 2024', excerpt: 'Learn to recognize signs of depression and the treatment options available.', slug: 'understanding-depression', image: 'blog-image-1.png' },
  { title: 'Child Vaccination Schedule in Pakistan', category: 'Child Care', date: 'Feb 28, 2024', excerpt: 'A complete guide to vaccination schedules for children in Pakistan.', slug: 'child-vaccination-schedule', image: 'blog-image-2.png' },
  { title: 'Managing Anxiety in Daily Life', category: 'Mental Health', date: 'Feb 25, 2024', excerpt: 'Practical tips for managing anxiety and stress in your daily routine.', slug: 'managing-anxiety', image: 'blog-image-3.png' },
  { title: 'Common Childhood Illnesses', category: 'Child Care', date: 'Feb 20, 2024', excerpt: 'Overview of common childhood illnesses and when to seek care.', slug: 'common-childhood-illnesses', image: 'blog-image-1.png' },
  { title: 'Sleep Hygiene for Better Mental Health', category: 'Mental Health', date: 'Feb 15, 2024', excerpt: 'How good sleep habits support mental wellness.', slug: 'sleep-hygiene', image: 'blog-image-2.png' },
  { title: 'Nutrition Tips for Growing Children', category: 'Child Care', date: 'Feb 10, 2024', excerpt: 'Dietary guidance for healthy child development.', slug: 'nutrition-tips-children', image: 'blog-image-3.png' },
];

export default function Blog() {
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = posts.filter((p) => {
    const matchCategory = category === 'All' || p.category === category;
    const matchSearch = !search || p.title.toLowerCase().includes(search.toLowerCase()) || p.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <section className="py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <SectionTitle title="Health Blog" subtitle="Mental Health, Child Care, General Health" />

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${category === cat ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                {cat}
              </button>
            ))}
          </div>
          <input
            type="search"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent w-full sm:w-64"
          />
        </div>

        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((post) => (
            <article key={post.slug} className="bg-white border border-gray-100 rounded-lg shadow-md overflow-hidden">
              <div className="aspect-video bg-gray-200">
                <img
                  src={ASSET(post.image)}
                  alt=""
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://placehold.co/400x225/E6F0FF/333?text=Blog';
                  }}
                />
              </div>
              <div className="p-5">
                <p className="text-sm text-gray-500">{post.category} · {post.date}</p>
                <h3 className="mt-2 font-bold text-gray-900">{post.title}</h3>
                <p className="mt-2 text-sm text-gray-600">{post.excerpt}</p>
                <Link to={`/blog/${post.slug}`} className="inline-block mt-4 text-primary font-medium text-sm hover:underline">
                  Read More
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
