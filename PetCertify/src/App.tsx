import React, { useState } from 'react';
import { CertificateForm } from './Components/CertificateForm';
import { CSVUpload } from './Components/CSVUpload';
import { CertificateTemplate } from './Components/CertificateTemplate';
import { Footer } from './Components/Footer';
import { useCertificates } from './hooks/useCertificates';
import {
    PawPrint,
    Plus,
    List,
    Trash2,
    CheckCircle2,
    LayoutDashboard,
    Sparkles,
    ChevronRight,
    Info
} from 'lucide-react';
import { Button } from './Components/ui/Button';
import { Card, CardContent } from './Components/ui/Card';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
    const {
        certificates,
        selectedCertificate,
        setSelectedCertificate,
        addCertificate,
        addBulkCertificates,
        deleteCertificate,
        clearAllCertificates,
    } = useCertificates();

    const [activeTab, setActiveTab] = useState<'create' | 'list'>('create');

    return (
        <div className="min-h-screen flex flex-col">
            {/* Header */}
            <header className="glass sticky top-0 z-50 border-b border-primary/10">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="bg-primary p-2.5 rounded-2xl text-white shadow-xl shadow-primary/30">
                            <PawPrint size={24} />
                        </div>
                        <div>
                            <h1 className="text-xl font-black text-primary-dark tracking-tight leading-none uppercase">PetCertify</h1>
                            <p className="text-[10px] text-primary font-bold uppercase tracking-[0.2em] mt-1 opacity-70">Professional Pet Rewards</p>
                        </div>
                    </div>

                    <nav className="flex bg-slate-100/50 p-1.5 rounded-2xl backdrop-blur-sm border border-slate-200/50">
                        <button
                            onClick={() => setActiveTab('create')}
                            className={`flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-black transition-all ${activeTab === 'create'
                                    ? 'bg-white text-primary shadow-lg shadow-primary/5'
                                    : 'text-slate-400 hover:text-primary/70'
                                }`}
                        >
                            <Plus size={16} /> NOVO
                        </button>
                        <button
                            onClick={() => setActiveTab('list')}
                            className={`flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-black transition-all ${activeTab === 'list'
                                    ? 'bg-white text-primary shadow-lg shadow-primary/5'
                                    : 'text-slate-400 hover:text-primary/70'
                                }`}
                        >
                            <List size={16} /> GESTÃO
                            {certificates.length > 0 && (
                                <span className="bg-primary/10 text-primary px-1.5 py-0.5 rounded-md text-[9px]">
                                    {certificates.length}
                                </span>
                            )}
                        </button>
                    </nav>
                </div>
            </header>

            <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-12">
                <AnimatePresence mode="wait">
                    {activeTab === 'create' ? (
                        <motion.div
                            key="create"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="grid grid-cols-1 lg:grid-cols-12 gap-12"
                        >
                            <div className="lg:col-span-12 flex flex-col gap-2 mb-4">
                                <h2 className="text-4xl font-black text-slate-800 tracking-tight flex items-center gap-3">
                                    <Sparkles className="text-primary" size={32} />
                                    Área de Criação
                                </h2>
                                <p className="text-slate-400 font-medium">Personalize certificados únicos para cada conquista pet.</p>
                            </div>

                            <div className="lg:col-span-7 space-y-12">
                                <section>
                                    <div className="flex items-center justify-between mb-6">
                                        <h3 className="text-sm font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                                            <ChevronRight size={14} className="text-primary" /> Cadastro Individual
                                        </h3>
                                    </div>
                                    <CertificateForm onSubmit={addCertificate} />
                                </section>

                                <section>
                                    <div className="flex items-center justify-between mb-6">
                                        <h3 className="text-sm font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                                            <ChevronRight size={14} className="text-primary" /> Processamento em Lote
                                        </h3>
                                        <div className="flex items-center gap-2 text-[10px] text-slate-400 font-bold bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200">
                                            <Info size={12} /> FORMATO CSV
                                        </div>
                                    </div>
                                    <CSVUpload onDataParsed={addBulkCertificates} />
                                </section>
                            </div>

                            <div className="lg:col-span-5">
                                <div className="sticky top-32 space-y-8">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-sm font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                                            <CheckCircle2 size={14} className="text-primary" /> Prévia do Documento
                                        </h3>
                                    </div>

                                    {selectedCertificate ? (
                                        <motion.div
                                            layoutId={selectedCertificate.id}
                                            className="space-y-6"
                                        >
                                            <div className="shadow-2xl shadow-primary/20 rounded-3xl overflow-hidden active:scale-95 transition-transform duration-500">
                                                <div className="transform scale-[0.55] md:scale-[0.8] origin-top">
                                                    <CertificateTemplate
                                                        data={selectedCertificate}
                                                    />
                                                </div>
                                            </div>

                                            <Card glass className="border-primary/20">
                                                <CardContent className="flex items-center justify-between py-6">
                                                    <div className="flex items-center gap-4">
                                                        <div className="bg-primary/10 p-3 rounded-2xl text-primary">
                                                            <PawPrint size={20} />
                                                        </div>
                                                        <div>
                                                            <p className="text-[10px] text-primary font-black uppercase tracking-widest">Documento Ativo</p>
                                                            <p className="text-xl font-black text-slate-800">{selectedCertificate.petName}</p>
                                                        </div>
                                                    </div>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => setSelectedCertificate(null)}
                                                        className="text-slate-300 hover:text-red-500"
                                                    >
                                                        <Trash2 size={20} />
                                                    </Button>
                                                </CardContent>
                                            </Card>
                                        </motion.div>
                                    ) : (
                                        <div className="bg-slate-100/50 border-4 border-dashed border-slate-200/50 rounded-[2.5rem] p-20 flex flex-col items-center justify-center text-center group transition-all hover:bg-white hover:border-primary-light/50">
                                            <div className="bg-white p-6 rounded-full mb-6 shadow-xl shadow-slate-200/50 group-hover:scale-110 transition-transform">
                                                <PawPrint size={48} className="text-slate-200 group-hover:text-primary-light" />
                                            </div>
                                            <p className="text-slate-400 font-bold max-w-[200px] leading-relaxed">
                                                Selecione ou crie um certificado para visualizar aqui.
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="list"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="space-y-12"
                        >
                            <div className="flex items-end justify-between border-b pb-8 border-slate-100">
                                <div className="flex flex-col gap-2">
                                    <h2 className="text-4xl font-black text-slate-800 tracking-tight flex items-center gap-3">
                                        <LayoutDashboard className="text-primary" size={32} />
                                        Painel de Gestão
                                    </h2>
                                    <p className="text-slate-400 font-medium">Controle e exportação de certificados emitidos.</p>
                                </div>

                                {certificates.length > 0 && (
                                    <Button
                                        variant="danger"
                                        size="sm"
                                        onClick={clearAllCertificates}
                                        className="gap-2"
                                    >
                                        <Trash2 size={16} /> APAGAR TUDO
                                    </Button>
                                )}
                            </div>

                            {certificates.length === 0 ? (
                                <div className="bg-white rounded-[3rem] p-32 text-center shadow-2xl border-2 border-slate-50 flex flex-col items-center max-w-4xl mx-auto">
                                    <div className="bg-primary/5 w-32 h-32 rounded-full flex items-center justify-center mb-8">
                                        <PawPrint size={64} className="text-primary-light" />
                                    </div>
                                    <h3 className="text-3xl font-black text-slate-800 mb-4">Base de Dados Vazia</h3>
                                    <p className="text-slate-400 max-w-sm mb-12 font-medium">
                                        Ainda não existem registros em sua conta. Comece pelo painel de criação.
                                    </p>
                                    <Button
                                        size="lg"
                                        onClick={() => setActiveTab('create')}
                                        className="px-12"
                                    >
                                        INICIAR EMISSÃO
                                    </Button>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {certificates.map((cert) => (
                                        <motion.div
                                            layout
                                            key={cert.id}
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="group"
                                        >
                                            <Card className="hover:border-primary/30 transition-all p-8 flex flex-col h-full bg-slate-50/30">
                                                <div className="flex justify-between items-start mb-8">
                                                    <div className={`p-4 rounded-2xl shadow-lg ${cert.type === 'playful' ? 'bg-amber-100 text-amber-600 shadow-amber-200/50' :
                                                            cert.type === 'elegant' ? 'bg-primary-dark text-white shadow-primary-dark/30' :
                                                                cert.type === 'adventurous' ? 'bg-emerald-100 text-emerald-600 shadow-emerald-200/50' :
                                                                    'bg-blue-600 text-white shadow-blue-200/50'
                                                        }`}>
                                                        <PawPrint size={24} />
                                                    </div>
                                                    <button
                                                        onClick={() => deleteCertificate(cert.id)}
                                                        className="opacity-0 group-hover:opacity-100 p-2 text-slate-300 hover:text-red-500 transition-all transform hover:rotate-12"
                                                    >
                                                        <Trash2 size={20} />
                                                    </button>
                                                </div>

                                                <div className="flex-1">
                                                    <h3 className="text-2xl font-black text-slate-800 mb-2 truncate group-hover:text-primary transition-colors">{cert.petName}</h3>
                                                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] mb-6">{cert.courseName}</p>

                                                    <div className="flex items-center gap-6 text-[11px] font-bold text-slate-500 opacity-60">
                                                        <span className="flex items-center gap-1.5"><ChevronRight size={10} className="text-primary" /> {cert.ownerName}</span>
                                                        <span className="flex items-center gap-1.5"><ChevronRight size={10} className="text-primary" /> {cert.date}</span>
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-2 gap-3 mt-10">
                                                    <Button
                                                        variant="secondary"
                                                        size="sm"
                                                        onClick={() => {
                                                            setSelectedCertificate(cert);
                                                            setActiveTab('create');
                                                            window.scrollTo({ top: 0, behavior: 'smooth' });
                                                        }}
                                                        className="bg-white border border-slate-200 text-slate-600 hover:text-primary hover:border-primary-light"
                                                    >
                                                        VISUALIZAR
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        onClick={() => {
                                                            setSelectedCertificate(cert);
                                                            setActiveTab('create');
                                                            window.scrollTo({ top: 0, behavior: 'smooth' });
                                                        }}
                                                    >
                                                        EXPORTAR
                                                    </Button>
                                                </div>
                                            </Card>
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
}
