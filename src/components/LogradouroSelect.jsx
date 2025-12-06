import APIService from "../APIService";
import { useState, useEffect } from 'react';

export default function LogradouroSelect({addressData, setAddressData, setLoading}){
    const [logradouros, setLogradouros] = useState([]);

    useEffect(() => {
        APIService.obterLogradouros()
        .then((data) => setLogradouros(data))
        .catch((error) => console.error('Error in fetching', error))
        .finally(() => setLoading(false))
    }, [])

    return (
        <div className="md:col-span-2 space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase">Logradouro</label>
            <select
                value={addressData.logradouro?.id || ""}
                onChange={(e) => {
                    const selected = logradouros.find(c => c.id === Number(e.target.value));
                    setAddressData({
                    ...addressData,
                    logradouro: selected || null
                    });
                }}
                className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                >
                <option value="">Selecione...</option>

                {logradouros.map(l => (
                    <option key={l.id} value={l.id}>
                    {l.tipoLogradouro?.nome} {l.nome}
                    </option>
                ))}
            </select>
        </div>
    )
}