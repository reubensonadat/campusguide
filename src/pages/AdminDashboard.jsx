import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Lock, LogOut, LayoutDashboard, Megaphone, HelpCircle, MapPin, BookOpen, FileText, Plus, Save, Edit3, ChevronDown, ChevronUp, Send, Radio } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

import { CustomGuide, CustomNavigation } from '../components/common/CustomIcons';
import { sendBlast, BLAST_SEGMENTS } from '../services/blastService';

import AdminLoginScreen from '../components/admin/AdminLoginScreen';
import AdminSidebar from '../components/admin/AdminSidebar';
import AdModerationPanel from '../components/admin/AdModerationPanel';
import ThriftVerificationPanel from '../components/admin/ThriftVerificationPanel';
import LostFoundPanel from '../components/admin/LostFoundPanel';
import UploadAdPanel from '../components/admin/UploadAdPanel';
import CampusDataPanel from '../components/admin/CampusDataPanel';
import PushBlastPanel from '../components/admin/PushBlastPanel';

const AdminDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useLocalStorage('ucc_admin_auth', false);
  const [passwordInput, setPasswordInput] = useState('');
  const [activeTab, setActiveTab] = useState('moderation');
  const [ads, setAds] = useState([]);
  const [lostFoundItems, setLostFoundItems] = useState([]);
  const [thriftItems, setThriftItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [campusDataTab, setCampusDataTab] = useState('buildings');
  const [campusBuildings, setCampusBuildings] = useState([]);
  const [campusKnowledge, setCampusKnowledge] = useState([]);
  const [campusGuideCards, setCampusGuideCards] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const [uploadFormData, setUploadFormData] = useState({
    post_type: 'announcement', title: '', description: '', phone_number: '',
    contact_method: 'whatsapp', contact_url: '', category: 'update', package_id: 'community_dir',
    imageFile: null, imagePreview: null
  });
  const [isUploading, setIsUploading] = useState(false);
  const [isPurging, setIsPurging] = useState(false);
  const [blastForm, setBlastForm] = useState({ headline: '', message: '', segment: 'all', url: '' });
  const [isBlasting, setIsBlasting] = useState(false);

  useEffect(() => {
    const pathTab = ({ '/admin/moderation': 'moderation', '/admin/lostfound': 'lostfound', '/admin/upload': 'upload', '/admin/thrift': 'thrift', '/admin/campus-data': 'campus-data', '/admin/blast': 'blast' });
    for (const [path, tab] of Object.entries(pathTab)) { if (location.pathname.includes(path)) { setActiveTab(tab); return; } }
    setActiveTab('moderation');
  }, [location.pathname]);

  const checkPassword = (e) => { e.preventDefault(); const cp = import.meta.env.VITE_ADMIN_PASSWORD; if (passwordInput === cp) setIsAuthenticated(true); else toast.error('Incorrect password'); };
  const logout = () => { setIsAuthenticated(false); setPasswordInput(''); };

  const setTab = (tab) => { setActiveTab(tab); navigate(`/admin/${tab === 'moderation' ? 'moderation' : tab}`); };

  const fetchAds = async () => { setIsLoading(true); const { data } = await supabase.from('advertisements').select('*').order('id', { ascending: false }); if (data) setAds(data); setIsLoading(false); };
  const fetchLostFound = async () => { setIsLoading(true); const { data } = await supabase.from('lost_and_found').select('*').order('id', { ascending: false }); if (data) setLostFoundItems(data); setIsLoading(false); };
  const fetchThrift = async () => { setIsLoading(true); const { data } = await supabase.from('thrift_listings').select('*').order('id', { ascending: false }); if (data) setThriftItems(data); setIsLoading(false); };
  const fetchCampusBuildings = async () => { setIsLoading(true); const { data, error } = await supabase.from('campus_buildings').select('*').order('sort_order', { ascending: true }); if (error) toast.error(error.message); else setCampusBuildings(data || []); setIsLoading(false); };
  const fetchCampusKnowledge = async () => { setIsLoading(true); const { data, error } = await supabase.from('campus_knowledge').select('*').order('title', { ascending: true }); if (error) toast.error(error.message); else setCampusKnowledge(data || []); setIsLoading(false); };
  const fetchCampusGuideCards = async () => { setIsLoading(true); const { data, error } = await supabase.from('campus_guide_cards').select('*').order('sort_order', { ascending: true }); if (error) toast.error(error.message); else setCampusGuideCards(data || []); setIsLoading(false); };
  const fetchCampusData = () => { if (campusDataTab === 'buildings') fetchCampusBuildings(); else if (campusDataTab === 'knowledge') fetchCampusKnowledge(); else fetchCampusGuideCards(); };

  useEffect(() => { if (isAuthenticated) { if (activeTab === 'moderation') fetchAds(); if (activeTab === 'lostfound') fetchLostFound(); if (activeTab === 'thrift') fetchThrift(); if (activeTab === 'campus-data') fetchCampusData(); } }, [isAuthenticated, activeTab, campusDataTab]);

  const getTable = () => campusDataTab === 'buildings' ? 'campus_buildings' : campusDataTab === 'knowledge' ? 'campus_knowledge' : 'campus_guide_cards';

  const handleCampusDataSave = async () => {
    setIsSaving(true);
    try {
      const table = getTable();
      if (editingItem?.id) { const { error } = await supabase.from(table).update(editForm).eq('id', editingItem.id); if (error) throw error; toast.success('Updated successfully'); }
      else { const { error } = await supabase.from(table).insert([editForm]); if (error) throw error; toast.success('Created successfully'); }
      setEditingItem(null); setEditForm({}); setShowAddForm(false); fetchCampusData();
    } catch (err) { toast.error(err.message); } finally { setIsSaving(false); }
  };

  const handleCampusDataDelete = async (id) => { if (!window.confirm('Delete this item permanently?')) return; const { error } = await supabase.from(getTable()).delete().eq('id', id); if (error) toast.error(error.message); else { toast.success('Deleted'); fetchCampusData(); } };
  const handleToggleActive = async (id, currentActive) => { const { error } = await supabase.from(getTable()).update({ is_active: !currentActive }).eq('id', id); if (error) toast.error(error.message); else fetchCampusData(); };

  const updateAdStatus = async (id, newStatus) => { const { error } = await supabase.from('advertisements').update({ status: newStatus }).eq('id', id); if (error) toast.error(error.message); else fetchAds(); };
  const deleteAd = async (id) => { if (!window.confirm('Delete this ad completely?')) return; const { error } = await supabase.from('advertisements').delete().eq('id', id); if (error) toast.error(error.message); else fetchAds(); };
  const deleteLostFound = async (id) => { if (!window.confirm('Delete this lost/found item?')) return; const { error } = await supabase.from('lost_and_found').delete().eq('id', id); if (error) toast.error(error.message); else fetchLostFound(); };
  const updateThriftStatus = async (id, newStatus) => { const { error } = await supabase.from('thrift_listings').update({ status: newStatus }).eq('id', id); if (error) toast.error(error.message); else fetchThrift(); };
  const deleteThrift = async (id) => { if (!window.confirm('Delete this thrift item completely?')) return; const { error } = await supabase.from('thrift_listings').delete().eq('id', id); if (error) toast.error(error.message); else fetchThrift(); };

  const handlePurgeThrift = async () => {
    if (!window.confirm('Are you sure you want to permanently delete all thrift listings that expired more than 14 days ago, INCLUDING their images from R2 storage? This cannot be undone.')) return;
    setIsPurging(true);
    try { const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD; const { data, error } = await supabase.functions.invoke('purge-expired-thrift', { body: { adminPassword } }); if (error) throw error; if (data?.error) throw new Error(data.error); toast.success(data?.message || 'Purged successfully'); fetchThrift(); }
    catch (err) { toast.error(err.message || 'Failed to purge data'); } finally { setIsPurging(false); }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) { const reader = new FileReader(); reader.onloadend = () => { setUploadFormData(prev => ({ ...prev, imageFile: file, imagePreview: reader.result })); }; reader.readAsDataURL(file); }
  };

  const formatPhoneNumber = (value) => {
    if (!value) return '';
    let cleaned = value.replace(/\D/g, '');
    if (cleaned.startsWith('0') && cleaned.length === 10) cleaned = '233' + cleaned.substring(1);
    else if (!cleaned.startsWith('233') && cleaned.length === 9) cleaned = '233' + cleaned;
    return cleaned;
  };

  const handleUploadAdSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);
    try {
      let finalImageUrl = null;
      if (uploadFormData.imageFile) {
        const { data: uploadInfo, error: fnError } = await supabase.functions.invoke('generate-upload-url', { body: { fileName: uploadFormData.imageFile.name, fileType: uploadFormData.imageFile.type, fileSize: uploadFormData.imageFile.size, userId: localStorage.getItem('supabase_user_id') || 'admin' } });
        if (fnError) throw new Error('Failed to get upload URL: ' + fnError.message);
        if (uploadInfo?.error) throw new Error('Upload configuration error: ' + uploadInfo.error);
        const uploadRes = await fetch(uploadInfo.presignedUrl, { method: 'PUT', body: uploadFormData.imageFile, headers: { 'Content-Type': uploadFormData.imageFile.type } });
        if (!uploadRes.ok) throw new Error(`Cloudflare R2 rejected the upload (Status ${uploadRes.status})`);
        finalImageUrl = uploadInfo.publicUrl;
      }
      if (uploadFormData.post_type === 'advertisement') {
        const expiryDate = new Date(); expiryDate.setDate(expiryDate.getDate() + 30);
        const { error: dbError } = await supabase.from('advertisements').insert([{ title: uploadFormData.title, description: uploadFormData.description, phone_number: formatPhoneNumber(uploadFormData.phone_number), contact_method: uploadFormData.contact_method, contact_url: uploadFormData.contact_url || null, image_url: finalImageUrl, category: uploadFormData.category, package_id: uploadFormData.package_id, status: 'ACTIVE', paystack_reference: `ADMIN_UPLOAD_${Date.now()}_${Math.random().toString(36).substring(2, 6).toUpperCase()}`, expires_at: expiryDate.toISOString() }]);
        if (dbError) throw new Error('DB Error: ' + dbError.message);
      } else {
        let formattedNum = formatPhoneNumber(uploadFormData.phone_number);
        let actionLink = null;
        if (uploadFormData.contact_method === 'link') actionLink = uploadFormData.contact_url;
        else if (uploadFormData.contact_method === 'whatsapp' && formattedNum) actionLink = `https://wa.me/${formattedNum}`;
        else if (uploadFormData.contact_method === 'phone' && formattedNum) actionLink = `tel:+${formattedNum}`;
        if (!actionLink?.trim()) actionLink = null;
        const { error: dbError } = await supabase.from('announcements').insert([{ title: uploadFormData.title, description: uploadFormData.description, flyer_url: finalImageUrl, action_link: actionLink, action_text: actionLink ? (uploadFormData.contact_method === 'link' ? 'Visit Link' : (uploadFormData.contact_method === 'whatsapp' ? 'WhatsApp' : 'Call')) : null }]);
        if (dbError) throw new Error('DB Error: ' + dbError.message);
      }
      toast.success('Published successfully!');
      setUploadFormData({ post_type: 'announcement', title: '', description: '', phone_number: '', contact_method: 'whatsapp', contact_url: '', category: 'update', package_id: 'community_dir', imageFile: null, imagePreview: null });
    } catch (err) { toast.error(err.message); } finally { setIsUploading(false); }
  };

  const handleSendBlast = async (e) => {
    e.preventDefault();
    if (!blastForm.headline.trim() || !blastForm.message.trim()) { toast.error('Headline and message are required.'); return; }
    const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD;
    if (!adminPassword) { toast.error('Admin password not configured (VITE_ADMIN_PASSWORD).'); return; }
    setIsBlasting(true);
    try {
      const result = await sendBlast({ adminPassword, headline: blastForm.headline.trim(), message: blastForm.message.trim(), segment: blastForm.segment, url: blastForm.url.trim() || undefined });
      if (!result.success) toast.error(result.error || 'Failed to send blast.');
      else { toast.success(result.recipients != null ? `Blast sent to ${result.recipients} recipient(s).` : 'Blast sent successfully!'); setBlastForm({ headline: '', message: '', segment: 'all', url: '' }); }
    } catch (err) { toast.error(err.message || 'Failed to send blast.'); } finally { setIsBlasting(false); }
  };

  if (!isAuthenticated) return <AdminLoginScreen passwordInput={passwordInput} onPasswordChange={setPasswordInput} onSubmit={checkPassword} />;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row mb-24 md:mb-0">
      <AdminSidebar activeTab={activeTab} onTabChange={setTab} onLogout={logout} />
      <div className="flex-1 p-4 md:p-8 overflow-y-auto w-full">
        {isLoading && <div className="text-center py-10 font-bold text-gray-400">Loading data...</div>}
        {!isLoading && activeTab === 'moderation' && <AdModerationPanel ads={ads} onApprove={(id) => updateAdStatus(id, 'ACTIVE')} onReject={(id) => updateAdStatus(id, 'REJECTED')} onDelete={deleteAd} />}
        {!isLoading && activeTab === 'thrift' && <ThriftVerificationPanel thriftItems={thriftItems} isPurging={isPurging} onApprove={(id) => updateThriftStatus(id, 'ACTIVE')} onReject={(id) => updateThriftStatus(id, 'REJECTED')} onDelete={deleteThrift} onPurge={handlePurgeThrift} />}
        {!isLoading && activeTab === 'lostfound' && <LostFoundPanel lostFoundItems={lostFoundItems} onDelete={deleteLostFound} />}
        {activeTab === 'upload' && <UploadAdPanel formData={uploadFormData} isUploading={isUploading} onFormChange={(patch) => setUploadFormData(prev => ({ ...prev, ...patch }))} onImageUpload={handleImageUpload} onRemoveImage={() => setUploadFormData(prev => ({ ...prev, imageFile: null, imagePreview: null }))} onSubmit={handleUploadAdSubmit} />}
        {activeTab === 'campus-data' && <CampusDataPanel tab={campusDataTab} onTabChange={setCampusDataTab} buildings={campusBuildings} knowledge={campusKnowledge} guideCards={campusGuideCards} isLoading={isLoading} showAddForm={showAddForm} editingItem={editingItem} editForm={editForm} isSaving={isSaving} onAddNew={() => { setShowAddForm(true); setEditingItem({}); setEditForm({ campus_id: 'ucc', is_active: true }); }} onSave={handleCampusDataSave} onCancel={() => { setShowAddForm(false); setEditingItem(null); setEditForm({}); }} onDelete={handleCampusDataDelete} onToggleActive={handleToggleActive} onEditFormChange={(patch) => setEditForm(prev => ({ ...prev, ...patch }))} setShowAddForm={setShowAddForm} setEditingItem={setEditingItem} setEditForm={setEditForm} />}
        {activeTab === 'blast' && <PushBlastPanel blastForm={blastForm} isBlasting={isBlasting} onFormChange={(patch) => setBlastForm(prev => ({ ...prev, ...patch }))} onSubmit={handleSendBlast} />}
      </div>
    </div>
  );
};

export default AdminDashboard;
