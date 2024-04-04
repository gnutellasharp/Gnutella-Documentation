document.addEventListener("DOMContentLoaded",(_)=>{
    pdfButtonInitialization();
})

function pdfButtonInitialization(){
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