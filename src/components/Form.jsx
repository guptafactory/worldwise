import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCities } from "../contexts/CitiesContext";
import { useReverseGeocode } from "../hooks/useReverseGeocode";
import Button from "./Button";
import BackButton from "./BackButton";
import Spinner from "./Spinner";
import Message from "./Message";
import styles from "./Form.module.css";

function Form() {
  const navigate = useNavigate();
  const { createCity, isLoading } = useCities();
  const [notes, setNotes] = useState("");
  const [date, setDate] = useState(new Date());

  const [
    lat,
    lng,
    cityName,
    country,
    emoji,
    isLoadingGeocoding,
    geocodingError,
    setCityName,
  ] = useReverseGeocode();

  async function handleSubmit(e) {
    e.preventDefault();
    if (!cityName || !date) return;

    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: { lat, lng },
    };

    await createCity(newCity);
    navigate("/app/cities");
  }

  if (!lat && !lng)
    return <Message message={"Start by clicking on map position anywhere."} />;
  if (geocodingError) return <Message message={geocodingError} />;
  if (isLoadingGeocoding) return <Spinner />;

  return (
    <form
      className={`${styles.form} ${isLoading ? styles.loading : ""}`}
      onSubmit={(e) => handleSubmit(e)}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          disabled={true}
          value={cityName}
          onChange={(e) => setCityName(e.target.value)}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker
          selected={date}
          onChange={(date) => setDate(date)}
          dateFormat="dd/MM/yyyy"
          isClearable
          placeholderText="Mark the date of visit 🚀"
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type={"primary"}>Add</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
