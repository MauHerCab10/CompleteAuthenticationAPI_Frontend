export default class PasswordToggler {
    static esTexto: boolean;
    static eyeIcon: string;
    static visualizacion: string;
    
    static HideShow_Password() {
        this.esTexto = !this.esTexto;
        this.esTexto ? this.eyeIcon = "fa-eye-slash" : this.eyeIcon = "fa-eye";
        this.esTexto ? this.visualizacion = "text" : this.visualizacion = "password";
    }
}