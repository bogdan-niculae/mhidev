import React from "react";
import BirthDateField from "./BirthDateField";
import RelationshipField from "./RelationshipField";
import SexField from "./SexField";
import TobaccoField from "./TobaccoField";

const RelationshipGroupFields = ({
  index,
  handleBlur,
  handleChange,
  values,
  setFieldValue,
}) => {
  return (
    <>
      <RelationshipField name={`relationships.${index}.relationship`} />
      <BirthDateField
        name={`relationships.${index}.birthDate`}
        handleBlur={handleBlur}
        handleChange={handleChange}
      />
      <SexField
        name={`relationships.${index}.gender`}
        handleChange={handleChange}
        values={values}
        index={index}
        setFieldValue={setFieldValue}
      />
      <TobaccoField
        name={`relationships.${index}.isTobaccoUser`}
        handleChange={handleChange}
        values={values}
        index={index}
      />
    </>
  );
};

export default RelationshipGroupFields;
