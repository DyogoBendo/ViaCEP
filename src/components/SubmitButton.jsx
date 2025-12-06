import { Search, Save, Loader2} from 'lucide-react';

export default function SubmitButton({activeTab, loading}){    
    const data = activeTab === 'cadastro' ? 
        {loadingMessage: 'Cadastrando...', icon: <Save className="w-5 h-5" />, message: 'Cadastrar' } : 
        {loadingMessage: 'Buscando...', icon: <Search className="w-5 h-5" />, message: 'Consultar' };
    return (
        <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 rounded-lg transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed mt-4 shadow-md active:scale-[0.98]"
        >
            {loading ? (
            <>
                <Loader2 className="w-5 h-5 animate-spin" />
                {data.loadingMessage}
            </>
            ) : (
            <>
                {data.icon}
                {data.message}                
            </>
            )}
        </button>
    )
}