const solicitud = async (url) => {
    const respuesta = await fetch(url);
    if (!respuesta.ok) throw new Error(`error en la solicitud: ${respuesta.statusText}`);// el status.text es para leer una fuente https
    return await respuesta.json();
};
const obtenerCiudades = async () => await solicitud(`http://localhost:3000/ciudades`);
const obtenerUsuarios = async () => await solicitud(`http://localhost:3000/usuarios`);
const obtenerMaterias = async () => await solicitud(`http://localhost:3000/materias`);
const obtenerMateriaUsuarios = async () => await solicitud(`http://localhost:3000/materia_usuario`);
const obtenerNotas = async () => await solicitud(`http://localhost:3000/notas`);

const cargar = async () => {
    try {
        const ciudades = await obtenerCiudades();
        const usuarios = await obtenerUsuarios();
        const materias = await obtenerMaterias();
        const materiaUsuarios = await obtenerMateriaUsuarios();
        const notas = await obtenerNotas();

        const usuariosPorCiudades = ciudades.map(ciudad => ({
            ciudad: ciudad.nombre,
            usuarios: usuarios.filter(user => user.ciudadId === ciudad.id)
        }));
        const materiasPorUsuario = usuarios.map(user => ({
            usuario: user.nombre,
            materias: materiaUsuarios
                .filter(muestra => muestra.usuarioId === user.id)
                .map(muestra => materias.find(materia => materia.id === muestra.materiaId))
        }));

        const promedioPorUsuario = usuarios.map(user => {
            const notasUsuario = notas.filter(nota => nota.usuarioId === user.id);
            const promedio =
                notasUsuario.reduce((sum, nota) => sum + nota.valor, 0) / (notasUsuario.length || 1);
            return { usuario: user.nombre, promedio };
        });
        const usuariosConMaterias = usuarios.filter(user =>
            materiaUsuarios.some(muestra => muestra.usuarioId === user.id)
        );
        console.log("usuarios por ciudad:", usuariosPorCiudades);
        console.log("materias de cada usuario:", materiasPorUsuario);
        console.log("promedio notas de usuario:", promedioPorUsuario);
        console.log("usuarios que matricularon materias:", usuariosConMaterias);
    } catch (error) {
        console.error("error no cargan datos:", error);
    }
};
cargar();