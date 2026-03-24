import { useParams, Link } from 'react-router-dom';

const posts = {
  'understanding-depression': { title: 'Understanding Depression: Signs & Treatment', category: 'Mental Health', author: 'Dr. Rizwan Shafiq', date: 'Mar 1, 2024', content: 'Depression is a common mental health condition. Signs include persistent sadness, loss of interest, changes in sleep or appetite, and fatigue. Treatment may include therapy, medication, or both. Early recognition and professional care lead to better outcomes.' },
  'child-vaccination-schedule': { title: 'Child Vaccination Schedule in Pakistan', category: 'Child Care', author: 'Dr. Faiza Malik Jabeen', date: 'Feb 28, 2024', content: 'Following the recommended vaccination schedule protects children from serious diseases. Key vaccines include BCG, polio, DTP, measles, and hepatitis. Consult your pediatrician for the complete schedule and any catch-up vaccinations.' },
  'managing-anxiety': { title: 'Managing Anxiety in Daily Life', category: 'Mental Health', author: 'Dr. Rizwan Shafiq', date: 'Feb 25, 2024', content: 'Practical strategies: regular exercise, adequate sleep, limiting caffeine, mindfulness, and structured routines. For persistent anxiety, professional support is recommended.' },
  'common-childhood-illnesses': { title: 'Common Childhood Illnesses', category: 'Child Care', author: 'Dr. Faiza Malik Jabeen', date: 'Feb 20, 2024', content: 'Common illnesses include colds, fever, diarrhea, and respiratory infections. Know when to seek care: high fever, difficulty breathing, persistent vomiting, or if your child seems very unwell.' },
  'sleep-hygiene': { title: 'Sleep Hygiene for Better Mental Health', category: 'Mental Health', author: 'Dr. Rizwan Shafiq', date: 'Feb 15, 2024', content: 'Good sleep supports mental wellness. Tips: consistent schedule, dark quiet room, avoid screens before bed, limit caffeine, and exercise during the day.' },
  'nutrition-tips-children': { title: 'Nutrition Tips for Growing Children', category: 'Child Care', author: 'Dr. Faiza Malik Jabeen', date: 'Feb 10, 2024', content: 'Balanced diet with fruits, vegetables, proteins, and whole grains. Limit sugary drinks and processed foods. Encourage regular meals and healthy snacks.' },
};

export default function BlogPost() {
  const { slug } = useParams();
  const post = posts[slug];

  if (!post) {
    return (
      <section className="py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-12 text-center">
          <h1 className="text-2xl font-bold text-gray-900">Post not found</h1>
          <Link to="/blog" className="mt-4 inline-block text-primary hover:underline">Back to Blog</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-12">
        <p className="text-sm text-gray-500">{post.category} · {post.date}</p>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">{post.title}</h1>
        <p className="mt-2 text-gray-600">By {post.author}</p>

        <div className="mt-8 prose prose-gray max-w-none">
          <p className="text-gray-700 leading-relaxed">{post.content}</p>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <Link to="/book-appointment" className="inline-block px-6 py-3 rounded-lg bg-primary text-white font-medium hover:bg-primary-hover">
            Book consultation with {post.author.split(' ')[1]}
          </Link>
        </div>

        <Link to="/blog" className="mt-6 inline-block text-primary hover:underline">Back to Blog</Link>
      </div>
    </section>
  );
}
