"use client";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ExpandableCard from "./expandable-card";

type Recursive<T> = {
  [key: string]: T | Recursive<T>;
};
const HomeForm = ({
  locale,
  dictionary,
}: {
  locale: string;
  dictionary: Recursive<string>;
}) => {
  const [date, setDate] = useState<Date | null>(null);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [sport, setSport] = useState("");
  const [facility, setFacility] = useState("");

  const times = Array.from({ length: 22 - 8 + 1 }, (_, i) => `${i + 8}:00`);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(JSON.stringify({ date, startTime, endTime, sport, facility }));
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Date Picker */}
        <div>
          <label className="block text-sm font-medium">
            {(dictionary.form as Record<string, string>).date}
          </label>
          <DatePicker
            selected={date}
            onChange={(date) => setDate(date)}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        {/* Time Pickers */}
        <div className="flex space-x-2">
          <div className="flex-1">
            <label className="block text-sm font-medium">
              {(dictionary.form as Record<string, string>).startTime}
            </label>
            <select
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2"
            >
              <option value="">
                {(dictionary.form as Record<string, string>).startTime}
              </option>
              {times.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium">
              {(dictionary.form as Record<string, string>).endTime}
            </label>
            <select
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2"
            >
              <option value="">
                {(dictionary.form as Record<string, string>).endTime}
              </option>
              {times.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Sport Type */}
        <div>
          <label className="block text-sm font-medium">
            {(dictionary.form as Record<string, string>).sport}
          </label>
          <select
            value={sport}
            onChange={(e) => setSport(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2"
          >
            <option value="">
              {(dictionary.form as Record<string, string>).sport}
            </option>
            {Object.entries(dictionary.sports).map(([key, value]) => (
              <option key={key} value={key}>
                {value as string}
              </option>
            ))}
          </select>
        </div>

        {/* Facility Type */}
        <div>
          <label className="block text-sm font-medium">
            {(dictionary.form as Record<string, string>).facility}
          </label>
          <select
            value={facility}
            onChange={(e) => setFacility(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2"
          >
            <option value="">
              {(dictionary.form as Record<string, string>).facility}
            </option>
            {Object.entries(dictionary.facilities).map(([key, value]) => (
              <option key={key} value={key}>
                {value as string}
              </option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={() => {
              setDate(null);
              setStartTime("");
              setEndTime("");
              setSport("");
              setFacility("");
            }}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md"
          >
            {(dictionary.form as Record<string, string>).reset}
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md"
          >
            {(dictionary.form as Record<string, string>).submit}
          </button>
        </div>
      </form>
      <ExpandableCard dictionary={dictionary} />
    </div>
  );
};

export default HomeForm;
