export interface GradeResult {
  grade: "A+" | "A" | "A-" | "B" | "C" | "D" | "F";
  gradePoint: number;
  remarks: string;
}

export function calculateBDGrade(score: number, maxScore: number = 100): GradeResult {
  const percentage = (score / maxScore) * 100;
  if (percentage >= 80) return { grade: "A+", gradePoint: 5.0, remarks: "Outstanding" };
  if (percentage >= 70) return { grade: "A", gradePoint: 4.0, remarks: "Excellent" };
  if (percentage >= 60) return { grade: "A-", gradePoint: 3.5, remarks: "Very Good" };
  if (percentage >= 50) return { grade: "B", gradePoint: 3.0, remarks: "Good" };
  if (percentage >= 40) return { grade: "C", gradePoint: 2.0, remarks: "Satisfactory" };
  if (percentage >= 33) return { grade: "D", gradePoint: 1.0, remarks: "Pass" };
  return { grade: "F", gradePoint: 0.0, remarks: "Fail" };
}

export function calculateAverageGPA(gradePoints: number[]): number {
  if (!gradePoints || gradePoints.length === 0) return 0.0;
  if (gradePoints.some((gp) => gp === 0)) {
    return 0.0; // If any subject is F, overall is F (0.00) in BD board
  }
  const sum = gradePoints.reduce((acc, curr) => acc + curr, 0);
  const avg = sum / gradePoints.length;
  return parseFloat(Math.min(5.0, avg).toFixed(2));
}
