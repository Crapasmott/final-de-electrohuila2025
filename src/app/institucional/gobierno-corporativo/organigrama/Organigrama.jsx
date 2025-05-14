import { Tree, TreeNode } from 'react-organizational-chart';
import styles from './Organigrama.module.css'; // Opcional: CSS modules

export default function Organigrama() {
  return (
    <div className={styles.container}>
      <Tree 
        label={<div className={styles.ceo}>Gerencia General</div>}
        lineWidth="2px"
        lineColor="#0070f3"
        lineBorderRadius="10px"
      >
        <TreeNode label={<div className={styles.department}>Subgerencia de Distribución</div>}>
          <TreeNode label="División Ingeniería de Proyectos" />
          <TreeNode label="División Operación y Mantenimiento" />
          {/* ...otros nodos */}
        </TreeNode>

        <TreeNode label={<div className={styles.department}>Subgerencia Comercial</div>}>
          <TreeNode label="División Gestión Comercial" />
          {/* ...otros nodos */}
        </TreeNode>
      </Tree>
    </div>
  );
}