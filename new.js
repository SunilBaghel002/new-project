let content=document.querySelector(".content-panel")
content.style.backgroundColor="red"
content.style.display="none"
let image=document.querySelector(".image")
image.addEventListener("mouseover",()=>{
    content.style.display="inline"
})
image.addEventListener("mouseout",()=>{
    content.style.display="none"
})