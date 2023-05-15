export class EditCompraListaDetalle
{
    constructor(public codigoCompra:number,public codigoDetalleCompra:number,public ordenSecuencia:number,public numeroDocumento:string,public razonSocial:string,
        public totalCompra:number,public producto:string,public precio:number,public cantidad:number,public total:number){}
}