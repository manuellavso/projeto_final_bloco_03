import {
    MagnifyingGlassIcon,
    HeartIcon,
    ShieldCheckIcon,
    TruckIcon,
    HeadsetIcon,
    TagIcon,
} from "@phosphor-icons/react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Home() {

    interface Categoria {
        id: number;
        nome: string;
    }

    interface Produto {
        id: number;
        nome: string;
        preco: number;
        foto: string;
        categoria: {
            id: number;
            nome: string;
        };
    }

    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [produtos, setProdutos] = useState<Produto[]>([]);

    useEffect(() => {

        axios
            .get("https://farmacia-ug0p.onrender.com/categorias")
            .then((res) => {
                setCategorias(res.data);
            })
            .catch((erro) => {
                console.error("Erro ao buscar categorias:", erro);
            });

        axios
            .get("https://farmacia-ug0p.onrender.com/produtos")
            .then((res) => {
                setProdutos(res.data);
            })
            .catch((erro) => {
                console.error("Erro ao buscar produtos:", erro);
            });

    }, []);

    return (
        <main className="grow w-full bg-white">

            {/* Hero */}
            <section className="bg-orange-50 border-b border-orange-100">

                <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16">

                    <div className="max-w-3xl mx-auto text-center">

                        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-800 leading-tight">
                            Cuidar da sua saúde ficou mais fácil.
                        </h1>

                        <p className="mt-4 text-gray-600 text-base md:text-lg">
                            Encontre medicamentos, cosméticos e cuidados aqui na Farmácia da Manu.
                        </p>

                        {/* Busca */}
                        <div className="mt-8 max-w-2xl mx-auto">

                            <div className="flex items-center bg-white border border-orange-200 rounded-full px-5 py-3.5 shadow-sm focus-within:ring-2 focus-within:ring-orange-300">

                                <MagnifyingGlassIcon
                                    size={24}
                                    className="text-orange-500 shrink-0"
                                />

                                <input
                                    type="text"
                                    placeholder="Buscar na Farmanu"
                                    className="w-full ml-3 outline-none text-gray-700 placeholder:text-gray-400"
                                />

                            </div>

                        </div>

                    </div>

                </div>

            </section>


            {/* Benefícios */}
            <section className="max-w-7xl mx-auto w-full px-4 md:px-8 py-8">

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-4">

                    <div className="flex items-center gap-4 p-5 rounded-xl bg-white border border-orange-100">
                        <div className="w-11 h-11 rounded-full bg-orange-50 flex items-center justify-center">
                            <TruckIcon
                                size={24}
                                className="text-orange-500"
                            />
                        </div>

                        <div>
                            <h3 className="font-bold text-gray-800">
                                Entrega rápida
                            </h3>

                            <p className="text-sm text-gray-500">
                                Receba seus produtos com praticidade
                            </p>
                        </div>
                    </div>


                    <div className="flex items-center gap-4 p-5 rounded-xl bg-white border border-orange-100">
                        <div className="w-11 h-11 rounded-full bg-orange-50 flex items-center justify-center">
                            <ShieldCheckIcon
                                size={24}
                                className="text-orange-500"
                            />
                        </div>

                        <div>
                            <h3 className="font-bold text-gray-800">
                                Compra segura
                            </h3>

                            <p className="text-sm text-gray-500">
                                Segurança em todos os seus pedidos
                            </p>
                        </div>
                    </div>


                    <div className="flex items-center gap-4 p-5 rounded-xl bg-white border border-orange-100">
                        <div className="w-11 h-11 rounded-full bg-orange-50 flex items-center justify-center">
                            <HeartIcon
                                size={24}
                                className="text-orange-500"
                            />
                        </div>

                        <div>
                            <h3 className="font-bold text-gray-800">
                                Cuidado para você
                            </h3>

                            <p className="text-sm text-gray-500">
                                Produtos para saúde e bem-estar
                            </p>
                        </div>
                    </div>

                </div>

            </section>


            {/* Categorias */}
            <section className="max-w-7xl mx-auto w-full px-4 md:px-8 py-8">

                <div className="flex items-end justify-between mb-6">

                    <div>

                        <span className="text-sm font-bold uppercase tracking-wider text-orange-500">
                            Explore nossos produtos
                        </span>

                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mt-1">
                            Categorias
                        </h2>

                    </div>

                </div>


                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-4">

                    {categorias.slice(0, 4).map((categoria) => (

                        <div
                            key={categoria.id}
                            className="
                                group flex flex-col items-center justify-center text-center min-h-36
                                p-6 rounded-xl bg-orange-50 border border-orange-100 cursor-pointer
                                transition-all duration-300 hover:-translate-y-1 hover:bg-orange-100 hover:border-orange-200 hover:shadow-md
                            "
                        >

                            <div
                                className="
                                    flex items-center justify-center w-14 h-14 rounded-full bg-white text-orange-500
                                    shadow-sm transition-transform duration-300 group-hover:scale-110
                                "
                            >

                                <TagIcon
                                    size={30}
                                    weight="fill"
                                />

                            </div>

                            <h3
                                className="mt-3 font-bold text-gray-800 transition-colors duration-300 group-hover:text-orange-600"
                            >
                                {categoria.nome}
                            </h3>

                            <p className="text-sm text-gray-500 mt-1">
                                Confira nossos produtos
                            </p>

                        </div>

                    ))}

                </div>

            </section>


            {/* Produtos */}
            <section className="max-w-7xl mx-auto w-full px-4 md:px-8 py-8">

                <div className="flex items-end justify-between mb-6">

                    <div>

                        <span className="text-sm font-bold uppercase tracking-wider text-orange-500">
                            Recomendados para você
                        </span>

                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mt-1">
                            Produtos
                        </h2>

                    </div>

                    <Link to="/produtos">
                        <button className="hidden sm:block text-orange-600 font-bold hover:text-orange-700">
                            Ver todos
                        </button>
                    </Link>

                </div>


                {/* Produtos vindos da API */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-5 px-4 py-8">

                    {produtos.slice(0, 4).map((produto) => (

                        <div
                            key={produto.id}
                            className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow"
                        >

                            <div className="h-40 bg-gray-50 rounded-lg mb-4 flex items-center justify-center overflow-hidden">

                                <img
                                    src={produto.foto}
                                    alt={produto.nome}
                                    className="w-full h-full object-cover"
                                />

                            </div>

                            <p className="text-xs text-gray-400">
                                {produto.categoria?.nome}
                            </p>

                            <h3 className="font-semibold text-gray-800 mt-1">
                                {produto.nome}
                            </h3>

                            <p className="text-lg font-bold text-orange-600 mt-3">
                                R$ {Number(produto.preco).toFixed(2).replace(".", ",")}
                            </p>

                        </div>

                    ))}

                </div>


                {/* Central de Atendimento */}
                <section className="max-w-7xl mx-auto w-full px-4 md:px-8 py-8">

                    <div className="bg-orange-500 rounded-2xl px-6 py-10 md:px-12 md:py-12 flex flex-col md:flex-row items-center justify-between gap-8">

                        <div className="flex flex-col md:flex-row items-center gap-5 text-center md:text-left">

                            {/* Ícone */}
                            <div className="w-16 h-16 shrink-0 rounded-full bg-white flex items-center justify-center shadow-sm">

                                <HeadsetIcon
                                    size={32}
                                    weight="fill"
                                    className="text-orange-500"
                                />

                            </div>

                            {/* Texto */}
                            <div>

                                <h2 className="text-2xl md:text-3xl font-bold text-white">
                                    Central de atendimento
                                </h2>

                                <p className="mt-2 text-orange-50">
                                    Confira as dúvidas mais frequentes ou fale com a gente.
                                </p>

                            </div>

                        </div>


                        {/* Botão */}
                        <Link to="/contato">
                        <button
                            className="shrink-0 bg-white text-orange-600 font-bold px-7 py-3 rounded-full hover:bg-orange-50 transition-colors shadow-sm"
                        >
                            Fale com a gente
                        </button>
                        </Link>

                    </div>

                </section>

            </section>

        </main>
    );
}