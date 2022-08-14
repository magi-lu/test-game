function rectangularCollision({ rectangle1, rectangle2 }) {
    return (
        rectangle1.attackBox.position.x + 
        rectangle1.attackBox.width >= 
        rectangle2.position.x && 
    
        rectangle1.attackBox.position.x <=
        rectangle2.position.x +
        rectangle2.width &&
    
        rectangle1.attackBox.position.y + 
        rectangle1.attackBox.height >= 
        rectangle2.position.y &&
    
        rectangle1.attackBox.position.y <= 
        rectangle2.position.y + 
        rectangle2.height 
    )
}
//勝負判定
function determineWinner({player, enemy , timerld }) {
    clearTimeout(timerld)
    document.querySelector('#displayText').style.display = 'flex'
    if(player.health === enemy.health){
      document.querySelector('#displayText').innerHTML = 'Tie'
      } 
      else if (player.health > enemy.health) {
      document.querySelector('#displayText').innerHTML = 'Player 1 Win'
      }
      else if (player.health < enemy.health) {
      document.querySelector('#displayText').innerHTML = 'Player 2 Win'
      }
}
//時間判定
let timer = 60
let timerld
function decreaseTimer(){

    if (timer > 0) { 
    timerld = setTimeout(decreaseTimer, 1000)
    timer--
    document.querySelector('#timer').innerHTML = timer
    document.getElementById('timer').style.fontSize = '50px';
    document.getElementById('timer').style.textShadow = "2px 2px 1px White"
}   

    if (timer === 0){

    determineWinner({player, enemy, timerld})
    setTimeout(REset, 3000)
    reset1()
   }
}
//重整
function REset(){
    location.reload()
}
function reset1(){
    document.querySelector('#reset1').style.display = 'flex'
    document.querySelector('#reset1').innerHTML = '3秒後自動重新整理'
    document.getElementById('#reset1').style.fontSize = '30px'
    document.getElementById('#reset1').style.textShadow = "2px 2px 1px Black"
}
