export type DeathCause = "generic" | "fall" | "zombie" | "skeleton" | "drowning" | "guard";

export function deathMessage(cause: DeathCause): string {
  switch (cause) {
    case "fall":
      return "高所からの落下で力尽きました";
    case "zombie":
      return "ゾンビに倒されました";
    case "skeleton":
      return "スケルトンの矢に射抜かれました";
    case "drowning":
      return "溺れて力尽きました";
    case "guard":
      return "村の守護者に倒されました";
    case "generic":
      return "力尽きました";
  }
}
