
var peticion = new XMLHttpRequest();
peticion.open("GET", "http://127.0.0.1:5500/productos.json", true);
var total = 0;

peticion.addEventListener("readystatechange", function () {
    if (this.readyState == 4 && this.status == 200) {
        var productos = JSON.parse(this.responseText);
       
        productos.forEach(p => {
            
            var link = document.createElement('a');
            link.setAttribute('href', '#');
            link.innerText = p.nombre;

           
            link.addEventListener('click', function () {
                console.log(p.nombre, p.precio);
                total = total + p.precio;
                console.log("total: ", total);

                
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

                document.querySelector('tbody').appendChild(fila);
            })

            document.querySelector('.productos').appendChild(link);
        });
    }
});

peticion.send();