// PARALLAX
  window.onscroll = function() {
	 var speed = 32.0;
	 document.body.style.backgroundPosition = (-window.pageXOffset / speed) + "px " + (-window.pageYOffset / speed) + "px";
};

////--------------------------------------
//--------------------------------------
//  DOM <-> object
//--------------------------------------
//--------------------------------------
function forEachChild(elem,fn){
    if (elem.hasChildNodes()) {
        var child = elem.firstChild;
        while (child) {
            if (child.nodeType === 1 && child.nodeName !== 'SCRIPT') {
                fn(child);
            }
            child = child.nextSibling;
        }
    }
}

//----------- DOM -> object
// CADA UL/OL crea una "identacion" (un objeto de tiop array)
// dentro del array, se procesa en forma recursiva cada LI
// cada Li crea un objeto item del array
// para los checkbox, se crea un nuevo array con nombre segun "name"
// y dentro del array se ponen los "value" de los controles checkeados (checked=true)
//
// por ej:
//    <input type=checkbox name=deseaRecibir value=novedades> Novedades
//    <input type=checkbox name=deseaRecibir value=alertas> Alertas
//  -->
//    {deseaRecibir:["novedades","alertas"]}
//
//-----------------------------
function elemToObj(elem){
    var obj={};
    elemAsFieldOf(elem,obj);
    return obj;
}

function elemAsFieldOf(elem,obj) {

    var name = elem.getAttribute('name') || elem.id;

    // is simple?
    if (name) {
        switch (elem.tagName) {
            case "SELECT":
                obj[name]=elem.selectedIndex;
                return;

            case "TEXTAREA":
                obj[name]=elem.value;
                return;

                //break;
            case "INPUT":
                switch (elem.getAttribute("type")) {
                    case "checkbox":
                        if ( ! obj[name]) obj[name]=[]; //si no existe el array para los checkboxes
                        if (elem.checked) obj[name].push(elem.value||"on");
                        return;

                    case "radio" :;
                        if (elem.checked) obj[name] = elem.value||"on";
                        return;

                    default:
                        if (obj[name]) alert("field duplicated name: " + name);
                        if (!elem.value||elem.value==="null") { obj[name]=null }
                        else if (elem.getAttribute("placeholder")==="!string") { obj[name]=parseInt(elem.value) } //placeholder=0 => hidden numerico
                        else { obj[name]=elem.value; }
                        return;

                    }
                 // end switch (elem.getAttribute("type")) {
             // end case "INPUT":
         // end switch (elem.tagName) {
        }
    }

//	if (elem.tagName==="FORM" || elem.tagName==="FIELDSET" || elem.tagName==="LABEL" || (elem.hasChildNodes() && $(elem).hasClass("data"))) { // is complex & is data

    if (elem.hasChildNodes()) { // is complex

        var objForChildren;
        if (elem.id && elem.tagName === "FIELDSET") { //if has id & valid for indent
            objForChildren = obj[elem.id] = {}; //new indent, a object
        }
        else if (elem.id &&  ( ["UL","OL"].indexOf(elem.tagName)>=0)) { //if has id & valid for indent
            objForChildren = obj[elem.id] = []; //new indent, an array
        }
        else {
            objForChildren=obj; //same indent
        }

        var child = elem.firstChild;
        while (child) {
            if (child.nodeType === 1 ) {
                if (child.tagName==="LI" && Array.isArray(objForChildren)) { //a list item inside UL/OL
                    var newObj={}; //new obj
                    elemAsFieldOf(child,newObj); //recurse DOM
                    if (Object.keys(newObj).length) objForChildren.push(newObj); //add as new list item
                }
                else elemAsFieldOf(child,objForChildren); //recurse DOM
            }
            child = child.nextSibling;
        }

    } //end if
} //end function


//-- --------- object -> DOM
function objToForm(obj, elem) {
    //elimino los extra que se hubieran agregado con otros datos
    $(elem).find(".agregado").remove();
    $(elem).find("[type=checkbox]").attr("checked",false); // limpio checkboxes
    objToElem(obj, elem);
} //end function


function objToElem(obj, elem) {
    if (Object.prototype.toString.call(obj) === '[object Array]') {  //si el valor es un array
        if (elem.tagName === "INPUT" && elem.getAttribute("type") === "checkbox") {
            $.each(obj,function(inx,value){
                if (value===elem.value) $(elem).attr('checked',true);
            });
        }
        else {
            if (!  ( ['UL','OL'].indexOf(elem.tagName)>=0) ) throw new Error('valueToElem: value is array so elem must be UL/OL');
            var lastUsed=elem.firstElementChild;
            var nextChild = lastUsed;
            //for each item in obj //para cada valor del array
            for(var index=0; index<obj.length; index++){
                var item=obj[index];
                 if (! nextChild) { //agrego un control si falta
                    nextChild =$(lastUsed).clone();// clono
                    nextChild.addClass("agregado"); //marco
                    $(elem).append(nextChild);
                    nextChild.find(":text").val(""); // limpio txts
                    nextChild.find("[type=checkbox]").attr("checked",false); // limpio checkboxes
                    nextChild = nextChild[0]; // lo convierto a Elem
                 }

                 objToElem(item, nextChild); // recursive

                 lastUsed = nextChild;
                 nextChild = lastUsed.nextElementSibling; //proximo hijo de nivel 0
            }
        } //end for
    }// end if obj is Array  //si el valor es un array

    else if (obj && typeof obj === "object") { //si es un object y no es "null"
        // elem debe ser un div o form
        if (! (elem.id || elem.tagName === "LI") || ! elem.hasChildNodes()) {
            return alert('valueToElem: value is object, so elem must have id & ChildNodes');
        }
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                $ctrl = $('#' + key, elem);  //ubico el control, por id
                if ($ctrl.length === 0 )  $ctrl = $('[name=' + key + ']', elem);  //ubico el control, por nombre
                if ($ctrl.length ===  0) {  // no existe
                    //alert ('objToElem: "'+key+'" not found on DOM');
                    $ctrl = '<input type=hidden id="'+key+'"';
                    if (typeof obj[key] !== "string") $ctrl += ' placeholder="!string"';
                    $ctrl += ' value="'+obj[key]+'">';
                    $(elem).append($ctrl);
                }
                else {
                    objToElem(obj[key], $ctrl[0]); // recursive
                } //end if
            } //end if
        } //end for
    }// end else if (typeof obj is "object") { //si es un object

    else {  // es un valor simple
        { //case elem.tagName

            if ( elem.tagName==="SELECT") {
                elem.selectedIndex = obj||0;
            }

            else if ( elem.tagName==="TEXTAREA") {
                elem.value = obj;
            }

            else if ( elem.tagName==="INPUT") {
                //case elem.getAttribute("type")
                { var $value= elem.getAttribute("type");
                    if ( $value==="radio" || $value==="checkbox") {
                        $ctrl = $('[name=' + elem.getAttribute("name") + ']', frm);  //todos los del mismo nombre
                        $ctrl.each(function() {
                            this.checked = (this.getAttribute('value') == obj);
                        });
                    }

                    else {
                        elem.value = obj;
                    }
                } //end case
            }// end when "INPUT"
        } //end case
    } //end if
} //end function


function getNearList(elem) {
    var parent=elem;
    while (parent) {
        var list=parent.getElementsByTagName("UL");  //UL's
        if (list.length === 0 ) list=parent.getElementsByTagName("OL"); // si no hay, OL's
        if (list.length > 0 ) return list[0]; //si hay alguno, retorno
        parent = parent.parentElement; //subo
    } //end while
} //end function

function getNearElemByTag(tag,elem) {
    var parent=elem;
    while (parent) {
        var list=parent.getElementsByTagName(tag);
        if (list.length > 0 ) return list[0]; //si hay alguno, retorno
        parent = parent.parentElement; //subo
    } //end while
} //end function

function getNearElemByClassName(className,elem) {
    return $(elem).closest("."+className).get(0);
} //end function
