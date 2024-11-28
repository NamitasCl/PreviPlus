export const haberes = [
    { 
      concepto: 'Sueldo Base', 
      monto: '800.000',
      descripcion: 'Remuneración base mensual según contrato'
    },
    { 
      concepto: 'Gratificación Legal', 
      monto: '200.000',
      descripcion: '25% de la remuneración mensual con tope de 4.75 IMM'
    },
    { 
      concepto: 'Bono de Responsabilidad', 
      monto: '100.000',
      descripcion: 'Bono por cargo de responsabilidad'
    },
    { 
      concepto: 'Colación', 
      monto: '50.000',
      descripcion: 'Asignación no imponible para alimentación'
    },
    { 
      concepto: 'Movilización', 
      monto: '30.000',
      descripcion: 'Asignación no imponible para transporte'
    },
  ];
  
  export const descuentos = [
    { 
      concepto: 'AFP (10%)', 
      monto: '80.000',
      descripcion: 'Cotización obligatoria para pensiones'
    },
    { 
      concepto: 'Salud (7%)', 
      monto: '56.000',
      descripcion: 'Cotización obligatoria de salud'
    },
    { 
      concepto: 'Seguro Cesantía', 
      monto: '24.000',
      descripcion: 'Seguro obligatorio de cesantía (0.6%)'
    },
    { 
      concepto: 'Impuesto Único', 
      monto: '15.000',
      descripcion: 'Impuesto único de segunda categoría'
    },
  ];
  
  export const totales = {
    haberes: '1.180.000',
    descuentos: '175.000',
    liquido: '1.005.000'
  };