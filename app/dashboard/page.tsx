import { supabase } from "@/lib/supabase";
import DashboardCharts from "./DashboardCharts";

const DEPARTMENTS = ["프로덕트", "마케팅", "세일즈", "컨설팅", "개발", "디자인", "경영지원", "기타"];
const AI_EXPERIENCES = ["처음이에요", "ChatGPT 정도 써봤어요", "Claude도 써봤어요", "Claude Code까지 써봤어요"];
const LEARNING_GOALS = ["업무 자동화", "데이터 분석", "웹서비스 만들기", "AI 도구 전반", "기타"];

interface Signup {
  id: string;
  created_at: string;
  name: string;
  email: string;
  department: string;
  position: string;
  ai_experience: string;
  learning_goal: string;
  dietary_restrictions: string | null;
}

function toSeoulDate(utcString: string): string {
  return new Date(utcString).toLocaleDateString("en-CA", { timeZone: "Asia/Seoul" });
}

function mode(values: string[]): string {
  if (values.length === 0) return "-";
  const freq: Record<string, number> = {};
  for (const v of values) freq[v] = (freq[v] ?? 0) + 1;
  return Object.entries(freq).sort((a, b) => b[1] - a[1])[0][0];
}

function countBy(signups: Signup[], key: keyof Signup, categories: string[]): Record<string, number> {
  const result: Record<string, number> = {};
  for (const s of signups) {
    const raw = s[key] as string;
    const bucket = categories.includes(raw) ? raw : "기타";
    result[bucket] = (result[bucket] ?? 0) + 1;
  }
  return result;
}

function getLast7Days(): string[] {
  const days: string[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    days.push(d.toLocaleDateString("en-CA", { timeZone: "Asia/Seoul" }));
  }
  return days;
}

function formatDatetime(utcString: string): string {
  return new Date(utcString).toLocaleString("ko-KR", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default async function DashboardPage() {
  const signups: Signup[] = [];

  if (supabase) {
    const { data } = await supabase
      .from("signups")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) signups.push(...(data as Signup[]));
  }

  const total = signups.length;

  const todaySeoul = new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Seoul" });
  const todayCount = signups.filter((s) => toSeoulDate(s.created_at) === todaySeoul).length;

  const topDept = total > 0 ? mode(signups.map((s) => s.department)) : "-";
  const topExp = total > 0 ? mode(signups.map((s) => s.ai_experience)) : "-";

  const deptDist = countBy(signups, "department", DEPARTMENTS);
  const expDist = countBy(signups, "ai_experience", AI_EXPERIENCES);
  const goalDist = countBy(signups, "learning_goal", LEARNING_GOALS);

  const last7 = getLast7Days();
  const dailyMap: Record<string, number> = {};
  for (const s of signups) {
    const d = toSeoulDate(s.created_at);
    if (last7.includes(d)) dailyMap[d] = (dailyMap[d] ?? 0) + 1;
  }
  const dailyData = last7.map((date) => ({ date, count: dailyMap[date] ?? 0 }));

  const summaryCards = [
    { label: "총 신청 인원", value: total === 0 ? "0" : `${total}명` },
    { label: "오늘 신청 인원", value: todayCount === 0 ? "0" : `${todayCount}명` },
    { label: "가장 많은 소속 팀", value: topDept },
    { label: "가장 많은 AI 경험", value: topExp },
  ];

  return (
    <main className="min-h-screen px-6 pb-24">
      <div className="mx-auto max-w-5xl">
        {/* header */}
        <section className="py-16">
          <h1 className="text-2xl font-semibold text-white md:text-4xl">
            신청 현황 대시보드
          </h1>
          <p className="mt-3 text-lg font-normal text-neutral-400">
            AI 바이브 코딩 마스터클래스
          </p>
        </section>

        <div className="border-t border-white/10" />

        {/* summary cards */}
        <section className="py-16">
          <p className="mb-8 text-xs text-neutral-400">요약</p>
          <div className="grid grid-cols-2 border border-white/10 md:grid-cols-4">
            {summaryCards.map((card, i) => (
              <div
                key={card.label}
                className={[
                  "px-6 py-6",
                  i < summaryCards.length - 1 ? "border-b border-white/10 md:border-b-0 md:border-r" : "",
                  i === 1 ? "md:border-r" : "",
                  i === 2 ? "border-b-0 md:border-r" : "",
                ].join(" ")}
              >
                <p className="text-xs text-neutral-500">{card.label}</p>
                <p className="mt-2 text-xl font-semibold text-white">{card.value}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="border-t border-white/10" />

        {/* charts */}
        <section className="py-16">
          <p className="mb-8 text-xs text-neutral-400">분포</p>
          <DashboardCharts
            dept={deptDist}
            exp={expDist}
            goal={goalDist}
            daily={dailyData}
            departments={DEPARTMENTS}
            aiExperiences={AI_EXPERIENCES}
            learningGoals={LEARNING_GOALS}
          />
        </section>

        <div className="border-t border-white/10" />

        {/* table */}
        <section className="py-16">
          <p className="mb-8 text-xs text-neutral-400">신청자 목록 ({total}명)</p>
          {total === 0 ? (
            <p className="text-sm text-neutral-600">아직 신청자가 없습니다.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b border-white/10 text-left">
                    {["이름", "이메일", "소속 팀", "직급", "AI 경험", "배우고 싶은 것", "식이 제한", "신청일시"].map(
                      (col) => (
                        <th
                          key={col}
                          className="whitespace-nowrap px-3 py-3 text-xs font-normal text-neutral-500"
                        >
                          {col}
                        </th>
                      )
                    )}
                  </tr>
                </thead>
                <tbody>
                  {signups.map((s) => (
                    <tr key={s.id} className="border-b border-white/5 hover:bg-white/[0.02]">
                      <td className="whitespace-nowrap px-3 py-3 text-white">{s.name}</td>
                      <td className="whitespace-nowrap px-3 py-3 text-neutral-300">{s.email}</td>
                      <td className="whitespace-nowrap px-3 py-3 text-neutral-300">{s.department}</td>
                      <td className="whitespace-nowrap px-3 py-3 text-neutral-300">{s.position}</td>
                      <td className="whitespace-nowrap px-3 py-3 text-neutral-300">{s.ai_experience}</td>
                      <td className="whitespace-nowrap px-3 py-3 text-neutral-300">{s.learning_goal}</td>
                      <td className="whitespace-nowrap px-3 py-3">
                        {s.dietary_restrictions ? (
                          <span className="rounded bg-amber-500/20 px-2 py-0.5 text-xs text-amber-300">
                            {s.dietary_restrictions}
                          </span>
                        ) : (
                          <span className="text-neutral-600">—</span>
                        )}
                      </td>
                      <td className="whitespace-nowrap px-3 py-3 text-neutral-500">
                        {formatDatetime(s.created_at)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <div className="border-t border-white/10 py-8 text-center text-xs text-neutral-600">
          powered by listeningmind ☕
        </div>
      </div>
    </main>
  );
}
