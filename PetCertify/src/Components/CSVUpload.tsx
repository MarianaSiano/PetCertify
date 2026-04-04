import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import Papa from 'papaparse';
import { PetCertificateData, CertificateType } from '../types';
import { Upload, FileText, AlertCircle } from 'lucide-react';

interface CSVUploadProps {
    onDataParsed: (data: PetCertificateData[]) => void;
}

export const CSVUpload: React.FC<CSVUploadProps> = ({ onDataParsed }) => {
    const onDrop = useCallback((acceptedFiles: File[]) => {
        acceptedFiles.forEach((file) => {
            Papa.parse(file, {
                header: true,
                skipEmptyLines: true,
                complete: (results) => {
                    const parsedData: PetCertificateData[] = results.data.map((row: any) => ({
                        id: Math.random().toString(36).substr(2, 9),
                        petName: row.petName || row['Nome do Pet'] || '',
                        ownerName: row.ownerName || row['Nome do Tutor'] || '',
                        courseName: row.courseName || row['Nome do Curso'] || '',
                        merits: row.merits || row['Méritos'] || '',
                        skills: row.skills || row['Habilidades'] || '',
                        achievements: row.achievements || row['Conquista'] || '',
                        date: row.date || row['Data'] || new Date().toLocaleDateString('pt-BR'),
                        type: (row.type || row['Estilo'] || 'playful') as CertificateType,
                    }));
                    onDataParsed(parsedData);
                }
            })
        })
    }, [onDataParsed]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'text/csv': ['.csv'],
        },
    } as any);

    return (
        <div className="bg-white p-8 rounded-3xl shadow-xl border-4 border-dashed border-indigo-100 transition-all hover:border-indigo-300">
        <div
            {...getRootProps()}
            className={`flex flex-col items-center justify-center p-12 rounded-2xl cursor-pointer transition-all ${
            isDragActive ? 'bg-indigo-50 border-indigo-500' : 'bg-slate-50'
            }`}
        >
        <input {...getInputProps()} />
        <div className="bg-indigo-600 p-4 rounded-full text-white mb-4 shadow-lg">
            <Upload size={32} />
        </div>
        <h3 className="text-2xl font-black text-indigo-900 mb-2">Upload de CSV</h3>
        <p className="text-indigo-400 text-center max-w-xs">
            Arraste e solte seu arquivo CSV aqui ou clique para selecionar.
        </p>
        
        <div className="mt-8 p-4 bg-amber-50 rounded-xl border border-amber-200 flex items-start gap-3 max-w-md">
            <AlertCircle className="text-amber-500 shrink-0" size={20} />
            <div className="text-xs text-amber-800 leading-relaxed">
                <p className="font-bold mb-1 uppercase">Formato esperado do CSV:</p>
                <p>petName, ownerName, courseName, merits, skills, achievements, date, type</p>
                <p className="mt-1 italic">Estilos: playful, elegant, adventurous, academic</p>
            </div>
        </div>
    </div>
    
    <div className="mt-6 flex justify-center">
        <button
        onClick={() => {
            const csvContent = "petName,ownerName,courseName,merits,skills,achievements,date,type\nRex,Maria Silva,Adestramento Básico,Comportamento Exemplar,\"Sentar, Deitar\",Melhor da Turma,03/04/2026,playful\nLuna,João Souza,Agility Avançado,Velocidade Incrível,Salto em Altura,Campeã Regional,03/04/2026,adventurous";
            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement("a");
            const url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", "exemplo_pets.csv");
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }}
        className="text-indigo-600 font-bold text-sm hover:underline flex items-center gap-2"
        >
        <FileText size={16} /> Baixar Modelo de CSV
        </button>
        </div>
    </div>
    );
};