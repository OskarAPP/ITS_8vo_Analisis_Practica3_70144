import { User } from '../../core/domain/User';
import { AuthService } from '../../core/ports/AuthService';

export class AuthServiceImpl implements AuthService {
    async login(email: string, password: string): Promise<User> {

        if (email === "user@example.com" && password === "password") {
            return {
                id: "1",
                email: "user@example.com",
                name: "User",
                token: "fake-jwt-token"
            };
        }
        throw new Error("Invalid email or password");
    }

    async logout(): Promise<void> {
       throw new Error("Method not implemented.");

    } 
    }