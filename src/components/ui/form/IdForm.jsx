export default function IdForm({label, value, onChange}){
    return (
        <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-600">{label}</label>
            <input
                type="number"
                placeholder="Ex: 1045"
                value={value}
                onChange={onChange}
                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            />
        </div>
    )
}
