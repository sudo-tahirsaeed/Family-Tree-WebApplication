var email;
   
function delay(time) {
return new Promise(resolve => setTimeout(resolve, time));
}
validate();
function validate()
{
delay(2000).then(() => {	
const url="http://localhost:5000/ix";

//e.preventDefault()
getInfo();
async function getInfo() {
  
    const res= await fetch (url,
    {   
            method: 'GET'
    }
    )
    
    console.log(res);
    const data=await res.json();
    var header = document.getElementById('emailf');
    header.value = data.id  ;
    email=data.id;
    console.log(data.id);

  
}
});
}
function reload1()
{
delay(1500).then(() => {	
location.reload();
})
}
function reload()
{
delay(1500).then(() => {	
location.reload();
})
}
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
            //var e = document.getElementById("editbtn");
            let btn = document.createElement("button");
            btn.innerHTML = "Submit";


            while (z<a.length)
            {
                i=a[z];
                n=a[z+1];
                p=a[z+2];
                s=a[z+3];
                d=a[z+4];

                tablefill(i,n,p,s,d,btn);
                z=z+5;
            }
      
            showTableData();
            
    
        }
        });

}


function tablefill(id,name,pid,sid,desc,e,d)
{

    
var myid=id;
    
    var table = document.getElementById("list");

// Create an empty <tr> element and add it to the 1st position of the table:
var totalRowCount = table.rows.length;

var row = table.insertRow(totalRowCount);

// Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
var cell1 = row.insertCell(0);
var cell2 = row.insertCell(1);
var cell3 = row.insertCell(2);
var cell4 = row.insertCell(3);
var cell5 = row.insertCell(4);
var cell6 = row.insertCell(5);
var cell7 = row.insertCell(6);

// Add some text to the new cells:
cell1.innerHTML = id;
cell2.innerHTML = name;
cell3.innerHTML = pid;
cell4.innerHTML = sid;
cell5.innerHTML = desc;



var btne = document.createElement('input');
btne.type = "button";
btne.className = "btne";
btne.id = 'e'+totalRowCount;

cell6.appendChild(btne);
btne.onclick = function () {
   edit(btne.id);
  };
  var header = document.getElementById('e'+totalRowCount);
    header.value = "Edit"  ;

//delete button


var b = document.createElement('input');
b.type = "text";
b.className = "idt";
b.name = "t";
b.id = 't'+totalRowCount;



    var btnd = document.createElement('input');
btnd.type = "submit";
btnd.className = "btnd";

btnd.id = 'd'+totalRowCount;
 btnd.onclick = function() {
 reload1();

};





var form = document.createElement('form');
form.method = "POST";
form.action = "/xas"; //xas
form.appendChild(btnd);
form.appendChild(b);


cell7.appendChild(form);



var header = document.getElementById('t'+totalRowCount);
header.value = myid ;

  var header = document.getElementById('d'+totalRowCount);
    header.value = "Delete"  ;
    








}
function edit(a){


    
      
var pos = a.replace('e','');
pos=pos*5;
pos=pos-5;  


var header = document.getElementById('ix');
        header.value = treedata[pos];

        var header = document.getElementById('ez');
        header.value = treedata[pos];  

        document.getElementById("ix").disabled = true;



        
var header = document.getElementById('name');
header.value = treedata[pos+1];

var header = document.getElementById('pid');
        header.value = treedata[pos+2];
        
var header = document.getElementById('sid');
header.value = treedata[pos+3];

var header = document.getElementById('desc');
        header.value = treedata[pos+4];  





        

    }


function fillform() {
    
    var myTab = document.getElementById('list');

    // LOOP THROUGH EACH ROW OF THE TABLE AFTER HEADER.
    for (i = 1; i < myTab.rows.length; i++) {

        // GET THE CELLS COLLECTION OF THE CURRENT ROW.
        var objCells = myTab.rows.item(i).cells;

        // LOOP THROUGH EACH CELL OF THE CURENT ROW TO READ CELL VALUES.
        for (var j = 0; j < objCells.length; j++) {
           // cleanText = strInputCode.replace(/<\/?[^>]+(>|$)/g, "");
           var text =objCells.item(j).innerText || objCells.item(j).textContent;

           treedata.push(text);

        }
       
       
    }
}

var treedata=[];
function showTableData() {
    
    var myTab = document.getElementById('list');

    // LOOP THROUGH EACH ROW OF THE TABLE AFTER HEADER.
    for (i = 1; i < myTab.rows.length; i++) {

        // GET THE CELLS COLLECTION OF THE CURRENT ROW.
        var objCells = myTab.rows.item(i).cells;

        // LOOP THROUGH EACH CELL OF THE CURENT ROW TO READ CELL VALUES.
        for (var j = 0; j < objCells.length-2; j++) {
           // cleanText = strInputCode.replace(/<\/?[^>]+(>|$)/g, "");
           var text =objCells.item(j).innerText || objCells.item(j).textContent;

           treedata.push(text);

        }
       
       
    }
   
    tree(treedata);
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
// tablefill(12,'Abdullah','px','sx','goodbiy');

