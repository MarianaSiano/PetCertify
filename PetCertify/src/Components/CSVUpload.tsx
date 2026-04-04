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
}