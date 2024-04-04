document.addEventListener("DOMContentLoaded",(_)=>{
    ViewerInitialization();
})

function ViewerInitialization(){
    const searchParams = new URLSearchParams(window.location.search);
    var html_view = searchParams.get("html_view") 
    if(html_view!== null){
        fetch(html_view).then(x=>x.text()).then(res=> {
            const container = document.getElementById("viewer");
            const shadowRoot = container.attachShadow({ mode: "open" });
            shadowRoot.innerHTML =res;
        });
    }else{
        var isLocalhost = window.location.host.includes("127.0.0.1") || window.location.host.includes("localhost");
        var path = isLocalhost === true? "main.html" : "Gnutella-Documentation/main.html" 

        fetch(path).then(x=>x.text()).then(res=> {
            const container = document.getElementById("viewer");
            container.innerHTML =res;
            PdfButtonInitialization();
        });
    }
}

function PdfButtonInitialization(){
    document.querySelectorAll("[data-pdf]").forEach(btn=>{
        var linkToPdf = btn.dataset.pdf;
        if(linkToPdf !== '' && linkToPdf !== null){
            btn.addEventListener("click",()=>{
                fetch(linkToPdf).then(x=>x.text()).then(res=> {
                    var pathStrings = linkToPdf.split("/");
                    var fileName = `${pathStrings[pathStrings.length - 1]}.pdf`;
                    html2pdf().from(res).save(fileName);
                })
            })    
        }
    })
}