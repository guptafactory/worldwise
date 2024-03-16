// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"
import { useState, useEffect } from "react";
import { useUrlPosition } from "../hooks/useUrlPosition";

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

export function useReverseGeocode() {
  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
  const [geocodingError, setGeocodingError] = useState("");

  const [lat, lng] = useUrlPosition();
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [emoji, setEmoji] = useState("");

  useEffect(
    function () {
      if (!lat && !lng) return;
      async function getCityData() {
        try {
          setGeocodingError("");
          setIsLoadingGeocoding(true);

          const res = await fetch(
            `${BASE_URL}?latitude=${lat}&longitude=${lng}`
          );
          if (!res.ok) throw new Error("City data can't be loaded");

          const data = await res.json();
          if (!data) throw new Error("City data can't be loaded");
          if (!data.countryCode)
            throw new Error(
              "That doesn't seem to be a country! Click somewhere else. 😉"
            );

          setCityName(data.city || data.locality || "");
          setCountry(data.countryName || "");
          setEmoji(convertToEmoji(data.countryCode));
        } catch (err) {
          setGeocodingError(err.message);
        } finally {
          setIsLoadingGeocoding(false);
        }
      }
      getCityData();
    },
    [lat, lng]
  );

  return [
    lat,
    lng,
    cityName,
    country,
    emoji,
    isLoadingGeocoding,
    geocodingError,
    setCityName,
  ];
}
