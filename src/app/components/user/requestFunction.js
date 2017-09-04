export function fetchName(id,resource,value){
    try
    {
        let http = new XMLHttpRequest();
        let resourceName='';
        let url = 'http://localhost:3000/'+resource +"/"+id;
        http.open('GET', url,false);
        http.setRequestHeader("Content-Type", "application/json");
        http.onload = ()=> {
            if (http.readyState == 4 && http.status == 200){
                let data = JSON.parse(http.response);
                resourceName = data[value];
            }
        };
        http.send();
        return resourceName;
    }
    catch (error){}

}
export function checkBoxFavorite(checkedRouteId){
    let http = new XMLHttpRequest();
    let url = "http://localhost:3000/favorites?route=" + checkedRouteId;
    http.open('GET', url, false);
    http.setRequestHeader("Content-Type", "application/json");
    http.onload = () => {
        if (http.readyState == 4 && http.status == 200)
            if (JSON.parse(http.response) == '') {
                let url='http://localhost:3000/favorites';
                http.open("POST",url,false);
                http.setRequestHeader("Content-Type", "application/json");
                http.send(
                    JSON.stringify({
                        "route": checkedRouteId
                    })
                )
            }
            else{
                let data = JSON.parse(http.response);
                console.log(data);
                let url = 'http://localhost:3000/favorites/'+data[0].id;
                http.open("DELETE", url, false);
                http.setRequestHeader("Content-Type", "application/json");
                http.send(null);
            }
    };
    http.send();
}
export function RouteInfoDisplay(display) {
    if(display==false){
        document.getElementsByClassName('card')[0].style.opacity = '0';
        document.getElementsByClassName('card')[0].style.visibility = 'hidden';
        document.getElementsByClassName('card')[0].style.transition = 'opacity 0.3s, visibility 0s linear 0.3s';
    }
    else {
        document.getElementsByClassName('card')[0].style.opacity = '1';
        document.getElementsByClassName('card')[0].style.visibility = 'visible';
        document.getElementsByClassName('card')[0].style.transitionDelay = '0s';
    }
}
export function ViewRouteData(data) {
    let checkedRouteId=0,textRouteName="",textRouteDest="",
        textRouteLength=0,textRouteCategory="",centerMap={},
        markers=[],flightPlanCoordinates=[],favorite=false;
    let http = new XMLHttpRequest();
    let checked = false;
    let url = "http://localhost:3000/categories?id=" + data.category;
    http.open('GET', url, false);
    http.setRequestHeader("Content-Type", "application/json");
    http.onload = () => {
        if (http.readyState == 4 && http.status == 200)
            if (http.response != '') {
                let resourceList = JSON.parse(http.response);
                url = "http://localhost:3000/favorites?route=" + data.id;
                http.open('GET', url, false);
                http.setRequestHeader("Content-Type", "application/json");
                http.onload = () => {
                    if (http.readyState == 4 && http.status == 200){
                        if(JSON.parse(http.response)!='') checked=true;
                            checkedRouteId=data.id;
                            textRouteName=data.name;
                            textRouteDest=data.description;
                            textRouteLength=data.length;
                            textRouteCategory=resourceList[0].name;
                            centerMap=data.flightPlanCoordinates[0];
                            markers= data.markers;
                            flightPlanCoordinates= data.flightPlanCoordinates;
                            favorite= checked;
                    }
                };
                http.send();
            }
    };
    http.send();
    return {checkedRouteId,textRouteName,textRouteDest,
        textRouteLength,textRouteCategory,centerMap,
        markers,flightPlanCoordinates,favorite}
}