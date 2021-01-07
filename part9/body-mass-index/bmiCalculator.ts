type BMICategories = 'Very severely underweight' | 'Severly underweight' | 'Underweight' | 'Normal (healthy weight)' | 'Overweight' | 'Moderately Obese' | 'Severely Obese' | 'Very Severely Obese'


const calculateBMI = (heightCentimeters: number, weightKilograms:number): number => {
  const heightMeters = heightCentimeters / 100; 
  if (heightMeters <= 0) throw new Error('Height cannot be less than 0m')
  if (weightKilograms <= 0) throw new Error('Weight cannot be less than 0kg')


  return (weightKilograms) / ((heightMeters) ** 2)
}

const messageFromBMI = (bmi: number):BMICategories => {
  if (bmi < 15) return 'Very severely underweight';
  if (bmi >= 15 && bmi < 16) return "Severly underweight";
  if (bmi >= 16 && bmi < 18.5) return "Underweight";
  if (bmi >= 18.5 && bmi < 25) return "Normal (healthy weight)";
  if (bmi >= 25 && bmi < 30) return "Overweight";
  if (bmi >= 30 && bmi < 35) return "Moderately Obese";
  if (bmi >= 35 && bmi < 40) return "Severely Obese";
  if (bmi > 40) return "Very Severely Obese";
}

console.log(messageFromBMI(calculateBMI(175, 72)))