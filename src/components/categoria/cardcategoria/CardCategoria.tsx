import { PencilIcon, TrashIcon, TagIcon, } from "@phosphor-icons/react";
import { Link } from "react-router-dom";

interface CardCategoriaProps {
    categoria: {
    id: number;
    nome: string;
    };
}

function CardCategoria({ categoria }: CardCategoriaProps) {

    return (
        <div
            className="group relative flex h-32 w-full items-center gap-5 overflow-hidden rounded-2xl  border border-orange-100 bg-white px-5 shadow-sm transition-all duration-300  hover:-translate-y-1 hover:border-orange-200 hover:shadow-lg"
        >

            {/* Fundo suave no hover */}
            <div
                className="  absolute inset-0 rounded-2xl bg-orange-50 opacity-0 transition-opacity duration-300 group-hover:opacity-40 pointer-events-none "
            />

            {/* Ícone da categoria */}
            <div
                className=" flex h-20 w-20 shrink-0 items-center justify-center  rounded-full bg-orange-50 text-orange-500"
            >
                <TagIcon
                    size={34} weight="fill"
                />
            </div>


            {/* Informações da categoria */}
            <div className="min-w-0 flex-1">

                <span className="text-xs font-bold uppercase tracking-wider text-orange-500">
                    Categoria
                </span>

                <h2 className="mt-1 text-xl font-bold text-gray-800">
                    {categoria.nome}
                </h2>

            </div>

            {/* Botões de ação */}
            <div className="flex items-center gap-2">

                {/* Editar */}
                <Link
                    to={`/editarcategoria/${categoria.id}`}
                    title="Editar categoria"
                    className=" flex h-10 w-10 items-center justify-center rounded-full bg-orange-500 text-white shadow-sm transition-colors hover:bg-orange-600"
                >
                    <PencilIcon size={19} weight="bold" />
                </Link>


                {/* Deletar */}
                <Link
                    to={`/deletarcategoria/${categoria.id}`}
                    title="Deletar categoria"
                    className=" flex h-10 w-10 items-center justify-center rounded-full bg-red-50 text-red-500 shadow-sm transition-colors hover:bg-red-100"
                >
                    <TrashIcon size={19} weight="bold" />
                </Link>

            </div>


            {/* Detalhe laranja na parte inferior */}
            <div
                className=" absolute bottom-0 left-0 h-1 w-1/4 rounded-r-full bg-orange-500"
            />

        </div>
    );
}

export default CardCategoria;