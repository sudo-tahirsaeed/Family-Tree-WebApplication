data();

function data()
{
    // var header = document.getElementById("desc");
    // header.value = "  DOB: [] DOD: ()"  ;


    delay(1500).then(() => {	
        const url="http://localhost:5000/table";
        
        //e.preventDefault()
        getInfo();
        async function getInfo() {
          
            const res= await fetch (url,
            {   
                    method: 'GET'
            }
            )
            
           // console.log(res);
            
            var x=0;
             
             data= await res.json();
            
                x=1;
            // var str=place+x;
            // console.log(str);
            //     const a=`place${1}`
            //     console.log(a);
            var a=Object.values(data);
            var z=0;
            var i,n,p,s,d;
            tree(a);


        }
    })
}

function tree(a)
{
    var zx=[
       
           
       ];
    var z=0;
    var p=a.length;
   
    while(z<p)
    {
        var i,f,m,n,d,s;
        i=a[z];
        n=a[z+1];
        var nameArr = a[z+2].split(',');
        f=nameArr[0];
        m=nameArr[1];
        s=a[z+3];
        d=a[z+4];
        console.log(d);
        zx.push({ id: i, pids: [s],Image: "familypics/"+i+".png" ,mid: m, fid: f, Name: n ,Description: d},);
        
        z=z+5;
    }
    
   
            

    var family = new FamilyTree(document.getElementById("tree"), {
        nodeBinding: {
             field_0: "Name",
           img_0: "Image",
           desc: "Description"
            
        },
        nodes: zx,
   
        
        
    },
    
   
    );
   
   
    

}
tree();    










   
function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
    }
function reload()
{
delay(1500).then(() => {	
location.reload();
})
}


