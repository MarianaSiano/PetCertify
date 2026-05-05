import React from "react";
import { PawPrint } from "lucide-react";

export const Footer: React.FC = () => {
    return (
        <>
            <footer className="border-t border-slate-100 py-12 px-6 bg-white/50">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 opacity-50">
                    <div className="flex items-center gap-3">
                        <PawPrint size={16} className="text-primary" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">PetCertify Document System</span>
                    </div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">© 2026 Crafted with Excellence</p>
                </div>
            </footer>
            <div className="h-1 bg-gradient-to-r from-primary-light via-primary to-primary-dark"></div>
        </>
    );
};