import { MigrationInterface, QueryRunner } from 'typeorm';

export class syncc1642869765405 implements MigrationInterface {
  name = 'syncc1642869765405';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE TABLE "joint" ("joint_id" SERIAL NOT NULL, "name" text NOT NULL, "is_pair" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_07d19aad4403ae03838b2fcdcd1" PRIMARY KEY ("joint_id"))');
    await queryRunner.query('CREATE TABLE "movement" ("movement_id" SERIAL NOT NULL, "name" text NOT NULL, CONSTRAINT "PK_828ffc53def136476737c0c74aa" PRIMARY KEY ("movement_id"))');
    await queryRunner.query('ALTER TABLE "region" DROP COLUMN "joint"');
    await queryRunner.query('DROP TYPE "public"."region_joint_enum"');
    await queryRunner.query('ALTER TABLE "region" ADD "joint_id" integer NOT NULL');
    await queryRunner.query('ALTER TABLE "region" ADD "movement_id" integer NOT NULL');
    await queryRunner.query('ALTER TABLE "region" ADD CONSTRAINT "fk_region<=joint.joint_idjoint_id" FOREIGN KEY ("joint_id") REFERENCES "joint"("joint_id") ON DELETE SET NULL ON UPDATE NO ACTION');
    await queryRunner.query('ALTER TABLE "region" ADD CONSTRAINT "fk_region<=movement.movement_idmovement_id" FOREIGN KEY ("movement_id") REFERENCES "movement"("movement_id") ON DELETE SET NULL ON UPDATE NO ACTION');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "region" DROP CONSTRAINT "fk_region<=movement.movement_idmovement_id"');
    await queryRunner.query('ALTER TABLE "region" DROP CONSTRAINT "fk_region<=joint.joint_idjoint_id"');
    await queryRunner.query('ALTER TABLE "region" DROP COLUMN "movement_id"');
    await queryRunner.query('ALTER TABLE "region" DROP COLUMN "joint_id"');
    await queryRunner.query('CREATE TYPE "public"."region_joint_enum" AS ENUM(\'knee\')');
    await queryRunner.query('ALTER TABLE "region" ADD "joint" "public"."region_joint_enum" NOT NULL DEFAULT \'knee\'');
    await queryRunner.query('DROP TABLE "movement"');
    await queryRunner.query('DROP TABLE "joint"');
  }
}
