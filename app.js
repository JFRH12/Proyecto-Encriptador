//-------Selección de Elementos-------//
const btnEncriptar = document.querySelector(".btn__encriptar");
const txtEncriptar = document.querySelector(".encriptar");
const aviso = document.querySelector(".texto__alert");
const respuesta = document.querySelector(".evaluar");
const contenido = document.querySelector(".tarjeta__contenedor");
const btnCopiar = document.querySelector(".btn__copiar");
const btnDesencriptar = document.querySelector(".btn__desencriptar");

//-------Mapas de Encriptación y Desencriptación-------//
const encriptacion = {
    "e": "enter",
    "i": "imes",
    "a": "ai",
    "o": "ober",
    "u": "ufat"
};

const desencriptacion = Object.fromEntries(
    Object.entries(encriptacion).map(([key, value]) => [value, key])
);

//-------Función para Mostrar Avisos-------//
function mostrarAviso(mensaje) {
    aviso.style.background = "#0A3871";
    aviso.style.color = "#FFFF";
    aviso.style.fontWeight = "800";
    aviso.textContent = mensaje;
    
    setTimeout(() => {
        aviso.removeAttribute("style");
    }, 1500);
}

//-------Función para Validar Texto-------//
function validarTexto(texto) {
    const txt = texto.normalize("NFD").replace(/[$\.¿\?~!\¡@#%^&*()_|}\{[\]>\<:"`;,\u0300-\u036f']/g, "");
    
    if (texto === "") {
        mostrarAviso("El campo de texto no debe estar vacio");
        return false;
    } else if (texto !== txt) {
        mostrarAviso("No debe tener acentos ni caracteres especiales");
        return false;
    } else if (texto !== texto.toLowerCase()) {
        mostrarAviso("El texto debe ser todo en minúscula");
        return false;
    }
    return true;
}

//-------Función de Encriptación-------//
function encriptarTexto(texto) {
    return texto.replace(/[eioua]/g, match => encriptacion[match]);
}

//-------Función de Desencriptación-------//
function desencriptarTexto(texto) {
    return texto.replace(/enter|imes|ai|ober|ufat/g, match => desencriptacion[match]);
}

//-------Boton de Encriptar-------//
btnEncriptar.addEventListener("click", e => {
    e.preventDefault();
    let texto = txtEncriptar.value;
    
    if (validarTexto(texto)) {
        texto = encriptarTexto(texto);
        respuesta.innerHTML = texto;
        btnCopiar.style.visibility = "inherit";
        contenido.remove();
    }
});

//-------Boton de Desencriptar-------//
btnDesencriptar.addEventListener("click", e => {
    e.preventDefault();
    let texto = txtEncriptar.value;
    
    if (validarTexto(texto)) {
        texto = desencriptarTexto(texto);
        respuesta.innerHTML = texto;
        btnCopiar.style.visibility = "inherit";
        contenido.remove();
    }
});

//-------Boton de Copiar-------//
btnCopiar.addEventListener("click", e => {
    e.preventDefault();
    navigator.clipboard.writeText(respuesta.textContent)
        .then(() => {
            mostrarAviso("Texto copiado al portapapeles");
        })
        .catch(err => {
            mostrarAviso("Error al copiar el texto");
        });
});
