import React from "react";
import { PawPrint, Plus, List } from "lucide-react";

interface HeaderProps {
    activeTab: 'create' | 'list';
    setActiveTab: (tab: 'create' | 'list') => void;
    certificateCount: number;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, certificateCount }) => {
    return (
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
                        {certificateCount > 0 && (
                            <span className="bg-primary/10 text-primary px-1.5 py-0.5 rounded-md text-[9px]">
                                {certificateCount}
                            </span>
                        )}
                    </button>
                </nav>
            </div>
        </header>
    );
};