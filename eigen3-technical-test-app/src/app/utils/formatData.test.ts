import { formatDateLong } from "./formatDate";

describe("formatDate test", () => {
  it("should format ISO date to long US format", () => {
    const date = "2025-07-12T23:45:31.225Z";
    const result = formatDateLong(date);
    expect(result).toBe("July 13, 2025");
  });

  it("should return 'invalid date' when given invalid date", () => {
    const date = "invalid-date";
    const result = formatDateLong(date);
    expect(result).toBe("invalid date");
  });
});
