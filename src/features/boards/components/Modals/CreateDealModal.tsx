import React, { useState } from 'react';
import { useCRM } from '@/context/CRMContext';
import { Deal } from '@/types';
import { X } from 'lucide-react';

interface CreateDealModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const CreateDealModal: React.FC<CreateDealModalProps> = ({ isOpen, onClose }) => {
    const { addDeal, activeBoard, activeBoardId } = useCRM();
    const [newDealData, setNewDealData] = useState({
        title: '',
        companyName: '',
        value: '',
        contactName: '',
        email: '',
        phone: ''
    });

    if (!isOpen) return null;

    const handleCreateDeal = (e: React.FormEvent) => {
        e.preventDefault();
        const companyId = 'c-' + crypto.randomUUID().substr(0, 8);
        const contactId = 'p-' + crypto.randomUUID().substr(0, 8);

        // Usa o primeiro estágio do board ativo
        const firstStage = activeBoard.stages[0];

        const deal: Deal = {
            id: crypto.randomUUID(),
            title: newDealData.title,
            companyId: companyId,
            contactId: contactId,
            boardId: activeBoardId,
            value: Number(newDealData.value) || 0,
            items: [],
            status: firstStage.id,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            probability: 10,
            priority: 'medium',
            tags: ['Novo'],
            owner: { name: 'Eu', avatar: 'https://i.pravatar.cc/150?u=me' },
            customFields: {}
        };

        addDeal(deal, {
            companyName: newDealData.companyName,
            contact: {
                name: newDealData.contactName,
                email: newDealData.email,
                phone: newDealData.phone
            }
        });
        onClose();
        setNewDealData({ title: '', companyName: '', value: '', contactName: '', email: '', phone: '' });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
            <div className="bg-white dark:bg-dark-card border border-slate-200 dark:border-white/10 rounded-2xl shadow-2xl w-full max-w-md animate-in zoom-in-95 duration-200">
                <div className="p-5 border-b border-slate-200 dark:border-white/10 flex justify-between items-center">
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white font-display">Novo Negócio</h2>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-white"><X size={20} /></button>
                </div>
                <form onSubmit={handleCreateDeal} className="p-5 space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Nome do Negócio</label>
                        <input
                            required
                            type="text"
                            className="w-full bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-primary-500"
                            placeholder="Ex: Contrato Anual - Acme"
                            value={newDealData.title}
                            onChange={e => setNewDealData({ ...newDealData, title: e.target.value })}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Valor Estimado ($)</label>
                            <input
                                required
                                type="number"
                                className="w-full bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-primary-500"
                                placeholder="0.00"
                                value={newDealData.value}
                                onChange={e => setNewDealData({ ...newDealData, value: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Empresa</label>
                            <input
                                required
                                type="text"
                                className="w-full bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-primary-500"
                                placeholder="Empresa Ltd"
                                value={newDealData.companyName}
                                onChange={e => setNewDealData({ ...newDealData, companyName: e.target.value })}
                            />
                        </div>
                    </div>
                    <div className="pt-2 border-t border-slate-100 dark:border-white/5">
                        <h3 className="text-xs font-bold text-slate-400 uppercase mb-3">Contato Principal</h3>
                        <div className="space-y-3">
                            <input
                                type="text"
                                className="w-full bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-primary-500"
                                placeholder="Nome do Contato"
                                value={newDealData.contactName}
                                onChange={e => setNewDealData({ ...newDealData, contactName: e.target.value })}
                            />
                            <input
                                type="email"
                                className="w-full bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-primary-500"
                                placeholder="email@exemplo.com"
                                value={newDealData.email}
                                onChange={e => setNewDealData({ ...newDealData, email: e.target.value })}
                            />
                        </div>
                    </div>

                    <button type="submit" className="w-full bg-primary-600 hover:bg-primary-500 text-white font-bold py-2.5 rounded-lg mt-2 shadow-lg shadow-primary-600/20 transition-all">
                        Criar Negócio
                    </button>
                </form>
            </div>
        </div>
    );
};
