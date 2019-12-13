document.addEventListener("DOMContentLoaded", ()=>{
    document.querySelector('#submit-2').addEventListener("click", thanks);
  })

  let thanks = (event) => {
    event.preventDefault();
    document.querySelector("#tohide").classList.add("hideme");
    document.querySelector("#thanks").classList.remove("hideme");

  
}