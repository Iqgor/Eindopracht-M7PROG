class GetDataFromApi {
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

class Header {
    header;
    logoFig
    logoImg;
    h1;
    body;
    constructor(body) {
        this.body = document.getElementsByTagName(body)[0];

        this.header = document.createElement("header");
        this.header.classList = "header";

        this.logoFig = document.createElement("figure");
        this.logoFig.classList = "header__figure";
        this.logoImg = document.createElement("i");
        this.logoImg.classList = "fa-regular fa-face-grin-squint-tears";

        this.h1 = document.createElement("h1");
        this.h1.classList = "header__title";
        this.h1.innerText = "Collection of Happiness"

    }

    render() {
        this.body.appendChild(this.header);
        this.header.appendChild(this.logoFig);
        this.header.appendChild(this.h1);
        this.logoFig.appendChild(this.logoImg);
    }
}


class Main {
    body;
    main;
    
    left;
    data;
    constructor(body,data) {

        this.body = document.getElementsByTagName(body)[0]
        this.main = document.createElement("main")
        this.main.classList = "main";
        this.data = data

        this.left = new Left(this.main,this.data)

    }

    listitemsMaker(data) {
        this.left.listitemsMaker(data);
    }

    render() {
        this.body.appendChild(this.main);

        this.left.render();
       

    }


}

class NumberGenerator {
    data;
    randomNumber;

    constructor(data) {
        this.data = data;
        
        this.randomNumber = Math.floor(Math.random() * this.data.episodes.length)
        
    }

}




class Right {
    generator;
    ourRandomNumber;
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

    constructor(main,data) {
        this.main = main
        this.generator = new NumberGenerator(data)
        let ourRandomNumber = this.generator.randomNumber
        this.section = document.createElement("section");
        this.section.classList = "info"

        this.box = document.createElement("div");
        this.box.classList = "info__box";
        
 

        this.figure = document.createElement("figure");
        this.figure.classList = "info__figure";

        this.img = document.createElement("img");
        this.img.classList = "info__figure--img";
        this.img.src = data.episodes[ourRandomNumber].img

        this.datum = document.createElement("p");
        this.datum.classList = "info__figure--datum";
        this.datum.innerText = data.episodes[ourRandomNumber].date

        this.title = document.createElement("h4");
        this.title.classList = "info__figure--title";
        this.title.innerText = data.episodes[ourRandomNumber].title

        this.text = document.createElement("p");
        this.text.classList = "info__text";
        this.text.innerText = data.episodes[ourRandomNumber].coverText

        this.links = document.createElement("div");
        this.links.classList = "info__links";

        this.audioControl = document.createElement("audio")
        this.audioControl.setAttribute("controls", "controls")

        this.audio = document.createElement("source");
        this.audio.type = "audio/mpeg"
        this.audio.src = data.episodes[ourRandomNumber].audio

        this.source = document.createElement("a");
        this.source.classList = "info__links--buttons info__links--source";
        this.source.innerText = "Source"
        this.source.href = data.episodes[ourRandomNumber].url
    }

    changeRideSide(data,ourRandomNumber){
        this.img.src = data.episodes[ourRandomNumber].img
        this.datum.innerText = data.episodes[ourRandomNumber].date
        this.title.innerText = data.episodes[ourRandomNumber].title
        this.text.innerText = data.episodes[ourRandomNumber].coverText
        this.audio.src = data.episodes[x].audio
        this.source.href = data.episodes[ourRandomNumber].url
    }

    render(){
        this.main.appendChild(this.section)
        this.section.appendChild(this.box)
        this.box.appendChild(this.figure)
        this.figure.appendChild(this.img)
        this.figure.appendChild(this.datum)
        this.figure.appendChild(this.title)
        this.box.appendChild(this.text)
        this.box.appendChild(this.links)
        this.links.appendChild(this.audioControl)
        this.audioControl.appendChild(this.audio)
        this.links.appendChild(this.source)
    }


}   

class Left {
    generator;
    data;
    main;
    list;
    listitem;
    figure;
    img;
    title;
    datum;
    ourRandomNumbers;
    right 
    constructor(main,data) {
        this.data = data
        this.main = main
        this.right = new Right(this.main, this.data)
        

        this.list = document.createElement('ul');
        this.list.classList = "main__afleveringen";
       
    }


    listitemsMaker(data) {
        
        
        for (let i = 0; i < 4; i++) {
            
            Object.entries(data).forEach((entry) => {
                this.generator = new NumberGenerator(data)
                let ourRandomNumbers = this.generator.randomNumber

                this.listitem = document.createElement("li")
                this.listitem.classList = "main__aflevering"

                this.figure = document.createElement("figure")
                this.figure.classList = "main__aflevering--figure"

                this.img = document.createElement("img");
                this.img.classList = "main__aflevering--img"
                this.img.src = entry[1][ourRandomNumbers].img

                this.title = document.createElement("h4")
                this.title.classList = "main__aflevering--title"
                this.title.innerText = entry[1][ourRandomNumbers].title

                this.datum = document.createElement("p")
                this.datum.classList = 'main__aflevering--datum'
                this.datum.innerText = entry[1][ourRandomNumbers].date

                // this.link = document.createElement("a")
                // this.link.classList = "main__aflevering--link"
                // this.link.href = entry[1][this.ourRandomNumbers].url
                
                this.listitem.onclick = () => {
                    this.right.changeRideSide(data,ourRandomNumbers)
                }
                
  
                
                
                this.list.appendChild(this.listitem)
                this.listitem.appendChild(this.figure)
                this.figure.appendChild(this.img)
                this.listitem.appendChild(this.datum)
                this.listitem.appendChild(this.title)
                // this.listitem.appendChild(this.link)
           
                

            })

        }
        ;
           

        

    }

    changeRideSide(){
        console.log(this.right.changeRideSide)
    }

    render() {
        this.main.appendChild(this.list)
        this.right.render()
    }




}

class App {
    api;
    header;
    main;
    numberGenerator;
    constructor() {
        this.header = new Header("body");
      

        this.api = new GetDataFromApi();
        this.api.getData("./json/data.json").then(data => {
            this.main = new Main("body",data)
            this.main.listitemsMaker(data)
            this.main.render()
           
        });



        this.header.render();
       

    }

}

const app = new App()





