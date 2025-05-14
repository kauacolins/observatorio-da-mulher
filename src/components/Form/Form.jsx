import React, { useState } from "react";
import { useForm } from "react-hook-form";

const Bairros = ["Centro", "Jardim das Flores", "Vila Nova", "Parque Industrial", "Outro"];

export default function FormularioMultiStep() {

  const [step, setStep] = useState(1);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onTouched" });

  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl mx-auto p-4 space-y-6">
    {step === 1 && (
        <div>
          <h2 className="text-xl font-bold mb-4">Etapa 1: Residência e Educação</h2>

          <label className="block mb-2">Qual bairro da sua residência?</label>
          <select {...register("bairro", { required: true })} className="w-full p-2 border rounded">
            <option value="">Selecione um bairro</option>
            {Bairros.map((b, i) => (
              <option key={i} value={b}>{b}</option>
            ))}
          </select>
          {errors.bairro && <p className="text-red-500">Este campo é obrigatório.</p>}

          <div className="mt-4">
            <label>1.1 Você está atualmente estudando?</label>
            <div className="space-x-4">
              <label><input type="radio" value="Sim" {...register("estudando", { required: true })} /> Sim</label>
              <label><input type="radio" value="Não" {...register("estudando", { required: true })} /> Não</label>
            </div>
            {errors.estudando && <p className="text-red-500">Obrigatório.</p>}
          </div>

          <div className="mt-4">
            <label>1.2 Se não está estudando, qual motivo?</label>
            <select {...register("motivoNaoEstuda")}
                    className="w-full p-2 border rounded">
              <option value="">Selecione uma opção</option>
              <option value="Trabalho">Necessidade de trabalhar</option>
              <option value="Gravidez">Gravidez/Maternidade</option>
              <option value="Violencia">Violência doméstica</option>
              <option value="Financeiro">Falta de recursos financeiros</option>
              <option value="Apoio">Falta de apoio</option>
              <option value="Outro">Outro</option>
            </select>
          </div>

          <div className="mt-4">
            <label>1.3 Tempo de interrupção dos estudos</label>
            <select {...register("tempoInterrupcao")}
                    className="w-full p-2 border rounded">
              <option value="">Selecione</option>
              <option value="Menos de 1 ano">Menos de 1 ano</option>
              <option value="1 a 3 anos">1 a 3 anos</option>
              <option value="3 a 5 anos">3 a 5 anos</option>
              <option value="Mais de 5 anos">Mais de 5 anos</option>
            </select>
          </div>

          <div className="mt-4">
            <label>1.4 Dificuldades para continuar estudando</label>
            <select {...register("dificuldades")}
                    className="w-full p-2 border rounded">
              <option value="">Selecione</option>
              <option value="Trabalho">Falta de tempo devido ao trabalho</option>
              <option value="Filhos">Falta de apoio com os filhos</option>
              <option value="Financeiro">Falta de recursos financeiros</option>
              <option value="Distancia">Distância da instituição</option>
              <option value="Medo">Medo/insegurança</option>
              <option value="Outro">Outro</option>
            </select>
          </div>

          <div className="mt-4">
            <label>1.5 Você tem acesso à educação a distância?</label>
            <div className="space-x-4">
              <label><input type="radio" value="Sim" {...register("ead", { required: true })} /> Sim</label>
              <label><input type="radio" value="Não" {...register("ead", { required: true })} /> Não</label>
            </div>
            {errors.ead && <p className="text-red-500">Obrigatório.</p>}
          </div>

          <div className="mt-4">
            <label>1.6 Como avalia a EAD?</label>
            <select {...register("avaliacaoEAD")}
                    className="w-full p-2 border rounded">
              <option value="">Selecione</option>
              <option value="Muito Boa">Muito Boa</option>
              <option value="Boa">Boa</option>
              <option value="Regular">Regular</option>
              <option value="Ruim">Ruim</option>
              <option value="Muito Ruim">Muito Ruim</option>
            </select>
          </div>
        </div>
      )}
            {step === 2 && (
        <div>
          <h2 className="text-xl font-bold mb-4">Etapa 2: Saúde</h2>

          <div className="mt-4">
            <label>2.1 Você tem plano de saúde?</label>
            <div className="space-x-4">
              <label><input type="radio" value="Sim" {...register("planoSaude", { required: true })} /> Sim</label>
              <label><input type="radio" value="Não" {...register("planoSaude", { required: true })} /> Não</label>
            </div>
            {errors.planoSaude && <p className="text-red-500">Campo obrigatório.</p>}
          </div>

          <div className="mt-4">
            <label>2.2 Já teve acesso à rede pública?</label>
            <div className="space-x-4">
              <label><input type="radio" value="Sim" {...register("acessoPublico", { required: true })} /> Sim</label>
              <label><input type="radio" value="Não" {...register("acessoPublico", { required: true })} /> Não</label>
            </div>
            {errors.acessoPublico && <p className="text-red-500">Campo obrigatório.</p>}
          </div>

          <div className="mt-4">
            <label>2.3 Atendimento da rede pública foi adequado?</label>
            <div className="space-x-4">
              <label><input type="radio" value="Sim" {...register("atendimentoAdequado", { required: true })} /> Sim</label>
              <label><input type="radio" value="Não" {...register("atendimentoAdequado", { required: true })} /> Não</label>
            </div>
            {errors.atendimentoAdequado && <p className="text-red-500">Campo obrigatório.</p>}
          </div>

          <div className="mt-4">
            <label>2.4 Sua região é precária em saúde pública?</label>
            <div className="space-x-4">
              <label><input type="radio" value="Sim" {...register("regiaoPrecaria", { required: true })} /> Sim</label>
              <label><input type="radio" value="Não" {...register("regiaoPrecaria", { required: true })} /> Não</label>
            </div>
            {errors.regiaoPrecaria && <p className="text-red-500">Campo obrigatório.</p>}
          </div>
        </div>
      )}
      {step === 3 && (
        <div>
          <h2 className="text-xl font-bold mb-4">Etapa 3: Violência</h2>

          <div className="mt-4">
            <label>3.1 Você já sofreu algum tipo de violência?</label>
            <div className="space-x-4">
              <label><input type="radio" value="Sim" {...register("violencia", { required: true })} /> Sim</label>
              <label><input type="radio" value="Não" {...register("violencia", { required: true })} /> Não</label>
            </div>
            {errors.violencia && <p className="text-red-500">Campo obrigatório.</p>}
          </div>

          <div className="mt-4">
            <label>3.2 Quais tipos de violência você sofreu?</label>
            <select {...register("tipoViolencia")} className="w-full p-2 border rounded">
              <option value="">Selecione</option>
              <option value="Física">Física</option>
              <option value="Psicológica/Emocional">Psicológica/Emocional</option>
              <option value="Sexual">Sexual</option>
              <option value="Patrimonial">Patrimonial</option>
              <option value="Moral">Moral</option>
              <option value="Outro">Outro</option>
              <option value="Não se aplica">Não se aplica</option>
            </select>
          </div>

          <div className="mt-4">
            <label>3.3 Quem foi o autor da violência?</label>
            <select {...register("autorViolencia")} className="w-full p-2 border rounded">
              <option value="">Selecione</option>
              <option value="Marido/Companheiro">Marido/Companheiro</option>
              <option value="Ex-Marido/Ex-Companheiro">Ex-Marido/Ex-Companheiro</option>
              <option value="Parente">Parente</option>
              <option value="Amigo/Conhecido">Amigo/Conhecido</option>
              <option value="Desconhecido">Desconhecido</option>
              <option value="Outro">Outro</option>
              <option value="Não se aplica">Não se aplica</option>
            </select>
          </div>

          <div className="mt-4">
            <label>3.4 Frequência da violência</label>
            <select {...register("frequenciaViolencia")} className="w-full p-2 border rounded">
              <option value="">Selecione</option>
              <option value="Uma vez">Uma única vez</option>
              <option value="Algumas vezes">Algumas vezes</option>
              <option value="Regularmente">Regularmente</option>
              <option value="Atualmente sofre">Atualmente sofre</option>
              <option value="Nunca sofreu">Nunca sofreu</option>
            </select>
          </div>

          <div className="mt-4">
            <label>3.5 Procurou ajuda?</label>
            <div className="space-x-4">
              <label><input type="radio" value="Sim" {...register("procurouAjuda", { required: true })} /> Sim</label>
              <label><input type="radio" value="Não" {...register("procurouAjuda", { required: true })} /> Não</label>
              <label><input type="radio" value="Não se aplica" {...register("procurouAjuda", { required: true })} /> Não se aplica</label>
            </div>
          </div>

          <div className="mt-4">
            <label>3.6 Onde procurou ajuda?</label>
            <select {...register("ondeAjuda")} className="w-full p-2 border rounded">
              <option value="">Selecione</option>
              <option value="Delegacia da mulher">Delegacia da mulher</option>
              <option value="Centro de referência">Centro de referência</option>
              <option value="Serviço de saúde">Serviço de saúde</option>
              <option value="Apoio jurídico">Apoio jurídico</option>
              <option value="Família/Amigos">Família/Amigos</option>
              <option value="Outro">Outro</option>
              <option value="Não se aplica">Não se aplica</option>
            </select>
          </div>

          <div className="mt-4">
            <label>3.7 Avaliação do atendimento recebido</label>
            <select {...register("avaliacaoAjuda")} className="w-full p-2 border rounded">
              <option value="">Selecione</option>
              <option value="Muito boa">Muito boa</option>
              <option value="Boa">Boa</option>
              <option value="Regular">Regular</option>
              <option value="Ruim">Ruim</option>
              <option value="Muito ruim">Muito ruim</option>
              <option value="Não se aplica">Não se aplica</option>
            </select>
          </div>

          <div className="mt-4">
            <label>3.8 Você conhece a Lei Maria da Penha?</label>
            <div className="space-x-4">
              <label><input type="radio" value="Sim" {...register("leiMariaDaPenha", { required: true })} /> Sim</label>
              <label><input type="radio" value="Não" {...register("leiMariaDaPenha", { required: true })} /> Não</label>
            </div>
          </div>
        </div>
      )}
    {step === 4 && (
        <div>
          <h2 className="text-xl font-bold mb-4">Etapa 4: Comentários Finais</h2>

          <label className="block mb-2">4.1 Deseja deixar algum comentário?</label>
          <textarea {...register("comentarios")} className="w-full p-2 border rounded" rows={4} />
        </div>
      )}


      <div className="flex justify-between mt-6">
        {step > 1 && (
          <button type="button" onClick={prevStep} className="px-4 py-2 bg-gray-300 rounded">
            Voltar
          </button>
        )}

        {step < 4 ? (
          <button type="button" onClick={nextStep} className="px-4 py-2 bg-blue-500 text-white rounded">
            Próximo
          </button>
        ) : (
          <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded">
            Enviar
          </button>
        )}
      </div>
    </form>
  );
}