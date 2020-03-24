const GoogleMaps = function(el, coords) {
    const gm = window.google && window.google.maps;

    if (!gm) return;

    const map = new gm.Map(el);
    const bounds = new gm.LatLngBounds();
    const infoWindow = new gm.InfoWindow();

    for (let coord in coords) {
        placeMarker(coords[coord]);
    }

    map.fitBounds(bounds);

    const idleListener = gm.event.addListener(map, 'idle', function() {
        if (map.getZoom() > 14) map.setZoom(14);
        gm.event.removeListener(idleListener);
    });


    if (infoWindow) {
        gm.event.addListener(map, 'click', function() {
            infoWindow.close();
        });
    }


    function placeMarker(loc) {
        const marker = new gm.Marker({
            map: map,
            position: {
                lat: Number(loc.LATITUD.substring(0, 10)),
                lng: Number(loc.LONGITUD.substring(0, 10)),
            },
        });


        if (infoWindow) {
            gm.event.addListener(marker, 'click', function() {
                infoWindow.close();
                infoWindow.setContent(infoWindowTemplate(loc));
                infoWindow.open(map, marker);
            });
        }

        bounds.extend(marker.position);
    }


    function infoWindowTemplate(data) {
        const IDENTIDAD = data.IDENTIDAD;
        const NOMBRE = data.NOMBRE;
        const TRANSPORTE = data.TRANSPORTE;
        const ACCESIBILIDAD = data.ACCESIBILIDAD;
        const URL = data.URL;
        const NOMBREVIA = data.NOMBREVIA;
        const CLASEVIAL = data.CLASEVIAL;
        const TIPONUM = data.TIPONUM;
        const NUM = data.NUM;
        const PLANTA = data.PLANTA;
        const LOCALIDAD = data.LOCALIDAD;
        const PROVINCIA = data.PROVINCIA;
        const CODIGOPOSTAL = data.CODIGOPOSTAL;
        const BARRIO = data.BARRIO;
        const DISTRITO = data.DISTRITO;
        const COORDENADAX = data.DISTRITO;
        const COORDENADAY = data.COORDENADAY;
        const LATITUD = data.LATITUD;
        const LONGITUD = data.LONGITUD;
        const TELEFONO = data.TELEFONO;
        const FAX = data.FAX;
        const EMAIL = data.EMAIL;
        var oneDirection = "";

        if(CLASEVIAL.length > 0) {
          oneDirection += CLASEVIAL + ", ";
        }

        if(NOMBREVIA.length > 0) {
          oneDirection += NOMBREVIA + ", ";
        }

        if(NUM.length > 0) {
          oneDirection += NUM + ", ";
        }

        if(PLANTA.length > 0) {
          oneDirection += PLANTA + ", ";
        }

        if(LOCALIDAD.length > 0) {
          oneDirection += LOCALIDAD + ", ";
        }

        if(PROVINCIA.length > 0) {
          oneDirection += PROVINCIA + ", ";
        }

        if(CODIGOPOSTAL.length > 0) {
          oneDirection += CODIGOPOSTAL + ", ";
        }

        if(BARRIO.length > 0) {
          oneDirection += BARRIO + ", ";
        }

        if(DISTRITO.length > 0) {
          oneDirection += DISTRITO + ".";
        }

        if(NOMBRE.length > 0) {
          $("#element-name").html("<strong>Nombre: </strong><span>" + NOMBRE + "</span>");
        } else {
          $("#element-name").html("<strong>Nombre: </strong><span>No disponible</span>");
        }
        if(URL.length > 0) {
          $("#element-url").html("<strong>Pagina web: </strong><a href='" + URL + "'>" + URL + "</a>");
        } else {
          $("#element-url").html("<strong>Pagina web: </strong><span>No disponible</span>");
        }
        if(IDENTIDAD.length > 0) {
          $("#element-id").html("<strong>Id (para documentos): </strong><span>" + IDENTIDAD + "</span>");
        } else {
          $("#element-id").html("<strong>Id: </strong><span>No disponible</span>");
        }
        if(TRANSPORTE.length > 0) {
          $("#element-transporte").html("<strong>Transporte: </strong><span>" + TRANSPORTE + "</span>");
        } else {
          $("#element-transporte").html("<strong>Transporte: </strong><span>No disponible</span>");
        }
        if(ACCESIBILIDAD.length > 0) {
          $("#element-accesibilidad").html("<strong>Accesibilidad (nivel): </strong><span>" + ACCESIBILIDAD + "</span>");
        } else {
          $("#element-accesibilidad").html("<strong>Accesibilidad: </strong><span>No disponible</span>");
        }
        if(oneDirection.length > 0) {
          $("#element-direccion").html("<strong>Direccion: </strong><span>" + oneDirection + "</span>");
        } else {
          $("#element-direccion").html("<strong>Direccion: </strong><span>No disponible</span>");
        }
        if(TELEFONO.length > 0) {
          $("#element-telefono").html("<strong>Telefono: </strong><span>" + TELEFONO + "</span>");
        } else {
          $("#element-telefono").html("<strong>Telefono: </strong><span>No disponible</span>");
        }
        if(FAX.length > 0) {
          $("#element-fax").html("<strong>FAX: </strong><span>" + FAX + "</span>");
        } else {
          $("#element-fax").html("<strong>FAX: </strong><span>No disponible</span>");
        }
        if(EMAIL.length > 0) {
          $("#element-email").html("<strong>Email: </strong><span>" + EMAIL + "</span>");
        } else {
          $("#element-email").html("<strong>Email: </strong><span>No disponible</span>");
        }

        const content = URL
                    ? '<a href="'+ URL +'">' + NOMBRE + '</a>'
                    : NOMBRE;

        return '<div class="google-map-infowindow-content">' + content + '</div>';
    }
};


window.googleMapInit = function() {
  populate();
};
