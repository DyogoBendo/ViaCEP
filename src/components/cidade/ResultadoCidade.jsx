export default function ResultadoCidade({cidade, i}){    
    return (                    
        <div key={i}>
            <h3 className="text-xl font-bold text-slate-800"> {cidade?.nome || '-'}</h3>
            <p className="text-slate-500">
            {cidade?.unidadeFederativa?.nome || '-'}
            </p>
        </div>               
    )
}