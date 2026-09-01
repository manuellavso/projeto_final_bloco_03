import { PencilSimpleIcon, TrashSimpleIcon } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import type Produto from "../../../models/Produto";

interface CardProdutoProps {
    produto: Produto;
}

function CardProduto({ produto }: CardProdutoProps) {

    return (

        <div
            className="group relative flex flex-col w-full max-w-sm md:max-w-64 overflow-hidden rounded-2xl border border-orange-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-lg"
        >

            {/* Fundo suave no hover */}
            <div
                className="absolute inset-0 bg-orange-50 opacity-0 transition-opacity duration-300 group-hover:opacity-30 pointer-events-none"
            />

            {/* Imagem do produto */}
            <div className="w-full aspect-3/4 bg-orange-50 overflow-hidden">
                <img
                    src={produto.foto}
                    alt={produto.nome}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
            </div>

            {/* Informações do produto */}
            <div className="p-4 flex flex-col gap-1">

                <span className="text-xs font-bold uppercase tracking-wider text-orange-500">
                    Produto
                </span>

                <h3 className="text-base font-bold text-gray-800 text-center line-clamp-2">
                    {produto.nome}
                </h3>

                <p className="text-lg font-bold text-orange-600 text-center mt-2">
                    R$ {produto.preco}
                </p>

                <span className="text-xs font-medium text-orange-500 uppercase tracking-wide text-center">
                    {produto.categoria?.nome}
                </span>

                {/* Botões de ação */}
                <div className="flex items-center gap-2 mt-3 pt-3 border-t border-orange-100">

                    {/* Editar */}
                    <Link
                        to={`/editarproduto/${produto.id}`}
                        title="Editar produto"
                        className="flex items-center justify-center gap-1 flex-1 text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 py-2 rounded-lg transition-colors"
                    >
                        <PencilSimpleIcon size={18} weight="bold" />
                        Editar
                    </Link>

                    {/* Deletar */}
                    <Link
                        to={`/deletarproduto/${produto.id}`}
                        title="Deletar produto"
                        className="flex items-center justify-center gap-1 flex-1 text-sm font-medium text-red-500 bg-red-50 hover:bg-red-100 py-2 rounded-lg transition-colors"
                    >
                        <TrashSimpleIcon size={18} weight="bold" />
                        Excluir
                    </Link>

                </div>

            </div>

            {/* Detalhe laranja na parte inferior */}
            <div
                className="absolute bottom-0 left-0 h-1 w-1/4 rounded-r-full bg-orange-500"
            />

        </div>

    );

}

export default CardProduto;
