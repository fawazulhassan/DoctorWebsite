import { Link } from 'react-router-dom';
import SectionTitle from '../Shared/SectionTitle';
import { ASSET } from '../../utils/asset';

const defaultPosts = [
  { title: 'Understanding Depression: Signs & Treatment', category: 'Mental Health', date: 'Mar 1, 2024', excerpt: 'Learn to recognize signs of depression and the treatment options available.', image: 'blog-image-1.png', slug: 'understanding-depression' },
  { title: 'Child Vaccination Schedule in Pakistan', category: 'Child Care', date: 'Feb 28, 2024', excerpt: 'A complete guide to vaccination schedules for children in Pakistan.', image: 'blog-image-2.png', slug: 'child-vaccination-schedule' },
  { title: 'Managing Anxiety in Daily Life', category: 'Mental Health', date: 'Feb 25, 2024', excerpt: 'Practical tips for managing anxiety and stress in your daily routine.', image: 'blog-image-3.png', slug: 'managing-anxiety' },
];

export default function BlogSection({ posts = defaultPosts }) {
  return (
    <section className="py-8 md:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <SectionTitle title="Latest Update" subtitle="Our Blog" />
        <div className="mt-8 md:mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-6">
          {posts.map((post) => (
            <article key={post.title} className="bg-white border border-gray-100 rounded-xl md:rounded-lg shadow-md overflow-hidden">

              {/* Blog image */}
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

              {/* Blog content */}
              <div className="p-5 md:p-5">
                <p className="text-sm text-gray-500 md:text-xs">
                  {post.category} · {post.date}
                </p>
                <h3 className="mt-2 md:mt-2 font-bold text-gray-900 text-base md:text-base leading-snug">
                  {post.title}
                </h3>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed md:text-xs md:mt-2">
                  {post.excerpt}
                </p>
                <Link
                  to={post.slug ? `/blog/${post.slug}` : '/blog'}
                  className="inline-block mt-4 md:mt-4 text-primary font-medium text-sm md:text-sm hover:underline"
                >
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