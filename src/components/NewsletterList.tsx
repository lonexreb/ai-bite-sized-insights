import { useEffect, useState, useMemo } from 'react';
import { NewsletterItem, newsletterService, SortField, SortOrder } from '../services/newsletterService';
import EditNewsletterForm from './EditNewsletterForm';

export default function NewsletterList() {
  const [newsletters, setNewsletters] = useState<NewsletterItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingNewsletter, setEditingNewsletter] = useState<string | null>(null);
  const [sortField, setSortField] = useState<SortField>('createdAt');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [lastDoc, setLastDoc] = useState<any>(null);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    loadNewsletters();
  }, [sortField, sortOrder]);

  async function loadNewsletters(reset = true) {
    try {
      setLoading(true);
      const result = await newsletterService.getNewsletterItems({
        limitCount: 10,
        lastDoc: reset ? null : lastDoc,
        sortField,
        sortOrder
      });
      
      setNewsletters(reset ? result.items : [...newsletters, ...result.items]);
      setLastDoc(result.lastDoc);
      setHasMore(result.hasMore);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load newsletters');
    } finally {
      setLoading(false);
    }
  }

  const handleLoadMore = async () => {
    if (!hasMore || loadingMore) return;
    
    setLoadingMore(true);
    await loadNewsletters(false);
    setLoadingMore(false);
  };

  const handleEdit = (id: string) => {
    setEditingNewsletter(id);
  };

  const handleEditSuccess = () => {
    setEditingNewsletter(null);
    loadNewsletters(true);
  };

  // Get unique categories and tags
  const categories = useMemo(() => 
    Array.from(new Set(newsletters.map(item => item.category))),
    [newsletters]
  );

  const tags = useMemo(() => 
    Array.from(new Set(newsletters.flatMap(item => item.tags))),
    [newsletters]
  );

  // Filter newsletters based on search term, category, and tag
  const filteredNewsletters = useMemo(() => {
    return newsletters.filter(item => {
      const matchesSearch = 
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.summary.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = !selectedCategory || item.category === selectedCategory;
      const matchesTag = !selectedTag || item.tags.includes(selectedTag);

      return matchesSearch && matchesCategory && matchesTag;
    });
  }, [newsletters, searchTerm, selectedCategory, selectedTag]);

  if (loading && newsletters.length === 0) return <div>Loading newsletters...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Latest AI Insights</h2>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          {showAddForm ? 'Hide Form' : 'Add New Item'}
        </button>
      </div>

      {showAddForm && (
        <EditNewsletterForm
          onSuccess={() => {
            setShowAddForm(false);
            loadNewsletters(true);
          }}
          onCancel={() => setShowAddForm(false)}
        />
      )}

      {editingNewsletter && (
        <EditNewsletterForm
          newsletterId={editingNewsletter}
          onSuccess={handleEditSuccess}
          onCancel={() => setEditingNewsletter(null)}
        />
      )}

      <div className="space-y-4">
        {/* Search and Filter Controls */}
        <div className="flex flex-wrap gap-4">
          <input
            type="text"
            placeholder="Search newsletters..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 min-w-[200px] rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>

          <select
            value={selectedTag}
            onChange={(e) => setSelectedTag(e.target.value)}
            className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">All Tags</option>
            {tags.map(tag => (
              <option key={tag} value={tag}>{tag}</option>
            ))}
          </select>

          <select
            value={`${sortField}-${sortOrder}`}
            onChange={(e) => {
              const [field, order] = e.target.value.split('-');
              setSortField(field as SortField);
              setSortOrder(order as SortOrder);
            }}
            className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="createdAt-desc">Newest First</option>
            <option value="createdAt-asc">Oldest First</option>
            <option value="title-asc">Title (A-Z)</option>
            <option value="title-desc">Title (Z-A)</option>
            <option value="category-asc">Category (A-Z)</option>
            <option value="category-desc">Category (Z-A)</option>
          </select>
        </div>

        {/* Newsletter Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredNewsletters.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              {item.imageUrl && (
                <img 
                  src={item.imageUrl} 
                  alt={item.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-1 text-sm bg-blue-100 text-blue-800 rounded-full">
                    {item.category}
                  </span>
                  <span className="text-sm text-gray-500">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600 mb-4">{item.summary}</p>
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span 
                      key={tag}
                      className="px-2 py-1 text-sm bg-gray-100 text-gray-800 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <p className="text-sm text-gray-500">By {item.author}</p>
                  <button
                    onClick={() => handleEdit(item.id)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredNewsletters.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No newsletters found matching your criteria.
          </div>
        )}

        {hasMore && (
          <div className="text-center">
            <button
              onClick={handleLoadMore}
              disabled={loadingMore}
              className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 disabled:opacity-50"
            >
              {loadingMore ? 'Loading...' : 'Load More'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
} 