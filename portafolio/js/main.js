//inicializamos Muuri y ponemos la clase q esta en html y le pasamos un obejto
const grid = new Muuri('.grid', { 
      layout: {
        rounding: false
    }
});

//agregamos los listener de los enlaces para filtrar por categoria
window.addEventListener('load', () => {//cuando la ventana cargue
    grid.refreshItems().layout();//calcula el tamaño de cada uno de los elementos y refresca los elementos
    document.getElementById('grid').classList.add('imagenes-cargadas');//mostramos las img
    
    const enlaces = document.querySelectorAll('#categorias a');//lotenomos en una alista y iteramos con el for ech
    enlaces.forEach( (elemento) => {//por cada uno de los enlaces ejecuta el cdigo de aki
        elemento.addEventListener('click', (evento) => {
            evento.preventDefault();
            enlaces.forEach((enlace) => enlace.classList.remove('activo'));//eliminamos clase
            evento.target.classList.add('activo')//agregamos clase

            const categoria = evento.target.innerHTML.toLowerCase();  
            //aremos un condicional if pero q es terrenario, ":"  de otra forma ejecuta otro codigo                           
            categoria === 'todos' ? grid.filter('[data-categoria]') : grid.filter(`[data-categoria="${categoria}"]`);   //trae elementos que nosotros queremos
        });            
    });

    
    //agregamos los listener para la barra de busqueda

    document.querySelector('#barra-busqueda').addEventListener('input', (evento) => {// input: xcada ves q escriba algo ejecute la function
        const busqueda = evento.target.value;        
        grid.filter( (item) => item.getElement().dataset.etiquetas.includes(busqueda) );
    });


    //agregamos los listener para las img    
    const overlay = document.getElementById('overlay');
    //accedemos a todas las img q esta dentro de la clase item y grid
    document.querySelectorAll('.grid .item img').forEach((elemento) => {//por cada elemento quiero obtener la ruta de el 
     
      elemento.addEventListener('click', () => {//cuando demos el un click se ejecuta el overlay, agregamos una clase
            const ruta = elemento.getAttribute('src');//accedemos a la ruta de las img
            const descripcion = elemento.parentNode.parentNode.dataset.descripcion;//accedemos a la descripcion
            
            overlay.classList.add('activo');
            document.querySelector('#overlay img').src = ruta; //ruta dede los elemntos q nosotros cliquiemos
            document.querySelector('#overlay .descripcion').innerHTML = descripcion; 
      });
    });

    //Evento del boton de cerrar
    document.querySelector('#btn-cerrar-popup').addEventListener('click', () => {
        overlay.classList.remove('activo');
    });


    //evento del Overley, si se toca la parte de la pantalla que nosea en la x se cierra la img
    overlay.addEventListener('click', (evento) => {
        evento.target.id === 'overlay' ? overlay.classList.remove('activo') : ''; 
    });
});         

