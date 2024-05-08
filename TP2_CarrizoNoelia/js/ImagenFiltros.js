
// para el uso de distintos filtros
const ImageFilters = {
    grayScale  : function(inputImage, outputImage, intensity) {
        return imageFilterApplicator.aplyFilter(inputImage, outputImage, filters.grayScaleFilter, intensity);
    },
    saturation : function(inputImage, outputImage, intensity) {
        return imageFilterApplicator.aplyFilter(inputImage, outputImage, filters.saturationFilter, intensity);
    },
    blur : function(inputImage, outputImage, intensity) {
        return imageFilterApplicator.aplyFilter(inputImage, outputImage, filters.blurFilter, intensity);
    },
    // invierte la imagen a su estado anterior
    invertImage: function(inputImage, outputImage, intensity) {
        return imageFilterApplicator.aplyFilter(inputImage, outputImage, filters.invertImageFilter, intensity);
    },
    // le invierte los colores a la imagen
    invertColor: function(inputImage, outputImage, intensity) {
        return imageFilterApplicator.aplyFilter(inputImage, outputImage, filters.invertColorImageFilter, intensity);
    },
    sobel: function(inputImage, outputImage, intensity) {
        imageFilterApplicator.aplyFilter(inputImage, inputImage, filters.grayScaleFilter, 100);
        return imageFilterApplicator.aplyFilter(inputImage, outputImage, filters.sobelFilter, intensity);
    },
    // aplica la binarizacion a la imagen
    binarization: function(inputImage, outputImage, intensity) {
        imageFilterApplicator.aplyFilter(inputImage, inputImage, filters.grayScaleFilter, 100);
        return imageFilterApplicator.aplyFilter(inputImage, outputImage, filters.binarizationFilter, intensity);
    },
}

// Este objeto tiene la función de aplicar los filtros
const imageFilterApplicator = {

    // funcion ppal que trata la imagen y le aplica el filtro
    aplyFilter: function(inputImage, outputImage, imageFilter, intensity = 0) {

        intensity = (intensity > 100) ? 100 : intensity;
        intensity = (intensity <   0) ?   0 : intensity;
        intensity = this.calulateIntensity(imageFilter, intensity);

        // para trabajar con RGB
        let r, g, b; 
        for (let y = 0; y < inputImage.height; y++) {
            for (let x = 0; x < inputImage.width; x++) {
                [r, g, b] = imageFilter.filter(inputImage, x, y, intensity);
                this.setPixel(outputImage, x, y, r, g, b);
            }          
        }
        return outputImage;
    },
    
    // le setea a cada pixel el conversion del filtro
    setPixel: function(imagenData, x, y, r, g, b, a = 255) {
        let index = (x + y * imagenData.width) * 4;
        imagenData.data[index + 0] = r;
        imagenData.data[index + 1] = g;
        imagenData.data[index + 2] = b;
        imagenData.data[index + 3] = a;
    },

    // calcula la intesidad si es mayor a 0 se aplica el filtro sino no
    calulateIntensity(filter, intensity) {
        intensity = ((intensity/100) * filter.maxIntensity ?? 0) + filter.minIntensity ?? 0; 
        return intensity;
    }
}

// El objeto "filters" tiene la función de guardar los filtros
const filters = {
    // filtros simples por ejemplo: negativo, brillo, binarización y sepia.
    // Invert Image Filter
    invertImageFilter: {
        filter: function(imagenData, x, y) {
            x = imagenData.width  - 1 - x;
            y = imagenData.height - 1 - y;
            let index = (x + y * imagenData.width) * 4;
            let r = imagenData.data[index + 0];
            let g = imagenData.data[index + 1];
            let b = imagenData.data[index + 2];
            return [r, g, b];
        }
    },
    /**
     * Se trata del proceso por el que se pasa de una imágen cromática o monocromática a una imagen binaria, mediante la conversión de pixels con un nivel de gris comprendido entre 0 y 255 para imágenes monocromáticas 
     * (entre 0 y 255 para la intensidad de cada uno de los colores básicos en una imagen cromática), en pixels de valores 0 ó 1. 
     * Para ello debe fijarse un criterio de conversión, la llamada regla de binarización, basada en un intervalo crítico de tonos de gris. Cuando nos movamos dentro del intervalo, los valores serán pasados a 1, fuera de éste, serán pasados a 0.
     */
    binarizationFilter: {
        maxIntensity: 255,
        minIntensity: 0,
        filter: function(imagenData, x, y, intensity) {
            let index = (x + y * imagenData.width) * 4;
            // El color negativo es igual la diferencia entre 255 y 
            // el valor de alguna de las variables RGB:
            // let color = imagenData.data[index + RGB];
            // let negativo = 255 - color;
            // Para poder aplicar la intensidad se necesita calcular la diferencia entre
            // el color y su negativo:
            // let diff = color - negativo; 
            // La linea de arriba es equivalente a 255 - color - color
            // Sin embargo, en el código se encuentra escrito: (255 - imagenData.data[index + RGB]*2)
            // Ahora que se calculó la diferencia solo hay que dividirlo por 100, y multiplicarlo por la
            // intensidad
            let r = (imagenData.data[index + 0] > intensity) ? 255 : 0;
            return [r, r, r];
        }
    },

    // 3.2 Inver Color Filter
    invertColorImageFilter: {
        maxIntensity: 100,
        minIntensity: 0,
        filter: function(imagenData, x, y, intensity) {
            let index = (x + y * imagenData.width) * 4;
            // El color negativo es igual la diferencia entre 255 y 
            // el valor de alguna de las variables RGB:
            // let color = imagenData.data[index + RGB];
            // let negativo = 255 - color;
            // Para poder aplicar la intensidad se necesita calcular la diferencia entre
            // el color y su negativo:
            // let diff = color - negativo; 
            // La linea de arriba es equivalente a 255 - color - color
            // Sin embargo, en el código se encuentra escrito: (255 - imagenData.data[index + RGB]*2)
            // Ahora que se calculó la diferencia solo hay que dividirlo por 100, y multiplicarlo por la
            // intensidad
            let r = imagenData.data[index + 0] + ((255 - imagenData.data[index + 0]*2)/100) * intensity ;
            let g = imagenData.data[index + 1] + ((255 - imagenData.data[index + 1]*2)/100) * intensity ;
            let b = imagenData.data[index + 2] + ((255 - imagenData.data[index + 2]*2)/100) * intensity ;
            return [r, g, b];
        }
    },
    
    // 3.3 Gray Sacle Filter
    grayScaleFilter: {
        maxIntensity: 1,
        minIntensity: 0,
        filter: function(imagenData, x, y, intensity = 0) {
            let index = (x + y * imagenData.width) * 4;
            let r = imagenData.data[index + 0];
            let g = imagenData.data[index + 1];
            let b = imagenData.data[index + 2];
            let hsv = util.RGBtoHSV([r, g, b])
            // Se decidió utilizar una implementación de filtro de grises con HSV dado que con este
            // se puede aplicar el filtro con intensidad.
            // La razón de la línea de código de abajo es la siguiente:
            // 1. Si se quiere aplicar el filtro de grises con una intensidad de 0, que la imagen se vea igual
            // hay que multiplicar la variable "s" por 1.
            // 2. Si se quiere aplicar el filtro de grises con una intensidad de 100, que la imagen se vea total mente grisácea
            // hay que multiplicar la variable "s" por 0.
            // Por tanto, la forma más fácil de lograr este efecto es calcular la diferencia entre
            // el máximo de la intensidad, y la intensidad misma.
            // Si recuperamos los ejemplos de arriba obtenemos:
            //    ((máximo de intensidad) - (intensidad)) = valor
            // 1. (           100         -     100     ) = 0
            // 2. (           100         -      0      ) = 100
            hsv[1] *= ( this.maxIntensity - intensity );
            return util.HSVtoRGB(hsv);
        }
    },

    //  Blur Filter: Aplica un desenfoque gaussiano a la imagen de entrada.
    blurFilter: {
        maxIntensity: 10,
        minIntensity: 0,
        filter: function (imagenData, centerX, centerY, blurRadius = 10) {
            // La variable intensidad se renombró como radio de blur. Esta se utiliza para tomar
            // n pixeles hacia arriba y abajo en el eje vertical, y n pixeles hacia la derecha y la izquierda
            // en el eje horizontal, donde n es el valor del radio de blur.
            blurRadius = Math.floor(blurRadius);
            let startX = (centerX - blurRadius <= 0) ? 0 : centerX - blurRadius;
            let startY = (centerY - blurRadius <= 0) ? 0 : centerY - blurRadius;
            let endX   = (centerX + blurRadius >= imagenData.width -1) ? imagenData.width  : centerX + blurRadius;
            let endY   = (centerY + blurRadius >= imagenData.height-1) ? imagenData.height : centerY + blurRadius;
            // Los pixeles afectados para poder calcular el promedio de los colores es igual a un área
            // con forma de cuadrado. Por tanto, para calcular el área del cuadrado es igual a uno de sus lados
            // elevado al cuadrado. Los lados del cuadrado se pueden calcular como el radio del blur por dos, 
            // los n pixeles que se toman hacia la derecha y la izquierda en el eje horizontal, más
            // el mismo pixel sobre el que se está calculando el blur.
            let totalPixelsAffected = (blurRadius * 2 + 1)*(blurRadius * 2 + 1)
            let r = 0;
            let g = 0;
            let b = 0;
            for (let y = startY; y <= endY; y++) {
                for (let x = startX; x <= endX; x++) {
                    let index = (x + y * imagenData.width) * 4;
                    r += imagenData.data[index + 0] / totalPixelsAffected;
                    g += imagenData.data[index + 1] / totalPixelsAffected;
                    b += imagenData.data[index + 2] / totalPixelsAffected;
                }
            }
            return [r, g, b];
        }
    },

    // 4.2 Saturation Filter
    /**
     * Se representa como la distancia al eje de brillo negro-blanco. 
     * Los valores posibles van del 0 al 100%.
     * Cuanto menor sea la saturación de un color, mayor tonalidad grisácea habrá y más decolorado estará. 
     * 
     */
    saturationFilter: {
        maxIntensity: 2,
        minIntensity: 0,
        filter: function(imagenData, x, y, intensity) {
            let index = (x + y * imagenData.width) * 4;
            let r = imagenData.data[index + 0];
            let g = imagenData.data[index + 1];
            let b = imagenData.data[index + 2];
            let hsv = util.RGBtoHSV([r, g, b])
            hsv[1] *= intensity;
            return util.HSVtoRGB(hsv);
        }
    },

    // 4.3 Sobel Filter (Detenccion de bordes) Resalte los bordes de las imágenes utilizando técnicas como los detectores de bordes Sobel o Canny.
    /*
        * Hay varias formas de realizar la detección de bordes. Presentaremos aquí el Operador Sobel.
        * El operador Sobel utiliza dos núcleos (uno para cada dirección) las matrizx y matrizy
        * Calculamos la convolución entre la imagen (convertida en blanco y negro) y los dos núcleos por separado. Eso nos da, para cada píxel, los valores
        * magx y magy El valor del píxel actual se establece en (la raiz magx al cuadrado + magy al cuadrado)
     
        Algoritmo de Sobel se puede resumir en cuatro pasos:

        1 - Convertir la imagen a escala de grises
        2 - Convolucionando la imagen gris con el filtro Sobel-x
        3 - Convolucionando la imagen gris con el filtro Sobel-y
        4 - Calcular la magnitud y dirección del gradiente.
    */
    sobelFilter: {

        maxIntensity: 1000,
        minIntensity: 0,
        filter: function (imagenData, xi, yi, intensity) { 
            // las variables x e y se renombrearon como x sub i e y sub i
            let xr = 0; // red   en eje x
            let xg = 0; // blue  en eje x
            let xb = 0; // green en eje x
            let yr = 0; // red   en eje y
            let yg = 0; // blue  en eje y
            let yb = 0; // green en eje y
        
            // Estos núcleos se utilizan para calcular el gradiente de intensidad de la imagen en las direcciones X e Y, respectivamente.
            let matrixX = [-1,  0,  1,-2, 0, 2, -1,0, 1];
            let matrixY = [-1, -2, -1, 0, 0, 0, 1, 2, 1];

            // Opera convolucionando la imagen con un par de núcleos de convolución de 3x3, uno para detectar bordes en la dirección horizontal (X) y el otro para la dirección vertical (Y).
            let matrixIndex = -1;
            for (let y = - 1; y < 2; y++) {
                for (let x = -1; x < 2; x++) {
                    let index = ((xi + x) + (yi + y) * imagenData.width) * 4;
                    matrixIndex++;
                    if( xi + x >= 0 && xi + x <= imagenData.width  - 1 &&
                        yi + y >= 0 && yi + y <= imagenData.height - 1) {
                        // if( index >= 0 && index <= imagenData.length - 1) {
                        let valueX = matrixX[matrixIndex];
                        let valueY = matrixY[matrixIndex];
                        xr += imagenData.data[index + 0] * valueX;
                        xg += imagenData.data[index + 1] * valueX;
                        xb += imagenData.data[index + 2] * valueX;
                        yr += imagenData.data[index + 0] * valueY;
                        yg += imagenData.data[index + 1] * valueY;
                        yb += imagenData.data[index + 2] * valueY;
                    }
                }
            }
            let r = Math.sqrt(xr*xr + yr*yr);
            let g = Math.sqrt(xg*xg + yg*yg);
            let b = Math.sqrt(xb*xb + yb*yb);
            r = (r <= intensity) ? 0 : 255;
            g = (g <= intensity) ? 0 : 255;
            b = (b <= intensity) ? 0 : 255;
            return [r, g, b];
        }
    }
};

const util = {
    // El código de las dos funciones siguientes se implemento de acuerdo los 
    // pasos de conversion de RGB a HSV, y de HSV a RGB, descritos en wikipedia:
    // https://es.wikipedia.org/wiki/Modelo_de_color_HSV#Transformaci%C3%B3n_RGB_a_HSV

    RGBtoHSV: function(colour) {
        let [r, g, b] = colour;
        let h, s, v;

        r /= 255;
        g /= 255;
        b /= 255;

        let max = Math.max(r, g, b);
        let min = Math.min(r, g, b);
        let delta = max - min;
        
        if( max ===  min  ) {
            h = 0;
        } else if(r === max) {
            if(g >= b ) {
                h = (60 * ((g - b) / delta) + 0) % 360;   
            } else {
                h = (60 * ((g - b) / delta) + 360) % 360; 
            }
        } else if(g === max) {
            h = (60 * ((b - r) / delta) +  120) % 360; 
        } else if(b === max){
            h = (60 * ((r - g) / delta) +  240) % 360;
        }
        h = Math.round( h );

        if(max === 0) {
            s = 0;
        } else {     
            s = Math.floor((delta / max) * 100);       
        }
        v = max * 100;
        
        return [h, s, v];
    },
    

    HSVtoRGB: function(color) {
        let  r,g,b;
        let [h, s, v] = color;
    
        s /= 100;
        v /= 100;

        let hi = Math.floor( h / 60) % 6;
        let f = ( h / 60) % 6 - hi;
        let p = v * ( 1 - s );
        let q = v * ( 1 - s * f );
        let t = v * ( 1 - s * ( 1 - f ) );

        p *= 255;
        q *= 255;
        t *= 255;
        s *= 255;
        v *= 255;

        switch( hi ) {
            case 0:
                r = v;
                g = t;
                b = p;
                break;
            case 1:
                r = q;
                g = v;
                b = p;
                break;
            case 2:
                r = p;
                g = v;
                b = t;
                break;
            case 3:
                r = p;
                g = q;
                b = v;
                break;
            case 4:
                r = t;
                g = p;
                b = v;
                break;
            default:
                r = v;
                g = p;
                b = q;
                break;
        }
        return [r,g,b];
    }

}


// toma el evento de los filtros comunes
document.addEventListener("DOMContentLoaded", ()=> {
    
    // Añadiendo los eventos para activar los filtros
    document.getElementById("inputFilter").addEventListener("submit", (e) => {
    e.preventDefault();
    
    // 1. Seleccionando el formulario HTML que contiene los filtros 
    // Creación de una cpia del canvas
    let inputsFilters = e.target;
    let inputImagen  = context.getImageData(canvas.clientLeft, canvas.clientTop, canvas.width, canvas.height);
    
    // 2.1.0 Seleccionando los inputs tipo rango
    inputsFilters.querySelectorAll("input[type=range]").forEach( input => {
        
        // 2.1.1 El nombre dela función de un filtro particular, se guarda en su respectivo input
        // en un atributo con nombre "data-filter-type" 
        let filter = input.getAttribute("data-filter-type");

        // 2.1.2 Se recupera el valor del rango
        let intensity = input.value ?? 0;

        // 2.1 En caso de que la intensidad, el valor del rango, no sea mayor a 0, no se
        // llaman a los filtros
        if(intensity > 0) {
            // 2.1.3 Se crea una nueva copia del canvas "outputImagen", esto para no editar la misma
            // imagen de la cual se está obteniendo la información para aplicar los filtros
            let outputImagen = context.getImageData(canvas.clientLeft, canvas.clientTop, canvas.width, canvas.height);
            
            // Utiliza la variable "filter" llama a los respectivos métodos dependiendo del filtro que elija pasando las variables correspondientes
            // Se iguala el valor de la variable "inputImagen" al valor de retorno de la función de un filtro, 
            inputImagen = ImageFilters[filter](inputImagen, outputImagen, intensity);
        }
    });
    
    // 2.2.1 Análogo a los pasos previos, pero adaptado a los inputs tipo checkbox
    inputsFilters.querySelectorAll("input[type=checkbox]:checked").forEach( input => {
            let outputImagen = context.getImageData(canvas.clientLeft, canvas.clientTop, canvas.width, canvas.height);
            let filter = input.getAttribute("data-filter-type")
            inputImagen = ImageFilters[filter](inputImagen, outputImagen);
    });

    // 3. Se coloca la imagen editada en el canvas
    context.putImageData(inputImagen, canvas.clientLeft, canvas.clientTop);
});
});


// toma el evento de los filtros avanzados
document.addEventListener("DOMContentLoaded", ()=> {
    
    // Añadiendo los eventos para activar los filtros avanzados
    document.getElementById("inputFilterAvan").addEventListener("submit", (e) => {
    e.preventDefault();
    
    // Seleccionando el formulario HTML que contiene los filtros 
    // Creación de una c0pia del canvas
    let inputsFilters = e.target;
    let inputImagen  = context.getImageData(canvas.clientLeft, canvas.clientTop, canvas.width, canvas.height);
    
    // Seleccionando los inputs tipo rango
    inputsFilters.querySelectorAll("input[type=range]").forEach( input => {
        
        //  El nombre dela función de un filtro particular, se guarda en su respectivo input
        // en un atributo con nombre "data-filter-type" 
        let filter = input.getAttribute("data-filter-type");

        // Se recupera el valor del rango
        let intensity = input.value ?? 0;

        // En caso de que la intensidad no sea mayor a 0, no se llaman a los filtros
        if(intensity > 0) {
            // Se crea una nueva copia del canvas "outputImagen", esto para no editar la misma
            let outputImagen = context.getImageData(canvas.clientLeft, canvas.clientTop, canvas.width, canvas.height);
            
            // Con la variable "filter" llamamos a los filtros con su respectivo método, pasando las variables correspondientes
            // Se iguala el valor de la variable "inputImagen" al valor de retorno de la función de un filtro, 
            inputImagen = ImageFilters[filter](inputImagen, outputImagen, intensity);
        }
    });
    
    //  los inputs tipo checkbox tambien los tomo 
    inputsFilters.querySelectorAll("input[type=checkbox]:checked").forEach( input => {
            let outputImagen = context.getImageData(canvas.clientLeft, canvas.clientTop, canvas.width, canvas.height);
            let filter = input.getAttribute("data-filter-type")
            inputImagen = ImageFilters[filter](inputImagen, outputImagen);
    });

    // Se muestra la imagen editada en el canvas con el filtro aplicado
    context.putImageData(inputImagen, canvas.clientLeft, canvas.clientTop);
});
});