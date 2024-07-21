/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
    // Disable triggers for all tables
    const tables = [
      "User",
      "Category",
      "UserCategory",
      "UserReport",
      "ReportResponse",
      "ReportResult",
      "SameReporter",
    ];
    for (const table of tables) {
      await knex.raw(`ALTER TABLE "${table}" DISABLE TRIGGER ALL;`);
    }
  
    // Delete existing data (be careful in production!)
    // Delete in reverse order of foreign key dependencies to avoid errors
    await knex("SameReporter").del();
    await knex("ReportResult").del();
    await knex("ReportResponse").del();
    await knex("UserReport").del();
    await knex("UserCategory").del();
    await knex("Category").del();
    await knex("User").del();
  
    // Insert seed data with specific IDs
    await knex("User").insert([
      {
        userId: "US06241",
        name: "Asep",
        email: "asep@example.com",
        password: "asepganteng",
        roles: "USER",
      },
      {
        userId: "US06242",
        name: "Alice",
        email: "alice@example.com",
        password: "pass123",
        roles: "USER",
      },
      {
        userId: "IN06241",
        name: "Bob",
        email: "bob@example.com",
        password: "securepwd",
        roles: "INSTITUTION",
      },
      {
        userId: "SU06241",
        name: "Charlie",
        email: "charlie@example.com",
        password: "admin123",
        roles: "SUPERADMIN",
      },
    ]);
  
    await knex("Category").insert([
      { categoryId: "CA1", categoryName: "Road Damage" },
      { categoryId: "CA2", categoryName: "Public Facility Issues" },
      { categoryId: "CA3", categoryName: "Environmental Concern" },
    ]);
  
    await knex("UserCategory").insert([
      { userCategoryId: "UC1", categoryId: "CA1", userId: "IN06241" },
    ]);
  
    await knex("UserReport").insert([
      {
        reportId: "UR06241",
        reportContent: "Pothole on Main St",
        categoryId: "CA1",
        userId: "US06241",
        district: "District A",
        subdistrict: "Subdistrict 1",
        address: "123 Main St",
      },
    ]);
  
    await knex("ReportResponse").insert([
      { responseId: "RR06241", reportId: "UR06241", userId: "IN06241" },
    ]);
  
    await knex("ReportResult").insert([
      {
        resultId: "RE1",
        reportId: "UR06241",
        userId: "IN06241",
        resultContent: "Issue resolved - pothole filled.",
      },
    ]);
  
    await knex("SameReporter").insert([
      { sameReporterId: "SR1", reportId: "UR06241", userId: "US06241" },
    ]);
  
    // Re-enable triggers for all tables
    for (const table of tables) {
      await knex.raw(`ALTER TABLE "${table}" ENABLE TRIGGER ALL;`);
    }
  };