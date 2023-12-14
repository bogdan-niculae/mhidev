export const setField = (field) => {
  const name = field.target.name;
  const value = field.target.value;
  return {
    type: "SET_FIELD",
    payload: {
      name,
      value,
    },
  };
};

export const setHomeCityState = (data) => {
  return {
    type: "SET_HOME_CITY_STATE",
    payload: {
      home_city: data.places[0]["place name"],
      home_state: data.places[0]["state abbreviation"],
    },
  };
};

export const clearHomeCityState = () => {
  return {
    type: "CLEAR_HOME_CITY_STATE",
    payload: {
      home_city: "",
      home_state: "",
    },
  };
};
