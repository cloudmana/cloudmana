import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateUsersTable1592555965808 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: '_id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'username',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'email',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'firstName',
            type: 'varchar',
          },
          {
            name: 'lastName',
            type: 'varchar',
          },
          {
            name: 'password',
            type: 'varchar',
          },
          {
            name: 'isActive',
            type: 'tinyInt',
            default: 1,
          },
          {
            name: 'role',
            type: 'string',
          },
          {
            name: 'roles',
            type: 'string',
          },
          {
            name: 'createdAt',
            type: 'datetime',
            default: 'now()',
            isNullable: true,
          },
          {
            name: 'updatedAt',
            type: 'datetime',
            default: 'now()',
            isNullable: true,
          },
        ],
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users')
  }
}
