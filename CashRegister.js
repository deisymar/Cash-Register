function checkCashRegister(price, cash, cid) {
    if( cash < price){
        return {status:"INSUFFICIENT_FUNDS", change:[]};
    }
    let change =  (cash - price)*100;
    //console.log("change*100: "+change);
    let cidTotal=0; 
     
    /*Get the total in money CID*/
    for(let box of cid){
      cidTotal+=box[1]*100;
      //console.log(box[1]);
    }
    //console.log("cidTotal: "+cidTotal);
  
    if(change > cidTotal)
    {
      return {status:"INSUFFICIENT_FUNDS", change:[]};
    }else if(change === cidTotal){
        return {status:"CLOSED", change:cid};
    }else{
      let unitsMonetary={"ONE HUNDRED":10000, "TWENTY":2000,"TEN":1000,"FIVE":500,"ONE":100,"QUARTER":25,"DIME":10,"NICKEL":5, "PENNY":1}; 
      //array value importe*100
      let cidReverse= cid.reverse();
      //console.log(cidReverse);
      /**final Array that registers the change of cash per monetary unit */   
      let moneyChange=[]; 
      let totChange=0;
      /**review the existence in cash cid by monetary unit (higher-lower) */
      for(let units of cid){
        let moneyReturned=[units[0],0];
        //console.log(units[1]);
        //console.log(moneyReturned);
        units[1]=units[1]*100;
        //console.log(units[1]);
        while(change >= unitsMonetary[units[0]] && units[1]>0){
            //console.log(units[1]);
            //console.log(unitsMonetary[units[0]]);
            change-=unitsMonetary[units[0]];
            units[1]-=unitsMonetary[units[0]];
            moneyReturned[1]+=unitsMonetary[units[0]]/100;               
        }  
        //console.log("moneyReturned:"+moneyReturned); 
        if(moneyReturned[1] > 0){
          //console.log("moneyReturned:"+moneyReturned[1]);
          moneyChange.push(moneyReturned);
          //console.log("moneyChange:"+moneyChange);
        }      
      }
      /**validate complete change */
      for(let i of moneyChange){
           //console.log(i[1]);
           totChange+=i[1];
      }
       
      change = cash-price;
      //console.log(change);
      //console.log(totChange);
      if(totChange<change){
          return {status:"INSUFFICIENT_FUNDS",change: []};
      }
      return {status:"OPEN",change: moneyChange}; 
    }   
    //return change;
  }
  
  /*checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);
  
  checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]);
  
  checkCashRegister(19.5, 20, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]);*/
  
  checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 1], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]);
  
  checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);