onload = function initialize()
{
    //Initialize Canvas
    let c = document.getElementById('canvas');
    c.width = window.innerWidth;
    c.height = window.innerHeight;

    let ctx = c.getContext("2d");
    ctx.fillStyle = "#333";
    ctx.fillRect(0,0,c.width,c.height);

    window.addEventListener("resize", function() 
    {
        replaceSubMenuNav();
        setMinHeightSubMenuHolder();
    });

    //Add Event Menu-Toggle (Hide/Show Main Menu) to Menu-Toggle Button.
    let menu = document.getElementById('menu-toggle');
    menu.addEventListener("click",function() 
    {
        //Hide/Show Main-Menu.
        toggleMenu(this);
    });

    //Add Event Sub-Menu-Navigator-Toggle (Hide/Show Sub-Menu Navigator) to Sub-Menu-Nav-Toggle Button.
    let subMenuNavToggle = document.getElementById('sub-menu-nav-toggle');
    subMenuNavToggle.addEventListener("click",function()
    {
        //Hide/Show Sub-Menu-Navigator.
        toggleSubMenuNav();
        //Display Active Sub-Menu in Sub-Menu-Nav-Toggle Button.
        displayChangeSubMenuNavToggle();
    });

    //Add Event Sub-Menu-Toggle (Navigation of Sub-Menus) to all Sub-Menu-Toggle Buttons.
    let subMenu = document.getElementsByClassName('sub-menu-toggle');
    for(let i = 0; i < subMenu.length; i++)
    {
        subMenu[i].addEventListener("click", function(){
            //Hide/Show Sub-Menu Function.
            toggleSubMenu(this);
            //Hide/Show Sub-Menu-Navigator.
            toggleSubMenuNav();
            //Display Active Sub-Menu in Sub-Menu-Nav-Toggle Button.
            displayChangeSubMenuNavToggle();
        });
    }

    //Input Elements
    let slider = document.getElementsByClassName('slider');
    for(let i = 0; i < slider.length; i++)
    {
        slider[i].addEventListener("input",function()
        {
            displayChangeInputRange(this);
        });
    }


    //Prepare for use
    replaceSubMenuNav();
    setMinHeightSubMenuHolder();
    displayChangeSubMenuNavToggle();
}

function setMinHeightSubMenuHolder()
{
    let menu = document.getElementById('menu');
    let subMenu = document.getElementsByClassName('sub-menu');
    let subMenuActive = document.querySelector('.sub-menu.active');
    let subMenuToggle = document.getElementsByClassName('sub-menu-toggle');
    let subMenuHolder = document.getElementById('sub-menu-holder');
    
    let isActive = menu.classList.contains('active');
    if (!isActive)
    {
        menu.classList.toggle('active');
        subMenuHolder.classList.toggle('active');
    }
    if (subMenuActive != null)
    {
        subMenuActive.classList.toggle('active');
    }

    let minHeight = 0;
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
    subMenuActive.classList.add('active');
    setStylePropertyOfElement(subMenuHolder,'minHeight',minHeight+"px");

    if (!isActive)
    {
        menu.classList.toggle('active');
        subMenuHolder.classList.toggle('active');
    }
}

function replaceSubMenuNav()
{
    let subMenuNav = document.getElementById('sub-menu-nav');
    let nav = document.getElementById('nav');
    let navPrison = document.getElementById('nav-prison');
    let subMenuToggle = document.querySelectorAll('.sub-menu-toggle');
    let subMenuNavToggle = document.getElementById('sub-menu-nav-toggle');

    if (window.innerWidth >= 768)    
    {
        navPrison.appendChild(subMenuNavToggle);

        for(let i = 0; i < subMenuToggle.length; i++)
        {
            nav.appendChild(subMenuToggle[i]);
        }
    }
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

function toggleSubMenuNav()
{
    let subMenuNav = document.getElementById('sub-menu-nav');
    //let subMenuToggleActive = document.querySelector(".sub-menu-toggle.active");

    //Toggle Sub-Menu-Nav and change display Icon on Sub-Menu-Nav-Toggle Button.
    subMenuNav.classList.toggle('active');
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
    }
}

//Display Input-Range Value on Label
function displayChangeInputRange(trigger)
{
    let selectorString = 'label[for="'+trigger.name+'"] span';
    let inputLabel = document.querySelector(selectorString);
    inputLabel.innerText = trigger.value;

}

//Display Active Sub-Menu and hide/shown Icon of Menu-Navigator.
function displayChangeSubMenuNavToggle()
{
    let subMenuNav = document.getElementById('sub-menu-nav');
    let subMenuNavToggle = document.getElementById('sub-menu-nav-toggle');
    let subMenuToggleActive = document.querySelector(".sub-menu-toggle.active");
    
    doThingWithClassIfContains(subMenuNav,'active',function() { setPropertyOfElement(subMenuNavToggle,'innerText',subMenuToggleActive.innerText +' △'); });
    doThingWithClassIfNotContains(subMenuNav,'active',function() { setPropertyOfElement(subMenuNavToggle,'innerText',subMenuToggleActive.innerText +' ▽'); });
}