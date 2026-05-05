import { useState, useEffect } from "react";
import { PetCertificateData } from "../types";
import confetti from "canvas-confetti";
import { preview } from "vite";

export const useCertificates = () => {
    const [certificates, setCertificates] = useState<PetCertificateData[]>([]);
    const [selectedCertificate, setSelectedCertificate] = useState<PetCertificateData | null>(null);

    // Load from local storage
    useEffect(() => {
        const saved = localStorage.getItem('pet-certificates');
        if(saved) {
            try {
                setCertificates(JSON.parse(saved));
            } catch (e) {
                console.error('Failed to parse local storage certificates', e);
            }
        }
    }, []);

    // Save to local storage
    useEffect(() => {
        localStorage.setItem('pet-certificates', JSON.stringify(certificates));
    }, [certificates]);

    const addCertificate = (data: PetCertificateData) => {
        setCertificates((prev) => [data, ...prev]);
        setSelectedCertificate(data);
        triggerConfetti();
    };

    const addBulkCertificates = (data: PetCertificateData[]) => {
        setCertificates((prev) => [...data, ...prev]);
        triggerConfetti();
    };

    const deleteCertificate = (id: string) => {
        setCertificates((prev) => prev.filter((c) => c.id !== id));
        if(selectedCertificate?.id === id) setSelectedCertificate(null);
    };

    const clearAllCertificates = () => {
        if(confirm('Tem certeza que deseja limpar todos os certificados?')) {
            setCertificates([]);
            setSelectedCertificate(null);
        }
    };

    const triggerConfetti = () => {
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#9d7bb0', '#d1b3e0', '#6b4d80', '#ffffff']
        });
    };

    return {
        certificates,
        selectedCertificate,
        setSelectedCertificate,
        addCertificate,
        addBulkCertificates,
        deleteCertificate,
        clearAllCertificates,
    };
};