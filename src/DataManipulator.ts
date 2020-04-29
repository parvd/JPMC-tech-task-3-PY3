import { ServerRespond } from './DataStreamer';

export interface Row {
  price_abc:number,
  price_def:number,
  ratio: number,
  timestamp:Date,
  upper_bound:number,
  lower_bound:number,
  trigger_alert:number|undefined,
}


export class DataManipulator {
  static generateRow(serverRespond: ServerRespond[]): Row {
    const priceabc = (serverRespond[0].top_ask.price + serverRespond[0].top_bid.price)/2; 
    const pricedef = (serverRespond[0].top_ask.price + serverRespond[0].top_bid.price)/2;
    const ratio = priceabc/pricedef;
    const upbound=1 + 0.05;
    const lobound=1 + 0.05;
    return{
      price_abc: priceabc,
      price_def: pricedef,
      ratio,
      timestamp : serverRespond[0].timestamp > serverRespond[1].timestamp ?
        serverRespond[0].timestamp : serverRespond[1].timestamp,
      upper_bound:upbound,
      lower_bound:lobound,
      trigger_alert:( ratio>upbound || ratio < lobound)?ratio:undefined,
    };
    };
}

