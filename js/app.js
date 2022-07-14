const carrito = document.querySelector("#carrito");
const listaCursos = document.querySelector("#lista-cursos");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");
let articulosCarrito = [];

agregarEventListeners();

function agregarEventListeners() {
  listaCursos.addEventListener("click", agregarCurso);

  carrito.addEventListener('click', eliminarCurso);

  vaciarCarritoBtn.addEventListener('click', vaciarCarrito)
}

//funciones
function vaciarCarrito(){
  
  articulosCarrito = [];
  limpiarHTML();
  
}

function agregarCurso(e) {
  e.preventDefault();
  if (e.target.classList.contains("agregar-carrito")) {
    const curso = e.target.parentElement.parentElement;
    leerDatosCurso(curso);
  }
}

//lee el contenido HTML al que le dimos click y extrae la informacion

function leerDatosCurso(curso) {
  const infoCurso = {
    imagen: curso.querySelector("img").src,
    titulo: curso.querySelector("h4").textContent,
    precio: curso.querySelector(".precio span").textContent,
    id: curso.querySelector("a").getAttribute("data-id"),
    cantidad: 1,
  };

  //revisa si un elemento ya existe en el carrito
const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);
if (existe){
   const cursos = articulosCarrito.map(curso => {
    if (curso.id === infoCurso.id){
      curso.cantidad++;
      return curso;
    }else{
      return curso;
    }
   });
   articulosCarrito = [...cursos];
}else{
  articulosCarrito = [...articulosCarrito, infoCurso];
}
  console.log(articulosCarrito);
  carritoHTML();
}



//muestra el carrito de compras en el html
function carritoHTML() {
  // LIMPIAR EL HTML
  limpiarHTML();
  // RECORRE EL CARRITO Y GENERA EL HTML
  articulosCarrito.forEach((curso) => {
    const {imagen, titulo, precio, cantidad, id} = curso;
    const row = document.createElement("tr");
    row.innerHTML = `
                <td>  
                <img src="${imagen}" width=100>
                </td>

                <td>  
                     ${titulo}
                 </td>
                 <td>${precio}</td>
                 <td>${cantidad} </td>
                 <td>
                       <a href="#" class="borrar-curso" data-id="${id}">x<a/>
                 </td>
                 `;

    //agregar el HTML del carrito en el tbody
    contenedorCarrito.appendChild(row);
  });
}
 // Elimina un curso del carrito
function eliminarCurso (e){
 if (e.target.classList.contains('borrar-curso')){
    const cursoId = e.target.getAttribute('data-id');

    articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);

    carritoHTML();
 }else{

 }
}
//ELIMINA LOS CURSOS DEL BOD
function limpiarHTML(){

    //FORMA LENTA
    // contenedorCarrito.innerHTML = '';

    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}
