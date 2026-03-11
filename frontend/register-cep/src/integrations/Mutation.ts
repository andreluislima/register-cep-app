import { useQuery } from "@tanstack/react-query";
import { api } from "../api";
import type { UsuarioResponse } from "../types/Usuario.Type";
import { GLOBAL_KEYS } from "./Keys";

export const useGetUsers = () => {
  return useQuery<UsuarioResponse[], Error>({
    queryKey: GLOBAL_KEYS.useGetUsers(),
    queryFn: () => api.get("/usuarios"),
    retry: false,
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};
