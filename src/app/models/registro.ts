export interface Registro {
    id?: string;
    fecha_1_dosis?: Date;
    fecha_2_dosis?: Date;
    num_dosis_aplicadas?: number;
    id_profesional?: string;
    id_paciente?: string;
    id_vacuna?: string;
    id_centro? : string;
}