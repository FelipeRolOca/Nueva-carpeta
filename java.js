
var peticion = new XMLHttpRequest();
peticion.open("GET", "http://127.0.0.1:5500/productos.json", true);
var total = 0;

peticion.addEventListener("readystatechange", function () {
    if (this.readyState == 4 && this.status == 200) {
        var productos = JSON.parse(this.responseText);
        var total = 0
       
        productos.forEach(p => {
            var div = document.querySelector ('.productos')
            var casillas = document.createElement ('div')
            div.appendChild (casillas) ;
            var link = document.createElement('a');
            link.setAttribute('href', '#');
            link.innerText = p.nombre;
            var imagen = document.createElement ('img');
            imagen.setAttribute ('alt', "imagen del producto");
            imagen.setAttribute ('src', p.url_foto);
            var description = document.createElement ('p');
            description.innerText = p.descripcion;
            var precio = document.createElement ('p');
            precio.innerText = p.precio;
            casillas.appendChild (link)
            casillas.appendChild (imagen)
            casillas.appendChild (description)
            casillas.appendChild (precio)
            link.addEventListener ('click', function () {
                var contador = 0;
                contador = contador + 1;
                var lugardelcontador = document.querySelector ("#contador");
                lugardelcontador.innerText = contador;
            })

           
            link.addEventListener('click', function () {
                console.log(p.nombre, p.precio);
                 total = total + p.precio;
                console.log("total: ", total);
                var preciofinal = document.querySelector("#total");
                preciofinal.innerText = total;
                

                
                var fila = document.createElement('tr');
                var tdNombre = document.createElement('td');
                tdNombre.innerText = p.nombre;
                var tdPrecio = document.createElement('td');
                tdPrecio.innerText = p.precio;
                fila.appendChild(tdNombre);
                fila.appendChild(tdPrecio);

                var tdBorrar = document.createElement('td');
                var linkBorrar = document.createElement('a');
                linkBorrar.setAttribute('href', '#');
                linkBorrar.innerText = 'X';
                tdBorrar.appendChild(linkBorrar);
                fila.appendChild(tdBorrar);

            

                
                linkBorrar.addEventListener('click', function (event) {
                    console.log(event.target.parentElement.parentElement.remove());
                    total = total - p.precio;
                    console.log("total: ", total);
                  
                    
                });
                var precioalto = -9 ;
                if (p.precio > precioalto) {
                    precioalto = p.precio                   
                }
                console.log (precioalto)

                document.querySelector('tbody').appendChild(fila);
            })
        });
    }
});

peticion.send();