import React, { useState } from 'react';
import { Search, MapPin, Building, Hash, Navigation, AlertCircle, Loader2, X } from 'lucide-react';
import APIService from './APIService';
import Header from './components/Header';
import Navbar from './components/Navbar';
import CepForm from './components/CepForm';
import IdForm from './components/IdForm';
import CadastroEnderecoForm from './components/CadastroEndereco';
import SubmitButton from './components/SubmitButton';
import Resultado from './components/Resultado';
import Form from './components/Form';

export default function App() {
  // Controle de abas e estados visuais
  const [activeTab, setActiveTab] = useState('cadastro'); // 'cep', 'address', 'id'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);

  // Estados dos inputs (necessários para o formulário funcionar visualmente)
  const [cep, setCep] = useState('');
  const [addressData, setAddressData] = useState({ cep: '', cidade: {nome: '', unidadeFederativa: {nome: '', sigla: ''}}, logradouro: {nome: '', tipoLogradouro: {nome: '', sigla: ''}}, bairro: {nome: ''} });
  const [idValue, setIdValue] = useState('');
  const [idCidade, setIdCidade] = useState('');

  const methods = {
    cep: {
      method: APIService.obterEnderecoPorCEP,
      value: cep
    },
    id: {
      method: APIService.obterEnderecoPorID,
      value: idValue
    },
    externo: {
      method: APIService.obterEnderecoExternoPorCEP,
      value: cep
    },
    cadastro: {
      method: APIService.cadastrarEndereco,
      value: addressData
    },
    cidade: {
      method: APIService.obterCidadePorID,
      value: idCidade
    }
  };

  // Máscara visual para CEP (UX)
  const handleCepChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 8) value = value.slice(0, 8);
    if (value.length > 5) value = value.replace(/^(\d{5})(\d)/, '$1-$2');
    setCep(value);
    setAddressData({...addressData, cep: value})
  };

  // Limpa estados ao trocar de aba
  const clearSearch = () => {
    setResult(null);
    setCep('')
    setAddressData({ cep: '', cidade: {nome: '', unidadeFederativa: {nome: '', sigla: ''}}, logradouro: {nome: '', tipoLogradouro: {nome: '', sigla: ''}}, bairro: {nome: ''} })
    setError('');
  };

  // Função Placeholder para futura integração
  const handleSearch = (e) => {
    e.preventDefault();
    clearSearch();
    setLoading(true);
    
    console.log("Iniciando requisição...", { activeTab, cep, addressData, idValue });

    const { method, value } = methods[activeTab] ?? {};

    method(value)
    .then((data) => {
      const items = Array.isArray(data) ? data : [data];
      setResult(items);
    })
    .catch((error) => {
      setResult(null);
      console.log(error.response.data.message);
      window.alert(`Erro ao cadastrar endereço: ${error.response.data.message}` )
      console.error('Error in fetching', error)
    })
    .finally(() => setLoading(false))    
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4 font-sans text-slate-800">
      
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden">

        <Header/>
        <Navbar activeTab={activeTab} setActiveTab={setActiveTab} clearSearch={clearSearch}/>

        <div className="p-6">                             
          <Form activeTab={activeTab} 
            setAddressData={setAddressData} 
            addressData={addressData} 
            handleCepChange={handleCepChange} 
            handleSearch={handleSearch} 
            setIdValue={setIdValue}
            idValue={idValue}
            cep={cep}
            loading={loading}
            setLoading={setLoading}
            idCidade={idCidade}
            setIdCidade={setIdCidade}
          />

          {result && !loading && <Resultado clearSearch={clearSearch} result={result} activeTab={activeTab} />}
        </div>
      </div>
    </div>
  );
}