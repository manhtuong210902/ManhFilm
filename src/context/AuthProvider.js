import { onAuthStateChanged } from 'firebase/auth';
import { createContext, useEffect, useState } from 'react';
import { auth } from '~/firebase/config';
export const AuthContext = createContext();

function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const { displayName, email, photoURL, uid } = user;
                setUser({ displayName, email, photoURL, uid });
            } else {
                setUser(null);
            }
        });

        return () => {
            unsubscribe();
        };
    }, []);

    return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
