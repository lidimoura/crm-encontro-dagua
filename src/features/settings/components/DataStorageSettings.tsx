// =============================================================================
// DataStorageSettings - Configurações de armazenamento de dados (SIMPLIFICADO)
// =============================================================================

import React from 'react';
import { Database } from 'lucide-react';
import { useCRM } from '@/context/CRMContext';

export const DataStorageSettings: React.FC = () => {
    const { deals, contacts, companies, activities, boards } = useCRM();

    // Estatísticas
    const stats = {
        companies: companies.length,
        contacts: contacts.length,
        deals: deals.length,
        activities: activities.length,
        boards: boards.length,
    };

    return (
        <div className="space-y-6">
            {/* Data Statistics */}
            <div className="bg-white dark:bg-dark-card rounded-lg border border-gray-200 dark:border-dark-border p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <Database className="w-5 h-5" />
                    Estatísticas do Sistema
                </h3>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    <div className="p-4 bg-gray-50 dark:bg-dark-bg rounded-lg text-center">
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.companies}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Empresas</div>
                    </div>
                    <div className="p-4 bg-gray-50 dark:bg-dark-bg rounded-lg text-center">
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.contacts}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Contatos</div>
                    </div>
                    <div className="p-4 bg-gray-50 dark:bg-dark-bg rounded-lg text-center">
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.deals}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Negócios</div>
                    </div>
                    <div className="p-4 bg-gray-50 dark:bg-dark-bg rounded-lg text-center">
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.activities}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Atividades</div>
                    </div>
                    <div className="p-4 bg-gray-50 dark:bg-dark-bg rounded-lg text-center">
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.boards}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Boards</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DataStorageSettings;
