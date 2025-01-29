console.log("Hello World");

class User {
    name: string;
    email: string;
    city: string = "";

    constructor(name: string, email: string) {
        this.name = name;
        this.email = email
    }
}

const user = new User("user", "user@email.com");
console.log(user.city);

function getSearchProducts1<T>(products: T[]): T {
    return products[0];
}

const getSearchProducts2 = <T>(products: T[]): T => {
    return products[0];
}

