import {User} from '../domain/User';

export interface AuthService {
    login(email: string, password: string): Promise<User | null>;
    register(payload: { first_name: string; last_name: string; email: string; password: string }): Promise<User | null>;
    logout(): Promise<void>;
}

class AuthServiceImpl implements AuthService {
    async login(email: string, password: string): Promise<User | null> {
        try {
            const response = await fetch("http://127.0.0.1:8000/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const result = await response.json();

            if (response.ok) {
                // Calcular el timestamp de expiración
                const currentTime = Math.floor(Date.now() / 1000); // tiempo actual en segundos
                const expirationTimestamp = currentTime + Number(result.user.expires_in);

                // Guardar token y timestamp de expiración en localStorage
                localStorage.setItem("token", result.user.token);
                localStorage.setItem("token_expiration", expirationTimestamp.toString());

                return result.user;
            } else {
                throw new Error(result.message || "Login failed");
            }
        } catch (error) {
            console.error("Error during login:", error);
            throw error;
        }
    }

    async register(payload: { first_name: string; last_name: string; email: string; password: string }): Promise<User | null> {
        try {
            const response = await fetch("http://127.0.0.1:8000/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            const result = await response.json();

            if (response.ok) {
                return result.user;
            } else {
                throw new Error(result.message || "Registration failed");
            }
        } catch (error) {
            console.error("Error during registration:", error);
            throw error;
        }
    }

    async logout(): Promise<void> {
        // Implementar lógica de logout si es necesario
        localStorage.removeItem("token");
        localStorage.removeItem("token_expiration");
    }
}

export const authService = new AuthServiceImpl();