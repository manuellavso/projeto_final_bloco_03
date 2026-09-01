import { useEffect, useState } from "react";
import { CheckIcon, ArrowLeftIcon } from "@phosphor-icons/react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { buscar, atualizar, cadastrar } from "../../../service/Service";
import { toast } from "react-toastify";

interface Categoria {
    id?: number;
    nome: string;
}

function FormCategoria() {

    const [categoria, setCategoria] = useState<Categoria>({
        nome: "",
    });

    const [carregando, setCarregando] = useState(false);

    const navigate = useNavigate();
    const { id } = useParams();

    const modoEdicao = Boolean(id);

    useEffect(() => {

        if (id) {
            buscarCategoria();
        }

    }, [id]);


    async function buscarCategoria() {

        try {

            await buscar(
                `/categorias/${id}`,
                setCategoria,
                {}
            );

        } catch (error) {

            console.error("Erro ao buscar categoria:", error);
            toast.error("Não foi possível carregar a categoria.");

        }

    }


    function atualizarEstado(event: React.ChangeEvent<HTMLInputElement>) {

        setCategoria({
            ...categoria,
            nome: event.target.value,
        });

    }


    async function salvarCategoria(event: React.FormEvent<HTMLFormElement>) {

        event.preventDefault();

        if (!categoria.nome.trim()) {
            toast.info("Digite o nome da categoria.");
            return;
        }

        setCarregando(true);

        try {

            if (modoEdicao) {

                await atualizar(
                    "/categorias",
                    {
                        id: Number(id),
                        nome: categoria.nome,
                    },
                    {}
                );

                toast.success("Categoria atualizada com sucesso!");

            } else {

                await cadastrar(
                    "/categorias",
                    {
                        nome: categoria.nome,
                    },
                    setCategoria,
                    {}
                );

                toast.success("Categoria cadastrada com sucesso!");

            }

            navigate("/categorias");

        } catch (error) {

            console.error("Erro ao salvar categoria:", error);
            toast.error("Não foi possível salvar a categoria.");

        } finally {

            setCarregando(false);

        }

    }


    return (

        <main className="grow w-full bg-white">

            <section className="max-w-2xl mx-auto px-4 md:px-8 py-12 md:py-16">

                <Link
                    to="/categorias"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-orange-600 hover:text-orange-700 transition-colors mb-8"
                >
                    <ArrowLeftIcon size={18} />
                    Voltar para categorias
                </Link>


                <div className="mb-8">

                    <span className="text-sm font-bold uppercase tracking-wider text-orange-500">
                        Farmanu
                    </span>

                    <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 mt-1">
                        {modoEdicao
                            ? "Editar categoria"
                            : "Nova categoria"}
                    </h1>

                    <p className="text-gray-500 mt-2">
                        {modoEdicao
                            ? "Atualize as informações da categoria."
                            : "Cadastre uma nova categoria para sua farmácia."}
                    </p>

                </div>


                <form
                    onSubmit={salvarCategoria}
                    className="bg-white border border-orange-100 rounded-2xl p-6 md:p-8 shadow-sm"
                >

                    <div>

                        <label
                            htmlFor="nome"
                            className="block text-sm font-bold text-gray-700 mb-2"
                        >
                            Nome da categoria
                        </label>

                        <input
                            id="nome"
                            type="text"
                            value={categoria.nome}
                            onChange={atualizarEstado}
                            placeholder="Ex: Medicamentos"
                            className=" w-full  rounded-xl border border-orange-100 bg-white px-4 py-3 text-gray-700 outline-none transition-all focus:border-orange-400  focus:ring-2 focus:ring-orange-100"
                        />

                    </div>


                    <button
                        type="submit"
                        disabled={carregando}
                        className=" mt-6 w-full flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-5 py-3 font-bold text-white shadow-sm transition-colors hover:bg-orange-600 disabled:opacity-60 disabled:cursor-not-allowed"
                    >

                        <CheckIcon size={20} weight="bold" />

                        {carregando
                            ? "Salvando..."
                            : modoEdicao
                                ? "Atualizar categoria"
                                : "Cadastrar categoria"}

                    </button>

                </form>

            </section>

        </main>

    );

}

export default FormCategoria;