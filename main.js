'use strict'


document.addEventListener('DOMContentLoaded', () => {
    initialize_storage_check();

    render_count_on_page();

    decrement_this_dash_functoinality();

    reset_this_dash_functionality();

    reset_each_category_functionality();

    birds_animation_functionality();

});


const reset_this_dash_functionality = function(){
    const resetButton = document.getElementById('reset');
    resetButton.addEventListener('click', () => {
        if(confirm("Are you sure you want to reset your current dash progress?")){
            const current = get_current_counts();
            update_local_storage(10, current.daily, current.weekly, current.monthly);
            render_count_on_page();
        }
    });
}


const decrement_this_dash_functoinality = function(){
    const decrementButton = document.getElementById('dec');
    decrementButton.addEventListener('click', () => {
        const current = get_current_counts();
        if(current.thisDash >= 1){
            update_local_storage(current.thisDash - 1, current.daily + 1, current.weekly + 1, current.monthly + 1);
            render_count_on_page();
        }
        
    });
}


const initialize_storage_check = function(){
    if(!(localStorage.getItem('counter'))){     //* setting count to 10 initially if storage is empty
        const counterObject = {
            thisDash: 10,
            daily: 0,
            weekly: 0,
            monthly: 0
        }
        localStorage.setItem('counter', JSON.stringify(counterObject));
    }
}


const birds_animation_functionality = function(){
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

}


const reset_each_category_functionality = function(){
    const dailyReset = document.getElementById('daily-reset');
    const weeklyReset = document.getElementById('weekly-reset');
    const monthlyReset = document.getElementById('monthly-reset');
    dailyReset.addEventListener("click", () => update_a_single_category("daily"));
    weeklyReset.addEventListener("click", () =>  update_a_single_category("weekly"));
    monthlyReset.addEventListener("click", () =>  update_a_single_category("monthly"));

}


const get_current_counts = function(){
    console.log(localStorage.getItem('counter'));
    return JSON.parse(localStorage.getItem('counter'));
}


const update_local_storage = function(newCount, newDaily, newWeekly, newMonthly){
    const counterObject = {
        thisDash: newCount,
        daily: newDaily,
        weekly: newWeekly,
        monthly: newMonthly
    }
    localStorage.setItem('counter', JSON.stringify(counterObject));
}


const render_count_on_page = function(){
    let current = JSON.parse(localStorage.getItem('counter'));

    const textElement = document.getElementById('counter');
    const daily = document.getElementById('daily');
    const weekly = document.getElementById('weekly');
    const monthly = document.getElementById('monthly');


    textElement.textContent = current.thisDash;
    daily.textContent = current.daily;
    weekly.textContent = current.weekly;
    monthly.textContent = current.monthly;
}


const update_a_single_category = function(category){
    if(confirm("Are you sure about reseting this category?")){
        const current = JSON.parse(localStorage.getItem("counter"));
        current[category] = 0;
    
        localStorage.setItem("counter", JSON.stringify(current));
    
        render_count_on_page();
    }
}