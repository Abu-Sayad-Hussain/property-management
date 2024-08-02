import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('properties')
export class Property {
    @PrimaryGeneratedColumn()
    id!: number; // Initialize with a default value

    @Column()
    address?: string;

    @Column()
    city?: string;

    @Column()
    zipCode?: string;

    @Column()
    county?: string;

    @Column()
    phone?: string;

    @Column()
    type?: string;

    @Column()
    capacity?: number;
}
