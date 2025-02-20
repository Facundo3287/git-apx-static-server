import { goTo } from './router';
import { agregarNav } from './componentes/nav';
import { agregarContenedor } from './componentes/contenedor';
import { agregarTitulo } from './componentes/titulo';
import { agregarFc} from './componentes/formCuenta';
import { agregarFr } from './componentes/formRoom';
import { agregarFch } from './componentes/formChat';

function main () {
    console.log('hola desde app.ts ======================> ', process.env.RENDER_EXTERNAL_URL);
    agregarNav();
    agregarContenedor();
    agregarTitulo();
    agregarFc();
    agregarFr();
    agregarFch();
    goTo('/Cuenta') };

main()