import React from 'react';
import { UploadCloud, CheckCircle, XCircle } from 'lucide-react';

const UploadAdPanel = ({ formData, isUploading, onFormChange, onImageUpload, onRemoveImage, onSubmit }) => (
  <div className="max-w-2xl mx-auto bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 mb-20 md:mb-0">
    <h2 className="text-2xl font-black mb-6">Post Update / Ad</h2>
    <form onSubmit={onSubmit} className="space-y-5">
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-1">Post Type</label>
        <select value={formData.post_type} onChange={e => onFormChange({ post_type: e.target.value, category: e.target.value === 'advertisement' ? 'food' : 'update' })} className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 font-bold text-gray-900">
          <option value="announcement">School Announcement / Update</option>
          <option value="advertisement">Sponsored Advertisement</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-bold text-gray-700 mb-1">Title</label>
        <input required type="text" value={formData.title} onChange={e => onFormChange({ title: e.target.value })} className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500" />
      </div>

      <div>
        <label className="block text-sm font-bold text-gray-700 mb-1">{formData.post_type === 'announcement' ? 'Announcement Content' : 'Description'}</label>
        <textarea required rows="3" value={formData.description} onChange={e => onFormChange({ description: e.target.value })} className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500" />
      </div>

      {formData.post_type === 'advertisement' && (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Ad Category</label>
            <select value={formData.category} onChange={e => onFormChange({ category: e.target.value })} className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 font-bold text-gray-900">
              <option value="food">Food & Delivery</option>
              <option value="clothing">Clothing & Fashion</option>
              <option value="tech">Tech & Electronics</option>
              <option value="services">Student Services</option>
              <option value="event">Commercial Event</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Placement Tier</label>
            <select value={formData.package_id} onChange={e => onFormChange({ package_id: e.target.value })} className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200">
              <option value="community_dir">Community Feed (Standard)</option>
              <option value="home_banner">Home Banner (Premium)</option>
            </select>
          </div>
        </div>
      )}

      {formData.post_type === 'announcement' && (
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">Announcement Tag</label>
          <select value={formData.category} onChange={e => onFormChange({ category: e.target.value })} className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200">
            <option value="update">School Update</option>
            <option value="event">School Event</option>
            <option value="emergency">Emergency / Alert</option>
          </select>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">Contact/Action Method</label>
          <select value={formData.contact_method} onChange={e => onFormChange({ contact_method: e.target.value })} className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200">
            <option value="whatsapp">WhatsApp</option>
            <option value="phone">Phone Call</option>
            <option value="link">External Link</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">Detail</label>
          <input type="text" value={formData.contact_method === 'link' ? formData.contact_url : formData.phone_number} onChange={e => onFormChange(formData.contact_method === 'link' ? { contact_url: e.target.value } : { phone_number: e.target.value })} placeholder={formData.contact_method === 'link' ? "https://..." : "+233..."} className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-bold text-gray-700 mb-2">Flyer/Logo Image (Optional)</label>
        <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:bg-gray-50 cursor-pointer relative">
          <input type="file" accept="image/*" onChange={onImageUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
          {formData.imagePreview ? (
            <div className="relative">
              <img src={formData.imagePreview} className="max-h-40 mx-auto rounded-lg shadow-sm" alt="Preview" />
              <button type="button" onClick={onRemoveImage} className="absolute top-1 right-1 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 shadow-md transition-colors" title="Remove image">
                <XCircle size={16} />
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center text-gray-500">
              <UploadCloud size={32} className="mb-2" />
              <span className="font-bold">Tap to select image</span>
            </div>
          )}
        </div>
      </div>

      <button disabled={isUploading} type="submit" className="w-full py-4 bg-primary-600 hover:bg-primary-700 disabled:bg-primary-300 text-white font-bold rounded-xl shadow-xl transition-all flex items-center justify-center gap-2">
        {isUploading ? "Publishing..." : <><CheckCircle size={20} /> Publish {formData.post_type === 'announcement' ? 'Announcement' : 'Advertisement'}</>}
      </button>
    </form>
  </div>
);

export default UploadAdPanel;
