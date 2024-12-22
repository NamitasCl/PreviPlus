  /**
   * Función para generar el archivo Previred.
   * Utiliza transacciones para asegurar la atomicidad.
   */
  async generarArchivoPrevired(data: any): Promise<string> {
    return await this.dataSource.manager.transaction(async (manager: EntityManager) => {
      /**
       * Validar y transformar los datos de entrada al DTO.
       */
      const archivoPreviredDTO = plainToInstance(ArchivoPreviredDTO, data);

      const errors = await validate(archivoPreviredDTO);
      if (errors.length > 0) {
        const errorMessages = errors.map(err => ({
          property: err.property,
          constraints: err.constraints,
        }));
        throw new Error(`Validación fallida: ${JSON.stringify(errorMessages)}`);
      }

      console.log("Datos validados:", archivoPreviredDTO);

      let { userId, idNegocio } = data;

      idNegocio = parseInt(idNegocio.toString(), 10);
      userId = parseInt(userId.toString(), 10);

      console.log("ID Negocio:", idNegocio);
      console.log("ID Usuario:", userId);

      // Verificar el negocio y el usuario
      const negocio = await manager.findOne(Negocio, {
        where: { id: idNegocio },
        relations: ["usuario", "mutualidad", "ccaf"],
      });

      console.log("Negocio encontrado:", negocio);

      if (!negocio) {
        throw new Error("Negocio no encontrado");
      }

      if (negocio.usuario.id !== userId) {
        throw new Error("No autorizado para acceder a este negocio");
      }

      // Obtener trabajadores y relaciones necesarias
      const trabajadores = await manager
        .createQueryBuilder(Trabajador, "trabajador")
        .leftJoinAndSelect(
          "trabajador.informacionLaboral",
          "informacionLaboral",
          "informacionLaboral.negocio_id = :idNegocio AND informacionLaboral.isContratoActivo = true",
          { idNegocio }
        )
        .leftJoinAndSelect("trabajador.salud", "salud")
        .leftJoinAndSelect("trabajador.afp", "afp")
        .leftJoinAndSelect("trabajador.configuracionArchivoPrevired", "configuracionArchivoPrevired")
        .getMany();

      console.log("Trabajadores encontrados:", trabajadores);

      if (trabajadores.length === 0) {
        throw new Error("No hay trabajadores asociados al negocio");
      }

      // Array para almacenar las cadenas de cada trabajador
      const cadenasTrabajadores = await Promise.all(
        trabajadores.map(async trabajador => {
          const informacionLaboral = trabajador.informacionLaboral[0];
          const salud = trabajador.salud;
          const afp = trabajador.afp;
          const ccaf = negocio.ccaf;
          const mutualidad = negocio.mutualidad;
          const configuracionArchivo = trabajador.configuracionArchivoPrevired[0];

          const montoAf = await this.calcularMontoAf(
            manager,
            informacionLaboral.tramoAsignacionFamiliar || "",
            informacionLaboral.sueldoImponible || 0
          );

          // Construir la línea del archivo Previred con los 105 campos
          const datosArchivoPrevired = [
            trabajador.rut, // Campo 1: RUT
            trabajador.dv, // Campo 2: Dígito Verificador
            trabajador.patlastname, // Campo 3: Apellido Paterno
            trabajador.matlastname || "", // Campo 4: Apellido Materno
            trabajador.names, // Campo 5: Nombres
            trabajador.genero, // Campo 6: Género
            trabajador.nationality.toString(), // Campo 7: Nacionalidad
            informacionLaboral.tipopago || 0, // Campo 8: Tipo de Pago
            this.obtenerFecha(), // Campo 9: Período de Pago mmaaaa
            archivoPreviredDTO.campo10_condicional, // Campo 10: Condicional
            informacionLaboral.regimenPrevisional, // Campo 11: Régimen Previsional
            informacionLaboral.tipoTrabajador.toString(), // Campo 12: Tipo de Trabajador
            archivoPreviredDTO.diasTrabajados ? archivoPreviredDTO.diasTrabajados.toString() : "30", // Campo 13: Días Trabajados
            archivoPreviredDTO.tipoLinea ? archivoPreviredDTO.tipoLinea : 0, // Campo 14: Tipo de Línea
            archivoPreviredDTO.codigoMovPersonal ? archivoPreviredDTO.codigoMovPersonal : 0, // Campo 15: Código Movimiento Personal
            archivoPreviredDTO.campo16_condicional, // Campo 16: Condicional
            archivoPreviredDTO.campo17_condicional, // Campo 17: Condicional
            informacionLaboral.tramoAsignacionFamiliar !== "" ? informacionLaboral.tramoAsignacionFamiliar : "D", // Campo 18: Tramo Asignación Familiar
            archivoPreviredDTO.campo19_condicional, // Campo 19: Condicional
            archivoPreviredDTO.campo20_condicional, // Campo 20: Condicional
            archivoPreviredDTO.campo21_condicional, // Campo 21: Condicional
            montoAf.toString(), // Campo 22: Monto de pago de asignación familiar (Repetir en campo 73)
            archivoPreviredDTO.campo23_condicional, // Campo 23: Condicional
            archivoPreviredDTO.campo24_condicional, // Campo 24: Condicional
            archivoPreviredDTO.campo25_condicional || "N", // Campo 25: Solicitud trabajador joven (Debe ir)
            afp.codigoAfp ? afp.codigoAfp.toString() : 0, // Campo 26: Código AFP
            informacionLaboral.sueldoImponible ? informacionLaboral.sueldoImponible.toString() : "0", // Campo 27: Imponible para AFP
            Math.round((afp.tasaCotizacion || 0) * (informacionLaboral.sueldoImponible || 0)) || 0, // Campo 28: Cotización Obligatoria AFP
            Math.round((archivoPreviredDTO.cotizacionSIS || 0) * (informacionLaboral.sueldoImponible || 0)).toString(), // Campo 29: Cotización SIS
            archivoPreviredDTO.campo30_condicional || "", // Campo 30: Cuenta de Ahorro Voluntario AFP (N/I)
            archivoPreviredDTO.campo31_condicional || "", // Campo 31: Renta Imp. Sustitutiva AFP (N/I)
            archivoPreviredDTO.campo32_condicional || "", // Campo 32: Tasa Pactada (Sustitutiva) (N/I)
            archivoPreviredDTO.campo33_condicional || "", // Campo 33: Aporte Indemnización (Sustitutiva) (N/I)
            archivoPreviredDTO.campo34_condicional || "", // Campo 34: N° Períodos (Sustitutiva) (N/I)
            archivoPreviredDTO.campo35_condicional || "", // Campo 35: Período desde (Sustitutiva)(N/I)
            archivoPreviredDTO.campo36_condicional || "", // Campo 36: Período Hasta (Sustitutiva)(N/I)
            archivoPreviredDTO.campo37_condicional || "", // Campo 37: Puesto de Trabajo Pesado (N/I)
            archivoPreviredDTO.campo38_condicional?.toString() || "0", // Campo 38: % Cotización Trabajo Pesado (N/I)
            archivoPreviredDTO.campo39_condicional?.toString() || "0", // Campo 39: Cotización Trabajo Pesado (N/I)
            archivoPreviredDTO.campo40_condicional?.toString() || "0", // Campo 40: Código de la Institución APVI (N/I)
            archivoPreviredDTO.campo41_condicional, // Campo 41: Número de Contrato APVI (N/I)
            archivoPreviredDTO.campo42_condicional?.toString() || "0", // Campo 42: Forma de Pago APVI (N/I)
            archivoPreviredDTO.campo43_condicional?.toString() || "0", // Campo 43: Cotización APVI (N/I)
            archivoPreviredDTO.campo44_condicional?.toString() || "0", // Campo 44: Cotización Depósitos Convenidos (N/I)
            archivoPreviredDTO.campo45_condicional?.toString() || "0", // Campo 45: Código Institución Autorizada APVC (N/I)
            archivoPreviredDTO.campo46_condicional, // Campo 46: Número de Contrato APVC (N/I)
            archivoPreviredDTO.campo47_condicional?.toString() || "0", // Campo 47: Forma de Pago APVC (N/I)
            archivoPreviredDTO.campo48_condicional?.toString() || "0", // Campo 48: Cotización Trabajador APVC (N/I)
            archivoPreviredDTO.campo49_condicional?.toString() || "0", // Campo 49: Cotización Empleador APVC (N/I)
            archivoPreviredDTO.campo50_condicional?.toString() || "0", // Campo 50: Rut Afiliado Voluntario (N/I)
            archivoPreviredDTO.campo51_condicional, // Campo 51: DV Afiliado Voluntario (N/I)
            archivoPreviredDTO.campo52_condicional, // Campo 52: Apellido Paterno (N/I)
            archivoPreviredDTO.campo53_condicional, // Campo 53: Apellido Materno (N/I)
            archivoPreviredDTO.campo54_condicional, // Campo 54: Nombres (N/I)
            archivoPreviredDTO.campo55_condicional?.toString() || "0", // Campo 55: Código Movimiento de Personal (N/I)
            archivoPreviredDTO.campo56_condicional, // Campo 56: Fecha desde (N/I)
            archivoPreviredDTO.campo57_condicional, // Campo 57: Fecha hasta (N/I)
            archivoPreviredDTO.campo58_condicional?.toString() || "0", // Campo 58: Código de la AFP (N/I)
            archivoPreviredDTO.campo59_condicional?.toString() || "0", // Campo 59: Monto Capitalización Voluntaria (N/I)
            archivoPreviredDTO.campo60_condicional?.toString() || "0", // Campo 60: Monto Ahorro Voluntario (N/I)
            archivoPreviredDTO.campo61_condicional?.toString() || "0", // Campo 61: Número de periodos de cotización (N/I)
            archivoPreviredDTO.campo62_condicional?.toString() || "0", // Campo 62: Código EX-Caja Régimen (N/I)
            archivoPreviredDTO.campo63_condicional?.toString() || "0", // Campo 63: Tasa Cotización Ex-Caja Previsión (N/I)
            informacionLaboral.sueldoImponible ? informacionLaboral.sueldoImponible.toString() : "0", // Campo 64: Renta Imponible IPS / ISL / Fonasa
            archivoPreviredDTO.campo65_condicional?.toString() || "0", // Campo 65: Cotización Obligatoria IPS
            archivoPreviredDTO.campo66_condicional?.toString() || "0", // Campo 66: Renta Imponible Desahucio (N/I)
            archivoPreviredDTO.campo67_condicional?.toString() || "0", // Campo 67: Código EX-Caja Régimen Desahucio (N/I)
            archivoPreviredDTO.campo68_condicional?.toString() || "0", // Campo 68: Tasa Cotización Desahucio Ex-Cajas de Previsión (N/I)
            archivoPreviredDTO.campo69_condicional?.toString() || "0", // Campo 69: Cotización Desahucio (N/I)
            (negocio.tieneCcaf && salud.codigoSalud === 7)
              ? Math.round((salud.tasaSaludCcaf || 0) * (informacionLaboral.sueldoImponible || 0)).toString()
              : Math.round((salud.tasaSalud || 0) * (informacionLaboral.sueldoImponible || 0)).toString(), // Campo 70: Cotización Fonasa
            mutualidad.codigomutual === 0
              ? Math.round((mutualidad.tasamutual || 0) * (informacionLaboral.sueldoImponible || 0)).toString()
              : "0", // Campo 71: Cotización Acc. Trabajo (ISL)
            archivoPreviredDTO.campo72_condicional?.toString() || "0", // Campo 72: Bonificación Ley 15.386
            archivoPreviredDTO.campo73_condicional, // Campo 73: Descuento por cargas familiares de IPS (ex INP)
            archivoPreviredDTO.campo74_condicional?.toString() || "0", // Campo 74: Bonos Gobierno (Campo futuro cuando Gobierno de bonos)
            archivoPreviredDTO.codigoSalud || "0", // Campo 75: Código Salud
            archivoPreviredDTO.numeroFUN || "", // Campo 76: Número de Contrato Salud
            (informacionLaboral.sueldoImponible || 0) ? (informacionLaboral.sueldoImponible || 0).toString() : "0", // Campo 77: Renta Imponible Isapre
            archivoPreviredDTO.tipoMoneda || "0", // Campo 78: Tipo Moneda informacionLaboral
            archivoPreviredDTO.cotizacionPactada?.toString() || "0", // Campo 79: Cotización Pactada 
            Math.round(((informacionLaboral.sueldoImponible || 0) || 0) * (salud.tasaSalud || 0)).toString(), // Campo 80: Cotización 7% hacia ISAPRE
            this.calculoAdicionalIsapre(
              (informacionLaboral.sueldoImponible || 0),
              configuracionArchivo.ufcalculos || 0,
              informacionLaboral.cotizacionPactada || 0
            ).toString(), // Campo 81: Cotización Obligatoria IPS (Diferencia 7% hacia ISAPRE)
            archivoPreviredDTO.campo82_condicional?.toString() || "0", // Campo 82: Monto Garantía Explícita de Salud GES (Uso Futuro)
            archivoPreviredDTO.codigoCCAF || "0", // Campo 83: Código CCAF
            (informacionLaboral.sueldoImponible || 0) ? (informacionLaboral.sueldoImponible || 0).toString() : "0", // Campo 84: Renta Imponible CCAF
            archivoPreviredDTO.creditosPersonalesCcaf?.toString() || "0", // Campo 85: Créditos Personales CCAF
            archivoPreviredDTO.descuentoDental?.toString() || "0", // Campo 86: Descuento Dental CCAF
            archivoPreviredDTO.descuentoLeasing?.toString() || "0", // Campo 87: Descuento Leasing CCAF
            archivoPreviredDTO.descuentoSeguroVida?.toString() || "0", // Campo 88: Descuento Seguro de Vida CCAF
            archivoPreviredDTO.otrosDescuentos?.toString() || "0", // Campo 89: Otros Descuentos CCAF
            archivoPreviredDTO.cotizacionNoIsapre?.toString() || "0", // Campo 90: Cotización CCAF no Isapre
            archivoPreviredDTO.descuentoCargasFamiliares || "0", // Campo 91: Descuento Cargas Familiares CCAF
            archivoPreviredDTO.campo92_condicional?.toString() || "0", // Campo 92: Otros descuentos CCAF 1 (Uso Futuro)
            archivoPreviredDTO.campo93_condicional?.toString() || "0", // Campo 93: Otros descuentos CCAF 2 (Uso Futuro)
            archivoPreviredDTO.campo94_condicional?.toString() || "0", // Campo 94: Bonos Gobierno (Campo futuro)
            archivoPreviredDTO.campo95_condicional || "", // Campo 95: Código de la sucursal inscrita para recibir SFE
            archivoPreviredDTO.codigoMutualidad || "0", // Campo 96: Código Mutualidad
            (informacionLaboral.sueldoImponible || 0) ? (informacionLaboral.sueldoImponible || 0) : "0", // Campo 97: Renta Imponible Mutual
            Math.round((mutualidad.tasamutual || 0) * (informacionLaboral.sueldoImponible || 0)), // Campo 98: Cotización Mutual
            archivoPreviredDTO.campo99_condicional?.toString() || "0", // Campo 99: Sucursal para pago Mutual (Código identificación de sucursal del empleador)
            (informacionLaboral.sueldoImponible || 0) ? (informacionLaboral.sueldoImponible || 0) : "0", // Campo 100: Renta Imponible Cesantía
            informacionLaboral.tipoContrato === 'indefinido'
              ? Math.round(((informacionLaboral.sueldoImponible || 0) || 0) * (informacionLaboral.tasaTrabajadorCesantia || 0))
              : "0", // Campo 101: Aporte Trabajador Cesantía
            informacionLaboral.tipoContrato === 'indefinido'
              ? Math.round(((informacionLaboral.sueldoImponible || 0) || 0) * (informacionLaboral.tasaEmpleadorCesantia || 0))
              : "0", // Campo 102: Aporte Empleador Cesantía
            archivoPreviredDTO.campo103_condicional?.toString() || "0", // Campo 103: Rut Pagadora Subsidio
            archivoPreviredDTO.campo104_condicional || "", // Campo 104: DV Pagadora Subsidio
            archivoPreviredDTO.campo105_condicional || "", // Campo 105: Centro de Costos, Sucursal, Agencia
          ].join(';');

          return datosArchivoPrevired;
        })
      );

      // Unir cada trabajador en líneas individuales para el archivo final
      const archivoPrevired = cadenasTrabajadores.join('\n');

      // Obtener la fecha actual
      const fechaActual = new Date();
      const mes = fechaActual.getMonth() + 1; // Los meses en JavaScript van de 0 a 11
      const anio = fechaActual.getFullYear();

      // Crear instancia de ArchivoPreviredGenerado utilizando manager.create
      const archivoPreviredGenerado = manager.create(ArchivosPreviredGenerado, {
        negocio: negocio,
        archivo: archivoPrevired,
        fecha: fechaActual,
        mes: mes,
        anio: anio,
        // Asigna los demás campos si es necesario
      });

      await manager.save(ArchivosPreviredGenerado, archivoPreviredGenerado);

      return archivoPrevired;
    });
  }