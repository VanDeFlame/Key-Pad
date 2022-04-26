class Keys {
    constructor(k, t, u)
    {
        this.key = k;
        this.type = t;
        this.url = u;
    }
}
const abc = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
let keyAction = [];

//HTML generator
for(let i of abc) {
    let list = document.getElementById('key--list')
    list.innerHTML += 
        `<li class='keys'>
            <span class='keys--letter'>${i}</span>
            <input class='keys--type' list='Options' placeholder='action'>
            <input class='keys--url' type='url' placeholder='audio url'>
            <button class='keys--button' onclick='console.log($(this).parent())'>Test</button>
        </li>`;

    //A example
    document.getElementById('a-type').setAttribute('value', 'audio');
    document.getElementById('a-url').setAttribute('value', "https://www.myinstants.com/media/sounds/usada-pekora-rise-of-usada-construction-5m52.mp3");
}

//Set actions
document.getElementById('set-actions').addEventListener('click', getActions);
function getActions () {
    for(i of abc) {
        //console.log(i);
        let kType = document.getElementById(i+'-type').value;
        let kUrl = document.getElementById(i+'-url').value;
        document.getElementById(i+'-type').setAttribute('value', kType);

        keyAction[i] = new Keys(i, kType, kUrl);
        //console.log(keyAction[i]);
    }
}



//list of actions
function actions (kI) {
    switch (keyAction[kI].type) {
        case 'audio':
            playAudio(kI);
            break;
        case 'stop':
            audio.pause();
            break;
    }   
}

//type audio
let audio = new Audio;

function playAudio (kI) {
    audio.pause();
    audio = new Audio(keyAction[kI].url);
    audio.play();
}

document.getElementById('stop').addEventListener('click', () => audio.pause());

//keyboard event listener
let keyLogger = document.getElementById('key-logger');
keyLogger.addEventListener('click', activeKeyLogger);

function activeKeyLogger ()
{
    if (keyLogger.className == 'header--button')
    {
        keyLogger.className = 'header--button active';
    }
    else {
        keyLogger.className = 'header--button';
    }
    //console.log(keyLogger.className);
}

document.addEventListener('keypress', kP => {
    let kI = kP.key;
    if (keyLogger.className == 'header--button active') 
    {
        actions(kI)
    }
})

//test button event listener (Si alguien lee esto, lo sé, es un horror, pero no sé cómo hacerlo sino XD)
// {
//     document.getElementById('a-test').addEventListener('click', kB => {let kI = kB.path[0].id[0]; actions(kI)});
//     document.getElementById('b-test').addEventListener('click', kB => {let kI = kB.path[0].id[0]; actions(kI)});
//     document.getElementById('c-test').addEventListener('click', kB => {let kI = kB.path[0].id[0]; actions(kI)});
//     document.getElementById('d-test').addEventListener('click', kB => {let kI = kB.path[0].id[0]; actions(kI)});
//     document.getElementById('e-test').addEventListener('click', kB => {let kI = kB.path[0].id[0]; actions(kI)});
//     document.getElementById('f-test').addEventListener('click', kB => {let kI = kB.path[0].id[0]; actions(kI)});
//     document.getElementById('g-test').addEventListener('click', kB => {let kI = kB.path[0].id[0]; actions(kI)});
//     document.getElementById('h-test').addEventListener('click', kB => {let kI = kB.path[0].id[0]; actions(kI)});
//     document.getElementById('i-test').addEventListener('click', kB => {let kI = kB.path[0].id[0]; actions(kI)});
//     document.getElementById('j-test').addEventListener('click', kB => {let kI = kB.path[0].id[0]; actions(kI)});
//     document.getElementById('k-test').addEventListener('click', kB => {let kI = kB.path[0].id[0]; actions(kI)});
//     document.getElementById('l-test').addEventListener('click', kB => {let kI = kB.path[0].id[0]; actions(kI)});
//     document.getElementById('m-test').addEventListener('click', kB => {let kI = kB.path[0].id[0]; actions(kI)});
//     document.getElementById('n-test').addEventListener('click', kB => {let kI = kB.path[0].id[0]; actions(kI)});
//     document.getElementById('o-test').addEventListener('click', kB => {let kI = kB.path[0].id[0]; actions(kI)});
//     document.getElementById('p-test').addEventListener('click', kB => {let kI = kB.path[0].id[0]; actions(kI)});
//     document.getElementById('q-test').addEventListener('click', kB => {let kI = kB.path[0].id[0]; actions(kI)});
//     document.getElementById('r-test').addEventListener('click', kB => {let kI = kB.path[0].id[0]; actions(kI)});
//     document.getElementById('s-test').addEventListener('click', kB => {let kI = kB.path[0].id[0]; actions(kI)});
//     document.getElementById('t-test').addEventListener('click', kB => {let kI = kB.path[0].id[0]; actions(kI)});
//     document.getElementById('u-test').addEventListener('click', kB => {let kI = kB.path[0].id[0]; actions(kI)});
//     document.getElementById('v-test').addEventListener('click', kB => {let kI = kB.path[0].id[0]; actions(kI)});
//     document.getElementById('w-test').addEventListener('click', kB => {let kI = kB.path[0].id[0]; actions(kI)});
//     document.getElementById('x-test').addEventListener('click', kB => {let kI = kB.path[0].id[0]; actions(kI)});
//     document.getElementById('y-test').addEventListener('click', kB => {let kI = kB.path[0].id[0]; actions(kI)});
//     document.getElementById('z-test').addEventListener('click', kB => {let kI = kB.path[0].id[0]; actions(kI)});
// }

//export
document.getElementById('export').addEventListener('click', downloadObjectAsJson);

function downloadObjectAsJson()
{
    var dataStr = "data:text/json;charset=utf-8,{";

    for(let i of abc)
    {
        dataStr += "\n    \""+ i +"\":";
        dataStr += encodeURIComponent(JSON.stringify(keyAction[i]));
        if (i != 'z')
        {
            dataStr += ",";
        }
    }

    dataStr += "\n}";
    
    var downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "config.json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
}

//import
var arrayF = [];

document.getElementById('import').addEventListener('change', configLoad);

function configLoad ()
{
    var fileToLoad = document.getElementById('import').files[0];
    var fileReader = new FileReader();
    fileReader.onload = function(fileLoadedEvent){
        let textFromFileLoaded = fileLoadedEvent.target.result;
        //document.getElementById("papu").value = textFromFileLoaded;
        configImport(textFromFileLoaded);
    };
    fileReader.readAsText(fileToLoad, "UTF-8");
}

function configImport (json)
{
    // console.log(json)
    // let arrayF=[];
    let objs=[];
    objs = JSON.parse(json);
    // console.log(objs);
    
    for (let idx in objs) {
        // console.log(idx)
        if (objs.hasOwnProperty(idx)) {
            let item = objs[idx];
            // arrayF.push({
            //     key: item.key,
            //     type: item.type,
            //     url: item.url,
            // });
            keyAction[idx] = ({
                key: item.key,
                type: item.type,
                url: item.url,
            });

            
            document.getElementById(item.key + '-type').setAttribute('value', item.type);
            document.getElementById(item.key + '-url').setAttribute('value', item.url);
        }
    }
    // console.log();

    // for(let i in abc) {
    //     keyAction[abc[i]] = new Keys(arrayF[i].key, arrayF[i].type, arrayF[i].url)
    //     console.log(keyAction[abc[i]]);
    // }
}