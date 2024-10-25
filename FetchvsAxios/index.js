const axios=require("axios");
    // fetch vs axios
//Use fetch for simple requests where you want to avoid additional dependencies, and you are comfortable handling responses and errors manually.
//Use axios when you need more functionality, such as interceptors, automatic JSON parsing, and better error handling, or if you want a more streamlined API.

//1. if we want to use fetch() to make http request than we are not required to install in our project as it is built in browers
// 2. in the case of fetch() each and evvery thing we have done manually such as 
// parsing of res.json(),res.text() etc
//3. syntax wise it is more complex as compare to axios()

// 4. it return promisees

// axios

// 1. if we want to use axios than first we have to install it by using npm i axios
// than import than use as it is third parties library
//2. it has more functionality as compare to fetch()
//3. its syntax is simple and more readable form
 
 // syntax in then and catch form
  
  // fetch()
//   const data=fetch('https://api.example.com/data')
//   .then(response => response.json())
//   .then(data => console.log(data))
//   .catch(error => console.error('Error:', error));

  //axios
//   const data1=axios.get('https://api.example.com/data')
//   .then(response => console.log(response.data))
//   .catch(error => console.error('Error:', error));

// is asyn version

// fetch()

// async function fetchData() {
//     try {
//       const response = await fetch('https://api.example.com/data');
  
//       // Check if the response is OK (status in the range 200-299)
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
  
//       const data = await response.json();
//       console.log(data);
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   }
  
//   fetchData();

// axios()
let requireulr='';
async function fetchData() {

     
    try 
    {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/1`);
      
      const res=response.data;
     
     
    //   console.log(res.types[0].type.url);
      const internalapi=res.types[0].type.url;
      const fetchd= async ()=>
        {
           const resilt=await axios.get(internalapi);
           requireulr=resilt.data.damage_relations.double_damage_from[0].url;

      }
     
      
     await fetchd()
    } 
    catch (error) 
    {
      console.error('Error:', error);
    }
  }
  
  
  

  const main=async()=>{
    await fetchData();
    console.log(requireulr);
      
       const data1=axios.get(requireulr)
   .then(response => console.log(response.data.moves[4]))
   
    
  }

  main()

  
  
  

