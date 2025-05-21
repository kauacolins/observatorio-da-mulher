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

  const onSubmit = async (data) => {
    try {
      const response = await fetch('http://localhost:5000/api/formulario', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        window.location.href = "/"; // Redireciona para a página principal
      } else {
        alert('Erro ao enviar o formulário.');
      }
    } catch (error) {
      console.error('Erro ao enviar:', error);
      alert('Erro de conexão com o servidor.');
    }
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  // CSS para o indicador de etapas
  const steps = [
    { label: "Residência", number: 1 },
    { label: "Saúde", number: 2 },
    { label: "Violência", number: 3 },
    { label: "Final", number: 4 },
  ];

  return (
    <div className="container min-vh-100 d-flex align-items-center justify-content-center">
      <div className="col-12 col-md-10 col-lg-8">
        {/* Indicador de etapas */}
        <ul className="nav justify-content-center mb-4">
          {steps.map((s, idx) => (
            <li className="nav-item text-center" key={s.number} style={{ width: "25%" }}>
              <span
                className={`d-inline-block rounded-circle mb-1 step-indicator ${step === s.number ? "active" : step > s.number ? "done" : ""}`}
                style={{
                  width: 36,
                  height: 36,
                  lineHeight: "36px",
                  background: step === s.number ? "#0d6efd" : step > s.number ? "#198754" : "#e9ecef",
                  color: step === s.number || step > s.number ? "#fff" : "#495057",
                  fontWeight: "bold",
                  fontSize: 18,
                }}
              >
                {s.number}
              </span>
              <div className="small">{s.label}</div>
            </li>
          ))}
        </ul>

        <form onSubmit={handleSubmit(onSubmit)} className="bg-white border rounded shadow p-4">
          {step === 1 && (
            <div>
              <h2 className="h5 fw-bold mb-4">Etapa 1: Residência e Educação</h2>
              <div className="row mb-3">
                <div className="col-md-6 mb-3 mb-md-0">
                  <label className="form-label">Qual bairro da sua residência?</label>
                  <select {...register("bairro", { required: true })} className="form-select">
                    <option value="">Selecione um bairro</option>
                    {Bairros.map((b, i) => (
                      <option key={i} value={b}>{b}</option>
                    ))}
                  </select>
                  {errors.bairro && <div className="text-danger small">Este campo é obrigatório.</div>}
                </div>
                <div className="col-md-6">
                  <label className="form-label">Tempo de interrupção dos estudos</label>
                  <select {...register("tempoInterrupcao")} className="form-select">
                    <option value="">Selecione</option>
                    <option value="Menos de 1 ano">Menos de 1 ano</option>
                    <option value="1 a 3 anos">1 a 3 anos</option>
                    <option value="3 a 5 anos">3 a 5 anos</option>
                    <option value="Mais de 5 anos">Mais de 5 anos</option>
                  </select>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6 mb-3 mb-md-0">
                  <label className="form-label">Você está atualmente estudando?</label>
                  <div>
                    <div className="form-check form-check-inline">
                      <input className="form-check-input" type="radio" value="Sim" {...register("estudando", { required: true })} id="estudandoSim" />
                      <label className="form-check-label" htmlFor="estudandoSim">Sim</label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input className="form-check-input" type="radio" value="Não" {...register("estudando", { required: true })} id="estudandoNao" />
                      <label className="form-check-label" htmlFor="estudandoNao">Não</label>
                    </div>
                  </div>
                  {errors.estudando && <div className="text-danger small">Obrigatório.</div>}
                </div>
                <div className="col-md-6">
                  <label className="form-label">Se não está estudando, qual motivo?</label>
                  <select {...register("motivoNaoEstuda")} className="form-select">
                    <option value="">Selecione uma opção</option>
                    <option value="Trabalho">Necessidade de trabalhar</option>
                    <option value="Gravidez">Gravidez/Maternidade</option>
                    <option value="Violencia">Violência doméstica</option>
                    <option value="Financeiro">Falta de recursos financeiros</option>
                    <option value="Apoio">Falta de apoio</option>
                    <option value="Outro">Outro</option>
                  </select>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6 mb-3 mb-md-0">
                  <label className="form-label">Dificuldades para continuar estudando</label>
                  <select {...register("dificuldades")} className="form-select">
                    <option value="">Selecione</option>
                    <option value="Trabalho">Falta de tempo devido ao trabalho</option>
                    <option value="Filhos">Falta de apoio com os filhos</option>
                    <option value="Financeiro">Falta de recursos financeiros</option>
                    <option value="Distancia">Distância da instituição</option>
                    <option value="Medo">Medo/insegurança</option>
                    <option value="Outro">Outro</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="form-label">Você tem acesso à educação a distância?</label>
                  <div>
                    <div className="form-check form-check-inline">
                      <input className="form-check-input" type="radio" value="Sim" {...register("ead", { required: true })} id="eadSim" />
                      <label className="form-check-label" htmlFor="eadSim">Sim</label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input className="form-check-input" type="radio" value="Não" {...register("ead", { required: true })} id="eadNao" />
                      <label className="form-check-label" htmlFor="eadNao">Não</label>
                    </div>
                  </div>
                  {errors.ead && <div className="text-danger small">Obrigatório.</div>}
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label">Como avalia a EAD?</label>
                <select {...register("avaliacaoEAD")} className="form-select">
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
              <h2 className="h5 fw-bold mb-4">Etapa 2: Saúde</h2>
              <div className="row mb-3">
                <div className="col-md-6 mb-3 mb-md-0">
                  <label className="form-label">Você tem plano de saúde?</label>
                  <div>
                    <div className="form-check form-check-inline">
                      <input className="form-check-input" type="radio" value="Sim" {...register("planoSaude", { required: true })} id="planoSaudeSim" />
                      <label className="form-check-label" htmlFor="planoSaudeSim">Sim</label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input className="form-check-input" type="radio" value="Não" {...register("planoSaude", { required: true })} id="planoSaudeNao" />
                      <label className="form-check-label" htmlFor="planoSaudeNao">Não</label>
                    </div>
                  </div>
                  {errors.planoSaude && <div className="text-danger small">Campo obrigatório.</div>}
                </div>
                <div className="col-md-6">
                  <label className="form-label">Já teve acesso à rede pública?</label>
                  <div>
                    <div className="form-check form-check-inline">
                      <input className="form-check-input" type="radio" value="Sim" {...register("acessoPublico", { required: true })} id="acessoPublicoSim" />
                      <label className="form-check-label" htmlFor="acessoPublicoSim">Sim</label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input className="form-check-input" type="radio" value="Não" {...register("acessoPublico", { required: true })} id="acessoPublicoNao" />
                      <label className="form-check-label" htmlFor="acessoPublicoNao">Não</label>
                    </div>
                  </div>
                  {errors.acessoPublico && <div className="text-danger small">Campo obrigatório.</div>}
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6 mb-3 mb-md-0">
                  <label className="form-label">Atendimento da rede pública foi adequado?</label>
                  <div>
                    <div className="form-check form-check-inline">
                      <input className="form-check-input" type="radio" value="Sim" {...register("atendimentoAdequado", { required: true })} id="atendimentoAdequadoSim" />
                      <label className="form-check-label" htmlFor="atendimentoAdequadoSim">Sim</label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input className="form-check-input" type="radio" value="Não" {...register("atendimentoAdequado", { required: true })} id="atendimentoAdequadoNao" />
                      <label className="form-check-label" htmlFor="atendimentoAdequadoNao">Não</label>
                    </div>
                  </div>
                  {errors.atendimentoAdequado && <div className="text-danger small">Campo obrigatório.</div>}
                </div>
                <div className="col-md-6">
                  <label className="form-label">Sua região é precária em saúde pública?</label>
                  <div>
                    <div className="form-check form-check-inline">
                      <input className="form-check-input" type="radio" value="Sim" {...register("regiaoPrecaria", { required: true })} id="regiaoPrecariaSim" />
                      <label className="form-check-label" htmlFor="regiaoPrecariaSim">Sim</label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input className="form-check-input" type="radio" value="Não" {...register("regiaoPrecaria", { required: true })} id="regiaoPrecariaNao" />
                      <label className="form-check-label" htmlFor="regiaoPrecariaNao">Não</label>
                    </div>
                  </div>
                  {errors.regiaoPrecaria && <div className="text-danger small">Campo obrigatório.</div>}
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="h5 fw-bold mb-4">Etapa 3: Violência</h2>
              <div className="mb-3">
                <label className="form-label">Você já sofreu algum tipo de violência?</label>
                <div>
                  <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" value="Sim" {...register("violencia", { required: true })} id="violenciaSim" />
                    <label className="form-check-label" htmlFor="violenciaSim">Sim</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" value="Não" {...register("violencia", { required: true })} id="violenciaNao" />
                    <label className="form-check-label" htmlFor="violenciaNao">Não</label>
                  </div>
                </div>
                {errors.violencia && <div className="text-danger small">Campo obrigatório.</div>}
              </div>
              <div className="row mb-3">
                <div className="col-md-6 mb-3 mb-md-0">
                  <label className="form-label">Quais tipos de violência você sofreu?</label>
                  <select {...register("tipoViolencia")} className="form-select">
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
                <div className="col-md-6">
                  <label className="form-label">Quem foi o autor da violência?</label>
                  <select {...register("autorViolencia")} className="form-select">
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
              </div>
              <div className="row mb-3">
                <div className="col-md-6 mb-3 mb-md-0">
                  <label className="form-label">Frequência da violência</label>
                  <select {...register("frequenciaViolencia")} className="form-select">
                    <option value="">Selecione</option>
                    <option value="Uma vez">Uma única vez</option>
                    <option value="Algumas vezes">Algumas vezes</option>
                    <option value="Regularmente">Regularmente</option>
                    <option value="Atualmente sofre">Atualmente sofre</option>
                    <option value="Nunca sofreu">Nunca sofreu</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="form-label">Procurou ajuda?</label>
                  <div>
                    <div className="form-check form-check-inline">
                      <input className="form-check-input" type="radio" value="Sim" {...register("procurouAjuda", { required: true })} id="procurouAjudaSim" />
                      <label className="form-check-label" htmlFor="procurouAjudaSim">Sim</label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input className="form-check-input" type="radio" value="Não" {...register("procurouAjuda", { required: true })} id="procurouAjudaNao" />
                      <label className="form-check-label" htmlFor="procurouAjudaNao">Não</label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input className="form-check-input" type="radio" value="Não se aplica" {...register("procurouAjuda", { required: true })} id="procurouAjudaNA" />
                      <label className="form-check-label" htmlFor="procurouAjudaNA">Não se aplica</label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6 mb-3 mb-md-0">
                  <label className="form-label">Onde procurou ajuda?</label>
                  <select {...register("ondeAjuda")} className="form-select">
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
                <div className="col-md-6">
                  <label className="form-label">Avaliação do atendimento recebido</label>
                  <select {...register("avaliacaoAjuda")} className="form-select">
                    <option value="">Selecione</option>
                    <option value="Muito boa">Muito boa</option>
                    <option value="Boa">Boa</option>
                    <option value="Regular">Regular</option>
                    <option value="Ruim">Ruim</option>
                    <option value="Muito ruim">Muito ruim</option>
                    <option value="Não se aplica">Não se aplica</option>
                  </select>
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label">Você conhece a Lei Maria da Penha?</label>
                <div>
                  <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" value="Sim" {...register("leiMariaDaPenha", { required: true })} id="leiMariaDaPenhaSim" />
                    <label className="form-check-label" htmlFor="leiMariaDaPenhaSim">Sim</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" value="Não" {...register("leiMariaDaPenha", { required: true })} id="leiMariaDaPenhaNao" />
                    <label className="form-check-label" htmlFor="leiMariaDaPenhaNao">Não</label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <h2 className="h5 fw-bold mb-4">Etapa 4: Comentários Finais</h2>
              <label className="form-label">Deseja deixar algum comentário?</label>
              <textarea {...register("comentarios")} className="form-control" rows={4} />
            </div>
          )}

          <div className="d-flex justify-content-between mt-4">
            {step > 1 && (
              <button type="button" onClick={prevStep} className="btn btn-secondary">
                Voltar
              </button>
            )}
            {step < 4 ? (
              <button type="button" onClick={nextStep} className="btn btn-primary ms-auto">
                Próximo
              </button>
            ) : (
              <button type="submit" className="btn btn-success ms-auto">
                Enviar
              </button>
            )}
          </div>
        </form>
      </div>
      {/* CSS do indicador de etapas */}
      <style>{`
        .step-indicator {
          transition: background 0.3s, color 0.3s;
        }
        .step-indicator.done {
          background: #198754 !important;
          color: #fff !important;
        }
      `}</style>
    </div>
  );
}
