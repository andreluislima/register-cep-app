import { useMutation } from "@tanstack/react-query"
import { api } from "../../api"
import type { CepResponse } from "../../types/Usuario.Type"

export const useBuscarCep = () => {
    return useMutation({
        mutationFn: async (cep: string) =>{
            return await api.get<CepResponse>(`/buscarCep/${cep}`)
        }
    })
}