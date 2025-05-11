import { useState, useEffect } from 'react';
import { NewsletterItem, newsletterService } from '../services/newsletterService';

interface EditNewsletterFormProps {
  newsletterId?: string;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export default function EditNewsletterForm({ newsletterId, onSuccess, onCancel }: EditNewsletterFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: '',
    tags: '',
    author: '',
    summary: '',
    imageUrl: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const isEditMode = !!newsletterId;

  useEffect(() => {
    if (newsletterId) {
      loadNewsletter();
    }
  }, [newsletterId]);

  const loadNewsletter = async () => {
    try {
      setLoading(true);
      const newsletter = await newsletterService.getNewsletterItem(newsletterId!);
      setFormData({
        title: newsletter.title,
        content: newsletter.content,
        category: newsletter.category,
        tags: newsletter.tags.join(', '),
        author: newsletter.author,
        summary: newsletter.summary,
        imageUrl: newsletter.imageUrl || ''
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load newsletter');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const newsletterData = {
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim()),
      };

      if (isEditMode) {
        await newsletterService.updateNewsletterItem(newsletterId!, newsletterData);
      } else {
        await newsletterService.addNewsletterItem(newsletterData);
      }

      setSuccess(true);
      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : `Failed to ${isEditMode ? 'update' : 'add'} newsletter`);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDelete = async () => {
    if (!newsletterId || !window.confirm('Are you sure you want to delete this newsletter?')) {
      return;
    }

    try {
      setLoading(true);
      await newsletterService.deleteNewsletterItem(newsletterId);
      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete newsletter');
    } finally {
      setLoading(false);
    }
  };

  if (loading && isEditMode) {
    return <div>Loading newsletter...</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">
        {isEditMode ? 'Edit Newsletter Item' : 'Add New Newsletter Item'}
      </h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}
      
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
          Newsletter item {isEditMode ? 'updated' : 'added'} successfully!
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Category</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="">Select a category</option>
          <option value="AI">AI</option>
          <option value="Machine Learning">Machine Learning</option>
          <option value="Deep Learning">Deep Learning</option>
          <option value="Data Science">Data Science</option>
          <option value="NLP">NLP</option>
          <option value="Computer Vision">Computer Vision</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Summary</label>
        <textarea
          name="summary"
          value={formData.summary}
          onChange={handleChange}
          required
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Content</label>
        <textarea
          name="content"
          value={formData.content}
          onChange={handleChange}
          required
          rows={6}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Tags (comma-separated)</label>
        <input
          type="text"
          name="tags"
          value={formData.tags}
          onChange={handleChange}
          placeholder="e.g., machine learning, deep learning, nlp"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Author</label>
        <input
          type="text"
          name="author"
          value={formData.author}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Image URL (optional)</label>
        <input
          type="url"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {loading ? 'Saving...' : isEditMode ? 'Update Newsletter' : 'Add Newsletter'}
        </button>

        {isEditMode && (
          <button
            type="button"
            onClick={handleDelete}
            disabled={loading}
            className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50"
          >
            Delete
          </button>
        )}

        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
} 