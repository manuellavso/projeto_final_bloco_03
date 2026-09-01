import { useEffect, useState } from "react";
import { MagnifyingGlassIcon, PlusIcon,} from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import CardProduto from "../cardproduto/CardProduto";
import type Produto from "../../../models/Produto";
import { buscar } from "../../../service/Service";
import { SyncLoader } from "react-spinners";

function ListaProdutos() {

    const [produtos, setProdutos] = useState<Produto[]>([]);

    const [busca, setBusca] = useState("");

    const [isLoading, setIsLoading] = useState<boolean>(false);


    // Buscar produtos
    useEffect(() => {
        buscarProdutos();
    }, []);


    async function buscarProdutos() {

        try {

            setIsLoading(true);

            await buscar(
                "/produtos",
                setProdutos,
                {}
            );

        } catch (error) {

            console.error("Erro ao buscar produtos:", error);

        } finally {

            setIsLoading(false);

        }

    }


    // Filtrar produtos pela busca
    const produtosFiltrados = produtos.filter((produto) =>
        produto.nome
            .toLowerCase()
            .includes(busca.toLowerCase())
    );


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
                            Produtos
                        </h1>

                        <p className="text-gray-500 mt-2">
                            Encontre os produtos que você procura.
                        </p>

                    </div>


                    {/* Botão Novo Produto */}
                    <Link
                        to="/cadastrarproduto"
                        className="inline-flex items-center justify-center gap-2 rounded-full bg-orange-500 px-6 py-3 text-sm font-bold text-white shadow-sm transition-all duration-200 hover:bg-orange-600 hover:-translate-y-0.5 hover:shadow-md"
                    >
                        <PlusIcon size={20} weight="bold" />
                        Novo produto
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
                            placeholder="Buscar produto..."
                            className="w-full ml-3 outline-none text-gray-700 placeholder:text-gray-400"
                        />

                    </div>

                </div>


                {/* Lista de produtos */}
                {!isLoading && produtosFiltrados.length > 0 && (

                    <div className="grid grid-cols-1 justify-items-center md:grid-cols-3 md:justify-items-stretch lg:grid-cols-4 gap-5">

                        {produtosFiltrados.map((produto) => (

                            <CardProduto
                                key={produto.id}
                                produto={produto}
                            />

                        ))}

                    </div>

                )}


                {/* Nenhum produto encontrado */}
                {!isLoading && produtosFiltrados.length === 0 && (

                    <div className="py-12 text-center">

                        <p className="text-2xl font-bold text-gray-700">
                            Nenhum produto encontrado.
                        </p>

                        <p className="text-sm text-gray-500 mt-2">
                            {busca
                                ? "Tente buscar por outro nome."
                                : "Cadastre um novo produto para começar."
                            }
                        </p>

                    </div>

                )}

            </section>

        </main>

    );

}

export default ListaProdutos;
