"use client";
import React, { Fragment, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ExpandableCard, {
  Establishment,
  Facility,
  TimeSlot,
} from "./expandable-card";

type Recursive<T> = {
  [key: string]: T | Recursive<T>;
};

const establishments_init = [
  {
    title: "Sun ability",
    facilities: [
      {
        title: "Court A",
        slots: {
          "08:00": true,
          "09:00": true,
          "10:00": true,
          "11:00": false,
          "12:00": true,
          "13:00": true,
          "14:00": true,
          "15:00": true,
          "16:00": false,
          "17:00": true,
          "18:00": true,
          "19:00": true,
          "20:00": true,
        },
      },
      {
        title: "Court B",
        slots: {
          "08:00": true,
          "09:00": true,
          "10:00": true,
          "11:00": false,
          "12:00": false,
          "13:00": true,
          "14:00": true,
          "15:00": false,
          "16:00": false,
          "17:00": true,
          "18:00": true,
          "19:00": true,
          "20:00": true,
        },
      },
    ],
  },
  {
    title: "Acty Hikawa",
    facilities: [
      {
        title: "Court A",
        slots: {
          "08:00": true,
          "09:00": true,
          "10:00": true,
          "11:00": false,
          "12:00": false,
          "13:00": true,
          "14:00": true,
          "15:00": true,
          "16:00": false,
          "17:00": true,
          "18:00": true,
          "19:00": true,
          "20:00": true,
        },
      },
      {
        title: "Court B",
        slots: {
          "08:00": true,
          "09:00": true,
          "10:00": true,
          "11:00": false,
          "12:00": true,
          "13:00": true,
          "14:00": true,
          "15:00": true,
          "16:00": false,
          "17:00": true,
          "18:00": true,
          "19:00": true,
          "20:00": true,
        },
      },
    ],
  },
];

const HomeForm = ({
  locale,
  dictionary,
}: {
  locale: string;
  dictionary: Recursive<string>;
}) => {
  const [bookings, setBookings] = useState([] as Establishment[]);
  const [establishments, setEstablishments] = useState(establishments_init);

  const [date, setDate] = useState<Date | null>(null);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [sport, setSport] = useState("");
  const [facility, setFacility] = useState("");
  const [user, setUser] = useState("");

  const times = Array.from({ length: 22 - 8 + 1 }, (_, i) => `${i + 8}:00`);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(JSON.stringify({ date, startTime, endTime, sport, facility }));
  };

  const [price, setPrice] = useState(0);

  const updateSelected = ({
    establishmentTitle,
    selectedSlots,
  }: {
    establishmentTitle: string;
    selectedSlots: Record<string, TimeSlot[]>;
  }) => {
    const updatedEst = establishments.find(
      (est) => est.title === establishmentTitle
    );
    if (!updatedEst) {
      setBookings([]);
      return;
    }
    const newFacilities = [] as Facility[];
    Object.entries(selectedSlots).forEach((selectedSlot) => {
      const facilityTitle = selectedSlot[0];
      const timeSlots = selectedSlot[1];
      const facility = updatedEst?.facilities.find(
        (fac) => fac.title === facilityTitle
      );
      if (timeSlots.length > 0 && facility) {
        const newSlots = Object.fromEntries(
          timeSlots.map((slot) => [slot, false])
        ) as Record<TimeSlot, boolean>;
        newFacilities.push({
          title: facility?.title,
          slots: newSlots,
        });
      }
    });
    setBookings([
      {
        title: updatedEst?.title,
        facilities: newFacilities,
      },
    ]);
  };

  const reserve = () => {
    bookings.forEach((booking) => {
      const updatedEst = establishments.find(
        (est) => est.title === booking.title
      );
      booking.facilities.forEach((bookingFac) => {
        const updatedFacility = updatedEst?.facilities.find(
          (fac) => fac.title === bookingFac.title
        );
        if (!updatedFacility) return;
        Object.entries(bookingFac.slots).forEach(
          (slot) => (updatedFacility.slots[slot[0] as TimeSlot] = false)
        );
      });
    });
    setEstablishments((prev) => prev);
    // setEstablishments((prev) => {
    //   return prev.map((est) => {
    //     const updatedBooking = bookings.find(
    //       (booking) => booking.title === est.title
    //     );
    //     if (updatedBooking) {
    //     } else {
    //       return est;
    //     }
    //   });
    // });
  };

  const updatePrice = (newValue: number) => {
    setPrice(newValue);
  };
  const [results, setResults] = useState([] as Establishment[]);

  const search = () => {
    const res = [] as Establishment[];
    establishments.forEach((est) => {
      const availableFacilities = est.facilities
        .filter((fac) => {
          const slotsArray = Object.entries(fac.slots);
          const startIndex = slotsArray.findIndex(
            (slot) => slot[0] === startTime
          );
          const endIndex = slotsArray.findIndex((slot) => slot[0] === endTime);
          const chosenTimeSlots = slotsArray
            .slice(startIndex, endIndex)
            .map((slot) => slot[1]);
          const isAllAvailable = chosenTimeSlots.reduce(
            (accumulator, currentValue) => accumulator && currentValue,
            true
          );
          return isAllAvailable;
        })
        .map((fac) => {
          const slotsArray = Object.entries(fac.slots);
          const startIndex = slotsArray.findIndex(
            (slot) => slot[0] === startTime
          );
          const endIndex = slotsArray.findIndex((slot) => slot[0] === endTime);
          const chosenTimeSlots = slotsArray.slice(
            startIndex - 1,
            endIndex + 1
          );
          return {
            ...fac,
            slots: Object.fromEntries(chosenTimeSlots) as Record<
              TimeSlot,
              boolean
            >,
          };
        });
      if (availableFacilities.length > 0)
        res.push({ ...est, facilities: availableFacilities });
    });
    setResults(res);
  };

  return (
    <div className="mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        {/* Date Picker */}
        <div className="flex gap-2 flex-wrap items-end">
          <div className="w-full  sm:max-w-52">
            <label className="block text-sm font-medium">
              {(dictionary.form as Record<string, string>).date}
            </label>
            <DatePicker
              selected={date}
              onChange={(date) => setDate(date)}
              className="w-full border border-gray-300 rounded-md p-2 h-[2.3rem]"
              locale="ja-JP"
              dateFormat={locale === "en" ? "dd/MM/yyyy" : "dd日MM月yyyy年"}
            />
          </div>

          {/* Time Pickers */}
          <div className="flex space-x-2 w-full  sm:max-w-52">
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
                  {/* {(dictionary.form as Record<string, string>).startTime} */}
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
                  {/* {(dictionary.form as Record<string, string>).endTime} */}
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
          <div className="w-full sm:max-w-52">
            <label className="block text-sm font-medium">
              {(dictionary.form as Record<string, string>).sport}
            </label>
            <select
              value={sport}
              onChange={(e) => setSport(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2"
            >
              <option value="">
                {/* {(dictionary.form as Record<string, string>).sport} */}
              </option>
              {Object.entries(dictionary.sports).map(([key, value]) => (
                <option key={key} value={key}>
                  {value as string}
                </option>
              ))}
            </select>
          </div>

          {/* Facility Type */}
          <div className="w-full  sm:max-w-52">
            <label className="block text-sm font-medium">
              {(dictionary.form as Record<string, string>).facility}
            </label>
            <select
              value={facility}
              onChange={(e) => setFacility(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2"
            >
              <option value="">
                {/* {(dictionary.form as Record<string, string>).facility} */}
              </option>
              {Object.entries(dictionary.facilities).map(([key, value]) => (
                <option key={key} value={key}>
                  {value as string}
                </option>
              ))}
            </select>
          </div>
          {/* User Type */}
          <div className="w-full sm:max-w-52">
            <label className="block text-sm font-medium">
              {(dictionary.form as Record<string, string>).user}
            </label>
            <select
              value={user}
              onChange={(e) => setUser(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2"
            >
              <option value="">
                {/* {(dictionary.form as Record<string, string>).user} */}
              </option>
              {Object.entries(dictionary.users).map(([key, value]) => (
                <option key={key} value={key}>
                  {value as string}
                </option>
              ))}
            </select>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-2 mt-2">
            <button
              type="button"
              className="py-2 bg-blue-600 text-white rounded-md px-10 mr-4"
              onClick={() => search()}
            >
              {(dictionary.form as Record<string, string>).submit}
            </button>
            <button
              type="button"
              onClick={() => {
                setDate(null);
                setStartTime("");
                setEndTime("");
                setSport("");
                setFacility("");
                setUser("");
                setResults([]);
              }}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md"
            >
              {(dictionary.form as Record<string, string>).reset}
            </button>
          </div>
        </div>
      </form>
      {results.length > 0 && (
        <>
          {results.map((est) => (
            <Fragment key={est.title}>
              <ExpandableCard
                // dictionary={dictionary}
                establishment={est}
                updatePrice={updatePrice}
                updateSelected={updateSelected}
              />
            </Fragment>
          ))}
          {/* Total Price Section */}
          <div className="flex mt-6 justify-stretch gap-4">
            <div className="bg-white p-6 rounded-lg shadow-md text-center flex-grow">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Total Price
              </h2>
              <p className="text-2xl font-bold text-blue-500">
                ￥
                {price *
                  (user === "adult" ? 760 : user === "student" ? 365 : 0)}
              </p>
            </div>
            <button
              type="button"
              className="py-2 bg-blue-600 text-white rounded-md px-10 mr-4 flex-grow text-3xl"
              onClick={() => reserve()}
            >
              {(dictionary.form as Record<string, string>).reserve}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default HomeForm;
