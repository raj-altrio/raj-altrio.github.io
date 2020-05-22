function toggleMenu(open) {
    const fullScreenMenu = document.getElementById("full-screen-menu")
    const logo = document.getElementById("logo")
    const altLogo = document.getElementById("alt-logo")
    const pageContainer = document.getElementById("page-container")

    fullScreenMenu.style.width = open ? "100vw" : "0"

    if (open) {
        pageContainer.classList.add("menu-open")
        setTimeout(() => {
            logo.classList.add("hidden")
            altLogo.classList.remove("hidden")
        }, 200)
        
    } else {
        setTimeout(() => {
            logo.classList.remove("hidden")
            altLogo.classList.add("hidden")
        },50)

        pageContainer.classList.remove("menu-open")        
    }
}


function showRequestDemo() {
    console.log("here")
    toggleMenu(false)
    document.getElementById("page-container").classList.add("menu-open")
    document.getElementById("demo-modal-container").classList.add("active")
}

function hideRequestDemo() {
    document.getElementById("page-container").classList.remove("menu-open")
    document.getElementById("demo-modal-container").classList.remove("active")
}

$(".request-demo").on("click", showRequestDemo)

let activeHighlight = 1

function setActiveHighlight(index) {
    [1,2,3].filter(i => i != index).forEach(i => {
        $(`.highlight-${i}`).removeClass("active")
        $(`#dot-${i}`).removeClass("active")
    })

    $(`.highlight-${index}`).addClass("active")
    $(`#dot-${index}`).addClass("active")

    activeHighlight = index
}

for (const i of [1,2,3]) {
    $(`#dot-${i}`).on("click", () => setActiveHighlight(i))
}

function nextActiveHighlight() {
    setActiveHighlight(activeHighlight === 3 ? 1 : activeHighlight + 1)
}

function prevActiveHighlight() {
    setActiveHighlight(activeHighlight === 1 ? 3 : activeHighlight - 1)
}

$(".highlight-item").on("click", nextActiveHighlight)

const highlightItemsEl = document.getElementById("highlight-items")

if (highlightItemsEl) {
    swipedetect(highlightItemsEl, swipedir => {
        if (swipedir === "left") {
            nextActiveHighlight()
        } else if (swipedir === "right") {
            prevActiveHighlight()
        }
    })
}

function swipedetect(el, callback = () => {}){  
    var touchsurface = el,
    swipedir,
    startX,
    startY,
    distX,
    distY,
    threshold = 50, //required min distance traveled to be considered swipe
    restraint = 100, // maximum distance allowed at the same time in perpendicular direction
    allowedTime = 1000, // maximum time allowed to travel that distance
    elapsedTime,
    startTime
  
    touchsurface.addEventListener('touchstart', function(e){
        var touchobj = e.changedTouches[0]
        swipedir = 'none'
        dist = 0
        startX = touchobj.pageX
        startY = touchobj.pageY
        startTime = new Date().getTime() // record time when finger first makes contact with surface
        //e.preventDefault()
    }, false)
  
    touchsurface.addEventListener('touchend', function(e){
        var touchobj = e.changedTouches[0]
        distX = touchobj.pageX - startX // get horizontal dist traveled by finger while in contact with surface
        distY = touchobj.pageY - startY // get vertical dist traveled by finger while in contact with surface
        elapsedTime = new Date().getTime() - startTime // get time elapsed
        if (elapsedTime <= allowedTime){ // first condition for awipe met
            if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint){ // 2nd condition for horizontal swipe met
                swipedir = (distX < 0)? 'left' : 'right' // if dist traveled is negative, it indicates left swipe
            }
            else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint){ // 2nd condition for vertical swipe met
                swipedir = (distY < 0)? 'up' : 'down' // if dist traveled is negative, it indicates up swipe
            }
        }
        callback(swipedir)
        //e.preventDefault()
    }, false)
}
