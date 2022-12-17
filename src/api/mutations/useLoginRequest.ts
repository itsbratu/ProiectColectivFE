import { AxiosError } from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import authService from "../services/AuthService";

type LoginPayload = {
  createPayload: User;
};

export const useLoginRequest = () => {
  const queryClient = useQueryClient();
  const { mutate, isLoading, data, error } = useMutation<
    LoginResponse,
    AxiosError,
    LoginPayload
  >(({ createPayload }) => authService.login(createPayload));

  return { mutate, error, isLoading, data };
};

export type LoginResponse = {
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
