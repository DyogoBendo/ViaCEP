import { Search, MapPin } from 'lucide-react';

export default function Header(){    
    return (
        <div className="bg-blue-700 p-6 text-white flex items-center justify-between">
            <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
                <MapPin className="w-6 h-6" />
                Busca de Endereços
            </h1>
            <p className="text-blue-200 text-sm mt-1">Localize dados via CEP ou ID</p>
            </div>
            <div className="bg-blue-600 p-2 rounded-lg">
            <Search className="w-6 h-6 text-blue-100" />
            </div>
        </div>
    )
}