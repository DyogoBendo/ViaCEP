import TabButton from "./TabButton"
export default function Navbar({activeTab, setActiveTab,clearSearch}){
    return (
        <div className="flex border-b border-slate-200">
          <TabButton tab="cadastro" activeTab={activeTab} setActiveTab={setActiveTab} clearSearch={clearSearch}> Cadastrar </TabButton>
          <TabButton tab="cep" activeTab={activeTab} setActiveTab={setActiveTab} clearSearch={clearSearch}> Por CEP </TabButton>
          <TabButton tab="externo" activeTab={activeTab} setActiveTab={setActiveTab} clearSearch={clearSearch}> Por ViaCEP </TabButton>
          <TabButton tab="id" activeTab={activeTab} setActiveTab={setActiveTab} clearSearch={clearSearch}> Por ID </TabButton>
          <TabButton tab="cidade" activeTab={activeTab} setActiveTab={setActiveTab} clearSearch={clearSearch}> Cidade por ID </TabButton>
        </div>
    )
}  