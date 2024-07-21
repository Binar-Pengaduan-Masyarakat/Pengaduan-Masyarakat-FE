/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema
      .createTable("User", (table) => {
        table.string("userId", 255).primary();
        table.string("hasImage").defaultTo(false);
        table.string("name", 255);
        table.string("email", 255).unique();
        table.string("password", 255);
        table.string("roles", 255).checkIn(["USER", "INSTITUTION", "SUPERADMIN"]);
        table.timestamp("createdAt").defaultTo(knex.fn.now());
      })
      .raw(
        `
        CREATE OR REPLACE FUNCTION set_user_id() RETURNS TRIGGER AS $$
        DECLARE
          max_id INTEGER;
        BEGIN
          SELECT COALESCE(MAX(CAST(SUBSTRING("userId", 7) AS INTEGER)), 0) INTO max_id FROM "User"
          WHERE SUBSTRING("userId", 1, 6) = CONCAT(UPPER(SUBSTRING(NEW.roles, 1, 2)), to_char(NEW."createdAt", 'MMYY'));
          NEW."userId" := CONCAT(UPPER(SUBSTRING(NEW.roles, 1, 2)), to_char(NEW."createdAt", 'MMYY'), (max_id + 1)::TEXT); 
          RETURN NEW;
        END;
        $$ LANGUAGE plpgsql;
      `
      )
      .raw(
        `
        CREATE TRIGGER before_user_insert
        BEFORE INSERT ON "User"
        FOR EACH ROW
        EXECUTE PROCEDURE set_user_id();
      `
      )
  
      .createTable("Category", (table) => {
        table.string("categoryId", 255).primary();
        table.string("categoryName", 255).unique();
      })
      .raw(
        `
        CREATE OR REPLACE FUNCTION set_category_id() RETURNS TRIGGER AS $$
        DECLARE
          max_id INTEGER;
        BEGIN
          SELECT COALESCE(MAX(CAST(SUBSTRING("categoryId", 3) AS INTEGER)), 0) INTO max_id FROM "Category";
          NEW."categoryId" := CONCAT('CA', (max_id + 1)::TEXT); 
          RETURN NEW;
        END;
        $$ LANGUAGE plpgsql;
      `
      )
      .raw(
        `
        CREATE TRIGGER before_category_insert
        BEFORE INSERT ON "Category"
        FOR EACH ROW
        EXECUTE PROCEDURE set_category_id();
      `
      )
  
      .createTable("UserCategory", (table) => {
        table.string("userCategoryId", 255).primary();
        table
          .string("categoryId", 255)
          .references("categoryId")
          .inTable("Category")
          .onDelete("CASCADE");
        table
          .string("userId", 255)
          .references("userId")
          .inTable("User")
          .onDelete("CASCADE");
        table.unique(["categoryId", "userId"]);
      })
      .raw(
        `
        CREATE OR REPLACE FUNCTION check_usercategory() RETURNS TRIGGER AS $$
        BEGIN
          IF EXISTS (SELECT 1 FROM "UserCategory" WHERE "categoryId" = NEW."categoryId" AND "userId" = NEW."userId") THEN
            RAISE EXCEPTION 'The same user cannot be assigned to the same category more than once';
          END IF;
          RETURN NEW;
        END;
        $$ LANGUAGE plpgsql;
      `
      )
      .raw(
        `
        CREATE TRIGGER before_usercategory_insert
        BEFORE INSERT ON "UserCategory"
        FOR EACH ROW
        EXECUTE PROCEDURE check_usercategory();
      `
      )
      .raw(
        `
        CREATE OR REPLACE FUNCTION set_usercategory_id() RETURNS TRIGGER AS $$
        DECLARE
          max_id INTEGER;
        BEGIN
          SELECT COALESCE(MAX(CAST(SUBSTRING("userCategoryId", 3) AS INTEGER)), 0) INTO max_id FROM "UserCategory";
          NEW."userCategoryId" := CONCAT('UC', (max_id + 1)::TEXT); 
          RETURN NEW;
        END;
        $$ LANGUAGE plpgsql;
      `
      )
      .raw(
        `
        CREATE TRIGGER before_usercategory_insert_id
        BEFORE INSERT ON "UserCategory"
        FOR EACH ROW
        EXECUTE PROCEDURE set_usercategory_id();
      `
      )
  
      .createTable("UserReport", (table) => {
        table.string("reportId", 255).primary();
        table.text("reportContent");
        table.string("hasImage").defaultTo(false);
        table
          .string("categoryId", 255)
          .references("categoryId")
          .inTable("Category")
          .onDelete("CASCADE");
        table
          .string("userId", 255)
          .references("userId")
          .inTable("User")
          .onDelete("CASCADE");
        table.string("district", 255);
        table.string("subdistrict", 255);
        table.string("address", 255);
        table.timestamp("createdAt").defaultTo(knex.fn.now());
      })
      .raw(
        `
        CREATE OR REPLACE FUNCTION set_userreport_id() RETURNS TRIGGER AS $$
        DECLARE
          max_id INTEGER;
        BEGIN
          SELECT COALESCE(MAX(CAST(SUBSTRING("reportId", 7) AS INTEGER)), 0) INTO max_id FROM "UserReport"
          WHERE SUBSTRING("reportId", 1, 6) = CONCAT('UR', to_char(NEW."createdAt", 'MMYY'));
          NEW."reportId" := CONCAT('UR', to_char(NEW."createdAt", 'MMYY'), (max_id + 1)::TEXT);
          RETURN NEW;
        END;
        $$ LANGUAGE plpgsql;
      `
      )
      .raw(
        `
        CREATE TRIGGER before_userreport_insert
        BEFORE INSERT ON "UserReport"
        FOR EACH ROW
        EXECUTE PROCEDURE set_userreport_id();
      `
      )
  
      .createTable("ReportResponse", (table) => {
        table.string("responseId", 255).primary();
        table
          .string("reportId", 255)
          .references("reportId")
          .inTable("UserReport")
          .onDelete("CASCADE");
        table
          .string("userId", 255)
          .references("userId")
          .inTable("User")
          .onDelete("CASCADE");
        table.timestamp("responseDate").defaultTo(knex.fn.now());
        table.unique(["reportId", "userId"]);
      })
      .raw(
        `
        CREATE OR REPLACE FUNCTION check_reportresponse() RETURNS TRIGGER AS $$
        BEGIN
          IF EXISTS (SELECT 1 FROM "ReportResponse" WHERE "reportId" = NEW."reportId") THEN
            RAISE EXCEPTION 'The same report cannot have more than one response';
          END IF;
          
          RETURN NEW;
        END;
        $$ LANGUAGE plpgsql;
      `
      )
      .raw(
        `
        CREATE TRIGGER before_reportresponse_insert
        BEFORE INSERT ON "ReportResponse"
        FOR EACH ROW
        EXECUTE PROCEDURE check_reportresponse();
      `
      )
      .raw(
        `
        CREATE OR REPLACE FUNCTION set_reportresponse_id() RETURNS TRIGGER AS $$
        DECLARE
          max_id INTEGER;
        BEGIN
          SELECT COALESCE(MAX(CAST(SUBSTRING("responseId", 7) AS INTEGER)), 0) INTO max_id FROM "ReportResponse"
          WHERE SUBSTRING("responseId", 1, 6) = CONCAT('RR', to_char((SELECT "createdAt" FROM "UserReport" WHERE "reportId" = NEW."reportId"), 'MMYY'));
          NEW."responseId" := CONCAT('RR', to_char((SELECT "createdAt" FROM "UserReport" WHERE "reportId" = NEW."reportId"), 'MMYY'), (max_id + 1)::TEXT); 
          RETURN NEW;
        END;
        $$ LANGUAGE plpgsql;
      `
      )
      .raw(
        `
        CREATE TRIGGER before_reportresponse_insert_id
        BEFORE INSERT ON "ReportResponse"
        FOR EACH ROW
        EXECUTE PROCEDURE set_reportresponse_id();
      `
      )
  
      .createTable("ReportResult", (table) => {
        table.string("resultId", 255).primary();
        table
          .string("reportId", 255)
          .references("reportId")
          .inTable("UserReport")
          .onDelete("CASCADE");
        table
          .string("userId", 255)
          .references("userId")
          .inTable("User")
          .onDelete("CASCADE");
        table.text("resultContent");
        table.boolean("hasImage").defaultTo(false);
        table.timestamp("resultDate").defaultTo(knex.fn.now());
        table.unique(["reportId", "userId"]);
      })
      .raw(
        `
        CREATE OR REPLACE FUNCTION check_reportresult() RETURNS TRIGGER AS $$
        BEGIN
          IF EXISTS (SELECT 1 FROM "ReportResult" WHERE "reportId" = NEW."reportId") THEN
            RAISE EXCEPTION 'The same report cannot have more than one result';
          END IF;
          RETURN NEW;
        END;
        $$ LANGUAGE plpgsql;
      `
      )
      .raw(
        `
        CREATE TRIGGER before_reportresult_insert
        BEFORE INSERT ON "ReportResult"
        FOR EACH ROW
        EXECUTE PROCEDURE check_reportresult();
      `
      )
      .raw(
        `
        CREATE OR REPLACE FUNCTION set_result_id() RETURNS TRIGGER AS $$
        DECLARE
          max_id INTEGER;
        BEGIN
          SELECT COALESCE(MAX(CAST(SUBSTRING("resultId", 3) AS INTEGER)), 0) INTO max_id FROM "ReportResult";
          NEW."resultId" := CONCAT('RE', (max_id + 1)::TEXT); 
          RETURN NEW;
        END;
        $$ LANGUAGE plpgsql;
      `
      )
      .raw(
        `
        CREATE TRIGGER before_result_insert
        BEFORE INSERT ON "ReportResult"
        FOR EACH ROW
        EXECUTE PROCEDURE set_result_id(); 
      `
      )
  
      .createTable("SameReporter", (table) => {
        table.string("sameReporterId", 255).primary();
        table
          .string("reportId", 255)
          .references("reportId")
          .inTable("UserReport")
          .onDelete("CASCADE");
        table
          .string("userId", 255)
          .references("userId")
          .inTable("User")
          .onDelete("CASCADE");
        table.unique(["reportId", "userId"]);
      })
      .raw(
        `
        CREATE OR REPLACE FUNCTION check_samereporter() RETURNS TRIGGER AS $$
        BEGIN
          IF EXISTS (SELECT 1 FROM "UserReport" WHERE "reportId" = NEW."reportId" AND "userId" = NEW."userId") THEN
            RAISE EXCEPTION 'The user who created the report cannot be added to SameReporter';
          END IF;
          IF EXISTS (SELECT 1 FROM "SameReporter" WHERE "reportId" = NEW."reportId" AND "userId" = NEW."userId") THEN
            RAISE EXCEPTION 'The same user cannot be added to the same report more than once in SameReporter';
          END IF;
          RETURN NEW;
        END;
        $$ LANGUAGE plpgsql;
      `
      )
      .raw(
        `
        CREATE TRIGGER before_samereporter_insert
        BEFORE INSERT ON "SameReporter"
        FOR EACH ROW
        EXECUTE PROCEDURE check_samereporter();
      `
      )
      .raw(
        `
        CREATE OR REPLACE FUNCTION set_samereporter_id() RETURNS TRIGGER AS $$
        DECLARE
          max_id INTEGER;
        BEGIN
          SELECT COALESCE(MAX(CAST(SUBSTRING("sameReporterId", 3) AS INTEGER)), 0) INTO max_id FROM "SameReporter";
          NEW."sameReporterId" := CONCAT('SR', (max_id + 1)::TEXT);
          RETURN NEW;
        END;
        $$ LANGUAGE plpgsql;
      `
      )
      .raw(
        `
        CREATE TRIGGER before_samereporter_insert_id
        BEFORE INSERT ON "SameReporter"
        FOR EACH ROW
        EXECUTE PROCEDURE set_samereporter_id();
      `
      );
  };
  
  exports.down = function (knex) {
    return knex.schema
      .dropTableIfExists("SameReporter")
      .dropTableIfExists("ReportResult")
      .dropTableIfExists("ReportResponse")
      .dropTableIfExists("UserReport")
      .dropTableIfExists("UserCategory")
      .dropTableIfExists("Category")
      .dropTableIfExists("User");
  };