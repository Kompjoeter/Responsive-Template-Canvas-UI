var subMenuActive =  document.querySelector(".sub-menu.active");

onload = function initialize()
{
    let c = document.getElementById('canvas');
    c.width = window.innerWidth;
    c.height = window.innerHeight;

    let ctx = c.getContext("2d");
    ctx.fillStyle = "#333";
    ctx.fillRect(0,0,c.width,c.height);

    subMenuActive.style.display = 'grid';
    subMenuNavDisplayActive();
    menuToggle();
    let slider = document.getElementsByClassName('slider');
    for(let i = 0; i < slider.length; i++)
    {
        displayValue(slider[i]);
    }
}

function menuToggle()
{
    let menu = document.getElementById('menu');
    let menuToggle = document.getElementById('menu-toggle');
    let subMenuNavToggle = document.getElementById('sub-menu-nav-toggle');
    let subMenuHolder = document.getElementById('sub-menu-holder');

    menu.classList.toggle('active');
    menuToggle.classList.toggle('active');

    if(menu.classList.contains('active'))
    {
        menuToggle.innerText = "△";
        subMenuNavToggle.style.display = 'initial';
        subMenuHolder.style.display = 'initial';
    }
    else
    {
        menuToggle.innerText = "▽";
        subMenuNavToggle.style.display = 'none';
        subMenuHolder.style.display = 'none';
    }
}

function subMenuNavToggle()
{
    let subMenuNav = document.getElementById('sub-menu-nav');
    let subMenuHolder = document.getElementById('sub-menu-holder');

    subMenuNav.classList.toggle('active');

    if (subMenuNav.classList.contains('active'))
    {
        subMenuNav.style.display = 'grid';
        subMenuHolder.style.padding = '1em';
        /*subMenuActive.style.display = 'none';*/
    }
    else
    {
        subMenuNav.style.display = 'none';
        subMenuHolder.style.padding = '1em';
        /*subMenuActive.style.display = 'grid';*/
    }

    subMenuNavDisplayActive();
}

function subMenuNavDisplayActive()
{
    //Display Active Sub-Menu on Sub-Menu-Nav-Toggle 
    let target = '.sub-menu-toggle[name='+subMenuActive.getAttribute('name')+']';
    let subMenuToggle = document.querySelector(target);
    let subMenuSymbol = '▽';

    if (document.getElementById('sub-menu-nav').classList.contains('active'))
    {
        subMenuSymbol = '△';
    }

    document.getElementById('sub-menu-nav-toggle').innerText = subMenuToggle.innerText +' '+subMenuSymbol;
}

function subMenuToggle(target)
{
    let selectorString = '.sub-menu[name='+target.name+']';
    let targetSubMenu = document.querySelector(selectorString);
    let subMenuToggleActive = document.querySelector('.sub-menu-toggle.active');

    subMenuToggleActive.classList.toggle('active');
    target.classList.toggle('active');
    subMenuActive.classList.toggle('active');
    targetSubMenu.classList.toggle('active');
    subMenuActive = targetSubMenu;

    subMenuNavDisplayActive();
    subMenuNavToggle();
}

function displayValue(target)
{
    let selectorString = '[for="'+target.id+'"]';
    selectorString.charAt(0).toUpperCase();
    document.querySelector(selectorString).innerHTML = target.getAttribute('displayName') +': '+ '<b>'+target.value+'</b>';
}