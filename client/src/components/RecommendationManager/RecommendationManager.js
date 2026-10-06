import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Plus, Trash2, Linkedin, Star, UserCheck } from 'lucide-react';
import {
  useGetRecommendationsQuery,
  useCreateRecommendationMutation,
  useDeleteRecommendationMutation
} from '../../features/api/apiSlice';

const RecommendationManager = () => {
  const { data: recommendationsResponse, isLoading } = useGetRecommendationsQuery();
  const [createRecommendation, { isLoading: isCreating }] = useCreateRecommendationMutation();
  const [deleteRecommendation] = useDeleteRecommendationMutation();

  const [formData, setFormData] = useState({
    name: '',
    role: '',
    company: '',
    image: '',
    quote: '',
    rating: 5,
    linkedinUrl: '',
    relationship: ''
  });

  const recommendations = recommendationsResponse?.data || [];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.quote.trim()) {
      toast.error('Name and Quote are required');
      return;
    }

    try {
      await createRecommendation(formData).unwrap();
      toast.success('LinkedIn recommendation added successfully!');
      setFormData({
        name: '',
        role: '',
        company: '',
        image: '',
        quote: '',
        rating: 5,
        linkedinUrl: '',
        relationship: ''
      });
    } catch (err) {
      toast.error(err?.data?.message || 'Failed to add recommendation');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this recommendation?')) return;
    try {
      await deleteRecommendation(id).unwrap();
      toast.success('Recommendation deleted');
    } catch (err) {
      toast.error(err?.data?.message || 'Failed to delete recommendation');
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-md mt-8">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2.5 bg-sky-50 text-sky-600 rounded-xl">
          <UserCheck size={22} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            LinkedIn Endorsements & Recommendations
          </h2>
          <p className="text-xs text-slate-500">
            Add and manage real client and colleague recommendations displayed on your portfolio
          </p>
        </div>
      </div>

      {/* Add New Recommendation Form */}
      <form onSubmit={handleSubmit} className="bg-slate-50 p-5 rounded-xl border border-slate-200/80 mb-8 space-y-4">
        <h3 className="font-bold text-sm text-slate-800 flex items-center gap-2">
          <Plus size={16} className="text-primary-600" />
          <span>Add LinkedIn Recommendation</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
          <div>
            <label className="block font-medium text-slate-700 mb-1">Giver Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Sarah Jenkins"
              className="w-full px-3 py-2 border rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-primary-500"
              required
            />
          </div>

          <div>
            <label className="block font-medium text-slate-700 mb-1">Role / Designation *</label>
            <input
              type="text"
              name="role"
              value={formData.role}
              onChange={handleChange}
              placeholder="e.g. VP of Engineering"
              className="w-full px-3 py-2 border rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-primary-500"
              required
            />
          </div>

          <div>
            <label className="block font-medium text-slate-700 mb-1">Company Name</label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="e.g. TechCorp Solutions"
              className="w-full px-3 py-2 border rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-primary-500"
            />
          </div>

          <div>
            <label className="block font-medium text-slate-700 mb-1">LinkedIn Profile / Recommendation Link</label>
            <input
              type="url"
              name="linkedinUrl"
              value={formData.linkedinUrl}
              onChange={handleChange}
              placeholder="https://linkedin.com/in/..."
              className="w-full px-3 py-2 border rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-primary-500"
            />
          </div>

          <div>
            <label className="block font-medium text-slate-700 mb-1">Avatar / Image URL</label>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://..."
              className="w-full px-3 py-2 border rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-primary-500"
            />
          </div>

          <div>
            <label className="block font-medium text-slate-700 mb-1">Relationship Context</label>
            <input
              type="text"
              name="relationship"
              value={formData.relationship}
              onChange={handleChange}
              placeholder="e.g. Managed Bishal directly"
              className="w-full px-3 py-2 border rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-primary-500"
            />
          </div>
        </div>

        <div>
          <label className="block font-medium text-slate-700 mb-1 text-xs">Recommendation Quote *</label>
          <textarea
            name="quote"
            value={formData.quote}
            onChange={handleChange}
            rows={3}
            placeholder="Paste authentic recommendation text here..."
            className="w-full px-3 py-2 border rounded-lg bg-white text-xs focus:outline-none focus:ring-1 focus:ring-primary-500"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isCreating}
          className="btn-primary !py-2 !px-4 text-xs font-semibold flex items-center gap-1.5"
        >
          <Plus size={15} />
          <span>{isCreating ? 'Saving...' : 'Add Recommendation'}</span>
        </button>
      </form>

      {/* Existing Recommendations List */}
      <div>
        <h3 className="font-bold text-sm text-slate-800 mb-4">
          Current Active Recommendations ({recommendations.length})
        </h3>

        {isLoading ? (
          <div className="text-xs text-slate-500 py-4">Loading recommendations...</div>
        ) : recommendations.length === 0 ? (
          <div className="text-xs text-slate-400 py-4 text-center border border-dashed rounded-lg">
            No dynamic recommendations added yet. Default sample testimonials will display.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recommendations.map((item) => (
              <div key={item._id} className="p-4 border rounded-xl bg-white shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-sm text-slate-900">{item.name}</span>
                      <span className="text-xs text-slate-500">({item.role})</span>
                    </div>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="text-rose-500 hover:text-rose-700 p-1 rounded"
                      title="Delete Recommendation"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <p className="text-xs text-slate-600 italic leading-relaxed mb-3">
                    "{item.quote}"
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t text-[11px] text-slate-500">
                  <span>{item.company}</span>
                  {item.linkedinUrl && (
                    <a href={item.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-sky-600 flex items-center gap-1">
                      <Linkedin size={12} />
                      <span>Profile</span>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecommendationManager;
