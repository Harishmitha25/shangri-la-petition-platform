import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pie, Bar } from "react-chartjs-2";
import WordCloud from "wordcloud";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

const PetitionsCommitteeStatisticsPage = () => {
  const [chartData, setChartData] = useState(null);
  const [barChartData, setBarChartData] = useState(null);
  const [wordList, setWordList] = useState([]);
  const [activeSection, setActiveSection] = useState("pie");

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await axios.get(
          "https://localhost:8443/slpp/petitions"
        );

        const petitions = response.data["petitions"];
        const statusCounts = petitions.reduce(
          (counts, petition) => {
            counts[petition.status] = (counts[petition.status] || 0) + 1;
            return counts;
          },
          { open: 0, closed: 0 }
        );
        console.log(statusCounts);

        const totalSignatures = petitions.reduce(
          (sum, petition) => sum + Number(petition.signatures),
          0
        );

        const averageSignatures =
          petitions.length > 0 ? totalSignatures / petitions.length : 0;

        const mostSigned = petitions.reduce((max, petition) =>
          Number(petition.signatures) > (max?.signatures || 0) ? petition : max
        );

        setChartData({
          labels: ["Open", "Closed"],
          datasets: [
            {
              data: [statusCounts.open, statusCounts.closed],
              backgroundColor: ["#36A2EB", "#FF6384"],
              hoverBackgroundColor: ["#36A2EB", "#FF6384"],
            },
          ],
        });

        setBarChartData({
          labels: [
            "Total Signatures",
            "Average Signatures per Petition",
            "Most Signed Petition",
          ],
          datasets: [
            {
              label: "Petition Statistics",
              data: [
                totalSignatures,
                averageSignatures.toFixed(2),
                Number(mostSigned?.signatures) || 0,
              ],
              backgroundColor: ["#FFCE56", "#4CAF50", "#FF6384"],
            },
          ],
        });

        const combinedText = petitions.map((p) => p.petition_text).join(" ");
        const wordCounts = combinedText.split(/\s+/).reduce((counts, word) => {
          const normalizedWord = word.toLowerCase().replace(/[^\w]/g, "");
          counts[normalizedWord] = (counts[normalizedWord] || 0) + 1;
          return counts;
        }, {});
        const wordArray = Object.entries(wordCounts)
          .filter(([word]) => word.length > 2)
          .sort((a, b) => b[1] - a[1]);
        setWordList(wordArray);
      } catch (error) {
        console.error("Error fetching statistics:", error);
      }
    };

    fetchStatistics();
  }, []);

  const renderWordCloud = () => {
    const canvas = document.getElementById("wordcloud-canvas");
    if (canvas && wordList.length > 0) {
      canvas.width = 800;
      canvas.height = 400;

      const topWords = wordList.slice(0, 50);

      WordCloud(canvas, {
        list: topWords,
        gridSize: 8,
        weightFactor: 5,
        fontFamily: "Arial, sans-serif",
        color: () => `hsl(${Math.random() * 360}, 70%, 50%)`,
        rotateRatio: 0.5,
        rotationSteps: 2,
        backgroundColor: "#ffffff",
      });
    }
  };

  useEffect(() => {
    if (activeSection === "wordcloud") {
      renderWordCloud();
    }
  }, [wordList, activeSection]);

  const toggleSection = (section) => {
    setActiveSection((prevSection) =>
      prevSection === section ? null : section
    );
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-primary text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Petitions Committee Statistics</h1>
          <button
            onClick={() => window.history.back()}
            className="bg-green-500 px-4 py-2 rounded-md text-white hover:bg-green-800"
          >
            Back to Dashboard
          </button>
        </div>
      </header>
      {/*Accordions*/}
      <main className="container mx-auto px-4 py-6 mt-6">
        <div className="bg-white shadow-md rounded-lg mb-6">
          <button
            className="w-full text-left text-xl font-bold p-4 border-b focus:outline-none focus:ring"
            onClick={() => toggleSection("pie")}
          >
            Petition Status Distribution {activeSection === "pie" ? "▲" : "▼"}
          </button>
          {activeSection === "pie" && chartData && (
            <div className="flex justify-center mt-4">
              <div style={{ width: "30%", height: "30%" }}>
                <Pie data={chartData} />
              </div>
            </div>
          )}
        </div>

        <div className="bg-white shadow-md rounded-lg mb-6">
          <button
            className="w-full text-left text-xl font-bold p-4 border-b focus:outline-none focus:ring"
            onClick={() => toggleSection("bar")}
          >
            Petition Signatures Overview {activeSection === "bar" ? "▲" : "▼"}
          </button>
          {activeSection === "bar" && barChartData && (
            <div className="flex justify-center mt-4">
              <div style={{ width: "50%", height: "50%" }}>
                <Bar
                  data={barChartData}
                  options={{
                    plugins: {
                      legend: {
                        display: false,
                      },
                    },
                  }}
                />
              </div>
            </div>
          )}
        </div>

        <div className="bg-white shadow-md rounded-lg">
          <button
            className="w-full text-left text-xl font-bold p-4 border-b focus:outline-none focus:ring"
            onClick={() => toggleSection("wordcloud")}
          >
            Petition Topics Word Cloud{" "}
            {activeSection === "wordcloud" ? "▲" : "▼"}
          </button>
          {activeSection === "wordcloud" && (
            <div className="flex justify-center mt-4">
              <canvas
                id="wordcloud-canvas"
                style={{ width: "100%", height: "400px" }}
              ></canvas>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default PetitionsCommitteeStatisticsPage;
