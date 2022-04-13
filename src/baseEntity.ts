import { BeforeUpdate, Column} from 'typeorm';

export class BaseEntity {
  @Column({ type: 'date', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
  @Column({ type: 'date', default: () => 'CURRENT_TIMESTAMP' ,})
  updateAt: Date;

  @BeforeUpdate()
  updateTimestamp() {
    this.updateAt = new Date()
  }
}