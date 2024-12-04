const URL = "http://localhost:3000/";

export const solicitud = async (endpoint) => {
    try {
        const respuesta = await fetch(`${URL}${endpoint}`);
        if (!respuesta.ok) throw new Error(`Error en la solicitud: ${respuesta.statusText}`);
        return await respuesta.json();
    } catch (error) {
        console.error("error en la solicitud:", error);
        throw error;
    }
};
