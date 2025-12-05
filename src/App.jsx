import React, { useState } from 'react';
import { Search, MapPin, Building, Hash, Navigation, AlertCircle, Loader2, X } from 'lucide-react';

export default function App() {
  // Estados de controle da interface
  const [activeTab, setActiveTab] = useState('cep'); // 'cep', 'address', 'id'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);

  // Estados dos formulários
  const [cep, setCep] = useState('');
  const [addressData, setAddressData] = useState({ street: '', city: '', uf: '' });
  const [idValue, setIdValue] = useState('');

  // Máscara simples para CEP
  const handleCepChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 8) value = value.slice(0, 8);
    if (value.length > 5) value = value.replace(/^(\d{5})(\d)/, '$1-$2');
    setCep(value);
  };

  // Função para limpar a busca
  const clearSearch = () => {
    setResult(null);
    setError('');
  };

  // Função Principal de Busca
  const handleSearch = async (e) => {
    e.preventDefault();
    clearSearch();
    setLoading(true);

    try {
      if (activeTab === 'cep') {
        // Lógica REAL do ViaCEP
        const cleanCep = cep.replace(/\D/g, '');
        if (cleanCep.length !== 8) {
          throw new Error('O CEP deve conter 8 dígitos.');
        }

        const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
        const data = await response.json();

        if (data.erro) {
          throw new Error('CEP não encontrado na base de dados.');
        }

        setResult({
          type: 'ViaCEP',
          logradouro: data.logradouro,
          bairro: data.bairro,
          localidade: data.localidade,
          uf: data.uf,
          cep: data.cep,
          complemento: data.complemento,
          ddd: data.ddd
        });

      } else {
        // Lógica MOCK (Simulação para a API do seu amigo)
        await new Promise(resolve => setTimeout(resolve, 1500)); // Simula delay de rede

        // Simulação de erro aleatório ou sucesso para teste
        if (activeTab === 'id' && !idValue) throw new Error('Por favor, informe um ID.');
        if (activeTab === 'address' && !addressData.city) throw new Error('Informe pelo menos a cidade.');

        setResult({
          type: 'API Interna (Simulação)',
          logradouro: activeTab === 'address' && addressData.street ? addressData.street : 'Rua Exemplo Simulado',
          bairro: 'Centro',
          localidade: activeTab === 'address' && addressData.city ? addressData.city : 'Cidade Teste',
          uf: activeTab === 'address' && addressData.uf ? addressData.uf : 'SP',
          cep: '00000-000',
          id: activeTab === 'id' ? idValue : '12345',
          obs: 'Dados retornados pela API (Simulado)'
        });
      }
    } catch (err) {
      setError(err.message || 'Erro ao buscar endereço.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4 font-sans text-slate-800">
      
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden">
        
        {/* Header */}
        <div className="bg-blue-700 p-6 text-white flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <MapPin className="w-6 h-6" />
              Busca de Endereços
            </h1>
            <p className="text-blue-200 text-sm mt-1">Localize dados via CEP ou API Interna</p>
          </div>
          <div className="bg-blue-600 p-2 rounded-lg">
            <Search className="w-6 h-6 text-blue-100" />
          </div>
        </div>

        {/* Tabs de Navegação */}
        <div className="flex border-b border-slate-200">
          <button
            onClick={() => { setActiveTab('cep'); clearSearch(); }}
            className={`flex-1 py-4 text-sm font-medium transition-colors flex items-center justify-center gap-2
              ${activeTab === 'cep' ? 'text-blue-700 border-b-2 border-blue-700 bg-blue-50' : 'text-slate-500 hover:text-blue-600 hover:bg-slate-50'}`}
          >
            <Navigation className="w-4 h-4" />
            Por CEP
          </button>
          <button
            onClick={() => { setActiveTab('address'); clearSearch(); }}
            className={`flex-1 py-4 text-sm font-medium transition-colors flex items-center justify-center gap-2
              ${activeTab === 'address' ? 'text-blue-700 border-b-2 border-blue-700 bg-blue-50' : 'text-slate-500 hover:text-blue-600 hover:bg-slate-50'}`}
          >
            <Building className="w-4 h-4" />
            Por Endereço
          </button>
          <button
            onClick={() => { setActiveTab('id'); clearSearch(); }}
            className={`flex-1 py-4 text-sm font-medium transition-colors flex items-center justify-center gap-2
              ${activeTab === 'id' ? 'text-blue-700 border-b-2 border-blue-700 bg-blue-50' : 'text-slate-500 hover:text-blue-600 hover:bg-slate-50'}`}
          >
            <Hash className="w-4 h-4" />
            Por ID
          </button>
        </div>

        <div className="p-6">
          {/* Formulários Dinâmicos */}
          <form onSubmit={handleSearch} className="space-y-4">
            
            {/* INPUT: CEP */}
            {activeTab === 'cep' && (
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600">Digite o CEP</label>
                <input
                  type="text"
                  value={cep}
                  onChange={handleCepChange}
                  placeholder="00000-000"
                  className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-lg"
                  maxLength={9}
                />
              </div>
            )}

            {/* INPUT: ENDEREÇO COMPLETO */}
            {activeTab === 'address' && (
              <div className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="md:col-span-2 space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase">Cidade</label>
                    <input
                      type="text"
                      placeholder="Ex: São Paulo"
                      value={addressData.city}
                      onChange={(e) => setAddressData({...addressData, city: e.target.value})}
                      className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase">UF</label>
                    <select 
                      value={addressData.uf}
                      onChange={(e) => setAddressData({...addressData, uf: e.target.value})}
                      className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                    >
                      <option value="">Selecione</option>
                      <option value="SP">SP</option>
                      <option value="RJ">RJ</option>
                      <option value="MG">MG</option>
                      <option value="PR">PR</option>
                      {/* Adicionar outros estados conforme necessário */}
                    </select>
                  </div>
                </div>
                <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase">Rua / Logradouro</label>
                    <input
                      type="text"
                      placeholder="Ex: Avenida Paulista"
                      value={addressData.street}
                      onChange={(e) => setAddressData({...addressData, street: e.target.value})}
                      className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                </div>
              </div>
            )}

            {/* INPUT: ID */}
            {activeTab === 'id' && (
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600">ID do Endereço</label>
                <input
                  type="number"
                  placeholder="Ex: 1045"
                  value={idValue}
                  onChange={(e) => setIdValue(e.target.value)}
                  className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
              </div>
            )}

            {/* Botão de Ação */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 rounded-lg transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed mt-4 shadow-md active:scale-[0.98]"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Buscando...
                </>
              ) : (
                <>
                  <Search className="w-5 h-5" />
                  Consultar Endereço
                </>
              )}
            </button>
          </form>

          {/* Área de Erro */}
          {error && (
            <div className="mt-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-r flex items-start gap-3 animate-in fade-in slide-in-from-top-2">
              <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-bold">Ops! Algo deu errado.</p>
                <p className="text-sm">{error}</p>
              </div>
            </div>
          )}

          {/* Área de Resultados */}
          {result && !loading && (
            <div className="mt-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="relative border border-slate-200 rounded-xl p-5 bg-slate-50">
                <button 
                  onClick={clearSearch}
                  className="absolute top-3 right-3 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-2 mb-4">
                  <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded border border-green-200 uppercase">
                    Sucesso
                  </span>
                  <span className="text-xs text-slate-400 font-mono">Fonte: {result.type}</span>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-800">{result.logradouro || 'Logradouro não informado'}</h3>
                    <p className="text-slate-500">
                      {result.bairro ? `${result.bairro}, ` : ''} {result.localidade} - {result.uf}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 border-t border-slate-200 pt-4">
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">CEP</p>
                      <p className="font-mono text-slate-700 font-medium">{result.cep}</p>
                    </div>
                    {result.ddd && (
                      <div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">DDD</p>
                        <p className="font-mono text-slate-700 font-medium">{result.ddd}</p>
                      </div>
                    )}
                    {result.id && (
                       <div>
                       <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">ID Interno</p>
                       <p className="font-mono text-slate-700 font-medium">#{result.id}</p>
                     </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Estado Vazio / Placeholder */}
          {!result && !error && !loading && (
            <div className="mt-8 text-center py-8 opacity-40">
              <MapPin className="w-16 h-16 mx-auto mb-3 text-slate-400" />
              <p className="text-slate-500 font-medium">Preencha os dados acima para buscar</p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}