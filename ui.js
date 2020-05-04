onload = function initialize()
{
    //Initialize Canvas
    let c = document.getElementById('canvas');
    c.width = window.innerWidth;
    c.height = window.innerHeight;

    let ctx = c.getContext("2d");
    ctx.fillStyle = "#333";
    ctx.fillRect(0,0,c.width,c.height);

    //Add trigger functions for when Window is resized.
    window.addEventListener("resize", function() 
    {
        replaceSubMenuNav();
        setMinHeightSubMenuHolder();
    });

    //Add trigger functions for when Menu Button is pressed.
    let menuToggle = document.getElementById('menu-toggle');
    menuToggle.addEventListener("click",function() 
    {
        toggleMenu(this);
    });

    //Add trigger functions for when Sub-Menu-Navigator Toggle is pressed.
    let subMenuNavToggle = document.getElementById('sub-menu-nav-toggle');
    subMenuNavToggle.addEventListener("click",function()
    {
        toggleSubMenuNav();
        displayChangeSubMenuNavToggle();
    });

    //Add trigger functions for when Sub-Menu Button is pressed.
    let subMenu = document.getElementsByClassName('sub-menu-toggle');
    for(let i = 0; i < subMenu.length; i++)
    {
        subMenu[i].addEventListener("click", function(){
            toggleSubMenu(this);
            toggleSubMenuNav();
            displayChangeSubMenuNavToggle();
        });
    }

    //INPUT ELEMENTS
    //Add trigger functions for when Input-Range has input.
    let slider = document.getElementsByClassName('slider');
    for(let i = 0; i < slider.length; i++)
    {
        slider[i].addEventListener("input",function()
        {
            displayChangeInputRange(this);
        });
    }

    //Initialize Menu
    replaceSubMenuNav();
    setMinHeightSubMenuHolder();
    displayChangeSubMenuNavToggle();
}

function setMinHeightSubMenuHolder()
{
    let menu = document.getElementById('menu');
    let subMenu = document.getElementsByClassName('sub-menu');
    let subMenuActive = document.querySelector('.sub-menu.active');
    let subMenuHolder = document.getElementById('sub-menu-holder');
    let isActive = menu.classList.contains('active');

    //If hidden, show Nenu and Sub-Menu 'container', so properties can be substracted.
    if (!isActive)
    {
        menu.classList.add('active');
        subMenuHolder.classList.add('active');
    }

    let minHeight = 0;
    //Before looping through all Sub-Menus, make sure none is active.
    subMenuActive.classList.remove('active');
    //Activate all Sub-Menus one by one, get the heighest height value, store it.
    for(let i = 0; i < subMenu.length; i++)
    {
        subMenu[i].classList.toggle('active');
        if (subMenu[i].clientHeight > minHeight)
        {
            minHeight = subMenu[i].clientHeight;
            console.log(minHeight);
        }
        subMenu[i].classList.toggle('active');
    }
    //Re-activate sub-menu that was initially active.
    subMenuActive.classList.add('active');
    //Set min-height of sub-menu wrapper to value of highest sub-menu.
    setStylePropertyOfElement(subMenuHolder,'minHeight',minHeight+"px");

    //If originally hidden, hide Menu and Sub-Menu 'container' again.
    if (!isActive)
    {
        menu.classList.remove('active');
        subMenuHolder.classList.remove('active');
    }
}

function replaceSubMenuNav()
{
    let subMenuNav = document.getElementById('sub-menu-nav');
    let nav = document.getElementById('nav');
    let navPrison = document.getElementById('nav-prison');
    let subMenuToggle = document.querySelectorAll('.sub-menu-toggle');
    let subMenuNavToggle = document.getElementById('sub-menu-nav-toggle');

    //When window is equal or higher than 768 pixels,
    //display Sub-Menu Buttons in Menu Bar.
    if (window.innerWidth >= 768)    
    {
        navPrison.appendChild(subMenuNavToggle);

        for(let i = 0; i < subMenuToggle.length; i++)
        {
            nav.appendChild(subMenuToggle[i]);
        }
    }
    //When window is lower than 768,
    //display Sub-Menu Buttons in Dropdown Menu.
    else if (window.innerWidth < 768)
    {
        nav.appendChild(subMenuNavToggle);

        for(let i = 0; i < subMenuToggle.length; i++)
        {
            subMenuNav.appendChild(subMenuToggle[i]);
        }
    }
}

function toggleMenu(trigger)
{
    let menu = document.getElementById('menu');
    let subMenuHolder = document.getElementById('sub-menu-holder');
    let subMenuNav = document.getElementById('sub-menu-nav');
    let nav = document.getElementById('nav');

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

function toggleSubMenuNav()
{
    let subMenuNav = document.getElementById('sub-menu-nav');
    subMenuNav.classList.toggle('active');
}

function toggleSubMenu(trigger)
{
    let subMenuActive = document.querySelector(".sub-menu.active");

    //If pressed and Sub-Menu-Toggle does not equal active Sub-Menu,
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
    }
}

function displayChangeInputRange(trigger)
{
    let selectorString = 'label[for="'+trigger.name+'"] span';
    let inputLabel = document.querySelector(selectorString);
    //Display Input-Range Value on it's Label.
    inputLabel.innerText = trigger.value;

}


function displayChangeSubMenuNavToggle()
{
    let subMenuNav = document.getElementById('sub-menu-nav');
    let subMenuNavToggle = document.getElementById('sub-menu-nav-toggle');
    let subMenuToggleActive = document.querySelector(".sub-menu-toggle.active");
    
    //Display Active Sub-Menu and hide/shown Icon on Sub-Menu-Navigator Button.
    doThingWithClassIfContains(subMenuNav,'active',function() { setPropertyOfElement(subMenuNavToggle,'innerText',subMenuToggleActive.innerText +' △'); });
    doThingWithClassIfNotContains(subMenuNav,'active',function() { setPropertyOfElement(subMenuNavToggle,'innerText',subMenuToggleActive.innerText +' ▽'); });
}