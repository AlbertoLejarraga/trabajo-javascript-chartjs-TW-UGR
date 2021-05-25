function validarDatos(){
	let form = document.forms["formPrueba"];
	if (form["nombre"].value.length < 5 ){
	    alert("Nombre incorrecto");
    }else if (! form["dni"].value.match(/[0-9]{8}[A-Z]/)){
	    alert("DNI incorrecto");
    }else{
	    if (confirm("Vas a enviar '" + form["nombre"].value + "' como nombre y '" + form["dni"].value + "' como DNI. ¿Estás seguro?" )){
	        return true;
        }
    }
	return false;
}
function bordearForm(){
    if(document.querySelector("#botonBordear").dataset.border === "off"){
        document.getElementById("formAddUser").style.border = '1em solid red';
        document.querySelector('#botonBordear').dataset.border = "on";
    }else{
        document.getElementById("formAddUser").style.border = 'none';
        document.querySelector('#botonBordear').dataset.border = "off";
    }
}
function escribirDatosForm(){
    let formAHTML = "<p>Nombre: " + document.forms["formPrueba"]["nombre"].value + "</p><p>DNI: " + document.forms["formPrueba"]["dni"].value + "</p>";
    document.getElementById("divTexto").innerHTML = formAHTML;
}