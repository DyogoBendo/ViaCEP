import { api } from "./api";

class APIService{
    async obterEnderecoPorID(id){

        const response = await api.get(`/endereco/id`, {params: {id: id}});
        return response.data
    }

    async obterEnderecoPorCEP(cep){
        const response = await api.get(`/endereco/cep`, {params: {cep: cep}});
        return response.data
    }

    async obterEnderecoExternoPorCEP(cep){
        const response = await api.get(`/endereco/externo/cep`, {params: {cep: cep}});
        return response.data
    }

    async obterCidadePorID(id){
        const response = await api.get(`/cidade/id`, {params: {id: id}});
        return response.data
    }

    async obterCidades(){
        const response = await api.get(`/cidade`);
        return response.data
    }

    async obterLogradouros(){
        const response = await api.get(`/logradouro`);
        return response.data
    }
    
    async obterBairros(){
        const response = await api.get(`/bairro`);
        return response.data
    }

    async cadastrarEndereco(endereco){
        const response = await api.post('/endereco/cadastrar', endereco);        
        return response.data;
    }
}

export default new APIService();