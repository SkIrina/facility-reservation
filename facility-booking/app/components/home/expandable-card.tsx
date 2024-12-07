import React, { useState } from "react";

type Recursive<T> = {
  [key: string]: T | Recursive<T>;
};

const ExpandableCard = ({ dictionary }: { dictionary: Recursive<string> }) => {
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
        <h2 className="text-lg font-bold">Sun ability</h2>
        <span>{isExpanded ? "▲" : "▼"}</span>
      </div>

      {/* Card Body */}
      {isExpanded && (
        <div className="p-4">
          <table className="w-full border-collapse border border-gray-300">
            <tbody>
              {["Court A", "Court B"].map((court) => (
                <tr key={court}>
                  <td className="border border-gray-300 px-4 py-2 font-semibold">
                    {court}
                  </td>
                  <td
                    key={`${court}`}
                    className="border border-gray-300 px-4 py-2"
                  >
                    {["16:00", "17:00", "18:00", "19:00"].map((time) => (
                      <button
                        className={`px-2 py-1 m-1 rounded ${
                          selectedSlots[court].includes(time)
                            ? "bg-blue-500 text-white"
                            : "bg-white text-gray-800 border border-gray-800"
                        }`}
                        onClick={() => toggleSlot(court, time)}
                      >
                        {time}
                      </button>
                    ))}
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
