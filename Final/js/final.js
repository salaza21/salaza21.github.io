var pageNav = document.querySelector('#page-nav');
var statusContainer = document.querySelector('#status');
var contentContainer = document.querySelector('#main-content');
var locStore = window.localStorage;
var sessStore = window.sessionStorage;
let URL = "/Final/js/temples.json";
fetchTempleData(URL);

const images = document.querySelectorAll("[data-src]");

function preloadImage(img){
    const src = img.getAttribute("data-src");
    if(!src){
        return;
    }
    img.src = src;
}

const imgOptions = {
    threshold: 1,
    rootMargin: "0px 0px 0px 0px"
};

const imgObserver = new IntersectionObserver((entries, imgObserver) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        } else {
            preloadImage(entry.target);
            imgObserver.unobserve(entry.target);
        }
    })
}, imgOptions);

images.forEach(image => {
    imgObserver.observe(image);
});

var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}

  /* *************************************
    *  Fetch Temple Data
    ************************************* */
   function fetchTempleData(URL){
    let temple = "Temples"; // The data we want from the weather.json file
    fetch(URL)
    .then(function(response) {
      if(response.ok){
      return response.json();
      }
      throw new ERROR('Network response was not OK.');
      })
      .then(function(data){
      // Check the data object that was retrieved
      console.log(data);
      // data is the full JavaScript object, but we only want the preston part
      // shorten the variable and focus only on the data we want to reduce typing
      let p = data[temple];
      let temple11 = p.IdahoFalls.closing[0];
      sessStore.setItem("IFalls1", temple11);
      console.log(`Temple11 is: ${temple11}`);
      let t11 = document.querySelector('#t11');
      t11.innerHTML = sessStore.getItem('IFalls1');
      let temple12 = p.IdahoFalls.closing[1];
      sessStore.setItem("IFalls2", temple12);
      console.log(`Temple12 is: ${temple12}`);
      let t12 = document.querySelector('#t12');
      t12.innerHTML = sessStore.getItem('IFalls2');
      let temple13 = p.IdahoFalls.closing[2];
      sessStore.setItem("IFalls3", temple13);
      console.log(`Temple13 is: ${temple13}`);
      let t13 = document.querySelector('#t13');
      t13.innerHTML = sessStore.getItem('IFalls3');
      let temple14 = p.IdahoFalls.closing[3];
      sessStore.setItem("IFalls4", temple14);
      console.log(`Temple14 is: ${temple14}`);
      let t14 = document.querySelector('#t14');
      t14.innerHTML = sessStore.getItem('IFalls4');
      let temple15 = p.IdahoFalls.closing[4];
      sessStore.setItem("IFalls5", temple15);
      console.log(`Temple15 is: ${temple15}`);
      let t15 = document.querySelector('#t15');
      t15.innerHTML = sessStore.getItem('IFalls5');
      let temple16 = p.IdahoFalls.closing[5];
      sessStore.setItem("IFalls16", temple16);
      console.log(`Temple16 is: ${temple16}`);
      let t16 = document.querySelector('#t16');
      t16.innerHTML = sessStore.getItem('IFalls6');
      let temple17 = p.IdahoFalls.closing[6];
      sessStore.setItem("IFalls7", temple17);
      console.log(`Temple17 is: ${temple17}`);
      let t17 = document.querySelector('#t17');
      t17.innerHTML = sessStore.getItem('IFalls7');
      let temple18 = p.IdahoFalls.closing[7];
      sessStore.setItem("IFalls8", temple18);
      console.log(`Temple18 is: ${temple18}`);
      let t18 = document.querySelector('#t18');
      t18.innerHTML = sessStore.getItem('IFalls8');
      let temple19 = p.IdahoFalls.closing[8];
      sessStore.setItem("IFalls9", temple19);
      console.log(`Temple19 is: ${temple19}`);
      let t19 = document.querySelector('#t19');
      t19.innerHTML = sessStore.getItem('IFalls9');

      let temple21 = p.Washington.closing[0];
      sessStore.setItem("Wash1", temple21);
      console.log(`Temple21 is: ${temple21}`);
      let t21 = document.querySelector('#t21');
      t21.innerHTML = sessStore.getItem('Wash1');

      let temple31 = p.Rexburg.closing[0];
      sessStore.setItem("Rexburg1", temple31);
      console.log(`Temple31 is: ${temple31}`);
      let t31 = document.querySelector('#t31');
      t31.innerHTML = sessStore.getItem('Rexburg1');
      let temple32 = p.Rexburg.closing[1];
      sessStore.setItem("Rexburg", temple32);
      console.log(`Temple32 is: ${temple32}`);
      let t32 = document.querySelector('#t32');
      t32.innerHTML = sessStore.getItem('Rexburg2');
      let temple33 = p.Rexburg.closing[2];
      sessStore.setItem("Rexburg3", temple33);
      console.log(`Temple33 is: ${temple33}`);
      let t33 = document.querySelector('#t33');
      t33.innerHTML = sessStore.getItem('Rexburg3');
      let temple34 = p.Rexburg.closing[3];
      sessStore.setItem("Rexburg4", temple34);
      console.log(`Temple34 is: ${temple34}`);
      let t34 = document.querySelector('#t34');
      t34.innerHTML = sessStore.getItem('Rexburg4');
      let temple35 = p.Rexburg.closing[4];
      sessStore.setItem("Rexburg5", temple35);
      console.log(`Temple35 is: ${temple35}`);
      let t35 = document.querySelector('#t35');
      t35.innerHTML = sessStore.getItem('Rexburg5');
      let temple36 = p.Rexburg.closing[5];
      sessStore.setItem("Rexburg6", temple36);
      console.log(`Temple36 is: ${temple36}`);
      let t36 = document.querySelector('#t36');
      t36.innerHTML = sessStore.getItem('Rexburg6');
      let temple37 = p.Rexburg.closing[6];
      sessStore.setItem("Rexburg7", temple37);
      console.log(`Temple37 is: ${temple37}`);
      let t37 = document.querySelector('#t37');
      t37.innerHTML = sessStore.getItem('Rexburg7');
      let temple38 = p.Rexburg.closing[7];
      sessStore.setItem("Rexburg8", temple38);
      console.log(`Temple38 is: ${temple38}`);
      let t38 = document.querySelector('#t38');
      t38.innerHTML = sessStore.getItem('Rexburg8');
      let temple39 = p.Rexburg.closing[8];
      sessStore.setItem("Rexburg9", temple39);
      console.log(`Temple39 is: ${temple39}`);
      let t39 = document.querySelector('#t39');
      t39.innerHTML = sessStore.getItem('Rexburg9');

      let temple41 = p.Boise.closing[0];
      sessStore.setItem("Boise1", temple41);
      console.log(`Temple41 is: ${temple41}`);
      let t41 = document.querySelector('#t41');
      t41.innerHTML = sessStore.getItem('Boise1');
      let temple42 = p.Boise.closing[1];
      sessStore.setItem("Boise2", temple42);
      console.log(`Temple42 is: ${temple42}`);
      let t42 = document.querySelector('#t42');
      t42.innerHTML = sessStore.getItem('Boise2');
      let temple43 = p.Boise.closing[2];
      sessStore.setItem("Boise3", temple43);
      console.log(`Temple43 is: ${temple43}`);
      let t43 = document.querySelector('#t43');
      t43.innerHTML = sessStore.getItem('Boise3');
      let temple44 = p.Boise.closing[3];
      sessStore.setItem("Boise4", temple44);
      console.log(`Temple44 is: ${temple44}`);
      let t44 = document.querySelector('#t44');
      t44.innerHTML = sessStore.getItem('Boise4');
      let temple45 = p.Boise.closing[4];
      sessStore.setItem("Boise5", temple45);
      console.log(`Temple45 is: ${temple45}`);
      let t45 = document.querySelector('#t45');
      t45.innerHTML = sessStore.getItem('Boise5');
      let temple46 = p.Boise.closing[5];
      sessStore.setItem("Boise6", temple46);
      console.log(`Temple46 is: ${temple46}`);
      let t46 = document.querySelector('#t46');
      t46.innerHTML = sessStore.getItem('Boise6');
      let temple47 = p.Boise.closing[6];
      sessStore.setItem("Boise7", temple47);
      console.log(`Temple47 is: ${temple47}`);
      let t47 = document.querySelector('#t47');
      t47.innerHTML = sessStore.getItem('Boise7');
      let temple48 = p.Boise.closing[7];
      sessStore.setItem("Boise8", temple48);
      console.log(`Temple48 is: ${temple48}`);
      let t48 = document.querySelector('#t48');
      t48.innerHTML = sessStore.getItem('Boise8');
      let temple49 = p.Boise.closing[8];
      sessStore.setItem("Boise9", temple49);
      console.log(`Temple49 is: ${temple49}`);
      let t49 = document.querySelector('#t49');
      t49.innerHTML = sessStore.getItem('Boise9');
      let temple410 = p.Boise.closing[9];
      sessStore.setItem("Boise10", temple410);
      console.log(`Temple410 is: ${temple410}`);
      let t410 = document.querySelector('#t410');
      t410.innerHTML = sessStore.getItem('Boise10');

      let temple51 = p.Provo.closing[0];
      sessStore.setItem("Provo1", temple51);
      console.log(`Temple51 is: ${temple51}`);
      let t51 = document.querySelector('#t51');
      t51.innerHTML = sessStore.getItem('Provo1');
      let temple52 = p.Provo.closing[1];
      sessStore.setItem("Provo2", temple52);
      console.log(`Temple52 is: ${temple52}`);
      let t52 = document.querySelector('#t52');
      t52.innerHTML = sessStore.getItem('Provo2');
      let temple53 = p.Provo.closing[2];
      sessStore.setItem("Provo3", temple53);
      console.log(`Temple53 is: ${temple53}`);
      let t53 = document.querySelector('#t53');
      t53.innerHTML = sessStore.getItem('Provo3');
      let temple54 = p.Provo.closing[3];
      sessStore.setItem("Provo4", temple54);
      console.log(`Temple54 is: ${temple54}`);
      let t54 = document.querySelector('#t54');
      t54.innerHTML = sessStore.getItem('Provo4');
      let temple55 = p.Provo.closing[4];
      sessStore.setItem("Provo5", temple55);
      console.log(`Temple55 is: ${temple55}`);
      let t55 = document.querySelector('#t55');
      t55.innerHTML = sessStore.getItem('Provo5');
      let temple56 = p.Provo.closing[5];
      sessStore.setItem("Provo16", temple56);
      console.log(`Temple56 is: ${temple56}`);
      let t56 = document.querySelector('#t56');
      t56.innerHTML = sessStore.getItem('Provo6');
      let temple57 = p.Provo.closing[6];
      sessStore.setItem("Provo7", temple57);
      console.log(`Temple57 is: ${temple57}`);
      let t57 = document.querySelector('#t57');
      t57.innerHTML = sessStore.getItem('Provo7');
      let temple58 = p.Provo.closing[7];
      sessStore.setItem("Provo8", temple58);
      console.log(`Temple58 is: ${temple58}`);
      let t58 = document.querySelector('#t58');
      t58.innerHTML = sessStore.getItem('Provo8');
      let temple59 = p.Provo.closing[8];
      sessStore.setItem("Provo9", temple59);
      console.log(`Temple59 is: ${temple59}`);
      let t59 = document.querySelector('#t59');
      t59.innerHTML = sessStore.getItem('Provo9');

      let temple61 = p.Oquirrh.closing[0];
      sessStore.setItem("Oquirrh1", temple61);
      console.log(`Temple61 is: ${temple61}`);
      let t61 = document.querySelector('#t61');
      t61.innerHTML = sessStore.getItem('Oquirrh1');
      let temple62 = p.Oquirrh.closing[1];
      sessStore.setItem("Oquirrh2", temple62);
      console.log(`Temple62 is: ${temple62}`);
      let t62 = document.querySelector('#t62');
      t62.innerHTML = sessStore.getItem('Oquirrh2');
      let temple63 = p.Oquirrh.closing[2];
      sessStore.setItem("Oquirrh3", temple63);
      console.log(`Temple63 is: ${temple63}`);
      let t63 = document.querySelector('#t63');
      t63.innerHTML = sessStore.getItem('Oquirrh3');
      let temple64 = p.Oquirrh.closing[3];
      sessStore.setItem("Oquirrh4", temple64);
      console.log(`Temple64 is: ${temple64}`);
      let t64 = document.querySelector('#t64');
      t64.innerHTML = sessStore.getItem('Oquirrh4');
      let temple65 = p.Oquirrh.closing[4];
      sessStore.setItem("Oquirrh5", temple65);
      console.log(`Temple65 is: ${temple65}`);
      let t65 = document.querySelector('#t65');
      t65.innerHTML = sessStore.getItem('Oquirrh5');
      let temple66 = p.Oquirrh.closing[5];
      sessStore.setItem("Oquirrh6", temple66);
      console.log(`Temple66 is: ${temple66}`);
      let t66 = document.querySelector('#t66');
      t66.innerHTML = sessStore.getItem('Oquirrh6');
      let temple67 = p.Oquirrh.closing[6];
      sessStore.setItem("Oquirrh7", temple67);
      console.log(`Temple67 is: ${temple67}`);
      let t67 = document.querySelector('#t67');
      t67.innerHTML = sessStore.getItem('Oquirrh7');
      let temple68 = p.Oquirrh.closing[7];
      sessStore.setItem("Oquirrh8", temple68);
      console.log(`Temple68 is: ${temple68}`);
      let t68 = document.querySelector('#t68');
      t68.innerHTML = sessStore.getItem('Oquirrh8');
      let temple69 = p.Oquirrh.closing[8];
      sessStore.setItem("Oquirrh9", temple69);
      console.log(`Temple69 is: ${temple69}`);
      let t69 = document.querySelector('#t69');
      t69.innerHTML = sessStore.getItem('Oquirrh9');
      let temple610 = p.Oquirrh.closing[8];
      sessStore.setItem("Oquirrh10", temple610);
      console.log(`Temple610 is: ${temple610}`);
      let t610 = document.querySelector('#t610');
      t610.innerHTML = sessStore.getItem('Oquirrh10');


      

    })
    .catch(function(error){
    console.log('There was a fetch problem: ', error.message);
    })
  }
  
