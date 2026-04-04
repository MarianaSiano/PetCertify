import React, { useRef } from 'react';
import { PetCertificateData } from '../types';
import { Award, PawPrint, Star, Trophy, GraduationCap, Calendar, User, Dog } from 'lucide-react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

interface CertificateTemplateProps {
    data: PetCertificateData;
    onDownloadComplete?: () => void;
}

export const CertificateTemplate: React.FC<CertificateTemplateProps> = ({ data, onDownloadComplete }) => {
    const certificateRef = useRef<HTMLDivElement>(null);

    const downloadPNG = async () => {
        if (!certificateRef.current) return
        const canvas = await html2canvas(certificateRef.current, {
            scale: 2,
            useCORS: true,
            backgroundColor: null,
        });
        const link = document.createElement('a');
        link.download = `certificado-${data.petName.toLowerCase()}-${data.id}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
        onDownloadComplete?.();
    };

    const downloadPDF = async () => {
        if (!certificateRef.current) return;
        const canvas = await html2canvas(certificateRef.current, {
            scale: 2,
            useCORS: true,
        });
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
            orientation: 'landscape',
            unit: 'px',
            format: [canvas.width, canvas.height],
        });
        pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
        pdf.save(`certificado-${data.petName.toLowerCase()}-${data.id}.pdf`);
        onDownloadComplete?.();
    };

    const renderContent = () => {
        switch (data.type) {
            case 'playful':
                return (
                    <div className="relative w-full h-full bg-yellow-50 border-[16px] border-yellow-400 rounded-3xl p-12 flex flex-col items-center justify-between overflow-hidden">
                        {/* Background Paw Prints */}
                        <div className="absolute top-4 left-4 text-yellow-200 opacity-50"><PawPrint size={80} /></div>
                        <div className="absolute bottom-4 right-4 text-yellow-200 opacity-50"><PawPrint size={80} /></div>
                        <div className="absolute top-1/2 right-10 text-yellow-200 opacity-50 rotate-12"><PawPrint size={60} /></div>

                        <div className="text-center z-10">
                            <div className="flex justify-center mb-4">
                                <div className="bg-yellow-400 p-4 rounded-full shadow-lg">
                                    <Trophy size={48} className="text-white" />
                                </div>
                            </div>
                            <h1 className="text-5xl font-black text-yellow-600 mb-2 uppercase tracking-widest">Certificado de Alegria</h1>
                            <p className="text-xl text-yellow-700 font-medium italic">Este documento oficial comprova que</p>
                        </div>

                        <div className="text-center z-10">
                            <h2 className="text-7xl font-black text-orange-500 mb-4 drop-shadow-md">{data.petName}</h2>
                            <p className="text-2xl text-yellow-800">Concluiu com sucesso o curso:</p>
                            <h3 className="text-4xl font-bold text-yellow-600 mt-2">{data.courseName}</h3>
                        </div>

                        <div className="grid grid-cols-3 gap-8 w-full text-center z-10">
                            <div className="bg-white/60 p-4 rounded-2xl border-2 border-yellow-200">
                                <p className="text-sm font-bold text-yellow-600 uppercase mb-1">Méritos</p>
                                <p className="text-lg text-yellow-900 font-medium">{data.merits}</p>
                            </div>
                            <div className="bg-white/60 p-4 rounded-2xl border-2 border-yellow-200">
                                <p className="text-sm font-bold text-yellow-600 uppercase mb-1">Habilidades</p>
                                <p className="text-lg text-yellow-900 font-medium">{data.skills}</p>
                            </div>
                            <div className="bg-white/60 p-4 rounded-2xl border-2 border-yellow-200">
                                <p className="text-sm font-bold text-yellow-600 uppercase mb-1">Conquista</p>
                                <p className="text-lg text-yellow-900 font-medium">{data.achievements}</p>
                            </div>
                        </div>

                        <div className="flex justify-between w-full items-end z-10">
                            <div className="text-left">
                                <p className="text-sm text-yellow-600 font-bold uppercase">Humano Responsável</p>
                                <p className="text-xl text-yellow-900 font-bold">{data.ownerName}</p>
                            </div>
                            <div className="text-center">
                                <div className="w-32 h-1 bg-yellow-400 mb-2 mx-auto"></div>
                                <p className="text-xs text-yellow-600 font-bold uppercase tracking-tighter">Selo de Aprovação Pet</p>
                            </div>
                            <div className="text-right">
                                <p className="text-sm text-yellow-600 font-bold uppercase">Data da Formatura</p>
                                <p className="text-xl text-yellow-900 font-bold">{data.date}</p>
                            </div>
                        </div>
                    </div>
                );

            case 'elegant':
                return (
                    <div className="relative w-full h-full bg-slate-50 border-[20px] border-double border-indigo-900 p-12 flex flex-col items-center justify-between">
                        {/* Elegant Corner Ornaments */}
                        <div className="absolute top-4 left-4 text-indigo-900"><Award size={40} /></div>
                        <div className="absolute top-4 right-4 text-indigo-900"><Award size={40} /></div>
                        <div className="absolute bottom-4 left-4 text-indigo-900"><Award size={40} /></div>
                        <div className="absolute bottom-4 right-4 text-indigo-900"><Award size={40} /></div>

                        <div className="text-center">
                            <div className="flex justify-center mb-6">
                                <Star size={40} className="text-indigo-900" />
                            </div>
                            <h1 className="text-4xl font-serif font-bold text-indigo-900 uppercase tracking-[0.2em] mb-4">Certificado de Excelência</h1>
                            <div className="w-64 h-0.5 bg-indigo-900 mx-auto mb-4"></div>
                            <p className="text-lg text-slate-600 font-serif italic">Concedido com honras a</p>
                        </div>

                        <div className="text-center">
                            <h2 className="text-6xl font-serif font-bold text-indigo-950 mb-4">{data.petName}</h2>
                            <p className="text-xl text-slate-700 font-serif">Pela distinta conclusão do programa acadêmico:</p>
                            <h3 className="text-3xl font-serif font-bold text-indigo-800 mt-2">{data.courseName}</h3>
                        </div>

                        <div className="flex flex-col gap-4 w-2/3 text-center">
                            <p className="text-slate-800 leading-relaxed">
                                Reconhecido por <span className="font-bold">{data.merits}</span>, demonstrando maestria em <span className="font-bold">{data.skills}</span> e alcançando a marca de <span className="font-bold">{data.achievements}</span>.
                            </p>
                        </div>

                        <div className="flex justify-between w-full items-center mt-8">
                            <div className="text-center">
                                <p className="text-xs text-slate-500 uppercase mb-4">Proprietário(a)</p>
                                <div className="w-48 h-px bg-slate-400 mb-1"></div>
                                <p className="text-sm font-bold text-slate-800">{data.ownerName}</p>
                            </div>
                            <div className="bg-indigo-900 text-white p-4 rounded-full shadow-xl">
                                <PawPrint size={32} />
                            </div>
                            <div className="text-center">
                                <p className="text-xs text-slate-500 uppercase mb-4">Data de Emissão</p>
                                <div className="w-48 h-px bg-slate-400 mb-1"></div>
                                <p className="text-sm font-bold text-slate-800">{data.date}</p>
                            </div>
                        </div>
                    </div>
                );

            case 'adventurous':
                return (
                    <div className="relative w-full h-full bg-emerald-50 border-[12px] border-emerald-700 rounded-lg p-12 flex flex-col items-center justify-between overflow-hidden">
                        {/* Nature Accents */}
                        <div className="absolute -top-10 -left-10 w-40 h-40 bg-emerald-200 rounded-full opacity-30"></div>
                        <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-emerald-300 rounded-full opacity-20"></div>

                        <div className="text-center z-10">
                            <div className="flex justify-center mb-4">
                                <Dog size={56} className="text-emerald-700" />
                            </div>
                            <h1 className="text-5xl font-bold text-emerald-900 uppercase tracking-tighter">Explorador de Elite</h1>
                            <p className="text-xl text-emerald-700 font-bold mt-2">Certificado de Bravura e Aventura</p>
                        </div>

                        <div className="text-center z-10">
                            <h2 className="text-7xl font-black text-emerald-800 mb-2 transform -rotate-1">{data.petName}</h2>
                            <div className="h-2 w-full bg-emerald-700 mb-4"></div>
                            <p className="text-2xl text-emerald-900 font-medium">Dominou as trilhas do curso:</p>
                            <h3 className="text-4xl font-black text-orange-600">{data.courseName}</h3>
                        </div>

                        <div className="grid grid-cols-1 gap-2 w-full max-w-2xl text-center z-10">
                            <div className="flex items-center justify-center gap-4 bg-white/40 p-2 rounded-lg">
                                <Star className="text-orange-500 fill-orange-500" size={20} />
                                <p className="text-lg text-emerald-900"><span className="font-bold">Mérito:</span> {data.merits}</p>
                            </div>
                            <div className="flex items-center justify-center gap-4 bg-white/40 p-2 rounded-lg">
                                <Star className="text-orange-500 fill-orange-500" size={20} />
                                <p className="text-lg text-emerald-900"><span className="font-bold">Habilidade:</span> {data.skills}</p>
                            </div>
                            <div className="flex items-center justify-center gap-4 bg-white/40 p-2 rounded-lg">
                                <Star className="text-orange-500 fill-orange-500" size={20} />
                                <p className="text-lg text-emerald-900"><span className="font-bold">Conquista:</span> {data.achievements}</p>
                            </div>
                        </div>

                        <div className="flex justify-between w-full items-center z-10">
                            <div className="flex items-center gap-3">
                                <User className="text-emerald-700" />
                                <div className="text-left">
                                    <p className="text-xs text-emerald-600 uppercase font-bold">Guia Humano</p>
                                    <p className="text-lg font-bold text-emerald-900">{data.ownerName}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <Calendar className="text-emerald-700" />
                                <div className="text-right">
                                    <p className="text-xs text-emerald-600 uppercase font-bold">Data da Expedição</p>
                                    <p className="text-lg font-bold text-emerald-900">{data.date}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'academic':
                return (
                    <div className="relative w-full h-full bg-white border-[2px] border-blue-900 p-2 flex flex-col items-center justify-center">
                        <div className="w-full h-full border-[8px] border-blue-900 p-12 flex flex-col items-center justify-between">
                            <div className="text-center">
                                <GraduationCap size={64} className="text-blue-900 mb-4 mx-auto" />
                                <h1 className="text-4xl font-serif font-bold text-blue-900 uppercase">Diploma de Graduação Pet</h1>
                                <p className="text-lg text-blue-800 mt-2">Universidade dos Bons Garotos & Garotas</p>
                            </div>

                            <div className="text-center">
                                <p className="text-xl text-slate-600 font-serif italic mb-4">Certificamos que o(a) ilustre aluno(a)</p>
                                <h2 className="text-6xl font-serif font-bold text-blue-950 underline decoration-blue-900 decoration-2 underline-offset-8">{data.petName}</h2>
                                <p className="text-xl text-slate-600 font-serif italic mt-8 mb-2">Cumpriu integralmente os requisitos para o título de</p>
                                <h3 className="text-3xl font-serif font-bold text-blue-900 uppercase tracking-wide">{data.courseName}</h3>
                            </div>

                            <div className="w-full grid grid-cols-2 gap-12 mt-8">
                                <div className="text-left border-l-4 border-blue-900 pl-4">
                                    <p className="text-sm font-bold text-blue-900 uppercase mb-2">Histórico Acadêmico</p>
                                    <ul className="text-sm text-slate-700 space-y-1">
                                        <li><span className="font-bold">Distinção:</span> {data.merits}</li>
                                        <li><span className="font-bold">Especialidade:</span> {data.skills}</li>
                                        <li><span className="font-bold">Tese:</span> {data.achievements}</li>
                                    </ul>
                                </div>
                                <div className="flex flex-col justify-end items-end">
                                    <div className="text-center">
                                        <div className="w-48 h-px bg-blue-900 mb-1"></div>
                                        <p className="text-sm font-bold text-blue-900">{data.ownerName}</p>
                                        <p className="text-[10px] text-slate-500 uppercase">Reitor(a) Responsável</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-between w-full items-center mt-4">
                                <p className="text-sm text-slate-500 font-serif">Registrado sob nº {data.id.slice(0, 8).toUpperCase()}</p>
                                <div className="relative">
                                    <div className="w-20 h-20 bg-blue-900 rounded-full flex items-center justify-center text-white rotate-12 shadow-lg">
                                        <PawPrint size={32} />
                                    </div>
                                    <div className="absolute -top-2 -right-2 bg-yellow-400 text-blue-900 text-[10px] font-bold px-2 py-1 rounded-full border border-blue-900">
                                        APROVADO
                                    </div>
                                </div>
                                <p className="text-sm text-slate-500 font-serif">Data: {data.date}</p>
                            </div>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="flex flex-col items-center gap-6">
            {/* Hidden container for generation */}
            <div className="fixed -left-[9999px] top-0">
                <div
                    ref={certificateRef}
                    style={{ width: '1123px', height: '794px' }} // A4 Landscape aspect ratio
                    className="bg-white"
                >
                    {renderContent()}
                </div>
            </div>

            {/* Preview container */}
            <div className="w-full max-w-4xl aspect-[1.414/1] shadow-2xl rounded-xl overflow-hidden bg-white transform transition-transform hover:scale-[1.01]">
                {renderContent()}
            </div>

            <div className="flex gap-4">
                <button
                    onClick={downloadPNG}
                    className="px-6 py-3 bg-indigo-600 text-white rounded-full font-bold hover:bg-indigo-700 transition-colors flex items-center gap-2 shadow-lg"
                >
                    Baixar PNG
                </button>
                <button
                    onClick={downloadPDF}
                    className="px-6 py-3 bg-emerald-600 text-white rounded-full font-bold hover:bg-emerald-700 transition-colors flex items-center gap-2 shadow-lg"
                >
                    Baixar PDF
                </button>
            </div>
        </div>
    );
};