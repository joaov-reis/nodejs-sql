export default {
    'root': '#', //Rota da API
    'criar-usuario': () => '/students', //url de criar usuários
    'login': () => '/login', //url de login
    'listar-cursos': ( filtro ?: any ) => '/course' + filtro ? '?' + new URLSearchParams(filtro).toString() : '', //url de listar cursos
    'inscrever-curso': ( idCurso : string ) => `/enrollments/${ idCurso }`, //url de se inscrever em curso,
    'cancelar-curso': ( idCurso : string ) => `/enrollments/${ idCurso }`, //url de cancelar inscricao
    'meus-cursos': ( idUsuario : string ) => `/enrollments?studentId=${idUsuario}` //url de listar meus cursos
}