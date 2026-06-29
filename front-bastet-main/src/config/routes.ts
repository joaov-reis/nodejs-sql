export default {
    'root': '#', //Rota da API
    'criar-usuario': () => '/students', //url de criar usuários
    'login': () => '/login', //url de login
    'logout': () => '/logout', //url de logout
    'listar-cursos': ( filtro ?: any ) => '/course' + filtro ? '?' + new URLSearchParams(filtro).toString() : '', //url de listar cursos
    'inscrever-curso': ( idCurso : string ) => `/enrollments/${ idCurso }`, //url de se inscrever em curso,
    'cancelar-curso': ( idCurso : string ) => `/enrollments/${ idCurso }`, //url de cancelar inscricao
    'meus-cursos': () => `/enrollments` //url de listar meus cursos
}