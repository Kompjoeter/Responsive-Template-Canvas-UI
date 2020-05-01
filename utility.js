onresize = function loading()
{
    let menu = document.getElementById('menu-toggle');
        doThingWithClassIfContains(menu,'active',setStylePropertyOfElement,menu,'backgroundColor','red');
}

function setPropertyOfElement(element,property,value)
{
    element[property] = value;
}

function setStylePropertyOfElement(element,property,value)
{
    element.style[property] = value;
}

function doThingWithClassIfContains(element,className,callback)
{
    if (element.classList.contains(className))
    {
        callback();
    }
}

function doThingWithClassIfNotContains(element,className,callback)
{
    if (!element.classList.contains(className))
    {
        callback();
    }
}