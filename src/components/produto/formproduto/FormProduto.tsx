import { useState, useEffect, type ChangeEvent, type FormEvent } from "react";
import { NumericFormat } from "react-number-format";
import { useNavigate, useParams, Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { ArrowLeftIcon, CheckIcon } from "@phosphor-icons/react";
import { toast } from "react-toastify";

import type Categoria from "../../../models/Categoria";
import type Produto from "../../../models/Produto";

import {
    buscar,
    atualizar,
    cadastrar
} from "../../../service/Service";

function FormProduto() {

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [categorias, setCategorias] = useState<Categoria[]>([]);

    const [categoria, setCategoria] = useState<Categoria>(
        {} as Categoria
    );

    const [produto, setProduto] = useState<Produto>(
        {} as Produto
    );

    const { id } = useParams<{ id: string }>();

    const modoEdicao = Boolean(id);


    // Buscar produto pelo ID quando estiver editando
    async function buscarProdutoPorId(id: string) {

        try {

            await buscar(
                `/produtos/${id}`,
                setProduto,
                {}
            );

        } catch (error) {

            console.error("Erro ao buscar produto:", error);
            toast.error("Não foi possível carregar o produto.");

        }

    }


    // Buscar todas as categorias
    async function buscarCategorias() {

        try {

            await buscar(
                "/categorias",
                setCategorias,
                {}
            );

        } catch (error) {

            console.error("Erro ao buscar categorias:", error);
            toast.error("Não foi possível carregar as categorias.");

        }

    }


    // Buscar categoria pelo ID
    async function buscarCategoriaPorId(id: string) {

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


    // Carregar categorias e produto
    useEffect(() => {

        buscarCategorias();

        if (id !== undefined) {
            buscarProdutoPorId(id);
        }

    }, [id]);


    // Quando o produto for carregado, definir a categoria selecionada
    useEffect(() => {

        if (produto.categoria) {
            setCategoria(produto.categoria);
        }

    }, [produto.categoria]);


    // Atualizar os dados do produto
    function atualizarEstado(
        e: ChangeEvent<HTMLInputElement>
    ) {

        setProduto({
            ...produto,
            [e.target.name]: e.target.value,
            categoria: categoria
        });

    }


    // Atualizar o preço
    function atualizarEstadoNumero(
        name: string,
        value: number | undefined
    ) {

        setProduto({
            ...produto,
            [name]: value ?? 0,
            categoria: categoria
        });

    }


    // Voltar para a lista de produtos
    function retornar() {

        navigate("/produtos");

    }


    // Cadastrar ou atualizar produto
    async function salvarProduto(
        e: FormEvent<HTMLFormElement>
    ) {

        e.preventDefault();

        if (!produto.nome?.trim()) {
            toast.info("Digite o nome do produto.");
            return;
        }

        if (!produto.preco || produto.preco <= 0) {
            toast.info("Digite um preço válido.");
            return;
        }

        if (!produto.foto?.trim()) {
            toast.info("Informe a foto do produto.");
            return;
        }

        if (!categoria.id) {
            toast.info("Selecione uma categoria.");
            return;
        }

        setIsLoading(true);

        try {

            if (modoEdicao) {

                await atualizar(
                    "/produtos",
                    {
                        id: Number(id),
                        nome: produto.nome,
                        preco: produto.preco,
                        foto: produto.foto,
                        categoria: categoria
                    },
                    {}
                );

                toast.success("Produto atualizado com sucesso!");

            } else {

                await cadastrar(
                    "/produtos",
                    {
                        nome: produto.nome,
                        preco: produto.preco,
                        foto: produto.foto,
                        categoria: categoria
                    },
                    setProduto,
                    {}
                );

                toast.success("Produto cadastrado com sucesso!");

            }

            navigate("/produtos");

        } catch (error) {

            console.error("Erro ao salvar produto:", error);

            toast.error(
                modoEdicao
                    ? "Não foi possível atualizar o produto."
                    : "Não foi possível cadastrar o produto."
            );

        } finally {

            setIsLoading(false);

        }

    }


    return (

        <main className="grow w-full bg-white">

            <section className="max-w-2xl mx-auto px-4 md:px-8 py-12 md:py-16">

                {/* Cabeçalho */}
                <div className="mb-8">


                    <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 mt-1">
                        {modoEdicao
                            ? "Editar produto"
                            : "Novo produto"}
                    </h1>

                    <p className="text-gray-500 mt-2">
                        {modoEdicao
                            ? "Atualize as informações do produto."
                            : "Cadastre um novo produto para sua farmácia."}
                    </p>

                </div>


                {/* Formulário */}

                <form
                    onSubmit={salvarProduto}
                    className="bg-white border border-orange-100 rounded-2xl p-6 md:p-8 shadow-sm"
                >

                    {/* Nome */}

                    <div className="mb-5">

                        <label
                            htmlFor="nome"
                            className="block text-sm font-bold text-gray-700 mb-2"
                        >
                            Nome do produto
                        </label>

                        <input
                            id="nome"
                            name="nome"
                            type="text"
                            required
                            value={produto.nome || ""}
                            onChange={atualizarEstado}
                            placeholder="Ex: Paracetamol"
                            className="w-full rounded-xl border border-orange-100 bg-white px-4 py-3 text-gray-700 outline-none transition-all focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                        />

                    </div>


                    {/* Preço */}

                    <div className="mb-5">

                        <label
                            htmlFor="preco"
                            className="block text-sm font-bold text-gray-700 mb-2"
                        >
                            Preço
                        </label>

                        <NumericFormat
                            id="preco"
                            name="preco"
                            thousandSeparator="."
                            decimalSeparator=","
                            decimalScale={2}
                            fixedDecimalScale
                            allowNegative={false}
                            prefix="R$ "
                            value={produto.preco || ""}
                            onValueChange={(values) =>
                                atualizarEstadoNumero(
                                    "preco",
                                    values.floatValue
                                )
                            }
                            placeholder="R$ 0,00"
                            className="w-full rounded-xl border border-orange-100 bg-white px-4 py-3 text-gray-700 outline-none transition-all focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                        />

                    </div>


                    {/* Foto */}

                    <div className="mb-5">

                        <label
                            htmlFor="foto"
                            className="block text-sm font-bold text-gray-700 mb-2"
                        >
                            Foto do produto
                        </label>

                        <input
                            id="foto"
                            name="foto"
                            type="url"
                            required
                            value={produto.foto || ""}
                            onChange={atualizarEstado}
                            placeholder="https://..."
                            className="w-full rounded-xl border border-orange-100 bg-white px-4 py-3 text-gray-700 outline-none transition-all focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                        />

                    </div>


                    {/* Categoria */}

                    <div>

                        <label
                            htmlFor="categoria"
                            className="block text-sm font-bold text-gray-700 mb-2"
                        >
                            Categoria
                        </label>

                        <select
                            id="categoria"
                            name="categoria"
                            required
                            value={categoria.id || ""}
                            onChange={(e) =>
                                buscarCategoriaPorId(
                                    e.currentTarget.value
                                )
                            }
                            className="w-full rounded-xl border border-orange-100 bg-white px-4 py-3 text-gray-700 outline-none transition-all focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                        >

                            <option value="" disabled>
                                Selecione uma categoria
                            </option>

                            {categorias.map((categoria) => (

                                <option
                                    key={categoria.id}
                                    value={categoria.id}
                                >
                                    {categoria.nome}
                                </option>

                            ))}

                        </select>

                    </div>


                    {/* Botão */}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="mt-6 w-full flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-5 py-3 font-bold text-white shadow-sm transition-colors hover:bg-orange-600 disabled:opacity-60 disabled:cursor-not-allowed"
                    >

                        {isLoading ? (

                            <ClipLoader
                                color="#ffffff"
                                size={24}
                            />

                        ) : (

                            <>
                                <CheckIcon
                                    size={20}
                                    weight="bold"
                                />

                                {modoEdicao
                                    ? "Atualizar produto"
                                    : "Cadastrar produto"}
                            </>

                        )}

                    </button>


                    {/* Cancelar */}

                    <button
                        type="button"
                        onClick={retornar}
                        className="mt-3 w-full rounded-xl border border-gray-200 px-5 py-3 font-bold text-gray-600 hover:bg-gray-50 transition-colors"
                    >
                        Cancelar
                    </button>

                </form>

            </section>

        </main>

    );

}

export default FormProduto;