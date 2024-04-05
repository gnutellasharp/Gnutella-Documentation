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
        fetch("main.html").then(x=>x.text()).then(res=> {
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
                    var options = {
                        margin:10,
                        html2canvas: { scale: 1, scrollY: 0 }
                    }
                    
                    //get pdf name
                    var pathStrings = linkToPdf.split("/");
                    var fileName = `${pathStrings[pathStrings.length - 1]}.pdf`;
                    html2pdf().from(res).set(options).save(fileName);
                    viewer.shadowRoot.innerHTML = "";
                })
            })    
        }
    })
}