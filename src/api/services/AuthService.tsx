import { LoginResponse, User } from "../mutations/useLoginRequest";
import http from "./common";

class AuthService {
    async login(user: User): Promise<LoginResponse> {
        const result = await http.post<LoginResponse>("/auth/signin", JSON.stringify(user));
        return result.data;
    }
}

export default new AuthService()