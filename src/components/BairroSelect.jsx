import APIService from "../APIService";
import { useState, useEffect } from 'react';

export default function BairroSelect({addressData, setAddressData, setLoading}){
    const [bairros, setBairros] = useState([]);

    useEffect(() => {
        APIService.obterBairros()
        .then((data) => setBairros(data))
        .catch((error) => console.error('Error in fetching', error))
        .finally(() => setLoading(false))
    }, [])

    return (
        <div className="md:col-span-2 space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase">Bairro</label>
            <select
                value={addressData.bairro?.id || ""}
                onChange={(e) => {
                    const selected = bairros.find(c => c.id === Number(e.target.value));
                    setAddressData({
                    ...addressData,
                    bairro: selected || null
                    });
                }}
                className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                >
                <option value="">Selecione...</option>

                {bairros.map(b => (
                    <option key={b.id} value={b.id}>
                    {b.nome}
                    </option>
                ))}
            </select>
        </div>
    )
}