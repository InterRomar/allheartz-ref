import {MigrationInterface, QueryRunner} from "typeorm";

export class sync1642954381981 implements MigrationInterface {
    name = 'sync1642954381981'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."patient_gender_enum" AS ENUM('male', 'female')`);
        await queryRunner.query(`CREATE TABLE "patient" ("patient_id" SERIAL NOT NULL, "first_name" text, "last_name" text, "email" text NOT NULL, "phone_number" text NOT NULL, "date_of_birth" TIMESTAMP, "gender" "public"."patient_gender_enum", "clinician_id" integer NOT NULL, CONSTRAINT "UQ_2c56e61f9e1afb07f28882fcebb" UNIQUE ("email"), CONSTRAINT "UQ_695ad9605c02e61178645e10447" UNIQUE ("phone_number"), CONSTRAINT "PK_bd1c8f471a2198c19f43987ab05" PRIMARY KEY ("patient_id"))`);
        await queryRunner.query(`CREATE TYPE "public"."clinician_permissions_status_enum" AS ENUM('basic', 'paid')`);
        await queryRunner.query(`CREATE TABLE "clinician" ("clinician_id" SERIAL NOT NULL, "first_name" text, "last_name" text, "email" text NOT NULL, "permissions_status" "public"."clinician_permissions_status_enum" NOT NULL DEFAULT 'basic', CONSTRAINT "UQ_e9f2ef0fc3148a41943283ecaf3" UNIQUE ("email"), CONSTRAINT "PK_cd7e2bc3ab97e6f6b9dd7ccdd84" PRIMARY KEY ("clinician_id"))`);
        await queryRunner.query(`CREATE TABLE "exam_ml_result" ("exam_ml_result_id" SERIAL NOT NULL, "min_value" integer NOT NULL, "max_value" integer NOT NULL, "min_img_link" text NOT NULL, "max_img_link" text NOT NULL, "exam_id" integer NOT NULL, CONSTRAINT "REL_8853e71cce22be62816e89a8f2" UNIQUE ("exam_id"), CONSTRAINT "PK_f6b31cb246d5df70149b90ccb3d" PRIMARY KEY ("exam_ml_result_id"))`);
        await queryRunner.query(`CREATE TABLE "exam_note" ("exam_note_id" SERIAL NOT NULL, "note" text NOT NULL, "exam_id" integer NOT NULL, CONSTRAINT "PK_ef8052c6f2546eaf676f621e220" PRIMARY KEY ("exam_note_id"))`);
        await queryRunner.query(`CREATE TABLE "joint" ("joint_id" SERIAL NOT NULL, "name" text NOT NULL, "is_pair" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_07d19aad4403ae03838b2fcdcd1" PRIMARY KEY ("joint_id"))`);
        await queryRunner.query(`CREATE TABLE "movement" ("movement_id" SERIAL NOT NULL, "name" text NOT NULL, CONSTRAINT "PK_828ffc53def136476737c0c74aa" PRIMARY KEY ("movement_id"))`);
        await queryRunner.query(`CREATE TYPE "public"."region_side_enum" AS ENUM('left', 'right')`);
        await queryRunner.query(`CREATE TABLE "region" ("region_id" SERIAL NOT NULL, "side" "public"."region_side_enum" NOT NULL, "alignment_img_link" text, "example_video_link" text, "default_post_exam_survey_type" text, "default_recovery_plan" text, "joint_id" integer NOT NULL, "movement_id" integer NOT NULL, CONSTRAINT "PK_54bf2818af7cc627f2f81f091a6" PRIMARY KEY ("region_id"))`);
        await queryRunner.query(`CREATE TABLE "patient_region" ("patient_region_id" SERIAL NOT NULL, "patient_id" integer NOT NULL, "region_id" integer NOT NULL, CONSTRAINT "PK_7085a73007778905eeb9919810c" PRIMARY KEY ("patient_region_id"))`);
        await queryRunner.query(`CREATE TABLE "exam" ("exam_id" SERIAL NOT NULL, "video_link" text, "marked_up_video_link" text, "paint_scale_value" integer NOT NULL, "paint_scale_img_link" text, "outcome_score" integer, "patient_region_id" integer NOT NULL, CONSTRAINT "PK_9c1235b8acf443cd1e9982eb112" PRIMARY KEY ("exam_id"))`);
        await queryRunner.query(`CREATE TABLE "recovery_plan" ("recovery_plan_id" SERIAL NOT NULL, "duration" integer NOT NULL, "exam_cadence" integer NOT NULL, "patient_region_id" integer NOT NULL, CONSTRAINT "PK_bfa503518e783e1550e45365b5c" PRIMARY KEY ("recovery_plan_id"))`);
        await queryRunner.query(`CREATE TYPE "public"."goal_weight_option_enum" AS ENUM('none', 'WBAT', 'TDWB')`);
        await queryRunner.query(`CREATE TABLE "goal" ("goal_id" SERIAL NOT NULL, "duration" text NOT NULL, "weight_option" "public"."goal_weight_option_enum" NOT NULL DEFAULT 'none', "rom" integer NOT NULL, "recovery_plan_id" integer NOT NULL, "patient_region_id" integer NOT NULL, CONSTRAINT "PK_2d199148876db1d4ff34ac2b0d5" PRIMARY KEY ("goal_id"))`);
        await queryRunner.query(`ALTER TABLE "patient" ADD CONSTRAINT "fk_patient<=clinician.clinician_idclinician_id" FOREIGN KEY ("clinician_id") REFERENCES "clinician"("clinician_id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "exam_ml_result" ADD CONSTRAINT "fk_exam_ml_result<=exam.exam_idexam_id" FOREIGN KEY ("exam_id") REFERENCES "exam"("exam_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "exam_note" ADD CONSTRAINT "fk_exam_note<=exam.exam_idexam_id" FOREIGN KEY ("exam_id") REFERENCES "exam"("exam_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "region" ADD CONSTRAINT "fk_region<=joint.joint_idjoint_id" FOREIGN KEY ("joint_id") REFERENCES "joint"("joint_id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "region" ADD CONSTRAINT "fk_region<=movement.movement_idmovement_id" FOREIGN KEY ("movement_id") REFERENCES "movement"("movement_id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "patient_region" ADD CONSTRAINT "fk_patient_region<=patient.patient_idpatient_id" FOREIGN KEY ("patient_id") REFERENCES "patient"("patient_id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "patient_region" ADD CONSTRAINT "fk_patient_region<=region.region_idregion_id" FOREIGN KEY ("region_id") REFERENCES "region"("region_id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "exam" ADD CONSTRAINT "fk_exam<=patient_region.patient_region_idpatient_region_id" FOREIGN KEY ("patient_region_id") REFERENCES "patient_region"("patient_region_id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "recovery_plan" ADD CONSTRAINT "fk_recovery_plan<=patient_region.patient_region_idpatient_region_id" FOREIGN KEY ("patient_region_id") REFERENCES "patient_region"("patient_region_id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "goal" ADD CONSTRAINT "fk_goal<=recovery_plan.recovery_plan_idrecovery_plan_id" FOREIGN KEY ("recovery_plan_id") REFERENCES "recovery_plan"("recovery_plan_id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "goal" ADD CONSTRAINT "fk_goal<=patient_region.patient_region_idpatient_region_id" FOREIGN KEY ("patient_region_id") REFERENCES "patient_region"("patient_region_id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "goal" DROP CONSTRAINT "fk_goal<=patient_region.patient_region_idpatient_region_id"`);
        await queryRunner.query(`ALTER TABLE "goal" DROP CONSTRAINT "fk_goal<=recovery_plan.recovery_plan_idrecovery_plan_id"`);
        await queryRunner.query(`ALTER TABLE "recovery_plan" DROP CONSTRAINT "fk_recovery_plan<=patient_region.patient_region_idpatient_region_id"`);
        await queryRunner.query(`ALTER TABLE "exam" DROP CONSTRAINT "fk_exam<=patient_region.patient_region_idpatient_region_id"`);
        await queryRunner.query(`ALTER TABLE "patient_region" DROP CONSTRAINT "fk_patient_region<=region.region_idregion_id"`);
        await queryRunner.query(`ALTER TABLE "patient_region" DROP CONSTRAINT "fk_patient_region<=patient.patient_idpatient_id"`);
        await queryRunner.query(`ALTER TABLE "region" DROP CONSTRAINT "fk_region<=movement.movement_idmovement_id"`);
        await queryRunner.query(`ALTER TABLE "region" DROP CONSTRAINT "fk_region<=joint.joint_idjoint_id"`);
        await queryRunner.query(`ALTER TABLE "exam_note" DROP CONSTRAINT "fk_exam_note<=exam.exam_idexam_id"`);
        await queryRunner.query(`ALTER TABLE "exam_ml_result" DROP CONSTRAINT "fk_exam_ml_result<=exam.exam_idexam_id"`);
        await queryRunner.query(`ALTER TABLE "patient" DROP CONSTRAINT "fk_patient<=clinician.clinician_idclinician_id"`);
        await queryRunner.query(`DROP TABLE "goal"`);
        await queryRunner.query(`DROP TYPE "public"."goal_weight_option_enum"`);
        await queryRunner.query(`DROP TABLE "recovery_plan"`);
        await queryRunner.query(`DROP TABLE "exam"`);
        await queryRunner.query(`DROP TABLE "patient_region"`);
        await queryRunner.query(`DROP TABLE "region"`);
        await queryRunner.query(`DROP TYPE "public"."region_side_enum"`);
        await queryRunner.query(`DROP TABLE "movement"`);
        await queryRunner.query(`DROP TABLE "joint"`);
        await queryRunner.query(`DROP TABLE "exam_note"`);
        await queryRunner.query(`DROP TABLE "exam_ml_result"`);
        await queryRunner.query(`DROP TABLE "clinician"`);
        await queryRunner.query(`DROP TYPE "public"."clinician_permissions_status_enum"`);
        await queryRunner.query(`DROP TABLE "patient"`);
        await queryRunner.query(`DROP TYPE "public"."patient_gender_enum"`);
    }

}
