import React, { Suspense } from 'react';
import CargadorEsqueleto from './CargadorEsqueleto';

/**
 * Componente que envuelve componentes cargados dinámicamente
 * para mostrar un esqueleto de carga mientras se cargan
 */
const ComponenteCargable = ({
  componente: Componente,
  cargando,
  error,
  tipoEsqueleto = "texto",
  fallback,
  props = {},
  ...esquetoProps
}) => {
  // Si se proporciona un estado de carga explícito
  if (cargando) {
    return fallback || <CargadorEsqueleto tipo={tipoEsqueleto} {...esquetoProps} />;
  }
  
  // Si hay un error
  if (error) {
    return (
      <div className="error-carga">
        <p>Error al cargar el componente: {error.message}</p>
      </div>
    );
  }
  
  // Si Componente no es válido
  if (!Componente) {
    return null;
  }
  
  // Renderizar el componente
  return <Componente {...props} />;
};

/**
 * HOC para cargar un componente dinámicamente con Next.js dynamic import
 */
export const conCarga = (importPromise, options = {}) => {
  const {
    tipoEsqueleto = "texto",
    ...esqueletoProps
  } = options;
  
  return (props) => (
    <Suspense fallback={<CargadorEsqueleto tipo={tipoEsqueleto} {...esqueletoProps} />}>
      <ComponenteCargable
        componente={importPromise}
        props={props}
      />
    </Suspense>
  );
};

export default ComponenteCargable;