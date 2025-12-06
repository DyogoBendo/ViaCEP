import { useState } from "react";
import APIService from "../APIService";
import CidadeSelect from "./CidadeSelect";
import BairroSelect from "./BairroSelect";
import LogradouroSelect from "./LogradouroSelect";
import CepForm from "./CepForm";

export default function CadastroEndereco({addressData, setAddressData, setLoading, handleCepChange}){
    return(
        <div className="space-y-3">
            <CidadeSelect addressData={addressData} setAddressData={setAddressData} setLoading={setLoading}/>
            <BairroSelect addressData={addressData} setAddressData={setAddressData} setLoading={setLoading}/>
            <LogradouroSelect addressData={addressData} setAddressData={setAddressData}  setLoading={setLoading}/>
            <CepForm value={addressData.cep} onChange={handleCepChange} />
        </div>
    )
}