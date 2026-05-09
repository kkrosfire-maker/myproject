"use client";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Filler,
} from "chart.js";
import { Doughnut, Bar, Pie, Line } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Filler
);

const DEPT_COLORS = [
  "#f97316",
  "#ea580c",
  "#fb923c",
  "#fdba74",
  "#a3a3a3",
  "#737373",
  "#525252",
  "#d4d4d4",
];

const GOAL_COLORS = [
  "#f97316",
  "#ea580c",
  "#a3a3a3",
  "#737373",
  "#525252",
];

const tooltipDefaults = {
  backgroundColor: "#262626",
  titleColor: "#ffffff",
  bodyColor: "#a3a3a3",
  borderColor: "rgba(255,255,255,0.1)",
  borderWidth: 1,
};

const legendDefaults = {
  labels: {
    color: "#737373",
    font: { size: 12 },
    boxWidth: 12,
    padding: 16,
  },
};

interface Props {
  dept: Record<string, number>;
  exp: Record<string, number>;
  goal: Record<string, number>;
  daily: { date: string; count: number }[];
  departments: string[];
  aiExperiences: string[];
  learningGoals: string[];
}

function EmptyChart() {
  return (
    <div className="flex h-52 items-center justify-center text-sm text-neutral-600">
      데이터가 없습니다
    </div>
  );
}

export default function DashboardCharts({
  dept,
  exp,
  goal,
  daily,
  departments,
  aiExperiences,
  learningGoals,
}: Props) {
  const deptValues = departments.map((d) => dept[d] ?? 0);
  const expValues = aiExperiences.map((e) => exp[e] ?? 0);
  const goalValues = learningGoals.map((g) => goal[g] ?? 0);

  const hasDept = deptValues.some((v) => v > 0);
  const hasExp = expValues.some((v) => v > 0);
  const hasGoal = goalValues.some((v) => v > 0);

  return (
    <div className="grid grid-cols-1 gap-px border border-white/10 md:grid-cols-2">
      {/* 소속 팀별 분포 — 도넛 */}
      <div className="border-white/10 px-6 py-8 md:border-r">
        <p className="mb-6 text-xs text-neutral-400">소속 팀별 신청 분포</p>
        {hasDept ? (
          <div className="flex justify-center">
            <div className="w-64">
              <Doughnut
                data={{
                  labels: departments,
                  datasets: [
                    {
                      data: deptValues,
                      backgroundColor: DEPT_COLORS,
                      borderWidth: 0,
                      hoverOffset: 4,
                    },
                  ],
                }}
                options={{
                  plugins: {
                    legend: legendDefaults,
                    tooltip: tooltipDefaults,
                  },
                  cutout: "60%",
                }}
              />
            </div>
          </div>
        ) : (
          <EmptyChart />
        )}
      </div>

      {/* AI 도구 사용 경험 — 수평 바 */}
      <div className="border-t border-white/10 px-6 py-8 md:border-t-0">
        <p className="mb-6 text-xs text-neutral-400">AI 도구 사용 경험 분포</p>
        {hasExp ? (
          <Bar
            data={{
              labels: aiExperiences,
              datasets: [
                {
                  label: "인원",
                  data: expValues,
                  backgroundColor: "#f97316",
                  borderRadius: 4,
                },
              ],
            }}
            options={{
              indexAxis: "y" as const,
              plugins: {
                legend: { display: false },
                tooltip: tooltipDefaults,
              },
              scales: {
                x: {
                  ticks: { color: "#737373", stepSize: 1 },
                  grid: { color: "rgba(255,255,255,0.05)" },
                  border: { color: "rgba(255,255,255,0.1)" },
                },
                y: {
                  ticks: { color: "#737373", font: { size: 11 } },
                  grid: { display: false },
                  border: { color: "rgba(255,255,255,0.1)" },
                },
              },
            }}
          />
        ) : (
          <EmptyChart />
        )}
      </div>

      {/* 배우고 싶은 것 — 파이 */}
      <div className="border-t border-white/10 px-6 py-8 md:border-r md:border-white/10">
        <p className="mb-6 text-xs text-neutral-400">가장 배우고 싶은 것 분포</p>
        {hasGoal ? (
          <div className="flex justify-center">
            <div className="w-64">
              <Pie
                data={{
                  labels: learningGoals,
                  datasets: [
                    {
                      data: goalValues,
                      backgroundColor: GOAL_COLORS,
                      borderWidth: 0,
                      hoverOffset: 4,
                    },
                  ],
                }}
                options={{
                  plugins: {
                    legend: legendDefaults,
                    tooltip: tooltipDefaults,
                  },
                }}
              />
            </div>
          </div>
        ) : (
          <EmptyChart />
        )}
      </div>

      {/* 일별 신청 추이 — 라인 */}
      <div className="border-t border-white/10 px-6 py-8">
        <p className="mb-6 text-xs text-neutral-400">일별 신청 추이 (최근 7일)</p>
        <Line
          data={{
            labels: daily.map((d) => d.date.slice(5)),
            datasets: [
              {
                label: "신청 수",
                data: daily.map((d) => d.count),
                borderColor: "#f97316",
                backgroundColor: "rgba(249,115,22,0.1)",
                pointBackgroundColor: "#f97316",
                pointRadius: 4,
                tension: 0.3,
                fill: true,
              },
            ],
          }}
          options={{
            plugins: {
              legend: { display: false },
              tooltip: tooltipDefaults,
            },
            scales: {
              x: {
                ticks: { color: "#737373" },
                grid: { color: "rgba(255,255,255,0.05)" },
                border: { color: "rgba(255,255,255,0.1)" },
              },
              y: {
                ticks: { color: "#737373", stepSize: 1 },
                grid: { color: "rgba(255,255,255,0.05)" },
                border: { color: "rgba(255,255,255,0.1)" },
                min: 0,
              },
            },
          }}
        />
      </div>
    </div>
  );
}
