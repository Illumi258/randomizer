import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import { PropsWithChildren } from 'react';

export default function Guest({ children }: PropsWithChildren) {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4 py-12">
            <div className="mb-8">
                <Link href="/" className="transition-transform hover:scale-110 duration-200 inline-block">
                    <ApplicationLogo className="h-20 w-20 fill-current text-indigo-600 drop-shadow-md" />
                </Link>
            </div>

            <div className="w-full max-w-md overflow-hidden bg-white px-8 py-10 shadow-xl rounded-2xl border border-gray-100">
                {children}
            </div>
        </div>
    );
}
