import React from 'react';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="min-h-screen bg-pastel-yellow text-retro-dark font-body selection:bg-retro-yellow selection:text-deep-green overflow-x-hidden">
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 flex flex-col gap-24">
                {children}
            </main>
            <div className="fixed inset-0 pointer-events-none z-50 mix-blend-multiply opacity-5 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
        </div>
    );
};

export default Layout;
