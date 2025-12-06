import { X } from 'lucide-react';
import ResultadoEndereco from '../../endereco/ResultadoEndereco';
import ResultadoCidade from '../../cidade/ResultadoCidade';

export default function Resultado({clearSearch, result, activeTab}){
    return (
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
                        Resultado Encontrado
                    </span>
                </div>
        
                {
                    result.map((item, i) => 
                        ( activeTab === 'cidade' ?
                            <ResultadoCidade cidade={item} i={i}/>:
                            <ResultadoEndereco item={item} i={i} /> 
                        ))
                }                
            </div>
        </div>
    )
}