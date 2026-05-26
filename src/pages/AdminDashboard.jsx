import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Lock, LogOut, CheckCircle, XCircle, Trash2, UploadCloud, Eye, EyeOff, LayoutDashboard, Megaphone, HelpCircle } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useLocation, useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const [isAuthenticated, setIsAuthenticated] = useLocalStorage('ucc_admin_auth', false);
    const [passwordInput, setPasswordInput] = useState('');
    const [activeTab, setActiveTab] = useState('moderation');
    
    const [ads, setAds] = useState([]);
    const [lostFoundItems, setLostFoundItems] = useState([]);
    const [thriftItems, setThriftItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (location.pathname.includes('lostfound')) setActiveTab('lostfound');
        else if (location.pathname.includes('upload')) setActiveTab('upload');
        else if (location.pathname.includes('thrift')) setActiveTab('thrift');
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
            alert("Incorrect password");
        }
    };

    const logout = () => {
        setIsAuthenticated(false);
        setPasswordInput('');
    };

    const fetchAds = async () => {
        setIsLoading(true);
        const { data, error } = await supabase.from('advertisements').select('*').order('created_at', { ascending: false });
        if (data) setAds(data);
        setIsLoading(false);
    };

    const fetchLostFound = async () => {
        setIsLoading(true);
        const { data, error } = await supabase.from('lost_and_found').select('*').order('created_at', { ascending: false });
        if (data) setLostFoundItems(data);
        setIsLoading(false);
    };

    const fetchThrift = async () => {
        setIsLoading(true);
        const { data, error } = await supabase.from('thrift_listings').select('*').order('created_at', { ascending: false });
        if (data) setThriftItems(data);
        setIsLoading(false);
    };

    useEffect(() => {
        if (isAuthenticated) {
            if (activeTab === 'moderation') fetchAds();
            if (activeTab === 'lostfound') fetchLostFound();
            if (activeTab === 'thrift') fetchThrift();
        }
    }, [isAuthenticated, activeTab]);

    // Actions
    const updateAdStatus = async (id, newStatus) => {
        const { error } = await supabase.from('advertisements').update({ status: newStatus }).eq('id', id);
        if (error) alert(error.message);
        else fetchAds();
    };

    const deleteAd = async (id) => {
        if (!window.confirm("Delete this ad completely?")) return;
        const { error } = await supabase.from('advertisements').delete().eq('id', id);
        if (error) alert(error.message);
        else fetchAds();
    };

    const deleteLostFound = async (id) => {
        if (!window.confirm("Delete this lost/found item?")) return;
        const { error } = await supabase.from('lost_and_found').delete().eq('id', id);
        if (error) alert(error.message);
        else fetchLostFound();
    };

    const updateThriftStatus = async (id, newStatus) => {
        const { error } = await supabase.from('thrift_listings').update({ status: newStatus }).eq('id', id);
        if (error) alert(error.message);
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

                // Upload directly to Cloudflare R2
                const uploadRes = await fetch(presignedUrl, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': uploadFormData.imageFile.type
                    },
                    body: uploadFormData.imageFile
                });

                if (!uploadRes.ok) {
                    throw new Error("Failed to upload image to Cloudflare R2");
                }

                finalImageUrl = publicUrl;
            }

            if (uploadFormData.post_type === 'advertisement') {
                const expiryDate = new Date();
                expiryDate.setDate(expiryDate.getDate() + 30); // Default 30 days for admin uploads

                const { error: dbError } = await supabase.from('advertisements').insert([{
                    title: uploadFormData.title,
                    description: uploadFormData.description,
                    phone_number: uploadFormData.phone_number,
                    contact_method: uploadFormData.contact_method,
                    contact_url: uploadFormData.contact_url || null,
                    image_url: finalImageUrl,
                    category: uploadFormData.category,
                    package_id: uploadFormData.package_id,
                    status: 'ACTIVE',
                    paystack_reference: 'ADMIN_UPLOAD',
                    expires_at: expiryDate.toISOString()
                }]);
                if (dbError) throw new Error("DB Error: " + dbError.message);
            } else {
                let actionLink = uploadFormData.contact_method === 'link' ? uploadFormData.contact_url : uploadFormData.phone_number;
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

            alert("Published successfully!");
            setUploadFormData({ post_type: 'announcement', title: '', description: '', phone_number: '', contact_method: 'whatsapp', contact_url: '', category: 'update', package_id: 'community_dir', imageFile: null, imagePreview: null });
        } catch (err) {
            alert(err.message);
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
                        <Lock size={20} className="text-primary-600"/> God Mode
                    </h1>
                    <button onClick={logout} className="md:hidden p-2 bg-red-50 text-red-500 rounded-full hover:bg-red-100 transition-colors">
                        <LogOut size={20}/>
                    </button>
                </div>
                <div className="flex flex-row md:flex-col gap-2 p-4 overflow-x-auto custom-scrollbar">
                    <button onClick={() => navigate('/admin/moderation')} className={`flex items-center gap-3 p-3 rounded-xl font-bold whitespace-nowrap transition-colors ${activeTab === 'moderation' ? 'bg-primary-50 text-primary-600' : 'text-gray-600 hover:bg-gray-100'}`}>
                        <LayoutDashboard size={20}/> Ads Moderation
                    </button>
                    <button onClick={() => { setActiveTab('thrift'); navigate('/admin/thrift'); }} className={`flex items-center gap-3 p-3 rounded-xl font-bold whitespace-nowrap transition-colors ${activeTab === 'thrift' ? 'bg-primary-50 text-primary-600' : 'text-gray-600 hover:bg-gray-100'}`}>
                        <CheckCircle size={20}/> Thrift Verify
                    </button>
                    <button onClick={() => navigate('/admin/lostfound')} className={`flex items-center gap-3 p-3 rounded-xl font-bold whitespace-nowrap transition-colors ${activeTab === 'lostfound' ? 'bg-primary-50 text-primary-600' : 'text-gray-600 hover:bg-gray-100'}`}>
                        <HelpCircle size={20}/> Lost & Found
                    </button>
                    <button onClick={() => navigate('/admin/upload')} className={`flex items-center gap-3 p-3 rounded-xl font-bold whitespace-nowrap transition-colors ${activeTab === 'upload' ? 'bg-primary-50 text-primary-600' : 'text-gray-600 hover:bg-gray-100'}`}>
                        <Megaphone size={20}/> Post Update / Ad
                    </button>
                </div>
                <div className="p-4 mt-auto border-t border-gray-200 hidden md:block">
                    <button onClick={logout} className="flex items-center gap-2 text-red-500 font-bold hover:bg-red-50 w-full p-3 rounded-xl transition-colors">
                        <LogOut size={20}/> Lock Session
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
                                                <CheckCircle size={18}/> Approve
                                            </button>
                                        )}
                                        {ad.status?.toLowerCase() !== 'rejected' && (
                                            <button onClick={() => updateAdStatus(ad.id, 'REJECTED')} className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-amber-50 hover:bg-amber-100 text-amber-600 font-bold py-2 px-4 rounded-xl transition-colors">
                                                <XCircle size={18}/> Reject
                                            </button>
                                        )}
                                        <button onClick={() => deleteAd(ad.id)} className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 font-bold py-2 px-4 rounded-xl transition-colors">
                                            <Trash2 size={18}/> Delete
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
                                                <CheckCircle size={18}/> Approve
                                            </button>
                                        )}
                                        {item.status?.toLowerCase() !== 'rejected' && (
                                            <button onClick={() => updateThriftStatus(item.id, 'REJECTED')} className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-amber-50 hover:bg-amber-100 text-amber-600 font-bold py-2 px-4 rounded-xl transition-colors">
                                                <XCircle size={18}/> Reject
                                            </button>
                                        )}
                                        <button onClick={() => deleteThrift(item.id)} className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 font-bold py-2 px-4 rounded-xl transition-colors">
                                            <Trash2 size={18}/> Delete
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
                                        <Trash2 size={18}/> Remove
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
                                <input required type="text" value={uploadFormData.title} onChange={e => setUploadFormData(prev => ({...prev, title: e.target.value}))} className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500" />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">{uploadFormData.post_type === 'announcement' ? 'Announcement Content' : 'Description'}</label>
                                <textarea required rows="3" value={uploadFormData.description} onChange={e => setUploadFormData(prev => ({...prev, description: e.target.value}))} className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500" />
                            </div>

                            {uploadFormData.post_type === 'advertisement' && (
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-1">Ad Category</label>
                                        <select value={uploadFormData.category} onChange={e => setUploadFormData(prev => ({...prev, category: e.target.value}))} className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200">
                                            <option value="food">Food & Delivery</option>
                                            <option value="services">Student Services</option>
                                            <option value="tech">Tech & Electronics</option>
                                            <option value="clothing">Clothing & Fashion</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-1">Placement Tier</label>
                                        <select value={uploadFormData.package_id} onChange={e => setUploadFormData(prev => ({...prev, package_id: e.target.value}))} className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200">
                                            <option value="community_dir">Community Feed (Standard)</option>
                                            <option value="home_banner">Home Banner (Premium)</option>
                                        </select>
                                    </div>
                                </div>
                            )}

                            {uploadFormData.post_type === 'announcement' && (
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Announcement Tag</label>
                                    <select value={uploadFormData.category} onChange={e => setUploadFormData(prev => ({...prev, category: e.target.value}))} className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200">
                                        <option value="update">School Update</option>
                                        <option value="event">School Event</option>
                                        <option value="emergency">Emergency / Alert</option>
                                    </select>
                                </div>
                            )}

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Contact/Action Method</label>
                                    <select value={uploadFormData.contact_method} onChange={e => setUploadFormData(prev => ({...prev, contact_method: e.target.value}))} className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200">
                                        <option value="whatsapp">WhatsApp</option>
                                        <option value="phone">Phone Call</option>
                                        <option value="link">External Link</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Detail</label>
                                    <input type="text" value={uploadFormData.contact_method === 'link' ? uploadFormData.contact_url : uploadFormData.phone_number} onChange={e => setUploadFormData(prev => uploadFormData.contact_method === 'link' ? ({...prev, contact_url: e.target.value}) : ({...prev, phone_number: e.target.value}))} placeholder={uploadFormData.contact_method === 'link' ? "https://..." : "+233..."} className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Flyer/Logo Image</label>
                                <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:bg-gray-50 cursor-pointer relative">
                                    <input type="file" accept="image/*" onChange={handleImageUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                                    {uploadFormData.imagePreview ? (
                                        <img src={uploadFormData.imagePreview} className="max-h-40 mx-auto rounded-lg shadow-sm" alt="Preview"/>
                                    ) : (
                                        <div className="flex flex-col items-center text-gray-500">
                                            <UploadCloud size={32} className="mb-2" />
                                            <span className="font-bold">Tap to select image</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <button disabled={isUploading || (!uploadFormData.imageFile)} type="submit" className="w-full py-4 bg-primary-600 hover:bg-primary-700 disabled:bg-primary-300 text-white font-bold rounded-xl shadow-xl transition-all flex items-center justify-center gap-2">
                                {isUploading ? "Publishing..." : <><CheckCircle size={20}/> Publish {uploadFormData.post_type === 'announcement' ? 'Announcement' : 'Advertisement'}</>}
                            </button>
                        </form>
                    </div>
                )}
            </div>
            
        </div>
    );
};

export default AdminDashboard;
