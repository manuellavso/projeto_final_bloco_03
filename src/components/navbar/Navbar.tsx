import { ListIcon, ShoppingCartIcon, XIcon } from "@phosphor-icons/react";
import { useState } from "react";

function Navbar() {

    const [menuAberto, setMenuAberto] = useState(false);

    return (
        <header className="sticky top-0 z-50 w-full bg-white border-b border-orange-100 shadow-sm">

            <nav className="max-w-7xl mx-auto h-20 px-4 md:px-8 flex items-center justify-between">

                {/* Logo */}
                <div className="text-2xl md:text-3xl font-extrabold tracking-tight text-orange-600">
                    Farma<span className="text-orange-400">nu</span>
                </div>

                {/* Desktop */}
                <div className="hidden md:flex items-center gap-8 font-semibold text-gray-600">

                    <span className="hover:text-orange-600 transition-colors cursor-pointer">
                        Home
                    </span>
                    <span className="hover:text-orange-600 transition-colors cursor-pointer">
                        Produtos
                    </span>
                    <span className="hover:text-orange-600 transition-colors cursor-pointer">
                        Categorias
                    </span>
                    <span className="hover:text-orange-600 transition-colors cursor-pointer">
                        Contato
                    </span>

                </div>

                {/* Ações */}
                <div className="flex items-center gap-3">

                    {/* Carrinho */}
                    <button
                        className="p-2.5 rounded-full text-orange-600 hover:bg-orange-50 transition-colors"
                        aria-label="Carrinho de compras"
                    >
                        <ShoppingCartIcon size={24} />
                    </button>

                    {/* Perfil */}
                    <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-orange-200 cursor-pointer hover:border-orange-500 transition-colors">
                        <img
                            src="https://tse2.mm.bing.net/th/id/OIP.cPlK3psAUHu8CdRBYMjkowHaHe?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
                            alt="Foto de perfil do usuário"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Botão */}
                    <button
                        className="hidden sm:flex items-center px-5 py-2.5 rounded-full bg-orange-500 text-white font-bold text-sm hover:bg-orange-600 transition-colors shadow-sm"
                    >
                        Fale Conosco
                    </button>


                    {/* Menu Mobile - Hamburguer */}
                    <button
                        className="md:hidden p-2 text-gray-600 hover:text-orange-600 transition-colors"
                        onClick={() => setMenuAberto((open) => !open)}
                        aria-label={menuAberto ? "Fechar menu" : "Abrir menu"}
                    >
                        {menuAberto
                            ? <XIcon size={28} />
                            : <ListIcon size={28} />
                        }
                    </button>

                </div>

            </nav>

            {/* Menu Mobile - Hamburguer */}
            {menuAberto && (
                <div className="md:hidden border-t border-orange-100 bg-white px-5 py-4">

                    <div className="flex flex-col gap-1">
                        <span className="px-3 py-3 rounded-lg text-gray-600 font-semibold hover:bg-orange-50 hover:text-orange-600 cursor-pointer transition-colors">
                            Home
                        </span>
                        <span className="px-3 py-3 rounded-lg text-gray-600 font-semibold hover:bg-orange-50 hover:text-orange-600 cursor-pointer transition-colors">
                            Produtos
                        </span>
                        <span className="px-3 py-3 rounded-lg text-gray-600 font-semibold hover:bg-orange-50 hover:text-orange-600 cursor-pointer transition-colors">
                            Categorias
                        </span>
                        <span className="px-3 py-3 rounded-lg text-gray-600 font-semibold hover:bg-orange-50 hover:text-orange-600 cursor-pointer transition-colors">
                            Contato
                        </span>
                    </div>

                </div>
            )}

        </header>
    );
}

export default Navbar;