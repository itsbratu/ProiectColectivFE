import { LoginResponse, User } from "../mutations/useLoginRequest";
import { RegisterResponse } from "../mutations/useRegisterRequest";
import http from "./common";

class AuthService {
    async login(user: User): Promise<LoginResponse> {
        const result = await http.post<LoginResponse>("/auth/signin", JSON.stringify(user));
        return result.data;
    }

    async register(user: User): Promise<RegisterResponse>{
        const result = await http.post<RegisterResponse>("/auth/signup", JSON.stringify(user));
        return result.data;
    }
}

export default new AuthService()