
let s4 = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
    }
    function x(){
   var a=s4();
   document.getElementById('fid').value =a ;
   document.getElementById("fid").readOnly = true;

    }
    
    x();
          