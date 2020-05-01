onload = function initialize()
{
    //Initialize Canvas
    let c = document.getElementById('canvas');
    c.width = window.innerWidth;
    c.height = window.innerHeight;

    let ctx = c.getContext("2d");
    ctx.fillStyle = "#333";
    ctx.fillRect(0,0,c.width,c.height);

    resizing();
    setMinHeightSubMenuHolder();
    displayChangeSubMenuNavToggle();
}

window.addEventListener("resize", resizing);

function resizing()
{

    let subMenuNav = document.getElementById('sub-menu-nav');

    let nav = document.getElementById('nav');
    let navPrison = document.getElementById('nav-prison');
    if (window.innerWidth >= 768)    
    {
        let subMenuToggle = document.querySelectorAll('.sub-menu-toggle');
        let subMenuNavToggle = document.getElementById('sub-menu-nav-toggle');

        navPrison.appendChild(subMenuNavToggle);

        for(let i = 0; i < subMenuToggle.length; i++)
        {
            nav.appendChild(subMenuToggle[i]);
        }
    }
    else if (window.innerWidth < 768)
    {
        let subMenuToggle = document.querySelectorAll('.sub-menu-toggle');
        let subMenuNavToggle = document.getElementById('sub-menu-nav-toggle');

        nav.appendChild(subMenuNavToggle);

        for(let i = 0; i < subMenuToggle.length; i++)
        {
            subMenuNav.appendChild(subMenuToggle[i]);
        }
    }
}

function setMinHeightSubMenuHolder()
{
    let subMenuHolder = document.getElementById('sub-menu-holder');
    let menuToggleButton = document.getElementById('menu-toggle');
    let isActive = subMenuHolder.classList.contains('active');
    if (!isActive)
    {
        subMenuHolder.classList.toggle('active');
    }

    //Find 'heighest' Sub-Menu ((REDO IN OWN FUNCTION))
    let subMenu = document.getElementsByClassName('sub-menu');
    let  subMenuMaxHeight = 0;
    for(let i = 0; i < subMenu.length; i++)
    {
        if(subMenu[i].offsetHeight > subMenuMaxHeight)
        {
            subMenuMaxHeight = subMenu[i].offsetHeight;
        }
    }
    //Set Sub-Menu-Holder min-height to heighest Sub-Menu's height
    subMenuHolder.style["minHeight"] = subMenuMaxHeight + "px";

    if (!isActive)
    {
        subMenuHolder.classList.toggle('active');
    }
}

function toggleMenu(trigger)
{
    let menu = document.getElementById('menu');
    let subMenuHolder = document.getElementById('sub-menu-holder');
    let subMenuNav = document.getElementById('sub-menu-nav');
    let nav = document.getElementById('nav');

    //Toggle hide/show for Menu and Sub-Menu-Holder
    menu.classList.toggle('active');
    subMenuHolder.classList.toggle('active');

    //If Menu is hidden, make Sub-Menu-Nav inactive (hidden).
    doThingWithClassIfNotContains(menu,'active',function() { subMenuNav.classList.remove('active')});

    //If Menu is hidden or shown, hide/show Sub-Menu-Nav-Toggle Button
    doThingWithClassIfContains(menu,'active',function() { setStylePropertyOfElement(nav,'display','inline-block'); });
    doThingWithClassIfNotContains(menu,'active',function() { setStylePropertyOfElement(nav,'display','none'); });

    //If Menu is hidden or shown, display correct Icon on Menu-Toggle Button.
    doThingWithClassIfContains(menu,'active',function() { setPropertyOfElement(trigger,'innerText','△'); });
    doThingWithClassIfNotContains(menu,'active',function() { setPropertyOfElement(trigger,'innerText','▽'); });
}

function toggleSubMenuNav(trigger)
{
    let subMenuNav = document.getElementById('sub-menu-nav');
    let subMenuToggleActive = document.querySelector(".sub-menu-toggle.active");

    //Toggle Sub-Menu-Nav and change display Icon on Sub-Menu-Nav-Toggle Button.
    subMenuNav.classList.toggle('active');
    displayChangeSubMenuNavToggle();
}

function toggleSubMenu(trigger)
{
    let subMenuActive = document.querySelector(".sub-menu.active");

    //If pressed Sub-Menu-Toggle does not equal active Sub-Menu,
    //change active Sub-Menu-Toggle and Sub-Menu.
    if (trigger.name != subMenuActive.name)
    {
        let subMenuToggleActive = document.querySelector(".sub-menu-toggle.active");

        subMenuActive.classList.toggle('active');
        subMenuToggleActive.classList.toggle('active');

        let selectorString = '.sub-menu[name='+trigger.name+']';
        let subMenuTarget = document.querySelector(selectorString);

        subMenuTarget.classList.toggle('active');
        trigger.classList.toggle('active');

        //Change Sub-Menu-Nav-Toggle innerText to Active Sub-Menu.
        displayChangeSubMenuNavToggle();
    }
    toggleSubMenuNav();
}

function displayChangeInputRange(trigger)
{
    let selectorString = 'label[for="'+trigger.name+'"] span';
    let inputLabel = document.querySelector(selectorString);
    inputLabel.innerText = trigger.value;

}

function displayChangeSubMenuNavToggle()
{
    let subMenuNav = document.getElementById('sub-menu-nav');
    let subMenuNavToggle = document.getElementById('sub-menu-nav-toggle');
    let subMenuToggleActive = document.querySelector(".sub-menu-toggle.active");
    
    //Display the active Sub-Menu on the Sub-Menu-Nav-Toggle Button. If Sub-Menu-Nav not active, display different Icon.
    doThingWithClassIfContains(subMenuNav,'active',function() { setPropertyOfElement(subMenuNavToggle,'innerText',subMenuToggleActive.innerText +' △'); });
    doThingWithClassIfNotContains(subMenuNav,'active',function() { setPropertyOfElement(subMenuNavToggle,'innerText',subMenuToggleActive.innerText +' ▽'); });
}