import CadastroEndereco from "./CadastroEndereco";
import CepForm from "./CepForm";
import IdForm from "./IdForm";
import SubmitButton from "./SubmitButton";

export default function Form({activeTab, handleSearch, addressData, setAddressData, setLoading, loading, idValue, cep, handleCepChange, setIdValue, idCidade, setIdCidade}){
    return (
        <form onSubmit={handleSearch} className="space-y-4">                                
            {(activeTab === 'cep' || activeTab === 'externo') && <CepForm onChange={handleCepChange} value={cep}/>}                        
            {activeTab === 'id' && <IdForm label={"ID do endereço"} onChange={(e) => setIdValue(e.target.value)} value={idValue}/>}
            {activeTab === 'cidade' && <IdForm label={"ID da cidade"} onChange={(e) => setIdCidade(e.target.value)} value={idCidade}/>}
            {activeTab === 'cadastro' && <CadastroEndereco addressData={addressData} setAddressData={setAddressData} setLoading={setLoading} handleCepChange={handleCepChange}/>}            
            <SubmitButton activeTab={activeTab} loading={loading} />            
        </form>
    )
}