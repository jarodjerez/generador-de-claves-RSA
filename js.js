//variables globales
let inputP = document.getElementById('p')
inputP.value = "0"
let inputQ = document.getElementById('q')
inputQ.value = "0"
let inputE = document.getElementById('e')
const btnCalcular = document.getElementById("btnCalcular")
btnCalcular.disabled = false
const btnComprobarMDC = document.getElementById('btnComprobarMDC')
let igualdadP = document.getElementById('igauldadP')
let igualdadQ = document.getElementById('igualdadQ')
let igualdadN = document.getElementById('igualdadN')
let igualdadE = document.getElementById('igualdadE')
let igualdadD = document.getElementById('igualdadD')
let igualdadPhiN = document.getElementById('igualdadPhiN')

let startTable = true

//Ingreso de datos
function mostrarDatos(){
    igualdadP.textContent = parseInt(inputP.value)

    igualdadQ.textContent = parseInt(inputQ.value)

    igualdadN.textContent = calculoDeN(parseInt(inputP.value),parseInt(inputQ.value))

    igualdadPhiN.textContent = calculoDeN(parseInt(inputP.value)-1,parseInt(inputQ.value)-1)

    inputE.disabled = false
    inputE.max = calculoDeN(parseInt(inputP.value)-1,parseInt(inputQ.value)-1)
    if (inputE) {
        var etiqueta = document.querySelector('#etiqueta');
        if (etiqueta) {
          etiqueta.innerHTML = inputE.value;
      
          inputE.addEventListener('input', function() {
            etiqueta.innerHTML = inputE.value;
          }, false);
        }
      }
    btnComprobarMDC.disabled=false
}
function ComprobarMDC(){
    if(MCD(calculoDeN(parseInt(inputP.value)-1,parseInt(inputQ.value)-1), inputE.value)){
        igualdadE.textContent = inputE.value
        let G0 = document.getElementById('G0')
        let G1 = document.getElementById('G1')
        G0.textContent = calculoDeN(parseInt(inputP.value)-1,parseInt(inputQ.value)-1)
        G1.textContent = inputE.value

        if(startTable){
            generarTabla()
            startTable = false
            btnComprobarMDC.textContent = "Reset"
            inputE.disabled = true
            btnCalcular.disabled = true
        }else{
            let table = document.getElementById('tableBody')
            table.innerHTML = `<tr>
                                    <td scope="row" id="i0">0</td>
                                    <td id="Y0">-</td>
                                    <td id="G0"></td>
                                    <td id="U0">1</td>
                                    <td id="V0">0</td>
                                </tr>
                                <tr>
                                    <td scope="row" id="i1">1</td>
                                    <td id="Y1">-</td>
                                    <td id="G1"></td>
                                    <td id="U1">0</td>
                                    <td id="V1">1</td>
                                </tr>`
            startTable = true
            btnCalcular.disabled = false
            btnComprobarMDC.textContent = "Generar tabla"
        }
    }else{
        const toastLiveExample = document.getElementById('liveToast')
        const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
        toastBootstrap.show()
    }
}
function generarTabla(){
    let i =2
    let Y, G = document.getElementById('G1'), U, V
    while (parseInt(G.textContent) != 0) {
        /* Creando tabla */
        let table = document.getElementById('tableBody')
        table.innerHTML =
        table.innerHTML+`<tr>
                            <td scope="row" id="i${i}">${i}</td>
                            <td id="Y${i}"></td>
                            <td id="G${i}"></td>
                            <td id="U${i}"></td>
                            <td id="V${i}"></td>
                        </tr>`
        let aux1, aux2  
        Y = document.getElementById(`Y${i}`)
        G = document.getElementById(`G${i}`)
        U = document.getElementById(`U${i}`)
        V = document.getElementById(`V${i}`)
        aux1 = document.getElementById(`G${i-2}`)
        aux2 = document.getElementById(`G${i-1}`)
        /* Operacion para contrar Yi */
        Y.textContent = parseInt(aux1.textContent/aux2.textContent)
        /* Operacion para encontrar Gi */
        G.textContent = aux1.textContent-(Y.textContent*aux2.textContent)
        /* Operacion para encontar Ui */
        aux1 = document.getElementById(`U${i-2}`)
        aux2 = document.getElementById(`U${i-1}`)
        U.textContent = aux1.textContent-(Y.textContent*aux2.textContent)
        /* Operacion para encontrar Vi */
        aux1 = document.getElementById(`V${i-2}`)
        aux2 = document.getElementById(`V${i-1}`)
        V.textContent = aux1.textContent-(Y.textContent*aux2.textContent)
        i++
    }
    V = document.getElementById(`V${i-2}`)
    console.log(V)
    if(parseInt(V.textContent)<0){
        igualdadD.textContent = parseInt(V.textContent) + parseInt(igualdadE.textContent) 
    }else{
        igualdadD.textContent = parseInt(V.textContent)
    }
}
function calculoDeN(p,q){
    return p*q
}
//Calculo de Maximo Comun Divisor (MCD)
function MCD(n1, n2){ 
    var mcd, resto;     
    while (n1 != 0 && n2 != 0){    
        resto = n1%n2;    
        n1 = n2;     
        n2 = resto;    
    }     
    if(n1==0) mcd = n2;      
    if(n2==0) mcd = n1;
    return mcd != 1 ? false : true  
    //return mcd       
}     