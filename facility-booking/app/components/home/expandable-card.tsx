import React, { useState } from "react";

type Recursive<T> = {
  [key: string]: T | Recursive<T>;
};

export type Establishment = {
  title: string;
  facilities: {
    title: string;
    slots: {
      [key: string]: boolean;
    };
  }[];
};

const ExpandableCard = ({
  dictionary,
  establishment,
}: {
  dictionary: Recursive<string>;
  establishment: Establishment;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // State to track toggled buttons
  const [selectedSlots, setSelectedSlots] = useState<Record<string, string[]>>({
    "Court A": [],
    "Court B": [],
  });

  const toggleSlot = (court: string, slot: string) => {
    setSelectedSlots((prev) => {
      const updatedSlots = prev[court].includes(slot)
        ? prev[court].filter((s) => s !== slot)
        : [...prev[court], slot];
      return { ...prev, [court]: updatedSlots };
    });
  };

  return (
    <div className="max-w-lg mx-auto border rounded-lg shadow-md bg-white m-2">
      {/* Card Header */}
      <div
        className="cursor-pointer p-4 bg-gray-200 flex justify-between items-center"
        onClick={() => setIsExpanded((prev) => !prev)}
      >
        <h2 className="text-lg font-bold">{establishment.title}</h2>
        <span>{isExpanded ? "▲" : "▼"}</span>
      </div>

      {/* Card Body */}
      {isExpanded && (
        <div className="p-4">
          <table className="w-full border-collapse border border-gray-300">
            <tbody>
              {establishment.facilities.map((facility) => (
                <tr key={facility.title}>
                  <td className="border border-gray-300 px-4 py-2 font-semibold">
                    {facility.title}
                  </td>
                  <td
                    key={`${facility.title}`}
                    className="border border-gray-300 px-4 py-2"
                  >
                    {Object.entries(facility.slots).map(
                      ([slot, isAvalable]) => (
                        <button
                          className={`px-2 py-1 m-1 rounded ${
                            selectedSlots[facility.title].includes(slot)
                              ? "bg-blue-500 text-white"
                              : "bg-white text-gray-800 border border-gray-800"
                          }${isAvalable ? "" : " !bg-gray-200 pointer-events-none border-none"}`}
                          onClick={() => toggleSlot(facility.title, slot)}
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
