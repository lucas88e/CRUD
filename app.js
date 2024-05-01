const express = require("express")
const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
let usuarios = [
    { id: 1, nombre: 'Ryu', edad: 32, lugarProcedencia: 'Japón' },
    { id: 2, nombre: 'Chun-Li', edad: 29, lugarProcedencia: 'China' },
    { id: 3, nombre: 'Guile', edad: 35, lugarProcedencia: 'Estados Unidos' },
    { id: 4, nombre: 'Dhalsim', edad: 45, lugarProcedencia: 'India' },
    { id: 5, nombre: 'Blanka', edad: 32, lugarProcedencia: 'Brasil' },
];
app.get("/", (req, res) => {
    res.send(`<h1>Lista de usuarios</h1>
${usuarios.map((usuario) => `<ul><li>ID: ${usuario.id}</li>
<li> Nombre: ${usuario.nombre}</li>
<li>Edad:${usuario.edad}</li>
<li> Lugar de procedencia: ${usuario.lugarProcedencia}</li></ul>`).join(" ")}

<form action= "/usuarios" method ="post">
<label for="nombre"> Nombre</label>
<input type = "text" id="nombre" name="nombre" required>
<label for="edad"> Edad</label>
<input type="number" id="edad" name="edad">
<label for="pais"> Pais</label>
<input type="text" id="pais" name="pais">
<button type="submit"> Agregar usuario</button>
</form>
`)
}
)
app.post("/usuarios",(req,res)=>{
    const nuevoUsuario ={
        id: usuarios.length + 1,
        nombre: req.body.nombre,
        edad: req.body.edad,
        lugarProcedencia: req.body.pais
    }
    usuarios.push(nuevoUsuario)
    res.redirect("/")
})
app.get("/:id",(req,res)=>{
   const id = parseInt(req.params.id)
   console.log(id)
   usuarios.findIndex((user)=>{
    if(user.id === id) res.send(usuarios[id-1])
   })
})
app.get("/usuarios/:nombre",(req,res)=>{
    const nombre = (req.params.nombre)
    console.log(nombre)
    const usuario = usuarios.find(user=>user.nombre === nombre)
   
     if(usuario){
        res.status(202).send(usuario)
     }
     else {
        res.status(404).send("Usuario no encontrado");
    }
    
 })
 


// app.get("/usuarios/:Ryu",(req,res)=>{
//     res.send(`<h1>Personajes</h1> <ul><li>ID: ${usuarios[0].id}</li>
//     <li> Nombre: ${usuarios[0].nombre}</li>
//     <li>Edad:${usuarios[0].edad}</li>
//     <li> Lugar de procedencia: ${usuarios[0].lugarProcedencia}</li></ul>
//     `)
// })
// app.get("/:Chun-Li",(req,res)=>{
//     res.send(`<h1>Personajes</h1> <ul><li>ID: ${usuarios[1].id}</li>
//     <li> Nombre: ${usuarios[1].nombre}</li>
//     <li>Edad:${usuarios[1].edad}</li>
//     <li> Lugar de procedencia: ${usuarios[1].lugarProcedencia}</li></ul>
//     `)
// })


app.listen(3000, () => {
    console.log("Este servidor esta lanzado en el http://localhost:3000")
})
