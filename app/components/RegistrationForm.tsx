"use client";

import { useState } from "react";

interface FormData {
  name: string;
  email: string;
  team: string;
  rank: string;
  aiExperience: string;
  learningGoal: string;
  dietRestriction: string;
}

const initialForm: FormData = {
  name: "",
  email: "",
  team: "",
  rank: "",
  aiExperience: "",
  learningGoal: "",
  dietRestriction: "",
};

const inputClass =
  "h-10 w-full rounded-md bg-white/5 px-3 text-sm text-white placeholder-neutral-600 outline-none transition-colors focus:bg-white/10";

const selectClass =
  "h-10 w-full rounded-md bg-white/5 px-3 text-sm text-white outline-none transition-colors focus:bg-white/10 appearance-none cursor-pointer";

export default function RegistrationForm() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [submitted, setSubmitted] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  }

  function validate(): boolean {
    const next: Partial<FormData> = {};
    if (!form.name.trim()) next.name = "이름을 입력해주세요.";
    if (!form.email.trim()) {
      next.email = "이메일을 입력해주세요.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = "올바른 이메일 형식이 아닙니다.";
    }
    if (!form.team) next.team = "소속 팀을 선택해주세요.";
    if (!form.rank) next.rank = "직급을 선택해주세요.";
    if (!form.aiExperience) next.aiExperience = "AI 사용 경험을 선택해주세요.";
    if (!form.learningGoal) next.learningGoal = "학습 목표를 선택해주세요.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    const submittedEmails: string[] = JSON.parse(
      localStorage.getItem("vw_submitted_emails") ?? "[]"
    );
    if (submittedEmails.includes(form.email.toLowerCase())) {
      setErrors({ email: "이미 신청된 이메일입니다." });
      return;
    }

    submittedEmails.push(form.email.toLowerCase());
    localStorage.setItem("vw_submitted_emails", JSON.stringify(submittedEmails));

    console.log("[vibe-workshop] 신청 데이터:", form);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="py-12 text-center">
        <p className="text-2xl">🎉</p>
        <p className="mt-4 text-base text-white">신청이 완료되었습니다!</p>
        <p className="mt-2 text-sm text-neutral-400">
          당일 노트북 꼭 챙겨오세요.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      {/* 이름 */}
      <Field label="이름" error={errors.name} required>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="홍길동"
          className={inputClass}
        />
      </Field>

      {/* 이메일 */}
      <Field label="이메일" error={errors.email} required>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="you@company.com"
          className={inputClass}
        />
      </Field>

      {/* 소속 팀 */}
      <Field label="소속 팀/부서" error={errors.team} required>
        <SelectWrapper>
          <select
            name="team"
            value={form.team}
            onChange={handleChange}
            className={selectClass}
          >
            <option value="" disabled>
              선택해주세요
            </option>
            {["프로덕트", "마케팅", "세일즈", "컨설팅", "개발", "디자인", "경영지원", "기타"].map(
              (v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              )
            )}
          </select>
        </SelectWrapper>
      </Field>

      {/* 직급 */}
      <Field label="직급" error={errors.rank} required>
        <SelectWrapper>
          <select
            name="rank"
            value={form.rank}
            onChange={handleChange}
            className={selectClass}
          >
            <option value="" disabled>
              선택해주세요
            </option>
            {["사원", "대리", "과장", "차장", "부장", "임원"].map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
        </SelectWrapper>
      </Field>

      {/* AI 도구 사용 경험 */}
      <Field label="AI 도구 사용 경험" error={errors.aiExperience} required>
        <SelectWrapper>
          <select
            name="aiExperience"
            value={form.aiExperience}
            onChange={handleChange}
            className={selectClass}
          >
            <option value="" disabled>
              선택해주세요
            </option>
            {[
              "처음이에요",
              "ChatGPT 정도 써봤어요",
              "Claude도 써봤어요",
              "Claude Code까지 써봤어요",
            ].map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
        </SelectWrapper>
      </Field>

      {/* 강의에서 가장 배우고 싶은 것 */}
      <Field label="강의에서 가장 배우고 싶은 것" error={errors.learningGoal} required>
        <SelectWrapper>
          <select
            name="learningGoal"
            value={form.learningGoal}
            onChange={handleChange}
            className={selectClass}
          >
            <option value="" disabled>
              선택해주세요
            </option>
            {["업무 자동화", "데이터 분석", "웹서비스 만들기", "AI 도구 전반", "기타"].map(
              (v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              )
            )}
          </select>
        </SelectWrapper>
      </Field>

      {/* 식이 제한 */}
      <Field label="식이 제한이나 알레르기">
        <input
          type="text"
          name="dietRestriction"
          value={form.dietRestriction}
          onChange={handleChange}
          placeholder="간식 준비 참고용"
          className={inputClass}
        />
      </Field>

      <div className="mt-8">
        <button
          type="submit"
          className="h-10 w-full rounded-full bg-orange-500 px-6 text-sm font-medium text-white transition-colors hover:bg-orange-400"
        >
          신청하기
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  error,
  required,
  children,
}: {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs text-neutral-400">
        {label}
        {required && <span className="ml-0.5 text-orange-500">*</span>}
      </label>
      {children}
      {error && <p className="mt-1.5 text-xs text-orange-400">{error}</p>}
    </div>
  );
}

function SelectWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      {children}
      <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="size-4 text-neutral-500"
        >
          <path
            fillRule="evenodd"
            d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
  );
}
