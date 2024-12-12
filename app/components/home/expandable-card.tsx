import React, { useState } from "react";

// type Recursive<T> = {
//   [key: string]: T | Recursive<T>;
// };

export type TimeSlot =
  | "08:00"
  | "09:00"
  | "10:00"
  | "11:00"
  | "12:00"
  | "13:00"
  | "14:00"
  | "15:00"
  | "16:00"
  | "17:00"
  | "18:00"
  | "19:00"
  | "20:00";
export type Facility = {
  title: string;
  slots: Record<TimeSlot, boolean>;
};
export type Establishment = {
  title: string;
  facilities: Facility[];
};

const ExpandableCard = ({
  // dictionary,
  establishment,
  updatePrice,
  updateSelected,
}: {
  // dictionary: Recursive<string>;
  establishment: Establishment;
  updatePrice: (price: number) => void;
  updateSelected: ({
    establishmentTitle,
    selectedSlots,
  }: {
    establishmentTitle: string;
    selectedSlots: Record<string, TimeSlot[]>;
  }) => void;
}) => {
  const [isExpanded, setIsExpanded] = useState(true);

  // State to track toggled buttons
  const [selectedSlots, setSelectedSlots] = useState<
    Record<string, TimeSlot[]>
  >({
    "Court A": [],
    "Court B": [],
  });

  const toggleSlot = (court: string, slot: TimeSlot) => {
    const updatedSlots = selectedSlots[court].includes(slot)
      ? selectedSlots[court].filter((s) => s !== slot)
      : [...selectedSlots[court], slot];
    const newSelectedSlots = { ...selectedSlots, [court]: updatedSlots };
    setSelectedSlots(newSelectedSlots);
    const slots = Object.entries(newSelectedSlots);
    const totalPrice = slots.reduce(
      (accumulator, currentValue) => accumulator + currentValue[1].length,
      0
    );
    updatePrice(totalPrice);
    updateSelected({
      establishmentTitle: establishment.title,
      selectedSlots: newSelectedSlots,
    });
  };

  return (
    <div className="mx-auto border rounded-lg shadow-md bg-white m-2">
      {/* Card Header */}
      <div
        className="cursor-pointer p-4 bg-blue-100 dark:bg-blue-600 flex justify-between items-center rounded-t-lg"
        onClick={() => setIsExpanded((prev) => !prev)}
      >
        <h2 className="text-lg font-bold">{establishment.title}</h2>
        <span>{isExpanded ? "▲" : "▼"}</span>
      </div>

      {/* Card Body */}
      {isExpanded && (
        <div className="p-4 dark:bg-black rounded-b-lg">
          <table className="w-full border-collapse border border-gray-300">
            <tbody>
              {establishment.facilities.map((facility) => (
                <tr key={facility.title}>
                  <td className="border border-gray-300 px-2 sm:px-4 py-2 font-semibold">
                    {facility.title}
                  </td>
                  <td
                    key={`${facility.title}`}
                    className="border border-gray-300 px-2 sm:px-4 py-2"
                  >
                    {Object.entries(facility.slots).map(
                      ([slot, isAvalable]) => (
                        <button
                          key={`${facility.title}-${slot}`}
                          className={`px-2 py-1 m-1 rounded ${
                            selectedSlots[facility.title].includes(
                              slot as TimeSlot
                            )
                              ? "bg-blue-500 text-white"
                              : "bg-white text-gray-800 border border-gray-800"
                          }${isAvalable ? "" : " !bg-gray-200 pointer-events-none border-none"}`}
                          onClick={() =>
                            toggleSlot(facility.title, slot as TimeSlot)
                          }
                        >
                          {slot}
                        </button>
                      )
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ExpandableCard;
