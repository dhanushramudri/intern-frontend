import React from "react";
import styles from "./styles.module.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

export default function SearchJobsByCity() {
  const cities = {
    "New York City": "🗽",
    "Los Angeles": "🌴",
    Chicago: "🌆",
    Houston: "🤠",
    Phoenix: "🌵",
    Philadelphia: "🔔",
    "San Antonio": "⛪",
    "San Diego": "🏖️",
    Dallas: "🤠",
    "San Jose": "🍎",
    Austin: "🎸",
    Jacksonville: "🏝️",
    "Fort Worth": "🤠",
    Columbus: "🌰",
    "San Francisco": "🌉",
    Charlotte: "🍑",
    Indianapolis: "🏁",
    Seattle: "🌆",
    Denver: "🏔️",
    Washington: "🏛️",
    Boston: "🦞",
    "El Paso": "🌵",
    Detroit: "🚗",
    Nashville: "🎸",
    Portland: "🌲",
    Memphis: "🎸",
    "Oklahoma City": "🌾",
    "Las Vegas": "🎰",
    Louisville: "🐎",
    Baltimore: "🦀",
    Kabul: "🇦🇫",
    Algiers: "🇩🇿",
    Luanda: "🇦🇴",
    "Buenos Aires": "🇦🇷",
    Cordoba: "🇦🇷",
    Rosario: "🇦🇷",
    Mendoza: "🇦🇷",
    Adelaide: "🇦🇺",
    Melbourne: "🇦🇺",
    Sydney: "🇦🇺",
    Brisbane: "🇦🇺",
    Perth: "🇦🇺",
    Vienna: "🇦🇹",
    Baku: "🇦🇿",
    Dhaka: "🇧🇩",
    Minsk: "🇧🇾",
    Brussels: "🇧🇪",
    "La Paz": "🇧🇴",
    Sarajevo: "🇧🇦",
    Gaborone: "🇧🇼",
    Brasilia: "🇧🇷",
    "Rio de Janeiro": "🇧🇷",
    "Sao Paulo": "🇧🇷",
    Sofia: "🇧🇬",
    Ouagadougou: "🇧🇫",
    Bujumbura: "🇧🇮",
    "Phnom Penh": "🇰🇭",
    Yaounde: "🇨🇲",
    Toronto: "🇨🇦",
    Vancouver: "🇨🇦",
    Calgary: "🇨🇦",
    Ottawa: "🇨🇦",
    Montreal: "🇨🇦",
    Edmonton: "🇨🇦",
    "Quebec City": "🇨🇦",
    Regina: "🇨🇦",
    Winnipeg: "🇨🇦",
    Halifax: "🇨🇦",
    Fredericton: "🇨🇦",
    Charlottetown: "🇨🇦",
    "St. John's": "🇨🇦",
    Praia: "🇨🇻",
    Bangui: "🇨🇫",
    "N'Djamena": "🇹🇩",
    Santiago: "🇨🇱",
    Beijing: "🇨🇳",
    Shanghai: "🇨🇳",
    Guangzhou: "🇨🇳",
    Shenzhen: "🇨🇳",
    Tianjin: "🇨🇳",
    Chongqing: "🇨🇳",
    Wuhan: "🇨🇳",
    "Hong Kong": "🇭🇰",
    Bogota: "🇨🇴",
    Kinshasa: "🇨🇩",
    Zagreb: "🇭🇷",
    Havana: "🇨🇺",
    Nicosia: "🇨🇾",
    Prague: "🇨🇿",
    Copenhagen: "🇩🇰",
    Djibouti: "🇩🇯",
    Roseau: "🇩🇲",
    "Santo Domingo": "🇩🇴",
    Quito: "🇪🇨",
    Cairo: "🇪🇬",
    "San Salvador": "🇸🇻",
    Malabo: "🇬🇶",
    Asmara: "🇪🇷",
    Tallinn: "🇪🇪",
    "Addis Ababa": "🇪🇹",
    Suva: "🇫🇯",
    Helsinki: "🇫🇮",
    Paris: "🇫🇷",
    Libreville: "🇬🇦",
    Banjul: "🇬🇲",
    Tbilisi: "🇬🇪",
    Berlin: "🇩🇪",
    Accra: "🇬🇭",
    Athens: "🇬🇷",
    "St. George's": "🇬🇩",
    "Guatemala City": "🇬🇹",
    Conakry: "🇬🇳",
    Bissau: "🇬🇼",
    Georgetown: "🇬🇾",
    "Port-au-Prince": "🇭🇹",
    Tegucigalpa: "🇭🇳",
    Budapest: "🇭🇺",
    Reykjavik: "🇮🇸",
    "New Delhi": "🇮🇳",
    Jakarta: "🇮🇩",
    Tehran: "🇮🇷",
    Baghdad: "🇮🇶",
    Dublin: "🇮🇪",
    Jerusalem: "🇮🇱",
    Rome: "🇮🇹",
    Kingston: "🇯🇲",
    Tokyo: "🇯🇵",
    Amman: "🇯🇴",
    Astana: "🇰🇿",
    Nairobi: "🇰🇪",
    Pristina: "🇽🇰",
    "Kuwait City": "🇰🇼",
    Bishkek: "🇰🇬",
    Vientiane: "🇱🇦",
    Riga: "🇱🇻",
    Beirut: "🇱🇧",
    Maseru: "🇱🇸",
    Monrovia: "🇱🇷",
    Tripoli: "🇱🇾",
    Vaduz: "🇱🇮",
    Vilnius: "🇱🇹",
    Luxembourg: "🇱🇺",
    Antananarivo: "🇲🇬",
    Lilongwe: "🇲🇼",
    "Kuala Lumpur": "🇲🇾",
    Male: "🇲🇻",
    Bamako: "🇲🇱",
    Valletta: "🇲🇹",
    Majuro: "🇲🇭",
    Nouakchott: "🇲🇷",
    "Port Louis": "🇲🇺",
    "Mexico City": "🇲🇽",
    Chisinau: "🇲🇩",
    Monaco: "🇲🇨",
    Ulaanbaatar: "🇲🇳",
    Podgorica: "🇲🇪",
    Rabat: "🇲🇦",
    Maputo: "🇲🇿",
    Naypyidaw: "🇲🇲",
    Windhoek: "🇳🇦",
    Kathmandu: "🇳🇵",
    Amsterdam: "🇳🇱",
    Wellington: "🇳🇿",
    Managua: "🇳🇮",
    Niamey: "🇳🇪",
    Abuja: "🇳🇬",
    Pyongyang: "🇰🇵",
    Oslo: "🇳🇴",
    Muscat: "🇴🇲",
    Islamabad: "🇵🇰",
    Ngerulmud: "🇵🇼",
    "Panama City": "🇵🇦",
    "Port Moresby": "🇵🇬",
    Asuncion: "🇵🇾",
    Lima: "🇵🇪",
    Manila: "🇵🇭",
    Warsaw: "🇵🇱",
    Lisbon: "🇵🇹",
    Doha: "🇶🇦",
    Bucharest: "🇷🇴",
    Moscow: "🇷🇺",
    Kigali: "🇷🇼",
    Basseterre: "🇰🇳",
    Castries: "🇱🇨",
    Kingstown: "🇻🇨",
    Apia: "🇼🇸",
    "San Marino": "🇸🇲",
    "Sao Tome": "🇸🇹",
    Riyadh: "🇸🇦",
    Dakar: "🇸🇳",
    Belgrade: "🇷🇸",
    Victoria: "🇸🇨",
    Freetown: "🇸🇱",
    Singapore: "🇸🇬",
    Bratislava: "🇸🇰",
    Ljubljana: "🇸🇮",
    Honiara: "🇸🇧",
    Mogadishu: "🇸🇴",
    Pretoria: "🇿🇦",
    Seoul: "🇰🇷",
    Juba: "🇸🇸",
    Madrid: "🇪🇸",
    Colombo: "🇱🇰",
    Khartoum: "🇸🇩",
    Paramaribo: "🇸🇷",
    Stockholm: "🇸🇪",
    Bern: "🇨🇭",
    Damascus: "🇸🇾",
    Taipei: "🇹🇼",
    Dushanbe: "🇹🇯",
    Dodoma: "🇹🇿",
    Bangkok: "🇹🇭",
    Lome: "🇹🇬",
    "Nuku'alofa": "🇹🇴",
    "Port of Spain": "🇹🇹",
    Tunis: "🇹🇳",
    Ankara: "🇹🇷",
    Ashgabat: "🇹🇲",
    Funafuti: "🇹🇻",
    Kampala: "🇺🇬",
    Kiev: "🇺🇦",
    "Abu Dhabi": "🇦🇪",
    London: "🇬🇧",
    "Washington, D.C.": "🇺🇸",
    Montevideo: "🇺🇾",
    Tashkent: "🇺🇿",
    "Port Vila": "🇻🇺",
    "Vatican City": "🇻🇦",
    Caracas: "🇻🇪",
    Hanoi: "🇻🇳",
    "Sana'a": "🇾🇪",
    Lusaka: "🇿🇲",
    Harare: "🇿🇼",
  };
  return (
    <div className={styles.search_by_container}>
      <Header />
      <h1 className={`heading-title ${styles.title}`}>
        <span className="unsuckify">Browse</span> Jobs by City
      </h1>
      <div className={styles.search_by_items_container}>
        {Object.entries(cities).map(([city, emoji], idx) => {
          return (
            <a
              key={idx}
              href={`/city/${city}`}
              className={styles.search_by_item}
            >
              <div className={styles.emoji}>{emoji}</div>
              <div className={styles.value}>{city}</div>
            </a>
          );
        })}
      </div>
      <Footer />
    </div>
  );
}