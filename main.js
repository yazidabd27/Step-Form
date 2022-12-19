// pagination

let options=Array.from(document.querySelectorAll('.sidebar .option'));
let steps=Array.from(document.querySelectorAll('.form .step'));
let next=document.querySelector('.buttons .next');
let prev=document.querySelector('.buttons .prev');
let format=document.querySelector('.bill .change');
let buttons=document.querySelector('.buttons');

let index=0;
let data;
let duration='Monthly';
let total=0;

next.onclick=()=>{
    
    if(index<3){
        index++;
        
        checkInputs();

        options.map((opt)=>opt.classList.remove('active'));
        options[index].classList.add('active');

        steps.map((step)=>step.classList.add('d-none'));
        steps[index].classList.remove('d-none');

        if(index>0){
            prev.classList.add('show');
        };

        collectData();
        
        if(index==3){
            addData();
            next.innerHTML='Confirm';
            next.classList.add('confirm');
        }
    }
    else if(index==3){
        steps.map((step)=>step.classList.add('d-none'));
        steps[4].classList.remove('d-none');
        buttons.classList.add('d-none');
    }
}

prev.onclick=()=>{
    if(index>0){
        index--;

        options.map((opt)=>opt.classList.remove('active'));
        options[index].classList.add('active');

        steps.map((step)=>step.classList.add('d-none'));
        steps[index].classList.remove('d-none');

        next.innerHTML='Next Step';
        next.classList.remove('confirm');

        if(index===0){
            prev.classList.remove('show');
        }
    }
}

format.onclick=()=>{
    index=1;

    options.map((opt)=>opt.classList.remove('active'));
    options[index].classList.add('active');

    steps.map((step)=>step.classList.add('d-none'));
    steps[index].classList.remove('d-none');

    next.innerHTML='Next Step';
    next.classList.remove('confirm');
}

// checkbox

let checkbox=document.querySelector('.switch input');
let mo=document.querySelector('.offer-duration .mo');
let ye=document.querySelector('.offer-duration .ye');
let monthly=Array.from(document.querySelectorAll('.price .monthly'));
let yearly=Array.from(document.querySelectorAll('.price .yearly'));

checkbox.onchange=()=>{
    if(checkbox.checked){
        // switch color between monthly and yearly 
        ye.classList.add('chosen');
        mo.classList.remove('chosen');

        // change price monthly/yearly display
        yearly.map((y)=>(y.classList.remove('d-none')));
        monthly.map((m)=>(m.classList.add('d-none')));
        duration='Yearly';
    }else{
        ye.classList.remove('chosen');
        mo.classList.add('chosen');
        
        yearly.map((y)=>(y.classList.add('d-none')));
        monthly.map((m)=>(m.classList.remove('d-none')));
        duration='Monthly';
    }
}

// step1

let inputs=document.querySelectorAll('.input');

function checkInputs(){
    inputs.forEach(input=>{
        if(input.children[1].value==''){
            input.classList.add('empty');
            index=0;
        }else{
            input.classList.remove('empty');
        }
    })
}

// step2

let plans=document.querySelectorAll('.offers .offer');

plans.forEach(plan=>{
    plan.onclick=()=>{
        plans.forEach(plan=>{
            plan.classList.remove('selected')
        })
        plan.classList.add('selected');
    };
});

// step3

let features=document.querySelectorAll('.features .feature');
let featureCheckbox=document.querySelectorAll('.step-3 input');


featureCheckbox.forEach((cbox, idx)=>{
    cbox.onchange=()=>{
        if(cbox.checked==true){
            features[idx].classList.add('selected');
        }else{
            features[idx].classList.remove('selected');
        }
    }
})

// collect data


function collectData(){
    let selectedPlanName=document.querySelector('.offers .selected .offer-title');
    let selectedPlanPrice=document.querySelector('.offers .selected .price div:not(.d-none)');
    let selectedFeature=document.querySelectorAll('.features .selected');

    data={
        planName:selectedPlanName,
        planPrice:selectedPlanPrice,
        Features:selectedFeature
    };
};

// step4

function addData(){
    let planName=document.querySelector('.bill .plan-name .name');
    let planPrice=document.querySelector('.bill .plan-price');
    let addedFeatures=document.querySelector('.bill .added-features');
    addedFeatures.innerHTML='';
    total=0;
    total+=parseInt(data.planPrice.getAttribute('data-price'));

    planName.innerHTML=`${data.planName.textContent}(${duration})`;
    planPrice.innerHTML=data.planPrice.textContent.replace('2 months free', '');

    data.Features.forEach(feature=>{
        div=document.createElement('div');
        div.className='feature'

        featureName=document.createElement('span');
        featureName.className='feature-name';
        featureName.appendChild(document.createTextNode(feature.querySelector('.feature-name').textContent));

        featurePrice=document.createElement('span');
        featurePrice.className='feature-price';
        featurePrice.appendChild(document.createTextNode(feature.querySelector('.price span:not(.d-none)').textContent));

        total+=parseInt(feature.querySelector('.price span:not(.d-none)').getAttribute('data-price'));
        
        div.appendChild(featureName);
        div.appendChild(featurePrice);

        addedFeatures.appendChild(div);
    })

    // total 
    let totalPrice=document.querySelector('.total .total-price');

    if(duration=='Yearly'){
        document.querySelector('.total .per-month').classList.add('d-none');
        document.querySelector('.total .per-year').classList.remove('d-none');
        totalPrice.innerHTML=`$${total}/yr`;
    }else{
        document.querySelector('.total .per-month').classList.remove('d-none');
        document.querySelector('.total .per-year').classList.add('d-none');
        totalPrice.innerHTML=`$${total}/mo`;
    }
}





