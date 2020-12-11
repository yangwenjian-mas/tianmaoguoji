// 轮播图
const box = document.querySelector('.box')
const imgBox = document.querySelector('.imgBox')
const pointBox = document.querySelector('.pointBox')
const leftRightBox = document.querySelector('.leftRight')

const banner_width = box.clientWidth
let index = 1
let timer = 0
let flag = true

setPoint()
copyEle()
autoPlay()
overOut()
leftRight()
pointEvent()
change()

function setPoint(){

    const pointNum = imgBox.children.length

    const frg = document.createDocumentFragment()
    for(let i = 0; i < pointNum; i++){
        const li = document.createElement('li')
        li.setAttribute('page_index',i)
        if(i === 0)li.classList.add('active')
            frg.appendChild(li)
    }

    pointBox.appendChild(frg)

    pointBox.style.width = pointNum * (20 + 10) + 'px'
}

function copyEle(){
    const first = imgBox.firstElementChild.cloneNode(true)
    const last = imgBox.lastElementChild.cloneNode(true)

    imgBox.appendChild(first)
    imgBox.insertBefore(last,imgBox.firstElementChild)
    imgBox.style.width = imgBox.children.length * 100 + '%'
    imgBox.style.left = -banner_width + 'px'
}
function autoPlay(){
    timer = setInterval(() => {

        index++
        
        move(imgBox, { left: -index * banner_width},moveEnd)
    }, 2000)
}
function moveEnd(){
    if(index === imgBox.children.length - 1){
        index = 1
        imgBox.style.left = -index * banner_width + 'px'
    }

    if (index === 0) {
        
        index = imgBox.children.length - 2
        
        imgBox.style.left = -index * banner_width + 'px'
      }

      for (let i = 0; i < pointBox.children.length; i++) {
        pointBox.children[i].classList.remove('active')
      }
      pointBox.children[index - 1].classList.add('active')
    
      flag = true
    
}
function overOut() {
    box.addEventListener('mouseover', () => clearInterval(timer))
    box.addEventListener('mouseout', () => autoPlay())
    
  }
function leftRight() {
    leftRightBox.addEventListener('click', e => {
      e = e || window.event
      const target = e.target || e.srcElement

      if (target.className === 'left') {
        if (!flag) return

        index--

        move(imgBox, { left: -index * banner_width }, moveEnd)

        flag = false
      }
  
      if (target.className === 'right') {
        if (!flag) return

        index++

        move(imgBox, { left: -index * banner_width }, moveEnd)

        flag = false
      }
    })
  }
  
function pointEvent() {
    pointBox.addEventListener('click', e => {
      e = e || window.event
      const target = e.target || e.srcElement

      if (target.nodeName === 'LI') {
        if (!flag) return
  
        
        const page_index = target.getAttribute('page_index') - 0
  
        index = page_index + 1
  
        move(imgBox, { left: -index * banner_width }, moveEnd)
  
        flag = false
      }
    })
  }
function change() {
    document.addEventListener('visibilitychange', function () {
  
      const state = document.visibilityState
  
      if (state === 'hidden') {
    
        clearInterval(timer)
      }
  
      if (state === 'visible') {
        
        autoPlay()
      }
  
    })
  }
  




$(function () {
  // 登录
  const nickname = getCookie('nickname')

  if (nickname) {
    $('.off').addClass('hide')
    $('.on').removeClass('hide').text(`欢迎您: ${nickname}`)

  } else {

    $('.off').removeClass('hide')
    $('.on').addClass('hide')
  }

  // 
  function setCartNum() {

    const cart = JSON.parse(window.localStorage.getItem('cart')) || []

    if (!cart.length) {
      $('.cartNum').html('0')
      return
    }

  
    let count = 0
    cart.forEach(item => count += item.cart_number - 0)
    $('.cartNum').html(count)
  }


  $('.all').on('mouseenter','.padding',function(){
    $(this).find('.double').css('display','block')
  })
  $('.all').on('mouseleave','.padding',function(){
    $(this).find('.double').css('display','none')
  })
})




    const ul2 = document.querySelector('.data')
    const form = document.querySelector('.tm-logo > form')
    form.appendChild(ul2)

    const inp = document.querySelector('input')
    inp.addEventListener('input', function () {


      const value = this.value.trim()
      if (!value) {
        ul2.remove()
        return
      }


      const script = document.createElement('script')
      
      const url = `https://www.baidu.com/sugrec?pre=1&p=3&ie=utf-8&json=1&prod=pc&from=pc_web&sugsid=1446,32857,33124,33061,32973,33099,33101,32962,22159&wd=${value}&req=2&csor=1&cb=bindHtml&_=1605768936993`
      script.src = url
     
      document.body.appendChild(script)
      
      script.remove()
    })

   
    function bindHtml(res) {
      
      if (!res.g) {
        ul2.classList.remove('active')
        return
      }

    
      let str = ''

      for (let i = 0; i < res.g.length; i++) {
        str += `
          <li>${ res.g[i].q }</li>
        `
      }

      ul2.innerHTML = str
      ul2.classList.add('active')
    }
