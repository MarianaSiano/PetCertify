import React, { useState, useEffect } from 'react';
import { CertificateForm } from './Components/CertificateForm';
import { CSVUpload } from './Components/CSVUpload';
import { CertificateTemplate } from './Components/CertficateTemplate';
import { PetCertificateData } from './types';
import { PawPrint, Plus, List, Trash2, Download, CheckCircle2, LayoutDashboard, Sparkles, User, Calendar } from 'lucide-react';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
    const [certificates, setCertificates] = useState<PetCertificateData[]>([]);
    const [activeTab, setActiveTab] = useState<'create' | 'list'>('create');
    const [selectedCertificate, setSelectedCertificate] = useState<PetCertificateData | null>(null);
    const [isBulkProcessing, setIsBulkProcessing] = useState(false);

    // Load from local storage
    useEffect(() => {
        const saved = localStorage.getItem('pet-certificates');
        if (saved) {
            setCertificates(JSON.parse(saved));
        }
    }, []);

    // Save to local storage
    useEffect(() => {
        localStorage.setItem('pet-certificates', JSON.stringify(certificates));
    }, [certificates]);

    const handleAddCertificate = (data: PetCertificateData) => {
        setCertificates((prev) => [data, ...prev]);
        setSelectedCertificate(data);
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#4F46E5', '#10B981', '#F59E0B', '#EF4444']
        });
    };

    const handleBulkData = (data: PetCertificateData[]) => {
        setCertificates((prev) => [...data, ...prev]);
        setActiveTab('list');
        confetti({
            particleCount: 200,
            spread: 100,
            origin: { y: 0.6 },
            colors: ['#4F46E5', '#10B981', '#F59E0B', '#EF4444']
        });
    };

    const handleDelete = (id: string) => {
        setCertificates((prev) => prev.filter((c) => c.id !== id));
        if (selectedCertificate?.id === id) setSelectedCertificate(null);
    };

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-20">
            {/* Header */}
            <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="bg-indigo-600 p-2 rounded-xl text-white shadow-lg shadow-indigo-200">
                            <PawPrint size={28} />
                        </div>
                        <div>
                            <h1 className="text-2xl font-black text-indigo-900 tracking-tight leading-none">PetCertify</h1>
                            <p className="text-xs text-indigo-400 font-bold uppercase tracking-widest mt-1">Certificados para Pets</p>
                        </div>
                    </div>

                    <nav className="flex bg-slate-100 p-1 rounded-2xl">
                        <button
                            onClick={() => setActiveTab('create')}
                            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-black transition-all ${activeTab === 'create'
                                    ? 'bg-white text-indigo-600 shadow-sm'
                                    : 'text-slate-500 hover:text-indigo-400'
                                }`}
                        >
                            <Plus size={18} /> CRIAR
                        </button>
                        <button
                            onClick={() => setActiveTab('list')}
                            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-black transition-all ${activeTab === 'list'
                                    ? 'bg-white text-indigo-600 shadow-sm'
                                    : 'text-slate-500 hover:text-indigo-400'
                                }`}
                        >
                            <List size={18} /> LISTA
                            {certificates.length > 0 && (
                                <span className="bg-indigo-100 text-indigo-600 px-2 py-0.5 rounded-full text-[10px]">
                                    {certificates.length}
                                </span>
                            )}
                        </button>
                    </nav>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
                <AnimatePresence mode="wait">
                    {activeTab === 'create' ? (
                        <motion.div
                            key="create"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="grid grid-cols-1 lg:grid-cols-12 gap-12"
                        >
                            <div className="lg:col-span-7 space-y-12">
                                <section>
                                    <div className="flex items-center gap-3 mb-6">
                                        <Sparkles className="text-indigo-600" />
                                        <h2 className="text-3xl font-black text-indigo-900">Novo Certificado</h2>
                                    </div>
                                    <CertificateForm onSubmit={handleAddCertificate} />
                                </section>

                                <section>
                                    <div className="flex items-center gap-3 mb-6">
                                        <LayoutDashboard className="text-indigo-600" />
                                        <h2 className="text-3xl font-black text-indigo-900">Cadastro em Massa</h2>
                                    </div>
                                    <CSVUpload onDataParsed={handleBulkData} />
                                </section>
                            </div>

                            <div className="lg:col-span-5">
                                <div className="sticky top-32">
                                    <div className="flex items-center gap-3 mb-6">
                                        <CheckCircle2 className="text-indigo-600" />
                                        <h2 className="text-3xl font-black text-indigo-900">Visualização</h2>
                                    </div>
                                    {selectedCertificate ? (
                                        <div className="space-y-6">
                                            <div className="transform scale-75 origin-top">
                                                <CertificateTemplate
                                                    data={selectedCertificate}
                                                    onDownloadComplete={() => { }}
                                                />
                                            </div>
                                            <div className="bg-white p-6 rounded-3xl shadow-xl border-2 border-indigo-50 flex items-center justify-between">
                                                <div>
                                                    <p className="text-xs text-indigo-400 font-bold uppercase mb-1">Certificado Gerado</p>
                                                    <p className="text-xl font-black text-indigo-900">{selectedCertificate.petName}</p>
                                                </div>
                                                <button
                                                    onClick={() => setSelectedCertificate(null)}
                                                    className="text-slate-400 hover:text-red-500 transition-colors"
                                                >
                                                    <Trash2 size={24} />
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="bg-white border-4 border-dashed border-slate-200 rounded-3xl p-12 flex flex-col items-center justify-center text-center opacity-50">
                                            <div className="bg-slate-100 p-6 rounded-full mb-4">
                                                <PawPrint size={48} className="text-slate-300" />
                                            </div>
                                            <p className="text-slate-400 font-bold">Preencha o formulário para ver a prévia do certificado aqui!</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="list"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="space-y-8"
                        >
                            <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center gap-3">
                                    <List className="text-indigo-600" size={32} />
                                    <h2 className="text-4xl font-black text-indigo-900">Certificados Gerados</h2>
                                </div>
                                {certificates.length > 0 && (
                                    <button
                                        onClick={() => {
                                            if (confirm('Tem certeza que deseja limpar todos os certificados?')) {
                                                setCertificates([]);
                                                setSelectedCertificate(null);
                                            }
                                        }}
                                        className="flex items-center gap-2 text-red-500 font-bold hover:bg-red-50 px-4 py-2 rounded-xl transition-all"
                                    >
                                        <Trash2 size={18} /> Limpar Tudo
                                    </button>
                                )}
                            </div>

                            {certificates.length === 0 ? (
                                <div className="bg-white rounded-3xl p-20 text-center shadow-xl border-2 border-indigo-50">
                                    <div className="bg-indigo-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <PawPrint size={48} className="text-indigo-200" />
                                    </div>
                                    <h3 className="text-2xl font-black text-indigo-900 mb-2">Nenhum certificado ainda</h3>
                                    <p className="text-slate-400 max-w-md mx-auto mb-8">
                                        Comece criando um certificado individual ou fazendo upload de um arquivo CSV.
                                    </p>
                                    <button
                                        onClick={() => setActiveTab('create')}
                                        className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-black shadow-lg hover:bg-indigo-700 transition-all"
                                    >
                                        CRIAR MEU PRIMEIRO CERTIFICADO
                                    </button>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {certificates.map((cert) => (
                                        <motion.div
                                            layout
                                            key={cert.id}
                                            className="bg-white rounded-3xl p-6 shadow-xl border-2 border-indigo-50 hover:border-indigo-200 transition-all group"
                                        >
                                            <div className="flex justify-between items-start mb-4">
                                                <div className={`p-3 rounded-2xl ${cert.type === 'playful' ? 'bg-yellow-100 text-yellow-600' :
                                                        cert.type === 'elegant' ? 'bg-indigo-100 text-indigo-600' :
                                                            cert.type === 'adventurous' ? 'bg-emerald-100 text-emerald-600' :
                                                                'bg-blue-100 text-blue-600'
                                                    }`}>
                                                    <PawPrint size={24} />
                                                </div>
                                                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button
                                                        onClick={() => handleDelete(cert.id)}
                                                        className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                                                    >
                                                        <Trash2 size={20} />
                                                    </button>
                                                </div>
                                            </div>

                                            <h3 className="text-2xl font-black text-indigo-900 mb-1">{cert.petName}</h3>
                                            <p className="text-sm text-indigo-400 font-bold uppercase tracking-widest mb-4">{cert.courseName}</p>

                                            <div className="space-y-2 mb-6">
                                                <div className="flex items-center gap-2 text-xs text-slate-500">
                                                    <User size={14} /> <span className="font-bold">{cert.ownerName}</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-xs text-slate-500">
                                                    <Calendar size={14} /> <span>{cert.date}</span>
                                                </div>
                                            </div>

                                            <div className="flex gap-3">
                                                <button
                                                    onClick={() => {
                                                        setSelectedCertificate(cert);
                                                        setActiveTab('create');
                                                        window.scrollTo({ top: 0, behavior: 'smooth' });
                                                    }}
                                                    className="flex-1 bg-slate-100 text-slate-600 py-3 rounded-xl font-bold text-sm hover:bg-indigo-50 hover:text-indigo-600 transition-all flex items-center justify-center gap-2"
                                                >
                                                    <LayoutDashboard size={16} /> VER
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        setSelectedCertificate(cert);
                                                        // We trigger the download by setting it as selected and then using the template buttons
                                                        // But for better UX, we can just jump to the preview
                                                        setActiveTab('create');
                                                        window.scrollTo({ top: 0, behavior: 'smooth' });
                                                    }}
                                                    className="flex-1 bg-indigo-600 text-white py-3 rounded-xl font-bold text-sm hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 shadow-md"
                                                >
                                                    <Download size={16} /> BAIXAR
                                                </button>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>

            {/* Footer Decoration */}
            <div className="fixed bottom-0 left-0 w-full h-2 bg-gradient-to-r from-yellow-400 via-indigo-600 to-emerald-500 z-50"></div>
        </div>
    );
}