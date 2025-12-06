export default function TabButton({
  tab,
  activeTab,
  setActiveTab,
  clearSearch,
  children
}) {  

  return (
    <button
      onClick={() => { setActiveTab(tab); clearSearch(); }}
      className={`
        flex-1 py-4 text-sm font-medium transition-colors 
        flex items-center justify-center gap-2
        ${activeTab === tab
          ? "text-blue-700 border-b-2 border-blue-700 bg-blue-50"
          : "text-slate-500 hover:text-blue-600 hover:bg-slate-50"}
      `}
    >      
      {children}
    </button>
  );
}
