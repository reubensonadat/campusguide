import React from 'react';
import { Plus, Save, Edit3, Eye, EyeOff, Trash2 } from 'lucide-react';
import { CustomGuide, CustomNavigation } from '../common/CustomIcons';

const SUB_TABS = [
  { key: 'buildings', label: 'Buildings', icon: CustomNavigation },
  { key: 'knowledge', label: 'Knowledge', icon: CustomGuide },
  { key: 'guide-cards', label: 'Guide Cards', icon: CustomGuide },
];

const CampusDataPanel = ({ tab, onTabChange, buildings, knowledge, guideCards, isLoading, showAddForm, editingItem, editForm, isSaving, onAddNew, onSave, onCancel, onEdit, onDelete, onToggleActive, onEditFormChange, setShowAddForm, setEditingItem, setEditForm }) => {
  const items = tab === 'buildings' ? buildings : tab === 'knowledge' ? knowledge : guideCards;

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-black">Campus Data Manager</h2>
        <button onClick={() => { setShowAddForm(true); setEditingItem({}); setEditForm({ campus_id: 'ucc', is_active: true }); }}
          className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded-xl transition-colors text-sm">
          <Plus size={16} /> Add New
        </button>
      </div>

      <div className="flex gap-2 border-b border-gray-200 pb-2 overflow-x-auto custom-scrollbar whitespace-nowrap">
        {SUB_TABS.map(sub => (
          <button key={sub.key} onClick={() => onTabChange(sub.key)}
            className={`flex items-center gap-2 px-4 py-2 rounded-t-xl font-bold text-sm transition-colors ${tab === sub.key ? 'bg-primary-50 text-primary-700 border-b-2 border-primary-600' : 'text-gray-500 hover:bg-gray-50'}`}>
            <sub.icon size={16} /> {sub.label}
            <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-black ${tab === sub.key ? 'bg-primary-200 text-primary-800' : 'bg-gray-200 text-gray-600'}`}>{items.length}</span>
          </button>
        ))}
      </div>

      {isLoading && <div className="text-center py-10 font-bold text-gray-400">Loading...</div>}

      {/* ADD / EDIT FORM */}
      {(showAddForm || editingItem?.id) && (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-primary-200 space-y-4">
          <h3 className="font-black text-lg">{editingItem?.id ? 'Edit Item' : 'Add New Item'}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tab === 'buildings' && (
              <>
                <div><label className="block text-xs font-bold text-gray-600 mb-1">Full Name *</label><input value={editForm.full_name || ''} onChange={e => onEditFormChange({ full_name: e.target.value })} className="w-full p-2.5 bg-gray-50 rounded-xl border border-gray-200 text-sm" /></div>
                <div><label className="block text-xs font-bold text-gray-600 mb-1">Short Form</label><input value={editForm.short_form || ''} onChange={e => onEditFormChange({ short_form: e.target.value })} className="w-full p-2.5 bg-gray-50 rounded-xl border border-gray-200 text-sm" /></div>
                <div><label className="block text-xs font-bold text-gray-600 mb-1">Description</label><input value={editForm.description || ''} onChange={e => onEditFormChange({ description: e.target.value })} className="w-full p-2.5 bg-gray-50 rounded-xl border border-gray-200 text-sm" /></div>
                <div><label className="block text-xs font-bold text-gray-600 mb-1">Category</label><select value={editForm.category || 'academic'} onChange={e => onEditFormChange({ category: e.target.value })} className="w-full p-2.5 bg-gray-50 rounded-xl border border-gray-200 text-sm"><option value="academic">Academic</option><option value="administrative">Administrative</option><option value="residential-new">Residential (New)</option><option value="residential-old">Residential (Old)</option><option value="health">Health</option><option value="transit">Transit</option><option value="commercial">Commercial</option><option value="worship">Worship</option><option value="banking">Banking</option><option value="recreation">Recreation</option></select></div>
                <div><label className="block text-xs font-bold text-gray-600 mb-1">Latitude *</label><input type="number" step="any" value={editForm.latitude || ''} onChange={e => onEditFormChange({ latitude: parseFloat(e.target.value) || '' })} className="w-full p-2.5 bg-gray-50 rounded-xl border border-gray-200 text-sm" /></div>
                <div><label className="block text-xs font-bold text-gray-600 mb-1">Longitude *</label><input type="number" step="any" value={editForm.longitude || ''} onChange={e => onEditFormChange({ longitude: parseFloat(e.target.value) || '' })} className="w-full p-2.5 bg-gray-50 rounded-xl border border-gray-200 text-sm" /></div>
                <div><label className="block text-xs font-bold text-gray-600 mb-1">Sort Order</label><input type="number" value={editForm.sort_order || 0} onChange={e => onEditFormChange({ sort_order: parseInt(e.target.value) || 0 })} className="w-full p-2.5 bg-gray-50 rounded-xl border border-gray-200 text-sm" /></div>
                <div className="flex items-center gap-2 pt-5"><input type="checkbox" checked={editForm.is_active !== false} onChange={e => onEditFormChange({ is_active: e.target.checked })} className="w-4 h-4 rounded" /><label className="text-xs font-bold text-gray-600">Active</label></div>
              </>
            )}
            {tab === 'knowledge' && (
              <>
                <div><label className="block text-xs font-bold text-gray-600 mb-1">ID / Key *</label><input value={editForm.id || ''} onChange={e => onEditFormChange({ id: e.target.value })} disabled={!!editingItem?.id} className="w-full p-2.5 bg-gray-50 rounded-xl border border-gray-200 text-sm disabled:opacity-50" /></div>
                <div><label className="block text-xs font-bold text-gray-600 mb-1">Title *</label><input value={editForm.title || ''} onChange={e => onEditFormChange({ title: e.target.value })} className="w-full p-2.5 bg-gray-50 rounded-xl border border-gray-200 text-sm" /></div>
                <div className="md:col-span-2"><label className="block text-xs font-bold text-gray-600 mb-1">History</label><textarea rows={2} value={editForm.history || ''} onChange={e => onEditFormChange({ history: e.target.value })} className="w-full p-2.5 bg-gray-50 rounded-xl border border-gray-200 text-sm" /></div>
                <div className="md:col-span-2"><label className="block text-xs font-bold text-gray-600 mb-1">Architecture</label><textarea rows={2} value={editForm.architecture || ''} onChange={e => onEditFormChange({ architecture: e.target.value })} className="w-full p-2.5 bg-gray-50 rounded-xl border border-gray-200 text-sm" /></div>
                <div className="md:col-span-2"><label className="block text-xs font-bold text-gray-600 mb-1">Statistics (JSON)</label><textarea rows={2} value={typeof editForm.statistics === 'string' ? editForm.statistics : JSON.stringify(editForm.statistics || {}, null, 2)} onChange={e => { try { onEditFormChange({ statistics: JSON.parse(e.target.value) }); } catch { /* allow editing */ } }} className="w-full p-2.5 bg-gray-50 rounded-xl border border-gray-200 text-sm font-mono" /></div>
                <div className="md:col-span-2"><label className="block text-xs font-bold text-gray-600 mb-1">Rules (JSON array)</label><textarea rows={2} value={typeof editForm.rules === 'string' ? editForm.rules : JSON.stringify(editForm.rules || [], null, 2)} onChange={e => { try { onEditFormChange({ rules: JSON.parse(e.target.value) }); } catch { /* allow editing */ } }} className="w-full p-2.5 bg-gray-50 rounded-xl border border-gray-200 text-sm font-mono" /></div>
                <div><label className="block text-xs font-bold text-gray-600 mb-1">Accessibility</label><input value={editForm.accessibility || ''} onChange={e => onEditFormChange({ accessibility: e.target.value })} className="w-full p-2.5 bg-gray-50 rounded-xl border border-gray-200 text-sm" /></div>
                <div className="flex items-center gap-2 pt-5"><input type="checkbox" checked={editForm.is_active !== false} onChange={e => onEditFormChange({ is_active: e.target.checked })} className="w-4 h-4 rounded" /><label className="text-xs font-bold text-gray-600">Active</label></div>
              </>
            )}
            {tab === 'guide-cards' && (
              <>
                <div><label className="block text-xs font-bold text-gray-600 mb-1">Title *</label><input value={editForm.title || ''} onChange={e => onEditFormChange({ title: e.target.value })} className="w-full p-2.5 bg-gray-50 rounded-xl border border-gray-200 text-sm" /></div>
                <div><label className="block text-xs font-bold text-gray-600 mb-1">Subtitle</label><input value={editForm.subtitle || ''} onChange={e => onEditFormChange({ subtitle: e.target.value })} className="w-full p-2.5 bg-gray-50 rounded-xl border border-gray-200 text-sm" /></div>
                <div><label className="block text-xs font-bold text-gray-600 mb-1">Icon</label><select value={editForm.icon || 'book-open'} onChange={e => onEditFormChange({ icon: e.target.value })} className="w-full p-2.5 bg-gray-50 rounded-xl border border-gray-200 text-sm"><option value="book-open">Book Open</option><option value="shield">Shield</option><option value="alert-triangle">Alert Triangle</option><option value="phone">Phone</option><option value="globe">Globe</option><option value="heart">Heart</option><option value="building">Building</option><option value="users">Users</option><option value="clipboard">Clipboard</option><option value="graduation-cap">Graduation Cap</option></select></div>
                <div><label className="block text-xs font-bold text-gray-600 mb-1">Category</label><select value={editForm.category || 'rules'} onChange={e => onEditFormChange({ category: e.target.value })} className="w-full p-2.5 bg-gray-50 rounded-xl border border-gray-200 text-sm"><option value="rules">Rules</option><option value="procedures">Procedures</option><option value="contacts">Contacts</option><option value="resources">Resources</option><option value="policy">Policy</option><option value="safety">Safety</option></select></div>
                <div className="md:col-span-2"><label className="block text-xs font-bold text-gray-600 mb-1">Content Sections (JSON array of {"{title, items}"})</label><textarea rows={6} value={typeof editForm.content === 'string' ? editForm.content : JSON.stringify(editForm.content || [], null, 2)} onChange={e => { try { onEditFormChange({ content: JSON.parse(e.target.value) }); } catch { /* allow editing */ } }} className="w-full p-2.5 bg-gray-50 rounded-xl border border-gray-200 text-sm font-mono" /></div>
                <div className="md:col-span-2"><label className="block text-xs font-bold text-gray-600 mb-1">Search Keywords (JSON array)</label><textarea rows={2} value={typeof editForm.search_keywords === 'string' ? editForm.search_keywords : JSON.stringify(editForm.search_keywords || [], null, 2)} onChange={e => { try { onEditFormChange({ search_keywords: JSON.parse(e.target.value) }); } catch { /* allow editing */ } }} className="w-full p-2.5 bg-gray-50 rounded-xl border border-gray-200 text-sm font-mono" /></div>
                <div><label className="block text-xs font-bold text-gray-600 mb-1">Sort Order</label><input type="number" value={editForm.sort_order || 0} onChange={e => onEditFormChange({ sort_order: parseInt(e.target.value) || 0 })} className="w-full p-2.5 bg-gray-50 rounded-xl border border-gray-200 text-sm" /></div>
                <div className="flex items-center gap-2 pt-5"><input type="checkbox" checked={editForm.is_active !== false} onChange={e => onEditFormChange({ is_active: e.target.checked })} className="w-4 h-4 rounded" /><label className="text-xs font-bold text-gray-600">Active</label></div>
              </>
            )}
          </div>
          <div className="flex gap-3 pt-2">
            <button onClick={onSave} disabled={isSaving} className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 disabled:bg-primary-300 text-white font-bold py-2 px-6 rounded-xl transition-colors text-sm">
              <Save size={16} /> {isSaving ? 'Saving...' : 'Save'}
            </button>
            <button onClick={onCancel} className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-2 px-6 rounded-xl transition-colors text-sm">
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* LIST */}
      {!isLoading && (
        <div className="grid gap-3">
          {items.map(item => (
            <div key={item.id} className={`bg-white p-4 rounded-xl shadow-sm border flex flex-col md:flex-row gap-3 items-start md:items-center ${item.is_active ? 'border-gray-200' : 'border-red-200 opacity-60'}`}>
              <div className="flex-1 min-w-0">
                {tab === 'buildings' && (
                  <>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-gray-900">{item.full_name}</span>
                      {item.short_form && <span className="text-[10px] bg-gray-100 px-1.5 py-0.5 rounded font-black uppercase text-gray-600">{item.short_form}</span>}
                      <span className="text-[10px] bg-primary-50 text-primary-700 px-1.5 py-0.5 rounded font-bold">{item.category}</span>
                    </div>
                    <p className="text-xs text-gray-500 truncate">{item.description}</p>
                    <p className="text-[10px] text-gray-400 font-mono mt-1">{item.latitude}, {item.longitude}</p>
                  </>
                )}
                {tab === 'knowledge' && (
                  <>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-gray-900">{item.title}</span>
                      <span className="text-[10px] bg-gray-100 px-1.5 py-0.5 rounded font-mono text-gray-600">{item.id}</span>
                    </div>
                    <p className="text-xs text-gray-500 line-clamp-2">{item.history || item.architecture || 'No description'}</p>
                    {item.tags && <div className="flex gap-1 mt-1">{item.tags.map(t => <span key={t} className="text-[9px] bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded">{t}</span>)}</div>}
                  </>
                )}
                {tab === 'guide-cards' && (
                  <>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-gray-900">{item.title}</span>
                      <span className="text-[10px] bg-primary-50 text-primary-700 px-1.5 py-0.5 rounded font-bold">{item.category}</span>
                    </div>
                    <p className="text-xs text-gray-500 line-clamp-1">{item.subtitle}</p>
                    <p className="text-[10px] text-gray-400 mt-1">{item.content?.length || 0} sections • Sort: {item.sort_order}</p>
                  </>
                )}
              </div>
              <div className="flex gap-2 shrink-0 w-full md:w-auto mt-2 md:mt-0 pt-3 md:pt-0 border-t md:border-t-0 border-gray-100 justify-end md:justify-start">
                <button onClick={() => onToggleActive(item.id, item.is_active)} className={`flex-1 md:flex-none flex justify-center items-center p-2 rounded-lg ${item.is_active ? 'bg-green-50 text-green-600 hover:bg-green-100' : 'bg-red-50 text-red-600 hover:bg-red-100'}`}>
                  {item.is_active ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
                <button onClick={() => { setEditingItem(item); setEditForm({ ...item }); }} className="flex-1 md:flex-none flex justify-center items-center p-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg">
                  <Edit3 size={16} />
                </button>
                <button onClick={() => onDelete(item.id)} className="flex-1 md:flex-none flex justify-center items-center p-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
          {items.length === 0 && <p className="text-gray-500 text-center py-10">No {tab} found. Check your Supabase table.</p>}
        </div>
      )}
    </div>
  );
};

export default CampusDataPanel;
