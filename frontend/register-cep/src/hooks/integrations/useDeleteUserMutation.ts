import { useMutation, useQueryClient } from "@tanstack/react-query"
import { GLOBAL_KEYS } from "./queryKeys";
import { api } from "../../api";

export const useDeleteUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async(id: number) => {
            return api.delete(`/remover/${id}`);
        },

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: GLOBAL_KEYS.GetUsers()
            });
        }
    })
}