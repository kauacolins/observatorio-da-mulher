import React, { useEffect, useState } from 'react';
import {
  PieChart, Pie, Cell, Tooltip,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend,
  ResponsiveContainer
} from 'recharts';

const cores = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#00C49F'];

export default function Dashboard() {
  const [dados, setDados] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/formulario')
      .then(res => res.json())
      .then(setDados)
      .catch(err => console.error('Erro ao buscar dados:', err));
  }, []);

  // Agrupar por bairro
  const bairros = [...new Set(dados.map(d => d.bairro))];
  const dadosPorBairro = bairros.map(bairro => ({
    name: bairro,
    total: dados.filter(d => d.bairro === bairro).length
  }));

  // Estudando vs. não
  const estudandoSim = dados.filter(d => d.estudando === 'Sim').length;
  const estudandoNao = dados.filter(d => d.estudando === 'Não').length;
  const dadosEstudo = [
    { name: 'Estudando', value: estudandoSim },
    { name: 'Não estudando', value: estudandoNao }
  ];

  // Acesso à saúde
  const planoSim = dados.filter(d => d.planoSaude === 'Sim').length;
  const planoNao = dados.filter(d => d.planoSaude === 'Não').length;
  const dadosSaude = [
    { name: 'Com plano de saúde', value: planoSim },
    { name: 'Sem plano de saúde', value: planoNao }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-2">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Dashboard de Respostas</h1>
          <p className="text-gray-500">Visualize os principais indicadores das respostas coletadas.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded shadow p-6 flex flex-col">
            <h2 className="text-lg font-semibold mb-4 text-gray-700">Distribuição por Bairro</h2>
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
          <div className="bg-white rounded shadow p-6 flex flex-col justify-between">
            <h2 className="text-lg font-semibold mb-4 text-gray-700">Estudando x Não</h2>
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
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded shadow p-6 flex flex-col justify-between">
            <h2 className="text-lg font-semibold mb-4 text-gray-700">Plano de Saúde</h2>
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
          {/* Espaço reservado para futuros gráficos ou widgets */}
          <div className="bg-white rounded shadow p-6 flex items-center justify-center text-gray-400 text-lg">
            <span>Adicione mais gráficos ou informações aqui</span>
          </div>
        </div>
      </div>
    </div>
  );
}
