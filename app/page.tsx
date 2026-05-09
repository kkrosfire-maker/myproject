import RegistrationForm from "./components/RegistrationForm";

export default function Home() {
  return (
    <main className="min-h-screen px-6 pb-24">
      <div className="mx-auto max-w-2xl">
        {/* headline */}
        <section className="py-16">
          <h1 className="text-2xl font-semibold text-white md:text-4xl">
            김종석의 AI 바이브 코딩 마스터 클래스
          </h1>
          <p className="mt-3 text-lg font-normal text-neutral-400">
            코딩 없이 AI로 업무 도구를 만드는 법
          </p>
          <p className="mt-2 text-sm text-neutral-500">
            AI커피챗 · 외부 초청 강사
          </p>
        </section>

        <div className="border-t border-white/10" />

        {/* description */}
        <section className="py-16">
          <p className="max-w-lg text-base leading-relaxed text-neutral-300">
            AI에게 말로 지시하면 앱이 만들어집니다.
            <br />
            코딩 경험이 전혀 없어도 괜찮아요.
            <br />
            4시간이면 여러분만의 업무 도구를 직접 만들 수 있습니다.
          </p>
        </section>

        <div className="border-t border-white/10" />

        {/* event info */}
        <section className="py-16">
          <h2 className="mb-8 text-sm font-normal text-neutral-400">
            행사 정보
          </h2>
          <EventInfo />
        </section>

        <div className="border-t border-white/10" />

        {/* registration form */}
        <section className="py-16">
          <h2 className="mb-8 text-sm font-normal text-neutral-400">
            강의 신청
          </h2>
          <RegistrationForm />
        </section>

        {/* footer */}
        <div className="border-t border-white/10 py-8 text-center text-xs text-neutral-600">
          powered by listeningmind ☕
        </div>
      </div>
    </main>
  );
}

function EventInfo() {
  return (
    <div className="grid grid-cols-1 border border-white/10 md:grid-cols-2">
      {/* row 1 */}
      <div className="flex items-start gap-3 border-b border-white/10 px-6 py-5 md:border-r">
        <CalendarIcon />
        <div>
          <p className="text-xs text-neutral-500">일시</p>
          <p className="mt-1 text-sm text-white">
            2026년 4월 2일 (목) 오후 1시 — 5시
          </p>
          <p className="text-xs text-neutral-500">4시간</p>
        </div>
      </div>
      <div className="flex items-start gap-3 border-b border-white/10 px-6 py-5">
        <MapPinIcon />
        <div>
          <p className="text-xs text-neutral-500">장소</p>
          <p className="mt-1 text-sm text-white">본사 대회의실</p>
        </div>
      </div>
      {/* row 2 */}
      <div className="flex items-start gap-3 px-6 py-5 md:border-r md:border-white/10">
        <UsersIcon />
        <div>
          <p className="text-xs text-neutral-500">대상</p>
          <p className="mt-1 text-sm text-white">전 직원</p>
          <p className="text-xs text-neutral-500">개발/비개발 무관</p>
        </div>
      </div>
      <div className="flex items-start gap-3 border-t border-white/10 px-6 py-5 md:border-t-0">
        <LaptopIcon />
        <div>
          <p className="text-xs text-neutral-500">준비물</p>
          <p className="mt-1 text-sm text-white">개인 노트북</p>
        </div>
      </div>
    </div>
  );
}

function CalendarIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      fill="currentColor"
      className="mt-0.5 size-4 shrink-0 text-neutral-500"
    >
      <path
        fillRule="evenodd"
        d="M4 1.75a.75.75 0 0 1 1.5 0V3h5V1.75a.75.75 0 0 1 1.5 0V3a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2V1.75ZM4.5 6a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1h-7Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      fill="currentColor"
      className="mt-0.5 size-4 shrink-0 text-neutral-500"
    >
      <path
        fillRule="evenodd"
        d="M8 1a5 5 0 0 0-5 5c0 3.25 3.75 7.5 4.68 8.6a.42.42 0 0 0 .64 0C9.25 13.5 13 9.25 13 6a5 5 0 0 0-5-5Zm0 6.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      fill="currentColor"
      className="mt-0.5 size-4 shrink-0 text-neutral-500"
    >
      <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
    </svg>
  );
}

function LaptopIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      fill="currentColor"
      className="mt-0.5 size-4 shrink-0 text-neutral-500"
    >
      <path d="M3 4.75A1.75 1.75 0 0 1 4.75 3h6.5A1.75 1.75 0 0 1 13 4.75v5.5A1.75 1.75 0 0 1 11.25 12H4.75A1.75 1.75 0 0 1 3 10.25v-5.5ZM4.75 4.5a.25.25 0 0 0-.25.25v5.5c0 .138.112.25.25.25h6.5a.25.25 0 0 0 .25-.25v-5.5a.25.25 0 0 0-.25-.25h-6.5ZM1.5 13.25a.75.75 0 0 1 .75-.75h11.5a.75.75 0 0 1 0 1.5H2.25a.75.75 0 0 1-.75-.75Z" />
    </svg>
  );
}
