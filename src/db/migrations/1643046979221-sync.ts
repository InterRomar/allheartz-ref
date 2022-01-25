import {MigrationInterface, QueryRunner} from "typeorm";

export class sync1643046979221 implements MigrationInterface {
    name = 'sync1643046979221'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recovery_plan" DROP CONSTRAINT "fk_recovery_plan<=patient_region.patient_region_idpatient_regio"`);
        await queryRunner.query(`CREATE TABLE "survey_topic" ("survey_topic_id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_4390c3add0d0907f8d32c97b4d3" PRIMARY KEY ("survey_topic_id"))`);
        await queryRunner.query(`CREATE TABLE "survey_group" ("survey_group_id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying, "survery_topic_id" integer NOT NULL, CONSTRAINT "PK_d566df7fa78681611d50107b1a9" PRIMARY KEY ("survey_group_id"))`);
        await queryRunner.query(`CREATE TYPE "public"."survey_question_answer_type_enum" AS ENUM('periodicity', 'sdf')`);
        await queryRunner.query(`CREATE TABLE "survey_question" ("survey_question_id" SERIAL NOT NULL, "question" character varying NOT NULL, "answer_type" "public"."survey_question_answer_type_enum" NOT NULL DEFAULT 'periodicity', "survey_group_id" integer NOT NULL, "survery_group_id" integer, CONSTRAINT "PK_8da72fbfe341683757c4fc4b93a" PRIMARY KEY ("survey_question_id"))`);
        await queryRunner.query(`ALTER TABLE "recovery_plan" ADD CONSTRAINT "fk_recovery_plan<=patient_region.patient_region_idpatient_region_id" FOREIGN KEY ("patient_region_id") REFERENCES "patient_region"("patient_region_id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "survey_group" ADD CONSTRAINT "fk_survey_group<=survey_topic.survery_topic_idsurvey_topic_id" FOREIGN KEY ("survery_topic_id") REFERENCES "survey_topic"("survey_topic_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "survey_question" ADD CONSTRAINT "fk_survey_question<=survey_group.survery_group_idsurvey_group_id" FOREIGN KEY ("survery_group_id") REFERENCES "survey_group"("survey_group_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "survey_question" DROP CONSTRAINT "fk_survey_question<=survey_group.survery_group_idsurvey_group_id"`);
        await queryRunner.query(`ALTER TABLE "survey_group" DROP CONSTRAINT "fk_survey_group<=survey_topic.survery_topic_idsurvey_topic_id"`);
        await queryRunner.query(`ALTER TABLE "recovery_plan" DROP CONSTRAINT "fk_recovery_plan<=patient_region.patient_region_idpatient_region_id"`);
        await queryRunner.query(`DROP TABLE "survey_question"`);
        await queryRunner.query(`DROP TYPE "public"."survey_question_answer_type_enum"`);
        await queryRunner.query(`DROP TABLE "survey_group"`);
        await queryRunner.query(`DROP TABLE "survey_topic"`);
        await queryRunner.query(`ALTER TABLE "recovery_plan" ADD CONSTRAINT "fk_recovery_plan<=patient_region.patient_region_idpatient_regio" FOREIGN KEY ("patient_region_id") REFERENCES "patient_region"("patient_region_id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

}
