'use strict'


document.addEventListener('DOMContentLoaded', () => {
    if(!(localStorage.getItem('counter'))){
        const counterObject = {
            count: 10
        }
        localStorage.setItem('counter', JSON.stringify(counterObject));
    }


    const animation = document.getElementById('lottie-birds-animation');
    const anim = lottie.loadAnimation({
        container: animation,
        renderer: 'svg',
        loop: false,
        autoplay: true,
        path: '../lottie_flying_birds.json'
    });

    anim.addEventListener('complete', () => {
        setTimeout(() => {
            console.log('replay');
            anim.goToAndPlay(0, true);
        }, 7500); 
    });






    render_count_on_page();

    const decrementButton = document.getElementById('dec');
    decrementButton.addEventListener('click', () => {
        const current = get_current_count();
        update_local_storage(current - 1);
        render_count_on_page();
    });


    const resetButton = document.getElementById('reset');
    resetButton.addEventListener('click', () => {
        update_local_storage(10);
        render_count_on_page();
    });
})




const get_current_count = function(){
    const current = JSON.parse(localStorage.getItem('counter')).count;
    return current;
}




const update_local_storage = function(newCount){
    const counterObject = {
        count: newCount
    }
    localStorage.setItem('counter', JSON.stringify(counterObject));
}

const render_count_on_page = function(){
    let count = JSON.parse(localStorage.getItem('counter')).count;
    const textElement = document.getElementById('counter');
    textElement.textContent = count;
}