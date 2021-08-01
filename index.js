
const filesName=["GMP.json","mpDecimal.json","MPFR.json","NTL.json","realLib.json"];

/* Need to create a local server for fetching data from directory.
python -m http.server
*/

let Benchmarks=[];
const Functions = new Map();


filesName.forEach( name=>{
  fetch(name).then(response =>response.json()).then(data=>{

        data.benchmarks.forEach((item, i) => {
          var [function_name,len]=item.name.split("/")

          if(Functions.has(function_name)===false){
              Functions.set(function_name,new Map());
          }

          if(Functions.get(function_name).has(name)===false){
            Functions.get(function_name).set(name,[]);
          }

          Functions.get(function_name).get(name).push({x:len,y:item.cpu_time});

        });
      });

});


function main(){

  Functions.forEach( (value,key) => {
        series=[];

        value.forEach( (value,key) =>{
          series.push({name:key,points:value});
        });
        JSC.Chart(key,{
          title_label_text:key,
          series:series});
  });

}

setTimeout(main,1000);
