import React, { useRef, useState } from "react";
import { PetCertificateData } from "../types";
import { Award, PawPrint, Star, Trophy, GraduationCap, Calendar, User, Dog, Download, Image as ImageIcon, CheckCircle2, Loader2 } from "lucide-react";
import html2canvas from "html2canvas";
import { jsPDF } from 'jspdf';
import { Button } from "./ui/Button";

interface CertificateTemplateProps {
    data: PetCertificateData;
    onDownloadComplete?: () => void;
}

export const CertificateTemplate: React.FC<CertificateTemplateProps> = ({ data, onDownloadComplete }) => {
    const certificateRef = useRef<HTMLDivElement>(null);
    const [isExporting, setIsExporting] = useState<'png' | 'pdf' | null>(null);

    const captureCertificate = async () => {
        if(!certificateRef.current) return null;

        try {
            // Ensure all fonts are loaded
            await document.fonts.ready;
            // Small additional delay to ensure everything is rendered
            await new Promise(resolve => setTimeout(resolve, 500));

            const canvas = await html2canvas(certificateRef.current, {
                scale: 4, // Very high quality
                useCORS: true,
                backgroundColor: '#ffffff',
                logging: false,
                allowTaint: false, // Changed to false for better security and stability
                onclone: (clonedDoc) => {
                    const el = clonedDoc.querySelector('[data-certificate-root]');
                    if(el instanceof HTMLElement) {
                        el.style.transform = 'none';
                    }
                }
            });
            return canvas;
        } catch (error) {
            console.error('Error capturing certificate:', error);
            return null;
        }
    };

    const downloadPNG = async () => {
        setIsExporting('png');
        const canvas = await captureCertificate();

        if(canvas) {
            const link = document.createElement('a');
            link.download = `certificado-${data.petName.toLowerCase().replace(/\s+/g, '-')}.png`;
            link.href = canvas.toDataURL('image/png', 1.0);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            onDownloadComplete?.();
        }
        setIsExporting(null);
    };

    const downloadPDF = async () => {
        setIsExporting('pdf');
        const canvas = await captureCertificate();

        if(canvas) {
            const imgData = canvas.toDataURL('image/png', 1.0);

            // Calculate A4 Landscape dimensions (297mm x 210mm)
            const pdf = new jsPDF({
                orientation: 'landscape',
                unit: 'mm',
                format: 'a4',
            });

            const pdfWidth = 297;
            const pdfHeight = 210;

            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save(`certificado-${data.petName.toLowerCase().replace(/\s+/g, '-')}.pdf`);
            onDownloadComplete?.();
        }
        setIsExporting(null);
    };

    const renderContent = () => {
        switch (data.type) {
            case 'playful':
                return (
                    <div className="relative w-full h-full bg-amber-50 border-[16px] border-amber-400 rounded-[3rem] p-16 flex flex-col items-center justify-between overflow-hidden shadow-inner">
                        {/* Playful elements */}
                        <div className="absolute top-8 left-8 text-amber-200 rotate-[-15deg]"><PawPrint size={100} /></div>
                        <div className="absolute bottom-8 right-8 text-amber-200 rotate-[15deg]"><PawPrint size={100} /></div>

                        <div className="text-center z-10">
                            <div className="inline-block bg-amber-400 p-6 rounded-3xl shadow-xl shadow-amber-200 mb-6">
                                <Trophy size={64} className="text-white" />
                            </div>
                            <h1 className="text-6xl font-black text-amber-600 mb-2 uppercase tracking-[0.1em]">Certificado de Alegria</h1>
                            <p className="text-2xl text-amber-700/60 font-medium italic">Este documento oficial comprova que</p>
                        </div>

                        <div className="text-center z-10 flex flex-col items-center">
                            <h2 className="text-8xl font-black text-orange-500 mb-6 drop-shadow-xl tracking-tight">{data.petName}</h2>
                            <div className="bg-amber-100/50 px-8 py-2 rounded-full border border-amber-200">
                                <p className="text-xl text-amber-800 font-bold">Concluiu o curso: <span className="text-amber-600 uppercase">{data.courseName}</span></p>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-8 w-full z-10">
                            {[
                                { label: 'Méritos', value: data.merits, icon: <Star size={20} /> },
                                { label: 'Habilidades', value: data.skills, icon: <Award size={20} /> },
                                { label: 'Conquista', value: data.achievements, icon: <Trophy size={20} /> }
                            ].map((item, i) => (
                                <div key={i} className="bg-white/80 backdrop-blur-sm p-6 rounded-[2rem] border-2 border-amber-200 flex flex-col items-center text-center">
                                    <div className="text-amber-400 mb-2">{item.icon}</div>
                                    <p className="text-[10px] font-black text-amber-600 uppercase tracking-widest mb-2">{item.label}</p>
                                    <p className="text-lg text-slate-800 font-bold leading-none">{item.value}</p>
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-between w-full items-end z-10 px-4">
                            <div className="text-left">
                                <p className="text-[10px] text-amber-600 font-black uppercase tracking-widest mb-1">Responsável</p>
                                <p className="text-2xl text-slate-800 font-black">{data.ownerName}</p>
                            </div>
                            <div className="text-center bg-amber-400/10 px-6 py-2 rounded-2xl border border-amber-400/20">
                                <p className="text-[10px] text-amber-600 font-black uppercase tracking-tighter">Selo de Qualidade Pet</p>
                            </div>
                            <div className="text-right">
                                <p className="text-[10px] text-amber-600 font-black uppercase tracking-widest mb-1">Data</p>
                                <p className="text-2xl text-slate-800 font-black">{data.date}</p>
                            </div>
                        </div>
                    </div>
                );

            case 'elegant':
                return (
                    <div className="relative w-full h-full bg-[#faf7fc] border-[24px] border-double border-primary-dark p-16 flex flex-col items-center justify-between shadow-2xl">
                        {/* Lavender/Gold Professional accents */}
                        <div className="absolute top-10 left-10 text-primary-dark opacity-20"><Trophy size={60} /></div>
                        <div className="absolute top-10 right-10 text-primary-dark opacity-20"><Trophy size={60} /></div>

                        <div className="text-center z-10">
                            <div className="flex justify-center mb-8">
                                <Star size={48} className="text-primary-dark" />
                            </div>
                            <h1 className="text-5xl font-serif font-bold text-primary-dark uppercase tracking-[0.3em] mb-4">Certificado de Excelência</h1>
                            <div className="w-80 h-[2px] bg-primary mx-auto mb-6"></div>
                            <p className="text-xl text-slate-500 font-serif italic tracking-wide">É com distinta honra que certificamos</p>
                        </div>

                        <div className="text-center z-10">
                            <h2 className="text-7xl font-serif font-bold text-slate-800 mb-6">{data.petName}</h2>
                            <p className="text-lg text-slate-600 font-serif uppercase tracking-[0.15em] mb-2">Pela excepcional conclusão do curso de</p>
                            <h3 className="text-4xl font-serif font-bold text-primary italic underline decoration-primary-light underline-offset-8">{data.courseName}</h3>
                        </div>

                        <div className="w-2/3 text-center z-10 space-y-4">
                            <p className="text-slate-700 font-serif leading-relaxed text-lg italic">
                                Reconhecido por sua <span className="text-primary-dark font-bold underline">{data.merits}</span>,
                                demonstrando habilidade superior em <span className="text-primary-dark font-bold underline">{data.skills}</span>
                                e alcançando a marca histórica de <span className="text-primary-dark font-bold underline">{data.achievements}</span>.
                            </p>
                        </div>

                        <div className="flex justify-between w-full items-center z-10 mt-12 bg-white/40 p-8 rounded-3xl border border-primary/10">
                            <div className="text-center">
                                <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest mb-6 px-4 border-b border-primary/20 pb-2">Tutor(a) Responsável</p>
                                <p className="text-xl font-serif font-bold text-slate-800">{data.ownerName}</p>
                            </div>
                            <div className="relative">
                                <div className="bg-primary-dark text-white p-6 rounded-full shadow-[0_0_30px_rgba(157,123,176,0.5)] rotate-12">
                                    <PawPrint size={40} />
                                </div>
                            </div>
                            <div className="text-center">
                                <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest mb-6 px-4 border-b border-primary/20 pb-2">Data de Expedição</p>
                                <p className="text-xl font-serif font-bold text-slate-800">{data.date}</p>
                            </div>
                        </div>
                    </div>
                );

            case 'adventurous':
                return (
                    <div className="relative w-full h-full bg-emerald-50 border-[14px] border-emerald-700 rounded-2xl p-16 flex flex-col items-center justify-between overflow-hidden">
                        {/* Nature Accents */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-100 rounded-full translate-x-1/3 -translate-y-1/3 opacity-50"></div>
                        <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-emerald-200 rounded-full opacity-30"></div>

                        <div className="text-center z-10">
                            <div className="inline-block bg-emerald-700 p-5 rounded-full shadow-xl mb-6">
                                <Dog size={64} className="text-white" />
                            </div>
                            <h1 className="text-6xl font-black text-emerald-900 uppercase tracking-tighter italic">Explorador de Elite</h1>
                            <div className="flex items-center gap-4 mt-2">
                                <div className="h-px w-20 bg-emerald-700"></div>
                                <p className="text-xl text-emerald-700 font-black tracking-widest uppercase">Certificado de Bravura</p>
                                <div className="h-px w-20 bg-emerald-700"></div>
                            </div>
                        </div>

                        <div className="text-center z-10 flex flex-col items-center">
                            <div className="relative">
                                <h2 className="text-9xl font-black text-emerald-800 mb-0 transform skew-x-[-10deg] drop-shadow-lg">{data.petName}</h2>
                                <div className="absolute -right-12 top-0 rotate-12 text-orange-500 fill-orange-500"><Star size={48} /></div>
                            </div>
                            <p className="text-2xl text-emerald-900 font-bold uppercase tracking-widest mt-4">Conquistou as trilhas do programa:</p>
                            <h3 className="text-4xl font-black text-white bg-orange-600 px-8 py-2 rounded-xl mt-2 transform rotate-1 shadow-xl">{data.courseName}</h3>
                        </div>

                        <div className="flex gap-4 w-full justify-center z-10">
                            {[data.merits, data.skills, data.achievements].map((skill, i) => (
                                <div key={i} className="bg-emerald-800 text-white px-6 py-3 rounded-full flex items-center gap-3 shadow-lg">
                                    <CheckCircle2 size={16} className="text-emerald-400" />
                                    <span className="text-sm font-black uppercase text-nowrap">{skill}</span>
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-between w-full items-center z-10 bg-emerald-900 text-white p-10 rounded-[2rem] border-b-[8px] border-emerald-950">
                            <div className="flex flex-col gap-1">
                                <p className="text-[10px] text-emerald-300 uppercase font-black tracking-[0.2em]">Guia de Campo</p>
                                <p className="text-3xl font-black">{data.ownerName}</p>
                            </div>
                            <div className="flex flex-col items-end gap-1">
                                <p className="text-[10px] text-emerald-300 uppercase font-black tracking-[0.2em]">Data de Registro</p>
                                <p className="text-3xl font-black">{data.date}</p>
                            </div>
                        </div>
                    </div>
                );

            case 'academic':
                return (
                    <div className="relative w-full h-full bg-white border-[4px] border-blue-900 p-4 flex flex-col items-center justify-center">
                        <div className="w-full h-full border-[10px] border-blue-900 p-16 flex flex-col items-center justify-between">
                            <div className="text-center">
                                <GraduationCap size={80} className="text-blue-900 mb-6 mx-auto" />
                                <h1 className="text-5xl font-serif font-black text-blue-900 uppercase underline decoration-double decoration-blue-800 underline-offset-8">DIPLOMA ACADÊMICO</h1>
                                <p className="text-2xl text-blue-800 mt-6 font-serif">Universidade Geral Canina & Felina</p>
                            </div>

                            <div className="text-center flex flex-col items-center">
                                <p className="text-2xl text-slate-500 font-serif italic mb-8">Pela presente outorgamos o título mérito ao discente</p>
                                <div className="relative inline-block">
                                    <h2 className="text-8xl font-serif font-black text-blue-950 tracking-tight">{data.petName}</h2>
                                    <div className="absolute -bottom-4 left-0 w-full h-1 bg-blue-900"></div>
                                </div>
                                <p className="text-xl text-slate-500 font-serif italic mt-12 mb-4">Em reconhecimento ao cumprimento integral das exigências em</p>
                                <h3 className="text-4xl font-serif font-black text-blue-900 uppercase tracking-widest bg-blue-50 px-10 py-3 rounded-2xl">{data.courseName}</h3>
                            </div>

                            <div className="w-full grid grid-cols-2 gap-20 mt-12 pb-12 items-end">
                                <div className="text-left border-l-[12px] border-blue-900 pl-8 space-y-2">
                                    <p className="text-xs font-black text-blue-900 uppercase tracking-[0.3em] mb-4">HISTÓRICO DE EXCELÊNCIA</p>
                                    <p className="text-lg text-slate-700 font-serif italic">1. Honra: <span className="font-bold">{data.merits}</span></p>
                                    <p className="text-lg text-slate-700 font-serif italic">2. Especialização: <span className="font-bold">{data.skills}</span></p>
                                    <p className="text-lg text-slate-700 font-serif italic">3. Atuação: <span className="font-bold">{data.achievements}</span></p>
                                </div>
                                <div className="flex flex-col items-center gap-4">
                                    <div className="w-full h-px bg-slate-300"></div>
                                    <div className="text-center">
                                        <p className="text-2xl font-serif font-black text-blue-900 leading-none">{data.ownerName}</p>
                                        <p className="text-[10px] text-slate-400 uppercase font-black mt-2 tracking-widest">Reitor de Faculdades Pets</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-between w-full items-center mt-auto pt-8 border-t-2 border-slate-100">
                                <div className="text-xs text-slate-400 font-serif opacity-50">REGISTRO: {data.id.slice(0, 10).toUpperCase()}</div>
                                <div className="relative">
                                    <div className="w-24 h-24 bg-blue-900 rounded-full flex items-center justify-center text-white rotate-[-5deg] shadow-2xl border-4 border-white">
                                        <PawPrint size={40} />
                                    </div>
                                    <div className="absolute -top-3 -right-3 bg-yellow-400 text-blue-950 text-[10px] font-black px-4 py-1.5 rounded-full border-2 border-blue-900 shadow-xl">
                                        VALIDADO
                                    </div>
                                </div>
                                <div className="text-xs text-slate-400 font-serif opacity-50 uppercase tracking-widest">EMITIDO EM: {data.date}</div>
                            </div>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="flex flex-col items-center gap-10">
            {/* Hidden container for generation */}
            <div className="fixed -left-[9999px] top-0 pointer-events-none overflow-hidden opacity-0">
                <div
                    ref={certificateRef}
                    data-certificate-root
                    style={{ width: '1123px', height: '794px', position: 'relative' }} // Fixed A4 landscape size for capture
                    className="bg-white"
                >
                    {renderContent()}
                </div>
            </div>

            {/* Preview container */}
            <div className="w-full max-w-5xl aspect-[1.414/1] shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-[2rem] overflow-hidden bg-white group relative">
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/2 tracking-tighter transition-all pointer-events-none z-20"></div>
                {renderContent()}
            </div>

            <div className="flex items-center gap-6">
                <Button
                    onClick={downloadPNG}
                    variant="secondary"
                    className="px-10 gap-3"
                    disabled={isExporting !== null}
                >
                    {isExporting === 'png' ? <Loader2 className="animate-spin" size={18} /> : <ImageIcon size={18} />}
                    {isExporting === 'png' ? 'Gerando...' : 'Salvar Imagem'}
                </Button>
                <Button
                    onClick={downloadPDF}
                    className="px-10 gap-3"
                    disabled={isExporting !== null}
                >
                    {isExporting === 'pdf' ? <Loader2 className="animate-spin" size={18} /> : <Download size={18} />}
                    {isExporting === 'pdf' ? 'Gerando...' : 'Exportar PDF'}
                </Button>
            </div>
        </div>
    );
};