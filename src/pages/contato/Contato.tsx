import { PaperPlaneTiltIcon, CheckCircleIcon,} from "@phosphor-icons/react";
import { useState } from "react";

export default function Contact() {

    const [enviando, setEnviando] = useState(false);
    const [mensagemEnviada, setMensagemEnviada] = useState(false);

    async function handleSubmit(
        event: React.FormEvent<HTMLFormElement>
    ) {

        event.preventDefault();

        setEnviando(true);
        setMensagemEnviada(false);

        const form = event.currentTarget;
        const formData = new FormData(form);

        try {
            const resposta = await fetch(
                "https://formsubmit.co/ajax/262b7ac3975da85aa2e457f9ae065374",
                {
                    method: "POST",
                    body: formData,
                    headers: {
                        Accept: "application/json",
                    },
                }
            );
            if (!resposta.ok) {
                throw new Error("Erro ao enviar formulário");
            }
            form.reset();
            setMensagemEnviada(true);
            setTimeout(() => {
                setMensagemEnviada(false);
            }, 4000);
        } catch (error) {
            console.error("Erro ao enviar mensagem:", error);
        } finally {

            setEnviando(false);
        }
    }

    return (

        <main className="grow w-full bg-white">

            <section className="max-w-6xl mx-auto px-4 md:px-8 py-14 md:py-20">
                <div className="text-center mb-10">

                    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mt-2">
                        Fale conosco
                    </h2>

                    <p className="text-gray-500 mt-3 max-w-xl mx-auto">
                        Envie sua dúvida, sugestão ou solicitação para nossa
                        equipe. Estamos aqui para ajudar.
                   </p>
                </div>

                <div className="flex justify-center">
                    <form
                        onSubmit={handleSubmit}
                        className="flex w-full max-w-3xl flex-col rounded-2xl border border-orange-100 bg-orange-50 p-6 shadow-sm sm:p-8"
                    >
                        <input
                            type="hidden"
                            name="_subject"
                            value="Nova mensagem — Farmanu"
                        />
                        <input
                            type="hidden"
                            name="_template"
                            value="table"
                        />

                        {/* Nome */}
                        <div className="mb-5">
                            <label
                                htmlFor="name"
                                className="mb-2 block text-sm font-bold text-gray-700"
                            >
                                Nome
                            </label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                placeholder="Digite seu nome"
                                required
                                className="w-full rounded-xl border border-orange-100 bg-white px-4 py-3 text-gray-800 placeholder:text-gray-400 outline-none transition-all focus:border-orange-400 focus:ring-4 focus:ring-orange-500/10"
                            />

                        </div>

                        {/* E-mail */}
                        <div className="mb-5">
                            <label
                                htmlFor="email"
                                className="mb-2 block text-sm font-bold text-gray-700"
                            >
                                E-mail
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="Digite seu e-mail"
                                required
                                className="w-full rounded-xl border border-orange-100 bg-white px-4 py-3 text-gray-800 placeholder:text-gray-400 outline-none transition-all focus:border-orange-400 focus:ring-4 focus:ring-orange-500/10"
                            />

                        </div>

                        {/* Assunto */}
                        <div className="mb-5">
                            <label
                                htmlFor="assunto"
                                className="mb-2 block text-sm font-bold text-gray-700"
                            >
                                Assunto
                            </label>
                            <input
                                id="assunto"
                                name="assunto"
                                type="text"
                                placeholder="Digite o assunto"
                                required
                                className="w-full rounded-xl border border-orange-100 bg-white px-4 py-3 text-gray-800 placeholder:text-gray-400 outline-none transition-all focus:border-orange-400 focus:ring-4 focus:ring-orange-500/10"
                            />

                        </div>


                        {/* Mensagem */}
                        <div className="mb-6">
                            <label
                                htmlFor="message"
                                className="mb-2 block text-sm font-bold text-gray-700"
                            >
                                Mensagem
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                rows={5}
                                placeholder="Digite sua mensagem..."
                                required
                                className="w-full resize-none rounded-xl border border-orange-100 bg-white px-4 py-3 text-gray-800 placeholder:text-gray-400 outline-none transition-all focus:border-orange-400 focus:ring-4 focus:ring-orange-500/10"
                            />
                        </div>

                        {/* Botão */}
                        <button
                            type="submit"
                            disabled={enviando}
                            className="mt-auto flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 px-6 py-3.5 font-bold text-white transition-all duration-300 hover:bg-orange-600 hover:-translate-y-0.5 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            <PaperPlaneTiltIcon
                                size={20}
                                weight="fill"
                            />
                            {enviando
                                ? "Enviando..."
                                : "Enviar mensagem"}
                        </button>
                    </form>
                </div>
            </section>

            {mensagemEnviada && (
                <div className="fixed bottom-6 left-1/2 z-50 flex w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 items-center gap-3 rounded-2xl border border-green-100 bg-white px-5 py-4 text-gray-800 shadow-2xl sm:left-auto sm:right-6 sm:w-auto sm:max-w-none sm:translate-x-0">
                    <CheckCircleIcon
                        size={24}
                        weight="fill"
                        className="shrink-0 text-green-500"
                    />
                    <span className="font-medium">
                        Mensagem enviada com sucesso!
                    </span>
                </div>
            )}
        </main>

    );

}