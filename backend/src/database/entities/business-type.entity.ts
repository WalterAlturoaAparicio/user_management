import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class BusinessType {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  description: string
}
