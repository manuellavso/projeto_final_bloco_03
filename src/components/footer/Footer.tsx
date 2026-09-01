import { FacebookLogoIcon, InstagramLogoIcon,  LinkedinLogoIcon,  YoutubeLogoIcon,  XLogoIcon } from "@phosphor-icons/react";

export default function Footer() {
    return (
        <footer className="relative mt-24 bg-orange-50 px-8 pt-24 pb-6 text-gray-700">

            {/* Estilização da onda (igual fiz no delivery) */}
            <div className="absolute -top-16 left-0 w-full overflow-hidden leading-none">
                <svg
                    className="relative block h-20 w-full"
                    viewBox="0 0 1200 120"
                    preserveAspectRatio="none"
                >
                    <path
                        d="M0,60 C250,0 350,0 550,40 C750,80 900,90 1200,65 L1200,120 L0,120 Z"
                        fill="#fff7ed"
                    />
                </svg>
            </div>

            {/* Conteúdo do footer*/}
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
                <div className="text-center md:text-left max-w-md">
                    <h2 className="text-2xl font-extrabold text-orange-600">
                        © 2026 Farma<span className="text-orange-400">nu</span>
                    </h2>
                    <p className="mt-3 text-sm md:text-base text-gray-600 leading-relaxed">
                        Esta empresa e todas as informações são fictícias 
                        e criadas exclusivamente para fins educacionais.
                    </p>
                </div>

                {/* Redes sociais */}
                <div className="text-center">
                    <h3 className="text-lg font-bold text-gray-800">
                        Nossas redes
                    </h3>

                    <div className="flex justify-center gap-4 mt-5">
                        <button
                            aria-label="Facebook"
                            className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-orange-600 shadow-sm hover:bg-orange-500 hover:text-white hover:-translate-y-1 transition-all"
                        >
                            <FacebookLogoIcon size={22} weight="fill" />
                        </button>
                        <button
                            aria-label="Instagram"
                            className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-orange-600 shadow-sm hover:bg-orange-500 hover:text-white hover:-translate-y-1 transition-all"
                        >
                            <InstagramLogoIcon size={22} weight="fill" />
                        </button>
                        <button
                            aria-label="X"
                            className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-orange-600 shadow-sm hover:bg-orange-500 hover:text-white hover:-translate-y-1 transition-all"
                        >
                            <XLogoIcon size={22} weight="fill" />
                        </button>
                        <button
                            aria-label="LinkedIn"
                            className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-orange-600 shadow-sm hover:bg-orange-500 hover:text-white hover:-translate-y-1 transition-all"
                        >
                            <LinkedinLogoIcon size={22} weight="fill" />
                        </button>
                        <button
                            aria-label="YouTube"
                            className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-orange-600 shadow-sm hover:bg-orange-500 hover:text-white hover:-translate-y-1 transition-all"
                        >
                            <YoutubeLogoIcon size={22} weight="fill" />
                        </button>
                    </div>
                </div>

            </div>

        </footer>
    );
}