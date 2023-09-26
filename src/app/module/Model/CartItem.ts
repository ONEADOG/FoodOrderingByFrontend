import { Food } from "./Food";

export class CartItem{
    constructor(foodmodel:Food,){
        this.food =foodmodel; 
        // this.Qty = QtyQty:any
    }
    food:Food
    Qty:number=1;
    desiredQty: number = 1;
    get totalQty():number{
        return this.Qty = this.desiredQty
    }
}