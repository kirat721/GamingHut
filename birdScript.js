function check(player,obstacle){
    player = document.querySelector('.player');
    gameOver = document.querySelector('.gameOver');
    px = parseInt(window.getComputedStyle(player,null).getPropertyValue('left'));
    py = parseInt(window.getComputedStyle(player,null).getPropertyValue('top'));
    ox = parseInt(window.getComputedStyle(obstacle,null).getPropertyValue('left'));
    oy = parseInt(window.getComputedStyle(obstacle,null).getPropertyValue('top'));
       
    offsetX = Math.abs(px-ox);
    offsetY = Math.abs(py-oy);
    if((offsetX<75 && offsetY<75)){
        audioGameOver.play();
        audio.pause(); 
        setTimeout(()=>{
            audioGameOver.pause();
        },2000)
        button2 = document.querySelector('.button2');
        gameOver.classList.add('animateGameOver');
        button2.classList.add('animateGameOver');
        document.querySelector('.gameEnd').classList.add('animateGameOver');
        document.querySelector('.gameContainer').classList.add('blur');
        yourScore = document.querySelector('#yourScore');
        yourScore.classList.add('animateScore');
        cross = false;
        button2.addEventListener('click',()=>{
            location.reload();
        })
    }
}
button = document.querySelector('.button');
audio = new Audio("https://docs.google.com/uc?id=15Z45ekRiAPJJ6WyuKNzlNCUUN4nKRH2T");
audioGameOver = new Audio("https://docs.google.com/uc?id=1JzJotmI8oZHNF-hgPpoMg9S4LxdtBt-z");
button.addEventListener('click',()=>{
    obs = document.querySelectorAll('.obstacle');
    for(let i=0;i<obs.length;i++){
        obs[i].classList.add(`animateObstacle${i+1}`);
    }
    button.classList.add('animateButton');
    button.style.visibility="hidden";
    score = 0;
    cross = true;
    audio.play();
    document.querySelector('.gameContainer').classList.remove('blur');
    welcome = document.querySelector('.welcome');
    welcome.classList.add('animateWelcome');
    player = document.querySelector('.player');
    document.addEventListener('keydown',function(e){
        if(cross){
            if(e.code === 'ArrowUp'){
                player.classList.add('animatePlayer');
                setTimeout(()=>{
                    player.classList.remove('animatePlayer')
                },700);
            }
            if(e.code === 'ArrowRight'){
                px = parseInt(window.getComputedStyle(player,null).getPropertyValue('left'));
                player.style.left = px+100+"px";
                player.style.transform="scaleX(1)";
            }
            if(e.code === 'ArrowLeft'){
                px = parseInt(window.getComputedStyle(player,null).getPropertyValue('left'));
                player.style.left = px-100+"px";
                player.style.transform="scaleX(-1)";
            } 
        }
    });
    setInterval(()=>{
        obs.forEach(ob=> {
            check(player,ob);
        })
        if(cross){
            score+=1;
            yourScore = document.querySelector('#yourScore');
            yourScore.innerText = "Score: "+score;
        }
        else{
            for(let i=0;i<obs.length;i++){
                obs[i].style.left = window.getComputedStyle(obs[i],null).getPropertyValue('left');
                obs[i].classList.remove(`animateObstacle${i+1}`);
            }
        }
    }, 100);
    counter = 5000;
    level = 1;
    setInterval(()=>{
        counter = counter*2;
        level = level+1;
        obs.forEach(ob => {
            updateSpeed(player,ob);
        });
        yourScore = document.querySelector('#yourLevel');
        if(cross){
            yourScore.innerText = "Level: "+level;
        }   
    }
    ,counter)
});
function updateSpeed(player,obb){
    player_x = parseInt(window.getComputedStyle(player,null).getPropertyValue('left'));
    obstacle_x = parseInt(window.getComputedStyle(obb,null).getPropertyValue('left'));
    offset_x = player_x-obstacle_x;
        
    if(cross && (offset_x>=100)){
        aniDur = parseFloat(window.getComputedStyle(obb,null).getPropertyValue('animation-duration'));
        newDur = aniDur - 0.3;
        obb.style.animationDuration = newDur+"s";
        console.log('updated');
    }
}