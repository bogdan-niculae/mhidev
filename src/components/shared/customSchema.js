export const customSchema = (schema) => {
  const fixedSchema = schema
    .replace(/18.214.164.211/g, "www.myhealthinsurance.com")
    .replace(/"item":"\/"/gi, `"item":"https://www.myhealthinsurance.com/"`)
    .replace(
      /\/wp-content\/uploads\/2022\/02\/logo.png/gi,
      "/mhi-logo-schema.png"
    );
  // console.log(fixedSchema);
  return JSON.parse(fixedSchema);
};
