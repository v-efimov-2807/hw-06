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

class Person {
    constructor(params) {
        this.fullName = params.fullName;
        this.university = params.university;
        this.birthDate = params.birthDate;
        this.photoUrl = params.photoUrl;
        this.type = "person"
    }

    get age() {
        const exceptions = [11, 12, 13, 14, 111, 112, 113, 114];
        const agePerson = parseInt((Date.now() - this.birthDate) / 3600 / 24 / 365.25 / 1000);
        
        if ( exceptions.indexOf(agePerson) !== -1 ) {
            return agePerson + " лет";
        } else if ( (agePerson % 10) === 1 ) {
            return agePerson + " год";
        } else if ( ((agePerson % 10) === 2) || ((agePerson % 10) === 2) || ((agePerson % 10) === 2) ) {
            return agePerson + " года";
        }
        
        return agePerson + " лет";
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

        const avatar = createSimpleNode("img", "person__avatar", person)
        avatar.setAttribute("src", this.photoUrl);
        const name = createSimpleNodeWithData("span", "person__name", person, this.fullName);
        const education = createSimpleNodeWithData("span", "person__education", person, this.education);
    
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
            page.style.backgroundColor = "#808080";
      
        const personPopup = createSimpleNode("div","personPopup", persons);
            personPopup.style.left = y + "px";
            personPopup.style.top = x + "px ";
        
        const personPopupInfo = createSimpleNode("div","personPopup__info", personPopup);
            createSimpleNodeWithData("span", "personPopup__name ", personPopupInfo, this.fullName);

        const personPopupWrap = createSimpleNode("div", "personPopup__wrap", personPopupInfo);
            createSimpleNodeWithData("div", "personPopup__caption", personPopupWrap, "День рождения");
            createSimpleNodeWithData("div", "personPopup__birthDate", personPopupWrap, this.birthDateStr + ", " + this.age);
            createSimpleNodeWithData("div", "personPopup__caption", personPopupWrap, "Учится");
            createSimpleNodeWithData("div", "personPopup__education", personPopupWrap, this.education);

        const personPopupAvatar = createSimpleNode("img","personPopup__avatar", personPopup);
            personPopupAvatar.setAttribute("src", this.photoUrl);

        const personPopupExit = createSimpleNodeWithData("div", "personPopup__exit", personPopup, "X");
            personPopupExit.style.left = 550 + "px";
            personPopupExit.style.top = 5 + "px ";
            personPopupExit.addEventListener("click", () => {
                personPopup.style.display = "none";
                page.style.backgroundColor = "#fff";
            });

        document.addEventListener('mousedown', function(e) {
            if(e.target.closest('.personPopup') === null) {
                personPopup.style.display = 'none';
                page.style.backgroundColor = "#fff";
            }
        });
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

class School {
    constructor() {
        this.students = [];
        this.teachers = [];
    }

    get studentsList() {
        return this.students;
    }

    get teachersList() {
        return this.teachers;
    }

    enrollPerson(params) {
        const person = new PersonFactory(params);

        if(person.type === "teacher") {
            this.teachers.push(person);
        } else if(person.type === "student") {
            this.students.push(person);
        } else {
            return "Uncorrect person's status";
        }
    }

    enrollStudent(params) {
        this.students.push( new PersonFactory(params) );
    }

    enrollTeacher(params) {
        this.teachers.push( new PersonFactory(params) );
    }

    findStudent(fullName) {
        return this.students.filter( student => student.fullName === fullName );
    }

    dismissStudent(fullName) {
        const index = this.students.findIndex(student => student.fullName === fullName);
        if (index !== -1) {
            this.students.splice(index, 1);
        } else {
            return "Student not found";
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
        type: "student",
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

/*Создаём школу*/
const schoooool = new School();
personArr.forEach((item) => {
    schoooool.enrollPerson(item);
});
console.log(schoooool);

/* Добавляем студента */
schoooool.enrollStudent( {
    fullName: 'Пупкин Вячеслав',
    type: "student",
    university: 'НГУ',
    course: 6,
    birthDate: new Date(1488, 6, 28)
} );
console.log(schoooool);

/* Ищем студента по имени */
console.log(schoooool.findStudent('Маша Сидорова'));

/* Удаляем студента */
console.log(schoooool.studentsList);
schoooool.dismissStudent('Пупкин Вячеслав');
console.log(schoooool.studentsList);



