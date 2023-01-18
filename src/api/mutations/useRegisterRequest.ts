import { AxiosError } from "axios";
import { useMutation } from "react-query";
import authService from "../services/AuthService";

type RegisterPayload = {
  createPayload: User;
};

export const useRegisterRequest = () => {
  const { mutate, isLoading, data, error } = useMutation<
    RegisterResponse,
    AxiosError,
    RegisterPayload
  >(({ createPayload }) => authService.register(createPayload));

  return { mutate, error, isLoading, data };
};

export type RegisterResponse = {
  token: string;
  tokenType: string;
  id: string;
  username: string;
  roles: [string];
};

export type User = {
  username: string;
  password: string;
};
