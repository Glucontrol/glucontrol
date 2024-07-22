const { connectDB } = require("../db/database");

async (req,res) =>{
    const nConnection = await connectDB();
    await nConnection.query(`CREATE TABLE IF NOT EXISTS REGISTROS (
    Id_Registro int NOT NULL AUTO_INCREMENT,
    Tipo varchar(40) NOT NULL,
    Dosis int (),
    Fecha date,
    Via varchar(40),
    Id_Usuario int,
    Adicional varchar(255),
    PRIMARY KEY (Id_Registro)
);`)
    await nConnection.query(`CREATE TABLE IF NOT EXISTS USUARIOS (
    Id_Usuario int NOT NULL AUTO_INCREMENT,
    Nombre varchar(40),
    Email varchar(255),
    Contrasenia(100),
    PRIMARY KEY (Id_Usuario)
);`)
    console.log('Ta hecha la databeis')
}