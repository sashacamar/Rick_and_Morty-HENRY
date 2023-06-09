const app = require('../src/app');
const session = require('supertest');
const agent = session(app);



//datos del usuario
const user = require('../src/utils/users');
const supertest = require('supertest');

//personajes de prueba
const character10 = {
    "id": 10,
    "status": "Dead",
    "name": "Alan Rails",
    "species": "Human",
    "origin": {
        "name": "unknown",
        "url": ""
    },
    "image": "https://rickandmortyapi.com/api/character/avatar/10.jpeg",
    "gender": "Male"
}
const character20 = {
    "id": 20,
    "status": "unknown",
    "name": "Ants in my Eyes Johnson",
    "species": "Human",
    "origin": {
        "name": "unknown",
        "url": ""
    },
    "image": "https://rickandmortyapi.com/api/character/avatar/20.jpeg",
    "gender": "Male"
}

//-----------------TODOS LOS TESTS
describe("test de RUTAS", ()=>{
    describe("GET /rickandmorty/character/:id", ()=>{
        it("Responde con status: 200", async ()=>{
            await agent.get('/rickandmorty/character/1').expect(200);
        });
        it('Responde un objeto con las propiedades: "id", "name", "species", "gender", "status", "origin" e "image"' , 
        async()=>{
            const {text} = await agent.get('/rickandmorty/character/1');
            const character = JSON.parse(text)
            expect(character).toHaveProperty('id');
            expect(character).toHaveProperty('name');
            expect(character).toHaveProperty('species');
            expect(character).toHaveProperty('gender');
            expect(character).toHaveProperty('status');
            expect(character).toHaveProperty('origin');
            expect(character).toHaveProperty('image');
        });
        it('Si hay un error responde con status: 500',
        async ()=>{
            await agent.get('/rickandmorty/character/0').expect(500);

        })
    });
    
    describe("GET /rickandmorty/login", ()=>{
        
        it("Acceso valido devuleve un objeto {access: true}",
        async ()=>{
            const {email, password} = user[0];
            const {text} = await agent.get(`/rickandmorty/login?email=${email}&password=${password}`);
            const access = JSON.parse(text);
            expect(access).toEqual({access: true})
        });
        it("Acceso invalido devuleve un objeto {access: false}",
        async ()=>{
            const email = 'pepito@gmail.com', password = '1234';
            const {text} = await agent.get(`/rickandmorty/login?email=${email}&password=${password}`);
            const access = JSON.parse(text);
            expect(access).toEqual({access: false})
        })
    });

    describe("POST /rickandmorty/fav", ()=>{
        it("enviar un personaje a favoritos, me debe devolver un arreglo con el personaje",
        async ()=>{
            const {text} = await agent
            .post("/rickandmorty/fav")
            .send(character10)
            const character = text;
            expect(JSON.parse(character)).toEqual([character10])
        });
        it("si envio un nuevo personaje me debe retornar un arreglo con el nuevo personaje y el anterior",
        async ()=>{
            //agregro personaje personaje a fav
            const {text} = await agent
            .post("/rickandmorty/fav")
            .send(character20);

            const characters = JSON.parse(text);

            expect(characters[0]).toEqual(character10)
            expect(characters[1]).toEqual(character20)
        })
    });

    describe("DELETE /rickandmorty/fav/:id", ()=>{
        it("se debe eliminar un persoje por su id correctamente",
        async ()=>{
            const {text} = await agent.delete("/rickandmorty/fav/10")
            const favorites = JSON.parse(text);
            
            expect(favorites).toEqual([character20])
        });
        it("se debe eliminar un persoje por su id correctamente",
        async ()=>{
            //agregro un personajes a favs, para poder eliminar personajes
            await agent.post("/rickandmorty/fav").send(character10);
            //await agent.post("/rickandmorty/fav").send(character20);

            const {text} = await agent.delete("/rickandmorty/fav/20")
            const favorites = JSON.parse(text);
            
            expect(favorites).toEqual([character10])
        });
        it("si no existe el id para eliminar debe tirar un mensaje de error",
        async ()=>{
            //agregro un personajes a favs, para poder eliminar personajes
            await agent.post("/rickandmorty/fav").send(character10);
            await agent.post("/rickandmorty/fav").send(character20);

            const {text} = await agent.delete("/rickandmorty/fav/30")
            const message = JSON.parse(text);
            
            expect(message).toEqual({msg:'no hay personaje con ese id para eliminar'})
        })
    })
}) 