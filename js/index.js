"use strict";

let months=[
    'Января',
    'Февраля',
    'Марта',
    'Апреля',
    'Мая',
    'Июня',
    'Июля',
    'Августа',
    'Сентября',
    'Октября',
    'Ноября',
    'Декабря',
];

class Person {
    constructor(params) {
        this.fullName = params.fullName;
        this.university = params.university;
        this.birthDate = params.birthDate;
        this.photoUrl = params.photoUrl;
        this.type = "person"
    }

    get age() {
        let date = new Date();
        let year = date.getFullYear();
        return Math.floor( year - this.birthDate.getFullYear() ) + " лет";
    };

    get birthDateStr() {
        return this.birthDate.getDate() + " " + months[this.birthDate.getMonth()];
    }; 

    get education() {
        return this.university + ", Неизвестная персона";
    };

    render() {
        const person = document.createElement("div");
        person.className = "person";
        
        const avatar = document.createElement("img");
        avatar.className = "person__avatar";
        avatar.setAttribute("src", this.photoUrl);
        person.appendChild(avatar);
    
        const name = document.createElement("span");
        name.className = "person__name";
        name.innerText = this.fullName;
        person.appendChild(name);
    
        const education = document.createElement("span");
        education.className = "person__education";
        education.innerText = this.education;
        person.appendChild(education);
    
        return person;
    };

    appendToDOM()  { 
        const layout = this.render();
        const persons = document.getElementById("persons");
        persons.appendChild(layout);

        layout.addEventListener('click', (event) => {
            this.openCard(event.currentTarget);
        });
    }; 

    openCard (currentTarget) {
        const persons = document.getElementById("persons");
        const x = currentTarget.offsetTop;
        const y = currentTarget.offsetLeft;
    
        const page = document.getElementById("page");
            page.style.backgroundColor = "#808080"
    
        const personPopup = createSimpleNode("div","personPopup", persons);
            personPopup.style.left = y + "px";
            personPopup.style.top = x + "px ";

        const personPopup__info = createSimpleNode("div","personPopup__info", personPopup);
            createSimpleNodeWithData("span", "personPopup__name ", personPopup__info, this.fullName);

        const personPopup__wrap = createSimpleNode("div", "personPopup__wrap", personPopup__info);
            createSimpleNodeWithData("div", "personPopup__caption", personPopup__wrap, "День рождения");
            createSimpleNodeWithData("div", "personPopup__birthDate", personPopup__wrap, this.birthDateStr + ", " + this.age);
            createSimpleNodeWithData("div", "personPopup__caption", personPopup__wrap, "Учится");
            createSimpleNodeWithData("div", "personPopup__education", personPopup__wrap, this.education);

        const personPopup__avatar = createSimpleNode("img","personPopup__avatar", personPopup);
            personPopup__avatar.setAttribute("src", this.photoUrl);

        const personPopup__exit = createSimpleNodeWithData("div", "personPopup__exit", personPopup, "X");
            personPopup__exit.style.left = 550 + "px";
            personPopup__exit.style.top = 5 + "px ";
            personPopup__exit.addEventListener("click", (e) => {
                personPopup.style.display = "none";
                page.style.backgroundColor = "#ffffff"
            });
        
        //Как эти функции сделать глобальными на уровне класса?
        function createSimpleNode(tag, className, parentNode) {
            const node = document.createElement(tag);
            node.className = className;
            return parentNode.appendChild(node);
        };

        function createSimpleNodeWithData(tag, className, parentNode, data) {
            const node = document.createElement(tag);
            node.className = className;
            node.innerText = data;
            return parentNode.appendChild(node);
        };
    };
}

class Student extends Person{
    constructor(params) {
        super(params);
        this.course = params.course;
        this.type = "student";
    };

    get education() {
        return this.university + ", " + this.course + " курс";
    };
};

class Teacher extends Person {
    constructor(params) {
        super(params);
        this.type = "teacher";
    }

    get education() {
        return this.university + ", " + "Преподаватель";
    };
}

class PersonFactory {
    constructor(params) {
        switch(params.type) {
            case "student":
                return new Student(params);
            case "teacher":
                return new Teacher(params);
            default:
                return new Person(params);
        }
    }
}

const personArr = [
    {
        fullName: 'Вася Иванов',
        type: "student",
        university: 'УГАТУ',
        course: 2,
        birthDate: new Date(2000, 0, 1),
        photoUrl: "img/person/ava01.jpg"
    },
    {
        fullName: 'Маша Сидорова',
        type: "student",
        university: 'МГУ',
        course: 4,
        birthDate: new Date(1960, 0, 1),
        photoUrl: "img/person/ava02.jpg"
    },
    {
        fullName: 'Вася Иванов',
        type: "",
        university: 'УГАТУ',
        course: 2,
        birthDate: new Date(2000, 0, 1),
        photoUrl: "img/person/ava03.jpg"
    },
    {
        fullName: 'Вася Иванов',
        type: "student",
        university: 'УГАТУ',
        course: 2,
        birthDate: new Date(2000, 0, 1),
        photoUrl: "img/person/ava04.jpg"
    },
    {
        fullName: 'Вася Иванов',
        type: "student",
        university: 'НГУ',
        course: 2,
        birthDate: new Date(1999, 11, 11),
        photoUrl: "img/person/ava05.jpg"
    },
    {
        fullName: 'Вася Иванов',
        type: "teacher",
        university: 'УГАТУ',
        course: 0,
        birthDate: new Date(2000, 0, 1),
        photoUrl: "img/person/ava06.jpg"
    }
];

personArr.forEach((item) => {
    const person = new PersonFactory(item);
    person.appendToDOM();
});