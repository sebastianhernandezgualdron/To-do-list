'use strict'
const guardarLista = "lista_tareas";
document.addEventListener("DOMContentLoaded", ()=>{


let tareas = [];

const listaTareas = document.getElementById("listaTareas");
const listaIds = document.getElementById("listaIds");
const btnEnviar = document.getElementById("btnEnviar");
const inputTareas = document.getElementById("tarea");
const tareasTotal = document.getElementById("totalTareas");
const realizeTotal = document.getElementById("tareasRe");
const i1 = document.createElement("i")
realizeTotal.innerHTML = "Tareas completas:";
const i = document.createElement("i")
tareasTotal.innerHTML = "Total Tareas:";
i.textContent = 0;
i1.textContent = 0;
tareasTotal.appendChild(i);   
realizeTotal.appendChild(i1); 


btnEnviar.onclick = () =>{
    const tarea = inputTareas.value;

    if(!tarea){
        return;
    }
    tareas.push({
        tarea: tarea,
        terminada: false
        
    }
    );
    inputTareas.value = "";


    guardarTarea();
    actualizarLista();

};

const obtenerTareas = () =>{
    const posibleLista = JSON.parse(localStorage.getItem(guardarLista));
    if(posibleLista){
        return posibleLista
    }else{
        return [];
    }
}

const guardarTarea = () =>{
    localStorage.setItem(guardarLista, JSON.stringify(tareas));

}

const actualizarLista = () =>{
    listaTareas.innerHTML = "";
    listaIds.innerHTML = "";
    let contandorTareas = 0;
    let contandorTareasComple = 0;
    let contenedor = 1;
    
    for (const [indice, tarea] of tareas.entries()){
        const eliminar = document.createElement ("a");
        eliminar.innerHTML = "X";
        eliminar.classList.add("eliminar")
        eliminar.href = "";
        eliminar.onclick = (e) => {
            e.preventDefault()
            if(!confirm("Quiere eliminar la tarea?")){
               
                return;
            }
           
            tareas.splice(indice, 1);
            contenedor = contenedor - 1;
            contandorTareas = contandorTareas - 1;
       
            i.textContent = contandorTareas;
          

            guardarTarea();
            actualizarLista();
        }
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
    
        checkbox.onchange = function (){
            if(this.checked){
                tareas[indice].terminada = true;
                
            }else{
                tareas[indice].terminada = false;
            }
            guardarTarea();
            actualizarLista();
        }
        const span = document.createElement("span");
        span.textContent = tarea.tarea;
        const span1 = document.createElement("span");
       
       
        contandorTareas = contandorTareas + 1;  
        i.textContent = contandorTareas;
      
        span1.textContent = contenedor;
        span.classList.add("tareas_lista")
        span1.classList.add("tareas_lista") 
        contenedor = contenedor + 1;
        const li = document.createElement("li");
        if(tarea.terminada){
            checkbox.checked = true;
            span.classList.add("incompleta");
            contandorTareasComple = contandorTareasComple + 1;
        }
     

        i1.textContent = contandorTareasComple;
        const li1 = document.createElement("li");
       
        tareasTotal.appendChild(i);   
        realizeTotal.appendChild(i1); 
        li.appendChild(span);
        li.appendChild(eliminar);
        li.appendChild(checkbox);
        listaTareas.appendChild(li);
        li1.appendChild(span1);
        listaIds.appendChild(li1);
       
    }


}

tareas = obtenerTareas()

actualizarLista();

});

