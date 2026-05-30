import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Lock, LogOut, CheckCircle, XCircle, Trash2, UploadCloud, Eye, EyeOff, LayoutDashboard, Megaphone, HelpCircle, MapPin, BookOpen, FileText, Plus, Save, Edit3, ChevronDown, ChevronUp } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

import { CustomGuide } from '../components/common/CustomIcons';

const AdminDashboard = () => {
    const [isAuthenticated, setIsAuthenticated] = useLocalStorage('ucc_admin_auth', false);
    const [passwordInput, setPasswordInput] = useState('');
    const [activeTab, setActiveTab] = useState('moderation');

    const [ads, setAds] = useState([]);
    const [lostFoundItems, setLostFoundItems] = useState([]);
    const [thriftItems, setThriftItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // Campus Data Management states
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

    useEffect(() => {
        if (location.pathname.includes('lostfound')) setActiveTab('lostfound');
        else if (location.pathname.includes('upload')) setActiveTab('upload');
        else if (location.pathname.includes('thrift')) setActiveTab('thrift');
        else if (location.pathname.includes('campus-data')) setActiveTab('campus-data');
        else setActiveTab('moderation');
    }, [location.pathname]);

    // Form states for Upload Ad/Announcement
    const [uploadFormData, setUploadFormData] = useState({
        post_type: 'announcement', // Default to announcement to avoid confusion
        title: '',
        description: '',
        phone_number: '',
        contact_method: 'whatsapp',
        contact_url: '',
        category: 'update', // Default for announcement
        package_id: 'community_dir',
        imageFile: null,
        imagePreview: null
    });
    const [isUploading, setIsUploading] = useState(false);

    const checkPassword = (e) => {
        e.preventDefault();
        const correctPassword = import.meta.env.VITE_ADMIN_PASSWORD;
        if (passwordInput === correctPassword) {
            setIsAuthenticated(true);
        } else {
            toast.error("Incorrect password");
        }
    };

    const logout = () => {
        setIsAuthenticated(false);
        setPasswordInput('');
    };

    const fetchAds = async () => {
        setIsLoading(true);
        const { data, error } = await supabase.from('advertisements').select('*').order('id', { ascending: false });
        if (data) setAds(data);
        setIsLoading(false);
    };

    const fetchLostFound = async () => {
        setIsLoading(true);
        const { data, error } = await supabase.from('lost_and_found').select('*').order('id', { ascending: false });
        if (data) setLostFoundItems(data);
        setIsLoading(false);
    };

    const fetchThrift = async () => {
        setIsLoading(true);
        const { data, error } = await supabase.from('thrift_listings').select('*').order('id', { ascending: false });
        if (data) setThriftItems(data);
        setIsLoading(false);
    };

    // Campus Data fetch functions
    const fetchCampusBuildings = async () => {
        setIsLoading(true);
        const { data, error } = await supabase.from('campus_buildings').select('*').order('sort_order', { ascending: true });
        if (error) toast.error(error.message);
        else setCampusBuildings(data || []);
        setIsLoading(false);
    };

    const fetchCampusKnowledge = async () => {
        setIsLoading(true);
        const { data, error } = await supabase.from('campus_knowledge').select('*').order('title', { ascending: true });
        if (error) toast.error(error.message);
        else setCampusKnowledge(data || []);
        setIsLoading(false);
    };

    const fetchCampusGuideCards = async () => {
        setIsLoading(true);
        const { data, error } = await supabase.from('campus_guide_cards').select('*').order('sort_order', { ascending: true });
        if (error) toast.error(error.message);
        else setCampusGuideCards(data || []);
        setIsLoading(false);
    };

    const fetchCampusData = () => {
        if (campusDataTab === 'buildings') fetchCampusBuildings();
        else if (campusDataTab === 'knowledge') fetchCampusKnowledge();
        else if (campusDataTab === 'guide-cards') fetchCampusGuideCards();
    };

    // Campus Data CRUD
    const handleCampusDataSave = async () => {
        setIsSaving(true);
        try {
            const table = campusDataTab === 'buildings' ? 'campus_buildings' : campusDataTab === 'knowledge' ? 'campus_knowledge' : 'campus_guide_cards';
            if (editingItem?.id) {
                const { error } = await supabase.from(table).update(editForm).eq('id', editingItem.id);
                if (error) throw error;
                toast.success('Updated successfully');
            } else {
                const { error } = await supabase.from(table).insert([editForm]);
                if (error) throw error;
                toast.success('Created successfully');
            }
            setEditingItem(null);
            setEditForm({});
            setShowAddForm(false);
            fetchCampusData();
        } catch (err) {
            toast.error(err.message);
        } finally {
            setIsSaving(false);
        }
    };

    const handleCampusDataDelete = async (id) => {
        if (!window.confirm('Delete this item permanently?')) return;
        const table = campusDataTab === 'buildings' ? 'campus_buildings' : campusDataTab === 'knowledge' ? 'campus_knowledge' : 'campus_guide_cards';
        const { error } = await supabase.from(table).delete().eq('id', id);
        if (error) toast.error(error.message);
        else { toast.success('Deleted'); fetchCampusData(); }
    };

    const handleToggleActive = async (id, currentActive) => {
        const table = campusDataTab === 'buildings' ? 'campus_buildings' : campusDataTab === 'knowledge' ? 'campus_knowledge' : 'campus_guide_cards';
        const { error } = await supabase.from(table).update({ is_active: !currentActive }).eq('id', id);
        if (error) toast.error(error.message);
        else fetchCampusData();
    };

    useEffect(() => {
        if (isAuthenticated) {
            if (activeTab === 'moderation') fetchAds();
            if (activeTab === 'lostfound') fetchLostFound();
            if (activeTab === 'thrift') fetchThrift();
            if (activeTab === 'campus-data') fetchCampusData();
        }
    }, [isAuthenticated, activeTab, campusDataTab]);

    // Actions
    const updateAdStatus = async (id, newStatus) => {
        const { error } = await supabase.from('advertisements').update({ status: newStatus }).eq('id', id);
        if (error) toast.error(error.message);
        else fetchAds();
    };

    const deleteAd = async (id) => {
        if (!window.confirm("Delete this ad completely?")) return;
        const { error } = await supabase.from('advertisements').delete().eq('id', id);
        if (error) toast.error(error.message);
        else fetchAds();
    };

    const deleteLostFound = async (id) => {
        if (!window.confirm("Delete this lost/found item?")) return;
        const { error } = await supabase.from('lost_and_found').delete().eq('id', id);
        if (error) toast.error(error.message);
        else fetchLostFound();
    };

    const updateThriftStatus = async (id, newStatus) => {
        const { error } = await supabase.from('thrift_listings').update({ status: newStatus }).eq('id', id);
        if (error) toast.error(error.message);
        else fetchThrift();
    };

    const deleteThrift = async (id) => {
        if (!window.confirm("Delete this thrift item completely?")) return;
        const { error } = await supabase.from('thrift_listings').delete().eq('id', id);
        if (error) alert(error.message);
        else fetchThrift();
    };

    // Upload Ad Logic
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setUploadFormData(prev => ({ ...prev, imageFile: file, imagePreview: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleUploadAdSubmit = async (e) => {
        e.preventDefault();
        setIsUploading(true);
        try {
            let finalImageUrl = null;
            // 1. Upload Flyer/Logo to Cloudflare R2 if an image file exists
            if (uploadFormData.imageFile) {
                const { data: uploadInfo, error: fnError } = await supabase.functions.invoke('generate-upload-url', {
                    body: {
                        fileName: uploadFormData.imageFile.name,
                        fileType: uploadFormData.imageFile.type,
                        fileSize: uploadFormData.imageFile.size,
                        userId: localStorage.getItem('supabase_user_id') || 'admin'
                    }
                });

                if (fnError) {
                    throw new Error("Failed to get upload URL: " + fnError.message);
                }

                if (uploadInfo?.error) {
                    throw new Error("Upload configuration error: " + uploadInfo.error);
                }

                const { presignedUrl, publicUrl } = uploadInfo;

                console.log("SUCCESSFULLY GOT UPLOAD INFO FROM EDGE FUNCTION:");
                console.log("Presigned URL:", presignedUrl);
                console.log("Public URL:", publicUrl);

                // Upload directly to Cloudflare R2
                try {
                    const uploadRes = await fetch(presignedUrl, {
                        method: 'PUT',
                        body: uploadFormData.imageFile,
                        headers: {
                            'Content-Type': uploadFormData.imageFile.type
                        }
                    });

                    if (!uploadRes.ok) {
                        const errorText = await uploadRes.text();
                        console.error("R2 Upload Failed:", uploadRes.status, errorText);
                        throw new Error(`Cloudflare R2 rejected the upload (Status ${uploadRes.status}): ${errorText}`);
                    }
                } catch (fetchErr) {
                    console.error("BROWSER FAILED TO FETCH THE PRESIGNED URL:", fetchErr);
                    throw new Error(`Network/CORS error when hitting R2. URL was: ${presignedUrl.substring(0, 50)}...`);
                }

                finalImageUrl = publicUrl;
            }

            const formatPhoneNumber = (value) => {
                if (!value) return '';
                let cleaned = value.replace(/\D/g, ''); // strip non-digits
                if (cleaned.startsWith('0') && cleaned.length === 10) {
                    cleaned = '233' + cleaned.substring(1);
                } else if (!cleaned.startsWith('233') && cleaned.length === 9) {
                    cleaned = '233' + cleaned;
                }
                return cleaned;
            };

            if (uploadFormData.post_type === 'advertisement') {
                const expiryDate = new Date();
                expiryDate.setDate(expiryDate.getDate() + 30); // Default 30 days for admin uploads

                const { error: dbError } = await supabase.from('advertisements').insert([{
                    title: uploadFormData.title,
                    description: uploadFormData.description,
                    phone_number: formatPhoneNumber(uploadFormData.phone_number),
                    contact_method: uploadFormData.contact_method,
                    contact_url: uploadFormData.contact_url || null,
                    image_url: finalImageUrl,
                    category: uploadFormData.category,
                    package_id: uploadFormData.package_id,
                    status: 'ACTIVE',
                    paystack_reference: `ADMIN_UPLOAD_${Date.now()}_${Math.random().toString(36).substring(2, 6).toUpperCase()}`,
                    expires_at: expiryDate.toISOString()
                }]);
                if (dbError) throw new Error("DB Error: " + dbError.message);
            } else {
                let formattedNum = formatPhoneNumber(uploadFormData.phone_number);
                let actionLink = null;

                if (uploadFormData.contact_method === 'link') {
                    actionLink = uploadFormData.contact_url;
                } else if (uploadFormData.contact_method === 'whatsapp' && formattedNum) {
                    actionLink = `https://wa.me/${formattedNum}`;
                } else if (uploadFormData.contact_method === 'phone' && formattedNum) {
                    actionLink = `tel:+${formattedNum}`;
                }

                if (!actionLink || actionLink.trim() === '') actionLink = null;

                const { error: dbError } = await supabase.from('announcements').insert([{
                    title: uploadFormData.title,
                    description: uploadFormData.description,
                    flyer_url: finalImageUrl,
                    action_link: actionLink,
                    action_text: actionLink ? (uploadFormData.contact_method === 'link' ? 'Visit Link' : (uploadFormData.contact_method === 'whatsapp' ? 'WhatsApp' : 'Call')) : null
                }]);
                if (dbError) throw new Error("DB Error: " + dbError.message);
            }

            toast.success("Published successfully!");
            setUploadFormData({ post_type: 'announcement', title: '', description: '', phone_number: '', contact_method: 'whatsapp', contact_url: '', category: 'update', package_id: 'community_dir', imageFile: null, imagePreview: null });
        } catch (err) {
            toast.error(err.message);
        } finally {
            setIsUploading(false);
        }
    };

    // Render Login Screen
    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
                <form onSubmit={checkPassword} className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-sm">
                    <div className="flex justify-center mb-6">
                        <div className="w-16 h-16 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center">
                            <Lock size={32} />
                        </div>
                    </div>
                    <h2 className="text-2xl font-black text-center mb-6 text-gray-900">Admin Login</h2>
                    <input
                        type="password"
                        placeholder="Enter Master Password"
                        value={passwordInput}
                        onChange={e => setPasswordInput(e.target.value)}
                        className="w-full p-4 mb-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none"
                    />
                    <button type="submit" className="w-full py-4 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl shadow-lg transition-all">
                        Unlock Dashboard
                    </button>
                </form>
            </div>
        );
    }

    // Render Dashboard
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row mb-24 md:mb-0">
            {/* Admin Sidebar */}
            <div className="w-full md:w-64 bg-white border-r border-gray-200 flex flex-col sticky top-0 md:h-screen z-10">
                <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                    <h1 className="text-xl font-black text-gray-900 flex items-center gap-2">
                        <Lock size={20} className="text-primary-600" /> God Mode
                    </h1>
                    <button onClick={logout} className="md:hidden p-2 bg-red-50 text-red-500 rounded-full hover:bg-red-100 transition-colors">
                        <LogOut size={20} />
                    </button>
                </div>
                <div className="flex flex-row md:flex-col gap-2 p-4 overflow-x-auto custom-scrollbar">
                    <button onClick={() => navigate('/admin/moderation')} className={`flex items-center gap-3 p-3 rounded-xl font-bold whitespace-nowrap transition-colors ${activeTab === 'moderation' ? 'bg-primary-50 text-primary-600' : 'text-gray-600 hover:bg-gray-100'}`}>
                        <LayoutDashboard size={20} /> Ads Moderation
                    </button>
                    <button onClick={() => { setActiveTab('thrift'); navigate('/admin/thrift'); }} className={`flex items-center gap-3 p-3 rounded-xl font-bold whitespace-nowrap transition-colors ${activeTab === 'thrift' ? 'bg-primary-50 text-primary-600' : 'text-gray-600 hover:bg-gray-100'}`}>
                        <CheckCircle size={20} /> Thrift Verify
                    </button>
                    <button onClick={() => navigate('/admin/lostfound')} className={`flex items-center gap-3 p-3 rounded-xl font-bold whitespace-nowrap transition-colors ${activeTab === 'lostfound' ? 'bg-primary-50 text-primary-600' : 'text-gray-600 hover:bg-gray-100'}`}>
                        <HelpCircle size={20} /> Lost & Found
                    </button>
                    <button onClick={() => { setActiveTab('campus-data'); navigate('/admin/campus-data'); }} className={`flex items-center gap-3 p-3 rounded-xl font-bold whitespace-nowrap transition-colors ${activeTab === 'campus-data' ? 'bg-primary-50 text-primary-600' : 'text-gray-600 hover:bg-gray-100'}`}>
                        <MapPin size={20} /> Campus Data
                    </button>
                    <button onClick={() => navigate('/admin/upload')} className={`flex items-center gap-3 p-3 rounded-xl font-bold whitespace-nowrap transition-colors ${activeTab === 'upload' ? 'bg-primary-50 text-primary-600' : 'text-gray-600 hover:bg-gray-100'}`}>
                        <Megaphone size={20} /> Post Update / Ad
                    </button>
                </div>
                <div className="p-4 mt-auto border-t border-gray-200 hidden md:block">
                    <button onClick={logout} className="flex items-center gap-2 text-red-500 font-bold hover:bg-red-50 w-full p-3 rounded-xl transition-colors">
                        <LogOut size={20} /> Lock Session
                    </button>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 p-4 md:p-8 overflow-y-auto w-full">
                {isLoading && <div className="text-center py-10 font-bold text-gray-400">Loading data...</div>}

                {/* MODERATION TAB */}
                {!isLoading && activeTab === 'moderation' && (
                    <div className="space-y-4 max-w-5xl mx-auto">
                        <h2 className="text-2xl font-black mb-6">Manage Advertisements</h2>
                        <div className="grid gap-4">
                            {ads.map(ad => (
                                <div key={ad.id} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-200 flex flex-col md:flex-row gap-4 items-start md:items-center">
                                    {ad.image_url && <img src={ad.image_url} alt="Ad" className="w-full md:w-32 h-32 object-cover rounded-xl bg-gray-100" />}
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className={`px-2 py-0.5 text-[10px] font-black rounded-lg uppercase ${new Date(ad.expires_at) < new Date() ? 'bg-gray-200 text-gray-700' : ad.status?.toLowerCase() === 'active' ? 'bg-green-100 text-green-700' : ad.status?.toLowerCase() === 'rejected' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}`}>
                                                {new Date(ad.expires_at) < new Date() ? 'EXPIRED' : ad.status || 'UNKNOWN'}
                                            </span>
                                            <span className="text-xs text-gray-500 font-bold">{ad.package_id}</span>
                                        </div>
                                        <h3 className="text-lg font-bold text-gray-900">{ad.title}</h3>
                                        <p className="text-sm text-gray-500 line-clamp-2 mt-1">{ad.description}</p>
                                        <div className="text-xs text-gray-400 mt-2 font-mono break-all">Ref: {ad.paystack_reference}</div>
                                    </div>
                                    <div className="flex flex-row md:flex-col gap-2 w-full md:w-auto">
                                        {ad.status?.toLowerCase() !== 'active' && (
                                            <button onClick={() => updateAdStatus(ad.id, 'ACTIVE')} className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-green-50 hover:bg-green-100 text-green-600 font-bold py-2 px-4 rounded-xl transition-colors">
                                                <CheckCircle size={18} /> Approve
                                            </button>
                                        )}
                                        {ad.status?.toLowerCase() !== 'rejected' && (
                                            <button onClick={() => updateAdStatus(ad.id, 'REJECTED')} className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-amber-50 hover:bg-amber-100 text-amber-600 font-bold py-2 px-4 rounded-xl transition-colors">
                                                <XCircle size={18} /> Reject
                                            </button>
                                        )}
                                        <button onClick={() => deleteAd(ad.id)} className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 font-bold py-2 px-4 rounded-xl transition-colors">
                                            <Trash2 size={18} /> Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                            {ads.length === 0 && <p className="text-gray-500 text-center py-10">No advertisements found.</p>}
                        </div>
                    </div>
                )}

                {/* THRIFT MODERATION TAB */}
                {!isLoading && activeTab === 'thrift' && (
                    <div className="space-y-4 max-w-5xl mx-auto">
                        <h2 className="text-2xl font-black mb-6">Verify Student Thrift Items</h2>
                        <div className="grid gap-4">
                            {thriftItems.map(item => (
                                <div key={item.id} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-200 flex flex-col md:flex-row gap-4 items-start md:items-center">
                                    {item.image_url && <img src={item.image_url} alt="Item" className="w-full md:w-32 h-32 object-cover rounded-xl bg-gray-100" />}
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className={`px-2 py-0.5 text-[10px] font-black rounded-lg uppercase ${new Date(item.expires_at) < new Date() ? 'bg-gray-200 text-gray-700' : item.status?.toLowerCase() === 'active' ? 'bg-green-100 text-green-700' : item.status?.toLowerCase() === 'rejected' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}`}>
                                                {new Date(item.expires_at) < new Date() ? 'EXPIRED' : item.status || 'UNKNOWN'}
                                            </span>
                                            <span className="text-xs text-gray-500 font-bold">GH₵ {item.price}</span>
                                        </div>
                                        <h3 className="text-lg font-bold text-gray-900">{item.item_name}</h3>
                                        <p className="text-sm text-gray-500 line-clamp-2 mt-1">{item.description}</p>
                                        <div className="text-xs text-gray-400 mt-2 font-mono break-all">Contact: {item.contact_info}</div>
                                    </div>
                                    <div className="flex flex-row md:flex-col gap-2 w-full md:w-auto">
                                        {item.status?.toLowerCase() !== 'active' && (
                                            <button onClick={() => updateThriftStatus(item.id, 'ACTIVE')} className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-green-50 hover:bg-green-100 text-green-600 font-bold py-2 px-4 rounded-xl transition-colors">
                                                <CheckCircle size={18} /> Approve
                                            </button>
                                        )}
                                        {item.status?.toLowerCase() !== 'rejected' && (
                                            <button onClick={() => updateThriftStatus(item.id, 'REJECTED')} className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-amber-50 hover:bg-amber-100 text-amber-600 font-bold py-2 px-4 rounded-xl transition-colors">
                                                <XCircle size={18} /> Reject
                                            </button>
                                        )}
                                        <button onClick={() => deleteThrift(item.id)} className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 font-bold py-2 px-4 rounded-xl transition-colors">
                                            <Trash2 size={18} /> Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                            {thriftItems.length === 0 && <p className="text-gray-500 text-center py-10">No thrift items found.</p>}
                        </div>
                    </div>
                )}

                {/* LOST & FOUND TAB */}
                {!isLoading && activeTab === 'lostfound' && (
                    <div className="space-y-4 max-w-5xl mx-auto">
                        <h2 className="text-2xl font-black mb-6">Manage Lost & Found</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {lostFoundItems.map(item => (
                                <div key={item.id} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-200 flex flex-col">
                                    <span className={`self-start px-2 py-0.5 text-[10px] font-black rounded-lg uppercase mb-2 ${item.type === 'lost' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                                        {item.type}
                                    </span>
                                    <h3 className="text-lg font-bold text-gray-900">{item.item_name}</h3>
                                    <p className="text-sm text-gray-500 flex-1 mt-2 mb-4 line-clamp-3">{item.description}</p>
                                    {item.image_url && <img src={item.image_url} className="w-full h-32 object-cover rounded-xl mb-4" alt="Item" />}
                                    <div className="text-xs font-bold text-gray-400 mb-4">{new Date(item.created_at).toLocaleString()}</div>
                                    <button onClick={() => deleteLostFound(item.id)} className="w-full flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 font-bold py-2 px-4 rounded-xl transition-colors mt-auto">
                                        <Trash2 size={18} /> Remove
                                    </button>
                                </div>
                            ))}
                            {lostFoundItems.length === 0 && <p className="text-gray-500 text-center py-10 md:col-span-2 lg:col-span-3">No items found.</p>}
                        </div>
                    </div>
                )}

                {/* MANUAL UPLOAD TAB */}
                {activeTab === 'upload' && (
                    <div className="max-w-2xl mx-auto bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 mb-20 md:mb-0">
                        <h2 className="text-2xl font-black mb-6">Post Update / Ad</h2>
                        <form onSubmit={handleUploadAdSubmit} className="space-y-5">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Post Type</label>
                                <select value={uploadFormData.post_type} onChange={e => {
                                    const newType = e.target.value;
                                    setUploadFormData(prev => ({
                                        ...prev,
                                        post_type: newType,
                                        // Automatically reset category when switching types to prevent invalid states
                                        category: newType === 'advertisement' ? 'food' : 'update'
                                    }))
                                }} className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 font-bold text-gray-900">
                                    <option value="announcement">School Announcement / Update</option>
                                    <option value="advertisement">Sponsored Advertisement</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Title</label>
                                <input required type="text" value={uploadFormData.title} onChange={e => setUploadFormData(prev => ({ ...prev, title: e.target.value }))} className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500" />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">{uploadFormData.post_type === 'announcement' ? 'Announcement Content' : 'Description'}</label>
                                <textarea required rows="3" value={uploadFormData.description} onChange={e => setUploadFormData(prev => ({ ...prev, description: e.target.value }))} className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500" />
                            </div>

                            {uploadFormData.post_type === 'advertisement' && (
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-1">Ad Category</label>
                                        <select value={uploadFormData.category} onChange={e => setUploadFormData(prev => ({ ...prev, category: e.target.value }))} className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 font-bold text-gray-900">
                                            <option value="food">Food & Delivery</option>
                                            <option value="clothing">Clothing & Fashion</option>
                                            <option value="tech">Tech & Electronics</option>
                                            <option value="services">Student Services</option>
                                            <option value="event">Commercial Event</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-1">Placement Tier</label>
                                        <select value={uploadFormData.package_id} onChange={e => setUploadFormData(prev => ({ ...prev, package_id: e.target.value }))} className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200">
                                            <option value="community_dir">Community Feed (Standard)</option>
                                            <option value="home_banner">Home Banner (Premium)</option>
                                        </select>
                                    </div>
                                </div>
                            )}

                            {uploadFormData.post_type === 'announcement' && (
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Announcement Tag</label>
                                    <select value={uploadFormData.category} onChange={e => setUploadFormData(prev => ({ ...prev, category: e.target.value }))} className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200">
                                        <option value="update">School Update</option>
                                        <option value="event">School Event</option>
                                        <option value="emergency">Emergency / Alert</option>
                                    </select>
                                </div>
                            )}

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Contact/Action Method</label>
                                    <select value={uploadFormData.contact_method} onChange={e => setUploadFormData(prev => ({ ...prev, contact_method: e.target.value }))} className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200">
                                        <option value="whatsapp">WhatsApp</option>
                                        <option value="phone">Phone Call</option>
                                        <option value="link">External Link</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Detail</label>
                                    <input type="text" value={uploadFormData.contact_method === 'link' ? uploadFormData.contact_url : uploadFormData.phone_number} onChange={e => setUploadFormData(prev => uploadFormData.contact_method === 'link' ? ({ ...prev, contact_url: e.target.value }) : ({ ...prev, phone_number: e.target.value }))} placeholder={uploadFormData.contact_method === 'link' ? "https://..." : "+233..."} className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Flyer/Logo Image (Optional)</label>
                                <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:bg-gray-50 cursor-pointer relative">
                                    <input type="file" accept="image/*" onChange={handleImageUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                                    {uploadFormData.imagePreview ? (
                                        <div className="relative">
                                            <img src={uploadFormData.imagePreview} className="max-h-40 mx-auto rounded-lg shadow-sm" alt="Preview" />
                                            <button
                                                type="button"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setUploadFormData(prev => ({ ...prev, imageFile: null, imagePreview: null }));
                                                }}
                                                className="absolute top-1 right-1 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 shadow-md transition-colors"
                                                title="Remove image"
                                            >
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
                                {isUploading ? "Publishing..." : <><CheckCircle size={20} /> Publish {uploadFormData.post_type === 'announcement' ? 'Announcement' : 'Advertisement'}</>}
                            </button>
                        </form>
                    </div>
                )}

                {/* CAMPUS DATA MANAGEMENT TAB */}
                {activeTab === 'campus-data' && (
                    <div className="space-y-6 max-w-6xl mx-auto">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-black">Campus Data Manager</h2>
                            <button onClick={() => {
                                setShowAddForm(true);
                                setEditingItem({});
                                setEditForm({ campus_id: 'ucc', is_active: true });
                            }} className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded-xl transition-colors text-sm">
                                <Plus size={16} /> Add New
                            </button>
                        </div>

                        {/* Sub-tabs */}
                        <div className="flex gap-2 border-b border-gray-200 pb-2">
                            {[
                                { key: 'buildings', label: 'Buildings', icon: MapPin, count: campusBuildings.length },
                                { key: 'knowledge', label: 'Knowledge', icon: BookOpen, count: campusKnowledge.length },
                                { key: 'guide-cards', label: 'Guide Cards', icon: FileText, count: campusGuideCards.length },
                            ].map(sub => (
                                <button key={sub.key} onClick={() => setCampusDataTab(sub.key)} className={`flex items-center gap-2 px-4 py-2 rounded-t-xl font-bold text-sm transition-colors ${campusDataTab === sub.key ? 'bg-primary-50 text-primary-700 border-b-2 border-primary-600' : 'text-gray-500 hover:bg-gray-50'}`}>
                                    <sub.icon size={16} /> {sub.label}
                                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-black ${campusDataTab === sub.key ? 'bg-primary-200 text-primary-800' : 'bg-gray-200 text-gray-600'}`}>{sub.count}</span>
                                </button>
                            ))}
                        </div>

                        {isLoading && <div className="text-center py-10 font-bold text-gray-400">Loading...</div>}

                        {/* ADD / EDIT FORM */}
                        {(showAddForm || editingItem?.id) && (
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-primary-200 space-y-4">
                                <h3 className="font-black text-lg">{editingItem?.id ? 'Edit Item' : 'Add New Item'}</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {campusDataTab === 'buildings' && (
                                        <>
                                            <div><label className="block text-xs font-bold text-gray-600 mb-1">Full Name *</label><input value={editForm.full_name || ''} onChange={e => setEditForm(p => ({ ...p, full_name: e.target.value }))} className="w-full p-2.5 bg-gray-50 rounded-xl border border-gray-200 text-sm" /></div>
                                            <div><label className="block text-xs font-bold text-gray-600 mb-1">Short Form</label><input value={editForm.short_form || ''} onChange={e => setEditForm(p => ({ ...p, short_form: e.target.value }))} className="w-full p-2.5 bg-gray-50 rounded-xl border border-gray-200 text-sm" /></div>
                                            <div><label className="block text-xs font-bold text-gray-600 mb-1">Description</label><input value={editForm.description || ''} onChange={e => setEditForm(p => ({ ...p, description: e.target.value }))} className="w-full p-2.5 bg-gray-50 rounded-xl border border-gray-200 text-sm" /></div>
                                            <div><label className="block text-xs font-bold text-gray-600 mb-1">Category</label><select value={editForm.category || 'academic'} onChange={e => setEditForm(p => ({ ...p, category: e.target.value }))} className="w-full p-2.5 bg-gray-50 rounded-xl border border-gray-200 text-sm"><option value="academic">Academic</option><option value="administrative">Administrative</option><option value="residential-new">Residential (New)</option><option value="residential-old">Residential (Old)</option><option value="health">Health</option><option value="transit">Transit</option><option value="commercial">Commercial</option><option value="worship">Worship</option><option value="banking">Banking</option><option value="recreation">Recreation</option></select></div>
                                            <div><label className="block text-xs font-bold text-gray-600 mb-1">Latitude *</label><input type="number" step="any" value={editForm.latitude || ''} onChange={e => setEditForm(p => ({ ...p, latitude: parseFloat(e.target.value) || '' }))} className="w-full p-2.5 bg-gray-50 rounded-xl border border-gray-200 text-sm" /></div>
                                            <div><label className="block text-xs font-bold text-gray-600 mb-1">Longitude *</label><input type="number" step="any" value={editForm.longitude || ''} onChange={e => setEditForm(p => ({ ...p, longitude: parseFloat(e.target.value) || '' }))} className="w-full p-2.5 bg-gray-50 rounded-xl border border-gray-200 text-sm" /></div>
                                            <div><label className="block text-xs font-bold text-gray-600 mb-1">Sort Order</label><input type="number" value={editForm.sort_order || 0} onChange={e => setEditForm(p => ({ ...p, sort_order: parseInt(e.target.value) || 0 }))} className="w-full p-2.5 bg-gray-50 rounded-xl border border-gray-200 text-sm" /></div>
                                            <div className="flex items-center gap-2 pt-5"><input type="checkbox" checked={editForm.is_active !== false} onChange={e => setEditForm(p => ({ ...p, is_active: e.target.checked }))} className="w-4 h-4 rounded" /><label className="text-xs font-bold text-gray-600">Active</label></div>
                                        </>
                                    )}
                                    {campusDataTab === 'knowledge' && (
                                        <>
                                            <div><label className="block text-xs font-bold text-gray-600 mb-1">ID / Key *</label><input value={editForm.id || ''} onChange={e => setEditForm(p => ({ ...p, id: e.target.value }))} disabled={!!editingItem?.id} className="w-full p-2.5 bg-gray-50 rounded-xl border border-gray-200 text-sm disabled:opacity-50" /></div>
                                            <div><label className="block text-xs font-bold text-gray-600 mb-1">Title *</label><input value={editForm.title || ''} onChange={e => setEditForm(p => ({ ...p, title: e.target.value }))} className="w-full p-2.5 bg-gray-50 rounded-xl border border-gray-200 text-sm" /></div>
                                            <div className="md:col-span-2"><label className="block text-xs font-bold text-gray-600 mb-1">History</label><textarea rows={2} value={editForm.history || ''} onChange={e => setEditForm(p => ({ ...p, history: e.target.value }))} className="w-full p-2.5 bg-gray-50 rounded-xl border border-gray-200 text-sm" /></div>
                                            <div className="md:col-span-2"><label className="block text-xs font-bold text-gray-600 mb-1">Architecture</label><textarea rows={2} value={editForm.architecture || ''} onChange={e => setEditForm(p => ({ ...p, architecture: e.target.value }))} className="w-full p-2.5 bg-gray-50 rounded-xl border border-gray-200 text-sm" /></div>
                                            <div className="md:col-span-2"><label className="block text-xs font-bold text-gray-600 mb-1">Statistics (JSON)</label><textarea rows={2} value={typeof editForm.statistics === 'string' ? editForm.statistics : JSON.stringify(editForm.statistics || {}, null, 2)} onChange={e => { try { setEditForm(p => ({ ...p, statistics: JSON.parse(e.target.value) })); } catch { /* allow editing */ } }} className="w-full p-2.5 bg-gray-50 rounded-xl border border-gray-200 text-sm font-mono" /></div>
                                            <div className="md:col-span-2"><label className="block text-xs font-bold text-gray-600 mb-1">Rules (JSON array)</label><textarea rows={2} value={typeof editForm.rules === 'string' ? editForm.rules : JSON.stringify(editForm.rules || [], null, 2)} onChange={e => { try { setEditForm(p => ({ ...p, rules: JSON.parse(e.target.value) })); } catch { /* allow editing */ } }} className="w-full p-2.5 bg-gray-50 rounded-xl border border-gray-200 text-sm font-mono" /></div>
                                            <div><label className="block text-xs font-bold text-gray-600 mb-1">Accessibility</label><input value={editForm.accessibility || ''} onChange={e => setEditForm(p => ({ ...p, accessibility: e.target.value }))} className="w-full p-2.5 bg-gray-50 rounded-xl border border-gray-200 text-sm" /></div>
                                            <div className="flex items-center gap-2 pt-5"><input type="checkbox" checked={editForm.is_active !== false} onChange={e => setEditForm(p => ({ ...p, is_active: e.target.checked }))} className="w-4 h-4 rounded" /><label className="text-xs font-bold text-gray-600">Active</label></div>
                                        </>
                                    )}
                                    {campusDataTab === 'guide-cards' && (
                                        <>
                                            <div><label className="block text-xs font-bold text-gray-600 mb-1">Title *</label><input value={editForm.title || ''} onChange={e => setEditForm(p => ({ ...p, title: e.target.value }))} className="w-full p-2.5 bg-gray-50 rounded-xl border border-gray-200 text-sm" /></div>
                                            <div><label className="block text-xs font-bold text-gray-600 mb-1">Subtitle</label><input value={editForm.subtitle || ''} onChange={e => setEditForm(p => ({ ...p, subtitle: e.target.value }))} className="w-full p-2.5 bg-gray-50 rounded-xl border border-gray-200 text-sm" /></div>
                                            <div><label className="block text-xs font-bold text-gray-600 mb-1">Icon</label><select value={editForm.icon || 'book-open'} onChange={e => setEditForm(p => ({ ...p, icon: e.target.value }))} className="w-full p-2.5 bg-gray-50 rounded-xl border border-gray-200 text-sm"><option value="book-open">Book Open</option><option value="shield">Shield</option><option value="alert-triangle">Alert Triangle</option><option value="phone">Phone</option><option value="globe">Globe</option><option value="heart">Heart</option><option value="building">Building</option><option value="users">Users</option><option value="clipboard">Clipboard</option><option value="graduation-cap">Graduation Cap</option></select></div>
                                            <div><label className="block text-xs font-bold text-gray-600 mb-1">Category</label><select value={editForm.category || 'rules'} onChange={e => setEditForm(p => ({ ...p, category: e.target.value }))} className="w-full p-2.5 bg-gray-50 rounded-xl border border-gray-200 text-sm"><option value="rules">Rules</option><option value="procedures">Procedures</option><option value="contacts">Contacts</option><option value="resources">Resources</option><option value="policy">Policy</option><option value="safety">Safety</option></select></div>
                                            <div className="md:col-span-2"><label className="block text-xs font-bold text-gray-600 mb-1">Content Sections (JSON array of {"{title, items}"})</label><textarea rows={6} value={typeof editForm.content === 'string' ? editForm.content : JSON.stringify(editForm.content || [], null, 2)} onChange={e => { try { setEditForm(p => ({ ...p, content: JSON.parse(e.target.value) })); } catch { /* allow editing */ } }} className="w-full p-2.5 bg-gray-50 rounded-xl border border-gray-200 text-sm font-mono" /></div>
                                            <div className="md:col-span-2"><label className="block text-xs font-bold text-gray-600 mb-1">Search Keywords (JSON array)</label><textarea rows={2} value={typeof editForm.search_keywords === 'string' ? editForm.search_keywords : JSON.stringify(editForm.search_keywords || [], null, 2)} onChange={e => { try { setEditForm(p => ({ ...p, search_keywords: JSON.parse(e.target.value) })); } catch { /* allow editing */ } }} className="w-full p-2.5 bg-gray-50 rounded-xl border border-gray-200 text-sm font-mono" /></div>
                                            <div><label className="block text-xs font-bold text-gray-600 mb-1">Sort Order</label><input type="number" value={editForm.sort_order || 0} onChange={e => setEditForm(p => ({ ...p, sort_order: parseInt(e.target.value) || 0 }))} className="w-full p-2.5 bg-gray-50 rounded-xl border border-gray-200 text-sm" /></div>
                                            <div className="flex items-center gap-2 pt-5"><input type="checkbox" checked={editForm.is_active !== false} onChange={e => setEditForm(p => ({ ...p, is_active: e.target.checked }))} className="w-4 h-4 rounded" /><label className="text-xs font-bold text-gray-600">Active</label></div>
                                        </>
                                    )}
                                </div>
                                <div className="flex gap-3 pt-2">
                                    <button onClick={handleCampusDataSave} disabled={isSaving} className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 disabled:bg-primary-300 text-white font-bold py-2 px-6 rounded-xl transition-colors text-sm">
                                        <Save size={16} /> {isSaving ? 'Saving...' : 'Save'}
                                    </button>
                                    <button onClick={() => { setShowAddForm(false); setEditingItem(null); setEditForm({}); }} className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-2 px-6 rounded-xl transition-colors text-sm">
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* BUILDINGS LIST */}
                        {!isLoading && campusDataTab === 'buildings' && (
                            <div className="grid gap-3">
                                {campusBuildings.map(b => (
                                    <div key={b.id} className={`bg-white p-4 rounded-xl shadow-sm border flex flex-col md:flex-row gap-3 items-start md:items-center ${b.is_active ? 'border-gray-200' : 'border-red-200 opacity-60'}`}>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="font-bold text-gray-900">{b.full_name}</span>
                                                {b.short_form && <span className="text-[10px] bg-gray-100 px-1.5 py-0.5 rounded font-black uppercase text-gray-600">{b.short_form}</span>}
                                                <span className="text-[10px] bg-primary-50 text-primary-700 px-1.5 py-0.5 rounded font-bold">{b.category}</span>
                                            </div>
                                            <p className="text-xs text-gray-500 truncate">{b.description}</p>
                                            <p className="text-[10px] text-gray-400 font-mono mt-1">{b.latitude}, {b.longitude}</p>
                                        </div>
                                        <div className="flex gap-2 shrink-0">
                                            <button onClick={() => handleToggleActive(b.id, b.is_active)} className={`p-2 rounded-lg ${b.is_active ? 'bg-green-50 text-green-600 hover:bg-green-100' : 'bg-red-50 text-red-600 hover:bg-red-100'}`}>
                                                {b.is_active ? <Eye size={16} /> : <EyeOff size={16} />}
                                            </button>
                                            <button onClick={() => { setEditingItem(b); setEditForm({ ...b }); }} className="p-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg">
                                                <Edit3 size={16} />
                                            </button>
                                            <button onClick={() => handleCampusDataDelete(b.id)} className="p-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg">
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                                {campusBuildings.length === 0 && <p className="text-gray-500 text-center py-10">No buildings found. Check your Supabase table.</p>}
                            </div>
                        )}

                        {/* KNOWLEDGE LIST */}
                        {!isLoading && campusDataTab === 'knowledge' && (
                            <div className="grid gap-3">
                                {campusKnowledge.map(k => (
                                    <div key={k.id} className={`bg-white p-4 rounded-xl shadow-sm border flex flex-col md:flex-row gap-3 items-start md:items-center ${k.is_active ? 'border-gray-200' : 'border-red-200 opacity-60'}`}>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="font-bold text-gray-900">{k.title}</span>
                                                <span className="text-[10px] bg-gray-100 px-1.5 py-0.5 rounded font-mono text-gray-600">{k.id}</span>
                                            </div>
                                            <p className="text-xs text-gray-500 line-clamp-2">{k.history || k.architecture || 'No description'}</p>
                                            {k.tags && <div className="flex gap-1 mt-1">{k.tags.map(t => <span key={t} className="text-[9px] bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded">{t}</span>)}</div>}
                                        </div>
                                        <div className="flex gap-2 shrink-0">
                                            <button onClick={() => handleToggleActive(k.id, k.is_active)} className={`p-2 rounded-lg ${k.is_active ? 'bg-green-50 text-green-600 hover:bg-green-100' : 'bg-red-50 text-red-600 hover:bg-red-100'}`}>
                                                {k.is_active ? <Eye size={16} /> : <EyeOff size={16} />}
                                            </button>
                                            <button onClick={() => { setEditingItem(k); setEditForm({ ...k }); }} className="p-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg">
                                                <Edit3 size={16} />
                                            </button>
                                            <button onClick={() => handleCampusDataDelete(k.id)} className="p-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg">
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                                {campusKnowledge.length === 0 && <p className="text-gray-500 text-center py-10">No knowledge entries found.</p>}
                            </div>
                        )}

                        {/* GUIDE CARDS LIST */}
                        {!isLoading && campusDataTab === 'guide-cards' && (
                            <div className="grid gap-3">
                                {campusGuideCards.map(c => (
                                    <div key={c.id} className={`bg-white p-4 rounded-xl shadow-sm border flex flex-col md:flex-row gap-3 items-start md:items-center ${c.is_active ? 'border-gray-200' : 'border-red-200 opacity-60'}`}>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="font-bold text-gray-900">{c.title}</span>
                                                <span className="text-[10px] bg-primary-50 text-primary-700 px-1.5 py-0.5 rounded font-bold">{c.category}</span>
                                            </div>
                                            <p className="text-xs text-gray-500 line-clamp-1">{c.subtitle}</p>
                                            <p className="text-[10px] text-gray-400 mt-1">{c.content?.length || 0} sections • Sort: {c.sort_order}</p>
                                        </div>
                                        <div className="flex gap-2 shrink-0">
                                            <button onClick={() => handleToggleActive(c.id, c.is_active)} className={`p-2 rounded-lg ${c.is_active ? 'bg-green-50 text-green-600 hover:bg-green-100' : 'bg-red-50 text-red-600 hover:bg-red-100'}`}>
                                                {c.is_active ? <Eye size={16} /> : <EyeOff size={16} />}
                                            </button>
                                            <button onClick={() => { setEditingItem(c); setEditForm({ ...c }); }} className="p-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg">
                                                <Edit3 size={16} />
                                            </button>
                                            <button onClick={() => handleCampusDataDelete(c.id)} className="p-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg">
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                                {campusGuideCards.length === 0 && <p className="text-gray-500 text-center py-10">No guide cards found.</p>}
                            </div>
                        )}
                    </div>
                )}
            </div>

        </div>
    );
};

export default AdminDashboard;
