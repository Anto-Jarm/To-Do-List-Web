document.getElementById('formtarea').addEventListener('submit', guardarTarea);

function guardarTarea(e) {
    e.preventDefault();

    let titulo = document.getElementById('titulo').value;
    let descripcion = document.getElementById('descripcion').value;

    const tarea = {
    id: Date.now(), // ID que se genera auto
    titulo,
    descripcion
};


    if (localStorage.getItem('tareas') === null) {
        let tareas = [];
        tareas.push(tarea);
        localStorage.setItem('tareas', JSON.stringify(tareas));
    } else {
        let tareas = JSON.parse(localStorage.getItem('tareas'));
        tareas.push(tarea);
        localStorage.setItem('tareas', JSON.stringify(tareas));
    }
   
    gettareas();
    document.getElementById('formtarea').reset();
}

function borrarTarea(id) {
    let tareas = JSON.parse(localStorage.getItem('tareas'));
    tareas = tareas.filter(tarea => tarea.id !== id); // ahora compara por ID
    localStorage.setItem('tareas', JSON.stringify(tareas));
    gettareas();
}


function gettareas() {
    let tareas = JSON.parse(localStorage.getItem('tareas'));
    let vistaTareas = document.getElementById('tareas');
    vistaTareas.innerHTML = '';

    for (let i = 0; i < tareas.length; i++) {
        let { id, titulo, descripcion } = tareas[i];

        vistaTareas.innerHTML += `
        <div class="card shadow-sm mb-3 animate__animated animate__fadeIn">
            <div class="card-body">
                <h5 class="card-title">${titulo}</h5>
                <p class="card-text">${descripcion}</p>
                <a href="#" onclick="borrarTarea(${id})" class="btn btn-outline-danger btn-sm">
                    <i class="fas fa-trash-alt"></i> Eliminar
                </a>
            </div>
        </div>`;
    }
}

// Carga las tareas cuando abre el HTML
gettareas();