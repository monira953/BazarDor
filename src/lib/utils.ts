
export interface Product {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
  markets: {
    market: string;
    division: string;
    min: number;
    max: number;
  }[];
}

export interface Category {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

// 1. Convert English digits to Bengali digits
export function toBengaliNumber(num: number | string): string {
  const bengaliDigits = [
    "০", "১", "২", "৩", "৪",
    "৫", "৬", "৭", "৮", "৯",
  ];

  return String(num).replace(/[0-9]/g, (digit) => {
    return bengaliDigits[Number(digit)];
  });
}

// 2. Format prices with commas and Bengali digits
export function formatPrice(price: number): string {
  return toBengaliNumber(price.toLocaleString("en-IN"));
}

// 3. Convert units to Bengali
const unitMap: Record<string, string> = {
  kg: "প্রতি কেজি",
  gram: "প্রতি গ্রাম",
  litre: "প্রতি লিটার",
  liter: "প্রতি লিটার",
  ml: "প্রতি মিলিলিটার",
  piece: "প্রতি পিস",
  dozen: "প্রতি ডজন",
  maund: "প্রতি মণ",
  packet: "প্রতি প্যাকেট",
};

export function getUnitBn(unit: string): string {
  return unitMap[unit.toLowerCase()] ?? `প্রতি ${unit}`;
}

// 4. Get today's date in Bengali
export function getBanglaDate(): string {
  const now = new Date();

  const banglaDays = [
    "রবিবার",
    "সোমবার",
    "মঙ্গলবার",
    "বুধবার",
    "বৃহস্পতিবার",
    "শুক্রবার",
    "শনিবার",
  ];

  const banglaMonths = [
    "জানুয়ারি",
    "ফেব্রুয়ারি",
    "মার্চ",
    "এপ্রিল",
    "মে",
    "জুন",
    "জুলাই",
    "আগস্ট",
    "সেপ্টেম্বর",
    "অক্টোবর",
    "নভেম্বর",
    "ডিসেম্বর",
  ];

  const day = banglaDays[now.getDay()];
  const date = toBengaliNumber(now.getDate());
  const month = banglaMonths[now.getMonth()];
  const year = toBengaliNumber(now.getFullYear());

  return `${day}, ${date} ${month}, ${year}`;
}