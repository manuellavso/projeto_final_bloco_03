import { TrashIcon, ArrowLeftIcon, WarningIcon } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { buscar, deletar } from "../../../service/Service";
import axios from "axios";
import type Produto from "../../../models/Produto";
import { toast } from "react-toastify";

function DeletarProduto() {

    // Objeto responsável por redirecionar o produto para outra rota
    const navigate = useNavigate();

    // Estado responsável por controlar o loader
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // Estado responsável por armazenar os dados do produto
    const [produto, setProduto] = useState<Produto>({} as Produto);

    // Acessar o parâmetro da rota (id do produto)
    const { id } = useParams<{ id: string }>();


    // Função responsável por buscar um produto pelo ID no Backend
    async function buscarProdutoPorId() {

        setIsLoading(true);

        try {

            await buscar(`/produtos/${id}`, setProduto, {});

        } catch (error) {

            if (axios.isAxiosError(error)) {
                toast.error(
                    `Erro ao consultar o produto: ${error.response?.status}`
                );
            }

        } finally {

            setIsLoading(false);

        }

    }


    // useEffect para buscar o produto
    useEffect(() => {

        if (id !== undefined) {
            buscarProdutoPorId();
        }

    }, [id]);


    // Função responsável por deletar um produto pelo ID
    async function deletarProduto() {

        setIsLoading(true);

        try {

            await deletar(`/produtos/${id}`, {});

            toast.success("Produto deletado com sucesso!");

            retornar();

        } catch (error) {

            if (axios.isAxiosError(error)) {
                toast.error(
                    `Erro ao deletar o produto: ${error.response?.status}`
                );
            }

        } finally {

            setIsLoading(false);

        }

    }


    function retornar() {
        navigate("/produtos");
    }


    return (

        <main className="grow w-full bg-white">

            <section className="max-w-lg mx-auto px-4 md:px-8 py-16">

                <div className="rounded-2xl border border-red-100 bg-white p-8 shadow-sm text-center">

                    {/* Ícone de aviso */}
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-red-500">

                        <WarningIcon
                            size={34}
                            weight="fill"
                        />

                    </div>


                    <h1 className="mt-6 text-2xl font-extrabold text-gray-800">

                        Deletar produto?

                    </h1>


                    <p className="mt-3 text-gray-500">

                        Tem certeza que deseja deletar este produto{" "}

                        <span className="font-semibold text-slate-800">

                            {produto.nome}

                        </span>

                        ?

                    </p>


                    {/* Botões */}
                    <div className="mt-8 flex flex-col sm:flex-row gap-3">

                        <Link
                            to="/produtos"
                            className="
                                flex-1
                                rounded-xl
                                border border-gray-200
                                px-5 py-3
                                font-bold
                                text-gray-600
                                hover:bg-gray-50
                                transition-colors
                            "
                        >

                            Cancelar

                        </Link>


                        <button
                            type="button"
                            onClick={deletarProduto}
                            disabled={isLoading}
                            className="
                                flex-1
                                flex items-center justify-center gap-2
                                rounded-xl
                                bg-red-500
                                px-5 py-3
                                font-bold
                                text-white
                                hover:bg-red-600
                                transition-colors
                                disabled:opacity-60
                                disabled:cursor-not-allowed
                            "
                        >

                            <TrashIcon
                                size={20}
                                weight="bold"
                            />

                            {isLoading
                                ? "Deletando..."
                                : "Deletar"
                            }

                        </button>

                    </div>

                </div>

            </section>

        </main>

    );

}

export default DeletarProduto;