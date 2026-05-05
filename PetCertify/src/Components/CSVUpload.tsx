import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Papa from 'papaparse';
import { PetCertificateData, CertificateType} from "../types";
import { Upload, FileText, AlertCircle } from "lucide-react";
import { Card, CardContent } from './ui/Card';

interface CSVUploadProps {
    onDataParsed: (data: PetCertificateData[]) => void;
}

export const CSVUpload: React.FC<CSVUploadProps> = ({ onDataParsed }) => {
    const onDrop = useCallback((acceptedFiles: File[]) => {
        acceptedFiles.forEach((file) => {
            
        })
    })
}