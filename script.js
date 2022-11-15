
var peticion = new XMLHttpRequest();
peticion.open("GET", "http://127.0.0.1:5500/productos.json", true);
var total = 0;
var contador = 0;
var preciomasalto = -9 ;

peticion.addEventListener("readystatechange", function () {
    if (this.readyState == 4 && this.status == 200) {
        var productos = JSON.parse(this.responseText);

        productos.forEach(p => {
            var div = document.querySelector ('.productos');
            var casillas = document.createElement ('div');
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
            casillas.appendChild (link);
            casillas.appendChild (imagen);
            casillas.appendChild (description);
            casillas.appendChild (precio);

            
            link.addEventListener('click', function (event) {
                event.preventDefault ();
                console.log(p.nombre, p.precio);
                 total = total + p.precio;
                console.log("total: ", total);
                var preciofinal = document.querySelector("#total");
                preciofinal.innerText = total;
                contador = contador + 1;
                var lugardelcontador = document.querySelector ("#contador");
                lugardelcontador.innerText = contador;
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
                    event.preventDefault ();
                    console.log(event.target.parentElement.parentElement.remove());
                    total = total - p.precio;
                    preciofinal.innerText = total;
                    console.log("total: ", total);
                    contador = contador - 1;
                    lugardelcontador.innerText = contador;
                });
                
                if (p.precio > preciomasalto) {
                    preciomasalto = p.precio
                    console.log (preciomasalto)
                    var nombremascaro = p.nombre 
                    console.log (nombremascaro)
                }
                var productomascaro = document.querySelector ("#preciomasalto");
                productomascaro.innerText = "el producto mas caro es";
                var lugar = document.querySelector ("#lugar") ;

                productomascaro.addEventListener('click', function (event) {
                    var crear = document.createElement ('p');
                    crear.innerText = nombremascaro + preciomasalto;
                    lugar.appendChild(crear);                   
                });

            
                document.querySelector('tbody').appendChild(fila);
            })
        });
    }
});

peticion.send();