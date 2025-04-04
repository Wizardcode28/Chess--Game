let container=document.querySelector('.container')
let boxes=Array.from(document.getElementsByClassName('box'))
let All=Array.from(document.querySelectorAll('img'))
let yellow=[]
let Time1=document.querySelector('.time1')
let Time2=document.querySelector('.time2')
let control1
let control2
// let moves=[]
// let moveno=0
// let prev=document.getElementById("prev")
// let next=document.getElementById("next")
// let moveNo=document.getElementById("moveno")
let soundeffect=new Audio()
soundeffect.src="move-self.mp3"
soundeffect.play()
for (let i = 0; i < boxes.length; i++) {
    const element = boxes[i]
    let row=Math.floor(i/8)+1
    if(row%2!=0) {
    if(i%2==0) element.style.backgroundColor='rgb(235, 236, 208)'
    else element.style.backgroundColor='rgb(115, 149, 82)'
    }
    else {
    if(i%2==0) element.style.backgroundColor='rgb(115, 149, 82)'
    else element.style.backgroundColor='rgb(235, 236, 208)'
    }
}
let time1=600
let time2=600
function timeofplayer(){
    let minutes1=Math.floor(time1/60)
    let minutes2=Math.floor(time2/60)
    let seconds1first=Math.floor((time1-60*minutes1)/10)
    let seconds1second=(time1-60*minutes1)%10
    let seconds2first=Math.floor((time2-60*minutes2)/10)
    let seconds2second=(time2-60*minutes2)%10
    let minutes1first=Math.floor(minutes1/10)
    let minutes1second=minutes1%10
    let minutes2first=Math.floor(minutes2/10)
    let minutes2second=minutes2%10
    Time1.innerHTML=`${minutes1first}${minutes1second} : ${seconds1first}${seconds1second}`
    Time2.innerHTML=`${minutes2first}${minutes2second} : ${seconds2first}${seconds2second}`
}
timeofplayer()
function reducetime1(){
    time1-=1
    timeofplayer()
}
function reducetime2(){
    time2-=1
    timeofplayer()
}
control2=setInterval(reducetime2,1000)

function clearcontrol(srcoftarget){
    if(srcoftarget.includes('150/w')==true) {
        clearInterval(control2)
        control1=setInterval(reducetime1,1000)
    }
    else {
        clearInterval(control1)
        control2=setInterval(reducetime2,1000)
    }
}

function reverseplayer(e,f){
    console.log(f)
    if(e.includes("150/b")==true) {
        f=f.filter(e=>{
            if(e.getAttribute('src').includes("150/w")==true) return e
        })
    }
    if(e.includes("150/w")==true) {
        f=f.filter(e=>{
            // console.log(e,e.getAttribute('src').includes("150/b"))
            if(e.getAttribute('src').includes("150/b")==true) return e
        })
    }
    console.log(f)
    return f
}

function reversegray(){
    All.forEach(e=>{
        e.style.border="0px"
    })
}

function play(e){
    playrook(e)
    playknight(e)
    playking(e)
    playqueen(e)
    playbishop(e)
    playpawn(e)
}
play("150/b")


function reverse(){
    let reverseboxes=All.filter(e=>{
        if(e.getAttribute('src')=="options.jpg") return e
    })
    reverseboxes.forEach(e=>{
        e.setAttribute('src',"white.jpg")
        e.style.zIndex="-1"
        e.style.opacity="1"
    }) 
}

function rookmoves(index,srcoftarget){
    let rookoptions=[] 
    for (let i = -1; i >-8; i--) {
        if((index+8*i)>=0 && (index+8*i)<64){
            let sarthak=(boxes[index+8*i]).firstElementChild.getAttribute('src')
            if(sarthak=="white.jpg"){ 
            rookoptions.push(boxes[index+8*i])
            }
            else if((sarthak.includes("150/b") && srcoftarget.includes("150/b")) || (sarthak.includes("150/w") && srcoftarget.includes("150/w"))){
              break    
            }
            else{
                rookoptions.push(boxes[index+8*i])
                break  
            }  
    }
    }
    for (let i = 1; i < 8; i++) {
        if((index+8*i)>=0 && (index+8*i)<64){
            let sarthak=(boxes[index+8*i]).firstElementChild.getAttribute('src')
            if(sarthak=="white.jpg"){ 
            rookoptions.push(boxes[index+8*i])
            }
            else if((sarthak.includes("150/b") && srcoftarget.includes("150/b")) || (sarthak.includes("150/w") && srcoftarget.includes("150/w"))){
              break    
            }
            else{
                rookoptions.push(boxes[index+8*i])
                break  
            } 
    }
    }
    let row=Math.floor(index/8)
    for (let i = index-1; i >= (row*8); i--) {  
        if(i>=0 && i<64){
        let sarthak=(boxes[i]).firstElementChild.getAttribute('src')
            if(sarthak=="white.jpg"){ 
            rookoptions.push(boxes[i])
            }
            else if((sarthak.includes("150/b") && srcoftarget.includes("150/b")) || (sarthak.includes("150/w") && srcoftarget.includes("150/w"))){
                break    
            }
            else{
                rookoptions.push(boxes[i])
                break  
            } 
        }  
    }
    for (let i = index+1; i < (row+1)*8; i++) {
        if(i>=0 && i<64){
        let sarthak=(boxes[i]).firstElementChild.getAttribute('src')
        if(sarthak=="white.jpg"){ 
        rookoptions.push(boxes[i])
        }
        else if((sarthak.includes("150/b") && srcoftarget.includes("150/b")) || (sarthak.includes("150/w") && srcoftarget.includes("150/w"))){
          break    
        }
        else{
            rookoptions.push(boxes[i])
            break  
        } 
    }
    }
    return rookoptions
}

function bishopmoves(index,srcoftarget){
    let bishopoptions=[]
    let row=Math.floor((index)/8)+1
    let spaces=index+1-8*(Math.floor((index)/8))
    function hello(sarthak,i,e){
        if(sarthak=="white.jpg"){ 
        bishopoptions.push(boxes[index+e*i])
        }
        else if((sarthak.includes("150/b") && srcoftarget.includes("150/b")) || (sarthak.includes("150/w") && srcoftarget.includes("150/w"))){
        return 1  
        }
        else{
        bishopoptions.push(boxes[index+e*i])
        return 2 
        }
    }
    
    for (let i = 1; i < 8; i++) {
        if((index-9*i)>=0 && (index-9*i)<64 && i!=0 && (Math.floor((index-9*i)/8)+1)>(row-spaces)){
            let sarthak=(boxes[index-9*i]).firstElementChild.getAttribute('src')
            if((Math.floor((index-9*i)/8)+1)!=(row-spaces+1)){
                    let returnvalue=hello(sarthak,i,-9)
                    if(returnvalue==1 || returnvalue==2) break
                 }
            else{
             hello(sarthak,i,-9)
             break
            }
         }
    }  
    for (let i = 1; i < 8; i++) {
        if((index-7*i)>=0 && (index-7*i)<64 && i!=0 && (Math.floor((index-7*i)/8)+1)>(row+spaces-9)){
           let sarthak=(boxes[index-7*i]).firstElementChild.getAttribute('src')
           if((Math.floor((index-7*i)/8)+1)!=(row+spaces-8)){
           let returnvalue=hello(sarthak,i,-7)
           if(returnvalue==1 || returnvalue==2) break
           }
           else{
            hello(sarthak,i,-7)
            break
           }
        } 
    }  
    for (let i = 1; i < 8; i++) {
        if((index+7*i)>=0 && (index+7*i)<64 && i!=0 && (Math.floor((index+7*i)/8)+1)<(row+spaces)){
            let sarthak=(boxes[index+7*i]).firstElementChild.getAttribute('src')
            if((Math.floor((index+7*i)/8)+1)!=(row+spaces-1) && (Math.floor((index+7*i)/8)+1)!=row){
                let returnvalue=hello(sarthak,i,+7)
                if(returnvalue==1 || returnvalue==2) break
             }
                else{
                 hello(sarthak,i,+7)
                 break
                }
         }
    }  
    for (let i = 1; i < 8; i++) {
        if((index+9*i)>=0 && (index+9*i)<64 && i!=0 && (Math.floor((index+9*i)/8)+1)<(row-spaces+9)){
            let sarthak=(boxes[index+9*i]).firstElementChild.getAttribute('src')
            if((Math.floor((index+9*i)/8)+1)!=(row-spaces+8)){
                let returnvalue=hello(sarthak,i,+9)
                if(returnvalue==1 || returnvalue==2) break
             }
                else{
                 hello(sarthak,i,+9)
                 break
                }
        } 
    }  
    return bishopoptions
}

function filteroptions(op,srcoftarget){
    console.log(op)
    let options1=op.filter(e=>{
        let sarthak=e.firstElementChild.getAttribute('src')
        if(sarthak=="white.jpg"){ 
            return e
        }
    })
    let options2=op.filter(e=>{
        let sarthak=e.firstElementChild.getAttribute('src')
        if((sarthak.includes("150/b")==true && srcoftarget.includes("150/w")==true) || (sarthak.includes("150/w")==true && srcoftarget.includes("150/b")==true)){
         return e  
        }
    })
    console.log(options1,options2)
    let options=[...options1,...options2]
    options1.forEach(e=>{
        let img=e.firstElementChild
        img.setAttribute('src',"options.jpg")
        img.style.zIndex="0"
        img.style.opacity="0.1"
    })
    options2.forEach(e=>{
        let img=e.firstElementChild
        img.style.border="3px solid grey"
        img.style.borderRadius="5vh"
    })
    return options
}

function kingmoves(index,srcoftarget){
    let Boxes=[]
    let prevboxes=8*(Math.floor(index/8))
    if((index-9)>=0 && (index-9)<64 && index>prevboxes && index<=(7+prevboxes)) Boxes.push(boxes[index-9])
    if((index-1)>=0 && (index-1)<64 && index>prevboxes && index<=(7+prevboxes)) Boxes.push(boxes[index-1])
    if((index+7)>=0 && (index+7)<64 && index>(prevboxes) && index<=(7+prevboxes)) Boxes.push(boxes[index+7])
    if((index-8)>=0 && (index-8)<64) Boxes.push(boxes[index-8])
    if((index+8)>=0 && (index+8)<64) Boxes.push(boxes[index+8])
    if((index-7)>=0 && (index-7)<64 && index>=prevboxes && index<(7+prevboxes)) Boxes.push(boxes[index-7])
    if((index+1)>=0 && (index+1)<64 && index>=prevboxes && index<(7+prevboxes)) Boxes.push(boxes[index+1])
    if((index+9)>=0 && (index+9)<64 && index>=prevboxes && index<(7+prevboxes)) Boxes.push(boxes[index+9])
    // let kingoptions=filteroptions(Boxes,srcoftarget)
    return Boxes
}

function queenmoves(index,srcoftarget){
    let rookqueens=rookmoves(index,srcoftarget)
    let bishopqueens=bishopmoves(index,srcoftarget)
    let queenchoices=[...rookqueens,...bishopqueens]
    // let queenoptions=filteroptions(queenchoices,srcoftarget)
    return queenchoices
}

function knightmoves(index,srcoftarget){
    let Boxes=[]
    let prevboxes=8*(Math.floor(index/8))
    if((index-17)>=0 && (index-17)<64 && index>prevboxes && index<=(7+prevboxes)) Boxes.push(boxes[index-17])
    if((index-15)>=0 && (index-15)<64 && index>=prevboxes && index<(7+prevboxes)) Boxes.push(boxes[index-15])
    if((index-10)>=0 && (index-10)<64 && index>=(2+prevboxes) && index<=(7+prevboxes)) Boxes.push(boxes[index-10])
    if((index-6 )>=0 && (index-6 )<64 && index>=prevboxes && index<=(5+prevboxes)) Boxes.push(boxes[index-6 ])
    if((index+6 )>=0 && (index+6 )<64 && index>=(2+prevboxes) && index<=(7+prevboxes)) Boxes.push(boxes[index+6 ])
    if((index+10)>=0 && (index+10)<64 && index>=prevboxes && index<=(5+prevboxes)) Boxes.push(boxes[index+10])
    if((index+15)>=0 && (index+15)<64 && index>prevboxes && index<=(7+prevboxes)) Boxes.push(boxes[index+15])
    if((index+17)>=0 && (index+17)<64 && index>=prevboxes && index<(7+prevboxes)) Boxes.push(boxes[index+17])
        // let knightoptions=filteroptions(Boxes,srcoftarget)
        return Boxes
}
   
function pawnmoves(index,srcoftarget){
    let Boxes=[]
    let prevrow=Math.floor(index/8)
    let prevboxes=8*(Math.floor(index/8))
    if((index-16)>=0 && (index-16)<64 && srcoftarget.includes("150/w") && boxes[index-16].firstElementChild.getAttribute('src')=="white.jpg" && prevrow==6) Boxes.push(boxes[index-16])
    if((index+16)>=0 && (index+16)<64 && srcoftarget.includes("150/b") && boxes[index+16].firstElementChild.getAttribute('src')=="white.jpg" && prevrow==1) Boxes.push(boxes[index+16])
    if((index-8)>=0 && (index-8)<64 && srcoftarget.includes("150/w") && boxes[index-8].firstElementChild.getAttribute('src')=="white.jpg") Boxes.push(boxes[index-8])
    if((index+8)>=0 && (index+8)<64 && srcoftarget.includes("150/b") && boxes[index+8].firstElementChild.getAttribute('src')=="white.jpg") Boxes.push(boxes[index+8])
    if((index-7)>=0 && (index-7)<64 && srcoftarget.includes("150/w") && boxes[index-7].firstElementChild.getAttribute('src').includes("150/b") && index>=prevboxes && index<(7+prevboxes)) Boxes.push(boxes[index-7])
    if((index-9)>=0 && (index-9)<64 && srcoftarget.includes("150/w") && boxes[index-9].firstElementChild.getAttribute('src').includes("150/b") && index<=(7+prevboxes)) Boxes.push(boxes[index-9])
    if((index+7)>=0 && (index+7)<64 && srcoftarget.includes("150/b") && boxes[index+7].firstElementChild.getAttribute('src').includes("150/w") && index<=(7+prevboxes)) Boxes.push(boxes[index+7])
    if((index+9)>=0 && (index+9)<64 && srcoftarget.includes("150/b") && boxes[index+9].firstElementChild.getAttribute('src').includes("150/w") && index<(7+prevboxes)) Boxes.push(boxes[index+9])
    // let pawnoptions=filteroptions(Boxes,srcoftarget)
console.log(Boxes)
    return Boxes
}    

function removeevent(srcoftarget){
    let all=boxes.filter(e=>{
        if(srcoftarget.includes('150/b')==true){
          if(e.firstElementChild.getAttribute('src').includes('150/b')==true) return e}
        else{
          if(e.firstElementChild.getAttribute('src').includes('150/w')==true) return e}
    })
    console.log(all)
    all.forEach(e=>{
        e.firstElementChild.removeEventListener('click',handlerooks)
        e.firstElementChild.removeEventListener('click',handlebishops)
        e.firstElementChild.removeEventListener('click',handlequeens)
        e.firstElementChild.removeEventListener('click',handlekings)
        e.firstElementChild.removeEventListener('click',handleknights)
        e.firstElementChild.removeEventListener('click',handlepawns)
    })
}

// let prevmoves=[]
// let Allimages=[]
// function prevnext(){
// prev.addEventListener("click",(e)=>{
//     // All=prevmoves[moveno-1]
//     // let prevMoves
//     let boxess=Array.from(document.getElementsByClassName('box'))
//     for(let i=0;i<64;i++){
//         // let img=boxes[i].firstElementChild
//         boxess[i].firstElementChild.setAttribute("src",prevmoves[moveno-2][i].getAttribute("src"))
//     }
//     Array.from(document.getElementsByClassName('box'))=boxess
// })
// next.addEventListener("click",(e)=>{
//     All=Allimages[moveno+1]
// })
// }
// prevnext()
function handlemove(e,target,srcoftarget,index){
    console.log(target)
    let newtarget=e.target.closest('.box')
    console.log(newtarget)
    let whiteimg= newtarget.firstElementChild.getAttribute('src')
    if(srcoftarget.includes("150/b") && whiteimg.includes("150/w")){
    soundeffect.src="capture.mp3"}
    else if(srcoftarget.includes("150/w") && whiteimg.includes("150/b")){
    soundeffect.src="capture.mp3"}
    else{soundeffect.src="move-self.mp3"}
    soundeffect.play()
    newtarget.firstElementChild.setAttribute('src',srcoftarget)
    newtarget.firstElementChild.style.zIndex="1"
    target.firstElementChild.setAttribute('src',whiteimg)
    target.firstElementChild.style.zIndex="-1"
    // moveno+=1
    // moveNo.innerText=moveno
    // Allimages=Array.from(document.querySelectorAll('img'))
    // prevmoves.push(Allimages)
    // console.log(prevmoves)
    // prevnext()
}

let targetevents=[]
function removetargetevent(){
targetevents.forEach(e=>{
    console.log(e)
    e.removeEventListener('click',handlerookmove)
    e.removeEventListener('click',handlebishopmove)
    e.removeEventListener('click',handlequeenmove)
    e.removeEventListener('click',handlekingmove)
    e.removeEventListener('click',handleknightmove)
    e.removeEventListener('click',handlepawnmove)
})
targetevents=[]
}

function filteralloptions(op,srcoftarget){
    let options1=op.filter(e=>{
        let sarthak=e.firstElementChild.getAttribute('src')
        if(sarthak=="white.jpg"){ 
            return e
        }
    })
    let options2=op.filter(e=>{
        let sarthak=e.firstElementChild.getAttribute('src')
        if((sarthak.includes("150/b")==true && srcoftarget.includes("150/w")==true) || (sarthak.includes("150/w")==true && srcoftarget.includes("150/b")==true)){
         return e  
        }
    })
    let options=[...options1,...options2]
    return options
}
function toqueen(){
    let allwhite=boxes.filter(e=>{
        if(e.firstElementChild.getAttribute('src').includes("150/w")==true) return e
    })
    let allblack=boxes.filter(e=>{
        if(e.firstElementChild.getAttribute('src').includes("150/b")==true) return e
    })
    allwhite.forEach(e=>{
        if(boxes.indexOf(e)<8) {e.firstElementChild.setAttribute("src","https://assets-themes.chess.com/image/ejgfv/150/wq.png")
            soundeffect.src="promote.mp3"
        }
    })
    allblack.forEach(e=>{
        if(boxes.indexOf(e)>55) {e.firstElementChild.setAttribute("src","https://assets-themes.chess.com/image/ejgfv/150/bq.png")
            soundeffect.src="promote.mp3"
        }
    })
    soundeffect.play()
}

let allch=[]
function getallmoves(allboxes){
allboxes.forEach(e=>{
    let rmoves=[],bmoves=[],qmoves=[],kmoves=[],pmoves=[]
    let index=boxes.indexOf(e)
    let src=e.firstElementChild.getAttribute("src")
    console.log(index,src)
    if(src.includes("r.png")) {rmoves=rookmoves(index,src)
        rmoves=filteralloptions(rmoves,src)
    }
    if(src.includes("b.png")) {bmoves=bishopmoves(index,src)
        bmoves=filteralloptions(bmoves,src)
    }
    if(src.includes("q.png")) {qmoves=queenmoves(index,src)
        qmoves=filteralloptions(qmoves,src)
    }
    if(src.includes("k.png")) {kmoves=knightmoves(index,src)
        kmoves=filteralloptions(kmoves,src)
    }
    if(src.includes("p.png")) {pmoves=pawnmoves(index,src)}

    allch=[...allch,...rmoves,...bmoves,...qmoves,...kmoves,...pmoves]
    // console.log(allch)
})
console.log(allch)
return allch
}

function possiblemoves(srcoftarget,r,hoho){
let checkmoves=[]
let kings=boxes.filter(e=>{
    if(e.firstElementChild.getAttribute('src').includes('k.png')) return e
})
    for (let i = 0; i < hoho.length; i++) {
    const element = hoho[i]
    if(element==kings[0] || element==kings[1]) checkmoves.push(element)
    }
console.log(checkmoves)
if((checkmoves.length)!=0){
soundeffect.src="move-check.mp3"
soundeffect.play()
let indexofking=boxes.indexOf(checkmoves[0])
let src=checkmoves[0].firstElementChild.getAttribute('src')
let choices=kingmoves(indexofking,src)

let allwinboxes=boxes.filter(e=>{
    if(srcoftarget.includes("150/b")){
        if(e.firstElementChild.getAttribute('src').includes("150/b")==true) return e
    }
    else{
        if(e.firstElementChild.getAttribute('src').includes("150/w")==true) return e
    }
})
let allchoicesofwinboxes=getallmoves(allwinboxes)
let alloppboxes=boxes.filter(e=>{
    if(srcoftarget.includes("150/b")){
        if(e.firstElementChild.getAttribute('src').includes("150/w")==true) return e
    }
    else{
        if(e.firstElementChild.getAttribute('src').includes("150/b")==true) return e
    }
})
let allchoicesofoppboxes=getallmoves(alloppboxes)

let a=0
for (let i = 0; i < allchoicesofoppboxes.length; i++){
    const e = allchoicesofoppboxes[i]
    if(e==checkmoves[0]){
    a==1    
    }
}
// for (let i = 0; i < allchoicesofoppboxes.length; i++){
//     const e = allchoicesofoppboxes[i].firstElementChild
//     if(srcoftarget.includes("150/b")){
//         e.setAttribute("src",e.getAttribute("src").split("150/")[0]+"wr.png")
//     }
//     if(srcoftarget.includes("150/w")){
//         e.setAttribute("src",e.getAttribute("src").split("150/")[0]+"br.png")
//     }
//     for (let i = 0; i < hoho.length; i++) {
//         const element = hoho[i]
//         if(element==kings[0] || element==kings[1]) checkmoves.push(element)
//         }
//     console.log(checkmoves)

// }
if(a!=1){
    for (let j = 0; j < choices.length; j++){
        let b=0
        const e = choices[j]
        for (let i = 0; i < allchoicesofwinboxes.length; i++){
            const element = allchoicesofwinboxes[i]
            if(e==element){
                b++
                break
            }
        }
        if(b==0) a++
    }
}

if(a==0) {
    soundeffect.src="notify.mp3"
    soundeffect.play()  
    boxes[indexofking].style.backgroundColor="red"
    clearInterval(control1)
    clearInterval(control2)
}
}
}

function reverseyellow(){
    console.log(yellow)
    yellow.forEach(e=>{
        let hoho=e.getAttribute('hii')        
        let index=e.getAttribute('index')
        console.log(hoho,index)        
    if(hoho=='rgb(115, 149, 82)') {boxes[index].style.backgroundColor='rgb(115, 149, 82)'}
    if(hoho=='rgb(235, 236, 208)') {boxes[index].style.backgroundColor='rgb(235, 236, 208)'}
    })
}
console.log(yellow)

function color(target,index,new2,index2){
    reverseyellow()
    if(target.style.backgroundColor=='rgb(115, 149, 82)') {target.setAttribute('hii','rgb(115, 149, 82)')}
    if(target.style.backgroundColor=='rgb(235, 236, 208)') {target.setAttribute('hii','rgb(235, 236, 208)')}
    target.setAttribute('index',index)
    target.style.backgroundColor='rgb(245, 246, 130)'

    if(new2.style.backgroundColor=='rgb(115, 149, 82)') {new2.setAttribute('hii','rgb(115, 149, 82)')}
    if(new2.style.backgroundColor=='rgb(235, 236, 208)') {new2.setAttribute('hii','rgb(235, 236, 208)')}
    new2.setAttribute('index',index2)
    new2.style.backgroundColor='rgb(185, 202, 67)'
    yellow=[target,new2]
}
function handlerookmove(f){
    let srcoftarget=targetevents[0].getAttribute('srcoftarget')
    let index=targetevents[0].getAttribute('index')
    let target=boxes[index]
    clearcontrol(srcoftarget)
    let new2=f.target.closest('.box')
    let index2=boxes.indexOf(new2)
    let hoho=rookmoves(index2,srcoftarget)
    reversegray()
    reverse()
    handlemove(f,target,srcoftarget,index)
    color(target,index,new2,index2)
    possiblemoves(srcoftarget,"r",hoho)
    removeevent(srcoftarget)
    targetevents.forEach(e=>{e.removeEventListener('click',handlerookmove)})
    play(srcoftarget)
}
function handlerooks(e){
  reversegray()
  reverse()
  let target=e.target.closest('.box')
  let srcoftarget=target.firstElementChild.getAttribute('src')
  let index=boxes.indexOf(target)
let rookchoices=rookmoves(index,srcoftarget)
console.log(rookchoices)
let rookoptions=filteroptions(rookchoices,srcoftarget)
console.log(rookoptions)
removetargetevent()
targetevents=rookoptions
targetevents[0].setAttribute('srcoftarget',srcoftarget)
targetevents[0].setAttribute('index',index)
targetevents.forEach(e=>{e.addEventListener('click',handlerookmove)})
}
function playrook(e){
    let Rooks=All.filter(e=>{
        if(e.getAttribute('src').includes("r.png")==true) return e
    })
    let rooks=reverseplayer(e,Rooks)
    rooks.forEach(e=>{
        e.addEventListener('click',handlerooks)
    })
}

function handlepawnmove(f){
    let srcoftarget=targetevents[0].getAttribute('srcoftarget')
    let index=targetevents[0].getAttribute('index')
    let target=boxes[index]
    clearcontrol(srcoftarget)
    let new2=f.target.closest('.box')
    let index2=boxes.indexOf(new2)
    let hoho=pawnmoves(index2,srcoftarget)
    reversegray()
    reverse()
    handlemove(f,target,srcoftarget)
    color(target,index,new2,index2)
    toqueen()
    possiblemoves(srcoftarget,"p",hoho)
    targetevents.forEach(e=>{e.removeEventListener('click',handlepawnmove)})
    removeevent(srcoftarget)
    play(srcoftarget) 
}

function handlepawns(e){
    reversegray()
    reverse()
    let target=e.target.closest('.box')
    let srcoftarget=target.firstElementChild.getAttribute('src')
    let index=boxes.indexOf(target)
let pawnoptions=pawnmoves(index,srcoftarget)
pawnoptions=filteroptions(pawnoptions,srcoftarget)  
console.log(pawnoptions)
removetargetevent()
targetevents=pawnoptions
targetevents[0].setAttribute('srcoftarget',srcoftarget)
targetevents[0].setAttribute('index',index)
targetevents.forEach(e=>{e.addEventListener('click',handlepawnmove)})
}

function playpawn(e){
    let Pawns=All.filter(e=>{
        if(e.getAttribute('src').includes("p.png")==true) return e
    })
    let pawns=reverseplayer(e,Pawns)
    pawns.forEach(e=>{
        e.addEventListener('click',handlepawns)
     })
}

function handlebishopmove(f){
    let srcoftarget=targetevents[0].getAttribute('srcoftarget')
    let index=targetevents[0].getAttribute('index')
    let target=boxes[index]
    clearcontrol(srcoftarget)
    let new2=f.target.closest('.box')
    let index2=boxes.indexOf(new2)
    let hoho=bishopmoves(index2,srcoftarget)
    reversegray()
    reverse()
    handlemove(f,target,srcoftarget)
    color(target,index,new2,index2)
    possiblemoves(srcoftarget,"b",hoho)
    removeevent(srcoftarget)
    targetevents.forEach(e=>{e.removeEventListener('click',handlebishopmove)})
    play(srcoftarget) 
}

function handlebishops(e){
    reversegray()
    reverse()
    let target=e.target.closest('.box')
    let srcoftarget=target.firstElementChild.getAttribute('src')
    let index=boxes.indexOf(target)
let bishopchoices=bishopmoves(index,srcoftarget)
console.log(bishopchoices)
reverse()
let bishopoptions=filteroptions(bishopchoices,srcoftarget)
removetargetevent()
targetevents=bishopoptions
targetevents[0].setAttribute('srcoftarget',srcoftarget)
targetevents[0].setAttribute('index',index)
targetevents.forEach(e=>{e.addEventListener('click',handlebishopmove)})
}

function playbishop(e){
    let Bishops=All.filter(e=>{
        if(e.getAttribute('src').includes("b.png")==true) return e
    })
    let bishops=reverseplayer(e,Bishops)
    bishops.forEach(e=>{
        e.addEventListener('click',handlebishops)
     })
}

function handlequeenmove(f){
    let srcoftarget=targetevents[0].getAttribute('srcoftarget')
    let index=targetevents[0].getAttribute('index')
    let target=boxes[index]
    clearcontrol(srcoftarget)
    let new2=f.target.closest('.box')
    let index2=boxes.indexOf(new2)
    let hoho=queenmoves(index2,srcoftarget)
    reversegray()
    reverse()
    handlemove(f,target,srcoftarget)
    color(target,index,new2,index2)
    possiblemoves(srcoftarget,"q",hoho)
    targetevents.forEach(e=>{e.removeEventListener('click',handlequeenmove)})
    removeevent(srcoftarget)
    play(srcoftarget) 
}

function handlequeens(e){
    reversegray()
    reverse()
    let target=e.target.closest('.box')
    let srcoftarget=target.firstElementChild.getAttribute('src')
    let index=boxes.indexOf(target)  
let queenoptions=queenmoves(index,srcoftarget)
queenoptions=filteroptions(queenoptions,srcoftarget)
console.log(queenoptions)
removetargetevent()
targetevents=queenoptions
targetevents[0].setAttribute('srcoftarget',srcoftarget)
targetevents[0].setAttribute('index',index)
targetevents.forEach(e=>{e.addEventListener('click',handlequeenmove)})
}

function playqueen(e){
    let Queens=All.filter(e=>{
        if(e.getAttribute('src').includes("q.png")==true) return e
    })
    let queens=reverseplayer(e,Queens)
    queens.forEach(e=>{
        e.addEventListener('click',handlequeens)
     })
}

function handleknightmove(f){
    let srcoftarget=targetevents[0].getAttribute('srcoftarget')
    let index=targetevents[0].getAttribute('index')
    let target=boxes[index]
    let new2=f.target.closest('.box')
    let index2=boxes.indexOf(new2)
    let hoho=knightmoves(index2,srcoftarget)
    clearcontrol(srcoftarget)
    reversegray()
    reverse()
    handlemove(f,target,srcoftarget)
    color(target,index,new2,index2)
    possiblemoves(srcoftarget,"k",hoho)
    targetevents.forEach(e=>{e.removeEventListener('click',handleknightmove)})
    removeevent(srcoftarget)
    play(srcoftarget) 
}

function handleknights(e){
    reversegray()
    reverse()
    let target=e.target.closest('.box')
    let srcoftarget=target.firstElementChild.getAttribute('src')
    let index=boxes.indexOf(target)
let knightoptions=knightmoves(index,srcoftarget)
knightoptions=filteroptions(knightoptions,srcoftarget)
console.log(knightoptions)
removetargetevent()
targetevents=knightoptions
targetevents[0].setAttribute('srcoftarget',srcoftarget)
targetevents[0].setAttribute('index',index)
targetevents.forEach(e=>{e.addEventListener('click',handleknightmove)})
}

function playknight(e){
    let Knights=All.filter(e=>{
        if(e.getAttribute('src').includes("n.png")==true) return e
    })
    let knights=reverseplayer(e,Knights)
    knights.forEach(e=>{
        e.addEventListener('click',handleknights)
     })
    }

function handlekingmove(f){
    let srcoftarget=targetevents[0].getAttribute('srcoftarget')
    let index=targetevents[0].getAttribute('index')
    let target=boxes[index]
    clearcontrol(srcoftarget)
    let new2=f.target.closest('.box')
    let index2=boxes.indexOf(new2)
    reversegray()
    reverse()
    handlemove(f,target,srcoftarget)
    color(target,index,new2,index2)
    targetevents.forEach(e=>{e.removeEventListener('click',handlekingmove)})
    removeevent(srcoftarget)
    play(srcoftarget) 
}

function handlekings(e){
    reversegray()
    reverse()
    let target=e.target.closest('.box')
    let srcoftarget=target.firstElementChild.getAttribute('src')
    let index=boxes.indexOf(target)
let kingoptions=kingmoves(index,srcoftarget)
removetargetevent()
targetevents=kingoptions
targetevents[0].setAttribute('srcoftarget',srcoftarget)
targetevents[0].setAttribute('index',index)
targetevents.forEach(e=>{e.addEventListener('click',handlekingmove)})
}

function playking(e){
    console.log(e)
    let Kings=All.filter(e=>{
        if(e.getAttribute('src').includes("k.png")==true) return e
    })
    let kings=reverseplayer(e,Kings)
    kings.forEach(e=>{
        e.addEventListener('click',handlekings)
     })
    }