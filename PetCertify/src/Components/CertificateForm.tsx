import React, { useState } from 'react';
import { PetCertificateData, CertificateType } from '../types';
import { PlusCircle, User, Dog, BookOpen, Star, Award, Trophy, Calendar } from 'lucide-react';

interface CertificateFormProps {
    onSubmit: (data: PetCertificateData) => void;
}

export const CertificateForm: React.FC<CertificateFormProps> = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        petName: '',
        ownerName: '',
        courseName: '',
        merits: '',
        skills: '',
        achievements: '',
        date: new Date().toLocaleDateString('pt-BR'),
        type: 'playful' as CertificateType,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({
            ...formData,
            id: Math.random().toString(36).substr(2, 9),
        });
        setFormData({
            petName: '',
            ownerName: '',
            courseName: '',
            merits: '',
            skills: '',
            achievements: '',
            date: new Date().toLocaleDateString('pt-BR'),
            type: 'playful',
        });
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl shadow-xl border-4 border-indigo-100 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
                <label className="block">
                    <span className="text-indigo-900 font-bold flex items-center gap-2 mb-2">
                        <Dog size={18} /> Nome do Pet
                    </span>
                    <input
                        type="text"
                        required
                        value={formData.petName}
                        onChange={(e) => setFormData({ ...formData, petName: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border-2 border-indigo-50 focus:border-indigo-500 focus:ring-0 transition-all outline-none"
                        placeholder="Ex: Rex"
                    />
                </label>

                <label className="block">
                    <span className="text-indigo-900 font-bold flex items-center gap-2 mb-2">
                        <User size={18} /> Nome do Tutor
                    </span>
                    <input
                        type="text"
                        required
                        value={formData.ownerName}
                        onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border-2 border-indigo-50 focus:border-indigo-500 focus:ring-0 transition-all outline-none"
                        placeholder="Ex: Maria Silva"
                    />
                </label>

                <label className="block">
                    <span className="text-indigo-900 font-bold flex items-center gap-2 mb-2">
                        <BookOpen size={18} /> Nome do Curso
                    </span>
                    <input
                        type="text"
                        required
                        value={formData.courseName}
                        onChange={(e) => setFormData({ ...formData, courseName: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border-2 border-indigo-50 focus:border-indigo-500 focus:ring-0 transition-all outline-none"
                        placeholder="Ex: Adestramento Básico"
                    />
                </label>
            </div>

            <div className="space-y-4">
                <label className="block">
                    <span className="text-indigo-900 font-bold flex items-center gap-2 mb-2">
                        <Star size={18} /> Méritos
                    </span>
                    <input
                        type="text"
                        required
                        value={formData.merits}
                        onChange={(e) => setFormData({ ...formData, merits: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border-2 border-indigo-50 focus:border-indigo-500 focus:ring-0 transition-all outline-none"
                        placeholder="Ex: Comportamento Exemplar"
                    />
                </label>

                <label className="block">
                    <span className="text-indigo-900 font-bold flex items-center gap-2 mb-2">
                        <Award size={18} /> Habilidades
                    </span>
                    <input
                        type="text"
                        required
                        value={formData.skills}
                        onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border-2 border-indigo-50 focus:border-indigo-500 focus:ring-0 transition-all outline-none"
                        placeholder="Ex: Sentar, Deitar, Rolar"
                    />
                </label>

                <label className="block">
                    <span className="text-indigo-900 font-bold flex items-center gap-2 mb-2">
                        <Trophy size={18} /> Conquista
                    </span>
                    <input
                        type="text"
                        required
                        value={formData.achievements}
                        onChange={(e) => setFormData({ ...formData, achievements: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border-2 border-indigo-50 focus:border-indigo-500 focus:ring-0 transition-all outline-none"
                        placeholder="Ex: Melhor da Turma"
                    />
                </label>
            </div>

            <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
                <label className="block">
                    <span className="text-indigo-900 font-bold flex items-center gap-2 mb-2">
                        <Calendar size={18} /> Data
                    </span>
                    <input
                        type="text"
                        required
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border-2 border-indigo-50 focus:border-indigo-500 focus:ring-0 transition-all outline-none"
                    />
                </label>

                <div className="space-y-2">
                    <span className="text-indigo-900 font-bold block mb-2">Estilo do Certificado</span>
                    <div className="grid grid-cols-4 gap-2">
                        {(['playful', 'elegant', 'adventurous', 'academic'] as CertificateType[]).map((type) => (
                            <button
                                key={type}
                                type="button"
                                onClick={() => setFormData({ ...formData, type })}
                                className={`py-2 rounded-lg text-xs font-bold uppercase transition-all border-2 ${formData.type === type
                                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-md'
                                        : 'bg-white text-indigo-400 border-indigo-50 hover:border-indigo-200'
                                    }`}
                            >
                                {type === 'playful' && 'Divertido'}
                                {type === 'elegant' && 'Elegante'}
                                {type === 'adventurous' && 'Aventura'}
                                {type === 'academic' && 'Acadêmico'}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <button
                type="submit"
                className="md:col-span-2 mt-4 bg-indigo-600 text-white py-4 rounded-2xl font-black text-lg uppercase tracking-widest hover:bg-indigo-700 transition-all flex items-center justify-center gap-3 shadow-xl hover:shadow-indigo-200"
            >
                <PlusCircle size={24} /> Gerar Certificado
            </button>
        </form>
    );
};