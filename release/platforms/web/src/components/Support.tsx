import { Mail, MessageSquare, Github, Lightbulb } from 'lucide-react';

export function Support() {
    return (
        <>
            {/* Desktop Layout */}
            <div className="hidden lg:flex flex-col items-center justify-center h-full">
                <div className="bg-[#161A2C] rounded-3xl p-12 w-full max-w-2xl shadow-xl border border-[#256DFF]/10">
                    <div className="text-center mb-10">
                        <div className="w-16 h-16 bg-[#256DFF]/20 rounded-2xl flex items-center justify-center mx-auto mb-6 text-[#256DFF]">
                            <MessageSquare className="w-8 h-8" />
                        </div>
                        <h2 className="text-3xl font-bold text-white mb-4">Contact Support</h2>
                        <p className="text-[#B4BACB] text-lg">
                            Have questions, suggestions, or found a bug? We're here to help!
                        </p>
                    </div>

                    <div className="grid gap-6">
                        <a
                            href="mailto:rhytmo@allansrc.com.br"
                            className="flex items-center gap-6 p-6 rounded-2xl bg-[#0C1020] hover:bg-[#0C1020]/80 border border-[#256DFF]/10 transition-all group"
                        >
                            <div className="w-12 h-12 rounded-full bg-[#256DFF]/10 flex items-center justify-center text-[#256DFF] group-hover:scale-110 transition-transform">
                                <Mail className="w-6 h-6" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-white font-semibold text-lg mb-1">Email Support</h3>
                                <p className="text-[#B4BACB]">Get in touch via email</p>
                            </div>
                            <div className="text-[#256DFF]">rhytmo@allansrc.com.br</div>
                        </a>

                        <a
                            href="https://github.com/rhytmoapp/rhytmoapp.github.io/issues/new?labels=bug&template=bug_report.md"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-6 p-6 rounded-2xl bg-[#0C1020] hover:bg-[#0C1020]/80 border border-[#256DFF]/10 transition-all group"
                        >
                            <div className="w-12 h-12 rounded-full bg-[#256DFF]/10 flex items-center justify-center text-[#256DFF] group-hover:scale-110 transition-transform">
                                <Github className="w-6 h-6" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-white font-semibold text-lg mb-1">Report Issues</h3>
                                <p className="text-[#B4BACB]">Found a bug? Let us know!</p>
                            </div>
                            <div className="text-[#256DFF]">GitHub Issues</div>
                        </a>

                        <a
                            href="https://github.com/rhytmoapp/rhytmoapp.github.io/issues/new?labels=enhancement&template=feature_request.md"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-6 p-6 rounded-2xl bg-[#0C1020] hover:bg-[#0C1020]/80 border border-[#256DFF]/10 transition-all group"
                        >
                            <div className="w-12 h-12 rounded-full bg-[#256DFF]/10 flex items-center justify-center text-[#256DFF] group-hover:scale-110 transition-transform">
                                <Lightbulb className="w-6 h-6" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-white font-semibold text-lg mb-1">Request Feature</h3>
                                <p className="text-[#B4BACB]">Have an idea? Suggest a feature!</p>
                            </div>
                            <div className="text-[#256DFF]">Feature Request</div>
                        </a>
                    </div>
                </div>
            </div>

            {/* Mobile Layout */}
            <div className="lg:hidden flex flex-col h-full">
                <div className="flex-1 flex flex-col items-center justify-center text-center">
                    <div className="w-16 h-16 bg-[#256DFF]/20 rounded-2xl flex items-center justify-center mb-6 text-[#256DFF]">
                        <MessageSquare className="w-8 h-8" />
                    </div>

                    <h2 className="text-2xl font-bold text-white mb-3">Contact Support</h2>
                    <p className="text-[#B4BACB] mb-8">
                        Have questions? We're here to help!
                    </p>

                    <div className="w-full grid gap-4">
                        <a
                            href="mailto:rhytmo@allansrc.com.br"
                            className="flex items-center gap-4 p-4 rounded-xl bg-[#0C1020] border border-[#256DFF]/10 active:scale-[0.98] transition-all"
                        >
                            <div className="w-10 h-10 rounded-full bg-[#256DFF]/10 flex items-center justify-center text-[#256DFF]">
                                <Mail className="w-5 h-5" />
                            </div>
                            <div className="flex-1 text-left">
                                <h3 className="text-white font-medium">Email Support</h3>
                                <p className="text-[#B4BACB] text-xs">rhytmo@allansrc.com.br</p>
                            </div>
                        </a>

                        <a
                            href="https://github.com/rhytmoapp/rhytmoapp.github.io/issues/new?labels=bug&template=bug_report.md"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-4 p-4 rounded-xl bg-[#0C1020] border border-[#256DFF]/10 active:scale-[0.98] transition-all"
                        >
                            <div className="w-10 h-10 rounded-full bg-[#256DFF]/10 flex items-center justify-center text-[#256DFF]">
                                <Github className="w-5 h-5" />
                            </div>
                            <div className="flex-1 text-left">
                                <h3 className="text-white font-medium">Report Issues</h3>
                                <p className="text-[#B4BACB] text-xs">GitHub Issues</p>
                            </div>
                        </a>

                        <a
                            href="https://github.com/rhytmoapp/rhytmoapp.github.io/issues/new?labels=enhancement&template=feature_request.md"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-4 p-4 rounded-xl bg-[#0C1020] border border-[#256DFF]/10 active:scale-[0.98] transition-all"
                        >
                            <div className="w-10 h-10 rounded-full bg-[#256DFF]/10 flex items-center justify-center text-[#256DFF]">
                                <Lightbulb className="w-5 h-5" />
                            </div>
                            <div className="flex-1 text-left">
                                <h3 className="text-white font-medium">Request Feature</h3>
                                <p className="text-[#B4BACB] text-xs">Feature Request</p>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}
