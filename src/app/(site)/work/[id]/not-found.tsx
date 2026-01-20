export default function NotFound() {
    return (
        <div className="min-h-screen bg-black flex items-center justify-center text-white">
            <div className="text-center">
                <h1 className="font-syne text-6xl md:text-8xl font-bold mb-4">404</h1>
                <p className="font-inter text-xl text-white/50 mb-8">Project not found.</p>
                <a
                    href="/"
                    className="inline-block font-inter text-sm uppercase tracking-widest border-b border-white pb-1 hover:text-white/70 transition-colors"
                >
                    Return Home
                </a>
            </div>
        </div>
    );
}
