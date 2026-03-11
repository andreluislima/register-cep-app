const API_LOCAL_URL = "http://localhost:8080/usuario/";

export const api = {
    async get<T>(endpoint: string):Promise<T>{
        const response = await fetch (`${API_LOCAL_URL}${endpoint}`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if(!response.ok){
            throw new Error(`Erro na requisição: ${response.status}`);
        }

        return response.json();
    }
}