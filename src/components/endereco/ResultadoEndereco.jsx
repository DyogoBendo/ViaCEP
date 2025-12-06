export default function ResultadoEndereco({item, i}){
    return (
        
            <div key={i} className="space-y-4 bg-white border border-slate-300 rounded-lg p-4 shadow-sm mb-6">
                <div>
                    <h3 className="text-xl font-bold text-slate-800"> {item?.logradouro?.tipoLogradouro?.nome } {item?.logradouro?.nome || '-'}</h3>
                    <p className="text-slate-500">
                    {item.bairro && item.bairro.nome ? `${item.bairro.nome}, ` : ''} {item?.cidade?.nome} - {item?.cidade?.unidadeFederativa?.nome}
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-4 border-t border-slate-200 pt-4">
                    <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">CEP</p>
                    <p className="font-mono text-slate-700 font-medium">{item?.cep}</p>
                    </div>
                    {/* Outros campos podem ser adicionados aqui */}
                </div>
            </div>
        
    )
}