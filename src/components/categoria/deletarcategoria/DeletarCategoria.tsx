import { TrashIcon, ArrowLeftIcon, WarningIcon } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { buscar, deletar } from "../../../service/Service";
import axios from "axios";
import type Categoria from "../../../models/Categoria";
import { toast } from "react-toastify";

function DeletarCategoria() {

    // Objeto responsável por redirecionar a categoria para outra rota
    const navigate = useNavigate();

    // Estado responsável por controlar o loader
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // Estado responsável por armazenar os dados da categoria
    const [categoria, setCategoria] = useState<Categoria>({} as Categoria);

    // Acessar o parâmetro da rota (id da categoria)
    const { id } = useParams<{ id: string }>();

    // Função responsável por buscar uma categoria pelo ID no Backend
    async function buscarCategoriaPorId() {

        setIsLoading(true);

        try {

            await buscar(`/categorias/${id}`, setCategoria, {});

        } catch (error) {

            if (axios.isAxiosError(error)) {
                toast.error(
                    `Erro ao consultar a categoria: ${error.response?.status}`
                );
            }

        } finally {

            setIsLoading(false);

        }

    }

    // useEffect para buscar a categoria
    useEffect(() => {

        if (id !== undefined) {
            buscarCategoriaPorId();
        }

    }, [id]);


    // Função responsável por deletar uma categoria pelo ID
    async function deletarCategoria() {

        setIsLoading(true);

        try {

            await deletar(`/categorias/${id}`, {});

            toast.success("Categoria deletada com sucesso!");

            retornar();

        } catch (error) {

            if (axios.isAxiosError(error)) {
                toast.error(
                    `Erro ao deletar a categoria: ${error.response?.status}`
                );
            }

        } finally {

            setIsLoading(false);

        }

    }

    function retornar() {
        navigate("/categorias");
    }

    return (

        <main className="grow w-full bg-white">

            <section className="max-w-lg mx-auto px-4 md:px-8 py-16">

                <Link
                    to="/categorias"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-orange-600 hover:text-orange-700 transition-colors mb-8"
                >
                    <ArrowLeftIcon size={18} />
                    Voltar para categorias
                </Link>

                <div className="rounded-2xl border border-red-100 bg-white p-8 shadow-sm text-center">

                    {/* Ícone de aviso*/}
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-red-500">
                        <WarningIcon
                            size={34}
                            weight="fill"
                        />

                    </div>

                    <h1 className="mt-6 text-2xl font-extrabold text-gray-800">
                        Deletar categoria?
                    </h1>

                    <p className="mt-3 text-gray-500">

                        Tem certeza que deseja deletar esta categoria{" "}

                        <span className="font-semibold text-slate-800">
                            {categoria.nome}
                        </span>
                            ?   
                    </p>


                    {/* Botões */}
                    <div className="mt-8 flex flex-col sm:flex-row gap-3">

                        <Link
                            to="/categorias"
                            className=" flex-1 rounded-xl  border border-gray-200 px-5 py-3 font-bold  text-gray-600 hover:bg-gray-50 transition-colors"
                        >
                            Cancelar
                        </Link>


                        <button
                            type="button"
                            onClick={deletarCategoria}
                            disabled={isLoading}
                            className=" flex-1 flex items-center justify-center gap-2 rounded-xl bg-red-500 px-5 py-3 font-bold text-white hover:bg-red-600 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                        >

                            <TrashIcon
                                size={20} weight="bold"
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

export default DeletarCategoria;