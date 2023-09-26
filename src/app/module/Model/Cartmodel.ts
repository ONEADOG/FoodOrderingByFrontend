import { CartItem } from "./CartItem";

export class Cartmodel{
    [x: string]: any;
    items:CartItem[] = []
    get totalQty():number{
        let totalQty = 0;
        this.items.forEach(item =>{
            totalQty += item.Qty
        }) 
        return totalQty;
    }
}