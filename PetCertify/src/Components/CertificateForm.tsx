import React, { useState } from 'react';
import { PetCertificateData, CertificateType } from '../types';
import { PlusCircle, User, Dog, BookOpen, Star, Award, Trophy, Calendar } from 'lucide-react';

interface CertificateFormProps {
    onSubmit: (data: PetCertificateData) => void
}