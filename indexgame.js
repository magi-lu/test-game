const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576 

c.fillRect(0, 0, canvas.width, canvas.height)

const gravity = 0.5 
//場景
const background = new Sprite({
    position:{
        x:0,
        y:0
    },
    imageSrc: './img/back.png'
})
//測試
const test = new Sprite({
    position:{
        x:0,
        y:400
    },
    imageSrc: './img/1Ppose.png',
    scale: 1,
    framesMax: 4
})


    
//玩家
const player = new Fighter({
    position: {
        x: 0,
        y: 0
    },
    velocity: {
        x: 0,
        y: 0
    },
    offset:{
        x:0,
        y:0
    },
    imageSrc: './img/1Ppose.png',
    framesMax: 4,
    scale: 1.3,
    offset: {
        x:0,
        y:77
    },
    sprites:{
        pose:{
            imageSrc: './img/1Ppose.png',
            framesMax: 4,
        },
        move:{
            imageSrc: './img/1Pmove2.png',
            framesMax: 6,
        },
        jump:{
            imageSrc: './img/1Pjump.png',
            framesMax: 1,
        },
        fall:{
            imageSrc: './img/1Pjump.png',
            framesMax: 1,
        },
        attack:{
            imageSrc: './img/1Pattack.png',
            framesMax: 4,
        }
    }
})
//2P 
const enemy = new Fighter({
    position: {
        x: 400,
        y: 100
    },
    velocity: {
        x: 0,
        y: 0
    },
    color:'blue',
    offset:{
        x:-50,
        y:0

    },
    imageSrc: './img/2Ppose.png',
    framesMax: 4,
    scale: 1.3,
    offset: {
        x:0,
        y:77
    },
    sprites:{
        pose:{
            imageSrc: './img/2Ppose.png',
            framesMax: 4,
        },
        move:{
            imageSrc: './img/2Pmove.png',
            framesMax: 6,
        },
        jump:{
            imageSrc: './img/2Pjump.png',
            framesMax: 1,
        },
        fall:{
            imageSrc: './img/2Pjump.png',
            framesMax: 1,
        },
        attack:{
            imageSrc: './img/2Pattack.png',
            framesMax: 4,
        }
    }
})


console.log(player)

//鍵盤
const keys = {
    a:{
        pressed: false
    },
    d:{
        pressed: false
    },
    ArrowRight:{
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    }
}

decreaseTimer()
//動畫讀取
function animate() {
    window.requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
    background.update()


    enemy.update()
    player.update()



//玩家 2P 不動
    enemy.velocity.x = 0
    player.velocity.x = 0


//玩家動作
//移動
    if (keys.a.pressed && player.lastKey === 'a'){
        player.velocity.x  = -3
        player.switchSprite('move')
    }   
    else if (keys.d.pressed && player.lastKey ==='d'){
        player.velocity.x = 3
        player.switchSprite('move')
    }
    else {
        player.switchSprite('pose')
    }
//跳躍
    if(player.velocity.y < 0){
        player.switchSprite('jump')
    } else if (player.velocity.y > 0) {
        player.switchSprite('fall')
    }

//2P移動
    if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft'){
        enemy.velocity.x  = -3
        enemy.switchSprite('move')
    }   
    else if (keys.ArrowRight.pressed && enemy.lastKey ==='ArrowRight'){
        enemy.velocity.x = 3
        enemy.switchSprite('move')
    }
    else {
        enemy.switchSprite('pose')
    }
    if(enemy.velocity.y < 0){
       enemy.switchSprite('jump')
    } else if (enemy.velocity.y > 0) {
       enemy.switchSprite('fall')
    }
     

    //判定
    if (
        rectangularCollision({
            rectangle1: player ,
            rectangle2: enemy
        }) &&
//攻擊
        player.isAttacking
    ) {
        player.isAttacking = false
    //玩家攻擊2P扣血
        enemy.health -= 20
        document.querySelector('#enemyHealth').style.width = enemy.health + '%'
    }
//2P判定
if (
    rectangularCollision({
        rectangle1: enemy ,
        rectangle2: player
    }) &&
//2P攻擊
    enemy.isAttacking
){
    enemy.isAttacking = false
    player.health -= 20
    document.querySelector('#playerHealth').style.width = player.health + '%'    
    console.log('enemy attack')
}
//血量歸0判定
    if (enemy.health <= 0 || player.health <= 0 ){
        determineWinner({player, enemy ,timerld})
        setTimeout(REset, 3000)
        reset1()
    }
    
}
animate()

// 建立鍵盤操作
window.addEventListener('keydown', (Event) => {
//玩家
    switch (Event.key) {
      case 'd':
        keys.d.pressed = true
        player.lastKey = 'd'
        break
      case 'a':
        keys.a.pressed = true
        player.lastKey = 'a'
        break
      case 'w':
         player.velocity.y = -10
        break
      case ' ':
        player.attack()
        break
//2P
      case 'ArrowRight':
        keys.ArrowRight.pressed = true
        enemy.lastKey = 'ArrowRight'
        break
      case 'ArrowLeft':
        keys.ArrowLeft.pressed = true
        enemy.lastKey = 'ArrowLeft'
        break
      case 'ArrowUp':
         enemy.velocity.y = -10
        break
      case 'ArrowDown':
         enemy.attack()
        break
    }
})

window.addEventListener('keyup', (Event) => {
    //玩家
    switch (Event.key) {
        case 'd':
        keys.d.pressed = false
        break
        case 'a':
        keys.a.pressed = false
        break
    }   
    //2P
    switch (Event.key) {
        case 'ArrowRight':
        keys.ArrowRight.pressed = false
        break
        case 'ArrowLeft':
        keys.ArrowLeft.pressed = false
        break
    }           
    console.log(Event.key);
})
