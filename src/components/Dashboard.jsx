import React, { useEffect, useState } from 'react';
import {
  PieChart, Pie, Cell, Tooltip,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend,
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
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold">Dashboard de Respostas</h1>

      <div>
        <h2 className="text-lg font-semibold">Distribuição por Bairro</h2>
        <BarChart width={500} height={300} data={dadosPorBairro}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Legend />
          <Bar dataKey="total" fill="#8884d8" />
        </BarChart>
      </div>

      <div className="flex flex-wrap gap-12">
        <div>
          <h2 className="text-lg font-semibold">Estudando x Não</h2>
          <PieChart width={300} height={250}>
            <Pie data={dadosEstudo} dataKey="value" nameKey="name" outerRadius={100}>
              {dadosEstudo.map((entry, index) => (
                <Cell key={index} fill={cores[index % cores.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>

        <div>
          <h2 className="text-lg font-semibold">Plano de Saúde</h2>
          <PieChart width={300} height={250}>
            <Pie data={dadosSaude} dataKey="value" nameKey="name" outerRadius={100}>
              {dadosSaude.map((entry, index) => (
                <Cell key={index} fill={cores[index % cores.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>
      </div>
    </div>
  );
}
