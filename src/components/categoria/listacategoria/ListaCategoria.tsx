import { useEffect, useState } from "react";
import {
    MagnifyingGlassIcon,
    XIcon,
    ShoppingBagIcon,
    PlusIcon,
} from "@phosphor-icons/react";
import CardCategoria from "../cardcategoria/CardCategoria";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { SyncLoader } from "react-spinners";

interface Categoria {
    id: number;
    nome: string;
}

interface Produto {
    id: number;
    nome: string;
    preco: string;
    foto: string;
    categoria: {
        id: number;
        nome: string;
    };
}

function ListaCategoria() {

    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [produtos, setProdutos] = useState<Produto[]>([]);

    const [categoriaSelecionada, setCategoriaSelecionada] =
        useState<Categoria | null>(null);

    const [busca, setBusca] = useState("");
    
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        buscarCategorias();
        buscarProdutos();

    }, []);

    async function buscarCategorias() {
        try {
            setIsLoading(true);
            const resposta = await fetch(
                "https://farmacia-ug0p.onrender.com/categorias"
            );
            const dados = await resposta.json();
            setCategorias(dados);
        } catch (error) {

            toast.error("Erro ao buscar categorias");
        } finally {

            setIsLoading(false);
        }
    }

    async function buscarProdutos() {
        try {
            setIsLoading(true);

            const resposta = await fetch(
                "https://farmacia-ug0p.onrender.com/produtos"
            );

            const dados = await resposta.json();

            setProdutos(dados);

        } catch (error) {

            toast.error("Erro ao buscar produtos");

        } finally {
            setIsLoading(false);
        }

    }

    const categoriasFiltradas = categorias.filter((categoria) =>
        categoria.nome
            .toLowerCase()
            .includes(busca.toLowerCase())
    );

    const produtosDaCategoria = categoriaSelecionada
        ? produtos.filter(
            (produto) =>
                produto.categoria.id === categoriaSelecionada.id
        )
        : [];

    return (
        <main className="grow w-full bg-white">

            {/* Loader */}
            {isLoading && (
                <div className="flex justify-center w-full my-8">
                    <SyncLoader
                        color="#f97316"
                        size={12}
                    />
                </div>
            )}

            <section className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16">

                {/* Cabeçalho */}
                <div className="mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-5">
                    <div>

                        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 mt-1">
                            Categorias
                        </h1>

                        <p className="text-gray-500 mt-2">
                            Encontre os produtos que você procura.
                        </p>
                    </div>


                    {/* Botão Nova Categoria */}
                    <Link
                        to="/cadastrarcategoria"
                        className="inline-flex items-center justify-center gap-2 rounded-full bg-orange-500 px-6 py-3 text-sm font-bold text-white shadow-sm transition-all duration-200 hover:bg-orange-600 hover:-translate-y-0.5 hover:shadow-md"
                    >
                        <PlusIcon size={20} weight="bold" />
                        Nova categoria
                    </Link>

                </div>


                {/* Busca */}
                <div className="mb-8">
                    <div className="flex items-center bg-white border border-orange-100 rounded-xl px-4 py-3 shadow-sm">
                        <MagnifyingGlassIcon
                            size={22}
                            className="text-orange-500"
                        />

                        <input
                            type="text"
                            value={busca}
                            onChange={(event) =>
                                setBusca(event.target.value)
                            }
                            placeholder="Buscar categoria..."
                            className="w-full ml-3 outline-none text-gray-700 placeholder:text-gray-400"
                        />
                    </div>
                </div>


                {/* Lista de categorias */}
                {!isLoading && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {categoriasFiltradas.map((categoria) => (
                            <div key={categoria.id}>
                                <CardCategoria
                                    categoria={categoria}
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        setCategoriaSelecionada(categoria)
                                    }
                                    className="mt-2 text-sm font-bold text-orange-600 hover:text-orange-700 transition-colors"
                                >
                                    Ver produtos →
                                </button>
                            </div>
                        ))}
                    </div>
                )}


                {/* Modal */}
                {categoriaSelecionada && (
                    <div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
                        onClick={() =>
                            setCategoriaSelecionada(null)
                        }
                    >

                        <div
                            className="w-full max-w-4xl max-h-[85vh] overflow-y-auto rounded-2xl bg-white p-6 md:p-8 shadow-2xl"
                            onClick={(event) =>
                                event.stopPropagation()
                            }
                        >

                            {/* Cabeçalho do modal */}
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <span className="text-sm font-bold uppercase tracking-wider text-orange-500">
                                        Produtos
                                    </span>

                                    <h2 className="text-2xl md:text-3xl font-extrabold text-gray-800">
                                        {categoriaSelecionada.nome}
                                    </h2>
                                </div>

                                <button
                                    type="button"
                                    onClick={() =>
                                        setCategoriaSelecionada(null)
                                    }
                                    className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                                >
                                    <XIcon size={22} />
                                </button>

                            </div>

                            {/* Produtos */}
                            {produtosDaCategoria.length > 0 ? (
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {produtosDaCategoria.map((produto) => (
                                        <div
                                            key={produto.id}
                                            className="rounded-xl border border-orange-100 bg-white p-4 shadow-sm"
                                        >

                                            <div className="h-36 bg-orange-50 rounded-lg overflow-hidden mb-4">
                                                <img
                                                    src={produto.foto}
                                                    alt={produto.nome}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>

                                            <p className="text-xs text-gray-400">
                                                {produto.categoria.nome}
                                            </p>

                                            <h3 className="font-bold text-gray-800 mt-1">
                                                {produto.nome}
                                            </h3>

                                            <p className="text-lg font-bold text-orange-600 mt-3">
                                                R$ {produto.preco}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            ) : (

                                <div className="py-12 text-center">
                                    <ShoppingBagIcon
                                        size={48}
                                        className="mx-auto text-orange-300"
                                    />
                                    <p className="mt-4 font-semibold text-gray-700">
                                        Nenhum produto encontrado.
                                    </p>
                                    <p className="text-sm text-gray-500 mt-1">
                                        Essa categoria ainda não possui produtos.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </section>
        </main>
    );
}

export default ListaCategoria;