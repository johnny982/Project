// immeditally invoked function expression

(function(){
    function start(){
        console.log("app started")
    }
    window.addEventListener("load",start);
})();