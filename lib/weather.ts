import type {
  WeeklyForecast,
  WeatherPeriod,
  WeatherAlert,
  WeatherSummary,
  WeatherContext,
  WeatherMode,
  HistoricalWeather,
  WeatherObservation,
} from "./types";

/**
 * Chandler, AZ coordinates for NWS API.
 * Lat/Lon for Chandler city center.
 */
const CHANDLER_LAT = 33.3062;
const CHANDLER_LON = -111.8413;

/** KCHD — Chandler Municipal Airport, closest NWS station */
const CHANDLER_STATION = "KCHD";

const NWS_USER_AGENT = "VikingHVACBlog/1.0 (info@viking-hvac.com)";

// ─── Unit conversion helpers ──────────────────────────────
function celsiusToF(c: number): number {
  return Math.round((c * 9) / 5 + 32);
}
function kphToMph(kph: number): number {
  return Math.round(kph * 0.621371);
}
function mmToInches(mm: number): number {
  return Math.round((mm / 25.4) * 100) / 100;
}

// ─── Severe weather keyword detection (Arizona-specific) ──
const SEVERE_KEYWORDS = [
  "dust storm",
  "haboob",
  "severe thunderstorm",
  "excessive heat",
  "flash flood",
  "monsoon",
  "high wind warning",
  "damaging wind",
  "tornado",
  "hail",
  "blowing dust",
  "extreme heat",
];

// ═══════════════════════════════════════════════════════════
//  PUBLIC API
// ═══════════════════════════════════════════════════════════

/**
 * Build full weather context combining:
 * 1. Historical observations (past 48 hours)
 * 2. 7-day forecast
 * 3. Mode classification (pre-event / post-event / combined)
 *
 * This is the single entry point the content generator calls.
 */
export async function buildWeatherContext(): Promise<WeatherContext> {
  const [historical, forecast] = await Promise.all([
    fetchHistoricalObservations(),
    fetchWeeklyForecast(),
  ]);

  const mode = determineWeatherMode(historical, forecast);
  const historicalSummary = buildHistoricalSummary(historical);
  const forecastSummary = forecast.summary.weatherStory;

  const { dominantHazard, affectedServices } = classifyHazards(
    mode,
    historical,
    forecast
  );

  return {
    mode,
    historical,
    forecast,
    historicalSummary,
    forecastSummary,
    dominantHazard,
    affectedServices,
    weekLabel: forecast.weekRange,
  };
}

export { fetchWeeklyForecast };

// ═══════════════════════════════════════════════════════════
//  HISTORICAL OBSERVATIONS (past 48 hours from KCHD)
// ═══════════════════════════════════════════════════════════

async function fetchHistoricalObservations(): Promise<HistoricalWeather> {
  const headers: Record<string, string> = {
    "User-Agent": NWS_USER_AGENT,
    Accept: "application/geo+json",
  };

  try {
    const res = await fetch(
      `https://api.weather.gov/stations/${CHANDLER_STATION}/observations?limit=96`,
      { headers }
    );

    if (!res.ok) {
      console.warn(
        `NWS Observations API error: ${res.status}. Falling back to empty historical.`
      );
      return emptyHistorical();
    }

    const data = await res.json();
    const features: Array<{ properties: Record<string, unknown> }> =
      data.features || [];

    const observations: WeatherObservation[] = features
      .map((f) => {
        const p = f.properties;
        return {
          timestamp: (p.timestamp as string) || "",
          temperature: extractTemp(p),
          windSpeed: extractWindSpeed(p),
          windGust: extractWindGust(p),
          precipitationLastHour: extractPrecip(p),
          description: (p.textDescription as string) || "",
        };
      })
      .filter((o) => o.timestamp);

    let totalPrecip = 0;
    let peakGust = 0;
    let peakTemp = 0;
    const severeEvents: string[] = [];

    for (const obs of observations) {
      if (obs.precipitationLastHour && obs.precipitationLastHour > 0) {
        totalPrecip += obs.precipitationLastHour;
      }
      if (obs.windGust && obs.windGust > peakGust) {
        peakGust = obs.windGust;
      }
      if (obs.temperature && obs.temperature > peakTemp) {
        peakTemp = obs.temperature;
      }
      const desc = obs.description.toLowerCase();
      for (const kw of SEVERE_KEYWORDS) {
        if (desc.includes(kw) && !severeEvents.includes(kw)) {
          severeEvents.push(kw);
        }
      }
    }

    // Arizona-specific: extreme heat (110°F+) counts as severe
    const hadSevere =
      severeEvents.length > 0 ||
      peakGust > 50 ||
      totalPrecip > 1 ||
      peakTemp > 110;

    return {
      totalPrecipitation: Math.round(totalPrecip * 100) / 100,
      peakWindGust: Math.round(peakGust),
      hadSevereWeather: hadSevere,
      severeEvents,
      summary: buildHistoricalSummaryText(
        totalPrecip,
        peakGust,
        peakTemp,
        hadSevere,
        severeEvents,
        observations
      ),
    };
  } catch (err) {
    console.warn("Failed to fetch historical observations:", err);
    return emptyHistorical();
  }
}

function emptyHistorical(): HistoricalWeather {
  return {
    totalPrecipitation: 0,
    peakWindGust: 0,
    hadSevereWeather: false,
    severeEvents: [],
    summary:
      "No significant weather events in the past 48 hours in the Chandler area.",
  };
}

// ─── NWS observation field extractors ─────────────────────

function extractTemp(p: Record<string, unknown>): number | null {
  const t = p.temperature as { value: number | null } | null;
  if (!t || t.value === null) return null;
  return celsiusToF(t.value);
}

function extractWindSpeed(p: Record<string, unknown>): number | null {
  const w = p.windSpeed as { value: number | null } | null;
  if (!w || w.value === null) return null;
  return kphToMph(w.value);
}

function extractWindGust(p: Record<string, unknown>): number | null {
  const g = p.windGust as { value: number | null } | null;
  if (!g || g.value === null) return null;
  return kphToMph(g.value);
}

function extractPrecip(p: Record<string, unknown>): number | null {
  const pr = p.precipitationLastHour as { value: number | null } | null;
  if (!pr || pr.value === null) return null;
  return mmToInches(pr.value);
}

function buildHistoricalSummaryText(
  precip: number,
  gust: number,
  peakTemp: number,
  severe: boolean,
  events: string[],
  observations: WeatherObservation[]
): string {
  const parts: string[] = [];

  if (severe && events.length > 0) {
    parts.push(
      `Significant weather hit the Chandler area in the past 48 hours: ${events.join(", ")}.`
    );
  }

  if (peakTemp > 110) {
    parts.push(`Temperatures reached ${peakTemp}°F — extreme heat conditions.`);
  }

  if (precip > 0.25) {
    parts.push(`${precip.toFixed(2)} inches of precipitation recorded.`);
  }

  if (gust > 35) {
    parts.push(`Wind gusts peaked at ${gust} mph.`);
  }

  if (parts.length === 0) {
    const recentDescs = observations
      .slice(0, 6)
      .map((o) => o.description)
      .filter(Boolean);
    const unique = [...new Set(recentDescs)];
    parts.push(
      `Recent conditions in Chandler: ${unique.join(", ") || "clear skies"}.`
    );
  }

  return parts.join(" ");
}

// ═══════════════════════════════════════════════════════════
//  MODE CLASSIFICATION
// ═══════════════════════════════════════════════════════════

function determineWeatherMode(
  historical: HistoricalWeather,
  forecast: WeeklyForecast
): WeatherMode {
  const pastSignificant =
    historical.totalPrecipitation > 0.5 ||
    historical.peakWindGust > 35 ||
    historical.hadSevereWeather;

  const forecastSignificant =
    forecast.summary.stormRisk ||
    forecast.summary.hailRisk ||
    forecast.summary.highWindRisk ||
    forecast.summary.heavyRainRisk ||
    forecast.summary.dustStormRisk ||
    forecast.summary.extremeHeatRisk ||
    forecast.summary.freezeRisk;

  if (pastSignificant && forecastSignificant) return "combined";
  if (pastSignificant) return "post-event";
  return "pre-event";
}

// ═══════════════════════════════════════════════════════════
//  HAZARD CLASSIFICATION (Arizona HVAC-specific)
// ═══════════════════════════════════════════════════════════

function classifyHazards(
  mode: WeatherMode,
  historical: HistoricalWeather,
  forecast: WeeklyForecast
): { dominantHazard: string; affectedServices: string[] } {
  if (mode === "post-event") {
    if (historical.severeEvents.length > 0) {
      const event = historical.severeEvents[0];
      if (event.includes("dust") || event.includes("haboob"))
        return {
          dominantHazard: "dust_storm",
          affectedServices: ["air-quality", "maintenance", "ductwork"],
        };
      if (event.includes("heat") || event.includes("extreme"))
        return {
          dominantHazard: "extreme_heat",
          affectedServices: ["air-conditioning", "hvac-installation", "maintenance"],
        };
      if (event.includes("flood") || event.includes("monsoon"))
        return {
          dominantHazard: "monsoon_damage",
          affectedServices: ["repairs", "air-quality", "commercial-hvac"],
        };
      if (event.includes("wind"))
        return {
          dominantHazard: "wind_damage",
          affectedServices: ["repairs", "ductwork", "commercial-hvac"],
        };
    }
    if (historical.peakWindGust > 50)
      return {
        dominantHazard: "wind_damage",
        affectedServices: ["repairs", "ductwork", "commercial-hvac"],
      };
    return {
      dominantHazard: "storm_damage",
      affectedServices: ["repairs", "air-quality", "maintenance"],
    };
  }

  return {
    dominantHazard: forecast.summary.dominantCondition,
    affectedServices: forecast.summary.relevantServices,
  };
}

// ═══════════════════════════════════════════════════════════
//  HELPER: human-readable historical summary
// ═══════════════════════════════════════════════════════════

function buildHistoricalSummary(historical: HistoricalWeather): string {
  if (
    historical.totalPrecipitation === 0 &&
    historical.peakWindGust === 0 &&
    !historical.hadSevereWeather
  ) {
    return "No significant weather events have occurred in the Chandler area over the past 48 hours.";
  }
  return historical.summary;
}

// ═══════════════════════════════════════════════════════════
//  7-DAY FORECAST
// ═══════════════════════════════════════════════════════════

async function fetchWeeklyForecast(): Promise<WeeklyForecast> {
  const headers = {
    "User-Agent": NWS_USER_AGENT,
    Accept: "application/geo+json",
  };

  const pointsRes = await fetch(
    `https://api.weather.gov/points/${CHANDLER_LAT},${CHANDLER_LON}`,
    { headers }
  );

  if (!pointsRes.ok) {
    throw new Error(
      `NWS Points API error: ${pointsRes.status} ${pointsRes.statusText}`
    );
  }

  const pointsData = await pointsRes.json();
  const forecastUrl: string = pointsData.properties.forecast;
  const alertsZone: string = pointsData.properties.forecastZone;
  const zoneId = alertsZone.split("/").pop();

  const forecastRes = await fetch(forecastUrl, { headers });

  if (!forecastRes.ok) {
    throw new Error(
      `NWS Forecast API error: ${forecastRes.status} ${forecastRes.statusText}`
    );
  }

  const forecastData = await forecastRes.json();
  const periods: WeatherPeriod[] = forecastData.properties.periods;

  const alerts = await fetchAlerts(zoneId!, headers);

  const now = new Date();
  const endOfWeek = new Date(now);
  endOfWeek.setDate(now.getDate() + 6);
  const weekRange = `${formatDateShort(now)}–${formatDateShort(endOfWeek)}, ${now.getFullYear()}`;

  const summary = analyzeWeather(periods, alerts);

  return {
    location: "Chandler, AZ",
    fetchedAt: now.toISOString(),
    weekRange,
    periods,
    alerts,
    summary,
  };
}

async function fetchAlerts(
  zoneId: string,
  headers: Record<string, string>
): Promise<WeatherAlert[]> {
  try {
    const alertsRes = await fetch(
      `https://api.weather.gov/alerts/active?zone=${zoneId}`,
      { headers }
    );

    if (!alertsRes.ok) return [];

    const alertsData = await alertsRes.json();
    return (alertsData.features || []).map(
      (f: { properties: Record<string, string> }) => ({
        event: f.properties.event,
        headline: f.properties.headline,
        severity: f.properties.severity,
        description: (f.properties.description || "").substring(0, 500),
        onset: f.properties.onset,
        expires: f.properties.expires,
      })
    );
  } catch {
    return [];
  }
}

/**
 * Analyze forecast periods — Arizona HVAC-specific hazard mapping.
 */
function analyzeWeather(
  periods: WeatherPeriod[],
  alerts: WeatherAlert[]
): WeatherSummary {
  const daytimePeriods = periods.filter((p) => p.isDaytime);
  const allTemps = periods.map((p) => p.temperature);
  const highTemp = Math.max(...allTemps);
  const lowTemp = Math.min(...allTemps);

  const precipDays = daytimePeriods.filter((p) => {
    const forecast = p.shortForecast.toLowerCase();
    return (
      forecast.includes("rain") ||
      forecast.includes("storm") ||
      forecast.includes("shower") ||
      (p.probabilityOfPrecipitation?.value ?? 0) > 30
    );
  }).length;

  const allForecasts = periods
    .map((p) => p.detailedForecast.toLowerCase())
    .join(" ");

  const stormRisk =
    allForecasts.includes("thunderstorm") ||
    allForecasts.includes("severe") ||
    alerts.some((a) => a.event.toLowerCase().includes("thunderstorm"));

  const hailRisk =
    allForecasts.includes("hail") ||
    alerts.some((a) => a.event.toLowerCase().includes("hail"));

  const highWindRisk =
    allForecasts.includes("high wind") ||
    allForecasts.includes("wind advisory") ||
    periods.some((p) => {
      const speed = parseInt(p.windSpeed);
      return speed > 30;
    });

  const freezeRisk =
    lowTemp <= 32 ||
    allForecasts.includes("freeze") ||
    allForecasts.includes("frost");

  const heavyRainRisk =
    allForecasts.includes("heavy rain") ||
    allForecasts.includes("flood") ||
    precipDays >= 3;

  // Arizona-specific risks
  const dustStormRisk =
    allForecasts.includes("dust") ||
    allForecasts.includes("haboob") ||
    allForecasts.includes("blowing sand") ||
    alerts.some((a) => a.event.toLowerCase().includes("dust"));

  const extremeHeatRisk =
    highTemp >= 105 ||
    allForecasts.includes("excessive heat") ||
    alerts.some((a) => a.event.toLowerCase().includes("heat"));

  let dominantCondition: string;
  let relevantServices: string[];

  if (extremeHeatRisk) {
    dominantCondition = "extreme_heat";
    relevantServices = ["air-conditioning", "hvac-installation", "maintenance"];
  } else if (dustStormRisk) {
    dominantCondition = "dust_storm";
    relevantServices = ["air-quality", "maintenance", "ductwork"];
  } else if (stormRisk || hailRisk) {
    dominantCondition = stormRisk ? "monsoon_storm" : "hail";
    relevantServices = ["repairs", "air-quality", "commercial-hvac"];
  } else if (highWindRisk) {
    dominantCondition = "high_wind";
    relevantServices = ["repairs", "ductwork", "commercial-hvac"];
  } else if (freezeRisk) {
    dominantCondition = "cold_snap";
    relevantServices = ["heating", "hvac-installation", "maintenance"];
  } else if (heavyRainRisk) {
    dominantCondition = "heavy_rain";
    relevantServices = ["repairs", "air-quality", "maintenance"];
  } else if (highTemp >= 95) {
    dominantCondition = "heat";
    relevantServices = ["air-conditioning", "thermostat", "air-quality"];
  } else {
    dominantCondition = "mild";
    relevantServices = ["maintenance", "hvac-installation", "swamp-cooler"];
  }

  const weatherStory = buildWeatherStory(
    dominantCondition,
    highTemp,
    lowTemp,
    precipDays
  );

  return {
    dominantCondition,
    highTemp,
    lowTemp,
    precipitationDays: precipDays,
    stormRisk,
    freezeRisk,
    hailRisk,
    highWindRisk,
    heavyRainRisk,
    dustStormRisk,
    extremeHeatRisk,
    relevantServices,
    weatherStory,
  };
}

function buildWeatherStory(
  condition: string,
  high: number,
  low: number,
  precipDays: number
): string {
  const storyMap: Record<string, string> = {
    extreme_heat: `Extreme heat is expected in the Phoenix East Valley this week with highs near ${high}°F. Air conditioning systems will be under maximum stress. Homeowners should ensure their AC is serviced and running efficiently to avoid breakdowns during the most dangerous temperatures of the year.`,
    heat: `Hot weather continues in Chandler this week with highs reaching ${high}°F. Air conditioning systems are working hard to keep homes comfortable. Regular maintenance and smart thermostat settings can help manage energy costs.`,
    dust_storm: `Dust storms and haboob conditions are possible in the Phoenix East Valley this week. Temperatures range from ${low}°F to ${high}°F. Dust infiltration can severely impact indoor air quality and clog HVAC filters, reducing system efficiency and air quality.`,
    monsoon_storm: `Monsoon thunderstorms are expected in the Chandler area this week with ${precipDays} days of precipitation forecast. Temperatures from ${low}°F to ${high}°F. Power surges, humidity spikes, and debris can damage HVAC systems and degrade indoor air quality.`,
    hail: `Hail is in the forecast for the Phoenix East Valley this week. With temperatures between ${low}°F and ${high}°F, hail can damage outdoor AC condensers and commercial HVAC equipment.`,
    high_wind: `High winds are expected in the Chandler area this week with temperatures from ${low}°F to ${high}°F. Wind can damage outdoor AC units, blow debris into condensers, and compromise ductwork connections.`,
    cold_snap: `Unusually cold temperatures are expected in the Phoenix East Valley with lows near ${low}°F. While rare in Arizona, cold snaps can stress heating systems that may not have been serviced recently. Heat pumps and furnaces need to be ready.`,
    heavy_rain: `Heavy rain is expected in the Chandler area this week with ${precipDays} days of precipitation. Temperatures range from ${low}°F to ${high}°F. Flooding and moisture can affect outdoor HVAC equipment and indoor air quality.`,
    mild: `Pleasant weather is expected in Chandler this week with temperatures from ${low}°F to ${high}°F. This is the ideal time to schedule HVAC maintenance, replace aging systems, or start up swamp coolers for the season.`,
  };

  return storyMap[condition] || storyMap.mild;
}

function formatDateShort(date: Date): string {
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
  });
}
