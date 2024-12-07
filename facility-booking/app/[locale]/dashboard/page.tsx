"use client";

import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { faker } from "@faker-js/faker";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  plugins: {
    title: {
      display: true,
      text: "Facility monthly usage by hour",
    },
  },
  responsive: true,
  scales: {
    x: {
      stacked: true,
    },
    y: {
      title: {
        display: true,
        text: "％",
      },
      stacked: true,
      max: 100,
    },
  },
};

const labels = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
];

export const data = {
  labels,
  datasets: [
    // {
    //   label: "Court A",
    //   data: labels.map(() => faker.number.int({ min: 0, max: 80 })),
    //   backgroundColor: "rgb(255, 99, 132)",
    //   stack: "Stack 0",
    // },
    // {
    //   label: "Court A cancel",
    //   data: labels.map(() => faker.number.int({ min: 0, max: 20 })),
    //   backgroundColor: "rgb(255, 201, 213)",
    //   stack: "Stack 0",
    // },
    {
      label: "Usage",
      data: labels.map(() => faker.number.int({ min: 0, max: 80 })),
      backgroundColor: "rgb(75, 192, 192)",
      stack: "Stack 1",
    },
    {
      label: "Cancel",
      data: labels.map(() => faker.number.int({ min: 0, max: 20 })),
      backgroundColor: "rgb(255, 110, 97)",
      stack: "Stack 1",
    },
    // {
    //   label: "Room",
    //   data: labels.map(() => faker.number.int({ min: 0, max: 80 })),
    //   backgroundColor: "rgb(53, 162, 235)",
    //   stack: "Stack 2",
    // },
    // {
    //   label: "Room",
    //   data: labels.map(() => faker.number.int({ min: 0, max: 20 })),
    //   backgroundColor: "rgb(141, 192, 227)",
    //   stack: "Stack 2",
    // },
  ],
};

export default function Dashboard() {
  return (
    <div className="max-w-5xl mx-auto">
      <Bar options={options} data={data} />
    </div>
  );
}
