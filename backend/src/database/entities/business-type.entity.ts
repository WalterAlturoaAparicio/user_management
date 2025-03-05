import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Role } from './role.entity';

@Entity('business_type')
export class BusinessType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  key: string;

  @OneToMany(() => Role, (role) => role.businessType)
  roles: Role[];

  @Column({nullable: true})
  name_es: string;

  @Column({nullable: true})
  name_en: string;

  @Column({nullable: true})
  description_es: string;

  @Column({nullable: true})
  description_en: string;
}
