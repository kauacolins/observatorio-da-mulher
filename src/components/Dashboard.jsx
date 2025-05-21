import React, { useEffect, useState } from 'react';
import {
  PieChart, Pie, Cell, Tooltip,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend,
  ResponsiveContainer
} from 'recharts';
import Navbar from './Navbar';

const cores = ['#8A2BE2', '#A63BE2', '#C24BE2', '#E24BCD', '#E24B8A'];

export default function Dashboard() {
  const [dados, setDados] = useState([]);
  const [categoria, setCategoria] = useState('educacao'); // estado para categoria ativa

  useEffect(() => {
    fetch('http://localhost:5000/api/formulario')
      .then(res => res.json())
      .then(setDados)
      .catch(err => console.error('Erro ao buscar dados:', err));
  }, []);

  // --- Dados para os gráficos --- //
  // Educação
  const bairros = [...new Set(dados.map(d => d.bairro))];
  const dadosPorBairro = bairros.map(bairro => ({
    name: bairro,
    total: dados.filter(d => d.bairro === bairro).length
  }));

  const estudandoSim = dados.filter(d => d.estudando === 'Sim').length;
  const estudandoNao = dados.filter(d => d.estudando === 'Não').length;
  const dadosEstudo = [
    { name: 'Estudando', value: estudandoSim },
    { name: 'Não estudando', value: estudandoNao }
  ];

  const avaliacaoEADLabels = ['Muito Boa', 'Boa', 'Regular', 'Ruim', 'Muito Ruim'];
  const dadosAvaliacaoEAD = avaliacaoEADLabels.map(label => ({
    name: label,
    value: dados.filter(d => d.avaliacaoEAD === label).length
  }));

  // Saúde
  const planoSim = dados.filter(d => d.planoSaude === 'Sim').length;
  const planoNao = dados.filter(d => d.planoSaude === 'Não').length;
  const dadosSaude = [
    { name: 'Com plano de saúde', value: planoSim },
    { name: 'Sem plano de saúde', value: planoNao }
  ];

  const locaisAjuda = [...new Set(dados.map(d => d.ondeAjuda))];
  const dadosOndeAjuda = locaisAjuda.map(local => ({
    name: local,
    total: dados.filter(d => d.ondeAjuda === local).length
  }));

  // Violência
  const tiposViolencia = [...new Set(dados.map(d => d.tipoViolencia))];
  const dadosTipoViolencia = tiposViolencia.map(tipo => ({
    name: tipo,
    value: dados.filter(d => d.tipoViolencia === tipo).length
  }));

  const frequencias = [...new Set(dados.map(d => d.frequenciaViolencia))];
  const dadosFrequenciaViolencia = frequencias.map(freq => ({
    name: freq,
    value: dados.filter(d => d.frequenciaViolencia === freq).length
  }));

  // --- Função para renderizar gráficos por categoria --- //
  function renderCategoria() {
    switch (categoria) {
      case 'educacao':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Gráfico por bairro */}
            <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">Distribuição por Bairro</h2>
              <div className="flex-1 min-h-[300px]">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={dadosPorBairro}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="total" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            {/* Estudando x Não */}
            <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col">
              <h2 className="text-sm font-bold text-gray-700 mb-4">Estudando x Não estudando</h2>
              <div className="flex-1 min-h-[300px] flex items-center justify-center">
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie data={dadosEstudo} dataKey="value" nameKey="name" outerRadius={90} label>
                      {dadosEstudo.map((entry, index) => (
                        <Cell key={index} fill={cores[index % cores.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
            {/* Avaliação do EAD */}
            <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col md:col-span-2">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">Avaliação do EAD</h2>
              <div className="flex-1 min-h-[300px] flex items-center justify-center">
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie data={dadosAvaliacaoEAD} dataKey="value" nameKey="name" outerRadius={90} label>
                      {dadosAvaliacaoEAD.map((entry, index) => (
                        <Cell key={index} fill={cores[index % cores.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        );
      case 'saude':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Plano de Saúde */}
            <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">Plano de Saúde</h2>
              <div className="flex-1 min-h-[300px] flex items-center justify-center">
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie data={dadosSaude} dataKey="value" nameKey="name" outerRadius={90} label>
                      {dadosSaude.map((entry, index) => (
                        <Cell key={index} fill={cores[index % cores.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
            {/* Onde Procurou Ajuda */}
            <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">Onde Procurou Ajuda</h2>
              <div className="flex-1 min-h-[300px]">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={dadosOndeAjuda}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="total" fill="#00C49F" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        );
      case 'violencia':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Tipo de Violência */}
            <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">Tipo de Violência</h2>
              <div className="flex-1 min-h-[300px] flex items-center justify-center">
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie data={dadosTipoViolencia} dataKey="value" nameKey="name" outerRadius={90} label>
                      {dadosTipoViolencia.map((entry, index) => (
                        <Cell key={index} fill={cores[index % cores.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
            {/* Frequência da Violência */}
            <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">Frequência da Violência</h2>
              <div className="flex-1 min-h-[300px] flex items-center justify-center">
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie data={dadosFrequenciaViolencia} dataKey="value" nameKey="name" outerRadius={90} label>
                      {dadosFrequenciaViolencia.map((entry, index) => (
                        <Cell key={index} fill={cores[index % cores.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-10 px-4">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header */}
          <header className="text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Dashboard de Respostas</h1>
            <p className="text-gray-500 text-lg mb-6">
              Visualize os principais indicadores das respostas coletadas.
            </p>

            {/* Menu de categorias */}
            <nav className="flex justify-center space-x-6 border-b border-gray-300 pb-4">
              <button
              style={{ outline: 'none' }}
                className={`px-4 py-2 rounded font-semibold rounded-md ${
                  categoria === 'educacao' ? 'bg-violet-700 text-white' : 'text-gray-600 hover:text-indigo-600'
                }`}
                onClick={() => setCategoria('educacao')}
              >
                Educação
              </button>
              <button
              style={{ outline: 'none' }}
                className={`px-4 py-2 rounded font-semibold rounded-md ${
                  categoria === 'saude' ? 'bg-violet-700 text-white' : 'text-gray-600 hover:text-indigo-600'
                }`}
                onClick={() => setCategoria('saude')}
              >
                Saúde
              </button>
              <button
                 style={{ outline: 'none' }}
                className={`px-4 py-2 rounded font-semibold rounded-md  ${
                  categoria === 'violencia' ? 'bg-violet-700 text-white' : 'text-gray-600 hover:text-indigo-600' 
                }`}
                onClick={() => setCategoria('violencia')}
              >
                Violência
              </button>
            </nav>
          </header>

          {/* Conteúdo da categoria selecionada */}
          {renderCategoria()}
        </div>
      </div>
    </>
  );
}
