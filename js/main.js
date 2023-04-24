class GetDataFromApi{
    data = null;
    async getData(data) {
        await fetch(data).then(response => {
            return response.json();

        }).then(newData => {
            this.data = newData;
           
        })
    
        return this.data;
        
        
    }
    
}

class Header{
    header;
    logoFig
    logoImg;
    h1;
    body;
    constructor(body){
        this.body = document.getElementsByTagName(body)[0];
        
        this.header = document.createElement("header");
        this.header.classList = "header";

        this.logoFig = document.createElement("figure");
        this.logoFig.classList = "header__figure";
        this.logoImg = document.createElement("i");
        this.logoImg.classList = "fa-regular fa-face-grin-squint-tears";

        this.h1 =document.createElement("h1");
        this.h1.classList = "header__title";
        this.h1.innerText= "Collection of Happiness"

    }

    render(){
        this.body.appendChild(this.header);
        this.header.appendChild(this.logoFig);
        this.header.appendChild(this.h1);
        this.logoFig.appendChild(this.logoImg);
    }
}


class Main{
    body;
    main;
    right;
    left;

    constructor(body){
        this.body = document.getElementsByTagName(body)[0]

        this.main = document.createElement("main")
        this.main.classList = "main";


        this.left = new Left()
        this.right = new Right()
    }

    render(){
        this.body.appendChild(this.main)

        this.main.appendChild(this.left)
        this.main.appendChild(this.right)
    }
}

class Left{

}

class Right{

}

class App{
    api;
    header;
    main;
    constructor(){
        this.api = new GetDataFromApi();
        this.api.getData("./json/data.json").then(data =>{
            console.log(data)
        });
        
     
        this.header = new Header("body");
        this.header.render();
    }

}

const app = new App()





