import APIService from "../../APIService";
import { useState, useEffect } from 'react';

export default function CidadeSelect({addressData, setAddressData, setLoading}){
    const [cidades, setCidades] = useState([]);

    useEffect(() => {
        APIService.obterCidades()
        .then((data) => setCidades(data))
        .catch((error) => console.error('Error in fetching', error))
        .finally(() => setLoading(false))
    }, [])

    return (
        <div className="md:col-span-2 space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase">Cidade</label>
            <select
                value={addressData.cidade?.id || ""}
                onChange={(e) => {
                    const selected = cidades.find(c => c.id === Number(e.target.value));
                    setAddressData({
                    ...addressData,
                    cidade: selected || null
                    });
                }}
                className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                >
                <option value="">Selecione...</option>

                {cidades.map(c => (
                    <option key={c.id} value={c.id}>
                    {c.nome} - {c.unidadeFederativa?.nome}
                    </option>
                ))}
            </select>
        </div>
    )
}