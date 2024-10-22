import { createContext, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const usuarioLogado = JSON.parse(sessionStorage.getItem('usuario')) || false
    const [email, setEmail] = useState();
    const [usuario, setUsuario] = useState(usuarioLogado);

    return (
        <AuthContext.Provider value={{email, setEmail, usuario, setUsuario}}>
            {children}
        </AuthContext.Provider>
    );
}
 
export default AuthProvider;