export function handleRouter (url: string) {
    let app: HTMLElement = document.getElementById('app')!;
    if (url == '/Cuenta') { 
        app.innerHTML = `
            <mi-nav> </mi-nav>
            <mi-contenedor>
                <mi-titulo modo = titulo texto = Bienvenido> </mi-titulo> 
                <mi-fc> </mi-fc>
            </mi-contenedor>` } 

    else if (url == '/Room') {
        app.innerHTML = `
            <mi-nav> </mi-nav>
            <mi-contenedor>
                <mi-titulo modo = titulo texto = Iniciar> </mi-titulo> 
                <mi-fr> </mi-fr>
            </mi-contenedor>` } 
            
    else if (url == '/Chat') {
        app.innerHTML = `
            <mi-nav> </mi-nav>
            <mi-contenedor>
                <mi-titulo modo = titulo texto = Chat> </mi-titulo> 
                <mi-titulo modo = subtitulo> </mi-titulo> 
                <mi-fch> </mi-fch>
            </mi-contenedor>`
    }
};

export function goTo (url: string) {
    history.pushState({}, '', url);
    handleRouter(url)
}