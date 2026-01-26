import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import EnhancedTable from '@/Items/EnhancedTable';
import EnhancedParticipantsTable from '@/Participants/EnhancedParticipantsTable';


export default function Dashboard() {
    const [activeTab, setActiveTab] = useState('dashboard');

    return (
        <AuthenticatedLayout
            activeTab={activeTab}
            setActiveTab={setActiveTab}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {/* Dashboard Tab Content */}
                    {activeTab === 'dashboard' && (
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                            <div className="p-6 text-gray-900">
                                You're logged in!
                            </div>
                        </div>
                    )}

                    {/* Items Tab Content */}
                    {activeTab === 'items' && (
                        <div>
                            <EnhancedTable />
                        </div>
                    )}

                    {/* Participants Tab Content */}
                    {activeTab === 'participants' && (
                        <div>
                            <EnhancedParticipantsTable />
                        </div>
                    )}
                    

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
