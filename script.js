(function () {


  if('serviceWorker' in navigator){//regstrujemo sw
    
    window.addEventListener('load',()=>{
      navigator.serviceWorker
      .register("sw_cache_site.js",{ scope: "/" }) //da bu se scope sw poklapa sa scope aplikacije
      .then(reg => console.log('Service Worker:Registered'))
      .catch(err => console.log('Service Worker: Error: ${err}'));
    })
  }

  window.addEventListener("load", () => {
    function handleNetworkChange(event) {
      if (navigator.onLine) {
          //document.body.classList.remove("offline");
        console.log("online");

      } else {
          //document.body.classList.add("offline");
        console.log("offline");
        alert('You are offline!!!');//obavestenje koje iskoci
        //window.location.href = 'index.html';
      }
    }
    
    window.addEventListener("online", handleNetworkChange);
    window.addEventListener("offline", handleNetworkChange);
  });
})();