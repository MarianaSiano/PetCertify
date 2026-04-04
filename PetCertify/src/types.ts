/// <reference types="vite/client" />

export type CertificateType = 'playful' | 'elegant' | 'adventurous' | 'academic';

export interface PetCertificateData {
    id: string;
    petName: string;
    ownerName: string;
    courseName: string;
    merits: string;
    skills: string;
    achievements: string;
    date: string;
    type: CertificateType;
}