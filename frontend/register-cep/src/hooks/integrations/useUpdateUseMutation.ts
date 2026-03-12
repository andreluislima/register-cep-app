import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { UsuarioRequest } from "../../types/Usuario.Type";
import { api } from "../../api";
import { GLOBAL_KEYS } from "./queryKeys";

export const useUpdateUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({id, data}: {id:number; data:UsuarioRequest}) => {
            return api.put(`/editar/${id}`, data);
        },

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: GLOBAL_KEYS.GetUsers(),
            });
        }
    })
}