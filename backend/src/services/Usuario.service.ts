import { Repository } from "typeorm";
import { AppDataSource } from "../db";
import { Usuario } from "../entities/Usuario.entity";
import { InformacionLaboral } from "../entities/InformacionLaboral.entity";
import { Negocio } from "../entities/Negocio.entity";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"
import path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env") });
const SECRET_WORD = process.env.SECRET_WORD;

export interface UserInfo {
  id: number;
  name: string;
  firstlastname: string;
  secondlastname?: string;
  username: string;
  email: string;
  password: undefined;
  createdAt: Date;
  rol: string;
  isActive: boolean;
}

export class UsuarioService {
  private usuarioRepository: Repository<Usuario>;
  private negocioRepository: Repository<Negocio>;

  constructor() {
    this.usuarioRepository = AppDataSource.getRepository(Usuario);
    this.negocioRepository = AppDataSource.getRepository(Negocio);
  }

  // Método para crear un usuario
  async crearUsuario(datos: {
    name: string;
    firstlastname: string;
    secondlastname?: string;
    username: string;
    email: string;
    password: string;
  }): Promise<UserInfo> {
    const { name, firstlastname, secondlastname, username, email, password } = datos;
    const createdAt = new Date();

    // Validación de existencia de email y usuario
    const emailExists = await this.obtenerUsuarioPorEmail(email);
    const usernameExists = await this.obtenerUsuarioPorUsuario(username);

    if (emailExists) throw new Error("Correo electrónico ya existe.");
    if (usernameExists) throw new Error("Usuario ya existe.");

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear y guardar nuevo usuario
    const newUser = this.usuarioRepository.create({
      name,
      firstlastname,
      secondlastname,
      username,
      email,
      createdAt,
      password: hashedPassword,
    });

    const usuarioCreado = await this.usuarioRepository.save(newUser);

    const userInfo: UserInfo = {
      id: usuarioCreado.id,
      name: usuarioCreado.name,
      firstlastname: usuarioCreado.firstlastname,
      secondlastname: usuarioCreado.secondlastname,
      username: usuarioCreado.username,
      email: usuarioCreado.email,
      password: undefined,
      createdAt: usuarioCreado.createdAt,
      rol: usuarioCreado.rol,
      isActive: usuarioCreado.isActive,
    }

    return userInfo;
  }

  // Método para autenticar un usuario
  async login(userData: { email: string; password: string }): Promise<{
    token: string;
    obtainedUserData: Omit<UserInfo, "password">;
  }> {
    const obtainedUserData = await this.obtenerUsuarioPorEmail(userData.email);

    if (!obtainedUserData) throw new Error("Usuario no encontrado");
    if (!obtainedUserData.password) throw new Error("Contraseña no configurada para el usuario");

    const passwordMatch = await bcrypt.compare(userData.password, obtainedUserData.password);
    if (!passwordMatch) throw new Error("Contraseña incorrecta");

    // Excluye la contraseña del objeto antes de firmar el token
    const userWithoutPassword: UserInfo = {
      ...obtainedUserData,
      password: undefined,
    }

    const token = jwt.sign(userWithoutPassword, SECRET_WORD || "", { expiresIn: "1h" });
    return { token, obtainedUserData: userWithoutPassword };
  }

  // Método para obtener todos los usuarios
  async obtenerUsuarios(): Promise<Usuario[]> {
    return await this.usuarioRepository.find();
  }

  // Método para obtener un usuario por su ID
  async obtenerUsuarioPorId(id: number): Promise<Usuario | null> {
    return await this.usuarioRepository.findOneBy({ id });
  }

  // Método para obtener un usuario por su email
  async obtenerUsuarioPorEmail(email: string): Promise<Usuario | null> {
    return await this.usuarioRepository.findOneBy({ email });
  }

  // Método para obtener un usuario por su nombre de usuario
  async obtenerUsuarioPorUsuario(username: string): Promise<Usuario | null> {
    return await this.usuarioRepository.findOneBy({ username });
  }

  // Método para actualizar la contraseña de un usuario
  async actualizarContrasena(id: number, nuevaContrasena: string): Promise<Usuario> {
    const usuario = await this.obtenerUsuarioPorId(id);
    if (!usuario) throw new Error("Usuario no encontrado");

    usuario.password = await bcrypt.hash(nuevaContrasena, 10);
    return await this.usuarioRepository.save(usuario);
  }

  // Método para actualizar un usuario
  async actualizarUsuario(
    id: number,
    datosActualizados: Partial<Usuario>
  ): Promise<Usuario | null> {
    const usuario = await this.usuarioRepository.findOneBy({ id });
    if (!usuario) throw new Error("Usuario no encontrado");

    Object.assign(usuario, datosActualizados);
    return await this.usuarioRepository.save(usuario);
  }

  // Método para eliminar un usuario
  async eliminarUsuario(id: number): Promise<string> {
    const resultado = await this.usuarioRepository.delete(id);
  
    if ((resultado.affected ?? 0) > 0) {
      return "Usuario eliminado con éxito";
    } else {
      throw new Error("Usuario no encontrado");
    }
  }

  // Método para obtener un usuario con estadísticas
  async obtenerUsuarioConEstadisticas(
    idUsuario: number
  ): Promise<{ cantidadNegocios: number; cantidadTrabajadores: number }> {
    const negocios = await this.negocioRepository.find({
      where: { usuario: { id: idUsuario } },
      relations: ["informacionLaboral", "informacionLaboral.trabajador"],
    });

    console.log("Negocio obtenido:", negocios);

    const cantidadNegocios = negocios.length;

    const cantidadTrabajadores = negocios.reduce((acum, negocio) => {
      return acum + negocio.informacionLaboral.length
    }, 0)

    return { cantidadNegocios, cantidadTrabajadores };
    
  }
}


