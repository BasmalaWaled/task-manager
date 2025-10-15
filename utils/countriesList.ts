// 
export interface Country {
  name: string;
  code: string;
  phoneCode: string;
  flagEmoji: string;
  flag: string;
}

export const countryList: Country[] = [
  {
    name: "United States",
    code: "US",
    phoneCode: "+1",
    flagEmoji: "🇺🇸",
    flag: "https://flagcdn.com/h40/us.png",
  },
  {
    name: "Canada",
    code: "CA",
    phoneCode: "+1",
    flagEmoji: "🇨🇦",
    flag: "https://flagcdn.com/h40/ca.png",
  },
  {
    name: "United Kingdom",
    code: "GB",
    phoneCode: "+44",
    flagEmoji: "🇬🇧",
    flag: "https://flagcdn.com/h40/gb.png",
  },
  {
    name: "Australia",
    code: "AU",
    phoneCode: "+61",
    flagEmoji: "🇦🇺",
    flag: "https://flagcdn.com/h40/au.png",
  },
  {
    name: "Germany",
    code: "DE",
    phoneCode: "+49",
    flagEmoji: "🇩🇪",
    flag: "https://flagcdn.com/h40/de.png",
  },
  {
    name: "France",
    code: "FR",
    phoneCode: "+33",
    flagEmoji: "🇫🇷",
    flag: "https://flagcdn.com/h40/fr.png",
  },
  {
    name: "Italy",
    code: "IT",
    phoneCode: "+39",
    flagEmoji: "🇮🇹",
    flag: "https://flagcdn.com/h40/it.png",
  },
  {
    name: "Spain",
    code: "ES",
    phoneCode: "+34",
    flagEmoji: "🇪🇸",
    flag: "https://flagcdn.com/h40/es.png",
  },
  {
    name: "Russia",
    code: "RU",
    phoneCode: "+7",
    flagEmoji: "🇷🇺",
    flag: "https://flagcdn.com/h40/ru.png",
  },
  {
    name: "China",
    code: "CN",
    phoneCode: "+86",
    flagEmoji: "🇨🇳",
    flag: "https://flagcdn.com/h40/cn.png",
  },
  {
    name: "Japan",
    code: "JP",
    phoneCode: "+81",
    flagEmoji: "🇯🇵",
    flag: "https://flagcdn.com/h40/jp.png",
  },
  {
    name: "India",
    code: "IN",
    phoneCode: "+91",
    flagEmoji: "🇮🇳",
    flag: "https://flagcdn.com/h40/in.png",
  },
  {
    name: "Brazil",
    code: "BR",
    phoneCode: "+55",
    flagEmoji: "🇧🇷",
    flag: "https://flagcdn.com/h40/br.png",
  },
  {
    name: "Mexico",
    code: "MX",
    phoneCode: "+52",
    flagEmoji: "🇲🇽",
    flag: "https://flagcdn.com/h40/mx.png",
  },
  {
    name: "Argentina",
    code: "AR",
    phoneCode: "+54",
    flagEmoji: "🇦🇷",
    flag: "https://flagcdn.com/h40/ar.png",
  },
  {
    name: "Egypt",
    code: "EG",
    phoneCode: "+20",
    flagEmoji: "🇪🇬",
    flag: "https://flagcdn.com/h40/eg.png",
  },
  {
    name: "Saudi Arabia",
    code: "SA",
    phoneCode: "+966",
    flagEmoji: "🇸🇦",
    flag: "https://flagcdn.com/h40/sa.png",
  },
  {
    name: "United Arab Emirates",
    code: "AE",
    phoneCode: "+971",
    flagEmoji: "🇦🇪",
    flag: "https://flagcdn.com/h40/ae.png",
  },
  {
    name: "South Africa",
    code: "ZA",
    phoneCode: "+27",
    flagEmoji: "🇿🇦",
    flag: "https://flagcdn.com/h40/za.png",
  },
  {
    name: "Nigeria",
    code: "NG",
    phoneCode: "+234",
    flagEmoji: "🇳🇬",
    flag: "https://flagcdn.com/h40/ng.png",
  },
  {
    name: "Turkey",
    code: "TR",
    phoneCode: "+90",
    flagEmoji: "🇹🇷",
    flag: "https://flagcdn.com/h40/tr.png",
  },
  {
    name: "South Korea",
    code: "KR",
    phoneCode: "+82",
    flagEmoji: "🇰🇷",
    flag: "https://flagcdn.com/h40/kr.png",
  },
  {
    name: "Pakistan",
    code: "PK",
    phoneCode: "+92",
    flagEmoji: "🇵🇰",
    flag: "https://flagcdn.com/h40/pk.png",
  },
  {
    name: "Bangladesh",
    code: "BD",
    phoneCode: "+880",
    flagEmoji: "🇧🇩",
    flag: "https://flagcdn.com/h40/bd.png",
  },
];


export function getCountryFlagEmoji(location: string): string {
  const cleanLocation = location.trim().toLowerCase();
  const country = countryList.find((country) =>
    cleanLocation.includes(country.name.toLowerCase())
  );
  return country?.flagEmoji || "";
}

export function getFlagEmoji(countryCode: string) {
  return countryCode
    .toUpperCase()
    .split("")
    .map((char) => String.fromCodePoint(127397 + char.charCodeAt(0)))
    .join("");
}

export function getCountryByCode(code: string): Country | undefined {
  return countryList.find(
    (country) => country.code.toLowerCase() === code.toLowerCase()
  );
}

export function getCountryByName(name: string): Country | undefined {
  return countryList.find(
    (country) => country.name.toLowerCase() === name.toLowerCase()
  );
}
