// models/property.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('properties')
export class Property {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar', length: 255, default: '' }) // Default empty string
    name?: string;

    @Column({ type: 'varchar', length: 255, default: '' }) // Default empty string
    address?: string;

    @Column({ type: 'varchar', length: 255, default: '' }) // Default empty string
    state?: string;

    @Column({ type: 'varchar', length: 255, default: '' }) // Default empty string
    city?: string;

    @Column({ type: 'varchar', length: 20, default: '' }) // Default empty string
    zipCode?: string;

    @Column({ type: 'varchar', length: 255, default: '' }) // Default empty string
    county?: string;

    @Column({ type: 'varchar', length: 20, default: '' }) // Default empty string
    phone?: string;

    @Column({ type: 'varchar', length: 100, default: '' }) // Default empty string
    type?: string;

    @Column({ type: 'int', default: 0 }) // Default 0
    capacity?: number;
}
