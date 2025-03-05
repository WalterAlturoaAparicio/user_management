import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  ManyToMany,
  JoinTable,
  Unique,
  JoinColumn,
} from 'typeorm'
import { User } from './user.entity'
import { BusinessType } from './business-type.entity'
import { Permission } from './permission.entity'

@Entity()
@Unique(['key', 'businessTypeId'])
export class Role {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  key: string

  @OneToMany(() => User, (user) => user.role)
  users: User[]

  @ManyToOne(() => BusinessType, (businessType) => businessType.roles, {
    nullable: true,
  })
  @JoinColumn({ name: 'businessTypeId' })
  businessType: BusinessType

  @Column({ nullable: true })
  businessTypeId: number

  @ManyToMany(() => Permission, (permission) => permission.roles)
  @JoinTable()
  permissions: Permission[]

  @Column({ nullable: true })
  name_es: string

  @Column({ nullable: true })
  name_en: string

  @Column({ nullable: true })
  description_es: string

  @Column({ nullable: true })
  description_en: string
}
