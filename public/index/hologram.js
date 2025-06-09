const canvasEl = document.querySelector('#shader');
const sandbox = new GlslCanvas(canvasEl);
window.sandbox = sandbox;

// El shader original de fffuel.co
const fragmentShader = `
    #ifdef GL_ES
    precision mediump float;
    #endif
    uniform vec2 u_resolution;
    uniform float u_time;
    uniform float u_washout;
    uniform float u_zoom;
    uniform float u_complexity;
    uniform float u_mix;
    void main(){
        vec2 coord = u_zoom * (gl_FragCoord.xy - u_resolution / 3.5) / min(u_resolution.y, u_resolution.x);
        float len;
        for (int i = 0; i < 6; i++){
            len = length(vec2(coord.x, coord.y));
            coord.x = (coord.x + cos(coord.y + sin(len)) + sin(u_time / 5.0)) * u_complexity;
            coord.y = (coord.y + sin(coord.x + cos(len)) + cos(u_time / 20.0)) * u_complexity;
        }
        vec3 base_color = vec3(max(u_washout, abs(cos(len * 4.0))), max(u_washout, abs(cos(len * 1.1))), max(u_washout, abs(cos(len * 0.0))));
        vec3 final_color = mix(base_color, vec3(0.0), u_mix);
        gl_FragColor = vec4(final_color, 1.0);
    }`
;

// Cargar el shader
sandbox.load(fragmentShader);

// Configurar los valores uniformes iniciales
function setUniforms() {
    sandbox.setUniform('u_washout', 0.5);  // Controla el brillo mínimo
    sandbox.setUniform('u_zoom', 10.0);     // Controla el zoom del efecto
    sandbox.setUniform('u_complexity', 0.7); // Controla la complejidad del patrón
    sandbox.setUniform('u_mix', 0.6);      // Controla la mezcla con color fondo
}

// Establecer uniformes iniciales
setUniforms();

// Función auxiliar para actualizar uniformes
function setUniform(name, value) {
    sandbox.setUniform(`u_${name}`, value);
}
window.setUniform = setUniform;

// Función para actualizar el tamaño
function updateSize(width, height) {
    canvasEl.width = width;
    canvasEl.height = height;
    sandbox.forceRender = true;
}