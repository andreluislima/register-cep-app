import type { UsuarioResponse } from "../types/Usuario.Type"

export const useGetUsers = () =>{
    return useQuery<UsuarioResponse[], Error>({
        queryKey: "useGetUsers",
        queryFn: () => ({}),
        retry: false,
        refetchInterval:false,
        refetchOnWindowFocus:false
    })
}