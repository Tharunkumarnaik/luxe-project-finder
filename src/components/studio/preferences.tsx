import {createContext,useContext,useState,type ReactNode} from 'react';
const PreferencesContext=createContext<{selected:string[];toggle:(name:string)=>void;clear:()=>void}>({selected:[],toggle:()=>{},clear:()=>{}});
export function PreferencesProvider({children}:{children:ReactNode}){const[selected,setSelected]=useState<string[]>([]);return <PreferencesContext.Provider value={{selected,toggle:(name)=>setSelected(prev=>prev.includes(name)?prev.filter(s=>s!==name):[...prev,name]),clear:()=>setSelected([])}}>{children}</PreferencesContext.Provider>}
export const usePreferences=()=>useContext(PreferencesContext);
