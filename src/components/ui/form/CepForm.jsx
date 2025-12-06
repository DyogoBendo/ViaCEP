export default function CepForm({value, onChange}){
    return (
        <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-600">Digite o CEP</label>
            <input
            type="text"
            value={value}
            onChange={onChange}
            placeholder="00000-000"
            className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-lg"
            maxLength={9}
            />
        </div>
    )
}
