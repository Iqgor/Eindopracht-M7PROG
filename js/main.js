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


        this.left = new Left(this.main)
        this.right = new Right(this.left)
        
    }

    listitemsMaker(data){
        this.left.listitemsMaker(data);
    }

    render(){
        this.body.appendChild(this.main)

        this.left.render()
        
     
    }


}

class Left{
    main
    list;
    listitem;
    figure;
    img;
    title;
    datum;
    randomNumbers;
    constructor(main){
        this.main = main
      
        this.list = document.createElement('ul');
        this.list.classList = "main__afleveringen";
        
    }

    listitemsMaker(data){
        Object.entries(data).forEach((entry) => {
      
            for(let i = 0; i < 4; i++){
                this.randomNumbers  = Math.floor(Math.random() * entry[1].length)
             
                this.listitem = document.createElement("li")
                this.listitem.classList = "main__aflevering"

                this.figure = document.createElement("figure")
                this.figure.classList = "main__aflevering--figure"
                
                this.img = document.createElement("img"); 
                this.img.classList = "main__aflevering--img"
                this.img.src = entry[1][this.randomNumbers].img
                
                this.title = document.createElement("h4")
                this.title.classList = "main__aflevering--title"
                this.title.innerText = entry[1][this.randomNumbers].title

                this.datum = document.createElement("p")
                this.datum.classList = 'main__aflevering--datum'
                this.datum.innerText = entry[1][this.randomNumbers].date

   
                this.list.appendChild(this.listitem)
                this.listitem.appendChild(this.figure)
                this.figure.appendChild(this.img)
                this.listitem.appendChild(this.datum)
                this.listitem.appendChild(this.title)
                
                this.listitem.onclick = function(){
                    
                }
            }
            
        });
        
    }
    
    render(){
       this.main.appendChild(this.list)
    }

    


}

class Right{
    left;
    randomNumber;
    section;
    box;
    figure;
    img;
    datum;
    title;
    text;
    links;
    audio;
    source;

    constructor(left){
        this.left = left
        this.randomNumber = this.left.randomNumbers
        console.log(this.randomNumber)
       
    }


}

class App{
    api;
    header;
    main;
    constructor(){
        this.header = new Header("body");
        this.main = new Main("body")

        this.api = new GetDataFromApi();
        this.api.getData("./json/data.json").then(data =>{
            this.main.listitemsMaker(data)
        });
        
        
       
        this.header.render();
        this.main.render()
        
    }

}

const app = new App()





