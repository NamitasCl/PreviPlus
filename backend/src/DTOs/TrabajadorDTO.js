// dtos/TrabajadorDTO.js

class TrabajadorDTO {
    constructor(trabajador) {
        this.id = trabajador.id;
        this.rut = trabajador.rut;
        this.dv = trabajador.dv;
        this.patlastname = trabajador.patlastname;
        this.matlastname = trabajador.matlastname;
        this.names = trabajador.names;
        this.genero = trabajador.genero;
        this.nationality = trabajador.nationality;
        this.salud = trabajador.salud;
        this.afp = trabajador.afp;
        this.historialRemuneraciones = trabajador.historialRemuneraciones;
        // Mapeo de informacionLaboral
        this.configuracionArchivoPrevired = trabajador.configuracionArchivoPrevired && trabajador.configuracionArchivoPrevired.length > 0
            ? trabajador.configuracionArchivoPrevired[0]
            : null;
            
        this.informacionLaboral = trabajador.informacionLaboral && trabajador.informacionLaboral.length > 0
            ? trabajador.informacionLaboral[0]
            : null;
    }
}

module.exports = TrabajadorDTO;
