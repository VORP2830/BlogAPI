export class BlogException extends Error {
    constructor(mensagem: string) {
        super(mensagem);
        this.name = this.message;
    }
}