import React, { useState } from 'react';
import { PetCertificateData, CertificateType } from '../types';
import { PlusCircle, User, Dog, BookOpen, Star, Award, Trophy, Calendar, Sparkles } from 'lucide-react';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Card, CardContent } from './ui/Card';

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
        <Card>
            <CardContent>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <Input
                            label="Nome do Pet"
                            icon={<Dog size={16} />}
                            required
                            value={formData.petName}
                            onChange={(e) => setFormData({ ...formData, petName: e.target.value })}
                            placeholder="Ex: Rex"
                        />

                        <Input
                            label="Nome do Tutor"
                            icon={<User size={16} />}
                            required
                            value={formData.ownerName}
                            onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                            placeholder="Ex: Maria Silva"
                        />

                        <Input
                            label="Nome do Curso"
                            icon={<BookOpen size={16} />}
                            required
                            value={formData.courseName}
                            onChange={(e) => setFormData({ ...formData, courseName: e.target.value })}
                            placeholder="Ex: Adestramento Básico"
                        />
                    </div>

                    <div className="space-y-6">
                        <Input
                            label="Méritos"
                            icon={<Star size={16} />}
                            required
                            value={formData.merits}
                            onChange={(e) => setFormData({ ...formData, merits: e.target.value })}
                            placeholder="Ex: Comportamento Exemplar"
                        />

                        <Input
                            label="Habilidades"
                            icon={<Award size={16} />}
                            required
                            value={formData.skills}
                            onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                            placeholder="Ex: Sentar, Deitar, Rolar"
                        />

                        <Input
                            label="Conquista"
                            icon={<Trophy size={16} />}
                            required
                            value={formData.achievements}
                            onChange={(e) => setFormData({ ...formData, achievements: e.target.value })}
                            placeholder="Ex: Melhor da Turma"
                        />
                    </div>

                    <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8 items-end pt-4 border-t border-slate-50">
                        <Input
                            label="Data de Conclusão"
                            icon={<Calendar size={16} />}
                            required
                            value={formData.date}
                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        />

                        <div className="space-y-3">
                            <span className="text-sm font-bold text-slate-700 flex items-center gap-2 px-1">
                                <Sparkles size={16} className="text-primary" /> Estilo do Certificado
                            </span>
                            <div className="grid grid-cols-4 gap-2">
                                {(['playful', 'elegant', 'adventurous', 'academic'] as CertificateType[]).map((type) => (
                                    <button
                                        key={type}
                                        type="button"
                                        onClick={() => setFormData({ ...formData, type })}
                                        className={`py-2.5 rounded-xl text-[10px] font-black uppercase transition-all border-2 ${formData.type === type
                                                ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20'
                                                : 'bg-white text-slate-400 border-slate-100 hover:border-primary-light hover:text-primary'
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

                    <Button type="submit" className="md:col-span-2 mt-4 uppercase tracking-[0.1em] py-5">
                        <PlusCircle size={20} className="mr-2" /> Gerar Certificado Personalizado
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
};
