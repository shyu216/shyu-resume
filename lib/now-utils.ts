export function now(lang: "en" | "zh" = "en"): string {
    // "2023年7月"
    // "Jul 2023"
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const monthStr = lang === "en" ? date.toLocaleString("en", { month: "short" }) : `${month + 1}月`;
    return lang === "en" ? `${monthStr} ${year}` : `${year}年${monthStr}`;
}